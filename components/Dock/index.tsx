"use client";

import {
  Briefcase01Icon,
  CubeIcon,
  Mail01Icon,
  Moon02Icon,
  Sun03Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { getDictionary } from "@/data/locales";
import { resume } from "@/data/resumes";
import { cn } from "@/lib/utils";

const items = [
  { id: "projects", labelKey: "selectedWork", icon: CubeIcon },
  { id: "experience", labelKey: "experience", icon: Briefcase01Icon },
  { id: "research", labelKey: "research", icon: Award01Icon },
  { id: "contact", labelKey: "contact", icon: Mail01Icon },
] as const;

const buttonClass =
  "relative grid size-10 min-[420px]:size-11 place-items-center rounded-xl transition-[color,background-color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-muted active:scale-[0.96] focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none";

const iconClass =
  "absolute inset-0 m-auto transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

export const Dock = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/es";
  const locale =
    pathname === "/es" || pathname?.startsWith("/es/") ? "es" : "en";
  const { ui } = getDictionary(locale);
  const { setTheme, resolvedTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;
    let frame = 0;

    // Pick the last section whose top edge has crossed a line 35% down the
    // viewport. Comparing IntersectionObserver ratios instead would bias
    // toward short sections, because a tall section covering the whole
    // viewport still reports a small ratio of its own height.
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string = items[0].id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = item.id;
      }

      // Always light up the last item once the page is scrolled to the end,
      // otherwise a short final section can never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = items[items.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Keep the portfolio dock off private family routes.
  if (pathname?.startsWith("/f/")) {
    return null;
  }

  return (
    <nav
      aria-label={ui.sections}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      {/* Outer radius 18px = inner radius 14px + 4px padding. */}
      <ul className="flex items-center gap-0 min-[420px]:gap-0.5 rounded-2xl border border-border bg-background/80 p-1 shadow-card backdrop-blur-xl">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`${isHome ? "" : locale === "es" ? "/es" : "/"}#${item.id}`}
              data-cuelume-hover="tick"
              aria-label={ui[item.labelKey]}
              aria-current={isHome && active === item.id ? "true" : undefined}
              className={cn(
                buttonClass,
                isHome && active === item.id
                  ? "bg-muted text-foreground"
                  : "text-faint hover:text-foreground",
              )}
            >
              <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} />
            </a>
          </li>
        ))}

        <li aria-hidden="true" className="mx-1 h-5 w-px bg-border" />

        <li>
          <a
            href="/resume"
            download={resume.filename}
            data-cuelume-hover="tick"
            aria-label={`CV — ${ui.downloadResume}`}
            onClick={() =>
              posthog.capture("resume_download_clicked", {
                filename: resume.filename,
              })
            }
            className={cn(buttonClass, "text-faint hover:text-foreground", "px-2")}
          >
            <span className="font-mono text-[11px] font-medium tracking-[0.06em]">
              CV
            </span>
          </a>
        </li>

        <li>
          <button
            type="button"
            data-cuelume-toggle
            aria-label={ui.toggleTheme}
            onClick={() => {
              const next = resolvedTheme === "dark" ? "light" : "dark";
              posthog.capture("theme_toggled", { theme: next });
              setTheme(next);
            }}
            className={cn(buttonClass, "text-faint hover:text-foreground")}
          >
            <span className="relative size-[18px]">
              <HugeiconsIcon
                icon={Sun03Icon}
                size={18}
                strokeWidth={2}
                className={cn(iconClass, "dark:scale-25 dark:opacity-0 dark:blur-[4px]")}
              />
              <HugeiconsIcon
                icon={Moon02Icon}
                size={18}
                strokeWidth={2}
                className={cn(
                  iconClass,
                  "scale-25 opacity-0 blur-[4px] dark:scale-100 dark:opacity-100 dark:blur-[0px]",
                )}
              />
            </span>
          </button>
        </li>

      </ul>
    </nav>
  );
};
