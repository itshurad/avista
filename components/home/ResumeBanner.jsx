"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { getStoredProgress } from "@/lib/storage/progressStore";

import { charactersData } from "@/data/characters";

import Button from "@/components/shared/Button";
import BeamSurface from "@/components/shared/BeamSurface";

import { Play, ArrowLeft, Sparkles } from "lucide-react";

export default function ResumeBanner() {
  const [lastCharacter, setLastCharacter] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const progress = getStoredProgress();

    const completed = progress?.completedCharacters || [];

    setCompletedCount(completed.length);

    const nextChar = charactersData.find(
      (character) => !completed.includes(character.id),
    );

    setLastCharacter(
      nextChar ||
        (completed.length
          ? charactersData[charactersData.length - 1]
          : charactersData[0]),
    );
  }, []);

  if (!lastCharacter) {
    return null;
  }

  const progressPercent = Math.round((completedCount / 53) * 100);

  return (
    <AnimatePresence>
      <section className="mx-auto max-w-6xl px-4 pb-2 sm:px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <BeamSurface
            size="line"
            strength={0.32}
            duration={6.5}
            borderRadius={16}
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-4 shadow-[var(--av-card-shadow)] sm:p-5">
              <div className="absolute inset-y-0 right-0 w-56 bg-[var(--av-brand)]/[0.035] blur-2xl" />

              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--av-brand)]/15 bg-[var(--av-brand-soft)] text-[var(--av-brand)]">
                    <span className="avestan-glyph text-2xl">
                      {lastCharacter.glyph}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-0.5 flex items-center gap-2 text-[10px] font-bold text-[var(--av-brand)]">
                      <Sparkles className="h-3 w-3" />

                      {completedCount ? "ادامهٔ یادگیری" : "شروع پیشنهادی"}
                    </div>

                    <h3 className="truncate text-xs font-black text-[var(--av-text)] sm:text-sm">
                      {completedCount
                        ? `گام بعدی: ${lastCharacter.name}`
                        : `از ${lastCharacter.name} شروع کنید`}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-[9px] text-[var(--av-text-muted)]">
                      <span>{completedCount} / ۵۳ نویسه</span>

                      <span className="h-1 w-1 rounded-full bg-[var(--av-text-muted)]/50" />

                      <span>{progressPercent}٪ مسیر</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/learn/${lastCharacter.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Play className="ml-1 h-3 w-3 fill-current" />

                    {completedCount ? "ادامه" : "شروع"}

                    <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </BeamSurface>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
