import { NextResponse } from "next/server";
import { fetchCordobaWeather } from "@/lib/family-trip/weather";
import { isValidFamilyTripToken } from "@/lib/family-trip/secrets";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isValidFamilyTripToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const weather = await fetchCordobaWeather();
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "private, max-age=900, stale-while-revalidate=1800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo cargar el clima" },
      { status: 502 },
    );
  }
}
