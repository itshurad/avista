"use client";

import Link from "next/link";
import NovaButton from "./NovaButton";

export default function NovaProductCard({
  id,
  title,
  transliteration,
  soundIpa,
  glyph,
  categoryLabel,
  href,
  isCompleted = false,
}) {
  return (
    <div className="group relative flex flex-col justify-between rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-lg)]">
      {/* Top Meta */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="font-mono text-[11px] font-bold text-[var(--foreground-subtle)]">
          {transliteration}
        </span>
        <span className="rounded-full bg-[var(--surface-secondary)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--foreground-muted)]">
          {categoryLabel}
        </span>
      </div>

      {/* Artifact / Character Showcase Area (Soft Elevated Well) */}
      <div className="relative my-3 flex h-40 w-full items-center justify-center rounded-[var(--radius-lg)] bg-[var(--surface-secondary)] border border-[var(--border-subtle)] transition-transform duration-300 ease-out group-hover:scale-[1.03]">
        <span className="avestan-glyph text-6xl text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)] select-none">
          {glyph}
        </span>
        {isCompleted && (
          <span className="absolute top-2.5 left-2.5 h-2 w-2 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success)]" />
        )}
      </div>

      {/* Details */}
      <div className="mt-2 space-y-1">
        <h4 className="text-sm font-black text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] truncate">
          {title}
        </h4>
        <p className="text-xs font-mono text-[var(--foreground-muted)]">
          IPA: {soundIpa}
        </p>
      </div>

      {/* Action */}
      <div className="mt-4 pt-3 border-t border-[var(--border)]/70">
        <NovaButton
          href={href || `/learn/${id}`}
          size="sm"
          variant="secondary"
          className="w-full text-xs"
        >
          مشاهده و بررسی
        </NovaButton>
      </div>
    </div>
  );
}
