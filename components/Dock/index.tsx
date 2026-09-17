"use client";

import {
  Briefcase01Icon,
  CubeIcon,
  Download04Icon,
  Layers01Icon,
  Mail01Icon,
  MicroscopeIcon,
  Moon02Icon,
  PdfIcon,
  Sun03Icon,
  Award01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { getDictionary } from "@/data/locales";
import { resumes } from "@/data/resumes";
import { cn } from "@/lib/utils";

const items = [
  { id: "about", labelKey: "about", icon: UserIcon },
  { id: "experience", labelKey: "experience", icon: Briefcase01Icon },
  { id: "awards", labelKey: "awards", icon: Award01Icon },
  { id: "projects", labelKey: "projects", icon: CubeIcon },
  { id: "research", labelKey: "research", icon: MicroscopeIcon },
  { id: "stack", labelKey: "stack", icon: Layers01Icon },
  { id: "contact", labelKey: "contact", icon: Mail01Icon },
] as const;

const buttonClass =
  "relative grid size-10 place-items-center rounded-xl transition-[color,background-color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-muted active:scale-[0.96] focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none";

const iconClass =
  "absolute inset-0 m-auto transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)]";

export const Dock = () => {
  const pathname = usePathname();
  const locale =
    pathname === "/es" || pathname?.startsWith("/es/") ? "es" : "en";
  const { ui } = getDictionary(locale);
  const { setTheme, resolvedTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeMenuRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!resumeOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!resumeMenuRef.current?.contains(event.target as Node)) {
        setResumeOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResumeOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [resumeOpen]);

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
      <ul className="flex items-center gap-0.5 rounded-2xl border border-border bg-background/80 p-1 shadow-card backdrop-blur-xl">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-cuelume-hover="tick"
              aria-label={ui[item.labelKey]}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                buttonClass,
                active === item.id
                  ? "bg-muted text-foreground"
                  : "text-faint hover:text-foreground",
              )}
            >
              <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} />
            </a>
          </li>
        ))}

        <li aria-hidden="true" className="mx-1 h-5 w-px bg-border" />

        <li ref={resumeMenuRef} className="relative">
          <AnimatePresence initial={false}>
            {resumeOpen ? (
              <m.div
                id="resume-download-menu"
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 8,
                  scale: reduceMotion ? 1 : 0.96,
                  filter: reduceMotion ? "none" : "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 4,
                  scale: reduceMotion ? 1 : 0.98,
                  filter: reduceMotion ? "none" : "blur(3px)",
                }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="absolute right-0 bottom-[calc(100%+0.75rem)] w-56 origin-bottom-right rounded-2xl border border-border bg-background/95 p-1.5 shadow-card backdrop-blur-xl"
              >
                <p className="label px-3 pt-2 pb-1.5">{ui.downloadResume}</p>
                {resumes.map((resume, index) => (
                  <m.a
                    key={resume.locale}
                    href={`/resume/${resume.locale}`}
                    data-cuelume-hover="tick"
                    download={resume.filename}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      bounce: 0,
                      delay: reduceMotion ? 0 : index * 0.05,
                    }}
                    onClick={() => {
                      posthog.capture("resume_download_clicked", {
                        locale: resume.locale,
                        filename: resume.filename,
                      });
                      setResumeOpen(false);
                    }}
                    className="group/resume flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  >
                    <HugeiconsIcon
                      icon={PdfIcon}
                      size={17}
                      strokeWidth={2}
                      className="text-faint transition-colors duration-200 group-hover/resume:text-foreground"
                    />
                    <span className="flex-1">{resume.label}</span>
                    <HugeiconsIcon
                      icon={Download04Icon}
                      size={15}
                      strokeWidth={2}
                      className="text-faint transition-[color,transform] duration-200 group-hover/resume:translate-y-px group-hover/resume:text-foreground"
                    />
                  </m.a>
                ))}
              </m.div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            data-cuelume-toggle
            aria-label={ui.downloadResume}
            aria-expanded={resumeOpen}
            aria-controls="resume-download-menu"
            onClick={() => setResumeOpen((open) => !open)}
            className={cn(
              buttonClass,
              resumeOpen
                ? "bg-muted text-foreground"
                : "text-faint hover:text-foreground",
              "w-auto min-w-10 px-2.5",
            )}
          >
            <span className="font-mono text-[11px] font-medium tracking-[0.06em]">
              CV
            </span>
          </button>
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
