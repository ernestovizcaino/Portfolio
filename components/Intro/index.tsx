"use client";

import { Menu } from "@base-ui/react/menu";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import posthog from "posthog-js";
import { play } from "cuelume";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { cn } from "@/lib/utils";
import type { DictionaryUi } from "@/data/locales";
import { socials } from "@/data/profile";
import type { Profile } from "@/data/profile";
import { resumes } from "@/data/resumes";

type RiseStyle = CSSProperties & { "--rise-delay": number };

export const Intro = ({ profile, ui, locale = "en" }: { profile: Profile; ui: DictionaryUi; locale?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      play("success");
      posthog.capture("email_copied", { method: "clipboard" });
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission). Fall
      // back to opening the mail client so the action still does something.
      posthog.capture("email_copied", { method: "mailto_fallback" });
      play("error");
      window.location.href = `mailto:${profile.email}`;
    }
  }, [profile.email]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "c" && event.key !== "C") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // Never hijack the key while the user is typing.
      const el = event.target;
      if (
        el instanceof HTMLElement &&
        (el.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      ) {
        return;
      }
      event.preventDefault();
      copyEmail();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copyEmail]);

  return (
    <section id="about" className="column scroll-mt-12">
      <div className="rise relative w-fit" style={{ "--rise-delay": 0 } as RiseStyle}>
        <Image
          src={profile.avatar}
          alt={profile.fullName}
          width={56}
          height={56}
          priority
          sizes="56px"
          className="image-outline size-14 rounded-2xl object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-[2.5px] border-background bg-emerald-500"
        />
      </div>

      <h1
        className="rise mt-5 flex items-center gap-1.5 text-base font-medium text-foreground"
        style={{ "--rise-delay": 1 } as RiseStyle}
      >
        {profile.fullName}
        {profile.verified ? <VerifiedBadge /> : null}
      </h1>
      <p
        className="rise text-base text-muted-foreground"
        style={{ "--rise-delay": 1 } as RiseStyle}
      >
        {profile.role}
      </p>

      <p
        className="rise mt-6 text-pretty text-base leading-[1.7] text-muted-foreground"
        style={{ "--rise-delay": 2 } as RiseStyle}
      >
        <span className="font-medium text-foreground">{profile.headline}</span>{" "}
        {profile.bio.map((part, index) =>
          "strong" in part && part.strong ? (
            <strong key={index} className="font-medium text-foreground">
              {part.text}
            </strong>
          ) : (
            part.text
          ),
        )}
      </p>

      <div
        className="rise mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-1"
        style={{ "--rise-delay": 3 } as RiseStyle}
      >
        <p className="flex items-center gap-2 text-base text-muted-foreground">
          <span>{ui.press}</span>
          <button
            type="button"
            data-cuelume-press
            data-cuelume-release
            onClick={copyEmail}
            aria-label={`C — ${ui.copyEmailLabel}`}
            className={cn(
              "relative grid h-[26px] min-w-[26px] place-items-center rounded-md border border-border bg-surface px-1.5 after:absolute after:-inset-2 after:content-[''] font-mono text-xs text-foreground shadow-[0_1px_0_0_var(--border)]",
              "transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-muted active:scale-[0.96]",
            )}
          >
            C
          </button>
          <span>{ui.copyEmail}</span>
          <span
            aria-live="polite"
            className={cn(
              "flex items-center gap-1 text-sm text-emerald-600 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] dark:text-emerald-500",
              copied ? "opacity-100" : "scale-25 opacity-0 blur-[4px]",
            )}
          >
            <HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={2.5} />
            {ui.copied}
          </span>
        </p>
        <div className="flex items-center gap-x-5 text-sm">
          {resumes.length > 0 ? (
            <Menu.Root modal={false}>
              <Menu.Trigger className="inline-flex min-h-10 items-center rounded-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
                {ui.viewResume}
              </Menu.Trigger>
              <Menu.Portal>
                <Menu.Positioner align="start" sideOffset={6}>
                  <Menu.Popup className="min-w-40 rounded-xl border border-border bg-background p-1.5 shadow-card outline-none">
                    <Menu.Group>
                      {resumes.map((resume) => (
                        <Menu.LinkItem
                          key={resume.locale}
                          href={`/resume/${resume.locale}`}
                          download={resume.filename}
                          closeOnClick
                          onClick={() => posthog.capture("resume_download_clicked", { locale: resume.locale, filename: resume.filename })}
                          className="flex min-h-10 items-center rounded-lg px-3 text-sm text-foreground outline-none data-highlighted:bg-muted"
                        >
                          {resume.label}
                        </Menu.LinkItem>
                      ))}
                    </Menu.Group>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          ) : null}
          {socials.filter(({ label }) => label === "GitHub" || label === "LinkedIn").map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-sm text-muted-foreground hover:text-foreground">
              {social.label}<span className="sr-only"> ({locale === "es" ? "se abre en una pestaña nueva" : "opens in a new tab"})</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
