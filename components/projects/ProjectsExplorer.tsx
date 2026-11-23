"use client";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SplitWords } from "@/components/Reveal";
import { projects, zones } from "@/lib/data";

const ProjectsRing = dynamic(() => import("@/components/three/ProjectsRing"), { ssr: false });

type View = "anillo" | "indice" | "rejilla";

function RingView() {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useEffect(() => scrollYProgress.on("change", (v) => (progress.current = v)), [scrollYProgress]);
  const p = projects[active];
  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ProjectsRing
          items={projects.map((x) => ({ slug: x.slug, image: x.image, name: x.name }))}
          progress={progress}
          onActive={setActive}
          onOpen={(slug) => router.push(`/proyectos/${slug}`)}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="container-x flex items-end justify-between gap-6 pb-8 md:pb-12 md:pr-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="label text-stone">
                  {String(active + 1).padStart(2, "0")} — {p.location} · {p.tipologia}
                </p>
                <h2 className="display mt-2 text-[13vw] md:text-[6vw]">{p.name}</h2>
                <p className="mt-2 max-w-md text-sm text-stone">{p.tagline}</p>
              </motion.div>
            </AnimatePresence>
            <Link
              href={`/proyectos/${p.slug}`}
              className="pointer-events-auto hidden shrink-0 rounded-full bg-ink px-6 py-4 text-sm text-paper transition-colors hover:bg-bronze md:block"
            >
              Abrir ficha →
            </Link>
          </div>
        </div>
        <p className="label pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 text-stone md:top-28">
          Haz scroll o arrastra para girar
        </p>
      </div>
    </section>
  );
}

function IndexView({ list }: { list: typeof projects }) {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22 });
  const sy = useSpring(y, { stiffness: 160, damping: 22 });
  return (
    <div
      className="container-x relative pb-32"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="label grid grid-cols-12 gap-4 border-b border-ink/15 pb-3 text-stone">
        <span className="col-span-1">Nº</span>
        <span className="col-span-7 md:col-span-4">Proyecto</span>
        <span className="hidden md:col-span-3 md:block">Ubicación</span>
        <span className="hidden md:col-span-2 md:block">Tipología</span>
        <span className="col-span-4 text-right md:col-span-2">Año</span>
      </div>
      <LayoutGroup>
        {list.map((p, i) => (
          <motion.div layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Link
              href={`/proyectos/${p.slug}`}
              onPointerEnter={() => setHover(projects.indexOf(p))}
              onPointerLeave={() => setHover(null)}
              className="group grid grid-cols-12 items-center gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-bone md:py-8"
              data-cursor="Ver"
            >
              <span className="label col-span-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-7 font-serif text-3xl transition-all duration-500 group-hover:translate-x-3 group-hover:italic md:col-span-4 md:text-5xl">
                {p.name}
              </span>
              <span className="hidden text-sm text-stone md:col-span-3 md:block">{p.location}</span>
              <span className="hidden text-sm text-stone md:col-span-2 md:block">{p.tipologia}</span>
              <span className="label col-span-4 text-right md:col-span-2">{p.year}</span>
            </Link>
          </motion.div>
        ))}
      </LayoutGroup>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[320px] w-[260px] overflow-hidden md:block"
        style={{ x: sx, y: sy, translateX: "20%", translateY: "-50%" }}
        animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.7 : 1, rotate: hover === null ? -6 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {hover !== null && (
            <motion.div
              key={hover}
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
            >
              <Image src={projects[hover].image} alt="" fill sizes="260px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function GridView({ list }: { list: typeof projects }) {
  return (
    <div className="container-x pb-32">
      <motion.div layout className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={i % 3 === 1 ? "lg:mt-24" : ""}
            >
              <Link href={`/proyectos/${p.slug}`} className="group block" data-cursor="Ver">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span className="label absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5">{p.status}</span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-3xl">{p.name}</h3>
                  <span className="label text-stone">{p.year}</span>
                </div>
                <p className="mt-1 text-sm text-stone">
                  {p.location} · {p.area} m² · {p.tipologia}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ProjectsExplorer() {
  const [view, setView] = useState<View>("anillo");
  const [tipo, setTipo] = useState<string>("Todas");
  const [zona, setZona] = useState<string>("Todas");
  const list = useMemo(
    () => projects.filter((p) => (tipo === "Todas" || p.tipologia === tipo) && (zona === "Todas" || p.zona === zona)),
    [tipo, zona]
  );
  const tipos = ["Todas", "Obra nueva", "Reforma integral", "Interiorismo"];

  return (
    <>
      <section className="container-x pb-10 pt-36 md:pt-44">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="display text-[18vw] md:text-[11vw]">
            <SplitWords text="Proyectos" animateOnMount delay={0.5} />
            <sup className="ml-2 align-super font-sans text-base text-stone md:text-2xl">({projects.length})</sup>
          </h1>
          <p className="max-w-sm pb-4 text-stone">
            Donde las ideas toman forma y la arquitectura toma vida. Doce viviendas con nombre propio en Madrid y alrededores.
          </p>
        </div>

        <div className="sticky top-[72px] z-30 mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-ink/15 bg-paper/90 py-4 backdrop-blur md:top-[88px]">
          <div className="flex gap-1 rounded-full bg-bone p-1">
            {(["anillo", "indice", "rejilla"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`relative rounded-full px-4 py-2 text-sm capitalize transition-colors ${view === v ? "text-paper" : "text-ink/70 hover:text-ink"}`}
              >
                {view === v && <motion.span layoutId="viewpill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{v === "anillo" ? "Anillo 3D" : v === "indice" ? "Índice" : "Rejilla"}</span>
              </button>
            ))}
          </div>
          {view !== "anillo" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-center gap-2">
              {tipos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${tipo === t ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
                >
                  {t}
                </button>
              ))}
              <select
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                className="rounded-full border border-ink/20 bg-transparent px-3.5 py-1.5 text-xs"
                aria-label="Filtrar por zona"
              >
                <option value="Todas">Todas las zonas</option>
                {zones.map((z) => (
                  <option key={z.slug} value={z.slug}>
                    {z.name}
                  </option>
                ))}
              </select>
              <span className="label ml-2 text-stone">{list.length} resultados</span>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          {view === "anillo" && <RingView />}
          {view === "indice" && <IndexView list={list} />}
          {view === "rejilla" && <GridView list={list} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
