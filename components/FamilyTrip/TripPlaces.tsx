import { Section } from "@/components/Section";
import type { getPublicItinerary } from "@/lib/family-trip/status";

type Itinerary = ReturnType<typeof getPublicItinerary>;

const ROLE_TONE: Record<string, string> = {
  Hotel: "is-grape",
  Conferencia: "is-sky",
  Restaurante: "is-coral",
  Llegada: "is-leaf",
};

export function TripPlaces({
  places,
  transfer,
}: {
  places: Itinerary["places"];
  transfer: Itinerary["transfer"];
}) {
  return (
    <Section
      id="lugares"
      label="Dónde va a estar"
      intro="Los lugares fijos del viaje. Cada tarjeta abre la dirección en Google Maps, por si quieren ubicarlo."
    >
      <ul className="mt-8 space-y-4">
        {places.map((place) => (
          <li key={place.id} className="ft-card reveal px-5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`ft-chip ${ROLE_TONE[place.role] ?? ""}`}>
                {place.role}
              </span>
            </div>

            <h3 className="ft-display mt-3 text-xl leading-snug text-[var(--ft-ink)]">
              {place.name}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--ft-muted)]">
              {place.address}
            </p>

            {place.notes?.length ? (
              <ul className="mt-3 space-y-1.5">
                {place.notes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-2 text-sm leading-relaxed text-[var(--ft-muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-[var(--ft-faint)]"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              href={place.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="ft-chip is-sky mt-4 transition-transform hover:-translate-y-px"
            >
              Ver en el mapa
              <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                <path
                  d="M6 3h7v7M13 3 4 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div className="ft-card reveal mt-4 px-5 py-5">
        <span className="ft-chip is-sun">Traslado</span>
        <h3 className="ft-display mt-3 text-xl leading-snug text-[var(--ft-ink)]">
          Del aeropuerto al hotel
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-[var(--ft-muted)]">
          Un remis lo recoge a las 06:50 del domingo 20 y lo lleva al Hotel
          Caseros 248. Está cotizado en unos{" "}
          {transfer.quotedPriceArs.toLocaleString("es-MX")} pesos argentinos,
          todavía por confirmar.
        </p>
      </div>
    </Section>
  );
}
