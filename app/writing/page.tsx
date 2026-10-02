import Link from "next/link";
import type { Metadata } from "next";
import { Writing } from "@/components/Writing";
import { getPosts } from "@/lib/content";
import { profile } from "@/data/profile";
import { siteConfig, socialImage } from "@/lib/seo";

const description = `Essays by ${profile.fullName} on building software, launching SaaS products, and learning from real users.`;

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    url: "/writing",
    title: `Writing | ${siteConfig.name}`,
    description,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${siteConfig.name}`,
    description,
    creator: siteConfig.twitter,
    images: [socialImage],
  },
};

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div lang="en" className="pt-8 md:pt-10">
      <div className="column pb-12">
        <Link href="/" className="meta rounded-sm transition-colors hover:text-foreground">
          ← {profile.name}
        </Link>
      </div>
      <Writing data={posts} labelAs="h1" />
    </div>
  );
}
