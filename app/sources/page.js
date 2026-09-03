import { academicSources } from "@/data/sources";
import { ExternalLink, BookMarked, Sparkles } from "lucide-react";

export const metadata = {
  title: "منابع و مراجع علمی | آویستا",
  description:
    "کتاب‌شناسی و مراجع معتبر اوستاشناسی و زبان‌های کهن ایرانی مورد استفاده در سامانهٔ آویستا.",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 space-y-10">
      {/* سربرگ بخش منابع */}
      <div className="border-b border-[var(--av-surface-border)] pb-8 text-center sm:text-right">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-xs text-[var(--av-brand)] font-medium mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>پشتوانهٔ علمی و مستند دانشگاهی</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          کتاب‌شناسی و منابع پژوهشی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-2xl leading-relaxed">
          داده‌های آواشناختی، ارزش‌گذاری‌های یونیکد و ترانویسی نویسه‌ها تماماً
          بر پایهٔ پژوهش‌های زبان‌شناسی تاریخی تراز اول گردآوری شده‌اند.
        </p>
      </div>

      {/* فهرست مراجع */}
      <div className="space-y-4">
        {academicSources.map((source) => (
          <div
            key={source.id}
            className="rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 sm:p-7 shadow-[var(--av-card-shadow)] hover:border-[var(--av-brand)]/30 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-base font-bold text-[var(--av-text)] leading-snug">
                  {source.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[var(--av-text-muted)]  ">
                  <span>
                    پژوهشگر:{" "}
                    <strong className="text-[var(--av-text)] font-sans font-medium">
                      {source.author}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>{source.year}</span>
                  <span>·</span>
                  <span>{source.publisher}</span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2.5 py-0.5 rounded-full self-start shrink-0">
                <BookMarked className="h-3 w-3" />
                سند مرجع
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed mt-3">
              {source.description}
            </p>

            <div className="mt-5 pt-3 border-t border-[var(--av-surface-border)] flex justify-end">
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--av-brand)] hover:underline"
              >
                <span>مشاهدهٔ سند در منبع اصلی</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
