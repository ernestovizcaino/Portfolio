/** Local-dev fallback only. Production must set FAMILY_TRIP_PATH_SECRET. */
export const FAMILY_TRIP_PATH_SECRET_FALLBACK =
  "local-dev-family-viaje-slp-cordoba-2026-carla-do-not-use-in-prod";

export function getFamilyTripPathSecret(): string {
  return (
    process.env.FAMILY_TRIP_PATH_SECRET?.trim() ||
    FAMILY_TRIP_PATH_SECRET_FALLBACK
  );
}

export function getFamilyTripUploadSecret(): string | null {
  const value = process.env.FAMILY_TRIP_UPLOAD_SECRET?.trim();
  return value || null;
}

export function isValidFamilyTripToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return timingSafeEqual(token, getFamilyTripPathSecret());
}

export function isValidUploadSecret(secret: string | undefined | null): boolean {
  const expected = getFamilyTripUploadSecret();
  if (!expected || !secret) return false;
  return timingSafeEqual(secret, expected);
}

function timingSafeEqual(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < max; i++) {
    const ac = i < a.length ? a.charCodeAt(i) : 0;
    const bc = i < b.length ? b.charCodeAt(i) : 0;
    mismatch |= ac ^ bc;
  }
  return mismatch === 0;
}
