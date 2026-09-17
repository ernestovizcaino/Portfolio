/** Illustrated weather doodles for WMO weather codes. */

export function WeatherIcon({
  code,
  className,
}: {
  code: number;
  className?: string;
}) {
  if (code === 0 || code === 1) {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <circle cx="32" cy="32" r="14" fill="#FFE566" stroke="#1F2A44" strokeWidth="2.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 32 + Math.cos(rad) * 20;
          const y1 = 32 + Math.sin(rad) * 20;
          const x2 = 32 + Math.cos(rad) * 26;
          const y2 = 32 + Math.sin(rad) * 26;
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F5C518"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  }

  if (code === 2) {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <circle cx="24" cy="28" r="12" fill="#FFE566" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="38" cy="40" rx="16" ry="11" fill="#E8F6FF" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="48" cy="38" rx="10" ry="9" fill="#C8ECFF" stroke="#1F2A44" strokeWidth="2" />
      </svg>
    );
  }

  if (code === 3 || code === 45 || code === 48) {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <ellipse cx="28" cy="34" rx="16" ry="12" fill="#D4C4FF" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="42" cy="32" rx="14" ry="12" fill="#EDE4FF" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="34" cy="28" rx="11" ry="9" fill="#F4F0FF" stroke="#1F2A44" strokeWidth="2" />
      </svg>
    );
  }

  if (code >= 71 && code < 80) {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <ellipse cx="32" cy="26" rx="16" ry="11" fill="#D4C4FF" stroke="#1F2A44" strokeWidth="2" />
        {[18, 32, 46].map((x) => (
          <path
            key={x}
            d={`M${x} 40 l3 6 l-3 6`}
            fill="none"
            stroke="#6EC8FF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }

  if (code >= 95) {
    return (
      <svg className={className} viewBox="0 0 64 64" aria-hidden>
        <ellipse cx="32" cy="24" rx="16" ry="11" fill="#9B7CF0" stroke="#1F2A44" strokeWidth="2" />
        <path
          d="M30 36 L36 44 L32 44 L38 56 L26 44 L32 44 Z"
          fill="#FFE566"
          stroke="#1F2A44"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M20 40 v8 M44 40 v8" stroke="#3AA0EF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Rain / drizzle / showers (default wet)
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <ellipse cx="30" cy="26" rx="15" ry="11" fill="#A8D8FF" stroke="#1F2A44" strokeWidth="2" />
      <ellipse cx="42" cy="28" rx="12" ry="10" fill="#6EC8FF" stroke="#1F2A44" strokeWidth="2" />
      {[20, 30, 40, 48].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={40 + (i % 2)}
          x2={x - 2}
          y2={52 + (i % 2)}
          stroke="#3AA0EF"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
