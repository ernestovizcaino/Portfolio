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
      "University recognition and selected coverage of my work in astronomical machine learning.",
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
      "I work across engineering and product, taking ideas from prototype to real users and production.",
    at: "at",
    dateTo: "to",
    awards: "Awards",
    researchAwards: "Research & Awards",
    allWriting: "All writing",
    projects: "Projects",
    selectedWork: "Selected work",
    projectsIntro: "Selected products, systems and research I've built.",
    research: "Research",
    stack: "Stack",
    writing: "Writing",
    contact: "Contact",
    contactIntro:
      "I'm open to founding, product, and applied AI engineering roles with ambitious teams. Get in touch to discuss what you're building.",
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
      "Desarrollo y lanzo productos de software independientes: arquitectura, flujos con LLM, infraestructura backend y despliegue en producción. Me encargo de integraciones de API, autenticación, pagos, SEO, analítica, optimización de conversiones, iteración y mantenimiento.",
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
      "Construí un sistema de preaprobación crediticia que respaldó más de $4 M MXN en financiamiento para PyMEs durante su primer mes, además de agentes de IA y bases de conocimiento que integran información financiera, bancaria y fiscal. Regresé en 2026 para construir integraciones con CONTPAQi y pipelines ETL que transforman datos contables en reportes Excel automatizados y flujos de conciliación.",
  },
  {
    ...experience[2],
    from: "Ene 2024",
    to: "Jul 2025",
    role: "Cofundador Técnico",
    summary:
      "Lideré de principio a fin la ingeniería de una aplicación fintech en producción con Next.js. Construí agentes con Vercel AI SDK para originación de crédito, evaluación de riesgo, cumplimiento y procesamiento de documentos financieros, con servicios en AWS y pipelines de BigQuery para clientes como Abaco Capital.",
  },
  {
    ...experience[3],
    from: "Ago 2021",
    to: "Dic 2023",
    role: "Fundador / Ingeniero",
    summary:
      "Construí y lancé un punto de venta móvil que alcanzó más de 10,000 descargas y 3,000 usuarios activos en tres meses, y posteriormente lo expandí hasta convertirlo en un ERP web completo.",
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
      "Gané la fase 3 (nivel avanzado) con un pipeline de clasificación, detección de anomalías y priorización científica para curvas de luz tipo Rubin/LSST. Evalué la clasificación morfológica en 6,000 curvas de luz de 600 cadencias no vistas; estas métricas corresponden a morfologías, no a etiquetas físicas de referencia.",
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
      "Construí un pipeline de aprendizaje automático para clasificación de estrellas variables periódicas, procesando 491,073 fuentes Gaia e ingeniería de 91 características de series temporales, Fourier, color y catálogo. Un modelo XGBoost con pesos por clase alcanzó 0.9495 macro F1 en datos reservados y 0.9847 weighted F1 frente a etiquetas OGLE mapeadas.",
  },
];

const spanish = {
  ...english,
  locale: "es",
  htmlLang: "es",
  profile: {
    ...profile,
    role: "Ingeniero de IA / Producto",
    headline: "Construyo productos con IA que resuelven problemas reales.",
    bio: [
      {
        text: "He liderado la ingeniería de startups fintech, lanzado software usado por miles de personas y desarrollado sistemas de aprendizaje automático para investigación astronómica. Mi trabajo abarca ingeniería full-stack, IA aplicada y desarrollo de producto, desde los primeros prototipos hasta sistemas en producción.",
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
      "Reconocimiento universitario y cobertura seleccionada de mi trabajo en aprendizaje automático aplicado a la astronomía.",
    institutional: "Reconocimientos",
    research: "Trabajo científico",
    press: "En medios",
    more: "Más cobertura",
    less: "Menos cobertura",
    newTab: "se abre en una pestaña nueva",
  },
  metadata: {
    description:
      "Ernesto Vizcaíno, ingeniero de IA y producto. Desarrollo full-stack, agentes de IA, fintech en producción y aprendizaje automático para investigación astronómica.",
  },
  ui: {
    ...english.ui,
    skip: "Saltar al contenido",
    established: "CONSTRUYENDO DESDE 2016",
    about: "Acerca de mí",
    experience: "Experiencia profesional",
    experienceIntro:
      "Trabajo entre ingeniería y producto, llevando ideas desde prototipo hasta usuarios reales y producción.",
    at: "en",
    dateTo: "a",
    awards: "Premios",
    researchAwards: "Investigación y premios",
    allWriting: "Todos los artículos",
    projects: "Proyectos",
    selectedWork: "Trabajo destacado",
    projectsIntro: "Productos, sistemas e investigación que he construido.",
    research: "Investigación",
    stack: "Tecnologías",
    writing: "Artículos",
    contact: "Contacto",
    contactIntro:
      "Busco oportunidades como ingeniero fundador, de producto o de IA aplicada en equipos ambiciosos. Escríbeme para conversar sobre lo que estás construyendo.",
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
      Description: "Lideré el desarrollo de una aplicación fintech en producción para originación de crédito, evaluación de riesgo, cumplimiento y procesamiento de documentos financieros. Construí agentes con Vercel AI SDK, integré datos financieros y desarrollé servicios en AWS y pipelines de BigQuery para clientes como Abaco Capital.",
      Metrics: "Next.js · Vercel AI SDK · AWS · BigQuery",
    },
    "xignus-ai": {
      Project_Title: "Xignus AI — Automatización financiera",
      Category: "IA aplicada · Ingeniería de datos",
      Description: "Construí sistemas de preaprobación crediticia, agentes de IA y bases de conocimiento con datos financieros, bancarios y fiscales. Desarrollé integraciones con CONTPAQi y pipelines ETL contables para conciliación automatizada y reportes en Excel.",
      Metrics: "MXN $4M+ en financiamiento para PyMEs en el primer mes",
    },
    "rubin-lsst": {
      Project_Title: "Aprendizaje automático astronómico — Rubin/LSST",
      Category: "Aprendizaje automático · Astronomía",
      Description: "Construí un pipeline con incertidumbre para clasificación de series temporales, detección de anomalías y priorización científica sobre 5.1M+ objetos astronómicos. Utilicé ingeniería de características y evaluación en cadencias no vistas para medir la clasificación morfológica sin etiquetas físicas de referencia.",
      Metrics: "5.1M+ objetos · Características temporales · Evaluación de modelos",
    },
    "oliver-pos": {
      Project_Title: "Oliver POS / ERP",
      Category: "Ingeniería de producto · SaaS",
      Description: "Construí y lancé una aplicación móvil de punto de venta para pequeños negocios y después la expandí a un ERP web. Me encargué del desarrollo del producto desde la primera versión móvil hasta la plataforma de gestión empresarial.",
      Metrics: "10,000+ descargas · 3,000 usuarios activos en 3 meses",
    },
  };

  return projects.map((project) => ({ ...project, ...translations[project.id] }));
}
