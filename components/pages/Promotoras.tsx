"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import { Consent, Field, Success } from "@/components/forms/Fields";
import { useSubmit } from "@/components/forms/useSubmit";
import { posts } from "@/lib/data";

const gantt = [
  { n: "01", t: "Análisis del activo", d: "Normativa, edificabilidad, potencial real del suelo y encaje preliminar", dur: "3 días", start: 0, len: 0.6 },
  { n: "02", t: "Producto optimizado", d: "Anteproyecto para mercado, documentación comercial, renders y tipologías", dur: "3 – 4 semanas", start: 0.6, len: 4 },
  { n: "03", t: "Proyecto para licencia", d: "Proyecto básico y documentación para la solicitud de licencia", dur: "6 – 8 semanas", start: 4.6, len: 8 },
  { n: "04", t: "Desarrollo técnico", d: "Proyecto de ejecución y visado en colegios profesionales", dur: "8 – 10 semanas", start: 12.6, len: 10 },
];
const TOTAL = 22.6;

export default function Promotoras() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const s = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const { state, submit } = useSubmit("terreno");

  return (
    <div className="dark bg-night text-paper">
      <section ref={hero} className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: s }}>
          <Image src="/img/promo-adosados.webp" alt="Promoción residencial de viviendas adosadas con piscina comunitaria" fill priority sizes="100vw" className="object-cover opacity-55" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/60 to-transparent" />
        <div className="container-x relative flex h-full flex-col justify-end pb-14">
          <p className="label mb-6 flex items-center gap-3 text-sage">
            <span className="h-px w-10 bg-sage" /> Para promotoras e inversores
          </p>
          <h1 className="display max-w-5xl text-[12vw] md:text-[6.8vw]">
            <SplitWords text="Arquitectura residencial" animateOnMount delay={0.5} />{" "}
            <em className="text-sage">
              <SplitWords text="que vende mejor" animateOnMount delay={0.75} />
            </em>
          </h1>
          <Reveal className="mt-8 flex flex-wrap items-end justify-between gap-8" delay={1}>
            <p className="max-w-lg text-paper/70">
              Analizamos el potencial del activo, optimizamos el encaje y desarrollamos promociones para venderse bien y
              resolverse con rigor técnico.
            </p>
            <Button href="#analisis" variant="light">
              Analizar un solar gratis
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="label text-paper/50 md:col-span-3">Qué aportamos desde el inicio</p>
          <Reveal className="md:col-span-9">
            <p className="display text-[8vw] leading-[1.06] md:text-[3.6vw]">
              No trabajamos desde la inercia ni desde soluciones genéricas. Cada activo se lee en clave{" "}
              <em className="text-sage">técnica, urbanística y comercial</em>.
            </p>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-paper/10 md:grid-cols-3">
          {[
            { k: "Claridad urbanística", t: "Reducimos la incertidumbre en la viabilidad del activo.", big: "−", img: "/img/promo-aerea.webp" },
            { k: "Producto competitivo", t: "Viviendas coherentes con el mercado y optimizadas en superficie.", big: "+18%", img: "/img/promo-residencial.webp" },
            { k: "Rigor técnico", t: "Proyectos bien definidos que facilitan la ejecución de la promoción.", big: "0", img: "/img/promo-torres.webp" },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.1} className="group relative min-h-[360px] overflow-hidden bg-night p-8 md:p-10">
              <Image src={c.img} alt="" fill sizes="33vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-25" />
              <div className="relative flex h-full flex-col justify-between">
                <span className="label text-sage">0{i + 1}</span>
                <div>
                  <h3 className="display text-4xl md:text-5xl">{c.k}</h3>
                  <p className="mt-4 text-paper/60">{c.t}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-paper/10 py-24 md:py-32">
        <div className="container-x">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-paper/50">De suelo a promoción residencial</p>
              <h2 className="display mt-4 text-[10vw] md:text-[4.6vw]">Un calendario claro</h2>
            </div>
            <p className="label text-paper/50">≈ 22 semanas hasta visado</p>
          </div>
          <div className="space-y-2">
            {gantt.map((g, i) => (
              <div key={g.n} className="grid items-center gap-4 border-t border-paper/10 py-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="label text-sage">{g.n} · {g.dur}</p>
                  <h3 className="mt-1 font-serif text-3xl">{g.t}</h3>
                  <p className="mt-1 text-sm text-paper/50">{g.d}</p>
                </div>
                <div className="relative h-12 md:col-span-8">
                  <div className="absolute inset-y-[22px] left-0 right-0 h-px bg-paper/10" />
                  <motion.div
                    className="absolute inset-y-2 origin-left rounded-full bg-sage/80"
                    style={{ left: `${(g.start / TOTAL) * 100}%`, width: `${Math.max((g.len / TOTAL) * 100, 2)}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.25, ease: [0.7, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            ))}
            <div className="label grid grid-cols-12 border-t border-paper/10 pt-3 text-paper/40">
              <span className="col-span-4 hidden md:block" />
              <div className="col-span-12 flex justify-between md:col-span-8">
                {["S0", "S5", "S10", "S15", "S20"].map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <p className="label mb-10 text-paper/50">Artículos para promotoras</p>
        <div className="grid gap-8 md:grid-cols-3">
          {[posts.find((p) => p.category === "Promotoras")!, posts[1], posts[0]].map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link href={`/blog/${p.slug}`} className="group block border-t border-paper/15 pt-6" data-cursor="Leer">
                <p className="label text-paper/40">{p.read} de lectura</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight transition-colors group-hover:text-sage">{p.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm text-paper/50">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="analisis" className="bg-paper/[0.03] py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-sage">Promotoras y propietarios de suelo</p>
            <h2 className="display mt-6 text-[11vw] md:text-[4.6vw]">¿Estudias una promoción o quieres vender un terreno?</h2>
            <p className="mt-6 max-w-md text-paper/60">
              Analizamos el activo y planteamos un encaje inicial gratuitamente. Si eres propietario de un terreno apto para
              construir, lo promocionamos junto a una propuesta de vivienda para maximizar su valor.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            {state === "ok" ? (
              <Success dark title="Recibido" text="Analizaremos la información y te contactaremos en 24–72 h con un primer encaje." />
            ) : (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(Object.fromEntries(new FormData(e.currentTarget).entries()));
                }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Nombre o empresa" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Teléfono" name="phone" type="tel" />
                  <Field label="Ubicación del suelo" name="location" />
                </div>
                <Field label="Referencia catastral o superficie (opcional)" name="cadastre" />
                <Field label="Cuéntanos el activo" name="message" textarea />
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <Consent dark />
                  <button className="shrink-0 rounded-full bg-paper px-8 py-4 text-sm text-ink transition-colors hover:bg-sage">
                    {state === "sending" ? "Enviando…" : "Solicitar análisis →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
