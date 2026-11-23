"use client";
import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-bronze" style={{ scaleX: scrollYProgress }} />;
}
