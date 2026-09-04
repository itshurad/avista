"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  once = true,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
