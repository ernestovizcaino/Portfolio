import {
  airports,
  cordobaCity,
  days,
  flightScheduleBufferMinutes,
  flights,
  places,
  transfer,
  tripMeta,
  type AirportCode,
  type FlightLeg,
} from "@/data/family-trip";
import { haversineKm, interpolateGreatCircle, etaMinutes } from "./geo";
import { formatInTimeZone, localToUtc } from "./time";

export type TripStageKind =
  | "pre_trip"
  | "airborne"
  | "connection"
  | "arrived_transfer"
  | "hotel"
  | "carla"
  | "free_day"
  | "heading_airport"
  | "post_trip";

export interface LiveAircraft {
  source: "adsb" | "opensky" | "estimate";
  lat: number;
  lon: number;
  altitudeM: number | null;
  groundSpeedMps: number | null;
  heading: number | null;
  /** Positive = climbing, negative = descending. */
  verticalRateMps: number | null;
  callsign: string | null;
  icao24: string | null;
  registration: string | null;
  aircraftType: string | null;
  onGround: boolean;
  /** Seconds since the position was last reported. */
  positionAgeS: number | null;
}

/** True when the position comes from a real receiver, not the timetable. */
export function isLivePosition(aircraft: LiveAircraft | null): boolean {
  return aircraft != null && aircraft.source !== "estimate";
}

export interface FlightStatusPayload {
  now: string;
  stage: {
    kind: TripStageKind;
    title: string;
    blurb: string;
    placeLabel?: string;
  };
  /** Where Ernesto “is” for family clocks — derived from stage / flight windows. */
  clocks: TravelerClocks;
  activeFlight: null | {
    id: string;
    flightNumber: string;
    airline: string;
    /** City names, for headlines the family reads. */
    fromCity: string;
    toCity: string;
    fromCode: string;
    toCode: string;
    /** Wall-clock time at each airport — never the viewer's own timezone. */
    departureTimeLabel: string;
    arrivalTimeLabel: string;
    departureAt: string;
    arrivalAt: string;
    progress: number;
    remainingKm: number;
    etaMinutes: number | null;
  };
  aircraft: LiveAircraft | null;
  route: {
    from: { lat: number; lon: number; label: string };
    to: { lat: number; lon: number; label: string };
  } | null;
  /** Every leg of the trip, for the overview map when nobody is airborne. */
  journey: JourneyLeg[];
  mapCenter: { lat: number; lon: number };
  /** What happens next, so the family always has one clear thing to expect. */
  nextStep: NextStep | null;
  playfulStatLine: string;
}

export interface JourneyLeg {
  id: string;
  direction: "outbound" | "return";
  from: { lat: number; lon: number; label: string; city: string };
  to: { lat: number; lon: number; label: string; city: string };
  /** "done" | "active" | "upcoming" relative to now. */
  state: "done" | "active" | "upcoming";
}

export interface NextStep {
  /** Short kicker, e.g. "Siguiente vuelo". */
  label: string;
  /** Plain-language description of what happens. */
  title: string;
  /** Local time of the event, already formatted with its city. */
  whenLabel: string;
  /** ISO instant, so the client can count down without re-fetching. */
  atISO: string;
}

export type TravelerClockTone = "sky" | "lime" | "yellow" | "pink" | "lavender" | "mint";

export interface TravelerClock {
  timeZone: string;
  /** Short heading, e.g. "Hora en Córdoba" */
  label: string;
  /** Playful one-liner under the time */
  hint: string;
  tone: TravelerClockTone;
}

export interface TravelerClocks {
  primary: TravelerClock;
  /** Córdoba glance clock when primary is not already Córdoba. */
  secondary: TravelerClock | null;
}

const CORDOBA_TZ = "America/Argentina/Cordoba";
const MEXICO_TZ = "America/Mexico_City";
const PANAMA_TZ = "America/Panama";

function cordobaSecondaryClock(): TravelerClock {
  return {
    timeZone: CORDOBA_TZ,
    label: "Allá en Córdoba",
    hint: "Argentina va adelante de México",
    tone: "lavender",
  };
}

