import { BookMarked, Sparkles } from "lucide-react";

export default function WordOfTheDay({ wordData }) {
  if (!wordData) return null;

  return (
    <section className="py-12 border-t border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)]/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-xs   font-bold text-[var(--av-brand)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              آموزش پیوسته
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--av-text)]">
              واژهٔ روز
            </h2>
          </div>
          <span className="text-xs font-medium text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-3 py-1 rounded-full">
            متون اصیل اوستا
          </span>
        </div>

        <div className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 sm:p-8 shadow-[var(--av-card-shadow)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* لوح گلیف واژه */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-center">
              <span className="avestan-glyph text-5xl sm:text-6xl text-[var(--av-text)] mb-3">
                {wordData.word}
              </span>
              <span className="text-xs   font-bold text-[var(--av-brand)]">
                {wordData.transliteration}
              </span>
              <span className="text-xs text-[var(--av-text-secondary)] mt-1">
                تلفظ: {wordData.pronunciation}
              </span>
            </div>

            {/* شرح معنا و نویسه کلیدی */}
            <div className="md:col-span-8 space-y-3 text-right">
              <div className="text-base sm:text-lg font-bold text-[var(--av-text)]">
                معنا: {wordData.meaning}
              </div>
              <p className="text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed">
                {wordData.note}
              </p>

              <div className="pt-2 border-t border-[var(--av-surface-border)] flex items-center gap-2 text-xs text-[var(--av-text-muted)]">
                <BookMarked className="h-3.5 w-3.5 text-[var(--av-brand)]" />
                <span>نویسهٔ شاخص در این واژه:</span>
                <span className="avestan-glyph text-lg text-[var(--av-brand)] px-2 py-0.5 rounded-md bg-[var(--av-brand-soft)]">
                  {wordData.relatedCharacter}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
