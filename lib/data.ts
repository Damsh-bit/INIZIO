// Contenido de la maqueta. Los datos marcados como "ejemplo" (m², año, ubicación exacta,
// testimonios) son provisionales hasta recibir el material del cliente.

export const site = {
  name: "INIZIO",
  legalName: "INIZIO Arquitectura y Desarrollo Inmobiliario",
  phone: "+34 638 600 367",
  phoneHref: "tel:+34638600367",
  whatsapp: "https://wa.me/34638600367?text=Hola%20INIZIO%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20mi%20proyecto",
  email: "hola@inizio.es",
  address: "Avenida de Europa 26, Segunda Planta",
  city: "28224 Pozuelo de Alarcón, Madrid",
  hours: "L–V · 9:00 – 19:00",
  coam: "COAM nº — (pendiente)",
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
  },
};

export type Tipologia = "Obra nueva" | "Reforma integral" | "Interiorismo";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  concept: string;
  image: string;
  gallery: string[];
  zona: string; // slug de zona
  location: string;
  area: number; // m² construidos (ejemplo)
  plot: number; // m² parcela (ejemplo)
  year: number;
  tipologia: Tipologia;
  status: "Proyecto" | "En obra" | "Terminada";
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "casa-angulo",
    name: "Casa Ángulo",
    tagline: "Vivienda unifamiliar en L que se abre al paisaje y articula la vida alrededor de la luz.",
    concept:
      "Dos alas en L abrazan el jardín y la piscina. El ala de día se abre por completo hacia el sur con grandes paños de vidrio, mientras el ala de noche se protege tras un muro de piedra clara. La esquina, donde se cruzan ambos volúmenes, es el corazón de la casa: un salón a doble altura que recoge la luz durante todo el día.",
    image: "/img/casa-angulo.webp",
    gallery: ["/img/casa-angulo.webp", "/img/vivienda-l-piscina.webp", "/img/vivienda-l-jardin.webp", "/img/interior-chimenea.webp"],
    zona: "pozuelo-de-alarcon",
    location: "Pozuelo de Alarcón",
    area: 412,
    plot: 1850,
    year: 2025,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Ángulo: vivienda unifamiliar en L de una planta con piscina y jardín de césped",
  },
  {
    slug: "casa-umbral",
    name: "Casa Umbral",
    tagline: "Composición de volúmenes que crean transiciones entre interior y exterior.",
    concept:
      "La casa se construye a partir de umbrales: porches, voladizos y terrazas que hacen que pasar de dentro a fuera sea gradual. La piedra en planta baja ancla la vivienda al terreno y la madera de la planta superior la aligera.",
    image: "/img/casa-umbral.webp",
    gallery: ["/img/casa-umbral.webp", "/img/vivienda-piedra.webp", "/img/vivienda-ladera.webp"],
    zona: "majadahonda",
    location: "Majadahonda",
    area: 368,
    plot: 1200,
    year: 2024,
    tipologia: "Obra nueva",
    status: "En obra",
    alt: "Casa Umbral: vivienda de tres alturas con volúmenes de piedra, madera y vidrio",
  },
  {
    slug: "casa-prisma",
    name: "Casa Prisma",
    tagline: "Vivienda unifamiliar de geometría precisa y volúmenes superpuestos.",
    concept:
      "Un prisma de madera se apoya sobre una base blanca y vuela sobre la terraza. Las proporciones están medidas al centímetro para que cada hueco enmarque una vista concreta del jardín.",
    image: "/img/casa-prisma.webp",
    gallery: ["/img/casa-prisma.webp", "/img/vivienda-blanca.webp", "/img/vivienda-acceso.webp"],
    zona: "las-rozas",
    location: "Las Rozas",
    area: 296,
    plot: 780,
    year: 2024,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Prisma: vivienda de dos plantas con volumen de madera superpuesto a una base blanca",
  },
  {
    slug: "casa-teca",
    name: "Casa Teca",
    tagline: "Refugio de madera donde la vida se vive al aire libre.",
    concept:
      "Una sola planta revestida de lamas de madera, elevada ligeramente sobre el terreno. El porche corrido convierte el jardín en una estancia más de la casa.",
    image: "/img/casa-teca.webp",
    gallery: ["/img/casa-teca.webp", "/img/vivienda-tradicional.webp", "/img/materiales-planos.webp"],
    zona: "madrid",
    location: "Sierra de Madrid",
    area: 184,
    plot: 2100,
    year: 2023,
    tipologia: "Obra nueva",
    status: "Terminada",
    alt: "Casa Teca: refugio de una planta revestido de madera rodeado de vegetación",
  },
  {
    slug: "casa-horizonte",
    name: "Casa Horizonte",
    tagline: "Abierta al paisaje, líneas horizontales y luz natural.",
    concept:
      "Una losa fina y larga define el horizonte de la casa. Debajo, el vidrio desaparece y la piscina prolonga la línea del forjado hasta el paisaje.",
    image: "/img/casa-horizonte.webp",
    gallery: ["/img/casa-horizonte.webp", "/img/hero-servicios.webp", "/img/vivienda-l-piscina.webp"],
    zona: "pozuelo-de-alarcon",
    location: "Pozuelo de Alarcón",
    area: 330,
    plot: 2400,
    year: 2025,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Horizonte: vivienda de una planta con cubierta plana volada y piscina alargada",
  },
  {
    slug: "casa-cubo-de-luz",
    name: "Casa Cubo de Luz",
    tagline: "Un espacio que respira. Geometría y transparencia se unen para bañar cada rincón.",
    concept:
      "Un volumen blanco vaciado en sus esquinas. Los vacíos se cierran con vidrio y la luz entra por las cuatro orientaciones, cambiando la casa a lo largo del día.",
    image: "/img/casa-cubo-de-luz.webp",
    gallery: ["/img/casa-cubo-de-luz.webp", "/img/vivienda-blanca.webp", "/img/interior-chimenea.webp"],
    zona: "majadahonda",
    location: "Majadahonda",
    area: 278,
    plot: 950,
    year: 2024,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Cubo de Luz: vivienda blanca de dos plantas con grandes ventanales y terraza acristalada",
  },
  {
    slug: "casa-galayos",
    name: "Casa Galayos",
    tagline: "Volúmenes puros que se alzan con solidez geométrica: un diseño firme y elegante.",
    concept:
      "Inspirada en los riscos de Gredos, la casa se compone de bloques macizos que se apilan con aparente sencillez. La pérgola de acero oscuro define la zona de estar exterior junto a la piscina.",
    image: "/img/casa-galayos.webp",
    gallery: ["/img/casa-galayos.webp", "/img/vivienda-zinc.webp", "/img/paisaje-avila.webp"],
    zona: "madrid",
    location: "Valle del Tiétar",
    area: 245,
    plot: 1600,
    year: 2023,
    tipologia: "Obra nueva",
    status: "Terminada",
    alt: "Casa Galayos: vivienda blanca de volúmenes puros con pérgola oscura y piscina",
  },
  {
    slug: "casa-dual",
    name: "Casa Dual",
    tagline: "Doble volumen en armonía, donde el contraste define un diseño audaz y atemporal.",
    concept:
      "Piedra y madera, macizo y ligero. Dos volúmenes con materiales opuestos se encajan y crean una fachada rica en sombras y texturas.",
    image: "/img/casa-dual.webp",
    gallery: ["/img/casa-dual.webp", "/img/vivienda-piedra.webp", "/img/boceto-materiales.webp"],
    zona: "las-rozas",
    location: "Las Rozas",
    area: 320,
    plot: 900,
    year: 2025,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Dual: vivienda de dos volúmenes con revestimiento de piedra clara y madera",
  },
  {
    slug: "casa-serena",
    name: "Casa Serena",
    tagline: "Arquitectura tranquila, abierta al jardín y al agua.",
    concept:
      "Una casa baja, encalada, que se tiende frente a la piscina. Huecos generosos, cubierta ligera y un jardín mediterráneo que la envuelve.",
    image: "/img/casa-serena.webp",
    gallery: ["/img/casa-serena.webp", "/img/vivienda-tradicional.webp", "/img/vivienda-l-jardin.webp"],
    zona: "pozuelo-de-alarcon",
    location: "Pozuelo de Alarcón",
    area: 260,
    plot: 1400,
    year: 2024,
    tipologia: "Reforma integral",
    status: "Terminada",
    alt: "Casa Serena: vivienda blanca de una planta frente a una piscina rectangular",
  },
  {
    slug: "casa-nexo",
    name: "Casa Nexo",
    tagline: "Volúmenes que se conectan y se entrelazan en una geometría audaz.",
    concept:
      "Una pieza de dos plantas y un pabellón de estar exterior se unen mediante una pérgola que actúa como nexo. La iluminación nocturna convierte el jardín en otra habitación.",
    image: "/img/casa-nexo.webp",
    gallery: ["/img/casa-nexo.webp", "/img/vivienda-noche.webp", "/img/vivienda-negra-piscina.webp"],
    zona: "madrid",
    location: "Madrid",
    area: 450,
    plot: 2000,
    year: 2025,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Nexo: vivienda contemporánea con pérgola de estar exterior y piscina al atardecer",
  },
  {
    slug: "casa-cenit",
    name: "Casa Cenit",
    tagline: "Arquitectura que mira al cielo: luz y altura definen un espacio sofisticado.",
    concept:
      "Una cubierta a dos aguas reinterpretada: el hastial se convierte en un gran ventanal que mira al cielo. Por la noche, la casa brilla como un farol sobre la piscina.",
    image: "/img/casa-cenit.webp",
    gallery: ["/img/casa-cenit.webp", "/img/vivienda-voladizo.webp", "/img/paisaje-sierra.webp"],
    zona: "majadahonda",
    location: "Majadahonda",
    area: 340,
    plot: 1100,
    year: 2025,
    tipologia: "Obra nueva",
    status: "Proyecto",
    alt: "Casa Cenit: vivienda a dos aguas con gran ventanal iluminado de noche y piscina",
  },
  {
    slug: "casa-zen",
    name: "Casa Zen",
    tagline: "Simplicidad absoluta: volúmenes que crean un espacio de calma y elegancia atemporal.",
    concept:
      "Nada sobra. Un marco blanco, un vidrio, un árbol. La casa reduce la arquitectura a lo esencial para que la protagonista sea la vida que sucede dentro.",
    image: "/img/casa-zen.webp",
    gallery: ["/img/casa-zen.webp", "/img/vivienda-blanca.webp", "/img/textura-piedra.webp"],
    zona: "las-rozas",
    location: "Las Rozas",
    area: 230,
    plot: 700,
    year: 2024,
    tipologia: "Interiorismo",
    status: "Terminada",
    alt: "Casa Zen: volumen blanco minimalista con fachada acristalada junto a un árbol",
  },
];

