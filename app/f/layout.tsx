import { Nunito } from "next/font/google";
import type { ReactNode } from "react";
import "@/styles/family-trip.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-display",
  weight: ["600", "700", "800"],
});

export default function FamilyTripLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={`family-trip ${nunito.variable}`}>{children}</div>;
}
