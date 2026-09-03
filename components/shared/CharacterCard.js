import Link from "next/link";
import Badge from "./Badge";

export default function CharacterCard({
  character,
  isCompleted = false,
  isLocked = false,
  href,
}) {
  const content = (
    <div
      className={`group relative flex flex-col items-center justify-between rounded-[8px] border p-5 transition-all duration-200 ${
        isLocked
          ? "border-[var(--av-border)] bg-[var(--av-surface-soft)]/50 opacity-60 cursor-not-allowed"
          : "border-[var(--av-border)] bg-[var(--av-surface)] hover:border-[var(--av-text-muted)]/40 hover:shadow-2xs cursor-pointer"
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-[11px] font-mono text-[var(--av-text-muted)]">
          {character.transliteration}
        </span>
        {isCompleted ? (
          <Badge variant="success" size="sm">آموخته‌شده</Badge>
        ) : isLocked ? (
          <span className="text-[11px] text-[var(--av-text-muted)]">قفل</span>
        ) : (
          <Badge variant="default" size="sm">{character.classification === "vowel" ? "واکه" : "همخوان"}</Badge>
        )}
      </div>

      <div className="my-6 text-center">
        <span className="avestan-glyph text-5xl sm:text-6xl text-[var(--av-text)] group-hover:scale-105 transition-transform duration-200">
          {character.glyph}
        </span>
      </div>

      <div className="w-full text-center border-t border-[var(--av-border)] pt-3">
        <span className="text-xs font-semibold text-[var(--av-text)] block truncate">
          {character.name}
        </span>
        <span className="text-[11px] text-[var(--av-text-muted)] block mt-0.5 font-mono">
          {character.soundIpa}
        </span>
      </div>
    </div>
  );

  if (isLocked || !href) {
    return content;
  }

  return (
    <Link href={href} className="block no-underline text-inherit">
      {content}
    </Link>
  );
}