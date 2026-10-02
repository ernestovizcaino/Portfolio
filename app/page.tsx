import { Home } from "../components/Home";
import { profile } from "../data/profile";
import { jsonLd, siteConfig } from "../lib/seo";
import { profileStructuredData } from "@/lib/structured-data";

export const revalidate = 3600;

export default async function HomePage() {
  const structuredData = profileStructuredData("en", siteConfig.description, profile.role);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Home locale="en" />
    </>
  );
}
