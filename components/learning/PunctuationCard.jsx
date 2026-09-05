// components/learning/PunctuationCard.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function PunctuationCard({ punctuation, isCompleted, href }) {
  return (
    <Link href={href || "#"} className="block no-underline text-inherit">
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.18 } }}
        className="relative group cursor-pointer rounded-2xl p-5 border border-[var(--av-surface-border)] bg-[var(--av-surface)] hover:border-purple-500/60 transition-all shadow-[var(--av-card-shadow)] flex flex-col justify-between h-full"
      >
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-[10px]   text-[var(--av-text-muted)]">
            {punctuation.unicode}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" />
              آموخته‌اید
            </span>
          )}
        </div>

        <div className="text-center space-y-2 my-2">
          <div className="text-5xl text-[var(--av-text)] group-hover:text-purple-500 transition-colors avestan-glyph select-none">
            {punctuation.glyph}
          </div>
          <div className="text-xs text-[var(--av-text-secondary)] font-bold">
            {punctuation.name}
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[var(--av-surface-border)] flex items-center justify-between text-[11px] text-purple-500 font-medium">
          <span>آموزش کاربرد</span>
          <ArrowLeft className="h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
