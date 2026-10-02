export interface RecognitionSource {
  publication: string;
  title: string;
  url: string;
  type: "press" | "institutional" | "research";
  featured?: boolean;
}

// Add coverage here; the section groups by type and reveals non-featured press
// in a native disclosure. Article titles stay in their original language.
export const recognitionSources: RecognitionSource[] = [
  {
    publication: "UASLP",
    title: "Estudiante gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "institutional",
  },
  {
    publication: "CUDI",
    title: "La Comunidad de Supercómputo anuncia a los ganadores del Hackathon",
    url: "https://cudi.edu.mx/noticias/premiacion-hackathon",
    type: "institutional",
  },
  {
    publication: "RedCLARA",
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
  {
    publication: "Plano Informativo",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con IA",
    url: "https://planoinformativo.com/1172600/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-ia",
    type: "press",
    featured: true,
  },
  {
    publication: "Palestra",
    title: "Estudiante de la UASLP se lleva el primer lugar en hackathon de astroinformática",
    url: "https://palestra.com.mx/2026/10/01/estudiante-de-la-uaslp-se-lleva-el-primer-lugar-en-hackathon-de-astroinformatica/",
    type: "press",
    featured: true,
  },
  {
    publication: "Potosí Noticias",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con IA",
    url: "https://potosinoticias.com/2026/09/30/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-ia/",
    type: "press",
  },
  {
    publication: "EOS Noticias",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://eosnoticiasslp.mx/2026/09/30/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "press",
  },
  {
    publication: "War Room",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://warroomslp.mx/estado/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "press",
  },
  {
    publication: "El Tiempo del Altiplano",
    title: "Estudiante UASLP gana hackaton astronómico",
    url: "https://eltiempodelaltiplano.com/ultimo-minuto/estudiante-uaslp-gana-hackaton-astronomico/",
    type: "press",
  },
  {
    publication: "Kriptón",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://kripton.mx/2026/09/30/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "press",
  },
  {
    publication: "MC Noticias SLP",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://mcnoticiasslp.blog/2026/09/30/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "press",
  },
  {
    publication: "La Rueda Digital",
    title: "Estudiante de la UASLP gana hackathon de datos astronómicos con inteligencia artificial",
    url: "https://ruedadigital.com.mx/2026/09/30/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/",
    type: "press",
  },
  {
    publication: "TuExamen.mx",
    title: 'Estudiante de la UASLP gana "hackathon" de datos astronómicos con "IA"',
    url: "https://tuexamen.mx/blogs/noticias/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-ia-1",
    type: "press",
    // Published September 30, 2026.
  },
];
