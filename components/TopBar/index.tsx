"use client";

import {
  Clock01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import posthog from "posthog-js";
import { getDictionary } from "@/data/locales";
import type { Locale } from "@/data/locales";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/clock";
import { profile } from "@/data/profile";
import { useSounds } from "@/components/SoundProvider";
import { cn } from "@/lib/utils";

const soundIconClass =
  "absolute inset-0 m-auto transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: profile.timeZone,
});

export const TopBar = ({ locale = "en" }: { locale?: Locale }) => {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dictionary = getDictionary(locale);
  const { soundEnabled, toggleSounds } = useSounds();

  useEffect(() => {
    document.documentElement.lang = dictionary.htmlLang;
  }, [dictionary.htmlLang]);

  const selectLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    posthog.capture("language_changed", {
      from_locale: locale,
      to_locale: nextLocale,
    });
  };

  return (
    <div className="column flex items-center justify-between pt-8 pb-12 md:pt-10">
      <span className="meta text-[10px] sm:text-xs">{dictionary.ui.established}</span>
      <span className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label={
            soundEnabled
              ? dictionary.ui.muteSounds
              : dictionary.ui.enableSounds
          }
          aria-pressed={soundEnabled}
          onClick={toggleSounds}
          className="relative grid size-10 place-items-center rounded-xl text-faint transition-[color,background-color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-muted hover:text-foreground active:scale-[0.96] focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none"
        >
          <HugeiconsIcon
            icon={VolumeHighIcon}
            size={17}
            strokeWidth={2}
            className={cn(
              soundIconClass,
              soundEnabled
                ? "scale-100 opacity-100 blur-[0px]"
                : "scale-25 opacity-0 blur-[4px]",
            )}
          />
          <HugeiconsIcon
            icon={VolumeOffIcon}
            size={17}
            strokeWidth={2}
            className={cn(
              soundIconClass,
              soundEnabled
                ? "scale-25 opacity-0 blur-[4px]"
                : "scale-100 opacity-100 blur-[0px]",
            )}
          />
        </button>
        <Link
          href={locale === "es" ? "/" : "/es"}
          hrefLang={locale === "es" ? "en" : "es"}
          aria-label={dictionary.ui.languageLabel}
          data-cuelume-toggle
          onClick={selectLanguage}
          className="meta inline-flex min-h-10 items-center rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25"
        >
          {dictionary.ui.language}
        </Link>
        <span aria-hidden="true" className="hidden h-3 w-px bg-border min-[420px]:block" />
        <span className="meta hidden items-center gap-1.5 min-[420px]:flex">
          <HugeiconsIcon icon={Clock01Icon} size={13} strokeWidth={2} />
          {/* tabular-nums (set on body) keeps the width fixed as digits change. */}
          <time suppressHydrationWarning>
            {now === null ? "--:--:--" : formatter.format(now)}
          </time>{" "}
          {profile.timeZoneLabel}
        </span>
      </span>
    </div>
  );
};
