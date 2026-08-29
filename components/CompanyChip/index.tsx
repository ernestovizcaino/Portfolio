import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import Image from "next/image";

const iconMap = icons as Record<string, SimpleIcon>;
const toIconKey = (slug: string) => `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;

/** Relative luminance of a #rrggbb string, 0 (black) to 1 (white). */
function luminance(hex: string) {
  const channel = (value: string) => {
    const c = parseInt(value, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * channel(hex.slice(0, 2)) +
    0.7152 * channel(hex.slice(2, 4)) +
    0.0722 * channel(hex.slice(4, 6))
  );
}

/**
 * The small rounded logo chip that sits inline before a company name.
 * Falls back to the company initial when there is no brand mark, and to a
 * neutral chip when the brand colour is too dark or too light to tint with.
 */
interface CompanyChipProps {
  company: string;
  icon?: string;
  logo?: string;
}

export const CompanyChip = ({ company, icon, logo }: CompanyChipProps) => {
  if (logo) {
    return (
      <span
        aria-hidden="true"
        className="grid size-[22px] shrink-0 place-items-center overflow-hidden rounded-md bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)] dark:bg-white/95"
      >
        <Image
          src={logo}
          alt=""
          width={15}
          height={15}
          className="size-[15px] object-contain"
        />
      </span>
    );
  }

  const mark = icon ? iconMap[toIconKey(icon)] : null;

  if (mark) {
    const light = luminance(mark.hex);
    const tintable = light > 0.05 && light < 0.85;

    return (
      <span
        aria-hidden="true"
        style={
          tintable
            ? {
                backgroundColor: `#${mark.hex}22`,
                color: `#${mark.hex}`,
              }
            : undefined
        }
        className={`grid size-[22px] shrink-0 place-items-center rounded-md${
          tintable ? "" : " bg-muted text-foreground"
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-[13px]">
          <path d={mark.path} fill="currentColor" />
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-[22px] shrink-0 place-items-center rounded-md bg-muted font-mono text-[10px] text-muted-foreground"
    >
      {company.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase()}
    </span>
  );
};
