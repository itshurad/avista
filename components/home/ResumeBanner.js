"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredProgress } from "@/lib/storage/progressStore";
import { charactersData } from "@/data/characters";
import Button from "@/components/shared/Button";
import { Play, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export default function ResumeBanner() {
  const [lastCharacter, setLastCharacter] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const progress = getStoredProgress();
    const completed = progress?.completedCharacters || [];
    setCompletedCount(completed.length);

    if (completed.length > 0) {
      // یافتن آخرین نویسهٔ خوانده‌شده یا نخستین نویسه‌ای که هنوز خوانده نشده است
      const nextChar = charactersData.find((c) => !completed.includes(c.id));
      const targetChar = nextChar || charactersData[charactersData.length - 1];
      setLastCharacter(targetChar);
    }
  }, []);

  if (!lastCharacter) return null;

  return (
    <AnimatePresence>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-4 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-[var(--av-brand)]/20 bg-[var(--av-surface)] p-4 sm:p-5 shadow-[var(--av-card-shadow)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* هالهٔ ملایم پس‌زمینه */}
          <div className="absolute right-0 top-0 h-full w-48 bg-[var(--av-brand)]/5 blur-2xl pointer-events-none" />

          {/* بخش اطلاعات و آخرین وضعیت */}
          <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto text-right">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--av-brand-soft)] border border-[var(--av-brand)]/20 text-[var(--av-brand)]">
              <span className="avestan-glyph text-2xl">
                {lastCharacter.glyph}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--av-brand)]">
                  <Sparkles className="h-3 w-3" />
                  ادامهٔ یادگیری
                </span>
                <span className="text-[11px] text-[var(--av-text-muted)]  ">
                  ({completedCount} از ۵۳ نویسه)
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[var(--av-text)]">
                گام بعدی: {lastCharacter.name} ({lastCharacter.transliteration})
              </h3>
            </div>
          </div>

          {/* دکمهٔ ادامه */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              href={`/learn/${lastCharacter.id}`}
              className="w-full sm:w-auto"
            >
              <Button variant="primary" size="sm" className="w-full sm:w-auto">
                <Play className="h-3 w-3 fill-current ml-1" />
                <span>پیگیری آموزش</span>
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
