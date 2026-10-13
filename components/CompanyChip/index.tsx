import Image from "next/image";

interface CompanyChipProps {
  company: string;
  logo?: string;
}

export const CompanyChip = ({ company, logo }: CompanyChipProps) => {
  if (logo) {
    return (
      <span
        aria-hidden="true"
        className="grid size-[22px] shrink-0 place-items-center overflow-hidden rounded-md"
      >
        <Image
          src={logo}
          alt=""
          width={22}
          height={22}
          className="size-[22px] object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-[22px] shrink-0 place-items-center rounded-md bg-muted font-mono text-[10px] text-muted-foreground"
    >
      {company.replace(/[^a-z0-9]/gi, "").charAt(0).toUpperCase()}
    </span>
  );
};
