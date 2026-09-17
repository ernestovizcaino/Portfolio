import type { FlightLeg } from "@/data/family-trip";
import { interpolateGreatCircle, haversineKm } from "./geo";
import { flightWindow, type LiveAircraft } from "./status";
import { fetchOpenSkyAircraft } from "./opensky";

/**
 * Live aircraft lookup for the family tracker.
 *
 * Strategy: query community ADS-B feeds by callsign (global, keyless, no
 * bounding box), which is far more reliable than OpenSky's anonymous
 * /states/all box query. OpenSky stays as a last-resort fallback, and the
 * caller falls back to a schedule estimate when everything comes up empty.
 */

const KNOTS_TO_MPS = 0.514444;
const FEET_TO_M = 0.3048;
const FPM_TO_MPS = 0.00508;

/** Accept a callsign hit only if it sits near the planned great circle. */
const ROUTE_TOLERANCE_KM = 650;
/** Ignore positions older than this — a stale hit is worse than an estimate. */
const MAX_POSITION_AGE_S = 300;

type AdsbRecord = {
  hex?: string;
  flight?: string;
  r?: string;
  t?: string;
  lat?: number;
  lon?: number;
  alt_baro?: number | "ground";
  alt_geom?: number;
  gs?: number;
  track?: number;
  true_heading?: number;
  baro_rate?: number;
  geom_rate?: number;
  seen_pos?: number;
};

interface AdsbSource {
  name: string;
  url: (callsign: string) => string;
}

const ADSB_SOURCES: AdsbSource[] = [
  {
    name: "adsb.lol",
    url: (cs) => `https://api.adsb.lol/v2/callsign/${encodeURIComponent(cs)}`,
  },
  {
    name: "adsb.fi",
    url: (cs) =>
      `https://opendata.adsb.fi/api/v2/callsign/${encodeURIComponent(cs)}`,
  },
];

export async function fetchLiveAircraft(
  leg: FlightLeg,
  now = new Date(),
): Promise<LiveAircraft | null> {
  const adsb = await fetchAdsbAircraft(leg, now);
  if (adsb) return adsb;
  return fetchOpenSkyAircraft(leg, now);
}

async function fetchAdsbAircraft(
  leg: FlightLeg,
  now: Date,
): Promise<LiveAircraft | null> {
  // Only real ICAO-style callsigns ("CMP354"), not IATA flight numbers.
  const callsigns = leg.callsigns.filter((cs) => /^[A-Z]{3}\d{1,4}$/.test(cs));
  if (!callsigns.length) return null;

  for (const source of ADSB_SOURCES) {
    for (const callsign of callsigns) {
      const records = await requestAdsb(source.url(callsign));
      if (!records?.length) continue;
      const best = pickBestRecord(records, leg, now);
      if (best) return toLiveAircraft(best);
    }
  }

  return null;
}

async function requestAdsb(url: string): Promise<AdsbRecord[] | null> {
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(6_000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      ac?: AdsbRecord[] | null;
      aircraft?: AdsbRecord[] | null;
    };
    return data.ac ?? data.aircraft ?? null;
  } catch {
    return null;
  }
}

/**
 * Callsigns get reused across the day, so a hit is only trusted when it is
 * fresh and somewhere along the planned great circle.
 */
function pickBestRecord(
  records: AdsbRecord[],
  leg: FlightLeg,
  now: Date,
): AdsbRecord | null {
  const { from, to, departureAt, arrivalAt } = flightWindow(leg);
  const total = Math.max(1, arrivalAt.getTime() - departureAt.getTime());
  const progress = Math.min(
    1,
    Math.max(0, (now.getTime() - departureAt.getTime()) / total),
  );
  const estimate = interpolateGreatCircle(
    from.lat,
    from.lon,
    to.lat,
    to.lon,
    progress,
  );

  let best: AdsbRecord | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const record of records) {
    if (typeof record.lat !== "number" || typeof record.lon !== "number") {
      continue;
    }
    if ((record.seen_pos ?? 0) > MAX_POSITION_AGE_S) continue;

    const offRouteKm = distanceToRouteKm(
      record.lat,
      record.lon,
      from.lat,
      from.lon,
      to.lat,
      to.lon,
    );
    if (offRouteKm > ROUTE_TOLERANCE_KM) continue;

    // Prefer the aircraft closest to where the schedule says it should be.
    const score = haversineKm(
      record.lat,
      record.lon,
      estimate.lat,
      estimate.lon,
    );
    if (score < bestScore) {
      best = record;
      bestScore = score;
    }
  }

  return best;
}

/** Min distance from a point to the sampled great circle between two airports. */
function distanceToRouteKm(
  lat: number,
  lon: number,
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number,
): number {
  let min = Number.POSITIVE_INFINITY;
  const samples = 48;
  for (let i = 0; i <= samples; i++) {
    const point = interpolateGreatCircle(
      fromLat,
      fromLon,
      toLat,
      toLon,
      i / samples,
    );
    const d = haversineKm(lat, lon, point.lat, point.lon);
    if (d < min) min = d;
  }
  return min;
}

function toLiveAircraft(record: AdsbRecord): LiveAircraft {
  const onGround = record.alt_baro === "ground";
  const altitudeFt =
    typeof record.alt_baro === "number"
      ? record.alt_baro
      : typeof record.alt_geom === "number"
        ? record.alt_geom
        : null;
  const verticalRateFpm = record.baro_rate ?? record.geom_rate ?? null;

  return {
    source: "adsb",
    lat: record.lat as number,
    lon: record.lon as number,
    altitudeM: onGround ? 0 : altitudeFt != null ? altitudeFt * FEET_TO_M : null,
    groundSpeedMps: record.gs != null ? record.gs * KNOTS_TO_MPS : null,
    heading: record.track ?? record.true_heading ?? null,
    verticalRateMps:
      verticalRateFpm != null ? verticalRateFpm * FPM_TO_MPS : null,
    callsign: record.flight?.trim() || null,
    icao24: record.hex ?? null,
    registration: record.r?.trim() || null,
    aircraftType: record.t?.trim() || null,
    onGround,
    positionAgeS: record.seen_pos ?? null,
  };
}
