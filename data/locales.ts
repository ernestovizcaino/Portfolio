import { awards, experience, profile, research } from "@/data/profile";
import type { Project } from "@/data/content";
import { filterExperience } from "@/data/visibility";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

const english = {
  locale: "en",
  htmlLang: "en",
  profile,
  experience,
  awards,
  research,
  metadata: {
    description:
      "AI and product engineer building and launching products from zero to production, with fintech, SaaS and machine learning experience.",
  },
  ui: {
    skip: "Skip to content",
    established: "BUILDING SINCE 2016",
    about: "About",
    experience: "Experience",
    experienceIntro:
      "I work across engineering and product, taking ideas from prototype to real users and production.",
    at: "at",
    dateTo: "to",
    awards: "Awards",
    projects: "Projects",
    selectedWork: "Selected work",
    projectsIntro: "Selected products, systems and research I've built.",
    research: "Research",
    stack: "Stack",
    writing: "Writing",
    contact: "Contact",
    contactIntro:
      "I'm open to product engineering opportunities, ambitious startup teams and selected collaborations.",
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
    toggleTheme: "Toggle color theme",
    muteSounds: "Mute interaction sounds",
    enableSounds: "Enable interaction sounds",
    sections: "Sections",
    newPosts: "New posts are coming soon.",
    language: "Español",
    languageLabel: "View in Spanish",
  },
};

const spanishExperience = [
  {
    ...experience[0],
    from: "Abr 2026",
    to: "Actualidad",
    role: "Fundador / Ingeniero de Producto",
    summary:
      "Fundé y construí de principio a fin una plataforma de preparación para el EGEL, con simuladores interactivos, módulos de estudio, pagos, analítica y adquisición mediante SEO. Alcanzó más de 500 usuarios y 200 órdenes pagadas en pocos meses, impulsada principalmente por búsqueda orgánica y posiciones entre los cinco primeros resultados de Google para consultas EGEL específicas.",
  },
  {
    ...experience[1],
    from: "Oct 2025",
    to: "Actualidad",
    periods: [
      { from: "Oct 2025", to: "Ene 2026" },
      { from: "Ago 2026", to: "Actualidad" },
    ],
    role: "Ingeniero de IA / Equipo Fundador",
    summary:
      "Construí un sistema de preaprobación crediticia que respaldó más de $4 M MXN en financiamiento para PyMEs durante su primer mes, además de agentes de IA en producción y productos de datos financieros. Regresé en 2026 para construir integraciones con CONTPAQi y pipelines ETL que transforman datos contables en reportes Excel automatizados y flujos de conciliación.",
  },
  {
    ...experience[2],
    from: "Ene 2024",
    to: "Jul 2025",
    role: "Cofundador Técnico",
    summary:
      "Lideré la ingeniería de una plataforma fintech y flujos de IA en producción para originación de crédito, análisis de cartera, revisión de riesgo, cumplimiento y procesamiento de documentos financieros.",
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
      "Gané el track avanzado tras construir un pipeline de clasificación con incertidumbre y priorización científica para datos de series temporales astronómicas tipo Rubin/LSST.",
    metrics: [
      "5.1M+ objetos astronómicos",
      "10 morfologías",
      "6,000 curvas de luz de evaluación",
      "600 cadencias de observación completamente no vistas",
      "68.47% de exactitud balanceada",
      "68.28% macro F1",
    ],
    link: {
      href: "https://cudi.edu.mx/noticias/premiacion-hackathon",
      label: "Ver anuncio oficial",
    },
    note: "El premio incluye asistencia a CARLA 2026 en Córdoba, Argentina 🇦🇷.",
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
    role: "Ingeniero de Producto / IA",
    bio: [
      {
        text: "He estado construyendo software desde los 13 años. Desde entonces, he llevado productos desde la idea hasta miles de usuarios, construido SaaS y sistemas fintech generadores de ingresos, y aplicado aprendizaje automático a millones de objetos astronómicos.",
      },
    ],
  },
  experience: spanishExperience,
  awards: spanishAwards,
  research: spanishResearch,
  metadata: {
    description:
      "Ingeniero de producto e IA que construye y lanza productos desde cero hasta producción, con experiencia en fintech, SaaS y aprendizaje automático.",
  },
  ui: {
    ...english.ui,
    skip: "Saltar al contenido",
    established: "CONSTRUYENDO DESDE 2016",
    about: "Acerca de mí",
    experience: "Experiencia",
    experienceIntro:
      "Trabajo entre ingeniería y producto, llevando ideas desde prototipo hasta usuarios reales y producción.",
    at: "en",
    dateTo: "a",
    awards: "Premios",
    projects: "Proyectos",
    selectedWork: "Trabajo destacado",
    projectsIntro: "Productos, sistemas e investigación que he construido.",
    research: "Investigación",
    stack: "Tecnologías",
    writing: "Artículos",
    contact: "Contacto",
    contactIntro:
      "Estoy abierto a oportunidades de ingeniería de producto, equipos de startups ambiciosos y colaboraciones seleccionadas.",
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
    toggleTheme: "Cambiar tema de color",
    muteSounds: "Silenciar sonidos de interacción",
    enableSounds: "Activar sonidos de interacción",
    sections: "Secciones",
    newPosts: "Pronto habrá nuevos artículos.",
    language: "English",
    languageLabel: "View in English",
  },
};

