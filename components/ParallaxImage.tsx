"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  amount = 12,
  priority = false,
  sizes = "100vw",
  scale = 1.18,
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  priority?: boolean;
  sizes?: string;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" quality={85} />
      </motion.div>
    </div>
  );
}

/** Imagen que se descubre con una cortina al entrar en pantalla. */
export function CurtainImage({
  src,
  alt,
  className = "",
  sizes = "50vw",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, delay, ease: [0.7, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" quality={85} />
      </motion.div>
    </motion.div>
  );
}
