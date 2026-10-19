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
      "AI and full-stack engineer building and launching products from zero to production, with fintech, SaaS and machine learning experience.",
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
      "I'm open to AI and full-stack engineering roles, ambitious startup teams and select collaborations.",
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
    from: "Oct 2025",
    to: "Sep 2026",
    periods: [
      { from: "Oct 2025", to: "Feb 2026" },
      { from: "Ago 2026", to: "Sep 2026" },
    ],
    role: "Ingeniero de IA / Equipo Fundador",
    summary:
      "Diseñé el modelo de preaprobación crediticia detrás de más de $4 M MXN en financiamiento para PyMEs durante su primer mes, además de agentes de IA en producción y bases de conocimiento que integran datos fiscales, bancarios y financieros en flujos de crédito. Regresé en 2026 para construir integraciones con CONTPAQi y pipelines ETL que transforman datos contables en reportes Excel automatizados para conciliación.",
  },
  {
    ...experience[1],
    from: "Ago 2021",
    to: "Jul 2025",
    role: "Cofundador Técnico",
    summary:
      "Comenzó como un punto de venta móvil para pequeños negocios que alcanzó más de 10,000 descargas y 3,000 usuarios activos en tres meses, y creció hasta convertirse en un ERP web. A partir de entrevistas con clientes, lideré el pivote a fintech B2B. Construí una plataforma de crédito para instituciones financieras con flujos de IA en producción para originación de crédito, revisión de riesgo, cumplimiento y procesamiento de documentos, además de pipelines de datos en AWS y BigQuery para clientes como Abaco Capital.",
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
      "Construí un pipeline de aprendizaje automático para clasificación de estrellas variables periódicas, procesando 491,073 fuentes Gaia y diseñando 91 características de series temporales, Fourier, color y catálogo. Un modelo XGBoost con pesos por clase alcanzó 0.9495 macro F1 en datos reservados y 0.9847 weighted F1 frente a etiquetas OGLE mapeadas.",
  },
];

const spanish = {
  ...english,
  locale: "es",
  htmlLang: "es",
  profile: {
    ...profile,
    role: "Ingeniero de IA y Full-Stack",
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
      "Ingeniero de IA y full-stack que construye y lanza productos desde cero hasta producción, con experiencia en fintech, SaaS y aprendizaje automático.",
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
      "Estoy abierto a roles de ingeniería de IA y full-stack, equipos de startups ambiciosos y colaboraciones seleccionadas.",
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
    "rubin-lsst":
      "Pipeline de clasificación astronómica con incertidumbre y priorización científica, construido para datos de series temporales tipo Rubin/LSST.",
    "gaia-ogle":
      "Clasificación de estrellas variables entre encuestas usando curvas de luz Gaia, periodo, Fourier, color y características de catálogo, validada contra etiquetas OGLE.",
    "oliver-pos":
      "Punto de venta móvil para pequeños negocios que posteriormente se expandió a un ERP web completo.",
  };

  const categories: Partial<Record<Project["id"], string>> = {
    "rubin-lsst": "Aprendizaje Automático · Astronomía",
    "gaia-ogle": "Investigación · Aprendizaje Automático",
    "oliver-pos": "Producto · SaaS",
  };

  const metrics: Partial<Record<Project["id"], string>> = {
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
