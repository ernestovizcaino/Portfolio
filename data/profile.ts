// ---------------------------------------------------------------------------
// Everything personal about the site lives here so it can be edited in one
// place. Fields marked TODO are the ones I could not derive from your existing
// content. Fill them in (or leave them empty and the section hides itself).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ernesto Vizcaíno",
  role: "AI / Product Engineer",
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
    {
      text: "I've been building software since I was 13. Since then, I've taken products from idea to thousands of users, built revenue generating SaaS and fintech systems, and applied machine learning to millions of astronomical objects.",
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
    from: "Apr 2026",
    to: "Present",
    role: "Founder / Product Engineer",
    company: "PasaEGEL",
    url: "https://www.pasaegel.com/",
    logo: "/brands/pasaegel.png",
    summary:
      "Founded and built an EGEL exam prep platform end to end, including interactive simulations, study modules, payments, analytics and SEO driven acquisition. Grew to 500+ users and 200+ paid orders within a few months, driven primarily by organic search and top five Google rankings for targeted EGEL queries.",
  },
  {
    from: "Oct 2025",
    to: "Sep 2026",
    periods: [
      { from: "Oct 2025", to: "Jan 2026" },
      { from: "Aug 2026", to: "Sep 2026" },
    ],
    role: "AI Engineer / Founding Team",
    company: "Financiamiento Inteligente / Xignus",
    url: "https://financiamientointeligente.com/",
    logo: "/brands/financiamiento-inteligente.svg",
    summary:
      "Built a credit pre approval system that supported more than $4M MXN in SMB financing during its first month, alongside production AI agents and financial data products. Rejoined in 2026 to build CONTPAQi integrations and ETL pipelines that transform accounting data into automated Excel reports and reconciliation workflows.",
  },
  {
    from: "Jan 2024",
    to: "Jul 2025",
    role: "Technical Cofounder",
    company: "Oliver AI",
    url: "https://www.tryoliver.ai/en",
    logo: "/brands/oliver.ico",
    summary:
      "Led engineering across a fintech platform and production AI workflows for loan origination, portfolio analysis, risk review, compliance and financial document processing.",
  },
  {
    from: "Aug 2021",
    to: "Dec 2023",
    role: "Founder / Engineer",
    company: "Oliver POS / ERP",
    logo: "/brands/oliver.ico",
    summary:
      "Built and launched a mobile POS that reached 10,000+ downloads and 3,000 active users within three months, then expanded it into a complete web based ERP.",
  },
];

export const awards = [
  {
    title: "1st Place, Xólotl Hackathon",
    track: "Phase 3, Advanced Track",
    org: "CUDI / LAMOD UNAM",
    date: "Aug 2026",
    project: "Rubin/LSST Astronomical Time Series Classification",
    summary:
      "Won the advanced track after building an uncertainty aware classification and scientific prioritization pipeline for Rubin/LSST like astronomical time series data.",
    metrics: [
      "5.1M+ astronomical objects",
      "10 morphologies",
      "6,000 evaluation light curves",
      "600 completely unseen observing cadences",
      "68.47% balanced accuracy",
      "68.28% macro F1",
    ],
    link: {
      href: "https://cudi.edu.mx/noticias/premiacion-hackathon",
      label: "View official announcement",
    },
    note: "Award includes attendance at CARLA 2026 in Córdoba, Argentina 🇦🇷.",
  },
];

export const research = [
  {
    title: "Gaia / OGLE Variable Star Classification",
    year: "2026",
    institution: "Universidad Autónoma de San Luis Potosí",
    summary:
      "Built a machine learning pipeline for periodic variable star classification, processing 491,073 Gaia sources and engineering 91 time series, Fourier, color and catalog features. A class weighted XGBoost model reached 0.9495 macro F1 on held out data and 0.9847 weighted F1 against mapped OGLE labels.",
  },
];

export type Profile = typeof profile;
export type ExperienceItem = {
  from: string;
  to: string;
  role: string;
  company: string;
  summary: string;
  url?: string;
  logo?: string;
  periods?: { from: string; to: string }[];
};
export type AwardItem = (typeof awards)[number];
export type ResearchItem = (typeof research)[number];
export type SocialIcon = (typeof socials)[number]["icon"];
