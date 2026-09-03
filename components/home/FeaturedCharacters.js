import Link from "next/link";
import CharacterCard from "@/components/shared/CharacterCard";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FeaturedCharacters({ characters = [] }) {
  return (
    <section className="py-14 sm:py-20 border-t border-[var(--av-surface-border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <span className="text-xs   font-bold text-[var(--av-brand)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              دروازهٔ ورود به الفبا
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--av-text)]">
              نویسه‌های گام نخست
            </h2>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--av-brand)] hover:text-[var(--av-brand-hover)] transition-colors self-start sm:self-auto"
          >
            <span>مشاهده همهٔ ۵۳ نویسه</span>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {characters.slice(0, 4).map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              href={`/learn/${char.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
