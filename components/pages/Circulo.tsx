"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal, SplitWords } from "@/components/Reveal";
import { Consent, Field } from "@/components/forms/Fields";
import { useSubmit } from "@/components/forms/useSubmit";

const faqs = [
  { q: "¿Qué es el Círculo INIZIO?", a: "Nuestro programa de recomendación para premiar la confianza. Si recomiendas INIZIO a alguien que acaba contratando nuestros servicios de arquitectura, recibes una recompensa económica." },
  { q: "¿Quién puede participar?", a: "Cualquier persona física mayor de edad con residencia fiscal en España que recomiende INIZIO a familiares, amigos o conocidos, de forma personal y basada en una relación real." },
  { q: "¿Cuánto puedo ganar?", a: "El 5% del contrato firmado por tu recomendado, hasta 1.000 € por recomendación. Máximo 3 recomendaciones bonificadas: hasta 3.000 € en total." },
  { q: "¿Qué servicios entran en el programa?", a: "Proyectos de vivienda unifamiliar y obra nueva, reformas integrales, rehabilitaciones y ampliaciones." },
  { q: "¿Cuándo es válida una recomendación?", a: "Cuando el recomendado indica tu código al contactar y formaliza la contratación mediante contrato o aceptación expresa del presupuesto." },
  { q: "¿Cómo obtengo mi código?", a: "Completa el formulario de esta página y lo recibirás automáticamente por email." },
];

export default function Circulo() {
  const [open, setOpen] = useState<number | null>(0);
  const [code, setCode] = useState<string | null>(null);
  const { submit } = useSubmit("circulo");
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
        <div className="container-x grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label mb-8 text-stone">Círculo INIZIO · Programa de recomendación</p>
            <h1 className="display text-[14vw] md:text-[7.5vw]">
              <SplitWords text="Recomienda" animateOnMount delay={0.5} />
              <br />
              <em>
                <SplitWords text="y gana" animateOnMount delay={0.65} />
              </em>
            </h1>
          </div>
          <div className="md:col-span-5">
            <motion.div
              className="relative aspect-square max-w-md rounded-full bg-ink text-paper"
              initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                <defs>
                  <path id="circ" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <text className="fill-paper/60 font-mono text-[8.5px] uppercase tracking-[0.3em]">
                  <textPath href="#circ">Hasta 1.000 € para ti · 5% de descuento para tus amigos · </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="label text-paper/50">Hasta</span>
                <span className="display text-[22vw] md:text-[9vw]">1.000€</span>
                <span className="label text-bronze">+ 5% para ellos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 md:py-32">
        <div className="container-x">
          <p className="label mb-14 text-stone">¿Cómo funciona?</p>
          <div className="grid gap-10 md:grid-cols-4">
            {[
              ["Regístrate", "Completa el formulario y recibe tu código promocional."],
              ["Comparte", "Envía tu código a quien esté valorando una obra nueva o una reforma."],
              ["Ellos contactan", "Tu recomendado indica el código en su primer contacto con nosotros."],
              ["Ambos ganáis", "Si contrata, tú recibes hasta 1.000 € y él un 5% de descuento."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.12} className="group">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink font-serif text-2xl transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
                    {i + 1}
                  </span>
                  {i < 3 && <span className="hidden h-px flex-1 bg-ink/20 md:block" />}
                </div>
                <h3 className="mt-6 font-serif text-3xl">{t}</h3>
                <p className="mt-2 text-sm text-stone">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <h2 className="display text-[11vw] md:text-[4.4vw]">Solicita tu código</h2>
          <AnimatePresence mode="wait">
            {code ? (
              <motion.div key="code" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-3xl bg-ink p-8 text-paper">
                <p className="label text-paper/50">Tu código promocional</p>
                <p className="display mt-3 text-6xl tracking-wider text-bronze">{code}</p>
                <p className="mt-4 text-sm text-paper/60">Te lo hemos enviado también por email. ¡Compártelo!</p>
                <button onClick={() => navigator.clipboard?.writeText(code)} className="label mt-6 rounded-full border border-paper/30 px-4 py-2 hover:bg-paper hover:text-ink">
                  Copiar código
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="mt-10 space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
                  const c = "INZ-" + String(fd.name ?? "X").slice(0, 3).toUpperCase().normalize("NFD").replace(/[^A-Z]/g, "") + Math.floor(100 + Math.random() * 900);
                  submit({ ...fd, code: c });
                  setCode(c);
                }}
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Nombre" name="name" required />
                  <Field label="Apellidos" name="surname" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <Consent />
                <button className="rounded-full bg-ink px-8 py-4 text-sm text-paper transition-colors hover:bg-bronze">Obtener mi código →</button>
              </motion.form>
            )}
          </AnimatePresence>
          <p className="label mt-8 text-stone">(*) 5% del contrato firmado por el recomendado, hasta un máximo de 1.000 €.</p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="label mb-6 text-stone">Preguntas frecuentes</p>
          {faqs.map((f, i) => (
            <div key={f.q} className="border-t border-ink/15 last:border-b">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open === i}>
                <span className="font-serif text-2xl">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-stone">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
