import Link from "next/link";
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
      <div className="rounded-[var(--radius-md)] border border-[var(--av-border)] bg-[var(--av-surface)] p-6 transition-all duration-200 group-hover:border-[var(--av-accent)] group-hover:-translate-y-0.5 shadow-2xs">
        {/* نشانگر ردیف و وضعیت */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold text-[var(--av-accent)] tracking-wider">
            درس {lessonNumber}
          </span>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--av-success)]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>فراگرفته‌شده</span>
            </span>
          ) : (
            <span className="text-[11px] px-2 py-0.5 rounded-[var(--radius-xs)] bg-[var(--av-surface-secondary)] text-[var(--av-text-muted)] border border-[var(--av-border)]">
              {difficulty}
            </span>
          )}
        </div>

        {/* محتوای آموزشی درس */}
        <h3 className="text-base font-extrabold text-[var(--av-text)] group-hover:text-[var(--av-accent)] transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-xs text-[var(--av-text-muted)] leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* پیشرفت و زمان تخمینی */}
        <div className="mt-6 pt-4 border-t border-[var(--av-separator)] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[var(--av-text-muted)]">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-[var(--av-accent)] group-hover:-translate-x-1 transition-transform">
            <span>مطالعهٔ درس</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </div>
        </div>

        {progress > 0 && !isCompleted && (
          <div className="mt-3">
            <ProgressBar value={progress} max={100} />
          </div>
        )}
      </div>
    </Link>
  );
}
