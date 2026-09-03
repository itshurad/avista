"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NovaButton({
  children,
  variant = "primary", // "primary" | "secondary" | "ghost" | "danger"
  size = "md", // "sm" | "md" | "lg"
  href,
  onClick,
  disabled = false,
  showArrow = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseClasses =
    "group relative inline-flex items-center justify-center font-bold select-none cursor-pointer transition-all duration-250 ease-out disabled:opacity-45 disabled:pointer-events-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2";

  const sizeClasses = {
    sm: "h-9 px-3.5 text-xs gap-1.5 rounded-[var(--radius-sm)]",
    md: "h-11 px-5 text-sm gap-2 rounded-[var(--radius-md)]",
    lg: "h-13 px-7 text-base gap-2.5 rounded-[var(--radius-lg)]",
  };

  const variantClasses = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_8px_20px_-4px_var(--accent-glow)] hover:opacity-95 hover:shadow-[0_12px_28px_-2px_var(--accent-glow)] hover:scale-[1.015]",
    secondary:
      "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-secondary)] hover:border-[var(--border-focus)] shadow-[var(--shadow-xs)]",
    ghost:
      "bg-transparent text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]",
    danger:
      "bg-[var(--danger-surface)] text-[var(--danger)] border border-[var(--danger)]/20 hover:bg-[var(--danger)] hover:text-white",
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowLeft className="w-4 h-4 transition-transform duration-200 ease-out group-hover:-translate-x-1" />
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
