export default function IconButton({
  children,
  variant = "ghost", // ghost | outline | soft
  size = "md",       // sm | md | lg
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  ...props
}) {
  if (!ariaLabel) {
    console.warn("IconButton باید دارای خصوصیت 'aria-label' جهت دسترس‌پذیری باشد.");
  }

  const baseStyles =
    "inline-flex items-center justify-center rounded-[6px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--av-primary)]";

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-11 w-11 text-base",
  };

  const variants = {
    ghost:
      "bg-transparent text-[var(--av-text-muted)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-soft)]",
    outline:
      "border border-[var(--av-border)] bg-[var(--av-surface)] text-[var(--av-text-muted)] hover:text-[var(--av-text)] hover:bg-[var(--av-surface-soft)]",
    soft:
      "bg-[var(--av-surface-soft)] text-[var(--av-text)] hover:bg-[var(--av-border)]",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}