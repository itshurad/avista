"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const sizes = {
    sm: "h-9 px-3.5 text-xs gap-1.5 rounded-xl",
    md: "h-10 px-5 text-xs sm:text-sm gap-2 rounded-xl",
    lg: "h-12 px-6 sm:px-7 text-sm sm:text-base gap-2.5 rounded-2xl",
  };
  const variants = {
    primary: "bg-[var(--av-brand)] text-white shadow-[0_10px_30px_-12px_var(--av-brand-glow)] hover:bg-[var(--av-brand-hover)] font-bold",
    secondary: "bg-[var(--av-surface)] text-[var(--av-text)] border border-[var(--av-surface-border)] hover:border-[var(--av-brand)]/35 hover:bg-[var(--av-surface-subtle)] font-bold shadow-sm",
    ghost: "bg-transparent text-[var(--av-text-secondary)] hover:bg-[var(--av-surface-subtle)] hover:text-[var(--av-text)] font-bold",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled || reduceMotion ? {} : { y: -2, scale: 1.015 }}
      whileTap={disabled || reduceMotion ? {} : { scale: 0.975 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--av-bg)] ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
