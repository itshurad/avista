"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { levelsData } from "@/data/levels";
import { charactersData } from "@/data/characters";
import { getStoredProgress } from "@/lib/storage/progressStore";
import CharacterCard from "@/components/shared/CharacterCard";
import Button from "@/components/shared/Button";
import { Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function LearnPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const completedSet = new Set(progress?.completedCharacters || []);
  const totalCharacters = charactersData.length;
  const completedCount = completedSet.size;
  const percentage = Math.round((completedCount / totalCharacters) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 space-y-12">
      {/* سربرگ بخش یادگیری */}
      <div className="border-b border-[var(--av-surface-border)] pb-8 text-center sm:text-right">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-xs text-[var(--av-brand)] font-medium mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>برنامهٔ آموزشی جامع دین‌دبیره</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          گام‌های یادگیری دبیرهٔ اوستایی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-2xl leading-relaxed">
          هر گام شامل دسته‌ای از نویسه‌ها بر پایهٔ آواشناسی تاریخی است. پس از
          مرور و ثبت هر دسته، در آزمون همان گام شرکت کنید.
        </p>

        {/* نوار پیشرفت مدرن */}
        <div className="mt-6 max-w-md p-4 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)]">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-[var(--av-text-secondary)]">
              پیشرفت کل نویسه‌ها
            </span>
            <span className="  font-bold text-[var(--av-brand)]">
              {completedCount} / {totalCharacters} ({percentage}٪)
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--av-surface-subtle)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-[var(--av-brand)] rounded-full"
            />
          </div>
        </div>
      </div>

      {/* سرفصل‌های آموزشی */}
      <div className="space-y-10">
        {levelsData.map((level, levelIdx) => {
          const levelChars = charactersData.filter((c) =>
            level.characterIds.includes(c.id),
          );
          const isLevelComplete =
            levelChars.length > 0 &&
            levelChars.every((c) => completedSet.has(c.id));
          const levelCompletedCount = levelChars.filter((c) =>
            completedSet.has(c.id),
          ).length;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: levelIdx * 0.05 }}
              className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 sm:p-8 shadow-[var(--av-card-shadow)] space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--av-surface-border)] pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="  text-xs font-bold text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2.5 py-0.5 rounded-full">
                      گام ۰{level.id}
                    </span>
                    {isLevelComplete && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        تکمیل‌شده
                      </span>
                    )}
                    <span className="text-[11px]   text-[var(--av-text-muted)]">
                      {levelCompletedCount} از {levelChars.length} نویسه
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--av-text)]">
                    {level.title}
                  </h2>
                  <p className="text-xs text-[var(--av-text-secondary)] mt-1 max-w-xl">
                    {level.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/quiz/${level.id}`}>
                    <Button
                      variant={isLevelComplete ? "primary" : "secondary"}
                      size="sm"
                    >
                      <span>آزمون این گام</span>
                      <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* شبکه نویسه‌های این مرحله */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {levelChars.map((char) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    isCompleted={completedSet.has(char.id)}
                    href={`/learn/${char.id}`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
