import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  label: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  labelAs?: "p" | "h1" | "h2";
}

export const Section = ({
  id,
  label,
  intro,
  children,
  className,
  labelAs: Label = "h2",
}: SectionProps) => {
  return (
    <section
      id={id}
      aria-labelledby={Label !== "p" ? `${id}-heading` : undefined}
      className={`column scroll-mt-12 ${className ?? ""}`}
    >
      <Label
        id={Label !== "p" ? `${id}-heading` : undefined}
        className="label reveal"
      >
        {label}
      </Label>
      {intro ? (
        <p className="reveal mt-5 text-base leading-[1.7] text-muted-foreground">
          {intro}
        </p>
      ) : null}
      {children}
    </section>
  );
};