function clockLabelForAirport(code: AirportCode): string {
  switch (code) {
    case "SLP":
      return "Hora en SLP";
    case "MEX":
      return "Hora en CDMX";
    case "PTY":
      return "Hora en Panamá";
    case "COR":
      return "Hora en Córdoba";
  }
}

function cityShort(code: AirportCode): string {
  switch (code) {
    case "SLP":
      return "SLP";
    case "MEX":
      return "CDMX";
    case "PTY":
      return "Panamá";
    case "COR":
      return "Córdoba";
  }
}

function toneForZone(timeZone: string): TravelerClockTone {
  if (timeZone === CORDOBA_TZ) return "lavender";
  if (timeZone === PANAMA_TZ) return "mint";
  if (timeZone === MEXICO_TZ) return "sky";
  return "yellow";
}

/**
 * Local-time context for the family clocks, aligned with itinerary stage /
 * flight windows (same helpers as the live tracker).
 */
export function resolveTravelerClocks(now = new Date()): TravelerClocks {
  const airborne = getActiveFlight(now);
  if (airborne) {
    const dest = airports[airborne.to];
    const primary: TravelerClock = {
      timeZone: dest.timeZone,
      label: `Hora en ${cityShort(airborne.to)}`,
      hint: `La hora del lugar al que va aterrizando`,
      tone: dest.timeZone === CORDOBA_TZ ? "pink" : toneForZone(dest.timeZone),
    };
    return {
      primary,
      secondary: dest.timeZone === CORDOBA_TZ ? null : cordobaSecondaryClock(),
    };
  }

  const connection = connectionBetween(now);
  if (connection) {
    const airport = airports[connection.from.to];
    const primary: TravelerClock = {
      timeZone: airport.timeZone,
      label: clockLabelForAirport(airport.code),
      hint: `Ahí está esperando su próximo vuelo`,
      tone: toneForZone(airport.timeZone),
    };
    return {
      primary,
      secondary: airport.timeZone === CORDOBA_TZ ? null : cordobaSecondaryClock(),
    };
  }

  const stage = stageFor(now);

  if (stage.kind === "pre_trip" || stage.kind === "post_trip") {
    return {
      primary: {
        timeZone: MEXICO_TZ,
        label: stage.kind === "pre_trip" ? "Hora en SLP" : "Hora en México",
        hint:
          stage.kind === "pre_trip"
            ? "Todavía en casa, la misma hora que ustedes"
            : "Ya de regreso, la misma hora que ustedes",
        tone: "sky",
      },
      secondary: cordobaSecondaryClock(),
    };
  }

  // Grounded in Córdoba (arrival, hotel, CARLA, free day, airport run).
  return {
    primary: {
      timeZone: CORDOBA_TZ,
      label: "Hora de Erne",
      hint: "Está en Córdoba, Argentina",
      tone: "lavender",
    },
    secondary: null,
  };
}

function flightWindow(leg: FlightLeg) {
  const from = airports[leg.from];
  const to = airports[leg.to];
  const departureAt = localToUtc(leg.departureLocal, from.timeZone);
  const arrivalAt = localToUtc(leg.arrivalLocal, to.timeZone);
  const bufferMs = flightScheduleBufferMinutes * 60_000;
  return {
    from,
    to,
    departureAt,
    arrivalAt,
    windowStart: new Date(departureAt.getTime() - bufferMs),
    windowEnd: new Date(arrivalAt.getTime() + bufferMs),
  };
}

export function getActiveFlight(now = new Date()): FlightLeg | null {
  for (const leg of flights) {
    const { windowStart, windowEnd, departureAt, arrivalAt } = flightWindow(leg);
    if (now >= windowStart && now <= windowEnd && now >= departureAt && now <= arrivalAt) {
      return leg;
    }
    // Also treat buffer-after-departure / buffer-before-arrival as airborne-ish
    // only inside scheduled block; outside, connection logic handles it.
  }

  for (const leg of flights) {
    const { departureAt, arrivalAt } = flightWindow(leg);
    if (now >= departureAt && now <= arrivalAt) return leg;
  }

  return null;
}

