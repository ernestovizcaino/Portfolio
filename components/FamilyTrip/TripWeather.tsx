"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import type { WeatherPayload } from "@/lib/family-trip/weather";

export function TripWeather({
  token,
  initial,
}: {
  token: string;
  initial: WeatherPayload | null;
}) {
  const [weather, setWeather] = useState(initial);

  useEffect(() => {
    if (weather) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(
          `/api/family/weather?token=${encodeURIComponent(token)}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as WeatherPayload;
        if (!cancelled) setWeather(data);
      } catch {
        // keep empty
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, weather]);

  return (
    <Section
      id="clima"
      label="Clima en Córdoba"
      intro="Pronóstico Open-Meteo (sin API key). Puede cambiar — revisen cada mañana."
    >
      {!weather ? (
        <p className="reveal mt-6 text-sm text-muted-foreground">
          Cargando el clima argentino…
        </p>
      ) : (
        <>
          <p className="reveal mt-6 text-sm text-muted-foreground">{weather.tip}</p>
          <ul className="reveal mt-6 divide-y divide-border">
            {weather.days.map((day) => (
              <li
                key={day.date}
                className="flex flex-wrap items-baseline justify-between gap-2 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {formatDay(day.date)}
                  </p>
                  <p className="text-sm text-muted-foreground">{day.label}</p>
                </div>
                <p className="meta">
                  {Math.round(day.tempMinC)}° / {Math.round(day.tempMaxC)}°
                  {day.precipMm > 0
                    ? ` · ${day.precipMm.toFixed(1)} mm`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}

function formatDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}
