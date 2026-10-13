import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Section } from "@/components/Section";
import type { Dictionary } from "@/data/locales";
import { recognitionSources } from "@/data/recognition";
import type { RecognitionSource } from "@/data/recognition";

const dateFormatters = {
  en: new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }),
  es: new Intl.DateTimeFormat("es", { dateStyle: "medium", timeZone: "UTC" }),
};

const SourceLinks = ({
  sources,
  newTab,
  locale,
}: {
  sources: RecognitionSource[];
  newTab: string;
  locale: string;
}) => (
  <ul className="flex flex-col gap-3">
    {sources.map((source) => (
      <li key={source.url}>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          title={source.title}
          className="group/link inline-flex min-h-10 items-center gap-1 rounded-sm text-sm text-foreground/80 transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span>
            <span className="block font-medium text-foreground">{source.publication}</span>
            <span lang="es" className="mt-0.5 block text-sm text-muted-foreground">{source.title}</span>
            {source.publishedAt ? <time dateTime={source.publishedAt} className="meta mt-1 block">{dateFormatters[locale === "es" ? "es" : "en"].format(new Date(source.publishedAt))}</time> : null}
          </span>
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
  locale = "en",
}: {
  copy: Dictionary["pressRecognition"];
  locale?: string;
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
        <p className="text-sm leading-[1.7] text-muted-foreground">
          {copy.summary}
        </p>

        <dl className="mt-6 flex flex-col gap-5">
          {(["institutional", "research", "press"] as const).map((type) => {
            const sources = type === "press"
              ? featuredPress
              : recognitionSources.filter((source) => source.type === type);

            if (!sources.length && !(type === "press" && morePress.length)) return null;

            return (
              <div key={type} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="meta shrink-0 sm:w-[8.5rem] sm:pt-1">{copy[type]}</dt>
                <dd className="min-w-0 flex-1">
                  <SourceLinks sources={sources} newTab={copy.newTab} locale={locale} />
                  {type === "press" && morePress.length > 0 ? (
                    <details className="group/coverage mt-2">
                      <summary className="min-h-10 w-fit cursor-pointer rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                        <span className="group-open/coverage:hidden">{copy.more}</span>
                        <span className="hidden group-open/coverage:inline">{copy.less}</span>
                      </summary>
                      <div className="mt-3">
                        <SourceLinks sources={morePress} newTab={copy.newTab} locale={locale} />
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
