"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, navSecondary, site } from "@/lib/data";
import Logo from "./Logo";

// Páginas cuyo hero es oscuro: el header arranca en blanco.
const darkHero = (p: string) =>
  p === "/" || p === "/promotoras" || p === "/servicios" || /^\/(proyectos|zonas)\/.+/.test(p);

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(nav[0].image);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 60);
    setHidden(v > 400 && v > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = darkHero(pathname) && !scrolled && !open;
  const textCls = light ? "text-paper" : "text-ink";

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${
          scrolled && !open ? "bg-paper/80 backdrop-blur-md" : "bg-transparent"
        }`}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
      >
        <div className={`container-x flex h-[72px] items-center justify-between md:h-[88px] ${textCls}`}>
          <Link href="/" aria-label="INIZIO, inicio" className="relative z-10 block w-[112px] md:w-[136px]">
            <Logo variant={light ? "white" : "dark"} className="h-auto w-full" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {nav.slice(0, 5).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-u text-[13px] tracking-wide ${pathname.startsWith(l.href) ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <a href={site.phoneHref} className="label hidden opacity-80 hover:opacity-100 xl:block">
              {site.phone}
            </a>
            <Link
              href="/presupuesto"
              className={`hidden rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-500 md:block ${
                light ? "bg-paper text-ink hover:bg-bronze hover:text-paper" : "bg-ink text-paper hover:bg-bronze"
              }`}
            >
              Pedir presupuesto
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="group relative flex h-11 items-center gap-3 pl-2"
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="label hidden sm:block">{open ? "Cerrar" : "Menú"}</span>
              <span className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0 group-hover:w-2/3"}`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-paper text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="container-x grid h-full grid-cols-1 gap-10 pb-10 pt-28 md:pt-32 lg:grid-cols-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <ul className="space-y-1">
                  {nav.map((l, i) => (
                    <li key={l.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={l.href}
                          onMouseEnter={() => setPreview(l.image)}
                          className="group flex items-baseline gap-4 py-1"
                        >
                          <span className="label w-8 text-stone">0{i + 1}</span>
                          <span className="display text-[13vw] transition-all duration-500 group-hover:translate-x-3 group-hover:italic sm:text-7xl lg:text-[6.2vw]">
                            {l.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <motion.div
                  className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {navSecondary.map((l) => (
                    <Link key={l.href} href={l.href} className="link-u text-sm">
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              </div>
              <motion.div
                className="relative hidden overflow-hidden lg:col-span-5 lg:block"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={preview}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0%)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
                  >
                    <Image src={preview} alt="" fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-6 text-paper">
                  <p className="label opacity-80">{site.address}</p>
                  <p className="label opacity-80">{site.city}</p>
                  <a href={`mailto:${site.email}`} className="mt-3 block font-serif text-3xl">
                    {site.email}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
