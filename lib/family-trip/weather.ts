import { cordobaCity } from "@/data/family-trip";

export interface WeatherDay {
  date: string;
  weatherCode: number;
  label: string;
  tempMaxC: number;
  tempMinC: number;
  precipMm: number;
}

export interface WeatherPayload {
  location: string;
  timezone: string;
  updatedAt: string;
  days: WeatherDay[];
  tip: string;
}

const WMO_ES: Record<number, string> = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia",
  65: "Lluvia fuerte",
  71: "Nieve ligera",
  80: "Chubascos",
  95: "Tormenta",
};

function weatherLabel(code: number): string {
  return WMO_ES[code] ?? `Código ${code}`;
}

export async function fetchCordobaWeather(): Promise<WeatherPayload> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(cordobaCity.lat));
  url.searchParams.set("longitude", String(cordobaCity.lon));
  url.searchParams.set("daily", "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("timezone", cordobaCity.timeZone);
  url.searchParams.set("start_date", "2026-09-20");
  url.searchParams.set("end_date", "2026-09-27");

  const response = await fetch(url, {
    next: { revalidate: 1800 },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Open-Meteo error ${response.status}`);
  }

  const data = (await response.json()) as {
    daily: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
    };
  };

  const days: WeatherDay[] = data.daily.time.map((date, i) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    label: weatherLabel(data.daily.weather_code[i]),
    tempMaxC: data.daily.temperature_2m_max[i],
    tempMinC: data.daily.temperature_2m_min[i],
    precipMm: data.daily.precipitation_sum[i],
  }));

  const rainy = days.some((d) => d.precipMm >= 1 || d.weatherCode >= 51);
  const tip = rainy
    ? "Habrá días de lluvia o nublados: chamarra ligera + paraguas no estorban."
    : "Semana variable: ropa ligera para el calor y algo abrigado para la noche.";

  return {
    location: cordobaCity.name,
    timezone: cordobaCity.timeZone,
    updatedAt: new Date().toISOString(),
    days,
    tip,
  };
}
