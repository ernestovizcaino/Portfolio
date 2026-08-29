import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ernesto Vizcaíno, AI / Product Engineer",
    short_name: "Ernesto Vizcaíno",
    description:
      "Portfolio of Ernesto Vizcaíno, an AI and product engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#242424",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