export const pillars = [
  { n: "01", title: "Diseño personal", text: "Una casa pensada para tu forma de vivir, la luz y el lugar donde estará." },
  { n: "02", title: "Estamos de tu lado", text: "Somos tus arquitectos y representamos tus intereses durante todo el proceso." },
  { n: "03", title: "Rigor técnico", text: "Materiales y soluciones constructivas bien definidos para llevar el diseño a la obra." },
  { n: "04", title: "Te lo ponemos fácil", text: "Te acompañamos en las decisiones técnicas y económicas, anticipando problemas antes de que lleguen a la obra." },
];

export const phases = [
  {
    n: "01",
    title: "Consulta y estudio de parcela",
    short: "Parcela",
    duration: "1 – 2 semanas",
    text: "Analizamos el terreno, la normativa y tus necesidades. Salimos de esta fase sabiendo qué se puede construir, cuánto y con qué presupuesto aproximado.",
    deliverables: ["Informe urbanístico", "Programa de necesidades", "Estimación económica inicial"],
  },
  {
    n: "02",
    title: "Anteproyecto",
    short: "Idea",
    duration: "3 – 5 semanas",
    text: "Tus ideas toman forma. Exploramos alternativas de distribución y volumen con planos e imágenes para que puedas comparar y decidir.",
    deliverables: ["Plantas y volumetría", "Imágenes 3D", "Ajuste de presupuesto"],
  },
  {
    n: "03",
    title: "Proyecto básico",
    short: "Licencia",
    duration: "4 – 6 semanas",
    text: "Definimos la casa con detalle y preparamos la documentación para solicitar la licencia de obra en tu ayuntamiento.",
    deliverables: ["Proyecto para licencia", "Memoria de calidades", "Tramitación municipal"],
  },
  {
    n: "04",
    title: "Proyecto de ejecución",
    short: "Detalle",
    duration: "6 – 8 semanas",
    text: "Cada encuentro, cada material y cada instalación queda resuelto. Un proyecto bien definido es la mejor garantía de una obra sin sorpresas.",
    deliverables: ["Planos constructivos", "Mediciones y presupuesto", "Visado colegial"],
  },
  {
    n: "05",
    title: "Selección de constructora",
    short: "Constructora",
    duration: "3 – 4 semanas",
    text: "Pedimos y comparamos ofertas de constructoras de confianza: precio, calidades y plazos. Siempre independientes y defendiendo tus intereses.",
    deliverables: ["Comparativo de ofertas", "Recomendación técnica", "Apoyo en contrato"],
  },
  {
    n: "06",
    title: "Dirección de obra",
    short: "Obra",
    duration: "12 – 18 meses",
    text: "Dirigimos la obra y supervisamos que se construya lo proyectado. Somos tu interlocutor técnico frente a la constructora hasta la entrega de llaves.",
    deliverables: ["Visitas de obra", "Control de calidad y costes", "Certificado final de obra"],
  },
];

