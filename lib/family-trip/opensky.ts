import type { FlightLeg } from "@/data/family-trip";
import { interpolateGreatCircle } from "@/lib/family-trip/geo";
import { flightWindow, matchOpenSkyState, type LiveAircraft } from "@/lib/family-trip/status";

/**
 * OpenSky bounding-box lookup. Kept as the last-resort fallback behind the
 * callsign feeds in `tracker.ts` — anonymous access is heavily rate limited,
 * so it only gets asked when the community feeds see nothing.
 */
export async function fetchOpenSkyAircraft(
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

  const pad = 3;
  const lamin = Math.max(-90, estimate.lat - pad);
  const lamax = Math.min(90, estimate.lat + pad);
  const lomin = Math.max(-180, estimate.lon - pad);
  const lomax = Math.min(180, estimate.lon + pad);

  const url = new URL("https://opensky-network.org/api/states/all");
  url.searchParams.set("lamin", lamin.toFixed(4));
  url.searchParams.set("lamax", lamax.toFixed(4));
  url.searchParams.set("lomin", lomin.toFixed(4));
  url.searchParams.set("lomax", lomax.toFixed(4));

  const headers: HeadersInit = { Accept: "application/json" };
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
