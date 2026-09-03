"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quizzesData } from "@/data/quizzes";
import { levelsData } from "@/data/levels";
import {
  getStoredProgress,
  saveStoredProgress,
} from "@/lib/storage/progressStore";
import { updateCardSRS } from "@/lib/srs/repetitionEngine";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";

export default function QuizLevelPage({ params }) {
  const resolvedParams = use(params);
  const levelId = parseInt(resolvedParams.level, 10);
  const levelQuestions = quizzesData[levelId];
  const levelInfo = levelsData.find((l) => l.id === levelId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  if (!levelQuestions || !levelInfo) {
    notFound();
  }

  const currentQuestion = levelQuestions[currentIndex];
  const totalQuestions = levelQuestions.length;

  const handleSelectOption = (optId) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    const selectedOpt = currentQuestion.options.find(
      (o) => o.id === selectedOptionId,
    );
    const isCorrect = Boolean(selectedOpt?.isCorrect);

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    if (currentQuestion.characterId) {
      updateCardSRS(currentQuestion.characterId, isCorrect);
    }

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      finalizeQuiz();
    }
  };

  const finalizeQuiz = () => {
    const finalScore = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = finalScore >= levelInfo.requiredScoreToPass;

    const progress = getStoredProgress();
    const updatedScores = {
      ...progress.quizScores,
      [levelId]: {
        score: finalScore,
        passed,
        timestamp: Date.now(),
      },
    };

    saveStoredProgress({
      ...progress,
      quizScores: updatedScores,
      totalScore: (progress.totalScore || 0) + finalScore,
    });

    setIsQuizCompleted(true);
  };

  if (isQuizCompleted) {
    const finalScore = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = finalScore >= levelInfo.requiredScoreToPass;

    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 text-center">
        <Card className="p-8 sm:p-12">
          <Badge
            variant={passed ? "success" : "danger"}
            size="md"
            className="mb-4"
          >
            {passed ? "پذیرفته شدید" : "نیاز به مرور دوباره"}
          </Badge>

          <h1 className="text-2xl font-bold text-[var(--av-text)]">
            نتیجهٔ آزمون {levelInfo.title}
          </h1>

          <div className="my-8">
            <span className="text-5xl font-mono font-extrabold text-[var(--av-accent)]">
              {finalScore}٪
            </span>
            <span className="block text-xs text-[var(--av-text-muted)] mt-2">
              {correctAnswersCount} پاسخ درست از {totalQuestions} پرسش
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[var(--av-border)]">
            <Link href={`/quiz`}>
              <Button variant="outline" size="md">
                فهرست آزمون‌ها
              </Button>
            </Link>
            <Link href={`/learn`}>
              <Button variant="primary" size="md">
                ادامهٔ یادگیری
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* سربرگ پرسش */}
      <div className="flex items-center justify-between border-b border-[var(--av-border)] pb-4 mb-8">
        <span className="text-xs font-mono text-[var(--av-text-muted)]">
          پرسش ۰{currentIndex + 1} از ۰{totalQuestions}
        </span>
        <span className="text-xs font-bold text-[var(--av-accent)]">
          {levelInfo.title}
        </span>
      </div>

      {/* صورت پرسش */}
      <Card className="p-6 sm:p-8 mb-6 text-center">
        <h2 className="text-base sm:text-lg font-bold text-[var(--av-text)] leading-relaxed">
          {currentQuestion.question}
        </h2>
      </Card>

      {/* گزینه‌ها */}
      <div className="space-y-3">
        {currentQuestion.options.map((opt) => {
          let optionStyles =
            "border-[var(--av-border)] bg-[var(--av-surface)] hover:bg-[var(--av-surface-soft)]";

          if (selectedOptionId === opt.id) {
            optionStyles =
              "border-[var(--av-primary)] bg-[var(--av-primary-soft)] text-[var(--av-text)]";
          }

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              optionStyles =
                "border-[var(--av-success)] bg-[var(--av-success)]/10 text-[var(--av-success)] font-bold";
            } else if (selectedOptionId === opt.id) {
              optionStyles =
                "border-[var(--av-danger)] bg-[var(--av-danger)]/10 text-[var(--av-danger)]";
            } else {
              optionStyles = "opacity-50 border-[var(--av-border)]";
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => handleSelectOption(opt.id)}
              className={`w-full p-4 rounded-[6px] border text-right transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${optionStyles}`}
            >
              <span className="text-sm font-medium leading-normal">
                {opt.text.includes("𐬀") ||
                opt.text.includes("𐬁") ||
                opt.text.includes("𐬌") ||
                opt.text.includes("𐬐") ? (
                  <span className="avestan-glyph text-2xl ml-2">
                    {opt.text}
                  </span>
                ) : (
                  opt.text
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* توضیح بازخورد پس از پاسخ */}
      {isAnswerSubmitted && (
        <div className="mt-6 p-4 rounded-[6px] bg-[var(--av-surface-soft)] border border-[var(--av-border)] text-xs text-[var(--av-text)] leading-relaxed">
          <strong className="text-[var(--av-accent)] block mb-1">توضیح:</strong>
          {currentQuestion.explanation}
        </div>
      )}

      {/* دکمهٔ تایید یا رفتن به سؤال بعد */}
      <div className="mt-8 flex justify-end">
        {!isAnswerSubmitted ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            variant="primary"
            size="md"
          >
            تأیید پاسخ
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} variant="accent" size="md">
            {currentIndex < totalQuestions - 1
              ? "پرسش پسین ←"
              : "مشاهدهٔ کارنامهٔ آزمون"}
          </Button>
        )}
      </div>
    </div>
  );
}
