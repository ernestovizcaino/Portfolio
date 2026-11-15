import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      // Family-trip album on Cloudflare R2 public hosts.
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      // Kashi logo, hotlinked from its own site.
      {
        protocol: "https",
        hostname: "www.getkashi.com",
      },
      // UploadThing file host (poster images and other uploads).
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
