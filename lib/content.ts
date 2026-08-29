import { readFile } from "node:fs/promises";
import path from "node:path";
import { posts as archivedPosts, projects } from "../data/content";
import type { Post } from "../data/content";
import { filterProjects } from "../data/visibility";
import { parseSpanishDate } from "./format";

const NEW_POSTS_PATH = path.join(process.cwd(), "data", "new-posts.md");
const PUBLISHED_DATES = [
  "Lunes, 27 de julio del 2026",
  "Lunes, 20 de julio del 2026",
  "Lunes, 13 de julio del 2026",
  "Lunes, 6 de julio del 2026",
  "Lunes, 29 de junio del 2026",
];

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
    publishedAt: parsedDate?.toISOString(),
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
        Description: description.replace(/[*_`]/g, "").trim(),
        Content: content,
      });
    });
}

async function getAllPosts() {
  const newPosts = await getNewPosts();
  return [...newPosts, ...archivedPosts.map(withPublishedDate)];
}

export async function getHomeContent() {
  return { posts: await getAllPosts(), projects: filterProjects(projects) };
}

export async function getPosts() {
  return getAllPosts();
}

export async function getArticle(id: string) {
  const posts = await getAllPosts();
  return posts.find((post) => String(post.id) === String(id)) ?? null;
}
