import type { CSSProperties } from "react";

type RiseStyle = CSSProperties & { "--rise-delay": number };

export function TripHero() {
  return (
    <header className="column-wide relative pt-16 pb-8 sm:pt-24 sm:pb-10">
      <p
        className="rise text-sm font-bold tracking-wide text-[var(--ft-sky-ink)]"
        style={{ "--rise-delay": 0 } as RiseStyle}
      >
        San Luis Potosí → Córdoba, Argentina
      </p>

      <h1
        className="ft-display rise mt-3 max-w-[15ch] text-[2.5rem] leading-[1.02] text-[var(--ft-ink)] sm:text-6xl"
        style={{ "--rise-delay": 1 } as RiseStyle}
      >
        El viaje de Erne
      </h1>

      <p
        className="rise mt-4 max-w-[46ch] text-base leading-[1.65] text-[var(--ft-muted)] sm:text-lg"
        style={{ "--rise-delay": 2 } as RiseStyle}
      >
        Del 19 al 27 de septiembre se va a Córdoba, Argentina, invitado a la
        conferencia CARLA 2026 por haber ganado un hackathon. Aquí pueden ver
        dónde anda, cómo va el clima y las fotos que suba.
      </p>

      <div
        className="rise mt-6 flex flex-wrap items-center gap-2"
        style={{ "--rise-delay": 3 } as RiseStyle}
      >
        <span className="ft-chip is-sun">19 – 27 septiembre 2026</span>
        <span className="ft-chip is-grape">9 días · 6 vuelos</span>
        <span className="ft-chip">Solo para la familia</span>
      </div>
    </header>
  );
}
