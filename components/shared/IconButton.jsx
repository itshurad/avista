"use client";

import { motion } from "framer-motion";

export default function IconButton({
  children,
  variant = "ghost", // ghost | outline | soft
  size = "md", // sm | md | lg
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  ...props
}) {
  if (!ariaLabel) {
    console.warn(
      "IconButton باید دارای خصوصیت 'aria-label' جهت دسترس‌پذیری باشد.",
    );
  }

  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-brand)] select-none";

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base",
  };

  const variants = {
    ghost:
      "bg-transparent text-[var(--av-text-secondary)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-subtle)]",
    outline:
      "border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-[var(--av-text-secondary)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-subtle)] hover:border-[var(--av-brand)]/40",
    soft: "bg-[var(--av-brand-soft)] text-[var(--av-brand)] hover:bg-[var(--av-brand)] hover:text-white",
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
