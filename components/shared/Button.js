export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--av-primary)] active:scale-[0.98]";

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-xs sm:text-sm gap-2",
    lg: "h-12 px-6 text-sm sm:text-base gap-2.5",
  };

  const variants = {
    primary: "bg-[var(--av-primary)] text-white hover:opacity-90 shadow-2xs",
    secondary:
      "bg-[var(--av-surface-soft)] text-[var(--av-text)] hover:bg-[var(--av-border)] border border-[var(--av-border)]",
    outline:
      "border border-[var(--av-border)] bg-transparent text-[var(--av-text)] hover:bg-[var(--av-surface-soft)]",
    ghost:
      "bg-transparent text-[var(--av-text-muted)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-soft)]",
    accent: "bg-[var(--av-accent)] text-white hover:opacity-90 shadow-2xs",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
