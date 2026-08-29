"use client";

import {
  ArrowUpRight01Icon,
  ConstellationIcon,
  GalaxyIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import posthog from "posthog-js";
import { Section } from "@/components/Section";
import type { Project } from "@/data/content";

const projectIcons = {
  galaxy: GalaxyIcon,
  constellation: ConstellationIcon,
} as const;

const ProjectMark = ({ project }: { project: Project }) => (
  <span
    aria-hidden="true"
    className="grid size-10 shrink-0 place-items-center"
  >
    {project.Image ? (
      <Image
        src={project.Image}
        alt=""
        width={80}
        height={80}
        quality={100}
        sizes="40px"
        className="size-10 rounded-[10px] object-contain"
      />
    ) : project.Icon ? (
      <span className="grid size-10 place-items-center rounded-[10px] bg-muted text-muted-foreground">
        <HugeiconsIcon
          icon={projectIcons[project.Icon]}
          size={18}
          strokeWidth={2}
        />
      </span>
    ) : (
      <span className="font-mono text-sm text-foreground/70">
        {project.Monogram ??
          project.Project_Title.replace(/[^a-z0-9]/gi, "").charAt(0)}
      </span>
    )}
  </span>
);

interface ProjectsProps {
  data: Project[];
  label?: string;
  intro?: string;
}

const ProjectRow = ({
  project,
  reduceMotion,
}: {
  project: Project;
  reduceMotion: boolean | null;
}) => {
  const content = (
    <>
      <ProjectMark project={project} />

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-medium text-foreground">
            {project.Project_Title}
          </span>
          {project.award ? (
            <span className="font-mono text-xs text-foreground/70">
              {project.award}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-sm text-faint">{project.Category}</span>
        <span className="mt-1.5 block text-sm font-medium text-foreground">
          {project.Metrics}
        </span>
        <span className="mt-1 block text-pretty text-sm leading-[1.6] text-muted-foreground">
          {project.Description}
        </span>
      </span>

      {project.Project_URL ? (
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={16}
          strokeWidth={2}
          className="shrink-0 text-faint transition-[transform,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-hover/row:translate-x-px group-hover/row:-translate-y-px group-hover/row:text-foreground"
        />
      ) : null}
    </>
  );

  if (project.Project_URL) {
    return (
      <m.a
        href={project.Project_URL}
        target="_blank"
        rel="noreferrer"
        whileHover={reduceMotion ? undefined : { x: 3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        onClick={() =>
          posthog.capture("project_link_clicked", {
            project_title: project.Project_Title,
            project_url: project.Project_URL,
          })
        }
        className="group/row flex items-start gap-4 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
      >
        {content}
      </m.a>
    );
  }

  return (
    <div className="flex items-start gap-4 rounded-xl px-3 py-3">
      {content}
    </div>
  );
};

export const Projects = ({ data, label = "Selected work", intro }: ProjectsProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="projects"
      label={label}
      intro={intro}
    >
      <ul className="-mx-3 mt-8">
        {data.map((project, index) => (
          <m.li
            key={project.id}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14, filter: reduceMotion ? "none" : "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
              delay: reduceMotion ? 0 : index * 0.06,
            }}
          >
            <ProjectRow project={project} reduceMotion={reduceMotion} />
          </m.li>
        ))}
      </ul>
    </Section>
  );
};
