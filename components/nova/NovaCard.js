"use client";

export default function NovaCard({
  children,
  interactive = false,
  className = "",
  glowOnHover = false,
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={`relative rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 ease-out ${
        interactive
          ? "hover:-translate-y-1 hover:border-[var(--border-focus)] hover:shadow-[var(--shadow-md)] cursor-pointer"
          : "shadow-[var(--shadow-xs)]"
      } ${
        glowOnHover
          ? "hover:shadow-[0_16px_36px_-8px_var(--accent-glow-subtle)]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
