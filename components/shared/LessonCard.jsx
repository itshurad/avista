"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, CheckCircle2 } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function LessonCard({
  lessonNumber = "۰۱",
  title,
  description,
  duration = "۱۰ دقیقه",
  difficulty = "مقدماتی",
  progress = 0,
  isCompleted = false,
  href = "/learn",
}) {
  return (
    <Link href={href} className="block group text-inherit no-underline">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.18 }}
        className="rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 shadow-[var(--av-card-shadow)] group-hover:border-[var(--av-brand)]/40 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs   font-bold text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2.5 py-0.5 rounded-full">
            درس {lessonNumber}
          </span>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>فراگرفته‌شده</span>
            </span>
          ) : (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--av-surface-subtle)] text-[var(--av-text-muted)] border border-[var(--av-surface-border)]">
              {difficulty}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[var(--av-text)] group-hover:text-[var(--av-brand)] transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-xs text-[var(--av-text-secondary)] leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="mt-6 pt-4 border-t border-[var(--av-surface-border)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[var(--av-text-muted)]">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[var(--av-brand)] group-hover:-translate-x-1 transition-transform">
            <span>مطالعهٔ درس</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </div>
        </div>

        {progress > 0 && !isCompleted && (
          <div className="mt-3">
            <ProgressBar value={progress} max={100} />
          </div>
        )}
      </motion.div>
    </Link>
  );
}