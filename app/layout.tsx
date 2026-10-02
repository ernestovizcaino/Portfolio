import { Figtree, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Dock } from "../components/Dock";
import { Footer } from "../components/Footer";
import { MotionProvider } from "../components/MotionProvider";
import { SkipLink } from "../components/SkipLink";
import { SoundProvider } from "../components/SoundProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import { siteConfig, socialImage } from "../lib/seo";
import { profile } from "@/data/profile";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Ernesto Vizcaíno",
    "full stack engineer",
    "AI engineer",
    "product engineer",
    "fintech developer",
    "SaaS developer",
    "machine learning engineer",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  authors: [{ name: profile.fullName, url: siteConfig.url }],
  creator: profile.fullName,
  publisher: profile.fullName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [socialImage],
  },
  icons: { icon: "/favicon.ico" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#242424" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SoundProvider>
            <MotionProvider>
              <SkipLink />
              <main id="main">{children}</main>
              <Footer />
              <Dock />
            </MotionProvider>
          </SoundProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
