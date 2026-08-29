import { findResume, resumes } from "../../../data/resumes";
import { getPostHogClient } from "../../../lib/posthog-server";
import type { NextRequest } from "next/server";

// Cached at the edge for a day; the upstream file is immutable per upload.
const CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export async function generateStaticParams() {
  return resumes.map((resume) => ({ locale: resume.locale }));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  // Looked up from our own allowlist. The upstream URL is never taken from
  // the request, so this cannot be turned into an open proxy.
  const resume = findResume(locale);

  if (!resume) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch(resume.url, {
      headers: { Accept: "application/pdf" },
    });
  } catch {
    return new Response("Resume is temporarily unavailable", {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("Resume is temporarily unavailable", {
      status: 502,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    // The reason this route exists: forces a download with a clean filename.
    "Content-Disposition": `attachment; filename="${resume.filename}"`,
    "Cache-Control": CACHE_CONTROL,
    "X-Content-Type-Options": "nosniff",
  });

  // Pass the length through when upstream provides it so browsers can show a
  // real progress bar rather than an indeterminate spinner.
  const length = upstream.headers.get("content-length");
  if (length) headers.set("Content-Length", length);

  const posthog = getPostHogClient();
  if (posthog) {
    posthog.capture({
      distinctId: "anonymous",
      event: "resume_served",
      properties: {
        locale: resume.locale,
        filename: resume.filename,
      },
    });
    await posthog.flush();
  }

  return new Response(upstream.body, { status: 200, headers });
}
