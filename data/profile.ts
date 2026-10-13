// ---------------------------------------------------------------------------
// Everything personal about the site lives here so it can be edited in one
// place. Fields marked TODO are the ones I could not derive from your existing
// content. Fill them in (or leave them empty and the section hides itself).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ernesto Vizcaíno",
  fullName: "Ernesto Vizcaíno Alvarado",
  alternateNames: ["Ernesto Vizcaíno", "Ernesto Vizcaino", "Ernesto Vizcaino Alvarado"],
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

  headline: "I build AI-powered products that solve real-world problems.",
  bio: [
    {
      text: "I've led engineering for fintech startups, shipped software used by thousands, and developed machine learning systems for astronomical research. My work spans full-stack engineering, applied AI, and product development, from early prototypes to production systems.",
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
      "Building and shipping independent software products, from architecture and LLM workflows to backend infrastructure and production deployment. I own API integrations, authentication, payments, SEO, analytics, conversion optimization, and ongoing product iteration and maintenance.",
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
      "Built credit preapproval systems that helped SMBs access MXN $4M+ in financing in the first month, plus AI agents and knowledge bases integrating financial, banking, and tax data. Rejoined in August 2026 to build CONTPAQi integrations, accounting ETL pipelines, automated reconciliation, and Excel reporting.",
  },
  {
    from: "Jan 2024",
    to: "Jul 2025",
    role: "Technical Co-Founder",
    company: "Oliver AI",
    logo: "/brands/oliver.ico",
    summary:
      "Led end-to-end engineering of a production fintech application in Next.js. Built AI agents with the Vercel AI SDK for loan origination, risk assessment, compliance, and financial document processing, with AWS services and BigQuery data pipelines serving customers including Abaco Capital.",
  },
  {
    from: "Aug 2021",
    to: "Dec 2023",
    role: "Founder / Engineer",
    company: "Oliver POS / ERP",
    logo: "/brands/oliver.ico",
    summary:
      "Built and launched a mobile POS that reached 10,000+ downloads and 3,000 active users within three months, then expanded it into a web-based ERP.",
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
      "Won Phase 3 (Advanced Track) with a classification, anomaly-detection, and scientific-prioritization pipeline for Rubin/LSST-like light curves. Evaluated morphology classification on 6,000 light curves from 600 unseen observing cadences; these scores measure morphology classification, not physical ground-truth labels.",
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