export type Zone = {
  slug: string;
  name: string;
  kicker: string;
  image: string;
  intro: string;
  body: string[];
  highlights: string[];
};

export const zones: Zone[] = [
  {
    slug: "pozuelo-de-alarcon",
    name: "Pozuelo de Alarcón",
    kicker: "Nuestro estudio",
    image: "/img/casa-horizonte.webp",
    intro:
      "Desde nuestro estudio en la Avenida de Europa diseñamos casas a medida y te acompañamos desde el estudio de la parcela hasta el proyecto y la dirección de obra.",
    body: [
      "Tu vivienda comienza con tu forma de vivir. Escuchamos lo que necesitas y lo transformamos en una arquitectura contemporánea, luminosa y funcional, cuidando la distribución, los materiales y la relación con el jardín.",
      "Si tienes una parcela o estás valorando comprarla, te ayudamos a estudiar sus posibilidades: orientación, accesos, entorno y condiciones urbanísticas para definir una casa que aproveche el terreno.",
    ],
    highlights: ["Somosaguas", "La Finca", "Monteclaro", "Prado Largo", "Húmera"],
  },
  {
    slug: "majadahonda",
    name: "Majadahonda",
    kicker: "Noroeste de Madrid",
    image: "/img/casa-cubo-de-luz.webp",
    intro:
      "Proyectos de vivienda unifamiliar en Majadahonda, adaptados a la normativa municipal y a parcelas de todos los tamaños.",
    body: [
      "Majadahonda combina parcelas consolidadas con nuevos desarrollos. Estudiamos cada ordenanza para sacar el máximo partido a la edificabilidad sin renunciar al jardín ni a la privacidad.",
      "Trabajamos con planos e imágenes desde la primera fase para que puedas visualizar tu futura casa antes de construirla.",
    ],
    highlights: ["El Plantío", "Roza Martín", "Monte del Pilar", "Golf"],
  },
  {
    slug: "las-rozas",
    name: "Las Rozas",
    kicker: "Noroeste de Madrid",
    image: "/img/casa-prisma.webp",
    intro:
      "Arquitectos para tu casa en Las Rozas: desde la compra de la parcela hasta la entrega de llaves, con un único interlocutor.",
    body: [
      "En Las Rozas diseñamos viviendas que responden a parcelas con pendiente, vistas a la sierra y orientaciones exigentes.",
      "Te ayudamos a valorar las ofertas de las constructoras y dirigimos la obra para que lo construido sea fiel a lo proyectado.",
    ],
    highlights: ["Las Matas", "El Golf", "Molino de la Hoz", "Európolis"],
  },
  {
    slug: "madrid",
    name: "Madrid",
    kicker: "Comunidad de Madrid",
    image: "/img/casa-nexo.webp",
    intro:
      "Vivienda unifamiliar de obra nueva, reformas integrales y dirección de obra en Madrid capital y en toda la Comunidad.",
    body: [
      "Desde Aravaca hasta la sierra, conocemos la normativa de cada municipio y adaptamos cada proyecto a su contexto.",
      "También trabajamos en Toledo, Segovia, Ávila y Guadalajara, para quienes buscan una casa en un entorno más natural.",
    ],
    highlights: ["Aravaca", "Boadilla del Monte", "Villanueva de la Cañada", "Sierra de Guadarrama"],
  },
];

