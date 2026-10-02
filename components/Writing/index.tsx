"use client";

import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { Section } from "@/components/Section";
import { readingTime, shortDate, timestamp } from "@/lib/format";
import type { Post } from "@/data/content";

interface WritingProps {
  data: Post[];
  id?: string;
  label?: string;
  locale?: string;
  emptyLabel?: string;
  labelAs?: "h1" | "h2";
}

export const Writing = ({
  data,
  id = "writing",
  label = "Writing",
  locale = "en",
  emptyLabel = "New posts are coming soon.",
  labelAs = "h2",
}: WritingProps) => {
  const reduceMotion = useReducedMotion();
  const posts = data.toSorted(
    (a, b) => timestamp(b.Creation) - timestamp(a.Creation),
  );

  return (
    <Section id={id} label={label} labelAs={labelAs}>
      {posts.length ? (
        <ul className="mt-8 -mx-3">
          {posts.map((post, index) => (
            <m.li
              key={post.id}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 12,
                filter: reduceMotion ? "none" : "blur(4px)",
              }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                duration: 0.4,
                bounce: 0,
                delay: reduceMotion ? 0 : index * 0.06,
              }}
            >
              <Link
                href={`/article/${post.id}`}
                onClick={() =>
                  posthog.capture("article_opened", {
                    article_id: post.id,
                    article_title: post.Title,
                    reading_time_minutes: readingTime(post.Content),
                    locale,
                  })
                }
                className="group/row flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              >
                <time dateTime={post.publishedAt} className="meta w-[4.75rem] shrink-0">
                  {shortDate(post.Creation)}
                </time>
                <span className="min-w-0 flex-1 text-pretty text-base text-foreground">
                  {post.Title}
                </span>
                <span className="meta flex shrink-0 items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} size={13} strokeWidth={2} />
                  {readingTime(post.Content)} m
                </span>
              </Link>
            </m.li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-base text-muted-foreground">
          {emptyLabel}
        </p>
      )}
    </Section>
  );
};
