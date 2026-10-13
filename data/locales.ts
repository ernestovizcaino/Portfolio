import { awards, experience, profile, research } from "@/data/profile";
import type { Project } from "@/data/content";
import { siteConfig } from "@/lib/seo";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

const english = {
  locale: "en",
  htmlLang: "en",
  profile,
  experience,
  awards,
  research,
  pressRecognition: {
    label: "Press & Recognition",
    title: "External coverage",
    metadata: "University recognition · Scientific computing · 2026",
    summary:
      "Independent coverage of my astronomical machine learning work and hackathon award.",
    institutional: "Recognition",
    research: "Scientific work",
    press: "Featured in",
    more: "More coverage",
    less: "Less coverage",
    newTab: "opens in a new tab",
  },
  metadata: {
    description: siteConfig.description,
  },
  ui: {
    skip: "Skip to content",
    established: "BUILDING SINCE 2016",
    about: "About",
    experience: "Professional experience",
    experienceIntro:
      "I build products, ship them, and work on what happens after launch.",
    at: "at",
    dateTo: "to",
    awards: "Awards",
    researchAwards: "Research & Awards",
    allWriting: "All writing",
    projects: "Projects",
    selectedWork: "Selected work",
    projectsIntro: "A few things I've built and put to the test.",
    research: "Research",
    stack: "Stack",
    writing: "Writing",
    contact: "Contact",
    contactIntro:
      "Building something challenging? I'm interested in software engineering, applied AI, and early-stage teams. Tell me what you're working on.",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send message",
    orShortcut: "or ⌘ ↵ to send",
    anonymous: "Anonymous",
    mailSubject: "Portfolio message",
    press: "Press",
    copyEmail: "to copy my email",
    copyEmailLabel: `Copy ${profile.email} to clipboard`,
    copied: "Copied",
    downloadResume: "Download résumé",
    viewResume: "Resume",
    toggleTheme: "Toggle color theme",
    muteSounds: "Mute interaction sounds",
    enableSounds: "Enable interaction sounds",
    sections: "Sections",
    newPosts: "New posts are coming soon.",
    language: "Español",
    languageLabel: "Español — View in Spanish",
  },
};

const spanishExperience = [
  {
    ...experience[0],
    from: "Abr 2026",
    to: "Actualidad",
    role: "Ingeniero de Producto Independiente / Fundador",
    summary:
      "Construyo y opero productos de software independientes. Me encargo de ingeniería, despliegue, integraciones y pagos, además de conseguir usuarios, medir lo que ocurre y mejorar el producto después del lanzamiento.",
  },
  {
    ...experience[1],
    from: "Oct 2025",
    to: "Sep 2026",
    periods: [
      { from: "Oct 2025", to: "Ene 2026" },
      { from: "Ago 2026", to: "Sep 2026" },
    ],
    role: "Ingeniero de IA",
    summary:
      "Construí un modelo de preaprobación que ayudó a PyMEs a acceder a más de 4 M MXN en financiamiento durante su primer mes. También desarrollé flujos de IA con datos bancarios, financieros y fiscales. Regresé en 2026 para integrar CONTPAQi y automatizar reportes contables con pipelines ETL.",
  },
  {
    ...experience[2],
    from: "Ene 2024",
    to: "Jul 2025",
    role: "Cofundador Técnico",
    summary:
      "Cofundé Oliver AI y lideré la ingeniería de su plataforma fintech, desde el registro de clientes hasta los flujos de crédito. Construí agentes con Vercel AI SDK y pipelines en AWS y BigQuery para análisis financiero, con clientes como Abaco Capital.",
  },
  {
    ...experience[3],
    from: "Ago 2021",
    to: "Dic 2023",
    role: "Fundador / Ingeniero",
    summary:
      "Construí y lancé una app móvil de punto de venta que alcanzó más de 10,000 descargas y 3,000 usuarios activos en tres meses. Después la amplié a un ERP web.",
  },
];

const spanishAwards = [
  {
    ...awards[0],
    title: "1er Lugar, Hackathon Xólotl",
    track: "Fase 3, Track Avanzado",
    date: "Ago 2026",
    project: "Clasificación de Series Temporales Astronómicas Rubin/LSST",
    summary:
      "Gané el primer lugar del track avanzado con un pipeline para clasificar curvas de luz tipo Rubin/LSST y detectar anomalías. Lo evalué en 6,000 curvas simuladas de 600 cadencias no vistas durante el entrenamiento. Los resultados corresponden a clases morfológicas, no a tipos físicos de estrellas.",
    metrics: [
      "5.1M+ objetos astronómicos",
      "10 morfologías",
      "6,000 curvas de luz de evaluación",
      "600 cadencias de observación completamente no vistas",
      "68.47% de exactitud balanceada",
      "68.28% macro F1",
    ],
    link: {
      href: "https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
      label: "Ver reconocimiento universitario",
    },
    note: "El premio apoyó mi participación en CARLA 2026 en Córdoba, Argentina.",
  },
];

const spanishResearch = [
  {
    ...research[0],
    title: "Clasificación de Estrellas Variables Gaia / OGLE",
    summary:
      "Construí un clasificador de estrellas variables periódicas con 491,073 fuentes Gaia y 91 características de series temporales, Fourier, color y catálogo. XGBoost con pesos por clase logró 0.9495 macro F1 en un conjunto reservado; una evaluación distinta contra etiquetas OGLE mapeadas obtuvo 0.9847 weighted F1.",
  },
];

