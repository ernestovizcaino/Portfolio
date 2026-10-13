"use client";

import { Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

export const Footer = () => {
  const pathname = usePathname();

  // Keep portfolio chrome off the private family trip page.
  if (pathname?.startsWith("/f/")) {
    return null;
  }

  return (
    <footer className="column pt-20 pb-32">
      <div className="flex items-center justify-between">
        <p className="meta flex items-center gap-1.5 uppercase">
          <HugeiconsIcon icon={Location01Icon} size={13} strokeWidth={2} />
          {profile.location}
        </p>
        <p className="meta uppercase">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
};
