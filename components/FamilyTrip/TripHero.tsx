import type { CSSProperties } from "react";
import { tripMeta } from "@/data/family-trip";

type RiseStyle = CSSProperties & { "--rise-delay": number };

export function TripHero() {
  return (
    <header className="column pt-16 pb-4 sm:pt-20">
      <p className="label rise" style={{ "--rise-delay": 0 } as RiseStyle}>
        Privado · solo familia
      </p>
      <h1
        className="rise mt-5 text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
        style={{ "--rise-delay": 1 } as RiseStyle}
      >
        {tripMeta.title}
      </h1>
      <p
        className="rise mt-3 max-w-xl text-base leading-[1.7] text-muted-foreground"
        style={{ "--rise-delay": 2 } as RiseStyle}
      >
        {tripMeta.subtitle}
      </p>
      <p
        className="rise meta mt-5"
        style={{ "--rise-delay": 3 } as RiseStyle}
      >
        19–27 sep 2026 · SLP → Córdoba · premio hackathon → CARLA 2026
      </p>
    </header>
  );
}
