import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  title: `${profile.fullName} | AI / Product Engineer`,
  description:
    "Ernesto Vizcaíno, AI / Product Engineer. Full-stack products, production fintech, AI agents, and machine learning for astronomical research.",
  url: "https://ernestovizcaino.com",
  locale: "en_US",
  twitter: "@erne_vizcaino",
};

export const personId = `${siteConfig.url}/#person`;
export const websiteId = `${siteConfig.url}/#website`;

export const socialImage = {
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${profile.fullName}, AI / Product Engineer`,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
