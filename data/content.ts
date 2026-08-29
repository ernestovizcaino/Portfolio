export interface Post {
  id: string | number;
  Title: string;
  Creation: string;
  Description: string;
  Content: string;
  Cover?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  Project_Title: string;
  Category: string;
  Description: string;
  Metrics: string;
  Project_URL?: string;
  Image?: string;
  Icon?: "galaxy" | "constellation";
  Monogram?: string;
  award?: string;
}

const archivedPosts: Post[] = [
  {
    id: 2,
    Title: "¿Que es Strapi?",
    Creation: "Martes, 26 de enero del 2021",
    Description:
      "Strapi en pocas palabras es un sistema gestor de contenidos, o CMS por sus siglas en inglés, y es un software que corre dentro de un navegador que te permite administrar el contenido de un sitio web.",
    Cover: "https://i.imgur.com/R8f3yiH.png",
    Content: `## ¿Qué es Strapi?

**Strapi** es un CMS de código abierto basado en Node.js que te permite crear una API y gestionar su contenido, lo increíble de Strapi es que en cuestión de minutos puedes tener lista tu API para lanzar a producción. Strapi es usada por varias empresas como IBM, Walmart, Nasa, Delivery Hero, etc.

## ¿Qué es un CMS?

Para comenzar hay que definir y saber que es un **CMS** y en pocas palabras un sistema gestor de contenidos, o CMS por sus siglas en inglés, es un software que corre dentro de un navegador que te permite administrar el contenido de un sitio web.

## Ventajas de usar Strapi

- **Open Source:** Todo el código base está disponible en GitHub y es mantenido por cientos de contribuyentes.

- **Personalizable:** Fácilmente puedes personalizar el panel de administración como así también la API. Incluso puedes ampliar la gestión de contenidos usando complementos personalizados.

- **RESTful o GraphQL:** Consume la API desde cualquier cliente (React, Vue, Angular), aplicaciones móviles o incluso dispositivos IoT, utilizando REST o GraphQL.

- **Roles y permisos:** Strapi tiene un sistema de usuario incorporado que te permite administrar quién puede acceder a qué.

## ¿Cómo funciona Strapi?

Para poder crear tú API en Strapi tienes que usar el generador de tipos de contenido y es un complemento principal de Strapi. Es una función que siempre está activada de forma predeterminada y no se puede eliminar. Sin embargo, solo es accesible cuando la aplicación se encuentra en un entorno de desarrollo.

- **Collections Types:** Sirven cuando vas a repetir la misma estructura de contenido como publicaciones de blog, productos, usuarios o cualquier lista de contenido que se te ocurra.

- **Single Types:** Crea páginas únicas que tengan contenido exclusivo como titulares de página de inicio, menú, configuración de SEO.

Dentro de los Collections Types y Single Types puedes manejar:

- **Fields:** Los campos donde introduces tu contenido.

- **Repeatable components:** Los componentes son una combinación de varios campos, que se agrupan en la vista de edición. Escribir su contenido funciona exactamente igual que para los campos independientes, pero hay algunas especificidades en los componentes. Hay 2 tipos de componentes: componentes repetibles y no repetibles.

- **Dynamic zones:** Las zonas dinámicas son una combinación de componentes, que a su vez se componen de varios campos. Escribir el contenido de una zona dinámica requiere pasos adicionales para acceder a los campos.

## Conclusiones

Strapi es una herramienta fantástica para poder crear un CMS y una API de forma rápida y sencilla. Así como también una gran solución para frontend developers que necesitan crear alguna API para sus aplicaciones sin tener grandes conocimientos en backend.`,
  },
  {
    id: 3,
    Title: "¿Que es Next.js?",
    Creation: "Sabado, 24 de Julio del 2021",
    Description:
      "Next.js es un framework de React que nos permite crear aplicaciones de React pre-renderizadas. Además de diferentes funciones como:",
    Cover: "https://i.imgur.com/V64B49d.png",
    Content: `Hoy te voy a hablar de Next.js, porque deberías empezar a usarlo, sus principales ventajas además de como inicializar un proyecto.

## ¿Qué es Next.js?

Next.js es un framework de React que nos permite crear aplicaciones de React pre-renderizadas. Además de diferentes funciones como:

- Un sistema de enrutamiento intuitivo [basado en páginas](https://nextjs.org/docs/basic-features/pages) (con soporte para [rutas dinámicas](https://nextjs.org/docs/routing/dynamic-routes)).

- [Pre renderizado](https://nextjs.org/docs/basic-features/pages#pre-rendering), tanto para la [generación estática](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) (SSG) y como para el [renderizado del lado del servidor](https://nextjs.org/docs/basic-features/pages#server-side-rendering) (SSR).

- División automática de código para cargas de página más rápidas.

- [Enrutamiento del lado del cliente](https://nextjs.org/docs/routing/introduction#linking-between-pages) con prefetching optimizado.

- [Compatibilidad con CSS](https://nextjs.org/docs/basic-features/built-in-css-support) y [Sass](https://nextjs.org/docs/basic-features/built-in-css-support#sass) incorporada, y compatibilidad con cualquier biblioteca CSS-in-JS.

- Entorno de desarrollo con soporte de Fast Refresh.

- Rutas de API para endpoints de API con funciones serverless.

Además de que Next.js es usado en decenas de miles de sitios y aplicaciones web en producción, incluidas muchas de las marcas más importantes del mundo. Por ejemplo TikTok, Uber, GitHub, Netflix, Coinbase y Twitch.

## ¿Por qué deberías usar Next.js sobre React.js?

Next.js trabaja renderizando los componentes de tu aplicación en el lado del servidor, en cambio React los renderiza en el navegador (lado del cliente).

Usar Next.js te provee de varias funciones como:

- Mejorar el desempeño de nuestra aplicación/sitio web en el lado del cliente. Esto es gracias a que el renderizado ha sido hecho en el lado del servidor.

- Mejor optimización de motores de búsqueda (SEO). Esto es porque una página HTML completamente renderizada llega al buscador, lo cual es más funcional y eficiente para los crawlers de los motores de búsqueda.

- Optimización de imágenes.

- Cero configuración.

- ¡Y mucho más!

React.js por sí solo no te provee de todas estas increíbles funciones. Pero esto no significa que no tengas que aprender o dejar de usar React.js; es más, debes conocer React.js para poder iniciar de una manera más sencilla Next.js. Además de que Next.js está construido sobre React.js.

## Vamos a ver cómo comenzar a usar Next.js

#### Requisitos

- Node.js 12.0 o versión posterior.
- macOS, Windows (incluyendo WSL) y Linux son soportados.

### Configuración

En el sitio oficial de Next.js se recomienda crear una nueva aplicación de Next.js usando el comando create-next-app, el cual configurará todo por ti automáticamente. Para crear un proyecto corre el siguiente comando en tu terminal:

~~~bash
npx create-next-app
# o
yarn create next-app
~~~

Si tienes planeado usar TypeScript en tu proyecto debes correr el siguiente comando:

~~~bash
npx create-next-app --typescript
# o
yarn create next-app --typescript
~~~

Y listo, has creado rápida y fácilmente un proyecto de Next.js.

## Estructura de un proyecto de Next.js

- **_app.js:** Aquí es donde Next.js inicializa nuestra aplicación/página web. Es el componente base de nuestra aplicación/página web.

- **/public:** Aquí es donde debemos poner todos nuestros assets públicos. Por ejemplo imágenes y videos.

- **/node_modules:** Aquí se encuentran todas las dependencias de nuestro proyecto.

- **/styles:** Los estilos de nuestro proyecto.

- **.gitignore:** Se usa para excluir archivos y carpetas de que se envíen a tu repositorio de git remoto.

- **README.md:** Contiene información acerca de tu proyecto.

- **package.json:** Ayuda a mantener un seguimiento de las dependencias de tu proyecto.

- **package-lock.json:** Mantiene el control de las versiones exactas de cada dependencia o paquete de tu proyecto.

## Conclusiones

En conclusión Next.js te ofrece la mejor experiencia de desarrollo con todas las funciones que necesitas para llevar una aplicación a producción: renderizado híbrido estático y de servidor, compatibilidad con TypeScript, empaquetado inteligente, pre-fetching en rutas y mucho más. Y sin necesidad de configuración.`,
  },
  {
    id: 4,
    Title: "¿Qué es Node.js?",
    Creation: "Domingo, 26 de septiembre del 2021",
    Description:
      "Node.js es un entorno en tiempo de ejecución multiplataforma de código abierto para la capa del servidor basado en el lenguaje de programación ECMAScript, asíncrono y basado en el motor V8 de Google.",
    Cover: "https://i.imgur.com/799iVGY.jpeg",
    Content: `# ¿Qué es Node.js?

Node.js es un entorno en tiempo de ejecución multiplataforma de código abierto para la capa del servidor basado en el lenguaje de programación ECMAScript, asíncrono y basado en el motor V8 de Google. En palabras simples, Node.js es un intérprete como un compilador, pero en lugar de depender del navegador, este puede ejecutar JavaScript desde tu máquina.

Muchos proyectos utilizan Node para funcionar, como:

- Webpack
- Babel
- PM2
- Electron

Node.js expandió el gran alcance que JavaScript tiene en el Frontend al Backend, aplicaciones móviles, etc. Antes de Node.js poder crear un backend con JavaScript era muy difícil. Así que Node.js elimina el requerimiento de conocer otros lenguajes de programación para poder desarrollar este tipo de aplicaciones.

## Algunas de las ventajas de Node.js son:

- Escalabilidad.
- Fácil de aprender.
- Una gran comunidad por detrás.
- Alto rendimiento.
- Ventaja del almacenamiento en caché.

Una de las mayores ventajas de Node.js es la gran cantidad de frameworks y herramientas gratuitas que existen.

Con Node.js, no tendrás que “reconstruir la rueda” cada vez que desees crear alguna aplicación debido al amplio conjunto de herramientas de terceros, puede crear aplicaciones en muy poco tiempo.

## ¿Pero qué se puede hacer con Node.js?

En la época actual, donde JavaScript es uno de los lenguajes de programación más populares, la pregunta debería ser qué no se puede hacer. Node.js se puede usar para:

- Aplicaciones web.
- Aplicaciones Android/iOS.
- Aplicación de escritorio.
- Herramientas de desarrollo.
- Herramientas de línea de comandos.
- IoT.
- APIs.`,
  },
];

