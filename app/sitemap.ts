import type { MetadataRoute } from "next";
import { posts, projects, zones } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.inizio.es";
  const pages = ["", "/proyectos", "/estudio", "/servicios", "/zonas", "/blog", "/contacto", "/presupuesto", "/promotoras", "/circulo-inizio"];
  return [
    ...pages.map((p) => ({ url: base + p })),
    ...projects.map((p) => ({ url: `${base}/proyectos/${p.slug}` })),
    ...zones.map((z) => ({ url: `${base}/zonas/${z.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}
