// app/learn/[id]/page.jsx
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  charactersData,
  avestanNumbers,
  avestanMarks,
  transliterationToAvestan,
} from "@/data/characters";
import {
  markCharacterCompleted,
  getStoredProgress,
} from "@/lib/storage/progressStore";
import Button from "@/components/shared/Button";
import ShareCard from "@/components/shared/ShareCard";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  BookOpen,
  Eye,
  FileText,
  Hash,
} from "lucide-react";

export default function LessonDetailPage({ params }) {
  const resolvedParams = use(params);
  const targetId = decodeURIComponent(resolvedParams?.id || "").trim();

  // ۱. شناسایی خودکار نوع آیتم بر اساس id
  const item =
    charactersData.find((c) => c.id === targetId) ||
    avestanNumbers.find((n) => n.id === targetId) ||
    avestanMarks.find((p) => p.id === targetId);

  if (!item) {
    notFound();
  }

  const type =
    item.value !== undefined
      ? "number"
      : item.classification === "punctuation"
        ? "punctuation"
        : "character";

  const fullList =
    type === "number"
      ? avestanNumbers
      : type === "punctuation"
        ? avestanMarks
        : charactersData.filter((c) => c.classification !== "punctuation");

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (item) {
      const progress = getStoredProgress();
      setIsCompleted(progress?.completedCharacters?.includes(item.id) || false);
    }
  }, [item]);

  const currentIndex = fullList.findIndex((x) => x.id === item.id);
  const prevItem = currentIndex > 0 ? fullList[currentIndex - 1] : null;
  const nextItem =
    currentIndex < fullList.length - 1 ? fullList[currentIndex + 1] : null;

  const handleMarkLearned = () => {
    markCharacterCompleted(item.id);
    setIsCompleted(true);
  };

  const TYPE_LABELS = {
    character: "نویسهٔ اوستایی",
    number: "عدد اوستایی",
    punctuation: "علامت نگارشی",
  };

  const TYPE_BADGES = {
    character: "bg-[var(--av-brand-soft)] text-[var(--av-brand)]",
    number: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    punctuation: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 sm:px-6 space-y-8">
      {/* سربرگ ناوبری */}
      <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-4">
        <Link href="/learn">
          <Button variant="ghost" size="sm">
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
            <span>فهرست درس‌ها</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_BADGES[type]}`}
          >
            {TYPE_LABELS[type]}
          </span>
          {item.unicode && (
            <span className="text-xs text-[var(--av-text-muted)]  ">
              {item.unicode}
            </span>
          )}
        </div>
      </div>

      {/* لوح قهرمان */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-8 sm:p-12 text-center shadow-[var(--av-floating-shadow)] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--av-brand)]/8 blur-3xl pointer-events-none rounded-full" />

        {type === "character" && (
          <>
            <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--av-text)] leading-none block my-4 select-none drop-shadow-xs">
              {item.glyph}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--av-text)] mt-4">
              نویسهٔ {item.name}
            </h1>
            <div className="inline-flex items-center gap-3 mt-3 px-3.5 py-1 rounded-full bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-xs text-[var(--av-text-secondary)]">
              <span>
                ترانویسی:{" "}
                <strong className="text-[var(--av-brand)]">
                  {item.transliteration}
                </strong>
              </span>
              <span>·</span>
              <span>
                IPA:{" "}
                <strong className="text-[var(--av-text)]">
                  {item.soundIpa || "—"}
                </strong>
              </span>
            </div>
          </>
        )}

        {type === "number" && (
          <>
            <div className="text-7xl sm:text-8xl font-extrabold text-[var(--av-brand)] my-2">
              {item.value}
            </div>
            <div className="avestan-glyph text-5xl sm:text-6xl text-[var(--av-text)] my-4">
              {transliterationToAvestan(item.avestan)}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--av-text)]">
              {item.meaning}
            </h1>
            <div className="inline-flex items-center gap-3 mt-3 px-3.5 py-1 rounded-full bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-xs">
              <span>
                لاتین:{" "}
                <strong className="text-[var(--av-brand)]">
                  {item.transliteration}
                </strong>
              </span>
              <span>·</span>
              <span>
                نوع:{" "}
                <strong>
                  {item.type === "cardinal" ? "شمارشی" : "ترتیبی"}
                </strong>
              </span>
            </div>
          </>
        )}

        {type === "punctuation" && (
          <>
            <span className="text-8xl sm:text-9xl text-[var(--av-text)] leading-none block my-4 select-none avestan-glyph">
              {item.glyph}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--av-text)]">
              {item.name}
            </h1>
            <div className="inline-flex items-center gap-3 mt-3 px-3.5 py-1 rounded-full bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-xs  ">
              <span>{item.unicode}</span>
            </div>
          </>
        )}
      </motion.div>

      {/* بخش توضیحات تخصصی */}
      <div
        className={`grid gap-4 ${type === "number" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
      >
        {type === "number" ? (
          <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
              <Hash className="h-4 w-4" />
              <span>توضیح عددشناختی</span>
            </div>
            <p className="text-sm text-[var(--av-text)] leading-relaxed">
              واژهٔ عددی <strong>{item.transliteration}</strong> به معنای «
              {item.meaning}» (مقدار {item.value}) در متون اوستایی است.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-brand)]">
                <BookOpen className="h-4 w-4" />
                <span>توضیح تخصصی</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
                {item.description || "توضیحی ثبت نشده است."}
              </p>
            </div>
            {item.memoryTip && (
              <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-brand)]">
                  <Eye className="h-4 w-4" />
                  <span>نکتهٔ یادسپاری</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
                  {item.memoryTip}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* مثال‌های متنی */}
      {type === "character" && Boolean(item.examples?.length) && (
        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-text)]">
            <FileText className="h-4 w-4 text-[var(--av-brand)]" />
            <span>نمونه در متون اصیل</span>
          </div>
          <div className="space-y-2.5">
            {item.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)]"
              >
                <span className="avestan-glyph text-2xl text-[var(--av-text)]">
                  {ex.avestan}
                </span>
                <span className="text-xs text-[var(--av-brand)] font-semibold  ">
                  {ex.transliteration}
                </span>
                <span className="text-xs font-medium text-[var(--av-text-secondary)]">
                  {ex.meaning}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ناوبری قبلی / بعدی */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--av-surface-border)] pt-6">
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" />
              این مورد را فرا گرفته‌اید
            </span>
          ) : (
            <Button onClick={handleMarkLearned} variant="primary" size="md">
              <CheckCircle2 className="h-4 w-4 ml-1.5" />
              <span>ثبت به عنوان آموخته‌شده</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {prevItem && (
            <Link href={`/learn/${prevItem.id}`}>
              <Button variant="secondary" size="sm">
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
                <span>پیشین</span>
              </Button>
            </Link>
          )}
          {nextItem && (
            <Link href={`/learn/${nextItem.id}`}>
              <Button variant="secondary" size="sm">
                <span>پسین</span>
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* بخش کارت استوری */}
      {type === "character" && (
        <div className="pt-2">
          <ShareCard character={item} />
        </div>
      )}
    </div>
  );
}
