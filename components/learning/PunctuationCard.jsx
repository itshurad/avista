"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const VARIANTS = {
  purple: { accent: "#A855F7", ring: "rgba(168,85,247,0.55)" },
  amber: { accent: "#F59E0B", ring: "rgba(245,158,11,0.55)" },
  emerald: { accent: "#10B981", ring: "rgba(16,185,129,0.55)" },
  rose: { accent: "#F43F5E", ring: "rgba(244,63,94,0.55)" },
  sky: { accent: "#0EA5E9", ring: "rgba(14,165,233,0.55)" },
  gold: { accent: "#D4AF37", ring: "rgba(212,175,55,0.55)" },
};

export default function PunctuationCard({
  punctuation,
  isCompleted,
  href,
  variant = "purple",
}) {
  const c = VARIANTS[variant] || VARIANTS.purple;

  return (
    <Link href={href || "#"} className="block no-underline text-inherit">
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.18 } }}
        whileTap={{ scale: 0.97 }}
        className="relative group cursor-pointer touch-manipulation rounded-2xl p-3.5 sm:p-5 border border-[var(--av-surface-border)] bg-[var(--av-surface)] transition-all shadow-[var(--av-card-shadow)] flex flex-col justify-between h-full"
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.ring)}
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--av-surface-border)")
        }
      >
        <div className="flex items-center justify-between text-xs mb-1.5 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] text-[var(--av-text-muted)] font-mono">
            {punctuation.unicode}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="hidden xs:inline">آموخته‌اید</span>
            </span>
          )}
        </div>

        <div className="text-center space-y-1.5 sm:space-y-2 my-1.5 sm:my-2">
          <div
            className="text-4xl sm:text-5xl text-[var(--av-text)] transition-colors avestan-glyph select-none"
            style={{ color: undefined }}
          >
            <span className="group-hover:hidden">{punctuation.glyph}</span>
            <span
              className="hidden group-hover:inline"
              style={{ color: c.accent }}
            >
              {punctuation.glyph}
            </span>
          </div>
          <div className="text-[11px] sm:text-xs text-[var(--av-text-secondary)] font-bold truncate">
            {punctuation.name}
          </div>
        </div>

        <div
          className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[var(--av-surface-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-medium"
          style={{ color: c.accent }}
        >
          <span>آموزش کاربرد</span>
          <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 transform group-hover:-translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}
