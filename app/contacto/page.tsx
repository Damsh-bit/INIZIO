import type { Metadata } from "next";
import Contacto from "@/components/pages/Contacto";
export const metadata: Metadata = { title: "Contacto", description: "Escríbenos o ven a vernos a nuestro estudio en la Avenida de Europa 26, Pozuelo de Alarcón. Respuesta en menos de 24 horas." };
export default function Page() { return <Contacto />; }
