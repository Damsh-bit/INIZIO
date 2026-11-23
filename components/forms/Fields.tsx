"use client";
import { motion } from "framer-motion";

export function Field({ label, name, type = "text", required, placeholder, textarea, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; textarea?: boolean; defaultValue?: string }) {
  return (
    <label className="group relative block">
      <span className="label text-stone transition-colors group-focus-within:text-ink">
        {label}
        {required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={3} className="field resize-none" defaultValue={defaultValue} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className="field" defaultValue={defaultValue} />
      )}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-500 group-focus-within:scale-x-100" />
    </label>
  );
}

export function Chips({ options, value, onChange, multi = false, dark = false }: { options: string[]; value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean; dark?: boolean }) {
  const isOn = (o: string) => (multi ? (value as string[]).includes(o) : value === o);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <motion.button
          type="button"
          key={o}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            if (multi) {
              const v = value as string[];
              onChange(v.includes(o) ? v.filter((x) => x !== o) : [...v, o]);
            } else onChange(o);
          }}
          className={`rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ${
            isOn(o)
              ? dark
                ? "border-paper bg-paper text-ink"
                : "border-ink bg-ink text-paper"
              : dark
                ? "border-paper/25 hover:border-paper"
                : "border-ink/20 hover:border-ink"
          }`}
          aria-pressed={isOn(o)}
        >
          {multi && isOn(o) ? "✓ " : ""}
          {o}
        </motion.button>
      ))}
    </div>
  );
}

export function Stepper({ label, value, onChange, min = 0, max = 10 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div>
      <span className="label text-stone">{label}</span>
      <div className="mt-3 flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="h-11 w-11 rounded-full border border-ink/20 text-lg transition-colors hover:bg-ink hover:text-paper" aria-label={`Menos ${label}`}>
          −
        </button>
        <motion.span key={value} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-8 text-center font-serif text-3xl">
          {value}
        </motion.span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="h-11 w-11 rounded-full border border-ink/20 text-lg transition-colors hover:bg-ink hover:text-paper" aria-label={`Más ${label}`}>
          +
        </button>
      </div>
    </div>
  );
}

export function Consent({ dark = false, call = false }: { dark?: boolean; call?: boolean }) {
  return (
    <div className="space-y-3 text-sm">
      <label className="flex items-start gap-3">
        <input type="checkbox" name="privacy" required className={`mt-1 h-4 w-4 ${dark ? "accent-paper" : "accent-ink"}`} />
        <span className={dark ? "text-paper/70" : "text-stone"}>
          He leído y acepto la <a href="/legal/privacidad" className="underline">política de privacidad</a>.
        </span>
      </label>
      {call && (
        <label className="flex items-start gap-3">
          <input type="checkbox" name="call" className={`mt-1 h-4 w-4 ${dark ? "accent-paper" : "accent-ink"}`} />
          <span className={dark ? "text-paper/70" : "text-stone"}>Acepto que me contacten por teléfono.</span>
        </label>
      )}
    </div>
  );
}

export function Success({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="py-10">
      <svg viewBox="0 0 80 80" className="h-20 w-20">
        <motion.circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d="M25 41 l10 10 l20 -22" fill="none" stroke="#a8814f" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.8 }} />
      </svg>
      <h3 className="display mt-8 text-5xl md:text-6xl">{title}</h3>
      <p className={`mt-4 max-w-md ${dark ? "text-paper/70" : "text-stone"}`}>{text}</p>
    </motion.div>
  );
}
