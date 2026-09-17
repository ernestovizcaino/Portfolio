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
  source: "opensky" | "estimate" | "aeroapi";
  lat: number;
  lon: number;
  altitudeM: number | null;
  groundSpeedMps: number | null;
  heading: number | null;
  callsign: string | null;
  icao24: string | null;
  onGround: boolean;
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
    from: string;
    to: string;
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
  mapCenter: { lat: number; lon: number };
  playfulStatLine: string;
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
    label: "Hora en Córdoba",
    hint: "Para la familia en MX · reloj argentino de bolsillo",
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
      label: `En vuelo · hora en ${cityShort(airborne.to)}`,
      hint: `Hora local del avión hacia ${dest.city} · destino del ${airborne.flightNumber}`,
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
      hint: `Conexión en ${airport.city} · esperando el ${connection.to.flightNumber}`,
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
            ? "Todavía en casa · reloj potosino"
            : "Ya de vuelta · misma hora que la sobremesa",
        tone: "sky",
      },
      secondary: cordobaSecondaryClock(),
    };
  }

  // Grounded in Córdoba (arrival, hotel, CARLA, free day, airport run).
  return {
    primary: {
      timeZone: CORDOBA_TZ,
      label: "Hora en Córdoba",
      hint: "Erne está en Argentina · este es el reloj que cuenta",
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
      title: "Todavía en San Luis",
      blurb:
        hours > 48
          ? "Falta un ratito (bueno, un ratito largo). Empacando emoción y adaptadores."
          : "¡Ya casi! Revisando pasaporte, snacks y valentía para las conexiones.",
      placeLabel: airports.SLP.shortName,
    };
  }

  if (now > last.arrivalAt) {
    return {
      kind: "post_trip",
      title: "De vuelta en casa",
      blurb: "Misión cumplida: CARLA, Córdoba y miles de kilómetros después.",
      placeLabel: airports.SLP.shortName,
    };
  }

  const airborne = getActiveFlight(now);
  if (airborne) {
    const { from, to } = flightWindow(airborne);
    return {
      kind: "airborne",
      title: `En el aire · ${airborne.flightNumber}`,
      blurb: `${from.shortName} → ${to.shortName}. La familia puede seguir el avión (cuando el radar coopera).`,
      placeLabel: airborne.flightNumber,
    };
  }

  const connection = connectionBetween(now);
  if (connection) {
    const airport = airports[connection.from.to];
    return {
      kind: "connection",
      title: `Conexión en ${airport.city}`,
      blurb: `Llegó el ${connection.from.flightNumber}. Siguiente: ${connection.to.flightNumber} hacia ${airports[connection.to.to].city}.`,
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
        title: "¡Llegó a Córdoba!",
        blurb: "Aterrizó. En un rato el remis lo lleva al Hotel Caseros 248.",
        placeLabel: airports.COR.shortName,
      };
    }
    return {
      kind: "arrived_transfer",
      title: "Camino al hotel",
      blurb: "Traslado aeropuerto → Caseros 248. Check-in oficial desde las 13:00.",
      placeLabel: places.find((p) => p.id === "hotel")?.name,
    };
  }

  if (now >= hotelCheckIn && now < carlaStart) {
    return {
      kind: "hotel",
      title: "En el Hotel Caseros 248",
      blurb: "Descansando en el centro de Córdoba antes de que arranque CARLA.",
      placeLabel: "Caseros 248",
    };
  }

  if (now >= carlaStart && now <= carlaEnd) {
    return {
      kind: "carla",
      title: "En CARLA 2026",
      blurb: "Conferencia de cómputo de alto rendimiento en el Centro Cultural UNC.",
      placeLabel: "Obispo Trejo 314",
    };
  }

  if (now > carlaEnd && now < airportRun) {
    return {
      kind: "free_day",
      title: "Día libre en Córdoba",
      blurb: "Últimas vueltas por la ciudad. El Papagayo sigue con reserva TBD.",
      placeLabel: cordobaCity.name,
    };
  }

  if (now >= airportRun && now < returnDep) {
    return {
      kind: "heading_airport",
      title: "Rumbo al aeropuerto",
      blurb: "Madrugada de maletas. El CM789 sale a las 03:32.",
      placeLabel: airports.COR.shortName,
    };
  }

  // Between outbound arrival window edge cases / return connections handled above
  return {
    kind: "hotel",
    title: "En Córdoba",
    blurb: "Siguiendo el itinerario — sin GPS personal, solo etapas del viaje.",
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
    callsign: leg.callsigns[0] ?? leg.flightNumber,
    icao24: null,
    onGround: false,
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
      callsign: (state[1] as string | null)?.trim() || null,
      icao24: (state[0] as string | null) || null,
      onGround: Boolean(state[8]),
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
      mapCenter,
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
      title: `En el aire · ${active.flightNumber}`,
      blurb:
        aircraft.source === "estimate"
          ? "El radar no lo ve ahorita (pasa sobre el mar a veces). Esta es una estimación por horario — honestidad con cariño."
          : "¡Lo agarramos en el radar! Posición en vivo vía ADS-B (OpenSky).",
    },
    clocks,
    activeFlight: {
      id: active.id,
      flightNumber: active.flightNumber,
      airline: active.airline,
      from: from.shortName,
      to: to.shortName,
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
    mapCenter: { lat: aircraft.lat, lon: aircraft.lon },
    playfulStatLine: playfulAirLine(aircraft, remainingKm, eta, active),
  };
}

function playfulGroundLine(kind: TripStageKind): string {
  switch (kind) {
    case "pre_trip":
      return "Aún no despega. El mapa espera con paciencia mexicana.";
    case "connection":
      return "Modo conexión: café, pasarela y fe en el siguiente boarding.";
    case "arrived_transfer":
      return "Pies en Argentina. Maleta: 1. Emoción: demasiada.";
    case "hotel":
      return "Base de operaciones: Caseros 248. Wi‑Fi y siestas estratégicas.";
    case "carla":
      return "Modo científico/ingeniero activado. HPC, posters y networking.";
    case "free_day":
      return "Día libre: Córdoba sin agenda estricta (casi).";
    case "heading_airport":
      return "Alarma de madrugada vs. sueño. Gana el avión.";
    case "post_trip":
      return "Viaje cerrado. Ahora toca contar anécdotas en la sobremesa.";
    default:
      return "Siguiendo el itinerario, sin espiar el celular de Erne.";
  }
}

function playfulAirLine(
  aircraft: LiveAircraft,
  remainingKm: number,
  eta: number | null,
  leg: FlightLeg,
): string {
  const alt =
    aircraft.altitudeM != null
      ? `${Math.round(aircraft.altitudeM)} m`
      : "altura misteriosa";
  const speed =
    aircraft.groundSpeedMps != null
      ? `${Math.round(aircraft.groundSpeedMps * 3.6)} km/h`
      : "velocidad en modo estima";
  const etaText =
    eta != null ? `ETA ~${Math.max(1, Math.round(eta))} min` : "ETA… ya casi";
  const prefix =
    aircraft.source === "estimate" ? "Estimación" : "En vivo";
  return `${prefix}: ${alt} · ${speed} · faltan ~${Math.round(remainingKm)} km · ${etaText} · ${leg.flightNumber}`;
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
        departureLabel: formatInTimeZone(departureAt, from.timeZone, {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        arrivalLabel: formatInTimeZone(arrivalAt, to.timeZone, {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
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