export const dictionaries = { en: english, es: spanish };
export type Dictionary = typeof english;
export type DictionaryUi = Dictionary["ui"];

export function getDictionary(locale: Locale = "en") {
  const dictionary = dictionaries[locale] ?? dictionaries.en;

  return {
    ...dictionary,
    experience: filterExperience(dictionary.experience),
  };
}

export function localizeProjects(projects: Project[], locale: Locale = "en") {
  if (locale !== "es") return projects;

  const descriptions: Partial<Record<Project["id"], string>> = {
    pasaegel:
      "Plataforma de preparación para los exámenes EGEL de México, construida de principio a fin con simuladores interactivos, módulos de estudio, pagos, analítica y adquisición orgánica.",
    "rubin-lsst":
      "Pipeline de clasificación astronómica con incertidumbre y priorización científica, construido para datos de series temporales tipo Rubin/LSST.",
    "gaia-ogle":
      "Clasificación de estrellas variables entre encuestas usando curvas de luz Gaia, periodo, Fourier, color y características de catálogo, validada contra etiquetas OGLE.",
    "oliver-pos":
      "Punto de venta móvil para pequeños negocios que posteriormente se expandió a un ERP web completo.",
  };

  const categories: Partial<Record<Project["id"], string>> = {
    pasaegel: "SaaS · Educación",
    "rubin-lsst": "Aprendizaje Automático · Astronomía",
    "gaia-ogle": "Investigación · Aprendizaje Automático",
    "oliver-pos": "Producto · SaaS",
  };

  const metrics: Partial<Record<Project["id"], string>> = {
    pasaegel: "500+ usuarios · 200+ órdenes pagadas · Top 5 en Google",
    "rubin-lsst": "1er Lugar · 5.1M+ objetos · 68.47% exactitud balanceada",
    "gaia-ogle": "491K fuentes Gaia · 11 clases · 0.9847 weighted F1",
    "oliver-pos": "10K+ descargas · 3K usuarios activos en 3 meses",
  };

  const titles: Partial<Record<Project["id"], string>> = {
    "rubin-lsst": "Clasificador de Series Temporales Rubin/LSST",
    "gaia-ogle": "Clasificador de Estrellas Variables Gaia / OGLE",
    "oliver-pos": "Oliver POS / ERP",
  };

  const awards: Partial<Record<Project["id"], string>> = {
    "rubin-lsst": "1er Lugar",
  };

  return projects.map((project) => ({
    ...project,
    Project_Title: titles[project.id] ?? project.Project_Title,
    Category: categories[project.id] ?? project.Category,
    Description: descriptions[project.id] ?? project.Description,
    Metrics: metrics[project.id] ?? project.Metrics,
    award: awards[project.id] ?? project.award,
  }));
}
