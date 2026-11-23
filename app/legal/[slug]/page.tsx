import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/data";

const pages: Record<string, { title: string; body: string[] }> = {
  "aviso-legal": {
    title: "Aviso legal",
    body: [
      `Titular: ${site.legalName}. Domicilio: ${site.address}, ${site.city}. Email: ${site.email}.`,
      "Texto legal pendiente de facilitar por el cliente (NIF, datos registrales y condiciones de uso).",
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    body: [
      "Responsable del tratamiento, finalidades (gestionar solicitudes de contacto y presupuesto), legitimación, conservación y derechos del interesado.",
      "Texto legal pendiente de facilitar por el cliente.",
    ],
  },
  cookies: {
    title: "Política de cookies",
    body: ["Este sitio solo utiliza cookies técnicas necesarias. Si se añaden herramientas de analítica, se mostrará un aviso para su consentimiento.", "Texto legal pendiente de facilitar por el cliente."],
  },
};

export function generateStaticParams() { return Object.keys(pages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug]?.title, robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) notFound();
  return (
    <section className="container-x min-h-[70vh] pb-24 pt-36 md:pt-44">
      <p className="label text-stone">Legal</p>
      <h1 className="display mt-6 text-[12vw] md:text-[6vw]">{p.title}</h1>
      <div className="mt-12 max-w-2xl space-y-6 text-stone">
        {p.body.map((b, i) => <p key={i}>{b}</p>)}
      </div>
      <div className="mt-16 flex gap-6 text-sm">
        {Object.entries(pages).filter(([k]) => k !== slug).map(([k, v]) => (
          <Link key={k} href={`/legal/${k}`} className="link-u">{v.title}</Link>
        ))}
      </div>
    </section>
  );
}
