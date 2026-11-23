"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal, SplitWords } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { Chips, Consent, Field, Success } from "@/components/forms/Fields";
import { useSubmit } from "@/components/forms/useSubmit";
import { site } from "@/lib/data";

export default function Contacto() {
  const [motivo, setMotivo] = useState("Construir una casa");
  const [copied, setCopied] = useState(false);
  const { state, submit } = useSubmit("contacto");
  const quick = [
    { k: "Llamar", v: site.phone, href: site.phoneHref },
    { k: "WhatsApp", v: "Respuesta inmediata", href: site.whatsapp },
  ];
  return (
    <>
      <section className="container-x pb-16 pt-36 md:pt-44">
        <p className="label mb-8 text-stone">Contacto</p>
        <h1 className="display text-[15vw] md:text-[9vw]">
          <SplitWords text="Cuéntanos" animateOnMount delay={0.5} />{" "}
          <em>
            <SplitWords text="tu idea" animateOnMount delay={0.65} />
          </em>
        </h1>
        <motion.p className="mt-6 max-w-lg text-lg text-stone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          Te respondemos en menos de 24 horas laborables. Sin compromiso.
        </motion.p>
      </section>

      <section className="container-x grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {state === "ok" ? (
            <Success title="Mensaje enviado" text="Gracias. Uno de los arquitectos del estudio te escribirá en menos de 24 horas laborables." />
          ) : (
            <form
              className="space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
                submit({ ...Object.fromEntries(new FormData(e.currentTarget).entries()), motivo });
              }}
            >
              <div>
                <p className="label mb-4 text-stone">¿En qué podemos ayudarte?</p>
                <Chips options={["Construir una casa", "Reforma integral", "Interiorismo", "Busco parcela", "Soy promotora"]} value={motivo} onChange={(v) => setMotivo(v as string)} />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Nombre" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Teléfono" name="phone" type="tel" />
                <Field label="¿Vienes recomendado? (código)" name="code" />
              </div>
              <Field label="Mensaje" name="message" textarea placeholder="Dónde quieres construir, qué tienes en mente, en qué punto estás…" />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <Consent />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={state === "sending"}
                  className="shrink-0 rounded-full bg-ink px-8 py-4 text-sm text-paper transition-colors hover:bg-bronze disabled:opacity-50"
                >
                  {state === "sending" ? "Enviando…" : "Enviar mensaje →"}
                </motion.button>
              </div>
              {state === "error" && <p className="text-sm text-red-700">No se pudo enviar. Escríbenos a {site.email}.</p>}
            </form>
          )}
        </div>

        <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
          {quick.map((q, i) => (
            <Reveal key={q.k} delay={i * 0.1}>
              <Magnetic strength={0.12} className="block w-full">
                <a href={q.href} target={q.k === "WhatsApp" ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-ink/15 p-6 transition-colors duration-500 hover:bg-ink hover:text-paper">
                  <div>
                    <p className="label opacity-60">{q.k}</p>
                    <p className="mt-1 font-serif text-2xl">{q.v}</p>
                  </div>
                  <span className="text-2xl transition-transform group-hover:-rotate-45">→</span>
                </a>
              </Magnetic>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(site.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="group flex w-full items-center justify-between rounded-2xl border border-ink/15 p-6 text-left transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              <div>
                <p className="label opacity-60">{copied ? "¡Copiado!" : "Email · clic para copiar"}</p>
                <p className="mt-1 font-serif text-2xl">{site.email}</p>
              </div>
              <span className="text-xl">{copied ? "✓" : "⧉"}</span>
            </button>
          </Reveal>
          <Reveal delay={0.3} className="rounded-2xl bg-bone p-6">
            <p className="label text-stone">Estudio</p>
            <p className="mt-2 font-serif text-2xl leading-snug">
              {site.address}
              <br />
              {site.city}
            </p>
            <p className="label mt-4 text-stone">{site.hours}</p>
          </Reveal>
        </aside>
      </section>

      <section className="relative h-[60vh] overflow-hidden bg-bone">
        <iframe
          title="Mapa del estudio INIZIO en Pozuelo de Alarcón"
          src="https://maps.google.com/maps?q=Avenida%20de%20Europa%2026%2C%20Pozuelo%20de%20Alarc%C3%B3n&z=15&output=embed"
          className="absolute inset-0 h-full w-full grayscale-[0.9] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-paper px-5 py-4 shadow-xl md:left-10 md:top-10">
          <p className="label text-stone">¿Dónde estamos?</p>
          <p className="font-serif text-xl">Avenida de Europa 26 · 2ª planta</p>
        </div>
      </section>
    </>
  );
}
