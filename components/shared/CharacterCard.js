"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CharacterCard({
  character,
  isCompleted = false,
  isLocked = false,
  href,
}) {
  const card = (
    <motion.div
      whileHover={isLocked ? {} : { y: -4, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 transition-all duration-300 ${
        isLocked
          ? "opacity-40 cursor-not-allowed bg-[var(--av-surface-subtle)]"
          : "cursor-pointer hover:border-[var(--av-brand)]/40 hover:shadow-[var(--av-card-shadow)]"
      }`}
    >
      <div className="flex items-center justify-between w-full text-xs">
        <span className="  text-[var(--av-text-muted)] text-[11px]">
          {character.unicode}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            isCompleted
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-[var(--av-surface-subtle)] text-[var(--av-text-muted)]"
          }`}
        >
          {character.classification === "vowel" ? "واکه" : "همخوان"}
        </span>
      </div>

      <div className="my-8 flex items-center justify-center">
        <span className="avestan-glyph text-6xl sm:text-7xl text-[var(--av-text)] group-hover:text-[var(--av-brand)] group-hover:scale-105 transition-all duration-300">
          {character.glyph}
        </span>
      </div>

      <div className="border-t border-[var(--av-surface-border)] pt-3 flex items-center justify-between">
        <span className="font-bold text-xs text-[var(--av-text)]">
          {character.name}
        </span>
        <div className="flex items-center gap-1   text-xs text-[var(--av-text-muted)]">
          <span className="text-[var(--av-text)] font-semibold">
            {character.transliteration}
          </span>
          <span>·</span>
          <span>{character.soundIpa}</span>
        </div>
      </div>
    </motion.div>
  );

  if (isLocked || !href) return card;

  return (
    <Link
      href={href}
      className="block no-underline text-inherit focus-visible:outline-none"
    >
      {card}
    </Link>
  );
}
