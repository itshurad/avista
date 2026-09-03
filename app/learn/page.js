"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { levelsData } from "@/data/levels";
import { charactersData } from "@/data/characters";
import { getStoredProgress } from "@/lib/storage/progressStore";
import CharacterCard from "@/components/shared/CharacterCard";
import Button from "@/components/shared/Button";
import ProgressBar from "@/components/shared/ProgressBar";

export default function LearnPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const completedSet = new Set(progress?.completedCharacters || []);
  const totalCharacters = charactersData.length;
  const completedCount = completedSet.size;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* سربرگ بخش یادگیری */}
      <div className="border-b border-[var(--av-border)] pb-8 mb-10">
        <span className="text-xs font-bold text-[var(--av-accent)] tracking-wide">
          دورهٔ جامع دین‌دبیره
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--av-text)] mt-1">
          گام‌های یادگیری دبیرهٔ اوستایی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-muted)] max-w-2xl leading-relaxed">
          هر مرحله شامل دسته‌ای از نویسه‌ها بر پایهٔ آواشناسی علمی است. پس از
          تسلط بر نویسه‌ها، آزمون سنجش برای شما گشوده می‌شود.
        </p>

        <div className="mt-6 max-w-md">
          <ProgressBar
            value={completedCount}
            max={totalCharacters}
            showPercentage
          />
        </div>
      </div>

      {/* سرفصل‌های آموزشی */}
      <div className="space-y-12">
        {levelsData.map((level) => {
          const levelChars = charactersData.filter((c) =>
            level.characterIds.includes(c.id),
          );
          const isLevelComplete = levelChars.every((c) =>
            completedSet.has(c.id),
          );

          return (
            <div
              key={level.id}
              className="rounded-[8px] border border-[var(--av-border)] bg-[var(--av-surface)] p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--av-border)] pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--av-accent)]">
                    گام ۰{level.id}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--av-text)] mt-0.5">
                    {level.title}
                  </h2>
                  <p className="text-xs text-[var(--av-text-muted)] mt-1">
                    {level.description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/quiz/${level.id}`}>
                    <Button
                      variant={isLevelComplete ? "accent" : "outline"}
                      size="sm"
                    >
                      آزمون این گام
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
