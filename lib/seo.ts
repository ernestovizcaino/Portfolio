import { profile } from "@/data/profile";

export const siteConfig = {
  name: profile.name,
  title: `${profile.fullName} | AI / Product Engineer`,
  description:
    "Ernesto Vizcaíno Alvarado is an AI and product engineer in San Luis Potosí, Mexico, building software and applying machine learning to astronomical data.",
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
