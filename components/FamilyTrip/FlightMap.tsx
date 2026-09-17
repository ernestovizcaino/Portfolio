"use client";

import { useEffect, useRef } from "react";
import type { FlightStatusPayload } from "@/lib/family-trip/status";
import "leaflet/dist/leaflet.css";

type Props = {
  status: FlightStatusPayload | null;
};

export function FlightMap({ status }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);

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
      }).setView([-15, -70], 3);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(map);

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
    };
  }, []);

  useEffect(() => {
    async function paint() {
      if (!status || !mapRef.current || !layerRef.current) return;
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      const layer = layerRef.current;
      layer.clearLayers();

      const center = status.mapCenter;
      map.setView([center.lat, center.lon], status.aircraft ? 4 : 5, {
        animate: true,
      });

      if (status.route) {
        L.polyline(
          [
            [status.route.from.lat, status.route.from.lon],
            [status.route.to.lat, status.route.to.lon],
          ],
          {
            color: "#9B7CF0",
            weight: 3,
            opacity: 0.65,
            dashArray: "6 8",
          },
        ).addTo(layer);

        for (const [i, end] of [status.route.from, status.route.to].entries()) {
          L.circleMarker([end.lat, end.lon], {
            radius: 6,
            color: "#1F2A44",
            weight: 2,
            fillColor: i === 0 ? "#6EC8FF" : "#FFB3D0",
            fillOpacity: 1,
          })
            .bindTooltip(end.label, { direction: "top", offset: [0, -6] })
            .addTo(layer);
        }
      }

      if (status.aircraft) {
        const heading = status.aircraft.heading ?? 0;
        const plane = L.divIcon({
          className: "family-plane-icon",
          html: `<div style="transform:rotate(${heading}deg);line-height:1;filter:drop-shadow(0 2px 4px rgba(31,42,68,.3))"><svg width="28" height="28" viewBox="0 0 48 48" fill="none"><path d="M6 26 L38 14 L32 26 L42 30 L30 32 L26 40 L22 32 L10 34 Z" fill="#FFE566" stroke="#1F2A44" stroke-width="2" stroke-linejoin="round"/></svg></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        L.marker([status.aircraft.lat, status.aircraft.lon], { icon: plane })
          .bindTooltip(
            status.aircraft.source === "estimate"
              ? "Estimación por horario"
              : "Posición en vivo",
            { direction: "top" },
          )
          .addTo(layer);
      } else {
        L.circleMarker([center.lat, center.lon], {
          radius: 9,
          color: "#1F2A44",
          weight: 2,
          fillColor: "#B8F06E",
          fillOpacity: 1,
        })
          .bindTooltip(status.stage.placeLabel ?? status.stage.title, {
            direction: "top",
          })
          .addTo(layer);
      }
    }

    void paint();
  }, [status]);

  return (
    <div className="ft-map-shell">
      <div
        ref={containerRef}
        className="h-[280px] w-full sm:h-[340px]"
        role="img"
        aria-label="Mapa del viaje"
      />
    </div>
  );
}
