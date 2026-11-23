import type { Metadata } from "next";
import Servicios from "@/components/pages/Servicios";
export const metadata: Metadata = { title: "Servicios y proceso", description: "Vivienda unifamiliar de obra nueva, reforma integral, interiorismo y búsqueda de parcela. Así trabajamos, fase a fase." };
export default function Page() { return <Servicios />; }
