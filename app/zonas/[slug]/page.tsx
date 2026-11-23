import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZonaDetail } from "@/components/pages/Zonas";
import { zones } from "@/lib/data";
export function generateStaticParams() { return zones.map((z) => ({ slug: z.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const z = zones.find((x) => x.slug === slug);
  return z ? { title: `Estudio de arquitectura en ${z.name}`, description: z.intro } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const z = zones.find((x) => x.slug === slug);
  if (!z) notFound();
  return <ZonaDetail zone={z} />;
}
