"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredProgress } from "@/lib/storage/progressStore";
import { charactersData } from "@/data/characters";
import { getDueReviewCharacters } from "@/lib/srs/repetitionEngine";
import Button from "@/components/shared/Button";
import { Flame, CheckCircle2, Award, Zap, ArrowLeft } from "lucide-react";

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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 space-y-12">
      {/* سربرگ کارنامه */}
      <div className="border-b border-[var(--av-surface-border)] pb-8 text-center sm:text-right">
        <span className="text-xs   font-bold text-[var(--av-brand)] uppercase tracking-wider block mb-2">
          شاخص‌های یادگیری
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          کارنامهٔ پیشرفت شما
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-xl leading-relaxed">
          سنجش مستمر و استفاده از چرخهٔ مرور هوشمند (SRS) ضامن انتقال نویسه‌ها
          به حافظهٔ بلندمدت است.
        </p>
      </div>

      {/* کارت‌های آماری ۴گانه */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] text-center sm:text-right space-y-2"
        >
          <div className="flex items-center justify-between text-[var(--av-text-muted)]">
            <span className="text-xs">نویسه‌های آموخته</span>
            <CheckCircle2 className="h-4 w-4 text-[var(--av-brand)]" />
          </div>
          <div className="text-2xl sm:text-3xl   font-extrabold text-[var(--av-text)]">
            {learnedCount}{" "}
            <span className="text-xs font-normal text-[var(--av-text-muted)]">
              / {totalCharacters}
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] text-center sm:text-right space-y-2"
        >
          <div className="flex items-center justify-between text-[var(--av-text-muted)]">
            <span className="text-xs">زنجیرهٔ یادگیری</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl   font-extrabold text-amber-500">
            {streakCount}{" "}
            <span className="text-xs font-normal text-[var(--av-text-muted)]">
              روز
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] text-center sm:text-right space-y-2"
        >
          <div className="flex items-center justify-between text-[var(--av-text-muted)]">
            <span className="text-xs">کل امتیاز آزمون‌ها</span>
            <Award className="h-4 w-4 text-[var(--av-brand)]" />
          </div>
          <div className="text-2xl sm:text-3xl   font-extrabold text-[var(--av-text)]">
            {totalScore}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] text-center sm:text-right space-y-2"
        >
          <div className="flex items-center justify-between text-[var(--av-text-muted)]">
            <span className="text-xs">تسلط کلی</span>
            <Zap className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl   font-extrabold text-emerald-500">
            {percentage}٪
          </div>
        </motion.div>
      </div>

      {/* میله پیشرفت سراسری */}
      <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)]">
        <div className="flex items-center justify-between text-xs font-bold mb-3">
          <span className="text-[var(--av-text)]">میزان فراگیری دین‌دبیره</span>
          <span className="  text-[var(--av-brand)]">
            {percentage}٪
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--av-surface-subtle)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-[var(--av-brand)] rounded-full"
          />
        </div>
      </div>

      {/* بخش مرور فاصله‌دار (Spaced Repetition) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--av-text)]">
              نویسه‌های نیازمند یادآوری امروز
            </h2>
            <span className="text-xs text-[var(--av-text-muted)]">
              سیستم تکرار فاصله‌دار بر پایه عملکرد در آزمون‌ها
            </span>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              dueReviews.length > 0
                ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
            }`}
          >
            {dueReviews.length > 0
              ? `${dueReviews.length} نویسه در نوبت مرور`
              : "همه نویسه‌ها تثبیت شده‌اند ✓"}
          </span>
        </div>

        {dueReviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {dueReviews.map((char) => (
              <div
                key={char.id}
                className="flex items-center justify-between p-4 rounded-xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="avestan-glyph text-3xl text-[var(--av-text)]">
                    {char.glyph}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[var(--av-text)] block">
                      {char.name}
                    </span>
                    <span className="text-[11px]   text-[var(--av-text-muted)]">
                      {char.soundIpa} · {char.transliteration}
                    </span>
                  </div>
                </div>

                <Link href={`/learn/${char.id}`}>
                  <Button variant="secondary" size="sm">
                    مرور
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] text-xs text-[var(--av-text-secondary)]">
            در حال حاضر هیچ نویسه‌ای موعد مرور ندارد. به یادگیری گام‌های تازه
            بپردازید!
          </div>
        )}
      </div>

      {/* ماتریس همه ۵۳ نویسه */}
      <div className="space-y-4">
        <div className="border-b border-[var(--av-surface-border)] pb-3">
          <h2 className="text-lg font-bold text-[var(--av-text)]">
            ماتریس کامل الفبای اوستایی
          </h2>
          <span className="text-xs text-[var(--av-text-muted)]">
            وضعیت تسلط بر ۵۳ نویسهٔ رسمی دین‌دبیره
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
          {charactersData.map((char) => {
            const isLearned = completedSet.has(char.id);

            return (
              <Link
                key={char.id}
                href={`/learn/${char.id}`}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isLearned
                    ? "border-[var(--av-brand)]/30 bg-[var(--av-brand-soft)] hover:border-[var(--av-brand)]"
                    : "border-[var(--av-surface-border)] bg-[var(--av-surface)] hover:border-[var(--av-brand)]/40 opacity-70 hover:opacity-100"
                }`}
              >
                <span className="avestan-glyph text-2xl text-[var(--av-text)] block mb-1">
                  {char.glyph}
                </span>
                <span className="text-[10px]   text-[var(--av-text-secondary)] block truncate">
                  {char.transliteration}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
