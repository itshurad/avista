// app/learn/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { levelsData } from "@/data/levels";
import {
  charactersData,
  avestanNumbers,
  avestanMarks,
} from "@/data/characters";
import { getStoredProgress } from "@/lib/storage/progressStore";
import CharacterCard from "@/components/shared/CharacterCard";
import NumberCard from "@/components/learning/NumberCard";
import PunctuationCard from "@/components/learning/PunctuationCard";
import Button from "@/components/shared/Button";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Hash,
  Type,
  MousePointerClick,
} from "lucide-react";

export default function LearnPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const completedSet = new Set(progress?.completedCharacters || []);

  const learnableCharacters = charactersData.filter(
    (c) => c.classification !== "punctuation" && c.classification !== "number",
  );
  const totalCharacters = learnableCharacters.length;
  const completedCount = Array.from(completedSet).filter((id) =>
    learnableCharacters.some((c) => c.id === id),
  ).length;
  const percentage = Math.round((completedCount / totalCharacters) * 100) || 0;

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

        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-2xl leading-relaxed mx-auto sm:mx-0">
          هر گام شامل دسته‌ای از نویسه‌ها بر پایهٔ آواشناسی تاریخی (هوفمان) است.
          پس از مرور هر بخش، در آزمون ارزیابی شرکت کنید.
        </p>

        {/* جعبه نوار پیشرفت و راهنمای کلیک */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl">
          <div className="w-full sm:w-80 p-4 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)]">
            <div className="flex items-center justify-between text-xs font-medium mb-2">
              <span className="text-[var(--av-text-secondary)]">
                پیشرفت کل نویسه‌ها
              </span>
              <span className="font-bold text-[var(--av-brand)]">
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

          {/* نشانگر آگاهی‌بخش کلیک روی کارت‌ها */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--av-brand-soft)] text-[var(--av-brand)] text-xs border border-[var(--av-brand)]/20 shadow-xs">
            <MousePointerClick className="h-4 w-4 animate-bounce" />
            <span>برای ورود به صفحه درس و تلفظ، روی هر کارت کلیک کنید.</span>
          </div>
        </div>
      </div>

      {/* سرفصل‌های آموزشی */}
      <div className="space-y-10">
        {levelsData.map((level, levelIdx) => {
          const levelChars = charactersData.filter((c) =>
            level.characterIds?.includes(c.id),
          );
          const levelNumbers = avestanNumbers.filter((n) =>
            level.numberIds?.includes(n.id),
          );
          const levelPunctuation = avestanMarks.filter((p) =>
            level.punctuationIds?.includes(p.id),
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
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2.5 py-0.5 rounded-full">
                      گام ۰{level.id}
                    </span>
                    {isLevelComplete && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        تکمیل‌شده
                      </span>
                    )}
                    <span className="text-[11px] text-[var(--av-text-muted)]  ">
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

              {/* بخش حروف اصلی */}
              {levelChars.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--av-text-secondary)] mb-3 flex items-center gap-2">
                    <Type className="h-4 w-4 text-[var(--av-brand)]" />
                    حروف این مرحله
                  </h3>
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
                </div>
              )}

              {/* بخش اعداد */}
              {levelNumbers.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--av-text-secondary)] mb-3 mt-6 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-amber-500" />
                    اعداد این مرحله
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {levelNumbers.map((num) => (
                      <NumberCard
                        key={num.id}
                        number={num}
                        isCompleted={completedSet.has(num.id)}
                        href={`/learn/${num.id}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* بخش علائم نگارشی */}
              {levelPunctuation.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[var(--av-text-secondary)] mb-3 mt-6 flex items-center gap-2">
                    <Type className="h-4 w-4 text-purple-500" />
                    علائم نگارشی این مرحله
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {levelPunctuation.map((punct) => (
                      <PunctuationCard
                        key={punct.id}
                        punctuation={punct}
                        isCompleted={completedSet.has(punct.id)}
                        href={`/learn/${punct.id}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
