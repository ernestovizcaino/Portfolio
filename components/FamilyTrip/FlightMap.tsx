"use client";

import { useEffect, useRef, useState } from "react";
import { interpolateGreatCircle } from "@/lib/family-trip/geo";
import type { FlightStatusPayload } from "@/lib/family-trip/status";
import "leaflet/dist/leaflet.css";

type Props = {
  status: FlightStatusPayload | null;
};

const INK = "#1e2d47";
const SKY = "#2e9bdc";
const GRAPE = "#7d5be0";
const CORAL = "#f4714f";
const SUN = "#f5b83d";

/** Sampled great circle — planes don't fly along straight Mercator lines. */
function arc(
  from: { lat: number; lon: number },
  to: { lat: number; lon: number },
  fromFraction = 0,
  toFraction = 1,
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const t = fromFraction + ((toFraction - fromFraction) * i) / steps;
    const p = interpolateGreatCircle(from.lat, from.lon, to.lat, to.lon, t);
    points.push([p.lat, p.lon]);
  }
  return points;
}

/**
 * Basemap. CARTO's tiles now stamp "API KEY REQUIRED" across every tile
 * unless a key is configured, so the keyless default is Esri's gray canvas
 * (base + labels) — muted enough that the coloured route reads as the subject.
 */
function basemapUrls(dark: boolean): { base: string; labels: string } {
  const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY?.trim();
  if (cartoKey) {
    const style = dark ? "dark_all" : "rastertiles/voyager";
    return {
      base: `https://{s}.basemaps.cartocdn.com/${style}/{z}/{x}/{y}{r}.png?key=${encodeURIComponent(cartoKey)}`,
      labels: "",
    };
  }
  const tone = dark ? "Dark" : "Light";
  return {
    base: `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${tone}_Gray_Base/MapServer/tile/{z}/{y}/{x}`,
    labels: `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_${tone}_Gray_Reference/MapServer/tile/{z}/{y}/{x}`,
  };
}

/** Tracks the site-wide theme class so the basemap can follow it. */
function useDarkTheme(): boolean {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}

