"use client";

import { useCallback, useEffect, useState } from "react";
import type { FlightStatusPayload } from "@/lib/family-trip/status";
import { FlightMap } from "./FlightMap";
import { TripClocks } from "./TripClocks";

type Props = {
  token: string;
  initialStatus: FlightStatusPayload;
};

export function LiveTracker({ token, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/family/flight?token=${encodeURIComponent(token)}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("fail");
      const data = (await res.json()) as FlightStatusPayload;
      setStatus(data);
      setError(null);
    } catch {
      setError("No pude actualizar el vuelo. Reintentando…");
    }
  }, [token]);

  useEffect(() => {
    const id = window.setInterval(() => {
      void refresh();
    }, 25_000);
    return () => window.clearInterval(id);
  }, [refresh]);

  const airborne = Boolean(status.activeFlight);
  const stats = status.activeFlight
    ? [
        {
          label: "Altitud",
          value:
            status.aircraft?.altitudeM != null
              ? `${Math.round(status.aircraft.altitudeM).toLocaleString("es-MX")} m`
              : "—",
          tone: "sky" as const,
        },
        {
          label: "Velocidad",
          value:
            status.aircraft?.groundSpeedMps != null
              ? `${Math.round(status.aircraft.groundSpeedMps * 3.6)} km/h`
              : "—",
          tone: "lime" as const,
        },
        {
          label: "Rumbo",
          value:
            status.aircraft?.heading != null
              ? `${Math.round(status.aircraft.heading)}°`
              : "—",
          tone: "lavender" as const,
        },
        {
          label: "Faltan",
          value: `~${Math.round(status.activeFlight.remainingKm)} km`,
          tone: "pink" as const,
        },
      ]
    : null;

  return (
    <section id="radar" className="column scroll-mt-12">
      <TripClocks clocks={status.clocks} />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <p className="label reveal">Radar familiar</p>
        <span className="ft-pill ft-pill-lime reveal !text-[0.65rem]">
          {status.aircraft?.source === "opensky" || status.aircraft?.source === "aeroapi"
            ? "En vivo"
            : airborne
              ? "Estimación"
              : "En tierra"}
        </span>
      </div>

      <h2 className="ft-display reveal mt-4 text-2xl text-[var(--ft-ink)] sm:text-3xl">
        {status.stage.title}
      </h2>
      <p className="reveal mt-2 text-base leading-[1.7] text-[var(--ft-muted)]">
        {status.stage.blurb}
      </p>

      <div className="reveal mt-6">
        <FlightMap status={status} />
      </div>

      <p className="reveal mt-4 rounded-2xl bg-[var(--ft-lavender)]/50 px-4 py-3 text-sm leading-relaxed text-[var(--ft-ink)]">
        {status.playfulStatLine}
      </p>

      {airborne && stats ? (
        <dl className="reveal mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="ft-stat px-3 py-3">
              <dt>
                <span
                  className={
                    item.tone === "sky"
                      ? "ft-pill ft-pill-sky !px-2 !py-0.5 !text-[0.6rem] !shadow-none"
                      : item.tone === "lime"
                        ? "ft-pill ft-pill-lime !px-2 !py-0.5 !text-[0.6rem] !shadow-none"
                        : item.tone === "lavender"
                          ? "ft-pill ft-pill-lavender !px-2 !py-0.5 !text-[0.6rem] !shadow-none"
                          : "ft-pill ft-pill-pink !px-2 !py-0.5 !text-[0.6rem] !shadow-none"
                  }
                >
                  {item.label}
                </span>
              </dt>
              <dd className="ft-display mt-2 text-base text-[var(--ft-ink)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {status.activeFlight ? (
        <p className="meta reveal mt-4">
          {status.activeFlight.airline} {status.activeFlight.flightNumber} ·{" "}
          {status.activeFlight.from} → {status.activeFlight.to}
          {status.aircraft?.source === "estimate" ? " · estimación" : " · ADS-B"}
        </p>
      ) : status.stage.placeLabel ? (
        <p className="meta reveal mt-4">Etapa actual · {status.stage.placeLabel}</p>
      ) : null}

      {error ? (
        <p className="mt-3 text-sm text-[var(--ft-muted)]" role="status">
          {error}
        </p>
      ) : null}
    </section>
  );
}
