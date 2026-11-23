import type { Metadata } from "next";
import Estudio from "@/components/pages/Estudio";
export const metadata: Metadata = { title: "Estudio", description: "Conoce a Carlos Granero y Javier Blázquez, socios fundadores de INIZIO, estudio de arquitectura en Pozuelo de Alarcón." };
export default function Page() { return <Estudio />; }
