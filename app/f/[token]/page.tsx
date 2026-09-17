import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LiveTracker } from "@/components/FamilyTrip/LiveTracker";
import { PhotoAlbum } from "@/components/FamilyTrip/PhotoAlbum";
import { TripDecor } from "@/components/FamilyTrip/TripDecor";
import { TripHero } from "@/components/FamilyTrip/TripHero";
import { TripItinerary } from "@/components/FamilyTrip/TripItinerary";
import { TripWeather } from "@/components/FamilyTrip/TripWeather";
import { isR2Configured } from "@/lib/family-trip/photos";
import { isValidFamilyTripToken } from "@/lib/family-trip/secrets";
import {
  buildFlightStatus,
  getActiveFlight,
  getPublicItinerary,
} from "@/lib/family-trip/status";
import { fetchCordobaWeather } from "@/lib/family-trip/weather";
import { fetchLiveAircraft } from "@/lib/family-trip/opensky";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: "Notas de viaje" },
    description: "Página privada de itinerario.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: "Notas de viaje",
      description: "Página privada de itinerario.",
    },
    alternates: {
      canonical: undefined,
    },
  };
}

export default async function FamilyTripPage({ params }: PageProps) {
  const { token } = await params;
  if (!isValidFamilyTripToken(token)) {
    notFound();
  }

  const now = new Date();
  const active = getActiveFlight(now);
  const live = active ? await fetchLiveAircraft(active, now) : null;
  const initialStatus = buildFlightStatus(now, live);
  const itinerary = getPublicItinerary();

  let weather = null;
  try {
    weather = await fetchCordobaWeather();
  } catch {
    weather = null;
  }

  return (
    <div lang="es" className="relative pb-20">
      <TripDecor />

      <TripHero />

      <div className="mt-10">
        <LiveTracker token={token} initialStatus={initialStatus} />
      </div>

      <nav
        aria-label="Secciones del viaje"
        className="column mt-10 flex flex-wrap gap-2"
      >
        <a className="ft-nav-chip" href="#vuelos">
          Vuelos
        </a>
        <a className="ft-nav-chip" href="#lugares">
          Lugares
        </a>
        <a className="ft-nav-chip" href="#dias">
          Día a día
        </a>
        <a className="ft-nav-chip" href="#clima">
          Clima
        </a>
        <a className="ft-nav-chip" href="#fotos">
          Fotos
        </a>
      </nav>

      <div className="mt-16">
        <TripItinerary data={itinerary} />
      </div>

      <div className="mt-16">
        <TripWeather token={token} initial={weather} />
      </div>

      <div className="mt-16">
        <PhotoAlbum token={token} initiallyConfigured={isR2Configured()} />
      </div>

      <p className="column mt-16 text-center text-sm text-[var(--ft-faint)]">
        Hecho con cariño para la familia · buen viaje, Erne
      </p>
    </div>
  );
}
