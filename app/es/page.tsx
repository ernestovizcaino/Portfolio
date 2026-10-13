import { Home } from "../../components/Home";
import { getDictionary } from "../../data/locales";
import { profile } from "../../data/profile";
import { jsonLd, siteConfig, socialImage } from "../../lib/seo";
import { profileStructuredData } from "@/lib/structured-data";
import type { Metadata } from "next";

export const revalidate = 3600;

const dictionary = getDictionary("es");

const title = `${profile.fullName} | ${dictionary.profile.role}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: dictionary.metadata.description,
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    title,
    siteName: siteConfig.name,
    description: dictionary.metadata.description,
    locale: "es_MX",
    url: "/es",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitter,
    title,
    description: dictionary.metadata.description,
    images: [socialImage],
  },
};

export default function SpanishHomePage() {
  const structuredData = profileStructuredData(
    "es", dictionary.metadata.description, dictionary.profile.role,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Home locale="es" />
    </>
  );
}
