"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { quizzesData } from "@/data/quizzes";
import { levelsData } from "@/data/levels";
import {
  getStoredProgress,
  saveStoredProgress,
} from "@/lib/storage/progressStore";
import { updateCardSRS } from "@/lib/srs/repetitionEngine";
import Button from "@/components/shared/Button";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RotateCcw,
  BookOpen,
} from "lucide-react";

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

  // صفحه کارنامه نهایی آزمون
  if (isQuizCompleted) {
    const finalScore = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = finalScore >= levelInfo.requiredScoreToPass;

    return (
      <div className="mx-auto max-w-md px-4 py-20 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.35 }}
          className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-8 sm:p-10 shadow-[var(--av-floating-shadow)]"
        >
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
              passed
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
            }`}
          >
            {passed ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            {passed ? "پذیرفته شدید" : "نیاز به مرور دوباره"}
          </span>

          <h1 className="text-xl font-bold text-[var(--av-text)]">
            نتیجهٔ آزمون {levelInfo.title}
          </h1>

          <div className="my-8">
            <span className="  text-6xl font-extrabold text-[var(--av-brand)]">
              {finalScore}٪
            </span>
            <span className="block text-xs text-[var(--av-text-secondary)] mt-2">
              {correctAnswersCount} پاسخ درست از {totalQuestions} پرسش
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-4 border-t border-[var(--av-surface-border)]">
            <Link href="/quiz" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="w-full">
                <RotateCcw className="h-3.5 w-3.5 ml-1.5" />
                <span>فهرست آزمون‌ها</span>
              </Button>
            </Link>
            <Link href="/learn" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full">
                <span>ادامهٔ یادگیری</span>
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      {/* سربرگ مرحله و شاخص پیشرفت سوال */}
      <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-4 mb-6">
        <span className="  text-xs text-[var(--av-text-muted)]">
          پرسش ۰{currentIndex + 1} / ۰{totalQuestions}
        </span>
        <span className="text-xs font-bold text-[var(--av-brand)]">
          {levelInfo.title}
        </span>
      </div>

      {/* صورت سوال */}
      <div className="rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 sm:p-8 mb-6 text-center shadow-[var(--av-card-shadow)]">
        <h2 className="text-base sm:text-lg font-bold text-[var(--av-text)] leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* گزینه‌ها */}
      <div className="space-y-2.5">
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let optionStyles =
            "border-[var(--av-surface-border)] bg-[var(--av-surface)] hover:border-[var(--av-brand)]/40";

          if (isSelected) {
            optionStyles =
              "border-[var(--av-brand)] bg-[var(--av-brand-soft)] text-[var(--av-brand)] font-semibold";
          }

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              optionStyles =
                "border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold";
            } else if (isSelected) {
              optionStyles =
                "border-rose-500 bg-rose-500/10 text-rose-600 font-semibold";
            } else {
              optionStyles = "opacity-40 border-[var(--av-surface-border)]";
            }
          }

          return (
            <motion.button
              key={opt.id}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => handleSelectOption(opt.id)}
              whileHover={isAnswerSubmitted ? {} : { scale: 1.01 }}
              whileTap={isAnswerSubmitted ? {} : { scale: 0.99 }}
              className={`w-full p-4 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${optionStyles}`}
            >
              <span className="text-sm">
                {opt.text.includes("𐬀") ||
                opt.text.includes("𐬁") ||
                opt.text.includes("𐬌") ||
                opt.text.includes("𐬎") ||
                opt.text.includes("𐬐") ||
                opt.text.includes("𐬴") ? (
                  <span className="avestan-glyph text-2xl ml-2">
                    {opt.text}
                  </span>
                ) : (
                  opt.text
                )}
              </span>

              {isAnswerSubmitted && opt.isCorrect && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* توضیح بازخورد آواشناختی پس از پاسخ */}
      <AnimatePresence>
        {isAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 p-4 rounded-xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-xs text-[var(--av-text-secondary)] leading-relaxed"
          >
            <div className="flex items-center gap-1 text-[var(--av-brand)] font-bold mb-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>توضیح علمی:</span>
            </div>
            {currentQuestion.explanation}
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه اقدام تایید یا سوال بعدی */}
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
          <Button onClick={handleNextQuestion} variant="primary" size="md">
            <span>
              {currentIndex < totalQuestions - 1
                ? "پرسش بعدی"
                : "مشاهدهٔ نتیجه"}
            </span>
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
