"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import { projects } from "@/lib/data";

const BlueprintHero = dynamic(() => import("@/components/three/BlueprintHero"), { ssr: false });

const featured = ["casa-angulo", "casa-nexo", "casa-umbral", "casa-cenit", "casa-horizonte"].map(
  (s) => projects.find((p) => p.slug === s)!
);

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const scroll = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => scrollYProgress.on("change", (v) => (scroll.current = v)), [scrollYProgress]);

  const p = featured[idx];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-night text-paper" data-cursor="hide">
      {/* Fallback / primer pintado */}
      <Image src={featured[0].image} alt={featured[0].alt} fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0">
        <BlueprintHero images={featured.map((f) => f.image)} onIndex={setIdx} scroll={scroll} />
      </div>

      <motion.div style={{ y, opacity }} className="container-x relative z-10 flex h-full flex-col justify-end pb-10 md:pb-14">
        <motion.p
          className="label mb-6 flex items-center gap-3 text-paper/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="inline-block h-px w-10 bg-bronze" /> Estudio de arquitectura · Pozuelo de Alarcón
        </motion.p>
        <h1 className="display max-w-[14ch] text-[15vw] sm:text-[11vw] lg:text-[8.6vw]">
          <SplitWords text="Del primer trazo" animateOnMount delay={0.6} />
          <br />
          <span className="italic text-bone">
            <SplitWords text="a tu casa." animateOnMount delay={0.85} />
          </span>
        </h1>
        <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
          <motion.p
            className="max-w-md text-base leading-relaxed text-paper/75 md:col-span-5 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            Diseñamos viviendas unifamiliares a medida en Madrid y te acompañamos en todo el proceso: estudio de parcela,
            proyecto y dirección de obra.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 1 }}
          >
            <Button href="/presupuesto" variant="light">
              Cuéntanos tu proyecto
            </Button>
            <Button href="/proyectos" variant="ghost-light">
              Ver proyectos
            </Button>
          </motion.div>
          <div className="hidden md:col-span-3 md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6 }}
                className="text-right"
              >
                <p className="label text-paper/50">
                  {String(idx + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")} · {p.location}
                </p>
                <Link href={`/proyectos/${p.slug}`} className="font-serif text-3xl italic hover:text-bronze">
                  {p.name}
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex justify-end gap-1.5">
              {featured.map((f, i) => (
                <span key={f.slug} className="relative h-px w-8 overflow-hidden bg-paper/25">
                  {i === idx && (
                    <motion.span
                      className="absolute inset-0 origin-left bg-paper"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 9.4, ease: "linear" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="label pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 text-paper/40 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Mueve el cursor · rayos X del proyecto
      </motion.div>
    </section>
  );
}
