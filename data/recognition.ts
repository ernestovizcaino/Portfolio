export interface RecognitionSource {
  publication: string;
  title: string;
  url: string;
  type: "press" | "institutional" | "research";
  featured?: boolean;
  publishedAt?: string;
}

// Selected institutional, research and press coverage.
// Preserve publication titles in their original language and verified dates.
// Do not imply that syndicated reports are independent original reporting.
export const recognitionSources: RecognitionSource[] = [
  {
    publication: "Universidad Autónoma de San Luis Potosí",
    publishedAt: "2026-09-30",
    title: "Estudiante gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "institutional",
  },
  {
    publication: "CUDI",
    publishedAt: "2026-08-28",
    title: "La Comunidad de Supercómputo anuncia a los ganadores del Hackathon",
    url: "https://cudi.edu.mx/noticias/premiacion-hackathon",
    type: "institutional",
  },
  {
    publication: "RedCLARA",
    publishedAt: "2026-09-23",
    title: "PIG: La plataforma que une a las universidades para democratizar el acceso al cómputo científico",
    url: "https://www.redclara.net/es/noticiasyeventos/casos-y-voces/8892-pig-la-plataforma-que-une-a-las-universidades-para-democratizar-el-acceso-al-computo-cientifico",
    type: "research",
  },
  {
    publication: "El Sol de San Luis",
    title: "Estudiante de la UASLP gana hackathon de astronomía con IA",
    // Supplied article URL; automated retrieval returns HTTP 403.
    url: "https://oem.com.mx/elsoldesanluis/ciencia-y-salud/estudiante-de-la-uaslp-gana-hackathon-de-astronomia-con-ia-32358513",
    type: "press",
    featured: true,
  },
];
