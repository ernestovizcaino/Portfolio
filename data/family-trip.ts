/**
 * Structured itinerary for the private family trip tracker.
 * Source of truth: Córdoba / CARLA 2026 travel notes (updated 16 Sep 2026).
 * Flight times are airport-local; convert with each airport's timezone.
 */

export type AirportCode = "SLP" | "MEX" | "PTY" | "COR";

export interface Airport {
  code: AirportCode;
  name: string;
  city: string;
  shortName: string;
  lat: number;
  lon: number;
  timeZone: string;
}

export interface FlightLeg {
  id: string;
  direction: "outbound" | "return";
  sequence: number;
  airline: string;
  flightNumber: string;
  /** ADS-B style callsign guesses (OpenSky pads / trims these). */
  callsigns: string[];
  from: AirportCode;
  to: AirportCode;
  /** Local wall time at origin, ISO without offset: YYYY-MM-DDTHH:mm:ss */
  departureLocal: string;
  /** Local wall time at destination */
  arrivalLocal: string;
  note?: string;
}

export interface Place {
  id: string;
  name: string;
  role: string;
  address: string;
  mapsUrl: string;
  notes?: string[];
}

export interface DayPlan {
  date: string;
  weekday: string;
  title: string;
  summary: string;
  highlights: string[];
}

export const tripMeta = {
  traveler: "Ernesto Vizcaíno Alvarado",
  nickname: "Erne",
  title: "El gran viaje de Erne",
  subtitle:
    "De San Luis Potosí a Córdoba (Argentina) por el premio de un hackathon — CARLA 2026.",
  motive: "CARLA 2026 — Latin America High Performance Computing Conference",
  startDate: "2026-09-19",
  endDate: "2026-09-27",
  updatedAt: "2026-09-16",
} as const;

export const airports: Record<AirportCode, Airport> = {
  SLP: {
    code: "SLP",
    name: "Aeropuerto Internacional de San Luis Potosí",
    city: "San Luis Potosí",
    shortName: "San Luis Potosí (SLP)",
    lat: 22.2543,
    lon: -100.9308,
    timeZone: "America/Mexico_City",
  },
  MEX: {
    code: "MEX",
    name: "Aeropuerto Internacional de la Ciudad de México",
    city: "Ciudad de México",
    shortName: "CDMX (MEX)",
    lat: 19.4363,
    lon: -99.0721,
    timeZone: "America/Mexico_City",
  },
  PTY: {
    code: "PTY",
    name: "Aeropuerto Internacional de Tocumen",
    city: "Panamá",
    shortName: "Panamá (PTY)",
    lat: 9.0714,
    lon: -79.3835,
    timeZone: "America/Panama",
  },
  COR: {
    code: "COR",
    name: "Aeropuerto Internacional Ingeniero Ambrosio Taravella",
    city: "Córdoba",
    shortName: "Córdoba (COR)",
    lat: -31.3236,
    lon: -64.208,
    timeZone: "America/Argentina/Cordoba",
  },
};

export const flights: FlightLeg[] = [
  {
    id: "out-1",
    direction: "outbound",
    sequence: 1,
    airline: "Aeroméxico",
    flightNumber: "AM1537",
    callsigns: ["AMX1537", "AM1537"],
    from: "SLP",
    to: "MEX",
    departureLocal: "2026-09-19T08:34:00",
    arrivalLocal: "2026-09-19T09:50:00",
    note: "Primer brinquito. Conexión en CDMX ~5 h 40 min.",
  },
  {
    id: "out-2",
    direction: "outbound",
    sequence: 2,
    airline: "Copa Airlines",
    flightNumber: "CM135",
    callsigns: ["CMP135", "CM135"],
    from: "MEX",
    to: "PTY",
    departureLocal: "2026-09-19T15:30:00",
    arrivalLocal: "2026-09-19T20:14:00",
    note: "Conexión en Panamá ~1 h 09 min.",
  },
  {
    id: "out-3",
    direction: "outbound",
    sequence: 3,
    airline: "Copa Airlines",
    flightNumber: "CM354",
    callsigns: ["CMP354", "CM354"],
    from: "PTY",
    to: "COR",
    departureLocal: "2026-09-19T21:23:00",
    arrivalLocal: "2026-09-20T06:03:00",
    note: "Vuelo nocturno. Llegada a Córdoba el domingo 20 a las 06:03.",
  },
  {
    id: "ret-1",
    direction: "return",
    sequence: 1,
    airline: "Copa Airlines",
    flightNumber: "CM789",
    callsigns: ["CMP789", "CM789"],
    from: "COR",
    to: "PTY",
    departureLocal: "2026-09-27T03:32:00",
    arrivalLocal: "2026-09-27T08:09:00",
    note: "Salida de madrugada. Ideal llegar al aeropuerto ~00:30–01:00.",
  },
  {
    id: "ret-2",
    direction: "return",
    sequence: 2,
    airline: "Copa Airlines",
    flightNumber: "CM120",
    callsigns: ["CMP120", "CM120"],
    from: "PTY",
    to: "MEX",
    departureLocal: "2026-09-27T09:26:00",
    arrivalLocal: "2026-09-27T12:10:00",
    note: "Conexión en CDMX ~3 h 45 min.",
  },
  {
    id: "ret-3",
    direction: "return",
    sequence: 3,
    airline: "Aeroméxico",
    flightNumber: "AM1536",
    callsigns: ["AMX1536", "AM1536"],
    from: "MEX",
    to: "SLP",
    departureLocal: "2026-09-27T15:55:00",
    arrivalLocal: "2026-09-27T17:08:00",
    note: "Fin del viaje: domingo 27 a las 17:08 en San Luis.",
  },
];