function connectionBetween(now: Date): { from: FlightLeg; to: FlightLeg } | null {
  for (let i = 0; i < flights.length - 1; i++) {
    const a = flights[i];
    const b = flights[i + 1];
    if (a.direction !== b.direction) continue;
    const endA = flightWindow(a).arrivalAt;
    const startB = flightWindow(b).departureAt;
    if (now > endA && now < startB) {
      return { from: a, to: b };
    }
  }
  return null;
}

function stageFor(now: Date): FlightStatusPayload["stage"] {
  const first = flightWindow(flights[0]);
  const last = flightWindow(flights[flights.length - 1]);

  if (now < first.departureAt) {
    const hours = (first.departureAt.getTime() - now.getTime()) / 3_600_000;
    return {
      kind: "pre_trip",
      title: "Todavía está en San Luis",
      blurb:
        hours > 48
          ? "Todavía falta para el despegue. Por mientras, aquí está todo el plan del viaje."
          : "Ya mero: pasaporte, maleta y a la carrera al aeropuerto.",
      placeLabel: airports.SLP.shortName,
    };
  }

  if (now > last.arrivalAt) {
    return {
      kind: "post_trip",
      title: "Ya está de vuelta en casa",
      blurb: "Viaje completo: Córdoba, CARLA y miles de kilómetros de regreso.",
      placeLabel: airports.SLP.shortName,
    };
  }

  const airborne = getActiveFlight(now);
  if (airborne) {
    const { from, to } = flightWindow(airborne);
    return {
      kind: "airborne",
      title: "Va volando",
      blurb: `De ${from.city} a ${to.city}, en el vuelo ${airborne.flightNumber}.`,
      placeLabel: airborne.flightNumber,
    };
  }

  const connection = connectionBetween(now);
  if (connection) {
    const airport = airports[connection.from.to];
    return {
      kind: "connection",
      title: `Está haciendo escala en ${airport.city}`,
      blurb: `Ya aterrizó el ${connection.from.flightNumber}. Ahora espera el ${connection.to.flightNumber} hacia ${airports[connection.to.to].city}.`,
      placeLabel: airport.shortName,
    };
  }

  const transferAt = localToUtc(transfer.pickupLocal, transfer.timeZone);
  const hotelCheckIn = localToUtc("2026-09-20T13:00:00", cordobaCity.timeZone);
  const carlaStart = localToUtc("2026-09-21T08:00:00", cordobaCity.timeZone);
  const carlaEnd = localToUtc("2026-09-25T20:00:00", cordobaCity.timeZone);
  const freeDayStart = localToUtc("2026-09-26T00:00:00", cordobaCity.timeZone);
  const airportRun = localToUtc("2026-09-26T23:30:00", cordobaCity.timeZone);
  const returnDep = flightWindow(flights.find((f) => f.id === "ret-1")!).departureAt;

  if (now >= first.arrivalAt && now < hotelCheckIn) {
    if (now < transferAt) {
      return {
        kind: "arrived_transfer",
        title: "¡Ya llegó a Córdoba!",
        blurb: "Aterrizó bien. En un rato lo pasa a recoger el remis para llevarlo al hotel.",
        placeLabel: airports.COR.shortName,
      };
    }
    return {
      kind: "arrived_transfer",
      title: "Va camino al hotel",
      blurb: "Del aeropuerto al Hotel Caseros 248. Puede entrar al cuarto a partir de la 1 de la tarde.",
      placeLabel: places.find((p) => p.id === "hotel")?.name,
    };
  }

  if (now >= hotelCheckIn && now < carlaStart) {
    return {
      kind: "hotel",
      title: "Está en el hotel",
      blurb: "Descansando en el Hotel Caseros 248, en el centro de Córdoba.",
      placeLabel: "Caseros 248",
    };
  }

  if (now >= carlaStart && now <= carlaEnd) {
    return {
      kind: "carla",
      title: "Está en la conferencia",
      blurb: "CARLA 2026, en el Centro Cultural de la Universidad Nacional de Córdoba.",
      placeLabel: "Obispo Trejo 314",
    };
  }

  if (now > carlaEnd && now < airportRun) {
    return {
      kind: "free_day",
      title: "Día libre en Córdoba",
      blurb: "Sin conferencia: le toca conocer la ciudad antes de volver.",
      placeLabel: cordobaCity.name,
    };
  }

  if (now >= airportRun && now < returnDep) {
    return {
      kind: "heading_airport",
      title: "Va rumbo al aeropuerto",
      blurb: "Su vuelo de regreso sale de madrugada, a las 03:32.",
      placeLabel: airports.COR.shortName,
    };
  }

  // Between outbound arrival window edge cases / return connections handled above
  return {
    kind: "hotel",
    title: "Está en Córdoba",
    blurb: "Siguiendo el plan del viaje con toda calma.",
    placeLabel: cordobaCity.name,
  };
}

