"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal, SplitWords } from "@/components/Reveal";
import { CurtainImage } from "@/components/ParallaxImage";
import { posts } from "@/lib/data";

export default function Blog() {
  const [cat, setCat] = useState<"Todos" | "Particulares" | "Promotoras">("Todos");
  const list = posts.filter((p) => cat === "Todos" || p.category === cat);
  const [feat, ...rest] = list;
  return (
    <>
      <section className="container-x pb-12 pt-36 md:pt-44">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="display text-[18vw] md:text-[11vw]">
            <SplitWords text="Diario" animateOnMount delay={0.5} />
          </h1>
          <div className="flex gap-2 pb-4">
            {(["Todos", "Particulares", "Promotoras"] as const).map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`relative rounded-full px-4 py-2 text-sm ${cat === c ? "text-paper" : "text-ink/70"}`}>
                {cat === c && <motion.span layoutId="blogcat" className="absolute inset-0 rounded-full bg-ink" />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-lg text-stone">Guías para tomar buenas decisiones antes de construir: costes, parcelas, normativa y proceso.</p>
      </section>

      {feat && (
        <section className="container-x pb-20">
          <Link href={`/blog/${feat.slug}`} className="group grid gap-8 md:grid-cols-12" data-cursor="Leer">
            <div className="relative aspect-[16/10] overflow-hidden md:col-span-8">
              <Image src={feat.image} alt={feat.title} fill sizes="66vw" priority className="object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-end md:col-span-4">
              <p className="label text-stone">{feat.category} · {feat.date} · {feat.read}</p>
              <h2 className="display mt-4 text-5xl transition-colors group-hover:text-bronze md:text-6xl">{feat.title}</h2>
              <p className="mt-4 text-stone">{feat.excerpt}</p>
              <span className="label mt-6">Leer artículo →</span>
            </div>
          </Link>
        </section>
      )}

      <section className="container-x grid gap-x-8 gap-y-16 pb-32 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link href={`/blog/${p.slug}`} className="group block" data-cursor="Leer">
              <CurtainImage src={p.image} alt={p.title} className="aspect-[4/3]" sizes="33vw" />
              <p className="label mt-5 text-stone">{p.category} · {p.date}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight transition-colors group-hover:text-bronze">{p.title}</h3>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
