import type { Dictionary } from "@/data/locales";
import { recognitionSources } from "@/data/recognition";

export const PressRecognition = ({
  copy,
}: {
  copy: Dictionary["pressRecognition"];
}) => (
  <div id="press-recognition" className="mt-10 flex flex-col gap-1 sm:flex-row sm:gap-6">
    <p className="meta shrink-0 sm:w-[9.25rem] sm:pt-1">{copy.label}</p>
    <ul className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
      {recognitionSources.map((source, index) => (
        <li key={source.url} className="inline-flex items-center gap-x-1.5">
          {index > 0 ? <span aria-hidden="true" className="text-faint">·</span> : null}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={source.title}
            className="inline-flex min-h-10 items-center rounded-sm underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-foreground hover:decoration-foreground"
          >
            {source.shortName ?? source.publication}
            <span className="sr-only"> — {source.title} ({copy.newTab})</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
