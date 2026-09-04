"use client";

import { motion } from "framer-motion";
import { BookMarked, Sparkles } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function WordOfTheDay({ wordData }) {
  if (!wordData) return null;

  return (
    <section className="av-section-rule bg-[var(--av-surface-subtle)]/35 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--av-brand)]">
                <Sparkles className="h-3.5 w-3.5" />
                آموزش پیوسته
              </span>
              <h2 className="text-2xl font-black tracking-tight text-[var(--av-text)]">واژهٔ روز</h2>
            </div>
            <span className="rounded-full bg-[var(--av-brand-soft)] px-3 py-1 text-[9px] font-bold text-[var(--av-brand)]">متون اصیل اوستا</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-[1.65rem] border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-5 shadow-[var(--av-floating-shadow)] sm:p-7"
          >
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[var(--av-accent)]/10 blur-3xl" />
            <div className="relative grid items-center gap-5 md:grid-cols-[.72fr_1.28fr] md:gap-8">
              <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] p-6 text-center">
                <span className="avestan-glyph text-6xl text-[var(--av-text)] sm:text-7xl">{wordData.word}</span>
                <span className="mt-4 text-xs font-black text-[var(--av-brand)]">{wordData.transliteration}</span>
                <span className="mt-1 text-[10px] text-[var(--av-text-muted)]">تلفظ: {wordData.pronunciation}</span>
              </div>

              <div className="text-right">
                <div className="text-base font-black leading-8 text-[var(--av-text)] sm:text-lg">{wordData.meaning}</div>
                <p className="mt-2 text-xs leading-7 text-[var(--av-text-secondary)] sm:text-sm">{wordData.note}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-[var(--av-surface-border)] pt-4 text-[10px] text-[var(--av-text-muted)]">
                  <BookMarked className="h-3.5 w-3.5 text-[var(--av-brand)]" />
                  <span>نویسهٔ شاخص:</span>
                  <span className="avestan-glyph rounded-lg bg-[var(--av-brand-soft)] px-2 py-1 text-lg text-[var(--av-brand)]">{wordData.relatedCharacter}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
