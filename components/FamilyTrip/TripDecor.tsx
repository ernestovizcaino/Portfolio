import type { CSSProperties } from "react";

/** Floating SVG doodles — planes, squiggles, coils, stickers. */

type RotStyle = CSSProperties & { "--ft-rot"?: string; animationDelay?: string };

export function TripDecor() {
  return (
    <div className="ft-decor-layer pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Top-right plane */}
      <svg
        className="ft-decor ft-float absolute top-8 right-[6%] hidden h-12 w-12 sm:block"
        style={{ "--ft-rot": "-12deg" } as RotStyle}
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M8 34 L52 18 L44 36 L56 42 L40 44 L34 54 L28 42 L12 46 Z"
          fill="#6EC8FF"
          stroke="#1F2A44"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="16" r="3" fill="#FFE566" stroke="#1F2A44" strokeWidth="1.5" />
      </svg>

      {/* Lime coil */}
      <svg
        className="ft-decor ft-wiggle absolute top-28 left-[4%] h-16 w-16 opacity-80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path
          d="M40 12 C58 12 66 24 66 36 C66 54 50 64 36 64 C22 64 14 52 14 40 C14 28 24 22 34 22 C44 22 50 28 50 36 C50 44 44 48 38 48"
          stroke="#7ED321"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Pink squiggle */}
      <svg
        className="ft-decor ft-drift absolute top-[22%] right-[3%] h-10 w-20"
        viewBox="0 0 100 40"
        fill="none"
      >
        <path
          d="M4 20 C16 4 28 36 40 20 C52 4 64 36 76 20 C84 10 92 28 96 20"
          stroke="#FF6B9D"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Yellow star sticker */}
      <svg
        className="ft-decor ft-float-slow absolute top-[38%] left-[2%] h-11 w-11"
        style={{ "--ft-rot": "8deg" } as RotStyle}
        viewBox="0 0 48 48"
      >
        <path
          d="M24 4 L28.5 17.5 L42 18 L31 27 L35 41 L24 33 L13 41 L17 27 L6 18 L19.5 17.5 Z"
          fill="#FFE566"
          stroke="#1F2A44"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Lavender cloud */}
      <svg
        className="ft-decor ft-float absolute top-[48%] right-[5%] hidden h-14 w-20 sm:block"
        style={{ "--ft-rot": "0deg", animationDelay: "1.2s" } as RotStyle}
        viewBox="0 0 80 48"
      >
        <ellipse cx="28" cy="28" rx="18" ry="12" fill="#D4C4FF" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="48" cy="26" rx="16" ry="14" fill="#D4C4FF" stroke="#1F2A44" strokeWidth="2" />
        <ellipse cx="38" cy="22" rx="12" ry="10" fill="#EDE4FF" stroke="#1F2A44" strokeWidth="2" />
      </svg>

      {/* Mini plane mid-page */}
      <svg
        className="ft-decor ft-drift absolute top-[62%] left-[8%] h-9 w-9 opacity-75"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M6 26 L38 14 L32 26 L42 30 L30 32 L26 40 L22 32 L10 34 Z"
          fill="#FFB3D0"
          stroke="#1F2A44"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>

      {/* Geometric triangle accent */}
      <svg
        className="ft-decor ft-wiggle absolute top-[72%] right-[8%] h-10 w-10"
        viewBox="0 0 40 40"
      >
        <path
          d="M20 4 L36 34 L4 34 Z"
          fill="#B8F06E"
          stroke="#1F2A44"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Bottom squiggle */}
      <svg
        className="ft-decor ft-float-slow absolute bottom-24 left-[12%] h-8 w-24 opacity-70"
        style={{ "--ft-rot": "-6deg" } as RotStyle}
        viewBox="0 0 120 36"
        fill="none"
      >
        <path
          d="M4 18 C20 4 28 32 44 18 C60 4 68 32 84 18 C96 8 108 28 116 16"
          stroke="#3AA0EF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Soft pink blob */}
      <svg
        className="ft-decor absolute bottom-40 right-[4%] h-16 w-16 opacity-50"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="32" r="22" fill="#FFB3D0" />
        <circle cx="40" cy="24" r="10" fill="#FFD0E4" />
      </svg>
    </div>
  );
}
