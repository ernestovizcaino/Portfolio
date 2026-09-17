"use client";

import { useCallback, useEffect, useState } from "react";
import type { FlightStatusPayload } from "@/lib/family-trip/status";
import { useNow } from "@/lib/family-trip/use-now";
import { FlightMap } from "./FlightMap";
import { TripClocks } from "./TripClocks";

type Props = {
  token: string;
  initialStatus: FlightStatusPayload;
};

const REFRESH_MS = 30_000;

/**
 * The one thing the family opens the page for: where Ernesto is right now.
 * Everything below it is reference material.
 */
export function NowPanel({ token, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stale, setStale] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(
        `/api/family/flight?token=${encodeURIComponent(token)}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error("fail");
      setStatus((await res.json()) as FlightStatusPayload);
      setUpdatedAt(Date.now());
      setStale(false);
    } catch {
      setStale(true);
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    const id = window.setInterval(() => void refresh(), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [refresh]);

  const flight = status.activeFlight;
  const live = status.aircraft != null && status.aircraft.source !== "estimate";

  return (
    <section id="ahorita" className="column-wide scroll-mt-20">
      <div className="ft-panel">
        {/* Status headline */}
        <div className="px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
          <div className="flex flex-wrap items-center gap-2">
            {flight ? (
              <span className={live ? "ft-chip is-leaf" : "ft-chip is-sun"}>
                <span
                  className={live ? "ft-dot is-pulsing" : "ft-dot"}
                  aria-hidden
                />
                {live ? "En vivo" : "Calculado por horario"}
              </span>
            ) : (
              <span className="ft-chip is-sky">Ahorita</span>
            )}
            <UpdatedLabel at={updatedAt} stale={stale} />
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={refreshing}
              className="ft-chip ml-auto cursor-pointer transition-colors hover:text-[var(--ft-ink)] disabled:opacity-50"
            >
              {refreshing ? "Actualizando…" : "Actualizar"}
            </button>
          </div>

          <h2 className="ft-display mt-3 text-3xl leading-tight text-[var(--ft-ink)] sm:text-4xl">
            {status.stage.title}
          </h2>
          <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-[1.6] text-[var(--ft-muted)]">
            {status.stage.blurb}
          </p>
        </div>

        {/* Map */}
        <div className="ft-map-shell border-y border-[var(--ft-line)]">
          <FlightMap status={status} />
        </div>

        {/* Flight strip */}
        {flight ? (
          <div className="px-5 py-5 sm:px-7">
            <FlightProgress status={status} />
          </div>
        ) : null}

        {/* Plain-language line */}
        <div className="px-5 pb-5 sm:px-7">
          <p className="ft-note">{status.playfulStatLine}</p>
        </div>

        {/* Live numbers */}
        {flight && status.aircraft ? (
          <div className="px-5 pb-6 sm:px-7">
            <FlightStats status={status} />
            {!live ? (
              <p className="mt-3 text-xs leading-relaxed text-[var(--ft-faint)]">
                Estos números son un cálculo por el horario del vuelo: ninguna
                antena alcanza al avión donde va ahorita. En cuanto vuelva a la
                señal, se actualizan solos.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Clocks */}
      <div className="mt-4">
        <TripClocks clocks={status.clocks} />
      </div>

      {/* What happens next */}
      {status.nextStep ? (
        <div className="ft-card mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="label">{status.nextStep.label}</p>
            <p className="ft-display mt-1.5 text-lg leading-snug text-[var(--ft-ink)]">
              {status.nextStep.title}
            </p>
            <p className="mt-1 text-sm text-[var(--ft-muted)]">
              {status.nextStep.whenLabel}
            </p>
          </div>
          <Countdown to={status.nextStep.atISO} from={status.now} />
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FlightProgress({ status }: { status: FlightStatusPayload }) {
  const flight = status.activeFlight;
  if (!flight) return null;

  const pct = Math.round(Math.min(1, Math.max(0, flight.progress)) * 100);
  const heading = status.aircraft?.heading ?? 90;

  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="ft-display text-xl text-[var(--ft-ink)]">
            {flight.fromCode}
          </p>
          <p className="meta mt-0.5">{flight.departureTimeLabel}</p>
          <p className="text-xs text-[var(--ft-faint)]">{flight.fromCity}</p>
        </div>
        <span className="ft-chip is-sky mb-1">
          {flight.airline} {flight.flightNumber}
        </span>
        <div className="text-right">
          <p className="ft-display text-xl text-[var(--ft-ink)]">
            {flight.toCode}
          </p>
          <p className="meta mt-0.5">{flight.arrivalTimeLabel}</p>
          <p className="text-xs text-[var(--ft-faint)]">{flight.toCity}</p>
        </div>
      </div>

      <div className="ft-progress mt-4">
        <div className="ft-progress-fill" style={{ width: `${pct}%` }} />
        <div className="ft-progress-plane" style={{ left: `${pct}%` }}>
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden>
            <g transform={`rotate(${heading - 90} 12 12)`}>
              <path
                d="M2 13 L20 6 L16 13 L22 15.5 L15 16.5 L12.5 22 L10.5 16.5 L3.5 17.5 Z"
                fill="#7d5be0"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[var(--ft-muted)]">
          Lleva {pct}% del camino
        </p>
        <p className="text-sm font-semibold text-[var(--ft-grape-ink)]">
          {flight.etaMinutes != null
            ? `Aterriza en ${humanDuration(flight.etaMinutes)}`
            : "Ya casi aterriza"}
        </p>
      </div>
    </div>
  );
}

function FlightStats({ status }: { status: FlightStatusPayload }) {
  const a = status.aircraft;
  const flight = status.activeFlight;
  if (!a || !flight) return null;

  const stats: { label: string; value: string; hint: string }[] = [
    {
      label: "Altura",
      value:
        a.altitudeM != null
          ? `${Math.round(a.altitudeM).toLocaleString("es-MX")} m`
          : "—",
      hint:
        a.altitudeM != null
          ? `${Math.round((a.altitudeM / 1000) * 10) / 10} km sobre el suelo`
          : "sin dato",
    },
    {
      label: "Velocidad",
      value:
        a.groundSpeedMps != null
          ? `${Math.round(a.groundSpeedMps * 3.6).toLocaleString("es-MX")} km/h`
          : "—",
      hint:
        a.groundSpeedMps != null
          ? `${Math.round(a.groundSpeedMps * 3.6 / 110)}× un coche en carretera`
          : "sin dato",
    },
    {
      label: "Le falta",
      value: `${Math.round(flight.remainingKm).toLocaleString("es-MX")} km`,
      hint: `para llegar a ${flight.toCity}`,
    },
    {
      label: "Avión",
      value: a.aircraftType ?? a.callsign ?? flight.flightNumber,
      hint: a.registration ? `matrícula ${a.registration}` : "vuelo en curso",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="ft-stat">
          <dt className="text-[0.7rem] font-bold tracking-wide text-[var(--ft-faint)] uppercase">
            {stat.label}
          </dt>
          <dd className="ft-display ft-stat-value mt-1 text-lg leading-tight text-[var(--ft-ink)]">
            {stat.value}
          </dd>
          <dd className="mt-0.5 text-[0.7rem] leading-snug text-[var(--ft-faint)]">
            {stat.hint}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Countdown({ to, from }: { to: string; from: string }) {
  // Seeded from the server's clock so the first paint matches the HTML,
  // then refined by the live one.
  const now = useNow(30_000);
  const reference = now?.getTime() ?? new Date(from).getTime();
  const remaining = new Date(to).getTime() - reference;

  if (remaining <= 0) return null;

  return (
    <div className="shrink-0 text-right">
      <p className="ft-display ft-stat-value text-2xl text-[var(--ft-ink)] sm:text-3xl">
        {humanDuration(remaining / 60_000)}
      </p>
      <p className="text-xs font-semibold text-[var(--ft-faint)]">faltan</p>
    </div>
  );
}

function UpdatedLabel({ at, stale }: { at: number | null; stale: boolean }) {
  const now = useNow(20_000);

  if (stale) {
    return (
      <span className="text-xs font-semibold text-[var(--ft-coral-ink)]">
        Sin conexión — reintentando
      </span>
    );
  }

  const minutes =
    at != null && now != null
      ? Math.floor(Math.max(0, now.getTime() - at) / 60_000)
      : 0;

  return (
    <span className="text-xs font-medium text-[var(--ft-faint)]">
      {minutes < 1
        ? "Actualizado hace un momento"
        : `Actualizado hace ${minutes} min`}
    </span>
  );
}

/* ------------------------------------------------------------------ */

function humanDuration(minutes: number): string {
  const total = Math.max(1, Math.round(minutes));
  if (total < 60) return `${total} min`;
  const days = Math.floor(total / 1440);
  if (days >= 1) {
    const hours = Math.round((total - days * 1440) / 60);
    return hours > 0 ? `${days} d ${hours} h` : `${days} d`;
  }
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return rest > 0 ? `${hours} h ${rest} min` : `${hours} h`;
}
