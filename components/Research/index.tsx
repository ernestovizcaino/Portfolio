"use client";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Section } from "@/components/Section";
import type { ResearchItem } from "@/data/profile";

interface ResearchProps {
  data: ResearchItem[];
  label: string;
  newTab: string;
  children?: ReactNode;
}

export const Research = ({ data, label, newTab, children }: ResearchProps) => {
  const reduceMotion = useReducedMotion();

  if (!data.length) return null;

  return (
    <Section id="research" label={label}>
      <ul className="mt-8 flex flex-col gap-8">
        {data.map((item, index) => (
          <m.li
            key={item.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              type: "spring",
              duration: 0.45,
              bounce: 0,
              delay: reduceMotion ? 0 : index * 0.07,
            }}
            className="flex flex-col gap-1 sm:flex-row sm:gap-6"
          >
            <p className="meta shrink-0 uppercase sm:w-[9.25rem] sm:pt-1">
              {item.year}
            </p>

            <div className="min-w-0">
              <h3 className="text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.institution}
              </p>
              <p className="mt-2 text-base leading-[1.7] text-muted-foreground">
                {item.summary}
              </p>
              {item.link ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-1 inline-flex min-h-10 items-center gap-1 rounded-sm text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  {item.link.label}
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-faint motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/link:translate-x-px motion-safe:group-hover/link:-translate-y-px"
                  />
                  <span className="sr-only"> ({newTab})</span>
                </a>
              ) : null}
            </div>
          </m.li>
        ))}
      </ul>
      {children}
    </Section>
  );
};
