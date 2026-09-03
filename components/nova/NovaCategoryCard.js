import Link from "next/link";

export default function NovaCategoryCard({
  icon: Icon,
  title,
  subtitle,
  href,
  active = false,
  badgeText,
}) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between p-6 rounded-[var(--radius-xl)] border transition-all duration-300 ease-out cursor-pointer ${
        active
          ? "bg-[var(--surface)] border-[var(--accent)] shadow-[0_12px_28px_-6px_var(--accent-glow)]"
          : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]/40 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-secondary)] text-[var(--accent)] transition-all duration-300 ease-out group-hover:scale-108 group-hover:rotate-4 group-hover:bg-[var(--accent)] group-hover:text-white shadow-[var(--shadow-xs)]">
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        {badgeText && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
            {badgeText}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs font-medium text-[var(--foreground-muted)] line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="mt-4 h-0.5 w-0 bg-[var(--accent)] transition-all duration-300 ease-out group-hover:w-full rounded-full" />
    </Link>
  );
}
