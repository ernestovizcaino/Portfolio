import {
  flightWindow,
  matchOpenSkyState,
  type LiveAircraft,
} from "@/lib/family-trip/status";
import type { FlightLeg } from "@/data/family-trip";
import { airports } from "@/data/family-trip";
import { interpolateGreatCircle } from "@/lib/family-trip/geo";

export type FlightProvider = "opensky" | "aeroapi";

export function getFlightProvider(): FlightProvider {
  const raw = process.env.FLIGHT_TRACKER_PROVIDER?.trim().toLowerCase();
  if (raw === "aeroapi") return "aeroapi";
  return "opensky";
}

/**
 * Fetch live ADS-B around the estimated position and match callsign.
 * OpenSky is the default; AeroAPI can be wired later via FLIGHT_TRACKER_PROVIDER.
 */
export async function fetchLiveAircraft(
  leg: FlightLeg,
  now = new Date(),
): Promise<LiveAircraft | null> {
  const provider = getFlightProvider();
  if (provider === "aeroapi") {
    // Placeholder for a future FlightAware AeroAPI integration.
    // Keep OpenSky as the working path until credentials + mapping exist.
    if (!process.env.AEROAPI_KEY) {
      return fetchOpenSkyAircraft(leg, now);
    }
    return fetchOpenSkyAircraft(leg, now);
  }
  return fetchOpenSkyAircraft(leg, now);
}

async function fetchOpenSkyAircraft(
  leg: FlightLeg,
  now: Date,
): Promise<LiveAircraft | null> {
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

  // ~5° box keeps credit cost low while covering oceanic gaps poorly —
  // that's when we fall back to the schedule estimate.
  const pad = 2.5;
  const lamin = Math.max(-90, estimate.lat - pad);
  const lamax = Math.min(90, estimate.lat + pad);
  const lomin = Math.max(-180, estimate.lon - pad);
  const lomax = Math.min(180, estimate.lon + pad);

  const url = new URL("https://opensky-network.org/api/states/all");
  url.searchParams.set("lamin", lamin.toFixed(4));
  url.searchParams.set("lamax", lamax.toFixed(4));
  url.searchParams.set("lomin", lomin.toFixed(4));
  url.searchParams.set("lomax", lomax.toFixed(4));

  const headers: HeadersInit = {
    Accept: "application/json",
  };
  const user = process.env.OPENSKY_USERNAME?.trim();
  const pass = process.env.OPENSKY_PASSWORD?.trim();
  if (user && pass) {
    headers.Authorization = `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 20 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { states?: unknown[][] | null };
    return matchOpenSkyState(data.states, leg);
  } catch {
    return null;
  }
}

export function restMapPinForStage(kind: string): { lat: number; lon: number } {
  if (kind === "pre_trip" || kind === "post_trip") {
    return { lat: airports.SLP.lat, lon: airports.SLP.lon };
  }
  return { lat: airports.COR.lat, lon: airports.COR.lon };
}
