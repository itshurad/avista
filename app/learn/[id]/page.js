"use client";

import { use, useEffect, useState } from "react";
import ShareCard from "@/components/shared/ShareCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { charactersData } from "@/data/characters";
import {
  markCharacterCompleted,
  getStoredProgress,
} from "@/lib/storage/progressStore";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import Card from "@/components/shared/Card";

export default function CharacterLessonPage({ params }) {
  const resolvedParams = use(params);
  const character = charactersData.find((c) => c.id === resolvedParams.id);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (character) {
      const progress = getStoredProgress();
      setIsCompleted(progress.completedCharacters.includes(character.id));
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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* ناوبری فوقانی برگه */}
      <div className="flex items-center justify-between border-b border-[var(--av-border)] pb-4 mb-8">
        <Link
          href="/learn"
          className="text-xs font-medium text-[var(--av-text-muted)] hover:text-[var(--av-text)] transition-colors"
        >
          ← بازگشت به فهرست
        </Link>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              character.classification === "vowel" ? "accent" : "default"
            }
          >
            {character.classification === "vowel"
              ? "واکه (صدادار)"
              : "همخوان (بی‌صدا)"}
          </Badge>
          <span className="text-xs font-mono text-[var(--av-text-muted)]">
            {character.unicode}
          </span>
        </div>
      </div>

      {/* لوح قهرمان نویسه */}
      <div className="rounded-[8px] border border-[var(--av-border)] bg-[var(--av-surface)] p-8 sm:p-12 text-center shadow-2xs">
        <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--av-text)] leading-none block my-4 select-none">
          {character.glyph}
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--av-text)] mt-4">
          نویسهٔ {character.name}
        </h1>
        <div className="inline-flex items-center gap-3 mt-2 px-3 py-1 rounded-[4px] bg-[var(--av-surface-soft)] text-xs font-mono text-[var(--av-text-muted)]">
          <span>
            آوانگاری:{" "}
            <strong className="text-[var(--av-text)]">
              {character.transliteration}
            </strong>
          </span>
          <span>•</span>
          <span>
            IPA:{" "}
            <strong className="text-[var(--av-text)]">
              {character.soundIpa}
            </strong>
          </span>
        </div>
      </div>

      {/* بخش توضیحات و نکته یادسپاری */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="p-6">
          <h2 className="text-xs font-bold text-[var(--av-accent)] mb-2">
            توضیح آواشناختی
          </h2>
          <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
            {character.description}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xs font-bold text-[var(--av-accent)] mb-2">
            نکتهٔ یادسپاری دیداری
          </h2>
          <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
            {character.memoryTip}
          </p>
        </Card>
      </div>

      {/* مثال‌های واژگانی تاریخی */}
      <Card className="p-6 mt-6">
        <h2 className="text-xs font-bold text-[var(--av-text-muted)] mb-4">
          نمونه در متون اصیل
        </h2>
        <div className="space-y-3">
          {character.examples.map((ex, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-[6px] bg-[var(--av-surface-soft)] border border-[var(--av-border)]"
            >
              <span className="avestan-glyph text-2xl text-[var(--av-text)]">
                {ex.avestan}
              </span>
              <div className="text-left font-mono text-xs text-[var(--av-text-muted)]">
                <span>{ex.transliteration}</span>
              </div>
              <span className="text-xs font-medium text-[var(--av-text)]">
                {ex.meaning}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[var(--av-border)] text-[11px] text-[var(--av-text-muted)]">
          مرجع علمی: {character.source}
        </div>
      </Card>

      {/* اقدامات و ثبت پیشرفت */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--av-border)] pt-6">
        <div>
          {isCompleted ? (
            <Badge variant="success" size="md">
              این نویسه را فرا گرفته‌اید
            </Badge>
          ) : (
            <Button onClick={handleMarkLearned} variant="primary" size="md">
              ثبت به عنوان آموخته‌شده ✓
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {prevChar && (
            <Link href={`/learn/${prevChar.id}`}>
              <Button variant="outline" size="sm">
                نویسهٔ پیشین ({prevChar.glyph})
              </Button>
            </Link>
          )}
          {nextChar && (
            <Link href={`/learn/${nextChar.id}`}>
              <Button variant="outline" size="sm">
                نویسهٔ پسین ({nextChar.glyph})
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-8">
        <ShareCard character={character} />
      </div>
    </div>
  );
}
