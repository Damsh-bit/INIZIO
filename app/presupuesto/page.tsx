import type { Metadata } from "next";
import { Suspense } from "react";
import Presupuesto from "@/components/pages/Presupuesto";
export const metadata: Metadata = { title: "Presupuesto y calculadora", description: "Calcula de forma orientativa el coste de construir tu vivienda unifamiliar y solicita un presupuesto gratis de proyecto y dirección de obra." };
export default function Page() { return <Suspense><Presupuesto /></Suspense>; }
