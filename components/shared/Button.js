"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary", // primary | secondary | ghost
  size = "md", // sm | md | lg
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-full",
    md: "h-10 px-5 text-xs sm:text-sm gap-2 rounded-full",
    lg: "h-12 px-7 text-sm sm:text-base gap-2.5 rounded-full",
  };

  const variants = {
    primary:
      "bg-[var(--av-brand)] text-white hover:bg-[var(--av-brand-hover)] shadow-sm font-medium",
    secondary:
      "bg-[var(--av-surface-subtle)] text-[var(--av-text)] border border-[var(--av-surface-border)] hover:border-[var(--av-brand)]/40 font-medium",
    ghost:
      "bg-transparent text-[var(--av-text-secondary)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-subtle)] font-medium",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-brand)] ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
