const EARTH_RADIUS_KM = 6371;

export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** Fraction along great-circle from A→B (0..1). */
export function interpolateGreatCircle(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  fraction: number,
): { lat: number; lon: number; bearing: number } {
  const t = Math.min(1, Math.max(0, fraction));
  const φ1 = toRadians(lat1);
  const λ1 = toRadians(lon1);
  const φ2 = toRadians(lat2);
  const λ2 = toRadians(lon2);

  const Δ =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((φ2 - φ1) / 2) ** 2 +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2,
      ),
    );

  if (Δ < 1e-9) {
    return { lat: lat1, lon: lon1, bearing: initialBearing(lat1, lon1, lat2, lon2) };
  }

  const a = Math.sin((1 - t) * Δ) / Math.sin(Δ);
  const b = Math.sin(t * Δ) / Math.sin(Δ);
  const x = a * Math.cos(φ1) * Math.cos(λ1) + b * Math.cos(φ2) * Math.cos(λ2);
  const y = a * Math.cos(φ1) * Math.sin(λ1) + b * Math.cos(φ2) * Math.sin(λ2);
  const z = a * Math.sin(φ1) + b * Math.sin(φ2);
  const φ = Math.atan2(z, Math.sqrt(x * x + y * y));
  const λ = Math.atan2(y, x);

  return {
    lat: toDegrees(φ),
    lon: ((toDegrees(λ) + 540) % 360) - 180,
    bearing: initialBearing(lat1, lon1, lat2, lon2),
  };
}

export function initialBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

export function etaMinutes(
  remainingKm: number,
  groundSpeedMps: number | null,
): number | null {
  if (!groundSpeedMps || groundSpeedMps < 20) return null;
  const kmh = groundSpeedMps * 3.6;
  return (remainingKm / kmh) * 60;
}
