import Link from "next/link";
import CharacterCard from "@/components/shared/CharacterCard";

export default function FeaturedCharacters({ characters = [] }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[var(--av-accent)]">دروازهٔ ورود</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--av-text)] mt-1">
              نویسه‌های گام نخست
            </h2>
          </div>
          <Link
            href="/learn"
            className="text-xs font-semibold text-[var(--av-text-muted)] hover:text-[var(--av-text)] transition-colors"
          >
            مشاهده همهٔ نویسه‌ها ←
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