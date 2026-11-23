"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import { CurtainImage } from "@/components/ParallaxImage";
import type { Project } from "@/lib/data";
import { zones } from "@/lib/data";

function Lightbox({ images, index, onClose, setIndex, alt }: { images: string[]; index: number; onClose: () => void; setIndex: (i: number) => void; alt: string }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [index, images.length, onClose, setIndex]);
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-night/95 text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative h-[80vh] w-[92vw]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={images[index]} alt={alt} fill sizes="92vw" className="object-contain" quality={90} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6">
        <button onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + images.length) % images.length); }} className="rounded-full border border-paper/30 px-5 py-3 hover:bg-paper hover:text-ink" aria-label="Anterior">←</button>
        <span className="label">{index + 1} / {images.length}</span>
        <button onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % images.length); }} className="rounded-full border border-paper/30 px-5 py-3 hover:bg-paper hover:text-ink" aria-label="Siguiente">→</button>
      </div>
      <button onClick={onClose} className="label absolute right-6 top-6 rounded-full border border-paper/30 px-4 py-2 hover:bg-paper hover:text-ink">Cerrar ✕</button>
    </motion.div>,
    document.body
  );
}

export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0%)", "inset(6% 4% 0% 4%)"]);
  const [lb, setLb] = useState<number | null>(null);
  const zone = zones.find((z) => z.slug === project.zona);

  const data = [
    { k: "Ubicación", v: project.location },
    { k: "Tipología", v: project.tipologia },
    { k: "Superficie", v: `${project.area} m²` },
    { k: "Parcela", v: `${project.plot.toLocaleString("es-ES")} m²` },
    { k: "Año", v: String(project.year) },
    { k: "Estado", v: project.status },
  ];

  return (
    <>
      <section ref={hero} className="relative h-[100svh] overflow-hidden bg-night text-paper">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Image src={project.image} alt={project.alt} fill priority sizes="100vw" className="object-cover" quality={90} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        </motion.div>
        <motion.div style={{ y }} className="container-x relative flex h-full flex-col justify-end pb-12">
          <Link href="/proyectos" className="label mb-8 inline-flex w-fit items-center gap-2 text-paper/70 hover:text-paper">
            ← Todos los proyectos
          </Link>
          <h1 className="display text-[17vw] md:text-[10vw]">
            <SplitWords text={project.name} animateOnMount delay={0.5} />
          </h1>
          <motion.p
            className="mt-4 max-w-xl text-lg text-paper/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {project.tagline}
          </motion.p>
        </motion.div>
      </section>

      <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-36">
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="label mb-6 text-stone">Ficha técnica</p>
            <dl className="divide-y divide-ink/15 border-y border-ink/15">
              {data.map((d, i) => (
                <Reveal key={d.k} delay={i * 0.05} className="flex justify-between py-4">
                  <dt className="label text-stone">{d.k}</dt>
                  <dd className="text-sm">{d.v}</dd>
                </Reveal>
              ))}
            </dl>
            <p className="label mt-4 text-bronze/80">Datos de ejemplo · pendientes de confirmar con el estudio</p>
            <div className="mt-8">
              <Button href={`/presupuesto?ref=${project.slug}`}>Quiero una casa así</Button>
            </div>
          </div>
        </aside>
        <div className="md:col-span-7 md:col-start-6">
          <p className="label mb-6 text-stone">Concepto</p>
          <SplitWords text={project.concept} className="display block text-[8vw] leading-[1.08] md:text-[3vw]" stagger={0.012} />
          {zone && (
            <Reveal className="mt-12">
              <Link href={`/zonas/${zone.slug}`} className="label link-u text-stone">
                Más proyectos en {zone.name} →
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <div className="mb-10 flex items-end justify-between">
          <p className="label text-stone">Galería · {project.gallery.length} imágenes</p>
          <button onClick={() => setLb(0)} className="label link-u">
            Ver a pantalla completa
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          {project.gallery.map((g, i) => {
            const span = i === 0 ? "md:col-span-12 aspect-[16/9]" : i % 3 === 1 ? "md:col-span-7 aspect-[4/3]" : "md:col-span-5 aspect-[4/5]";
            return (
              <button key={g + i} className={`group relative block overflow-hidden ${span}`} onClick={() => setLb(i)} data-cursor="Ampliar">
                <CurtainImage src={g} alt={`${project.name}, imagen ${i + 1}`} className="absolute inset-0" sizes={i === 0 ? "100vw" : "60vw"} />
              </button>
            );
          })}
        </div>
      </section>

      <Link href={`/proyectos/${next.slug}`} className="group relative block h-[70vh] overflow-hidden bg-night text-paper" data-cursor="Siguiente">
        <Image
          src={next.image}
          alt={next.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-50 transition-all duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-70"
        />
        <div className="container-x relative flex h-full flex-col items-start justify-center">
          <p className="label text-paper/60">Siguiente proyecto</p>
          <h2 className="display mt-4 text-[16vw] transition-transform duration-700 group-hover:translate-x-4 md:text-[9vw]">
            {next.name} <span className="inline-block transition-transform duration-700 group-hover:translate-x-4">→</span>
          </h2>
        </div>
      </Link>

      <AnimatePresence>
        {lb !== null && <Lightbox images={project.gallery} index={lb} setIndex={setLb} onClose={() => setLb(null)} alt={project.alt} />}
      </AnimatePresence>
    </>
  );
}
