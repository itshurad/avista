import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-inherit transition-opacity hover:opacity-85 ${className}`}
      aria-label="آویستا - صفحهٔ نخست"
    >
      {/* نماد کتیبه‌ای مینیمال */}
      <span
        className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--av-border)] font-bold bg-[var(--av-surface)] text-lg shadow-xs transition-colors"
        style={{ color: "var(--av-accent)" }}
      >
        𐬀
      </span>
      <div className="flex flex-col text-right">
        <span className="font-bold text-base tracking-tight leading-none text-[var(--av-text)]">
          آویستا
        </span>
      </div>
    </Link>
  );
}