function estimateAircraft(leg: FlightLeg, now: Date): LiveAircraft {
  const { from, to, departureAt, arrivalAt } = flightWindow(leg);
  const total = Math.max(1, arrivalAt.getTime() - departureAt.getTime());
  const progress = Math.min(
    1,
    Math.max(0, (now.getTime() - departureAt.getTime()) / total),
  );
  const point = interpolateGreatCircle(from.lat, from.lon, to.lat, to.lon, progress);
  const distanceKm = haversineKm(from.lat, from.lon, to.lat, to.lon);
  const durationH = total / 3_600_000;
  const groundSpeedMps = durationH > 0 ? (distanceKm / durationH) * (1000 / 3600) : null;

  return {
    source: "estimate",
    lat: point.lat,
    lon: point.lon,
    altitudeM: progress > 0.05 && progress < 0.95 ? 10_000 : 1_500,
    groundSpeedMps,
    heading: point.bearing,
    verticalRateMps: null,
    callsign: leg.callsigns[0] ?? leg.flightNumber,
    icao24: null,
    registration: null,
    aircraftType: null,
    onGround: false,
    positionAgeS: null,
  };
}

function normalizeCallsign(value: string | null | undefined): string {
  return (value ?? "").replace(/\s+/g, "").toUpperCase();
}

export function matchOpenSkyState(
  states: unknown[][] | null | undefined,
  leg: FlightLeg,
): LiveAircraft | null {
  if (!states?.length) return null;
  const wanted = new Set(leg.callsigns.map(normalizeCallsign));
  const flightDigits = leg.flightNumber.replace(/[^0-9]/g, "");

  for (const state of states) {
    const callsign = normalizeCallsign(state[1] as string | null);
    if (!callsign) continue;
    const matches =
      wanted.has(callsign) ||
      [...wanted].some((c) => callsign.startsWith(c) || c.startsWith(callsign)) ||
      (flightDigits.length >= 3 && callsign.includes(flightDigits));
    if (!matches) continue;

    const lon = state[5] as number | null;
    const lat = state[6] as number | null;
    if (lat == null || lon == null) continue;

    return {
      source: "opensky",
      lat,
      lon,
      altitudeM: (state[7] as number | null) ?? (state[13] as number | null),
      groundSpeedMps: state[9] as number | null,
      heading: state[10] as number | null,
      verticalRateMps: (state[11] as number | null) ?? null,
      callsign: (state[1] as string | null)?.trim() || null,
      icao24: (state[0] as string | null) || null,
      registration: null,
      aircraftType: null,
      onGround: Boolean(state[8]),
      positionAgeS: null,
    };
  }

  return null;
}

