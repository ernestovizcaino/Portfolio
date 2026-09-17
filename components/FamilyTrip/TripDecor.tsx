/**
 * Decoration for the hero band only. The previous version scattered doodles
 * down the whole page, where they collided with the content; keeping them in
 * the sky at the top lets them read as illustration instead of clutter.
 */
export function TripDecor() {
  return (
    <div
      className="ft-decor-layer pointer-events-none absolute inset-x-0 top-0 h-[26rem] overflow-hidden"
      aria-hidden
    >
      {/* Clouds */}
      <Cloud className="ft-drift absolute top-[4.5rem] left-[-2%] h-12 w-28 opacity-70" />
      <Cloud
        className="ft-float-slow absolute top-[9rem] right-[-3%] h-16 w-36 opacity-60"
        style={{ animationDelay: "1.5s" }}
      />
      <Cloud className="ft-drift absolute top-[16rem] left-[12%] hidden h-10 w-24 opacity-45 sm:block" />

      {/* Little plane trailing a dotted line, top right */}
      <svg
        className="ft-float absolute top-8 right-[8%] h-20 w-32 sm:right-[12%]"
        viewBox="0 0 160 96"
        fill="none"
      >
        <path
          d="M4 78 C34 74 56 58 74 40"
          stroke="#2e9bdc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1 9"
          opacity="0.55"
        />
        <g transform="translate(86 16) rotate(-18)">
          <path
            d="M2 22 L34 8 L27 22 L40 27 L26 29 L21 40 L17 29 L4 31 Z"
            fill="var(--ft-surface)"
            stroke="var(--ft-ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Sun, top left */}
      <svg
        className="ft-float-slow absolute top-6 left-[6%] h-14 w-14 opacity-90"
        viewBox="0 0 64 64"
        fill="none"
      >
        <circle cx="32" cy="32" r="12" fill="#f5b83d" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="32"
            y1="14"
            x2="32"
            y2="8"
            stroke="#f5b83d"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </svg>
    </div>
  );
}

function Cloud({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={`text-[var(--ft-cloud)] ${className ?? ""}`}
      style={style}
      viewBox="0 0 120 56"
      fill="currentColor"
    >
      <ellipse cx="38" cy="36" rx="26" ry="16" />
      <ellipse cx="68" cy="32" rx="22" ry="19" />
      <ellipse cx="90" cy="38" rx="20" ry="14" />
    </svg>
  );
}
