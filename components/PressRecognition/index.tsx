import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Section } from "@/components/Section";
import type { Dictionary } from "@/data/locales";
import { recognitionSources } from "@/data/recognition";
import type { RecognitionSource } from "@/data/recognition";

const SourceLinks = ({
  sources,
  newTab,
}: {
  sources: RecognitionSource[];
  newTab: string;
}) => (
  <ul className="flex flex-wrap gap-x-4 gap-y-1">
    {sources.map((source) => (
      <li key={source.url}>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          title={source.title}
          className="group/link inline-flex min-h-6 items-center gap-1 rounded-sm text-sm text-foreground/80 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {source.publication}
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={13}
            strokeWidth={2}
            aria-hidden="true"
            className="shrink-0 text-faint motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/link:translate-x-px motion-safe:group-hover/link:-translate-y-px"
          />
          <span className="sr-only"> ({newTab})</span>
        </a>
      </li>
    ))}
  </ul>
);

export const PressRecognition = ({
  copy,
}: {
  copy: Dictionary["pressRecognition"];
}) => {
  const featuredPress = recognitionSources.filter(
    (source) => source.type === "press" && source.featured,
  );
  const morePress = recognitionSources.filter(
    (source) => source.type === "press" && !source.featured,
  );

  return (
    <Section id="press-recognition" label={copy.label} labelAs="h2">
      <div className="reveal mt-8">
        <h3 className="text-base font-medium text-foreground">{copy.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{copy.metadata}</p>
        <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
          {copy.summary}
        </p>

        <dl className="mt-6 space-y-4">
          {(["institutional", "research", "press"] as const).map((type) => {
            const sources = type === "press"
              ? featuredPress
              : recognitionSources.filter((source) => source.type === type);

            if (!sources.length && !(type === "press" && morePress.length)) return null;

            return (
              <div key={type} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="meta shrink-0 sm:w-[8.5rem] sm:pt-1">{copy[type]}</dt>
                <dd className="min-w-0 flex-1">
                  <SourceLinks sources={sources} newTab={copy.newTab} />
                  {type === "press" && morePress.length > 0 ? (
                    <details className="group/coverage mt-2">
                      <summary className="min-h-6 w-fit cursor-pointer rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                        <span className="group-open/coverage:hidden">{copy.more}</span>
                        <span className="hidden group-open/coverage:inline">{copy.less}</span>
                      </summary>
                      <div className="mt-3">
                        <SourceLinks sources={morePress} newTab={copy.newTab} />
                      </div>
                    </details>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </Section>
  );
};
