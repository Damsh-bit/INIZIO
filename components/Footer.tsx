import Link from "next/link";
import { nav, navSecondary, site, zones } from "@/lib/data";
import Logo from "./Logo";
import Button from "./Button";
import { FooterReveal } from "./FooterReveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x pt-24 md:pt-32">
        <FooterReveal>
          <p className="label mb-6 text-paper/50">¿Empezamos?</p>
          <h2 className="display max-w-5xl text-[13vw] md:text-[8vw]">
            Hablemos de la casa <em className="text-bronze">que quieres</em> construir
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/presupuesto" variant="light">
              Solicitar propuesta
            </Button>
            <Button href={site.whatsapp} variant="ghost-light" external>
              WhatsApp
            </Button>
          </div>
        </FooterReveal>

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-paper/15 pt-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo variant="white" className="h-auto w-40" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/60">
              Estudio de arquitectura en Pozuelo de Alarcón especializado en vivienda unifamiliar a medida, desde la idea
              hasta la dirección de obra.
            </p>
            <p className="label mt-6 text-paper/40">{site.coam}</p>
          </div>
          <div className="md:col-span-2">
            <p className="label mb-5 text-paper/40">Estudio</p>
            <ul className="space-y-2.5 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-u text-paper/80 hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="label mb-5 text-paper/40">Zonas</p>
            <ul className="space-y-2.5 text-sm">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={`/zonas/${z.slug}`} className="link-u text-paper/80 hover:text-paper">
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label mb-5 mt-8 text-paper/40">Más</p>
            <ul className="space-y-2.5 text-sm">
              {navSecondary.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-u text-paper/80 hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-4">
            <p className="label mb-5 text-paper/40">Contacto</p>
            <address className="space-y-1 text-sm not-italic text-paper/80">
              <p>{site.address}</p>
              <p>{site.city}</p>
            </address>
            <a href={`mailto:${site.email}`} className="mt-5 block font-serif text-3xl hover:text-bronze md:text-4xl">
              {site.email}
            </a>
            <a href={site.phoneHref} className="mt-1 block font-serif text-3xl hover:text-bronze md:text-4xl">
              {site.phone}
            </a>
            <p className="label mt-4 text-paper/40">{site.hours} · Respuesta en menos de 24 h</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 py-8 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/aviso-legal" className="hover:text-paper">Aviso legal</Link>
            <Link href="/legal/privacidad" className="hover:text-paper">Política de privacidad</Link>
            <Link href="/legal/cookies" className="hover:text-paper">Política de cookies</Link>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">LinkedIn</a>
          </div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none px-2 pb-2 text-center font-serif text-[27vw] leading-[0.75] text-paper/[0.04]">
        INIZIO
      </div>
    </footer>
  );
}
