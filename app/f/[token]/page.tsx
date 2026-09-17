import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NowPanel } from "@/components/FamilyTrip/NowPanel";
import { PhotoAlbum } from "@/components/FamilyTrip/PhotoAlbum";
import { TripDays } from "@/components/FamilyTrip/TripDays";
import { TripDecor } from "@/components/FamilyTrip/TripDecor";
import { TripFlights } from "@/components/FamilyTrip/TripFlights";
import { TripHero } from "@/components/FamilyTrip/TripHero";
import { TripNav } from "@/components/FamilyTrip/TripNav";
import { TripPlaces } from "@/components/FamilyTrip/TripPlaces";
import { TripWeather } from "@/components/FamilyTrip/TripWeather";
import { isR2Configured } from "@/lib/family-trip/photos";
import { isValidFamilyTripToken } from "@/lib/family-trip/secrets";
import {
  buildFlightStatus,
  getActiveFlight,
  getPublicItinerary,
} from "@/lib/family-trip/status";
import { fetchLiveAircraft } from "@/lib/family-trip/tracker";
import { fetchCordobaWeather } from "@/lib/family-trip/weather";

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
    <div lang="es" className="relative pb-24">
      <div className="ft-sky-band" aria-hidden />
      <TripDecor />

      <TripHero />

      <NowPanel token={token} initialStatus={initialStatus} />

      <div className="mt-12">
        <TripNav />
      </div>

      <div className="mt-14">
        <TripFlights flights={itinerary.flights} now={now} />
      </div>

      <div className="mt-20">
        <TripPlaces places={itinerary.places} transfer={itinerary.transfer} />
      </div>

      <div className="mt-20">
        <TripDays days={itinerary.days} now={now} />
      </div>

      <div className="mt-20">
        <TripWeather token={token} initial={weather} />
      </div>

      <div className="mt-20">
        <PhotoAlbum token={token} initiallyConfigured={isR2Configured()} />
      </div>

      <footer className="column mt-20 text-center">
        <svg
          className="mx-auto h-8 w-16 text-[var(--ft-faint)]"
          viewBox="0 0 64 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 26 C16 22 30 14 44 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 7"
            opacity="0.6"
          />
          <path
            d="M44 12 L60 4 L56 12 L62 15 L54 16 L51 23 L48 16 L44 17 Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
        <p className="mt-2 text-sm text-[var(--ft-muted)]">
          Hecho con cariño para la familia. Buen viaje, Erne.
        </p>
      </footer>
    </div>
  );
}
