import type { CSSProperties } from "react";
import { tripMeta } from "@/data/family-trip";

type RiseStyle = CSSProperties & { "--rise-delay": number };

export function TripHero() {
  return (
    <header className="column relative pt-14 pb-6 sm:pt-20">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="ft-pill ft-pill-pink rise"
          style={{ "--rise-delay": 0 } as RiseStyle}
        >
          Solo familia ♡
        </span>
        <span
          className="ft-pill ft-pill-sky rise"
          style={{ "--rise-delay": 1 } as RiseStyle}
        >
          SLP → Córdoba
        </span>
        <span
          className="ft-pill ft-pill-lime rise"
          style={{ "--rise-delay": 2 } as RiseStyle}
        >
          CARLA 2026
        </span>
      </div>

      <h1
        className="ft-display rise mt-6 max-w-xl text-4xl leading-[1.05] text-[var(--ft-ink)] sm:text-5xl"
        style={{ "--rise-delay": 3 } as RiseStyle}
      >
        {tripMeta.title}
      </h1>

      <p
        className="rise mt-4 max-w-xl text-base leading-[1.7] text-[var(--ft-muted)] sm:text-lg"
        style={{ "--rise-delay": 4 } as RiseStyle}
      >
        {tripMeta.subtitle} Traigan mate mental y paciencia de aeropuerto.
      </p>

      <div
        className="rise mt-6 inline-flex flex-wrap items-center gap-2"
        style={{ "--rise-delay": 5 } as RiseStyle}
      >
        <span className="ft-pill ft-pill-yellow">19–27 sep 2026</span>
        <span className="ft-pill ft-pill-lavender">Premio hackathon → aventura</span>
      </div>
    </header>
  );
}
