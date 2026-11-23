import type { Metadata } from "next";
import Blog from "@/components/pages/Blog";
export const metadata: Metadata = { title: "Blog", description: "Guías sobre el coste de construir una casa, honorarios de arquitecto, parcelas con pendiente y promoción residencial." };
export default function Page() { return <Blog />; }
