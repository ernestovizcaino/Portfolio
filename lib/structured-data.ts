import { profile, socials } from "@/data/profile";
import { recognitionSources } from "@/data/recognition";
import { absoluteUrl, personId, siteConfig, websiteId } from "@/lib/seo";

export function profileStructuredData(
  locale: "en" | "es",
  description: string,
  jobTitle: string,
) {
  const pageUrl = locale === "es" ? absoluteUrl("/es") : siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: profile.fullName,
        inLanguage: ["en", "es"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: profile.fullName,
        description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.fullName,
        alternateName: profile.alternateNames,
        url: siteConfig.url,
        image: absoluteUrl(profile.avatar),
        jobTitle,
        description,
        email: `mailto:${profile.email}`,
        knowsAbout: [
          "Artificial intelligence",
          "Full-stack web development",
          "Product engineering",
          "Financial technology",
          "Software as a service",
          "Machine learning",
          "Astroinformatics",
        ],
        sameAs: socials
          .filter(({ href }) => href.startsWith("https://"))
          .map(({ href }) => href),
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Luis Potosí",
          addressCountry: "MX",
        },
        // These articles discuss the person; they are not identity profiles.
        // Keep the graph concise and grounded in the visible institutional sources.
        subjectOf: recognitionSources
          .filter(({ type }) => type !== "press")
          .map((source) => ({
            "@type": "Article",
            headline: source.title,
            url: source.url,
            inLanguage: "es",
            publisher: { "@type": "Organization", name: source.publication },
          })),
      },
    ],
  };
}
