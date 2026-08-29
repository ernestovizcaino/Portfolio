export const siteConfig = {
  name: "Ernesto Vizcaíno",
  title: "Ernesto Vizcaíno, AI / Product Engineer",
  description:
    "AI and product engineer building and launching products from zero to production, with fintech, SaaS and machine learning experience.",
  url: "https://ernestovizcaino.com",
  locale: "en_US",
  twitter: "@erne_vizcaino",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