export const places: Place[] = [
  {
    id: "airport-cor",
    name: "Aeropuerto de Córdoba (COR)",
    role: "Llegada",
    address: "Av. La Voz del Interior 8500, Córdoba, Argentina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Aeropuerto+Internacional+Ingeniero+Ambrosio+Taravella+Cordoba",
  },
  {
    id: "hotel",
    name: "Caseros 248 Hotel",
    role: "Hotel",
    address: "Caseros 248, X5000AHF Córdoba, Argentina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Caseros+248+Hotel+Córdoba+Argentina",
    notes: [
      "Check-in: domingo 20 sep, desde las 13:00",
      "Check-out: domingo 27 sep, 10:00 (pero el vuelo sale a las 03:32 — hay que salir de madrugada)",
      "7 noches, del 20 al 27 de septiembre",
      "Centro de Córdoba: cerca de CARLA y El Papagayo",
    ],
  },
  {
    id: "carla",
    name: "CARLA 2026",
    role: "Conferencia",
    address: "Centro Cultural UNC — Obispo Trejo 314, Córdoba Capital",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Centro+Cultural+UNC+Obispo+Trejo+314+Córdoba+Argentina",
    notes: [
      "Lunes 21 a viernes 25 de septiembre de 2026",
      "Sede: Centro Cultural UNC — Paseo Córdoba de la Nueva Andalucía",
      "Sitio: https://carlaconference.org/",
    ],
  },
  {
    id: "papagayo",
    name: "El Papagayo",
    role: "Restaurante",
    address: "Arturo M. Bas 69, X5000KLB Córdoba, Argentina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=El+Papagayo+Arturo+M+Bas+69+Córdoba+Argentina",
    notes: [
      "Reserva: pendiente (fecha y hora TBD)",
      "Cuando haya confirmación, se actualiza aquí",
    ],
  },
];

export const transfer = {
  id: "transfer-arrival",
  label: "Remis / traslado aeropuerto → hotel",
  pickupLocal: "2026-09-20T06:50:00",
  timeZone: "America/Argentina/Cordoba",
  passengers: 1,
  bags: 1,
  destination: "Hotel Caseros 248",
  quotedPriceArs: 42900,
  note: "Cotización del concierge — conviene confirmar el servicio final.",
} as const;

export const days: DayPlan[] = [
  {
    date: "2026-09-19",
    weekday: "Sábado",
    title: "Día de aviones (ida)",
    summary: "SLP → CDMX → Panamá → Córdoba (llega el domingo).",
    highlights: [
      "08:34 AM1537 SLP → MEX",
      "15:30 CM135 MEX → PTY",
      "21:23 CM354 PTY → COR",
    ],
  },
  {
    date: "2026-09-20",
    weekday: "Domingo",
    title: "Bienvenida a Córdoba",
    summary: "Llegada 06:03, traslado al hotel, check-in desde las 13:00.",
    highlights: [
      "06:03 aterrizaje CM354",
      "06:50 remis cotizado al hotel",
      "13:00 check-in Caseros 248",
    ],
  },
  {
    date: "2026-09-21",
    weekday: "Lunes",
    title: "Arranca CARLA 2026",
    summary: "Primer día de conferencia en el Centro Cultural UNC.",
    highlights: ["CARLA día 1", "Posible lluvia — llevar paraguas"],
  },
  {
    date: "2026-09-22",
    weekday: "Martes",
    title: "CARLA 2026",
    summary: "Segundo día de la conferencia.",
    highlights: ["CARLA día 2"],
  },
  {
    date: "2026-09-23",
    weekday: "Miércoles",
    title: "CARLA 2026",
    summary: "Mitad de semana: sesiones y networking.",
    highlights: ["CARLA día 3", "Día cálido previsto"],
  },
  {
    date: "2026-09-24",
    weekday: "Jueves",
    title: "CARLA 2026",
    summary: "Penúltimo día de sesiones.",
    highlights: ["CARLA día 4"],
  },
  {
    date: "2026-09-25",
    weekday: "Viernes",
    title: "Último día de CARLA",
    summary: "Cierre de la conferencia.",
    highlights: ["CARLA día 5 — último"],
  },
  {
    date: "2026-09-26",
    weekday: "Sábado",
    title: "Día libre / última noche",
    summary: "Explorar Córdoba. Por la noche, preparar salida al aeropuerto.",
    highlights: [
      "Día libre en la ciudad",
      "Salida al aeropuerto en la madrugada (hacia 00:30–01:00)",
    ],
  },
  {
    date: "2026-09-27",
    weekday: "Domingo",
    title: "Regreso a casa",
    summary: "COR → Panamá → CDMX → San Luis Potosí (llegada 17:08).",
    highlights: [
      "03:32 CM789 COR → PTY",
      "09:26 CM120 PTY → MEX",
      "15:55 AM1536 MEX → SLP",
      "17:08 ¡de vuelta en San Luis!",
    ],
  },
];

/** Córdoba city center approx — for weather + map resting pin. */
export const cordobaCity = {
  lat: -31.4201,
  lon: -64.1888,
  timeZone: "America/Argentina/Cordoba",
  name: "Córdoba, Argentina",
} as const;

/** Minutes before departure / after arrival to treat a leg as "in the air window". */
export const flightScheduleBufferMinutes = 25;
