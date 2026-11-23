"use client";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SplitWords } from "@/components/Reveal";
import { Chips, Consent, Field, Stepper, Success } from "@/components/forms/Fields";
import { useSubmit } from "@/components/forms/useSubmit";
import { projects, site } from "@/lib/data";

const RATES: Record<string, number> = { Básicas: 1300, Medias: 1600, Altas: 2000, Premium: 2600 };
const TERRAIN: Record<string, number> = { Plano: 1, "Ligera inclinación": 1.04, "Inclinación media": 1.08, "Elevada pendiente": 1.15 };
const EXTRAS: Record<string, number> = { Jardín: 15000, Piscina: 38000, Pérgola: 9000, "Muro medianero": 12000, Domótica: 14000, Aerotermia: 16000 };

function Money({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const [v, setV] = useState(value);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [value, mv]);
  useEffect(() => mv.on("change", (x) => setV(x)), [mv]);
  return <>{Math.round(v / 1000).toLocaleString("es-ES")}k €</>;
}

export default function Presupuesto() {
  const params = useSearchParams();
  const ref = params.get("ref");
  const refProject = projects.find((p) => p.slug === ref);
  const [step, setStep] = useState(0);
  const [parcela, setParcela] = useState(params.get("parcela") === "no" ? "No, la estoy buscando" : "Sí, tengo parcela");
  const [terreno, setTerreno] = useState("Plano");
  const [m2, setM2] = useState(250);
  const [rooms, setRooms] = useState(4);
  const [baths, setBaths] = useState(3);
  const [calidad, setCalidad] = useState("Altas");
  const [sotano, setSotano] = useState("No");
  const [extras, setExtras] = useState<string[]>(["Jardín"]);
  const { state, submit } = useSubmit("presupuesto");
  const collected = useRef<Record<string, unknown>>({});

  const estimate = useMemo(() => {
    let base = m2 * RATES[calidad] * (TERRAIN[terreno] ?? 1);
    if (sotano === "Sí") base += m2 * 0.4 * 1100;
    base += extras.reduce((a, e) => a + (EXTRAS[e] ?? 0), 0);
    return { min: base * 0.9, max: base * 1.1, perM2: base / m2 };
  }, [m2, calidad, terreno, sotano, extras]);

  const steps = ["Parcela", "Vivienda", "Contacto"];
  const hasPlot = parcela.startsWith("Sí");

  return (
    <section className="container-x pb-24 pt-32 md:pt-40">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Columna izquierda: título + estimación en vivo */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label mb-6 text-stone">Presupuesto · Calculadora orientativa</p>
            <h1 className="display text-[13vw] md:text-[6vw] lg:text-[4.6vw]">
              <SplitWords text="¿Cuánto costaría" animateOnMount delay={0.5} />{" "}
              <em>
                <SplitWords text="tu casa?" animateOnMount delay={0.7} />
              </em>
            </h1>
            <p className="mt-6 max-w-md text-stone">
              Ajusta los parámetros y verás una estimación del coste de construcción. Después te enviamos una propuesta
              profesional con proyecto, dirección de obra y una valoración detallada.
            </p>
            {refProject && (
              <p className="label mt-6 inline-block rounded-full bg-bone px-4 py-2">Referencia: {refProject.name}</p>
            )}

            <motion.div layout className="relative mt-10 overflow-hidden rounded-3xl bg-ink p-8 text-paper md:p-10">
              <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative">
                <p className="label text-paper/50">Coste de construcción estimado</p>
                <p className="display mt-4 text-6xl md:text-7xl">
                  <Money value={estimate.min} /> <span className="text-paper/40">–</span> <Money value={estimate.max} />
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-paper/15 pt-6">
                  <div>
                    <p className="label text-paper/50">Superficie</p>
                    <p className="mt-1 font-serif text-2xl">{m2} m²</p>
                  </div>
                  <div>
                    <p className="label text-paper/50">€ / m²</p>
                    <p className="mt-1 font-serif text-2xl">{Math.round(estimate.perM2).toLocaleString("es-ES")}</p>
                  </div>
                  <div>
                    <p className="label text-paper/50">Calidades</p>
                    <p className="mt-1 font-serif text-2xl">{calidad}</p>
                  </div>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-paper/50">
                  Cifra orientativa sin IVA, sin honorarios ni licencias. El coste real depende de la parcela, el diseño y
                  el mercado. Valores de referencia de la maqueta, a validar por el estudio.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Columna derecha: formulario por pasos */}
        <div className="lg:col-span-6 lg:col-start-7">
          {state === "ok" ? (
            <Success title="Solicitud recibida" text="Revisamos personalmente cada solicitud. Te contactaremos en menos de 24 horas laborables con tu propuesta." />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
                Object.assign(collected.current, fd);
                if (step < 2) return setStep(step + 1);
                submit({ ...collected.current, parcela, terreno, m2, rooms, baths, calidad, sotano, extras, estimate, ref });
              }}
            >
              <div className="mb-12 flex items-center gap-3">
                {steps.map((s, i) => (
                  <button type="button" key={s} onClick={() => i < step && setStep(i)} className="flex flex-1 flex-col gap-3 text-left">
                    <span className="relative h-px w-full bg-ink/15">
                      <motion.span className="absolute inset-0 origin-left bg-ink" animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.6 }} />
                    </span>
                    <span className={`label ${i === step ? "text-ink" : "text-stone"}`}>
                      0{i + 1} {s}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-10"
                >
                  {step === 0 && (
                    <>
                      <div>
                        <p className="mb-4 font-serif text-3xl">¿Tienes parcela?</p>
                        <Chips options={["Sí, tengo parcela", "La estoy comprando", "No, la estoy buscando"]} value={parcela} onChange={(v) => setParcela(v as string)} />
                      </div>
                      <AnimatePresence mode="wait">
                        {hasPlot ? (
                          <motion.div key="plot" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-8 overflow-hidden">
                            <div className="grid gap-8 sm:grid-cols-2">
                              <Field label="¿Dónde quieres construir?" name="location" placeholder="Municipio" />
                              <Field label="Código postal" name="cp" placeholder="28224" />
                            </div>
                            <Field label="m² de parcela" name="plot" type="number" placeholder="Ej. 1200" />
                            <div>
                              <p className="label mb-3 text-stone">¿Cómo es el terreno?</p>
                              <Chips options={Object.keys(TERRAIN)} value={terreno} onChange={(v) => setTerreno(v as string)} />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div key="noplot" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <div className="rounded-2xl bg-bone p-6 md:p-8">
                              <p className="font-serif text-2xl">Te ayudamos a encontrarla</p>
                              <p className="mt-3 text-sm leading-relaxed text-stone">
                                Buscamos y analizamos parcelas según tu presupuesto y tu forma de vivir: normativa, orientación,
                                topografía y servicios. Antes de comprar sabrás qué casa puedes construir en cada una.
                              </p>
                              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                                <Field label="Zonas que te interesan" name="zones" placeholder="Pozuelo, Las Rozas…" />
                                <Field label="Presupuesto para la parcela" name="plotBudget" placeholder="Ej. 400.000 €" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <p className="font-serif text-3xl">Superficie de la vivienda</p>
                          <motion.span key={m2} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="display text-5xl">
                            {m2} m²
                          </motion.span>
                        </div>
                        <input type="range" min={90} max={800} step={10} value={m2} onChange={(e) => setM2(+e.target.value)} className="mt-6 w-full accent-ink" aria-label="Metros cuadrados" />
                        <div className="label mt-2 flex justify-between text-stone">
                          <span>90 m²</span>
                          <span>800 m²</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <Stepper label="Habitaciones" value={rooms} onChange={setRooms} min={1} max={10} />
                        <Stepper label="Baños" value={baths} onChange={setBaths} min={1} max={8} />
                      </div>
                      <div>
                        <p className="label mb-3 text-stone">Calidades</p>
                        <Chips options={Object.keys(RATES)} value={calidad} onChange={(v) => setCalidad(v as string)} />
                      </div>
                      <div>
                        <p className="label mb-3 text-stone">¿Sótano o garaje bajo rasante?</p>
                        <Chips options={["Sí", "No"]} value={sotano} onChange={(v) => setSotano(v as string)} />
                      </div>
                      <div>
                        <p className="label mb-3 text-stone">Otras características</p>
                        <Chips options={Object.keys(EXTRAS)} value={extras} onChange={(v) => setExtras(v as string[])} multi />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <Field label="Nombre" name="name" required />
                        <Field label="Apellido" name="surname" />
                        <Field label="Email" name="email" type="email" required />
                        <Field label="Teléfono" name="phone" type="tel" />
                      </div>
                      <Field label="Cuéntanos tu idea" name="message" textarea placeholder="Cómo vivís, qué os inspira, plazos…" />
                      <Field label="Código Círculo INIZIO (opcional)" name="code" placeholder="Si vienes recomendado" />
                      <Consent call />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-14 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="label link-u">
                    ← Atrás
                  </button>
                ) : (
                  <a href={site.phoneHref} className="label link-u text-stone">
                    Prefiero llamar · {site.phone}
                  </a>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={state === "sending"}
                  className="rounded-full bg-ink px-8 py-4 text-sm text-paper transition-colors hover:bg-bronze disabled:opacity-50"
                >
                  {step < 2 ? "Continuar →" : state === "sending" ? "Enviando…" : "Solicitar presupuesto gratis"}
                </motion.button>
              </div>
              {state === "error" && <p className="mt-4 text-sm text-red-700">No se pudo enviar. Escríbenos a {site.email}.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
