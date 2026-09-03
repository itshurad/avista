import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";

export default function WordOfTheDay({ wordData }) {
  if (!wordData) return null;

  return (
    <section className="py-12 border-b border-[var(--av-border)] bg-[var(--av-surface-soft)]/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-wide text-[var(--av-accent)]">
              آموزش پیوسته
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--av-text)]">
              واژهٔ امروز
            </h2>
          </div>
          <Badge variant="accent">متون اصیل اوستا</Badge>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-[6px] bg-[var(--av-surface-soft)] border border-[var(--av-border)] text-center">
              <span className="avestan-glyph text-5xl sm:text-6xl text-[var(--av-text)] mb-3">
                {wordData.word}
              </span>
              <span className="text-xs font-mono text-[var(--av-text-muted)]">
                {wordData.transliteration}
              </span>
              <span className="text-xs font-medium text-[var(--av-text)] mt-1">
                تلفظ: {wordData.pronunciation}
              </span>
            </div>

            <div className="md:col-span-8 space-y-3 text-right">
              <div className="text-sm sm:text-base font-bold text-[var(--av-text)]">
                معنا: {wordData.meaning}
              </div>
              <p className="text-xs sm:text-sm text-[var(--av-text-muted)] leading-relaxed">
                {wordData.note}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[var(--av-text-muted)]">
                <span>نویسهٔ برجسته در این واژه:</span>
                <span className="avestan-glyph text-base text-[var(--av-accent)]">
                  {wordData.relatedCharacter}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
