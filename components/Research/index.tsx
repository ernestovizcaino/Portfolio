"use client";

import { m, useReducedMotion } from "framer-motion";
import { Section } from "@/components/Section";
import type { ResearchItem } from "@/data/profile";

interface ResearchProps {
  data: ResearchItem[];
  label: string;
}

export const Research = ({ data, label }: ResearchProps) => {
  const reduceMotion = useReducedMotion();

  if (!data.length) return null;

  return (
    <Section id="research" label={label}>
      <ul className="mt-10 flex flex-col gap-8">
        {data.map((item, index) => (
          <m.li
            key={item.title}
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
            className="flex flex-col gap-1 sm:flex-row sm:gap-6"
          >
            <p className="meta shrink-0 uppercase sm:w-[8.5rem] sm:pt-1">
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
            </div>
          </m.li>
        ))}
      </ul>
    </Section>
  );
};