export function FlightMap({ status }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const tilesRef = useRef<import("leaflet").Layer[]>([]);
  const dark = useDarkTheme();

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      if (!containerRef.current || mapRef.current) return;
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        worldCopyJump: true,
        // Let the page scroll past the map instead of zooming it — the map is
        // embedded mid-article, and hijacked scroll is the fastest way to
        // frustrate someone reading on a phone.
        scrollWheelZoom: false,
      }).setView([-10, -75], 3);

      L.control.zoom({ position: "bottomright" }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
    }

    void setup();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      tilesRef.current = [];
    };
  }, []);

  // Swap the basemap whenever the theme flips.
  useEffect(() => {
    async function paintTiles() {
      const map = mapRef.current;
      if (!map) return;
      const L = (await import("leaflet")).default;

      for (const layer of tilesRef.current) map.removeLayer(layer);
      tilesRef.current = [];

      const { base, labels } = basemapUrls(dark);
      const attribution = base.includes("cartocdn")
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a> · ADS-B: adsb.lol'
        : "Esri, HERE, Garmin · posiciones ADS-B: adsb.lol";

      const tiles = L.tileLayer(base, {
        attribution,
        subdomains: "abcd",
        maxZoom: 16,
      });

      // If the basemap host is unreachable the family would just see an empty
      // blue rectangle, so fall back to OSM the first time a tile errors.
      let fellBack = false;
      tiles.on("tileerror", () => {
        if (fellBack) return;
        fellBack = true;
        map.removeLayer(tiles);
        const fallback = L.tileLayer(
          "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · posiciones ADS-B: adsb.lol',
            maxZoom: 17,
          },
        );
        fallback.addTo(map);
        tilesRef.current.push(fallback);
      });

      tiles.addTo(map);
      tilesRef.current.push(tiles);

      if (labels) {
        const labelLayer = L.tileLayer(labels, { maxZoom: 16, pane: "shadowPane" });
        labelLayer.addTo(map);
        tilesRef.current.push(labelLayer);
      }
    }

    void paintTiles();
  }, [dark]);

  useEffect(() => {
    async function paint() {
      if (!status || !mapRef.current || !layerRef.current) return;
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      const layer = layerRef.current;
      layer.clearLayers();

      const bounds: [number, number][] = [];

      const airportPin = (label: string, tone: string) =>
        L.divIcon({
          className: "family-pin-icon",
          html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px">
            <span style="width:11px;height:11px;border-radius:999px;background:${tone};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(30,45,71,.45)"></span>
            <span style="font:700 10px/1 ui-sans-serif,system-ui;color:${INK};background:rgba(255,255,255,.9);padding:2px 5px;border-radius:5px;white-space:nowrap;box-shadow:0 1px 3px rgba(30,45,71,.2)">${label}</span>
          </div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 5],
        });

      if (status.route && status.aircraft) {
        // In the air: one leg, split into flown and remaining.
        const { from, to } = status.route;
        const flown = status.activeFlight?.progress ?? 0;

        L.polyline(arc(from, to, 0, flown), {
          color: GRAPE,
          weight: 3.5,
          opacity: 0.9,
        }).addTo(layer);

        L.polyline(arc(from, to, flown, 1), {
          color: SKY,
          weight: 3,
          opacity: 0.5,
          dashArray: "3 8",
        }).addTo(layer);

        L.marker([from.lat, from.lon], {
          icon: airportPin(from.label, SKY),
        }).addTo(layer);
        L.marker([to.lat, to.lon], {
          icon: airportPin(to.label, CORAL),
        }).addTo(layer);

        const heading = status.aircraft.heading ?? 0;
        L.marker([status.aircraft.lat, status.aircraft.lon], {
          icon: L.divIcon({
            className: "family-plane-icon",
            html: `<div style="transform:rotate(${heading}deg);line-height:0;filter:drop-shadow(0 2px 5px rgba(30,45,71,.4))">
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
                <path d="M24 3 L28 18 L44 27 L44 32 L27 27 L26 38 L32 42 L32 45 L24 43 L16 45 L16 42 L22 38 L21 27 L4 32 L4 27 L20 18 Z"
                  fill="${SUN}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          }),
          zIndexOffset: 1000,
        })
          .bindTooltip(
            status.aircraft.source === "estimate"
              ? "Posición calculada por horario"
              : "Posición en vivo",
            { direction: "top", offset: [0, -14] },
          )
          .addTo(layer);

        bounds.push(
          [from.lat, from.lon],
          [to.lat, to.lon],
          [status.aircraft.lat, status.aircraft.lon],
        );

        map.fitBounds(L.latLngBounds(bounds), {
          padding: [46, 46],
          maxZoom: 6,
          animate: true,
        });
        return;
      }

      // On the ground: show the whole journey so the shape of the trip is clear.
      const seen = new Set<string>();
      for (const leg of status.journey) {
        const done = leg.state === "done";
        L.polyline(arc(leg.from, leg.to), {
          color: done ? GRAPE : leg.direction === "outbound" ? SKY : CORAL,
          weight: done ? 3 : 2.5,
          opacity: done ? 0.8 : 0.45,
          dashArray: done ? undefined : "3 8",
        }).addTo(layer);

        for (const end of [leg.from, leg.to]) {
          if (seen.has(end.label)) continue;
          seen.add(end.label);
          L.marker([end.lat, end.lon], {
            icon: airportPin(end.label, done ? GRAPE : SKY),
          })
            .bindTooltip(end.city, { direction: "top", offset: [0, -8] })
            .addTo(layer);
          bounds.push([end.lat, end.lon]);
        }
      }

      // Highlight where he actually is right now.
      const center = status.mapCenter;
      L.marker([center.lat, center.lon], {
        icon: L.divIcon({
          className: "family-pin-icon",
          html: `<div style="position:relative;display:grid;place-items:center;width:34px;height:34px">
            <span style="position:absolute;inset:0;border-radius:999px;background:${SUN};opacity:.3"></span>
            <span style="width:15px;height:15px;border-radius:999px;background:${SUN};border:3px solid #fff;box-shadow:0 2px 6px rgba(30,45,71,.4)"></span>
          </div>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        }),
        zIndexOffset: 1000,
      })
        .bindTooltip(status.stage.placeLabel ?? status.stage.title, {
          direction: "top",
          offset: [0, -14],
        })
        .addTo(layer);
      bounds.push([center.lat, center.lon]);

      if (bounds.length) {
        map.fitBounds(L.latLngBounds(bounds), {
          padding: [40, 40],
          maxZoom: 5,
          animate: true,
        });
      }
    }

    void paint();
  }, [status]);

  return (
    <div
      ref={containerRef}
      className="h-[300px] w-full sm:h-[380px]"
      role="img"
      aria-label="Mapa del viaje"
    />
  );
}
