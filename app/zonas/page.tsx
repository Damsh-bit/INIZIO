import type { Metadata } from "next";
import { ZonasIndex } from "@/components/pages/Zonas";
export const metadata: Metadata = { title: "Zonas donde trabajamos", description: "Arquitectos de vivienda unifamiliar en Pozuelo, Majadahonda, Las Rozas, Madrid, Ávila, Segovia, Toledo y Guadalajara." };
export default function Page() { return <ZonasIndex />; }
