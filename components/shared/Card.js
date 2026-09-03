export default function Card({
  children,
  as: Component = "div",
  className = "",
  interactive = false,
  ...props
}) {
  return (
    <Component
      className={`rounded-[8px] border border-[var(--av-border)] bg-[var(--av-surface)] p-5 transition-all duration-200 ${
        interactive
          ? "cursor-pointer hover:border-[var(--av-text-muted)]/40 hover:shadow-2xs active:scale-[0.99]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}