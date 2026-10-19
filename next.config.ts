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
  async redirects() {
    return [
      // The English and Spanish resumes were merged into one.
      {
        source: "/resume/:locale(en|es)",
        destination: "/resume",
        permanent: true,
      },
      {
        source: "/article/i-built-a-complete-saas-and-learned-that-nobody-was-waiting-for-it",
        destination: "/article/i-shipped-kashi-getting-people-to-use-it-was-harder",
        permanent: true,
      },
      {
        source: "/article/more-features-do-not-create-more-value",
        destination: "/article/i-kept-adding-features-users-still-didnt-stay",
        permanent: true,
      },
      {
        source: "/article/what-spending-money-on-ads-taught-me-about-saas",
        destination: "/article/a-week-of-meta-ads-five-trials-and-no-retained-customers",
        permanent: true,
      },
      {
        source: "/article/small-businesses-is-not-a-market",
        destination: "/article/i-tried-to-build-for-every-small-business",
        permanent: true,
      },
      {
        source: "/article/the-difference-between-a-portfolio-project-and-a-real-product",
        destination: "/article/shipping-software-is-different-when-someone-depends-on-it",
        permanent: true,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
