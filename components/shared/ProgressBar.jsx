"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  value = 0,
  max = 100,
  className = "",
  showPercentage = false,
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {showPercentage && (
        <div className="flex justify-between text-xs text-[var(--av-text-secondary)] font-medium">
          <span>شاخص پیشرفت</span>
          <span className="  text-[var(--av-brand)] font-bold">{percentage}٪</span>
        </div>
      )}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)]"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-[var(--av-brand)] rounded-full"
        />
      </div>
    </div>
  );
}