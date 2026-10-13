// ---------------------------------------------------------------------------
// Everything personal about the site lives here so it can be edited in one
// place. Fields marked TODO are the ones I could not derive from your existing
// content. Fill them in (or leave them empty and the section hides itself).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ernesto Vizcaíno",
  fullName: "Ernesto Vizcaíno Alvarado",
  alternateNames: ["Ernesto Vizcaíno", "Ernesto Vizcaino", "Ernesto Vizcaino Alvarado"],
  role: "Software Engineer & Founder",
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

  headline: "I build software from scratch and get it into people's hands.",
  bio: [
    {
      text: "I've built and launched software for small businesses, led engineering on fintech and AI products, and worked on machine learning for astronomical data. I care about the whole process: writing the code, shipping it, talking to users, and figuring out what to build next.",
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
    role: "Independent Product Engineer / Founder",
    company: "Independent",
    summary:
      "Building and operating independent software products. I handle the engineering, deployment, integrations, payments, and the less glamorous work of finding users, measuring what happens, and improving the product after launch.",
  },
  {
    from: "Oct 2025",
    to: "Sep 2026",
    periods: [
      { from: "Oct 2025", to: "Jan 2026" },
      { from: "Aug 2026", to: "Sep 2026" },
    ],
    role: "AI Engineer",
    company: "Xignus AI",
    url: "https://financiamientointeligente.com/",
    logo: "/brands/financiamiento-inteligente.svg",
    summary:
      "Built a credit preapproval model that helped SMBs access over MXN $4M in financing in its first month. Also built AI workflows using financial, banking, and tax data. Returned in 2026 to integrate CONTPAQi and automate accounting data pipelines and Excel reporting.",
  },
  {
    from: "Jan 2024",
    to: "Jul 2025",
    role: "Technical Co-Founder",
    company: "Oliver AI",
    logo: "/brands/oliver.ico",
    summary:
      "Co-founded Oliver AI and led engineering of its fintech platform, from onboarding to lending workflows. Built AI agents with the Vercel AI SDK and AWS/BigQuery data pipelines for financial analysis, serving customers including Abaco Capital.",
  },
  {
    from: "Aug 2021",
    to: "Dec 2023",
    role: "Founder / Engineer",
    company: "Oliver POS / ERP",
    logo: "/brands/oliver.ico",
    summary:
      "Built and launched a mobile point-of-sale app that reached 10,000+ downloads and 3,000 active users in three months. Later expanded it into a web-based ERP.",
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
      "Won first place in the advanced track by building a pipeline to classify Rubin/LSST-like light curves and flag anomalies. Tested on 6,000 simulated curves from 600 observing cadences not seen during training. These results describe morphology classes, not physical star types.",
    metrics: [
      "5.1M+ astronomical objects",
      "10 morphologies",
      "6,000 evaluation light curves",
      "600 completely unseen observing cadences",
      "68.47% balanced accuracy",
      "68.28% macro F1",
    ],
    link: {
      href: "https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
      label: "View university recognition",
    },
    note: "The award supported participation in CARLA 2026 in Córdoba, Argentina.",
  },
];

export const research = [
  {
    title: "Gaia / OGLE Variable Star Classification",
    year: "2026",
    institution: "Universidad Autónoma de San Luis Potosí",
    summary:
      "Built a classifier for periodic variable stars using 491,073 Gaia sources and 91 engineered time-series, Fourier, color, and catalog features. Class-weighted XGBoost reached 0.9495 macro F1 on a held-out split; a separate comparison against mapped OGLE labels reached 0.9847 weighted F1.",
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
