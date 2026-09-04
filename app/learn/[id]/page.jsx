"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import ShareCard from "@/components/shared/ShareCard";
import { charactersData } from "@/data/characters";
import {
  markCharacterCompleted,
  getStoredProgress,
} from "@/lib/storage/progressStore";
import Button from "@/components/shared/Button";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  BookOpen,
  Eye,
  FileText,
} from "lucide-react";

export default function CharacterLessonPage({ params }) {
  const resolvedParams = use(params);
  const character = charactersData.find((c) => c.id === resolvedParams.id);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (character) {
      const progress = getStoredProgress();
      setIsCompleted(
        progress?.completedCharacters?.includes(character.id) || false,
      );
    }
  }, [character]);

  if (!character) {
    notFound();
  }

  const currentIndex = charactersData.findIndex((c) => c.id === character.id);
  const prevChar = currentIndex > 0 ? charactersData[currentIndex - 1] : null;
  const nextChar =
    currentIndex < charactersData.length - 1
      ? charactersData[currentIndex + 1]
      : null;

  const handleMarkLearned = () => {
    markCharacterCompleted(character.id);
    setIsCompleted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 sm:px-6 space-y-8">
      {/* ناوبری فوقانی برگه */}
      <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-4">
        <Link href="/learn">
          <Button variant="ghost" size="sm">
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
            <span>فهرست درس‌ها</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              character.classification === "vowel"
                ? "bg-[var(--av-brand-soft)] text-[var(--av-brand)]"
                : "bg-[var(--av-surface-subtle)] text-[var(--av-text-secondary)]"
            }`}
          >
            {character.classification === "vowel"
              ? "واکه (صدادار)"
              : "همخوان (بی‌صدا)"}
          </span>
          <span className="  text-xs text-[var(--av-text-muted)]">
            {character.unicode}
          </span>
        </div>
      </div>

      {/* لوح قهرمان نویسه */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-8 sm:p-12 text-center shadow-[var(--av-floating-shadow)] relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--av-brand)]/8 blur-3xl pointer-events-none rounded-full" />

        <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--av-text)] leading-none block my-4 select-none drop-shadow-xs">
          {character.glyph}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--av-text)] mt-4">
          نویسهٔ {character.name}
        </h1>
        <div className="inline-flex items-center gap-3 mt-3 px-3.5 py-1 rounded-full bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-xs   text-[var(--av-text-secondary)]">
          <span>
            ترانویسی:{" "}
            <strong className="text-[var(--av-brand)]">
              {character.transliteration}
            </strong>
          </span>
          <span>·</span>
          <span>
            IPA:{" "}
            <strong className="text-[var(--av-text)]">
              {character.soundIpa}
            </strong>
          </span>
        </div>
      </motion.div>

      {/* بخش توضیحات و نکته یادسپاری */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-brand)]">
            <BookOpen className="h-4 w-4" />
            <span>توضیح آواشناختی</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
            {character.description}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-brand)]">
            <Eye className="h-4 w-4" />
            <span>نکتهٔ یادسپاری دیداری</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
            {character.memoryTip}
          </p>
        </div>
      </div>

      {/* مثال‌های واژگانی تاریخی */}
      <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--av-text)]">
          <FileText className="h-4 w-4 text-[var(--av-brand)]" />
          <span>نمونه در متون اصیل</span>
        </div>

        <div className="space-y-2.5">
          {character.examples.map((ex, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)]"
            >
              <span className="avestan-glyph text-2xl text-[var(--av-text)]">
                {ex.avestan}
              </span>
              <span className="  text-xs text-[var(--av-brand)] font-semibold">
                {ex.transliteration}
              </span>
              <span className="text-xs font-medium text-[var(--av-text-secondary)]">
                {ex.meaning}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[var(--av-surface-border)] text-[11px] text-[var(--av-text-muted)]">
          مرجع پژوهشی: {character.source}
        </div>
      </div>

      {/* اقدامات و ثبت پیشرفت */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--av-surface-border)] pt-6">
        <div>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4" />
              این نویسه را فرا گرفته‌اید
            </span>
          ) : (
            <Button onClick={handleMarkLearned} variant="primary" size="md">
              <CheckCircle2 className="h-4 w-4 ml-1.5" />
              <span>ثبت به عنوان آموخته‌شده</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {prevChar && (
            <Link href={`/learn/${prevChar.id}`}>
              <Button variant="secondary" size="sm">
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
                <span>نویسهٔ پیشین ({prevChar.glyph})</span>
              </Button>
            </Link>
          )}
          {nextChar && (
            <Link href={`/learn/${nextChar.id}`}>
              <Button variant="secondary" size="sm">
                <span>نویسهٔ پسین ({nextChar.glyph})</span>
                <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* مؤلفه اشتراک‌گذاری کارت */}
      <div className="pt-2">
        <ShareCard character={character} />
      </div>
    </div>
  );
}
