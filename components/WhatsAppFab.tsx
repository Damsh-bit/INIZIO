"use client";
import { motion } from "framer-motion";
import { site } from "@/lib/data";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-8 md:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 20 }}
      data-cursor="hide"
    >
      <span className="label pointer-events-none hidden translate-x-3 rounded-full bg-ink px-4 py-2.5 text-paper opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        ¿Hablamos por WhatsApp?
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-black/20 transition-transform duration-500 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1f7a4d] opacity-25 [animation-duration:2.6s]" />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden>
          <path d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.3.66 4.45 1.8 6.28L4 29l7.97-1.76a12.1 12.1 0 0 0 4.07.7C22.68 27.94 28 22.58 28 15.97 28 9.36 22.68 3 16.04 3Zm0 22.7c-1.3 0-2.58-.24-3.76-.7l-.54-.2-4.73 1.04 1.06-4.53-.35-.56a9.7 9.7 0 0 1-1.52-5.2c0-5.38 4.4-9.76 9.84-9.76 5.43 0 9.72 4.38 9.72 9.76 0 5.39-4.29 10.15-9.72 10.15Zm5.35-7.3c-.29-.15-1.73-.85-2-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44a8.8 8.8 0 0 1-1.62-2.01c-.17-.3 0-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.3.29-.49.1-.2.05-.37-.02-.51-.08-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.05 2.82 1.2 3.01.14.2 2.06 3.13 5 4.39.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34Z" />
        </svg>
      </span>
    </motion.a>
  );
}
