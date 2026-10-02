import {
  ArrowLeft01Icon,
  Clock01Icon,
  TextAlignLeftIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "markdown-to-jsx";
import { Writing } from "../../../components/Writing";
import { longDate, readingTime, wordCount } from "../../../lib/format";
import { getArticle, getPosts } from "../../../lib/content";
import { jsonLd, personId, siteConfig, socialImage, websiteId } from "../../../lib/seo";
import { profile } from "@/data/profile";
import type { Metadata } from "next";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }

  const path = `/article/${id}`;

  return {
    title: article.Title,
    description: article.Description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.Title,
      description: article.Description,
      siteName: siteConfig.name,
      locale: article.language === "es" ? "es_MX" : "en_US",
      authors: [siteConfig.url],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.Cover ? [{ url: article.Cover, alt: article.Title }] : [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitter,
      title: article.Title,
      description: article.Description,
      images: article.Cover ? [article.Cover] : [socialImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const posts = await getPosts();
  const otherPosts = posts.filter((post) => String(post.id) !== String(id));
  const articleUrl = `${siteConfig.url}/article/${id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: article.Title,
    description: article.Description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    isPartOf: { "@id": websiteId },
    image: article.Cover,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: article.language,
    author: {
      "@type": "Person",
      "@id": personId,
      name: profile.fullName,
      url: siteConfig.url,
    },
  };

  return (
    <article lang={article.language} className="pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <div className="column pt-8 pb-12 md:pt-10">
        <Link
          href="/writing"
          className="meta -mx-2 flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors duration-200 hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={13} strokeWidth={2} />
          {article.language === "es" ? "ARTÍCULOS" : "WRITING"}
        </Link>
      </div>

      <header className="column">
        <div className="flex items-center justify-between gap-4">
          <time dateTime={article.publishedAt} className="meta">{longDate(article.Creation)}</time>
          <div className="meta flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={2} />
              {readingTime(article.Content)} m
            </span>
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={TextAlignLeftIcon} size={14} strokeWidth={2} />
              {wordCount(article.Content)} words
            </span>
          </div>
        </div>

        <h1 className="mt-8 text-2xl leading-[1.25] font-medium tracking-[-0.02em] text-foreground md:text-[28px]">
          {article.Title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {article.language === "es" ? "Por" : "By"}{" "}
          <Link href="/" rel="author" className="rounded-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground">
            {profile.fullName}
          </Link>
        </p>
        {article.Description ? (
          <p className="mt-4 text-base leading-[1.7] text-muted-foreground">
            {article.Description}
          </p>
        ) : null}

      </header>

      <div className="column mt-14">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-[-0.011em] prose-p:leading-[1.7] prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:font-normal prose-a:text-foreground prose-a:decoration-border prose-a:underline-offset-4 hover:prose-a:decoration-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-surface prose-pre:text-foreground prose-img:image-outline prose-img:rounded-xl">
          <Markdown>{article.Content ?? ""}</Markdown>
        </div>
      </div>

      {otherPosts.length ? (
        <div className="mt-24">
          <Writing
            data={otherPosts}
            id="more-writing"
            label="More writing"
          />
        </div>
      ) : null}
    </article>
  );
}
