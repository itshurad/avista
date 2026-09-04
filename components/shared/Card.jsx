export default function Card({
  children,
  as: Component = "div",
  className = "",
  interactive = false,
  ...props
}) {
  return (
    <Component
      className={`rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 shadow-[var(--av-card-shadow)] transition-all duration-200 ${
        interactive
          ? "cursor-pointer hover:border-[var(--av-brand)]/40 hover:-translate-y-0.5 active:scale-[0.99]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
