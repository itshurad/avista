export default function Badge({
  children,
  variant = "default", // default | accent | success | warning | danger
  size = "sm",         // sm | md
  className = "",
}) {
  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variants = {
    default:
      "bg-[var(--av-surface-soft)] text-[var(--av-text-muted)] border border-[var(--av-border)]",
    accent:
      "bg-[var(--av-accent-soft)] text-[var(--av-accent)] border border-[var(--av-accent)]/20",
    success:
      "bg-[var(--av-success)]/10 text-[var(--av-success)] border border-[var(--av-success)]/25",
    warning:
      "bg-[var(--av-warning)]/10 text-[var(--av-warning)] border border-[var(--av-warning)]/30",
    danger:
      "bg-[var(--av-danger)]/10 text-[var(--av-danger)] border border-[var(--av-danger)]/25",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-[4px] select-none ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}