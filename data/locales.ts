import { experience, profile, research } from "@/data/profile";
import type { Project } from "@/data/content";
import { siteConfig } from "@/lib/seo";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

const english = {
  locale: "en",
  htmlLang: "en",
  profile,
  experience,
  research,
  pressRecognition: {
    label: "Featured in",
    newTab: "opens in a new tab",
  },
  metadata: {
    description: siteConfig.description,
  },
  ui: {
    skip: "Skip to content",
    established: "BUILDING SINCE 2016",
    about: "About",
    experience: "Experience",
    at: "at",
    dateTo: "to",
    allWriting: "All writing",
    projects: "Projects",
    selectedWork: "Selected work",
    projectsIntro: "Things I built, and what happened when people used them.",
    research: "Research",
    stack: "Stack",
    writing: "Writing",
    contact: "Contact",
    contactIntro:
      "I'm looking for an early-stage team where I can own a product end to end, ideally in applied AI. If you're building one, tell me about it.",
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
    role: "Fundador e ingeniero de producto independiente",
  },
  {
    ...experience[1],
    from: "Oct 2025",
    to: "Sep 2026",
    periods: [
      { from: "Oct 2025", to: "Feb 2026" },
      { from: "Ago 2026", to: "Sep 2026" },
    ],
    role: "Ingeniero de IA",
  },
  {
    ...experience[2],
    from: "Ago 2021",
    to: "Jul 2025",
    role: "Cofundador técnico",
  },
];

const spanishResearch = [
  {
    ...research[0],
    title: "Clasificación de curvas de luz Rubin/LSST",
    institution: "Primer lugar, Hackathon Xólotl · CUDI / LAMOD UNAM",
    summary:
      "Construí un sistema que clasifica curvas de luz tipo Rubin/LSST, detecta anomalías e indica qué tan seguro está de cada resultado. Lo entrené con datos de más de 5.1 millones de objetos y lo evalué con 6,000 curvas simuladas de 600 cadencias de observación que nunca había visto. El premio financió mi viaje a CARLA 2026 en Córdoba, Argentina.",
    link: {
      href: research[0].link!.href,
      label: "Anuncio de la universidad",
    },
  },
];

const spanish = {
  ...english,
  locale: "es",
  htmlLang: "es",
  profile: {
    ...profile,
    role: "Ingeniero de IA y Full-Stack",
    headline: "A los 16 empecé mi primera startup.",
    bio: [
      { text: "Se llamaba " },
      { text: "Traver", href: "https://traverapp.vercel.app/" },
      {
        text: ": una red social donde cada ciudad tenía su propio feed de posts, restaurantes, servicios y tiendas. La programé yo y después fui negocio por negocio en San Luis Potosí convenciéndolos de entrar. Perdí el dominio, pero sigue viva en Vercel. Desde entonces he hecho lo mismo varias veces: construir algo y salir a venderlo. Entré a Oliver como ingeniero fundador y terminé como cofundador. Después fui parte del equipo fundador de Xignus, y hoy tengo varios productos propios.",
      },
    ],
  },
  experience: spanishExperience,
  research: spanishResearch,
  pressRecognition: {
    label: "En medios",
    newTab: "se abre en una pestaña nueva",
  },
  metadata: {
    description:
      "Ernesto Vizcaíno es ingeniero de IA y full-stack. Ha construido productos fintech, sistemas de IA y herramientas de aprendizaje automático para investigación astronómica.",
  },
  ui: {
    ...english.ui,
    skip: "Saltar al contenido",
    established: "CONSTRUYENDO DESDE 2016",
    about: "Acerca de mí",
    experience: "Experiencia",
    at: "en",
    dateTo: "a",
    allWriting: "Todos los artículos",
    projects: "Proyectos",
    selectedWork: "Trabajo destacado",
    projectsIntro: "Lo que he construido y qué pasó cuando la gente empezó a usarlo.",
    research: "Investigación",
    stack: "Tecnologías",
    writing: "Artículos",
    contact: "Contacto",
    contactIntro:
      "Busco unirme a una startup en etapa temprana donde pueda hacerme cargo de un producto de principio a fin, idealmente en IA aplicada. Si estás construyendo algo así, escríbeme.",
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
      Project_Title: "Oliver AI — Agentes de IA para crédito",
      Category: "IA aplicada · Fintech",
      Description: "Cofundé Oliver AI y desarrollé su plataforma fintech: agentes de IA que evaluaban el riesgo crediticio y procesaban documentos financieros, y pipelines en AWS y BigQuery que convertían datos bancarios en análisis de crédito.",
      Metrics: "Cofundador y líder de ingeniería · Clientes como Abaco Capital",
    },
    "xignus-ai": {
      Project_Title: "Xignus AI — Preaprobación de crédito",
      Category: "IA aplicada · Ingeniería de datos",
      Description: "Un modelo que preaprueba crédito para PyMEs a partir de sus datos bancarios, fiscales y financieros. Desarrollé el modelo y los flujos de IA que lo rodean; después regresé para integrar los datos contables de CONTPAQi y automatizar reportes con pipelines ETL.",
      Metrics: "Más de 4 millones de pesos en financiamiento para PyMEs en el primer mes",
    },
    "oliver-pos": {
      Project_Title: "Oliver POS / ERP",
      Category: "Ingeniería de producto · SaaS",
      Description: "Una app móvil de punto de venta para pequeños negocios. La desarrollé y la lancé, y en tres meses llegó a 3,000 usuarios activos. Después la convertí en un ERP web para ventas y administración del negocio.",
      Metrics: "10,000+ descargas · 3,000 usuarios activos en 3 meses",
    },
  };

  return projects.map((project) => ({ ...project, ...translations[project.id] }));
}
