export default function Badge({
  children,
  variant = "brand", // brand | neutral | success | warning | danger
  size = "sm",
  className = "",
}) {
  const sizes = {
    sm: "px-2.5 py-0.5 text-[11px] rounded-full",
    md: "px-3 py-1 text-xs rounded-full",
  };

  const variants = {
    brand:
      "bg-[var(--av-brand-soft)] text-[var(--av-brand)] border border-[var(--av-brand)]/20 font-semibold",
    neutral:
      "bg-[var(--av-surface-subtle)] text-[var(--av-text-secondary)] border border-[var(--av-surface-border)] font-medium",
    success:
      "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium",
    warning:
      "bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium",
    danger:
      "bg-rose-500/10 text-rose-500 border border-rose-500/20 font-medium",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none select-none ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}