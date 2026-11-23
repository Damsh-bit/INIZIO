"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import { CurtainImage } from "@/components/ParallaxImage";
import { projects, provinces, zones, type Zone } from "@/lib/data";

export function ZonasIndex() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="container-x pb-20 pt-36 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label mb-8 text-stone">Zonas · Madrid y alrededores</p>
            <h1 className="display text-[14vw] md:text-[8vw]">
              <SplitWords text="Cerca de ti," animateOnMount delay={0.5} />
              <br />
              <em>
                <SplitWords text="y de tu parcela" animateOnMount delay={0.7} />
              </em>
            </h1>
          </div>
          <Reveal className="self-end md:col-span-4" delay={0.8}>
            <p className="text-stone">
              Desde Pozuelo de Alarcón desarrollamos proyectos en toda la Comunidad de Madrid y en las provincias de Ávila,
              Segovia, Toledo y Guadalajara, adaptando cada casa a la normativa de su municipio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {zones.map((z, i) => (
            <Reveal key={z.slug} delay={(i % 2) * 0.1}>
              <Link href={`/zonas/${z.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-ink text-paper md:aspect-[16/11]" data-cursor="Ver">
                <Image src={z.image} alt={`Vivienda en ${z.name}`} fill sizes="50vw" className="object-cover opacity-80 transition-all duration-[1.4s] group-hover:scale-105 group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="label text-paper/60">{z.kicker}</p>
                    <h2 className="display mt-2 text-5xl md:text-7xl">{z.name}</h2>
                  </div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/40 text-xl transition-all duration-500 group-hover:rotate-45 group-hover:bg-paper group-hover:text-ink">↗</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="container-x">
          <div className="mb-12 grid gap-6 md:grid-cols-12">
            <p className="label text-paper/50 md:col-span-3">Fuera de Madrid</p>
            <h2 className="display text-[10vw] md:col-span-9 md:text-[4.5vw]">
              Para quien busca una casa <em className="text-bronze">en plena naturaleza</em>
            </h2>
          </div>
          <div className="flex h-[70vh] flex-col gap-3 md:h-[64vh] md:flex-row">
            {provinces.map((p, i) => (
              <motion.button
                key={p.name}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className="relative overflow-hidden rounded-2xl text-left"
                animate={{ flex: open === i ? 4 : 1 }}
                transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
              >
                <Image src={p.image} alt={`Paisaje de ${p.name}`} fill sizes="60vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10" />
                <div className="absolute bottom-0 left-0 p-5 md:p-7">
                  <p className="label text-paper/60">Provincia</p>
                  <p className="display text-4xl md:text-6xl">{p.name}</p>
                  <motion.p
                    className="mt-2 max-w-xs text-sm text-paper/80"
                    animate={{ opacity: open === i ? 1 : 0, y: open === i ? 0 : 10 }}
                  >
                    Vivienda unifamiliar, rehabilitación y reforma integral en la provincia de {p.name}.
                  </motion.p>
                </div>
              </motion.button>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/contacto" variant="light">
              Consultar mi municipio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function ZonaDetail({ zone }: { zone: Zone }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const ty = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const list = projects.filter((p) => p.zona === zone.slug);
  const others = zones.filter((z) => z.slug !== zone.slug);
  return (
    <>
      <section ref={ref} className="relative h-[92svh] overflow-hidden bg-night text-paper">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image src={zone.image} alt={`Proyecto de vivienda en ${zone.name}`} fill priority sizes="100vw" className="scale-110 object-cover opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />
        <motion.div style={{ y: ty }} className="container-x relative flex h-full flex-col justify-end pb-14">
          <p className="label mb-6 text-paper/60">Arquitectos en · {zone.kicker}</p>
          <h1 className="display text-[15vw] md:text-[9vw]">
            <SplitWords text={zone.name} animateOnMount delay={0.5} />
          </h1>
        </motion.div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <Reveal>
            <p className="display text-[8vw] leading-[1.06] md:text-[3.2vw]">{zone.intro}</p>
          </Reveal>
        </div>
        <div className="space-y-6 text-stone md:col-span-4 md:col-start-9">
          {zone.body.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="leading-relaxed">{b}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="label mb-3 mt-4 text-ink">Zonas residenciales</p>
            <div className="flex flex-wrap gap-2">
              {zone.highlights.map((h) => (
                <span key={h} className="rounded-full border border-ink/20 px-3 py-1.5 text-xs text-ink">
                  {h}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {list.length > 0 && (
        <section className="container-x pb-24 md:pb-32">
          <p className="label mb-10 text-stone">Proyectos en {zone.name}</p>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {list.map((p, i) => (
              <Link key={p.slug} href={`/proyectos/${p.slug}`} className="group block" data-cursor="Ver">
                <CurtainImage src={p.image} alt={p.alt} className="aspect-[4/5]" sizes="33vw" delay={i * 0.1} />
                <h3 className="mt-4 font-serif text-3xl transition-colors group-hover:text-bronze">{p.name}</h3>
                <p className="text-sm text-stone">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-bone py-20">
        <div className="container-x flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <h2 className="display text-[10vw] md:text-[4vw]">¿Tienes parcela en {zone.name}?</h2>
            <p className="mt-4 max-w-lg text-stone">
              Envíanos su ubicación y la documentación que tengas. Te diremos qué se puede construir y te prepararemos una
              propuesta de honorarios.
            </p>
          </div>
          <Button href="/presupuesto">Pide presupuesto gratis</Button>
        </div>
      </section>

      <section className="container-x py-16">
        <p className="label mb-6 text-stone">Otras zonas</p>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          {others.map((z) => (
            <Link key={z.slug} href={`/zonas/${z.slug}`} className="display link-u text-4xl md:text-6xl">
              {z.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
