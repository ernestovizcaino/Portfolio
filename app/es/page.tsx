import { Home } from "../../components/Home";
import { getDictionary } from "../../data/locales";
import { profile, socials } from "../../data/profile";
import { absoluteUrl, jsonLd, siteConfig } from "../../lib/seo";

export const revalidate = 3600;

const dictionary = getDictionary("es");

export const metadata = {
  title: "Ingeniero de Producto / IA",
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
    title: "Ernesto Vizcaíno, Ingeniero de Producto / IA",
    description: dictionary.metadata.description,
    locale: "es_MX",
    url: "/es",
  },
  twitter: {
    title: "Ernesto Vizcaíno, Ingeniero de Producto / IA",
    description: dictionary.metadata.description,
  },
};

export default function SpanishHomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: profile.name,
    url: absoluteUrl("/es"),
    image: absoluteUrl(profile.avatar),
    jobTitle: dictionary.profile.role,
    description: dictionary.metadata.description,
    inLanguage: "es-MX",
    sameAs: socials
      .filter(({ href }) => href.startsWith("http"))
      .map(({ href }) => href),
  };

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
