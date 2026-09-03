"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { levelsData } from "@/data/levels";
import { getStoredProgress } from "@/lib/storage/progressStore";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";

export default function QuizIndexPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="border-b border-[var(--av-border)] pb-8 mb-10 text-center sm:text-right">
        <span className="text-xs font-bold text-[var(--av-accent)] tracking-wide">
          تثبیت دانش
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--av-text)] mt-1">
          آزمون‌های مرحله‌ای دبیره
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-muted)] max-w-xl leading-relaxed">
          پس از مرور نویسه‌های هر گام، برای سنجش توانایی خوانش و ثبت آواها در
          حافظه، در آزمون شرکت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {levelsData.map((level) => {
          const scoreData = progress?.quizScores?.[level.id];
          const isPassed = scoreData?.passed;

          return (
            <Card key={level.id} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--av-accent)]">
                    گام ۰{level.id}
                  </span>
                  {isPassed ? (
                    <Badge variant="success">
                      پذیرفته‌شده ({scoreData.score}٪)
                    </Badge>
                  ) : (
                    <Badge variant="default">تکمیل‌نشده</Badge>
                  )}
                </div>

                <h2 className="text-base font-bold text-[var(--av-text)] mb-2">
                  {level.title}
                </h2>
                <p className="text-xs text-[var(--av-text-muted)] leading-relaxed mb-6">
                  {level.description}
                </p>
              </div>

              <div className="border-t border-[var(--av-border)] pt-4 flex items-center justify-between">
                <span className="text-[11px] text-[var(--av-text-muted)]">
                  شرط قبولی: {level.requiredScoreToPass}٪
                </span>
                <Link href={`/quiz/${level.id}`}>
                  <Button
                    variant={isPassed ? "secondary" : "primary"}
                    size="sm"
                  >
                    {isPassed ? "آزمون دوباره" : "آغاز آزمون"}
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
