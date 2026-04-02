"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Apple-style section entrance:
 * Each section starts slightly below + faded + barely scaled down,
 * then rises into full view as it enters the viewport.
 * `amount: 0.07` triggers very early so it never feels late.
 */
export default function SectionReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.07 }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
