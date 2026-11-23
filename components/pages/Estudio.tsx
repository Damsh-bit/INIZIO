"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { DrawLine, Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import ParallaxImage from "@/components/ParallaxImage";
import { site, team, timeline } from "@/lib/data";

export default function Estudio() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const w = useTransform(scrollYProgress, [0, 0.6], ["62%", "100%"]);

  const tl = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlp } = useScroll({ target: tl, offset: ["start 0.8", "end 0.6"] });
  const lineW = useTransform(tlp, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section ref={hero} className="relative pt-36 md:pt-44">
        <div className="container-x">
          <p className="label mb-8 text-stone">Estudio · Pozuelo de Alarcón</p>
          <h1 className="display text-[14vw] md:text-[9vw]">
            <SplitWords text="Dos socios," animateOnMount delay={0.5} />
            <br />
            <em>
              <SplitWords text="una forma de construir" animateOnMount delay={0.7} />
            </em>
          </h1>
        </div>
        <motion.div style={{ width: w }} className="relative mx-auto mt-14 aspect-[16/10] overflow-hidden md:aspect-[21/9]">
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
            <Image src="/img/socios.webp" alt="Carlos Granero y Javier Blázquez, socios fundadores de INIZIO" fill priority sizes="100vw" className="object-cover object-[50%_25%]" />
          </motion.div>
        </motion.div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <p className="label text-stone md:col-span-3">(01) — Por qué existimos</p>
        <div className="md:col-span-8">
          <Reveal>
            <p className="display text-[8vw] leading-[1.06] md:text-[3.4vw]">
              Muchas personas se sienten intimidadas por la complejidad y la poca transparencia de construir una casa. Creamos
              INIZIO para cambiar eso: <em className="text-bronze">un único interlocutor</em> de principio a fin.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 text-stone md:grid-cols-2">
            <Reveal delay={0.1}>
              <p className="leading-relaxed">
                Nacimos en un momento de cambio en la forma de vivir. Cada vez más familias buscan viviendas más amplias, con
                espacios adaptados a su día a día y en entornos más tranquilos.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="leading-relaxed">
                Gestionamos cada proyecto desde la parcela hasta la entrega de llaves, involucrando de forma transparente a
                todos los actores de la construcción, para que tú solo tengas que preocuparte de decidir.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section ref={tl} className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <p className="label mb-16 text-stone">(02) — Trayectoria</p>
          <div className="relative">
            <div className="absolute left-0 right-0 top-[10px] hidden h-px bg-ink/15 md:block" />
            <motion.div className="absolute left-0 top-[10px] hidden h-px bg-bronze md:block" style={{ width: lineW }} />
            <div className="grid gap-12 md:grid-cols-4">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.12} className="relative border-l border-ink/15 pl-6 md:border-0 md:pl-0">
                  <span className="relative z-10 hidden h-5 w-5 rounded-full border border-ink bg-bone md:block" />
                  <p className="display mt-0 text-7xl md:mt-8 md:text-8xl">{t.year}</p>
                  <h3 className="mt-4 font-serif text-2xl">{t.title}</h3>
                  <p className="mt-2 max-w-[26ch] text-sm text-stone">{t.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <p className="label mb-14 text-stone">(03) — Socios fundadores</p>
        <div className="space-y-24">
          {team.map((m, i) => (
            <div key={m.name} className="grid gap-10 md:grid-cols-12">
              <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <Reveal>
                  <div className="group relative aspect-[4/5] overflow-hidden bg-ink">
                    <Image
                      src="/img/socios.webp"
                      alt={m.name}
                      fill
                      sizes="40vw"
                      className={`object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 ${i === 0 ? "object-[22%_30%]" : "object-[78%_30%]"}`}
                    />
                    <span className="label absolute bottom-4 left-4 rounded-full bg-paper px-3 py-1.5">Foto individual pendiente</span>
                  </div>
                </Reveal>
              </div>
              <div className={`flex flex-col justify-end md:col-span-6 ${i % 2 ? "md:order-1" : "md:col-start-7"}`}>
                <p className="label text-bronze">{m.role}</p>
                <SplitWords as="h2" text={m.name} className="display mt-4 block text-[13vw] md:text-[6vw]" />
                <DrawLine className="my-8" />
                <div className="grid gap-6 text-stone md:grid-cols-2">
                  {m.bio.map((b, k) => (
                    <Reveal key={k} delay={k * 0.1}>
                      <p className="leading-relaxed">{b}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-36">
        <ParallaxImage src="/img/textura-piedra.webp" alt="" className="!absolute inset-0 opacity-10" />
        <div className="container-x relative grid gap-16 md:grid-cols-2">
          {[
            {
              k: "Misión",
              t: "Facilitar la creación de espacios funcionales e innovadores, adaptados a cada cliente, gestionando cada proyecto de principio a fin con total transparencia.",
            },
            {
              k: "Visión",
              t: "Ser un estudio de referencia en vivienda unifamiliar, no solo por el diseño y la calidad de los proyectos, sino por el acompañamiento constante a cada cliente.",
            },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 0.15}>
              <p className="label text-paper/50">{b.k}</p>
              <p className="display mt-6 text-[8vw] leading-[1.08] md:text-[2.8vw]">{b.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-stone">(04) — Credenciales</p>
            <h2 className="display mt-6 text-[10vw] md:text-[4vw]">Colegiados y con respaldo</h2>
            <p className="mt-6 max-w-md text-stone">
              Espacio reservado para el número de colegiado COAM, seguro de responsabilidad civil, premios y apariciones en
              prensa. Pendiente de recibir el material del estudio.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-6 md:col-start-7 md:grid-cols-3">
            {[site.coam, "Seguro RC", "Prensa", "Premios", "Google ★ 5,0", "Certificación"].map((c) => (
              <div key={c} className="label flex aspect-[3/2] items-center justify-center border border-dashed border-ink/25 px-3 text-center text-stone">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-wrap gap-4">
          <Button href="/contacto">Ven a conocernos</Button>
          <Button href="/proyectos" variant="outline">
            Ver proyectos
          </Button>
        </div>
      </section>
    </>
  );
}
