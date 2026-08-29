"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { m, useReducedMotion } from "framer-motion";
import posthog from "posthog-js";
import { Section } from "@/components/Section";
import type { AwardItem } from "@/data/profile";

interface AwardsProps {
  data: AwardItem[];
  label: string;
}

export const Awards = ({ data, label }: AwardsProps) => {
  const reduceMotion = useReducedMotion();

  if (!data.length) return null;

  return (
    <Section id="awards" label={label}>
      <ul className="mt-10 flex flex-col gap-10">
        {data.map((award, index) => (
          <m.li
            key={award.title}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 16,
              filter: reduceMotion ? "none" : "blur(4px)",
            }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              type: "spring",
              duration: 0.45,
              bounce: 0,
              delay: reduceMotion ? 0 : index * 0.07,
            }}
            className="border-l border-foreground/15 pl-5 sm:pl-6"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-base font-medium text-foreground">
                {award.title}
              </h3>
              <p className="meta shrink-0 uppercase">{award.date}</p>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {award.track} · {award.org}
            </p>

            <p className="mt-3 font-mono text-sm text-foreground/80">
              {award.project}
            </p>

            <p className="mt-3 text-base leading-[1.7] text-muted-foreground">
              {award.summary}
            </p>

            <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {award.metrics.map((metric) => (
                <li
                  key={metric}
                  className="font-mono text-sm leading-[1.6] text-foreground"
                >
                  {metric}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={award.link.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  posthog.capture("award_link_clicked", {
                    award_title: award.title,
                    link_url: award.link.href,
                  })
                }
                className="group/link inline-flex w-fit items-center gap-1.5 text-base font-medium text-foreground transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25"
              >
                {award.link.label}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  strokeWidth={2}
                  className="transition-[transform,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover/link:translate-x-px group-hover/link:-translate-y-px"
                />
              </a>
              {award.note ? (
                <p className="text-sm text-faint">{award.note}</p>
              ) : null}
            </div>
          </m.li>
        ))}
      </ul>
    </Section>
  );
};