const spanish = {
  ...english,
  locale: "es",
  htmlLang: "es",
  profile: {
    ...profile,
    role: "Ingeniero de Software y Fundador",
    headline: "Construyo software desde cero y lo pongo en manos de usuarios.",
    bio: [
      {
        text: "He construido y lanzado software para pequeños negocios, liderado ingeniería en productos fintech y de IA, y trabajado en aprendizaje automático con datos astronómicos. Me interesa todo el proceso: programar, lanzar, escuchar a los usuarios y decidir qué construir después.",
      },
    ],
  },
  experience: spanishExperience,
  awards: spanishAwards,
  research: spanishResearch,
  pressRecognition: {
    label: "Prensa y reconocimientos",
    title: "Cobertura externa",
    metadata: "Reconocimiento universitario · Cómputo científico · 2026",
    summary:
      "Cobertura externa de mi trabajo en aprendizaje automático astronómico y del premio del hackathon.",
    institutional: "Reconocimientos",
    research: "Trabajo científico",
    press: "En medios",
    more: "Más cobertura",
    less: "Menos cobertura",
    newTab: "se abre en una pestaña nueva",
  },
  metadata: {
    description:
      "Ernesto Vizcaíno es ingeniero de software y fundador. Ha construido productos fintech, sistemas de IA y herramientas de aprendizaje automático para investigación astronómica.",
  },
  ui: {
    ...english.ui,
    skip: "Saltar al contenido",
    established: "CONSTRUYENDO DESDE 2016",
    about: "Acerca de mí",
    experience: "Experiencia profesional",
    experienceIntro:
      "Construyo productos, los lanzo y trabajo en lo que sucede después.",
    at: "en",
    dateTo: "a",
    awards: "Premios",
    researchAwards: "Investigación y premios",
    allWriting: "Todos los artículos",
    projects: "Proyectos",
    selectedWork: "Trabajo destacado",
    projectsIntro: "Algunos proyectos que he construido y puesto a prueba.",
    research: "Investigación",
    stack: "Tecnologías",
    writing: "Artículos",
    contact: "Contacto",
    contactIntro:
      "¿Estás construyendo algo difícil? Me interesan la ingeniería de software, la IA aplicada y los equipos en etapas tempranas. Cuéntame en qué trabajas.",
    name: "Nombre",
    email: "Correo",
    message: "Mensaje",
    sendMessage: "Enviar mensaje",
    orShortcut: "o ⌘ ↵ para enviar",
    anonymous: "Anónimo",
    mailSubject: "Mensaje desde mi portafolio",
    press: "Presiona",
    copyEmail: "para copiar mi correo",
    copyEmailLabel: `Copiar ${profile.email} al portapapeles`,
    copied: "Copiado",
    downloadResume: "Descargar CV",
    viewResume: "CV",
    toggleTheme: "Cambiar tema de color",
    muteSounds: "Silenciar sonidos de interacción",
    enableSounds: "Activar sonidos de interacción",
    sections: "Secciones",
    newPosts: "Pronto habrá nuevos artículos.",
    language: "English",
    languageLabel: "English — View in English",
  },
};

export const dictionaries = { en: english, es: spanish };
export type Dictionary = typeof english;
export type DictionaryUi = Dictionary["ui"];

export function getDictionary(locale: Locale = "en") {
  const dictionary = dictionaries[locale] ?? dictionaries.en;

  return dictionary;
}

export function localizeProjects(projects: Project[], locale: Locale = "en") {
  if (locale !== "es") return projects;

  const translations: Record<string, Pick<Project, "Project_Title" | "Category" | "Description" | "Metrics">> = {
    "oliver-ai": {
      Project_Title: "Oliver AI — Agentes financieros de IA",
      Category: "IA aplicada · Fintech",
      Description: "Cofundé Oliver AI y lideré la ingeniería de su plataforma fintech. Construí agentes para flujos de crédito, evaluación de riesgo y procesamiento de documentos, además de pipelines en AWS y BigQuery para análisis financiero de clientes como Abaco Capital.",
      Metrics: "Plataforma fintech lanzada · Agentes de IA · AWS/BigQuery",
    },
    "xignus-ai": {
      Project_Title: "Xignus AI — Automatización financiera",
      Category: "IA aplicada · Ingeniería de datos",
      Description: "Construí un modelo de preaprobación y flujos de IA con datos bancarios, fiscales y financieros. Regresé para integrar CONTPAQi y automatizar reportes contables mediante pipelines ETL.",
      Metrics: "Ayudó a PyMEs a acceder a más de 4 M MXN en el primer mes",
    },
    "rubin-lsst": {
      Project_Title: "Aprendizaje automático astronómico — Rubin/LSST",
      Category: "Aprendizaje automático · Astronomía",
      Description: "Construí un pipeline con estimaciones de incertidumbre para clasificar curvas de luz, detectar anomalías y priorizar observaciones. Trabajé con datos de más de 5.1 millones de objetos y probé clasificación morfológica en 6,000 curvas simuladas de 600 cadencias no vistas.",
      Metrics: "Primer lugar, Hackathon Xólotl · 5.1M+ objetos",
    },
    "oliver-pos": {
      Project_Title: "Oliver POS / ERP",
      Category: "Ingeniería de producto · SaaS",
      Description: "Construí y lancé una app móvil de punto de venta para pequeños negocios. Después de conseguir miles de usuarios, la amplié a un ERP web para ventas y gestión comercial.",
      Metrics: "10,000+ descargas · 3,000 usuarios activos en 3 meses",
    },
  };

  return projects.map((project) => ({ ...project, ...translations[project.id] }));
}
