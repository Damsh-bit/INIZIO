"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import { phases } from "@/lib/data";

const ProcessHouse = dynamic(() => import("@/components/three/ProcessHouse"), { ssr: false });

const services = [
  {
    n: "01",
    title: "Vivienda unifamiliar de obra nueva",
    text: "Diseñamos tu casa desde cero: estudio de parcela, anteproyecto, proyecto básico y de ejecución, y dirección de obra. Una casa que refleja tu forma de vivir.",
    points: ["Estudio de viabilidad", "Diseño y visualización 3D", "Licencia y visado", "Dirección de obra"],
    image: "/img/casa-umbral.webp",
    bg: "bg-paper",
  },
  {
    n: "02",
    title: "Reforma integral",
    text: "Renovaciones a gran escala de viviendas y locales. Reconfiguramos espacios, actualizamos instalaciones y supervisamos la obra para que no tengas que preocuparte de nada.",
    points: ["Viviendas", "Restaurantes y locales", "Rehabilitación", "Ampliaciones"],
    image: "/img/casa-serena.webp",
    bg: "bg-bone",
  },
  {
    n: "03",
    title: "Diseño de interiores",
    text: "Espacios únicos, funcionales y duraderos. Definimos materiales, iluminación y mobiliario para que el interior esté a la altura de la arquitectura.",
    points: ["Concepto y materiales", "Iluminación", "Mobiliario a medida", "Dirección de montaje"],
    image: "/img/interior-chimenea.webp",
    bg: "bg-sand",
  },
  {
    n: "04",
    title: "Parcelas y desarrollo",
    text: "¿No tienes parcela? Te ayudamos a buscarla y a evaluar su potencial antes de comprar. Y si quieres vender un terreno, lo promocionamos con una propuesta de vivienda.",
    points: ["Búsqueda de terreno", "Análisis de alternativas", "Negociación", "Venta de terrenos"],
    image: "/img/promo-aerea.webp",
    bg: "bg-ink text-paper",
  },
];

function StackCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, i % 2 ? 1.5 : -1.5]);
  return (
    <div ref={ref} className="sticky top-0 flex h-screen items-center" style={{ paddingTop: `${80 + i * 22}px` }}>
      <motion.article
        style={{ scale, rotate: rot }}
        className={`container-x grid h-[78vh] origin-top gap-8 overflow-hidden rounded-[28px] py-8 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.35)] md:grid-cols-12 md:py-12 ${s.bg}`}
      >
        <div className="flex flex-col justify-between md:col-span-6">
          <div>
            <span className="label opacity-60">{s.n} / 04</span>
            <h3 className="display mt-6 text-[10vw] md:text-[4.4vw]">{s.title}</h3>
            <p className="mt-6 max-w-lg opacity-75">{s.text}</p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {s.points.map((p) => (
              <li key={p} className="label flex items-center gap-2 opacity-80">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden overflow-hidden rounded-2xl md:col-span-6 md:block">
          <Image src={s.image} alt={s.title} fill sizes="45vw" className="object-cover" />
        </div>
      </motion.article>
    </div>
  );
}

function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const phase = useRef(0);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useEffect(
    () =>
      scrollYProgress.on("change", (v) => {
        phase.current = Math.min(v * 6.2, 5.99);
        setActive(Math.min(Math.floor(v * 6), 5));
      }),
    [scrollYProgress]
  );
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / 6;
    lenis ? lenis.scrollTo(top, { duration: 1.4 }) : window.scrollTo({ top, behavior: "smooth" });
  };
  const ph = phases[active];
  return (
    <section ref={ref} id="como-trabajamos" className="relative h-[700vh] bg-paper">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden blueprint-grid">
        <div className="container-x flex items-end justify-between gap-6 pt-24 md:pt-28">
          <div>
            <p className="label text-stone">Cómo trabajamos</p>
            <h2 className="display mt-2 text-[9vw] md:text-[3.6vw]">De la parcela a la llave</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            {phases.map((p, i) => (
              <button
                key={p.n}
                onClick={() => goTo(i)}
                className={`label rounded-full border px-3 py-2 transition-colors ${i === active ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
              >
                {p.n} {p.short}
              </button>
            ))}
          </div>
        </div>
        <div className="container-x grid flex-1 grid-rows-[1fr_auto] gap-4 md:grid-cols-12 md:grid-rows-1">
          <div className="relative min-h-[40vh] md:col-span-7">
            <ProcessHouse phase={phase} />
          </div>
          <div className="flex flex-col justify-center pb-10 md:col-span-5 md:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="display text-7xl text-bronze md:text-9xl">{ph.n}</span>
                  <span className="label rounded-full bg-bone px-3 py-1.5">{ph.duration}</span>
                </div>
                <h3 className="mt-4 font-serif text-4xl md:text-5xl">{ph.title}</h3>
                <p className="mt-4 max-w-md text-stone">{ph.text}</p>
                <ul className="mt-6 space-y-2">
                  {ph.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm">
                      <span className="text-bronze">✓</span> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="container-x pb-6">
          <div className="relative h-px bg-ink/15">
            <motion.div className="absolute inset-y-0 left-0 bg-ink" style={{ width: bar }} />
          </div>
          <p className="label mt-3 text-stone">Plazos orientativos · varían según municipio y proyecto</p>
        </div>
      </div>
    </section>
  );
}

export default function Servicios() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-night text-paper">
        <motion.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}>
          <Image src="/img/casa-horizonte.webp" alt="Vivienda de líneas horizontales con piscina" fill priority sizes="100vw" className="object-cover opacity-60" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="container-x relative flex h-full flex-col justify-end pb-14">
          <p className="label mb-6 text-paper/60">Servicios</p>
          <h1 className="display max-w-5xl text-[13vw] md:text-[7.5vw]">
            <SplitWords text="Arquitectura a medida" animateOnMount delay={0.5} />{" "}
            <em className="text-bone">
              <SplitWords text="sin improvisaciones" animateOnMount delay={0.75} />
            </em>
          </h1>
          <Reveal className="mt-8 grid gap-6 md:grid-cols-12" delay={0.9}>
            <p className="max-w-xl text-paper/75 md:col-span-6">
              Diseñamos, proyectamos y dirigimos cada intervención con un enfoque riguroso y personalizado. Disfruta del
              proceso sabiendo que cada decisión está bien planteada y que el resultado será fiel al diseño.
            </p>
            <div className="flex gap-3 md:col-span-6 md:justify-end">
              <Button href="#como-trabajamos" variant="light">
                Cómo trabajamos
              </Button>
              <Button href="/presupuesto" variant="ghost-light">
                Presupuesto
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        {services.map((s, i) => (
          <StackCard key={s.n} s={s} i={i} />
        ))}
      </section>

      <HowWeWork />

      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <p className="label text-stone">Tu propuesta incluye</p>
          <h2 className="display mt-6 text-[11vw] md:text-[4.5vw]">Un presupuesto claro desde el principio</h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {["Proyecto completo de arquitectura", "Dirección de obra", "Estimación orientativa del coste de construcción según diseño y acabados"].map(
            (t, i) => (
              <Reveal key={t} delay={i * 0.1} className="flex items-baseline gap-6 border-t border-ink/15 py-6 last:border-b">
                <span className="label text-bronze">0{i + 1}</span>
                <span className="font-serif text-2xl md:text-3xl">{t}</span>
              </Reveal>
            )
          )}
          <Reveal className="mt-10" delay={0.3}>
            <Button href="/presupuesto">Calcular mi presupuesto</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
