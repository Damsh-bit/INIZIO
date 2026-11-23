import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import ReadingProgress from "@/components/ReadingProgress";
import { Reveal, SplitWords } from "@/components/Reveal";
import { posts } from "@/lib/data";

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { images: [p.image] } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <article>
      <ReadingProgress />
      <header className="container-x pb-12 pt-36 md:pt-44">
        <Link href="/blog" className="label text-stone hover:text-ink">← Blog</Link>
        <p className="label mt-10 text-stone">{p.category} · {p.date} · {p.read} de lectura</p>
        <SplitWords as="h1" text={p.title} animateOnMount delay={0.5} className="display mt-6 block max-w-5xl text-[11vw] md:text-[6vw]" />
      </header>
      <div className="container-x">
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image src={p.image} alt={p.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <aside className="label text-stone md:col-span-3">Por INIZIO Arquitectura</aside>
        <div className="space-y-6 text-lg leading-relaxed md:col-span-7">
          <p className="font-serif text-3xl leading-snug">{p.excerpt}</p>
          {p.body.map((b, i) => (
            <Reveal key={i} delay={i * 0.05}><p className="text-ink/80">{b}</p></Reveal>
          ))}
          <p className="label pt-6 text-bronze/80">Extracto · el artículo completo se migrará desde la web actual</p>
          <div className="pt-8"><Button href="/presupuesto">Calcular mi presupuesto</Button></div>
        </div>
      </div>
      <section className="border-t border-ink/15">
        <div className="container-x grid gap-8 py-16 md:grid-cols-2">
          {more.map((m) => (
            <Link key={m.slug} href={`/blog/${m.slug}`} className="group">
              <p className="label text-stone">Siguiente lectura</p>
              <h2 className="mt-3 font-serif text-3xl transition-colors group-hover:text-bronze md:text-4xl">{m.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
