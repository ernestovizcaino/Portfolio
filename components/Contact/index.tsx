"use client";

import {
  ArrowUpRight01Icon,
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import posthog from "posthog-js";
import { socials } from "@/data/profile";
import { cn } from "@/lib/utils";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { DictionaryUi } from "@/data/locales";
import type { Profile } from "@/data/profile";

const ICONS: Record<string, typeof Mail01Icon> = {
  mail: Mail01Icon,
  x: NewTwitterIcon,
  github: GithubIcon,
  linkedin: Linkedin01Icon,
};

const fieldClass =
  "w-full rounded-xl bg-input px-4 py-3 text-base text-foreground placeholder:text-faint transition-[background-color,box-shadow] duration-200 focus:bg-muted focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25";

export const Contact = ({ profile, ui }: { profile: Profile; ui: DictionaryUi }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: compose the message and hand it to the user's mail client.
  // Nothing is faked: if their client does not open, nothing was "sent".
  const send = () => {
    const subject = form.name
      ? `${ui.mailSubject}, ${form.name}`
      : ui.mailSubject;
    const body = [
      form.message,
      "",
      `- ${form.name || ui.anonymous}${form.email ? ` (${form.email})` : ""}`,
    ].join("\n");

    posthog.capture("contact_message_sent", {
      has_name: Boolean(form.name),
      has_message: Boolean(form.message),
    });

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    // Plain Enter must still insert a newline inside the textarea.
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      send();
    }
  };

  const update = (key: keyof typeof form) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  return (
    <section id="contact" className="column scroll-mt-12">
      <p className="label reveal">{ui.contact}</p>
      <p className="reveal mt-5 text-base leading-[1.7] text-muted-foreground">
        {ui.contactIntro}
      </p>

      <form
        className="reveal mt-7 flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          send();
        }}
        onKeyDown={onKeyDown}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={fieldClass}
            type="text"
            name="name"
            autoComplete="off"
            aria-label={ui.name}
            placeholder={ui.name}
            value={form.name}
            onChange={update("name")}
            suppressHydrationWarning
          />
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="off"
            aria-label={ui.email}
            placeholder={ui.email}
            value={form.email}
            onChange={update("email")}
            suppressHydrationWarning
          />
        </div>
        <textarea
          className={cn(fieldClass, "min-h-40 resize-y")}
          name="message"
          autoComplete="off"
          aria-label={ui.message}
          placeholder={ui.message}
          value={form.message}
          onChange={update("message")}
          suppressHydrationWarning
        />
        <div className="mt-1 flex items-center justify-between gap-4">
          <button
            type="submit"
            data-cuelume-press
            data-cuelume-release
            className="rounded-xl bg-muted px-4 py-2.5 text-base font-medium text-foreground transition-[background-color,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent active:scale-[0.96] focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none"
          >
            {ui.sendMessage}
          </button>
          <p className="meta">
            {ui.orShortcut}
          </p>
        </div>
      </form>

      <ul className="mt-12 -mx-3">
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
