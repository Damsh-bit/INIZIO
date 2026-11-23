"use client";
import { motion } from "framer-motion";

/** Cortina de transición entre páginas (se monta con cada navegación vía app/template.tsx). */
export default function PageCurtain({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1], delay: 0.05 }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-bronze"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
