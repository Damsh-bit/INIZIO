import type { Metadata } from "next";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Proyectos de vivienda unifamiliar",
  description: "Doce proyectos de vivienda unifamiliar a medida en Pozuelo, Majadahonda, Las Rozas y Madrid. Filtra por tipología y zona.",
};

export default function Page() {
  return <ProjectsExplorer />;
}
