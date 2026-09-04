"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function CharacterCard({ character, isCompleted = false, isLocked = false, href }) {
  const reduceMotion = useReducedMotion();
  const card = (
    <motion.div
      whileHover={isLocked || reduceMotion ? {} : { y: -5 }}
      whileTap={isLocked || reduceMotion ? {} : { scale: 0.985 }}
      className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-4 shadow-[var(--av-card-shadow)] transition-colors duration-300 sm:p-5 ${isLocked ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:border-[var(--av-brand)]/35"}`}
    >
      <div className="flex items-center justify-between text-[9px]">
        <span className="font-mono text-[var(--av-text-muted)]">{character.unicode}</span>
        <span className={`rounded-full px-2 py-1 font-bold ${isCompleted ? "bg-emerald-500/10 text-emerald-500" : "bg-[var(--av-surface-subtle)] text-[var(--av-text-muted)]"}`}>
          {character.classification === "vowel" ? "واکه" : "همخوان"}
        </span>
      </div>

      <div className="relative my-5 flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-[var(--av-brand)]/0 blur-2xl transition-all duration-500 group-hover:bg-[var(--av-brand)]/10" />
        <span className="avestan-glyph relative text-7xl leading-none text-[var(--av-text)] transition-all duration-500 group-hover:scale-110 group-hover:text-[var(--av-brand)]">
          {character.glyph}
        </span>
      </div>

      <div className="border-t border-[var(--av-surface-border)] pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-black text-[var(--av-text)]">{character.name}</span>
          <span className="font-mono text-[10px] font-bold text-[var(--av-brand)]">{character.transliteration}</span>
        </div>
        <span className="mt-1 block text-[9px] text-[var(--av-text-muted)]">{character.soundIpa}</span>
      </div>
    </motion.div>
  );

  if (isLocked || !href) return card;
  return <Link href={href} className="block no-underline text-inherit focus-visible:outline-none">{card}</Link>;
}
