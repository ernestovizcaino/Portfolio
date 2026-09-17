const LINKS = [
  { href: "#ahorita", label: "Ahorita" },
  { href: "#vuelos", label: "Vuelos" },
  { href: "#lugares", label: "Lugares" },
  { href: "#dias", label: "Día a día" },
  { href: "#clima", label: "Clima" },
  { href: "#fotos", label: "Fotos" },
];

/** Sticky jump bar — the page is long, and scrolling to find things is the
 * single most annoying part of reading it on a phone. */
export function TripNav() {
  return (
    <nav className="ft-nav" aria-label="Secciones del viaje">
      <div className="column-wide">
        <div className="ft-nav-scroll">
          {LINKS.map((link) => (
            <a key={link.href} className="ft-nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
