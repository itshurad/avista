import Link from "next/link";
import CharacterCard from "@/components/shared/CharacterCard";
import Reveal from "@/components/shared/Reveal";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FeaturedCharacters({ characters = [] }) {
  return (
    <section className="av-section-rule py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--av-brand)]">
                <Sparkles className="h-3.5 w-3.5" />
                دروازهٔ ورود به الفبا
              </span>
              <h2 className="text-2xl font-black tracking-tight text-[var(--av-text)] sm:text-3xl">چهار نویسه برای شروع</h2>
              <p className="mt-1 text-xs text-[var(--av-text-secondary)]">اول شکل را ببینید، بعد صدا را کشف کنید.</p>
            </div>
            <Link href="/learn" className="inline-flex items-center gap-1 self-start text-xs font-bold text-[var(--av-brand)] sm:self-auto">
              همهٔ ۵۳ نویسه <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {characters.slice(0, 4).map((char, index) => (
            <Reveal key={char.id} delay={index * 0.06}>
              <CharacterCard character={char} href={`/learn/${char.id}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
