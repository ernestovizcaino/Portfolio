import { NextResponse } from "next/server";
import { getActiveFlight, buildFlightStatus } from "@/lib/family-trip/status";
import { fetchLiveAircraft } from "@/lib/family-trip/opensky";
import { isValidFamilyTripToken } from "@/lib/family-trip/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isValidFamilyTripToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const now = new Date();
  const active = getActiveFlight(now);
  let live = null;
  if (active) {
    live = await fetchLiveAircraft(active, now);
  }

  const payload = buildFlightStatus(now, live);
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "private, max-age=15, stale-while-revalidate=30",
    },
  });
}
