import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-inherit transition-opacity hover:opacity-85 select-none ${className}`}
      aria-label="آویستا - صفحهٔ نخست"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] font-bold text-base text-[var(--av-brand)] shadow-2xs">
        𐬀
      </span>
      <span className="font-bold text-base tracking-tight text-[var(--av-text)]">
        آویستا
      </span>
    </Link>
  );
}
