"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { levelsData } from "@/data/levels";
import { getStoredProgress } from "@/lib/storage/progressStore";
import Button from "@/components/shared/Button";
import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";

export default function QuizIndexPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6">
      {/* سربرگ مینیمال */}
      <div className="border-b border-[var(--av-surface-border)] pb-8 mb-10 text-center sm:text-right">
        <span className="text-xs   font-bold text-[var(--av-brand)] uppercase tracking-wider block mb-2">
          سنجش و تثبیت دانش
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          آزمون‌های مرحله‌ای دبیره
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-xl leading-relaxed">
          پس از مرور نویسه‌های هر گام، میزان یادسپاری و درک آواشناختی خود را با
          آزمون‌های چهارگزینه‌ای بسنجید.
        </p>
      </div>

      {/* شبکه کارت‌های مرحله‌ای */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {levelsData.map((level, index) => {
          const scoreData = progress?.quizScores?.[level.id];
          const isPassed = scoreData?.passed;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                isPassed
                  ? "border-emerald-500/20 bg-[var(--av-surface)] shadow-[var(--av-card-shadow)]"
                  : "border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] hover:border-[var(--av-brand)]/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="  text-xs font-bold text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2.5 py-0.5 rounded-full">
                    گام ۰{level.id}
                  </span>

                  {isPassed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      قبول ({scoreData.score}٪)
                    </span>
                  ) : (
                    <span className="text-[11px] text-[var(--av-text-muted)] bg-[var(--av-surface-subtle)] px-2.5 py-0.5 rounded-full">
                      تکمیل‌نشده
                    </span>
                  )}
                </div>

                <h2 className="text-base font-bold text-[var(--av-text)] mb-2">
                  {level.title}
                </h2>
                <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed mb-6">
                  {level.description}
                </p>
              </div>

              <div className="border-t border-[var(--av-surface-border)] pt-4 flex items-center justify-between">
                <span className="text-[11px]   text-[var(--av-text-muted)]">
                  شرط قبولی: {level.requiredScoreToPass}٪
                </span>

                <Link href={`/quiz/${level.id}`}>
                  <Button
                    variant={isPassed ? "secondary" : "primary"}
                    size="sm"
                  >
                    {isPassed ? (
                      <>
                        <RotateCcw className="h-3 w-3 ml-1" />
                        <span>آزمون دوباره</span>
                      </>
                    ) : (
                      <>
                        <span>شروع آزمون</span>
                        <ArrowLeft className="h-3 w-3 mr-1" />
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
