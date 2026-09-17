import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LiveTracker } from "@/components/FamilyTrip/LiveTracker";
import { PhotoAlbum } from "@/components/FamilyTrip/PhotoAlbum";
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
    <div lang="es" className="pb-16">
      <TripHero />

      <div className="mt-12">
        <LiveTracker token={token} initialStatus={initialStatus} />
      </div>

      <nav
        aria-label="Secciones del viaje"
        className="column mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
      >
        <a className="hover:text-foreground" href="#vuelos">
          Vuelos
        </a>
        <a className="hover:text-foreground" href="#lugares">
          Lugares
        </a>
        <a className="hover:text-foreground" href="#dias">
          Día a día
        </a>
        <a className="hover:text-foreground" href="#clima">
          Clima
        </a>
        <a className="hover:text-foreground" href="#fotos">
          Fotos
        </a>
      </nav>

      <div className="mt-20">
        <TripItinerary data={itinerary} />
      </div>

      <div className="mt-20">
        <TripWeather token={token} initial={weather} />
      </div>

      <div className="mt-20">
        <PhotoAlbum token={token} initiallyConfigured={isR2Configured()} />
      </div>

      <p className="column mt-16 text-center text-sm text-faint">
        Página secreta para la familia · no está en el portafolio público · noindex
      </p>
    </div>
  );
}