export const provinces = [
  { name: "Ávila", image: "/img/paisaje-avila.webp" },
  { name: "Segovia", image: "/img/paisaje-segovia.webp" },
  { name: "Toledo", image: "/img/paisaje-meseta.webp" },
  { name: "Guadalajara", image: "/img/paisaje-embalse.webp" },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  image: string;
  category: "Particulares" | "Promotoras";
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "cuanto-cobra-un-arquitecto-por-un-proyecto-de-una-casa",
    title: "¿Cuánto cobra un arquitecto por un proyecto de una casa?",
    excerpt:
      "Cuando alguien se plantea construir una vivienda, suele tener una pregunta clave que aparece incluso antes de hablar con ningún profesional.",
    date: "8 ago 2025",
    read: "4 min",
    image: "/img/boceto-materiales.webp",
    category: "Particulares",
    body: [
      "Cuando alguien se plantea construir una vivienda, suele tener una pregunta clave que aparece incluso antes de hablar con ningún profesional: cuánto va a costar el arquitecto.",
      "Los honorarios dependen del tamaño de la vivienda, de la complejidad del encargo y de los servicios incluidos: anteproyecto, proyecto básico, proyecto de ejecución y dirección de obra.",
      "En INIZIO preparamos una propuesta de honorarios adaptada a cada encargo, con las fases y los servicios claramente definidos desde el principio.",
    ],
  },
  {
    slug: "claves-construir-casa-desnivel",
    title: "Claves para construir tu casa en terreno inclinado",
    excerpt:
      "Un terreno inclinado no es un problema. Es una oportunidad. Te contamos cómo aprovechar el desnivel sin disparar el presupuesto.",
    date: "19 dic 2023",
    read: "10 min",
    image: "/img/vivienda-ladera.webp",
    category: "Particulares",
    body: [
      "Cuando alguien nos llama porque tiene una parcela con pendiente, la primera conversación casi siempre gira en torno al mismo tema: el coste.",
      "Pero un terreno inclinado no es un problema, es una oportunidad: vistas, privacidad y la posibilidad de crear espacios a distintas alturas que una parcela plana no permite.",
      "La clave está en adaptar la casa al terreno, y no al revés, minimizando movimientos de tierra y muros de contención.",
    ],
  },
  {
    slug: "construir-o-comprar-casa",
    title: "Construir tu propia casa o comprar una: te ayudamos a decidir",
    excerpt:
      "A la hora de buscar un nuevo hogar, muchas personas se enfrentan al dilema de construir desde cero o adquirir una vivienda existente.",
    date: "17 may 2023",
    read: "3 min",
    image: "/img/materiales-planos.webp",
    category: "Particulares",
    body: [
      "A la hora de buscar un nuevo hogar, muchas personas se enfrentan al dilema de elegir entre construir una casa desde cero o adquirir una vivienda existente.",
      "Construir permite adaptar cada metro a tu forma de vivir y controlar la calidad y la eficiencia energética. Comprar ofrece inmediatez, pero con menos margen de decisión.",
    ],
  },
  {
    slug: "cuanto-cuesta-construir-una-casa",
    title: "¿Cuánto cuesta construir una casa en la actualidad?",
    excerpt: "Guía sobre cuánto puede costar construir una vivienda unifamiliar y de qué depende el precio final.",
    date: "16 may 2023",
    read: "8 min",
    image: "/img/vivienda-l-jardin.webp",
    category: "Particulares",
    body: [
      "El coste de construir una vivienda unifamiliar depende de la superficie, el nivel de acabados, el terreno y las instalaciones.",
      "Para una primera orientación puedes usar nuestra calculadora, pero cada proyecto requiere un estudio específico de la parcela y del programa.",
    ],
  },
  {
    slug: "optimizacion-edificabilidad-solar-residencial",
    title: "Optimización de edificabilidad: cómo sacar más metros a un solar",
    excerpt:
      "Dos promotores compran dos solares similares. Uno termina con 850 m² útiles vendibles; el otro, con 720. La diferencia está en el anteproyecto.",
    date: "2025",
    read: "6 min",
    image: "/img/promo-aerea.webp",
    category: "Promotoras",
    body: [
      "Dos promotores compran dos solares similares. Misma superficie, mismo coeficiente de edificabilidad, mismo municipio. Uno termina con 850 metros útiles vendibles. El otro, con 720.",
      "La diferencia no está en la normativa. Está en el anteproyecto: en decisiones que no cuestan más en construcción pero que determinan la rentabilidad.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "Nos ayudaron a entender qué permitía la parcela antes incluso de comprarla. Eso nos ahorró muchos meses y bastante dinero.",
    name: "Familia G.",
    project: "Casa Teca",
  },
  {
    quote:
      "Lo mejor fue tener a alguien de nuestro lado frente a la constructora. Cada duda en obra se resolvía en el día.",
    name: "Laura y Miguel",
    project: "Casa Galayos",
  },
  {
    quote:
      "Veíamos la casa en 3D en cada reunión. Cuando entramos por primera vez, era exactamente lo que habíamos imaginado.",
    name: "Familia R.",
    project: "Casa Serena",
  },
];

