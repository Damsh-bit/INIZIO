"use client";
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DrawLine, Reveal, SplitWords } from "@/components/Reveal";
import Button from "@/components/Button";
import ParallaxImage, { CurtainImage } from "@/components/ParallaxImage";
import { phases, pillars, posts, projects, testimonials, zones } from "@/lib/data";

/* ---------- Manifiesto: palabras que se encienden con el scroll ---------- */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const text =
    "Construir tu casa empieza por tomar buenas decisiones. Te ayudamos a definir qué necesitas, qué permite tu parcela y cómo orientar el diseño según tu presupuesto. En INIZIO trabajas directamente con los arquitectos responsables de tu vivienda.";
  const words = text.split(" ");
  return (
    <section className="container-x py-28 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <p className="label text-stone md:col-span-3">(01) — El estudio</p>
        <div ref={ref} className="md:col-span-9">
          <p className="display text-[9vw] leading-[1.02] md:text-[4.6vw]">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <Reveal className="mt-12 flex flex-wrap items-center gap-6" delay={0.1}>
            <Button href="/estudio" variant="outline">
              Conoce al equipo
            </Button>
            <span className="label text-stone">Carlos Granero · Javier Blázquez</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pilares ---------- */
export function Pillars() {
  return (
    <section className="container-x pb-28 md:pb-40">
      <div className="grid gap-px overflow-hidden border-y border-ink/15 md:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className="group relative px-0 py-10 md:px-8 md:py-14">
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <div className="relative">
              <span className="label text-bronze">{p.n}</span>
              <h3 className="mt-8 font-serif text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone">{p.text}</p>
            </div>
            {i < 3 && <span className="absolute right-0 top-10 hidden h-[calc(100%-5rem)] w-px bg-ink/15 md:block" />}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Proyectos destacados: scroll horizontal fijado ---------- */
export function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const sx = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const list = projects.slice(0, 7);

  useEffect(() => {
    const calc = () => {
      if (track.current) setDist(track.current.scrollWidth - window.innerWidth);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section ref={ref} className="relative bg-ink text-paper" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-8 flex items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="label mb-4 text-paper/50">(02) — Proyectos de vivienda unifamiliar</p>
            <h2 className="display text-[12vw] md:text-[6vw]">
              Diseño, luz <em className="text-bronze">y entorno</em>
            </h2>
          </div>
          <Link href="/proyectos" className="label link-u hidden shrink-0 md:block">
            Los 12 proyectos →
          </Link>
        </div>
        <motion.div ref={track} style={{ x: sx }} className="flex w-max gap-5 pl-[clamp(16px,4vw,56px)] pr-[10vw] md:gap-8">
          {list.map((p, i) => (
            <Link
              key={p.slug}
              href={`/proyectos/${p.slug}`}
              className="group relative block shrink-0"
              data-cursor="Ver"
            >
              <div
                className={`relative overflow-hidden ${
                  i % 2 === 0 ? "h-[52vh] w-[78vw] md:h-[56vh] md:w-[44vw]" : "h-[52vh] w-[64vw] md:h-[56vh] md:w-[30vw]"
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width:768px) 80vw, 45vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl md:text-3xl">
                  <span className="mr-3 align-top text-xs text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                  {p.name}
                </h3>
                <span className="label text-paper/50">{p.location}</span>
              </div>
            </Link>
          ))}
          <Link
            href="/proyectos"
            className="group flex h-[52vh] w-[64vw] shrink-0 flex-col items-center justify-center border border-paper/20 md:h-[56vh] md:w-[26vw]"
          >
            <span className="display text-6xl italic transition-transform duration-700 group-hover:scale-110">+5</span>
            <span className="label mt-4 text-paper/60">Ver todos los proyectos</span>
          </Link>
        </motion.div>
        <div className="container-x mt-10">
          <div className="relative h-px bg-paper/15">
            <motion.div className="absolute inset-y-0 left-0 bg-bronze" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contadores ---------- */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2200, bounce: 0 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);
  useEffect(() => spring.on("change", (v) => setVal(Math.round(v))), [spring]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function Stats() {
  const stats = [
    { v: 17, s: "+", label: "años de trayectoria del arquitecto fundador" },
    { v: 12, s: "", label: "proyectos de vivienda con nombre propio" },
    { v: 6, s: "", label: "fases, de la parcela a la entrega de llaves" },
    { v: 24, s: "h", p: "<", label: "para responder a cada solicitud" },
  ];
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} className="border-l border-ink/15 pl-5 md:pl-8">
            <div className="display text-[18vw] md:text-[7vw]">
              <Counter to={s.v} suffix={s.s} prefix={s.p} />
            </div>
            <p className="mt-3 max-w-[22ch] text-sm text-stone">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Proceso (resumen) ---------- */
export function ProcessTeaser() {
  const [active, setActive] = useState(0);
  const steps = [phases[0], phases[1], phases[4], phases[5]];
  const imgs = ["/img/promo-aerea.webp", "/img/materiales-planos.webp", "/img/boceto-materiales.webp", "/img/casa-galayos.webp"];
  return (
    <section className="bg-bone py-28 md:py-40">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label mb-6 text-stone">(03) — Proyecto y dirección de obra</p>
          <h2 className="display text-[12vw] md:text-[5.2vw]">
            Un solo equipo, <em>de principio a fin</em>
          </h2>
          <div className="relative mt-12 aspect-[4/5] overflow-hidden md:mt-16">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
                animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
              >
                <Image src={imgs[active]} alt={steps[active].title} fill sizes="40vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          {steps.map((s, i) => (
            <button
              key={s.n}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group block w-full border-t border-ink/15 py-8 text-left last:border-b"
            >
              <div className="flex items-baseline gap-6">
                <span className={`label transition-colors ${active === i ? "text-bronze" : "text-stone"}`}>{s.n}</span>
                <h3 className={`font-serif text-3xl transition-all duration-500 md:text-5xl ${active === i ? "translate-x-2 italic" : ""}`}>
                  {s.title}
                </h3>
              </div>
              <motion.div
                initial={false}
                animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-lg pl-12 pt-4 text-stone">{s.text}</p>
                <p className="label pl-12 pt-4 text-ink/60">Plazo orientativo · {s.duration}</p>
              </motion.div>
            </button>
          ))}
          <Reveal className="mt-12">
            <Button href="/servicios" variant="outline">
              Ver las 6 fases
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Zonas con imagen que sigue al cursor ---------- */
export function ZonesHover() {
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="container-x py-28 md:py-40">
      <div className="mb-14 grid gap-8 md:grid-cols-12">
        <p className="label text-stone md:col-span-3">(04) — Dónde trabajamos</p>
        <h2 className="display text-[11vw] md:col-span-9 md:text-[5vw]">
          Nuestro estudio en Pozuelo, <em>tu proyecto en Madrid y alrededores</em>
        </h2>
      </div>
      <div
        ref={ref}
        className="relative"
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHover(null)}
      >
        {zones.map((z, i) => (
          <Link
            key={z.slug}
            href={`/zonas/${z.slug}`}
            onPointerEnter={() => setHover(i)}
            className="group relative flex items-center justify-between border-t border-ink/15 py-7 last:border-b md:py-9"
            data-cursor="Ver"
          >
            <span className="display text-[10vw] transition-all duration-700 group-hover:translate-x-4 group-hover:italic md:text-[5.5vw]">
              {z.name}
            </span>
            <span className="label hidden text-stone md:block">{z.kicker}</span>
            <span className="text-2xl transition-transform duration-500 group-hover:-rotate-45">↗</span>
          </Link>
        ))}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[300px] w-[240px] overflow-hidden md:block"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.6 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {hover !== null && (
              <motion.div
                key={hover}
                className="absolute inset-0"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
              >
                <Image src={zones[hover].image} alt="" fill sizes="240px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Reveal className="mt-10">
        <Link href="/zonas" className="label link-u">
          También en Ávila, Segovia, Toledo y Guadalajara →
        </Link>
      </Reveal>
    </section>
  );
}

/* ---------- Testimonios ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden bg-night py-28 text-paper md:py-40">
      <ParallaxImage src="/img/textura-marmol.webp" alt="" className="!absolute inset-0 opacity-[0.07]" />
      <div className="container-x relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="label text-paper/50">(05) — Clientes</p>
          <p className="label mt-3 text-bronze/80">Testimonios de ejemplo · pendientes de material real</p>
        </div>
        <div className="md:col-span-8">
          <span className="display block text-[120px] leading-none text-bronze md:text-[180px]">“</span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="display -mt-16 text-[8vw] leading-[1.05] md:-mt-24 md:text-[3.6vw]">{t.quote}</p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="h-px w-10 bg-paper/40" />
                <span className="text-sm">{t.name}</span>
                <span className="label text-paper/50">{t.project}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-12 flex gap-3">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Testimonio ${k + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-paper" : "w-2.5 bg-paper/30 hover:bg-paper/60"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Blog ---------- */
export function BlogTeaser() {
  const list = posts.filter((p) => p.category === "Particulares").slice(0, 4);
  return (
    <section className="container-x py-28 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label mb-4 text-stone">(06) — Antes de construir tu vivienda</p>
          <h2 className="display text-[11vw] md:text-[5vw]">Guías y costes</h2>
        </div>
        <Link href="/blog" className="label link-u">
          Todos los artículos →
        </Link>
      </div>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link href={`/blog/${p.slug}`} className="group block" data-cursor="Leer">
              <CurtainImage src={p.image} alt={p.title} className="aspect-[4/5]" sizes="25vw" delay={i * 0.08} />
              <p className="label mt-5 text-stone">
                {p.date} · {p.read}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight transition-colors group-hover:text-bronze">{p.title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA final con parallax ---------- */
export function BigCta() {
  return (
    <section className="relative h-[90vh] min-h-[560px] overflow-hidden text-paper">
      <ParallaxImage src="/img/vivienda-noche.webp" alt="Vivienda unifamiliar iluminada al anochecer" className="!absolute inset-0" amount={15} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      <div className="container-x relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <SplitWords text="¿Ya tienes parcela?" className="display block text-[13vw] md:text-[7vw]" />
        <SplitWords text="¿O todavía la buscas?" className="display block text-[13vw] italic text-bone md:text-[7vw]" delay={0.15} />
        <Reveal className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10" delay={0.3}>
          <Link href="/presupuesto?parcela=si" className="group flex items-center justify-between border-t border-paper/40 pt-5">
            <span className="text-lg">Tengo parcela: quiero un presupuesto</span>
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
          <Link href="/presupuesto?parcela=no" className="group flex items-center justify-between border-t border-paper/40 pt-5">
            <span className="text-lg">No tengo parcela: ayudadme a encontrarla</span>
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </Reveal>
        <DrawLine className="mt-10" />
      </div>
    </section>
  );
}
