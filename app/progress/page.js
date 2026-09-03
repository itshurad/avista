"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredProgress } from "@/lib/storage/progressStore";
import { charactersData } from "@/data/characters";
import { getDueReviewCharacters } from "@/lib/srs/repetitionEngine";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import ProgressBar from "@/components/shared/ProgressBar";

export default function ProgressPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const completedSet = new Set(progress?.completedCharacters || []);
  const totalCharacters = charactersData.length;
  const learnedCount = completedSet.size;
  const percentage = Math.round((learnedCount / totalCharacters) * 100);

  const streakCount = progress?.streak?.count || 1;
  const totalScore = progress?.totalScore || 0;
  const dueReviews = progress ? getDueReviewCharacters(charactersData) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* سربرگ کارنامه */}
      <div className="border-b border-[var(--av-border)] pb-8 mb-10 text-center sm:text-right">
        <span className="text-xs font-bold text-[var(--av-accent)] tracking-wide">
          گزارش فراگیری
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--av-text)] mt-1">
          کارنامهٔ یادگیری شما
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-muted)] max-w-xl leading-relaxed">
          سنجش مستمر و مرور نظام‌مند کلید یادسپاری همیشگی نویسه‌های اوستایی در
          حافظه است.
        </p>
      </div>

      {/* سنجه‌های اصلی یادگیری */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card className="p-5 text-center">
          <span className="text-[11px] text-[var(--av-text-muted)] block mb-1">
            نویسه‌های آموخته
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--av-text)]">
            {learnedCount}{" "}
            <span className="text-xs font-normal text-[var(--av-text-muted)]">
              از {totalCharacters}
            </span>
          </span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-[11px] text-[var(--av-text-muted)] block mb-1">
            زنجیرهٔ پیاپی (Streak)
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--av-accent)]">
            {streakCount}{" "}
            <span className="text-xs font-normal text-[var(--av-text-muted)]">
              روز
            </span>
          </span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-[11px] text-[var(--av-text-muted)] block mb-1">
            کل امتیاز آزمون‌ها
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--av-text)]">
            {totalScore}
          </span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-[11px] text-[var(--av-text-muted)] block mb-1">
            شاخص تسلط کل
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--av-primary)]">
            {percentage}٪
          </span>
        </Card>
      </div>

      {/* میله پیشرفت فراگیر */}
      <Card className="p-6 mb-10">
        <div className="max-w-xl mx-auto">
          <ProgressBar
            value={learnedCount}
            max={totalCharacters}
            showPercentage
          />
        </div>
      </Card>

      {/* بخش مرور فاصله‌دار (Spaced Repetition) */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[var(--av-accent)]">
              مرور بهنگام
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[var(--av-text)]">
              نویسه‌های نیازمند یادآوری امروز
            </h2>
          </div>
          <Badge variant={dueReviews.length > 0 ? "warning" : "success"}>
            {dueReviews.length > 0
              ? `${dueReviews.length} نویسه`
              : "همه نویسه‌ها تثبیت شده‌اند"}
          </Badge>
        </div>

        {dueReviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {dueReviews.map((char) => (
              <div
                key={char.id}
                className="flex items-center justify-between p-4 rounded-[6px] border border-[var(--av-border)] bg-[var(--av-surface)]"
              >
                <div className="flex items-center gap-3">
                  <span className="avestan-glyph text-3xl text-[var(--av-text)]">
                    {char.glyph}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[var(--av-text)] block">
                      {char.name}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--av-text-muted)]">
                      {char.soundIpa}
                    </span>
                  </div>
                </div>
                <Link href={`/learn/${char.id}`}>
                  <Button variant="outline" size="sm">
                    مرور
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-xs text-[var(--av-text-muted)]">
            هیچ نویسه‌ای در حال حاضر برای مرور موعد نرسیده است. به یادگیری
            نویسه‌های تازه بپردازید!
          </Card>
        )}
      </div>

      {/* ماتریس همهٔ نویسه‌ها */}
      <div>
        <div className="border-b border-[var(--av-border)] pb-3 mb-6">
          <h2 className="text-base font-bold text-[var(--av-text)]">
            ماتریس نویسه‌های دین‌دبیره
          </h2>
          <span className="text-xs text-[var(--av-text-muted)]">
            وضعیت کلی آشنایی با الفبای اوستایی
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {charactersData.map((char) => {
            const isLearned = completedSet.has(char.id);
            return (
              <Link
                key={char.id}
                href={`/learn/${char.id}`}
                className={`p-4 rounded-[6px] border text-center transition-all block ${
                  isLearned
                    ? "border-[var(--av-success)]/40 bg-[var(--av-surface)] hover:border-[var(--av-success)]"
                    : "border-[var(--av-border)] bg-[var(--av-surface-soft)] opacity-70 hover:opacity-100"
                }`}
              >
                <span className="avestan-glyph text-3xl text-[var(--av-text)] block mb-1">
                  {char.glyph}
                </span>
                <span className="text-[11px] font-medium text-[var(--av-text)] block truncate">
                  {char.transliteration}
                </span>
                <span className="text-[10px] text-[var(--av-text-muted)] block mt-0.5">
                  {isLearned ? "آموخته" : "خوانده‌نشده"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