export const posts = archivedPosts.filter(
  ({ id }) => ![2, 3, 4].includes(Number(id)),
);

export const projects: Project[] = [
  {
    id: "pasaegel",
    Project_Title: "PasaEGEL",
    Category: "SaaS · Education",
    Description:
      "Exam prep platform for Mexico's EGEL exams, built end to end with interactive simulations, study modules, payments, analytics and organic acquisition.",
    Metrics: "500+ users · 200+ paid orders · Top 5 Google rankings",
    Project_URL: "https://www.pasaegel.com/",
    Image: "/brands/pasaegel.png",
  },
  {
    id: "rubin-lsst",
    Project_Title: "Rubin/LSST Time Series Classifier",
    Category: "Machine Learning · Astronomy",
    Description:
      "Uncertainty aware astronomical classification and scientific prioritization pipeline built for Rubin/LSST like time series data.",
    Metrics: "1st Place · 5.1M+ objects · 68.47% balanced accuracy",
    Project_URL: "https://cudi.edu.mx/noticias/premiacion-hackathon",
    Icon: "galaxy",
    award: "1st Place",
  },
  {
    id: "gaia-ogle",
    Project_Title: "Gaia / OGLE Variable Star Classifier",
    Category: "Research · Machine Learning",
    Description:
      "Cross survey variable star classification using Gaia light curves, period, Fourier, color and catalog features, validated against OGLE labels.",
    Metrics: "491K Gaia sources · 11 classes · 0.9847 weighted F1",
    Icon: "constellation",
  },
  {
    id: "oliver-pos",
    Project_Title: "Oliver POS / ERP",
    Category: "Product · SaaS",
    Description:
      "Mobile POS for small businesses that later expanded into a full web based ERP.",
    Metrics: "10K+ downloads · 3K active users in 3 months",
    Image: "/brands/oliver.ico",
  },
];