export function buildFlightStatus(
  now = new Date(),
  liveAircraft: LiveAircraft | null = null,
): FlightStatusPayload {
  const stage = stageFor(now);
  const clocks = resolveTravelerClocks(now);
  const active = getActiveFlight(now);

  if (!active) {
    const mapCenter =
      stage.kind === "pre_trip" || stage.kind === "post_trip"
        ? { lat: airports.SLP.lat, lon: airports.SLP.lon }
        : { lat: cordobaCity.lat, lon: cordobaCity.lon };

    return {
      now: now.toISOString(),
      stage,
      clocks,
      activeFlight: null,
      aircraft: null,
      route: null,
      journey: buildJourney(now),
      mapCenter,
      nextStep: buildNextStep(now),
      playfulStatLine: playfulGroundLine(stage.kind),
    };
  }

  const { from, to, departureAt, arrivalAt } = flightWindow(active);
  const aircraft = liveAircraft ?? estimateAircraft(active, now);
  const remainingKm = haversineKm(aircraft.lat, aircraft.lon, to.lat, to.lon);
  const total = Math.max(1, arrivalAt.getTime() - departureAt.getTime());
  const progress = Math.min(
    1,
    Math.max(0, (now.getTime() - departureAt.getTime()) / total),
  );
  const eta =
    etaMinutes(remainingKm, aircraft.groundSpeedMps) ??
    Math.max(0, (arrivalAt.getTime() - now.getTime()) / 60_000);

  return {
    now: now.toISOString(),
    stage: {
      ...stage,
      kind: "airborne",
      title: `Va volando a ${to.city}`,
      blurb:
        aircraft.source === "estimate"
          ? `Va de ${from.city} a ${to.city}. Ahorita ninguna antena lo alcanza (pasa sobre el mar), así que el avioncito del mapa va por horario.`
          : `Va de ${from.city} a ${to.city} y lo estamos viendo en vivo. El avioncito del mapa es su posición real.`,
    },
    clocks,
    activeFlight: {
      id: active.id,
      flightNumber: active.flightNumber,
      airline: active.airline,
      fromCity: from.city,
      toCity: to.city,
      fromCode: from.code,
      toCode: to.code,
      departureTimeLabel: formatInTimeZone(departureAt, from.timeZone, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      arrivalTimeLabel: formatInTimeZone(arrivalAt, to.timeZone, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      departureAt: departureAt.toISOString(),
      arrivalAt: arrivalAt.toISOString(),
      progress,
      remainingKm,
      etaMinutes: eta,
    },
    aircraft,
    route: {
      from: { lat: from.lat, lon: from.lon, label: from.code },
      to: { lat: to.lat, lon: to.lon, label: to.code },
    },
    journey: buildJourney(now),
    mapCenter: { lat: aircraft.lat, lon: aircraft.lon },
    nextStep: buildNextStep(now),
    playfulStatLine: playfulAirLine(aircraft, remainingKm, eta, active),
  };
}

function playfulGroundLine(kind: TripStageKind): string {
  switch (kind) {
    case "pre_trip":
      return "Todavía no despega: el avioncito del mapa está esperando su turno.";
    case "connection":
      return "En modo escala: café, sala de espera y a esperar el abordaje.";
    case "arrived_transfer":
      return "Ya pisó Argentina. Maleta: 1. Emoción: bastante.";
    case "hotel":
      return "Su base en Córdoba es el Hotel Caseros 248, en pleno centro.";
    case "carla":
      return "Está en la conferencia. Si no contesta rápido, es por eso.";
    case "free_day":
      return "Día libre para caminar Córdoba antes de volver.";
    case "heading_airport":
      return "Madrugada de maletas: se va al aeropuerto para el vuelo de regreso.";
    case "post_trip":
      return "Viaje terminado. Ahora toca contar todo en la sobremesa.";
    default:
      return "Siguiendo el itinerario del viaje.";
  }
}

/** All legs with their state, so the map can show the whole trip at a glance. */
function buildJourney(now: Date): JourneyLeg[] {
  return flights.map((leg) => {
    const { from, to, departureAt, arrivalAt } = flightWindow(leg);
    const state: JourneyLeg["state"] =
      now > arrivalAt ? "done" : now >= departureAt ? "active" : "upcoming";
    return {
      id: leg.id,
      direction: leg.direction,
      from: { lat: from.lat, lon: from.lon, label: from.code, city: from.city },
      to: { lat: to.lat, lon: to.lon, label: to.code, city: to.city },
      state,
    };
  });
}

function whenLabel(at: Date, timeZone: string, city: string): string {
  const stamp = formatInTimeZone(at, timeZone, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${stamp} · hora de ${city}`;
}

/**
 * The single next thing that will happen. The family gets one clear
 * expectation plus a countdown instead of having to read the whole itinerary.
 */
function buildNextStep(now: Date): NextStep | null {
  const active = getActiveFlight(now);
  if (active) {
    const { to, arrivalAt } = flightWindow(active);
    return {
      label: "Siguiente",
      title: `Aterriza en ${to.city}`,
      whenLabel: whenLabel(arrivalAt, to.timeZone, to.city),
      atISO: arrivalAt.toISOString(),
    };
  }

  const connection = connectionBetween(now);
  if (connection) {
    const next = flightWindow(connection.to);
    return {
      label: "Siguiente",
      title: `Despega el ${connection.to.flightNumber} hacia ${next.to.city}`,
      whenLabel: whenLabel(next.departureAt, next.from.timeZone, next.from.city),
      atISO: next.departureAt.toISOString(),
    };
  }

  const upcoming = flights
    .map((leg) => ({ leg, window: flightWindow(leg) }))
    .find(({ window }) => window.departureAt > now);

  const hotelCheckIn = localToUtc("2026-09-20T13:00:00", cordobaCity.timeZone);
  const carlaStart = localToUtc("2026-09-21T09:00:00", cordobaCity.timeZone);
  const stage = stageFor(now);

  if (stage.kind === "arrived_transfer" && now < hotelCheckIn) {
    return {
      label: "Siguiente",
      title: "Check-in en el Hotel Caseros 248",
      whenLabel: whenLabel(hotelCheckIn, cordobaCity.timeZone, "Córdoba"),
      atISO: hotelCheckIn.toISOString(),
    };
  }

  if (stage.kind === "hotel" && now < carlaStart) {
    return {
      label: "Siguiente",
      title: "Arranca CARLA 2026 en el Centro Cultural UNC",
      whenLabel: whenLabel(carlaStart, cordobaCity.timeZone, "Córdoba"),
      atISO: carlaStart.toISOString(),
    };
  }

  if (!upcoming) return null;

  const { leg, window } = upcoming;
  return {
    label: leg.direction === "outbound" ? "Siguiente vuelo" : "Vuelo de regreso",
    title: `${leg.flightNumber} · ${window.from.city} → ${window.to.city}`,
    whenLabel: whenLabel(window.departureAt, window.from.timeZone, window.from.city),
    atISO: window.departureAt.toISOString(),
  };
}

/** One warm sentence a tía can read out loud without decoding anything. */
function playfulAirLine(
  aircraft: LiveAircraft,
  remainingKm: number,
  eta: number | null,
  leg: FlightLeg,
): string {
  const { to } = flightWindow(leg);
  const km = Math.round(remainingKm).toLocaleString("es-MX");

  if (aircraft.altitudeM != null && aircraft.altitudeM > 6_000) {
    const pisos = Math.round(aircraft.altitudeM / 3);
    return `Va a unos ${Math.round(aircraft.altitudeM).toLocaleString("es-MX")} metros de altura — como un edificio de ${pisos.toLocaleString("es-MX")} pisos — y le faltan ${km} km para ${to.city}.`;
  }

  if (eta != null && eta < 45) {
    return `Ya viene bajando hacia ${to.city}: le faltan ${km} km, cosa de ${Math.max(1, Math.round(eta))} minutos.`;
  }

  return `Rumbo a ${to.city}, con ${km} km por delante.`;
}

export function getPublicItinerary() {
  return {
    meta: tripMeta,
    airports,
    flights: flights.map((leg) => {
      const { from, to, departureAt, arrivalAt } = flightWindow(leg);
      return {
        ...leg,
        fromAirport: from,
        toAirport: to,
        departureAt: departureAt.toISOString(),
        arrivalAt: arrivalAt.toISOString(),
        // 24-hour, the way a boarding pass reads. Without hour12: false,
        // es-MX renders "03:30 p.m." and any attempt to slice the clock out
        // of it silently loses the meridiem.
        departureTimeLabel: formatInTimeZone(departureAt, from.timeZone, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        arrivalTimeLabel: formatInTimeZone(arrivalAt, to.timeZone, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        departureDayLabel: formatInTimeZone(departureAt, from.timeZone, {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        arrivalDayLabel: formatInTimeZone(arrivalAt, to.timeZone, {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      };
    }),
    places,
    transfer,
    days,
    cordobaCity,
  };
}

export { flightWindow };