export const team = [
  {
    name: "Carlos Granero",
    role: "Arquitecto · Socio fundador",
    bio: [
      "Arquitecto con más de 17 años de trayectoria. En 2006 fundó Estudio MyMG, especializado en proyectos de ejecución, reformas y rehabilitación.",
      "En 2015 creó Estudio Granero, liderando obra nueva, rehabilitación e informes técnicos. En 2023 funda INIZIO para desarrollar proyectos integrales de vivienda unifamiliar.",
    ],
  },
  {
    name: "Javier Blázquez",
    role: "Ingeniero técnico · Socio fundador",
    bio: [
      "Cofundador de INIZIO desde 2023. Lidera la estrategia, el desarrollo de negocio y la relación con clientes y promotoras.",
      "Su experiencia en consultoría estratégica y como Country Manager en el sector tecnológico aporta método y una gestión eficaz de proyectos complejos.",
    ],
  },
];

export const timeline = [
  { year: "2006", title: "Estudio MyMG", text: "Primeros proyectos de ejecución, reformas y rehabilitación." },
  { year: "2015", title: "Estudio Granero", text: "Obra nueva, rehabilitación e informes técnicos." },
  { year: "2023", title: "Nace INIZIO", text: "Arquitectura y desarrollo inmobiliario con un único interlocutor." },
  { year: "Hoy", title: "+12 proyectos", text: "Viviendas unifamiliares en Madrid y provincias limítrofes." },
];

export const nav = [
  { href: "/proyectos", label: "Proyectos", image: "/img/casa-angulo.webp" },
  { href: "/estudio", label: "Estudio", image: "/img/socios.webp" },
  { href: "/servicios", label: "Servicios", image: "/img/materiales-planos.webp" },
  { href: "/zonas", label: "Zonas", image: "/img/paisaje-sierra.webp" },
  { href: "/blog", label: "Blog", image: "/img/boceto-materiales.webp" },
  { href: "/contacto", label: "Contacto", image: "/img/casa-cenit.webp" },
];

export const navSecondary = [
  { href: "/presupuesto", label: "Presupuesto" },
  { href: "/promotoras", label: "Promotoras y terrenos" },
  { href: "/circulo-inizio", label: "Círculo INIZIO" },
];
