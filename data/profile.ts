// ---------------------------------------------------------------------------
// Everything personal about the site lives here so it can be edited in one
// place. Fields marked TODO are the ones I could not derive from your existing
// content — fill them in (or leave them empty and the section hides itself).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ernesto Vizcaíno",
  role: "Product Engineer — AI, Fintech & SaaS",
  avatar: "/profile.jpg",
  email: "vizcaino.erne@gmail.com",
  verified: true,

  // TODO: your birth year, shown as "EST. ____" in the top bar.
  establishedYear: 2003,

  // TODO: your city / country and IANA timezone, shown in the top bar clock
  // and the footer. Find yours at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  location: "San Luis Potosí, México",
  timeZone: "America/Mexico_City",
  timeZoneLabel: "CST",

  bio: [
    { text: "I build and launch " },
    { text: "full-stack products from zero to production", strong: true },
    {
      text: ". I’ve founded SaaS products, built fintech and AI systems, and shipped mobile software used by thousands of people.",
    },
  ],
};

export const socials = [
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}`, icon: "mail" },
  { label: "X.com", handle: "@erne_vizcaino", href: "https://twitter.com/erne_vizcaino", icon: "x" },
  { label: "GitHub", handle: "@ernestovizcaino", href: "https://github.com/ernestovizcaino", icon: "github" },
  { label: "LinkedIn", handle: "/in/erne-vizcaino", href: "https://www.linkedin.com/in/erne-vizcaino/", icon: "linkedin" },
];

// simple-icons slugs. Every entry here is a technology named in your own
// project descriptions in data/content.js.
export const stack = [
  "typescript",
  "python",
  "react",
  "nextdotjs",
  "reactnative",
  "expo",
  "nodedotjs",
  "postgresql",
  "mysql",
  "amazonwebservices",
  "vercel",
  "posthog",
];

export const experience = [
  {
    from: "Jan 2026",
    to: "Present",
    role: "Founder / Product Engineer",
    company: "Kashi",
    url: "https://www.getkashi.com/",
    logo: "/brands/kashi.png",
    summary:
      "Designed and built an offline-first POS for small businesses across mobile and web, including inventory, sales, customer credit, reporting and cross-platform subscriptions.",
  },
  {
    from: "Apr 2026",
    to: "Present",
    role: "Founder / Product Engineer",
    company: "PasaEGEL",
    url: "https://www.pasaegel.com/",
    logo: "/brands/pasaegel.png",
    summary:
      "Founded and built an EGEL preparation platform end to end, including interactive simulations, payments, analytics and SEO. Reached 300+ users, 5,000+ monthly visitors, 130+ paid orders and top-five Google rankings, driven primarily by organic search.",
  },
  {
    from: "Oct 2025",
    to: "Jan 2026",
    role: "AI Engineer / Founding Team",
    company: "Financiamiento Inteligente / Xignus",
    url: "https://financiamientointeligente.com/",
    logo: "/brands/financiamiento-inteligente.svg",
    summary:
      "Built a credit pre-approval system that supported more than $4M MXN in SMB financing during its first month, alongside AI agents and financial dashboards built with React and Python.",
  },
  {
    from: "Jan 2024",
    to: "Jul 2025",
    role: "Technical Co-Founder",
    company: "Oliver AI",
    url: "https://www.tryoliver.ai/en",
    logo: "/brands/oliver.ico",
    summary:
      "Led engineering across a fintech platform and production AI workflows for loan origination, risk analysis, compliance and document processing.",
  },
  {
    from: "Aug 2021",
    to: "Dec 2023",
    role: "Founder / Engineer",
    company: "Oliver POS / ERP",
    logo: "/brands/oliver.ico",
    summary:
      "Built and launched a React Native POS app that reached 10,000+ downloads and 3,000 active users within three months, then expanded it into a complete web ERP.",
  },
];

export type Profile = typeof profile;
export type ExperienceItem = (typeof experience)[number];
export type SocialIcon = (typeof socials)[number]["icon"];
