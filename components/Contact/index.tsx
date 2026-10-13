"use client";

import {
  ArrowUpRight01Icon,
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import posthog from "posthog-js";
import { socials } from "@/data/profile";
import type { DictionaryUi } from "@/data/locales";

const ICONS: Record<string, typeof Mail01Icon> = {
  mail: Mail01Icon,
  x: NewTwitterIcon,
  github: GithubIcon,
  linkedin: Linkedin01Icon,
};

export const Contact = ({ ui }: { ui: DictionaryUi }) => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="column scroll-mt-12">
      <h2 id="contact-heading" className="label reveal">{ui.contact}</h2>
      <p className="reveal mt-5 text-base leading-[1.7] text-muted-foreground">
        {ui.contactIntro}
      </p>

      <ul className="mt-6 -mx-3">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              data-cuelume-hover="tick"
              onClick={() =>
                posthog.capture("social_link_clicked", {
                  platform: social.icon,
                  label: social.label,
                })
              }
              className="group/row flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
            >
              <span className="shrink-0 text-muted-foreground transition-colors duration-200 group-hover/row:text-foreground">
                <HugeiconsIcon icon={ICONS[social.icon]} size={17} strokeWidth={2} />
              </span>
              <span className="flex-1 text-base text-foreground">
                {social.label}
              </span>
              <span className="truncate text-base text-muted-foreground">
                {social.handle}
              </span>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={15}
                strokeWidth={2}
                className="shrink-0 text-faint transition-[transform,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover/row:translate-x-px group-hover/row:-translate-y-px group-hover/row:text-foreground"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
