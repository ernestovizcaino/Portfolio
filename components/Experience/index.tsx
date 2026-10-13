"use client";

import { m, useReducedMotion } from "framer-motion";
import { CompanyChip } from "@/components/CompanyChip";
import { Section } from "@/components/Section";
import type { ExperienceItem } from "@/data/profile";

type DisplayExperienceItem = ExperienceItem;

interface ExperienceProps {
  data: DisplayExperienceItem[];
  label: string;
  at: string;
  dateTo: string;
}

const ExperienceDates = ({
  role,
  dateTo,
}: {
  role: ExperienceItem;
  dateTo: string;
}) => {
  const periods = role.periods ?? [{ from: role.from, to: role.to }];

  return (
    <div className="meta flex shrink-0 flex-col gap-1 sm:w-[9.25rem] sm:pt-1">
      {periods.map((period) => (
        <p key={`${period.from}-${period.to}`} className="leading-snug">
          {period.from} {dateTo} {period.to}
        </p>
      ))}
    </div>
  );
};

export const Experience = ({ data, label, at, dateTo }: ExperienceProps) => {
  const reduceMotion = useReducedMotion();

  if (!data.length) return null;

  return (
    <Section id="experience" label={label}>
      <ul className="mt-8 flex flex-col gap-5">
        {data.map((role, index) => (
          <m.li
            key={`${role.company}-${role.from}`}
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
            <ExperienceDates role={role} dateTo={dateTo} />

            <h3 className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-base font-medium text-foreground">
              <span>{role.role}{role.company !== "Independent" ? ` ${at}` : ""}</span>
              {role.company === "Independent" ? null : role.url ? (
                <a
                  href={role.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group/company inline-flex items-center gap-1.5 rounded-md transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/25"
                >
                  <CompanyChip
                    company={role.company}
                    logo={role.logo}
                  />
                  <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-colors duration-200 group-hover/company:decoration-foreground">
                    {role.company}
                  </span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <CompanyChip
                    company={role.company}
                    logo={role.logo}
                  />
                  {role.company}
                </span>
              )}
            </h3>
          </m.li>
        ))}
      </ul>
    </Section>
  );
};
