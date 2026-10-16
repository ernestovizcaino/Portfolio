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

  headline: "At 16 I started my first startup.",
  bio: [
    { text: "It was " },
    { text: "Traver", href: "https://traverapp.vercel.app/" },
    {
      text: ", a social network where every city had its own feed of posts, restaurants, services, and shops. I built it myself, then went business by business in San Luis Potosí getting them to join. I lost the domain, but it's still alive on Vercel. I've done the same thing a few times since: build something, then go sell it. I joined Oliver as a founding engineer and ended up as a co-founder. Then I was part of the founding team at Xignus, and now I run a few products of my own.",
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
  },
  {
    from: "Jan 2024",
    to: "Jul 2025",
    role: "Technical Co-Founder",
    company: "Oliver AI",
    logo: "/brands/oliver.ico",
  },
  {
    from: "Aug 2021",
    to: "Dec 2023",
    role: "Founder / Engineer",
    company: "Oliver POS / ERP",
    logo: "/brands/oliver.ico",
  },
];

export const research = [
  {
    title: "Rubin/LSST Light Curve Classification",
    year: "2026",
    institution: "1st place, Xólotl Hackathon · CUDI / LAMOD UNAM",
    summary:
      "Built a pipeline that classifies Rubin/LSST-style light curves, flags anomalies, and reports how confident it is. Trained on data from 5.1M+ objects and tested on 6,000 simulated curves from 600 observing cadences it never saw. The prize funded my trip to CARLA 2026 in Córdoba, Argentina.",
    link: {
      href: "https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
      label: "University announcement",
    },
  },
  {
    title: "Gaia / OGLE Variable Star Classification",
    year: "2026",
    institution: "Universidad Autónoma de San Luis Potosí",
    summary:
      "Built a classifier for periodic variable stars from 491,073 Gaia sources and 91 features (time-series, Fourier, color, and catalog). Class-weighted XGBoost reached 0.9495 macro F1 on a held-out split. Checked separately against mapped OGLE labels, it reached 0.9847 weighted F1.",
  },
];

export type Profile = typeof profile;
export type ExperienceItem = {
  from: string;
  to: string;
  role: string;
  company: string;
  url?: string;
  logo?: string;
  periods?: { from: string; to: string }[];
};
export type ResearchItem = {
  title: string;
  year: string;
  institution: string;
  summary: string;
  link?: { href: string; label: string };
};
export type SocialIcon = (typeof socials)[number]["icon"];
