import { readFile } from "node:fs/promises";
import path from "node:path";
import { posts as archivedPosts, projects } from "../data/content";
import type { Post } from "../data/content";
import { parseSpanishDate } from "./format";

const NEW_POSTS_PATH = path.join(process.cwd(), "data", "new-posts.md");
const PUBLISHED_DATES = [
  "Lunes, 27 de julio del 2026",
  "Lunes, 20 de julio del 2026",
  "Lunes, 13 de julio del 2026",
  "Lunes, 6 de julio del 2026",
  "Lunes, 29 de junio del 2026",
];

const DESCRIPTIONS: Record<string, string> = {
  "i-shipped-kashi-getting-people-to-use-it-was-harder":
    "What launching Kashi taught me about product adoption, switching costs, onboarding, and choosing a focused customer problem.",
  "i-kept-adding-features-users-still-didnt-stay":
    "How building Kashi changed the way I think about feature scope, product complexity, and the user outcomes that matter.",
  "a-week-of-meta-ads-five-trials-and-no-retained-customers":
    "A small paid acquisition experiment for Kashi, what the funnel showed, and why clicks and trials did not become retained customers.",
  "i-tried-to-build-for-every-small-business":
    "Why building Kashi for every kind of small business made product focus harder, and what I would do differently.",
  "shipping-software-is-different-when-someone-depends-on-it":
    "What operating Kashi taught me about production reliability, support, user behavior, and the work that continues after launch.",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[“”"']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const withPublishedDate = (post: Post): Post => {
  const parsedDate = parseSpanishDate(post.Creation);

  return {
    ...post,
    // The source records calendar dates, not a publication time or timezone.
    publishedAt: post.publishedAt ?? (parsedDate
      ? `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`
      : undefined),
  };
};

async function getNewPosts(): Promise<Post[]> {
  const source = await readFile(NEW_POSTS_PATH, "utf8");

  return source
    .split(/\n---\n/g)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section, index) => {
      const [heading, ...bodyLines] = section.split("\n");
      const title = heading.replace(/^#\s+\d+\.\s*/, "").trim();
      const content = bodyLines.join("\n").trim();
      const description =
        content.split(/\n\s*\n/).find((paragraph) => paragraph.trim()) ?? "";

      return withPublishedDate({
        id: slugify(title),
        Title: title,
        Creation: PUBLISHED_DATES[index],
        Description: DESCRIPTIONS[slugify(title)] ?? description.replace(/[*_`]/g, "").trim(),
        Content: content,
        language: "en",
      });
    });
}

async function getAllPosts() {
  const newPosts = await getNewPosts();
  return [...newPosts, ...archivedPosts.map((post) => withPublishedDate({
    ...post,
    language: post.language ?? "es",
  }))];
}

export async function getHomeContent() {
  return { posts: await getAllPosts(), projects };
}

export async function getPosts() {
  return getAllPosts();
}

export async function getArticle(id: string) {
  const posts = await getAllPosts();
  return posts.find((post) => String(post.id) === String(id)) ?? null;
}
