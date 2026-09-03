"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Copy, Check, X, ShieldCheck } from "lucide-react";
import Button from "./Button";

export default function DonateModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.25, bounce: 0.2 }}
            className="relative w-full max-w-md rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-7 shadow-[var(--av-floating-shadow)] space-y-6 z-10"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 left-5 text-[var(--av-text-muted)] hover:text-[var(--av-text)] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--av-brand-soft)] text-[var(--av-brand)]">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--av-text)]">
                مهرانه و همیاری با آویستا
              </h3>
              <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed px-2">
                آویستا بدون تبلیغات و کاملاً آزاد توسعه داده می‌شود. همیاری شما مستقیماً صرف نگهداری سرورها و توسعهٔ ابزارهای پردازش خطوط کهن می‌شود.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] flex items-center justify-between">
                <div className="text-right">
                  <span className="text-[11px] text-[var(--av-text-muted)] block">
                    شماره کارت بانکی (سامان)
                  </span>
                  <span className="  text-xs font-bold text-[var(--av-text)] tracking-wider">
                    6219 8619 1316 4645
                  </span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy("6219861913164645", "card")}
                >
                  {copiedKey === "card" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-2 text-center border-t border-[var(--av-surface-border)]">
              <span className="text-[11px] text-[var(--av-text-muted)] inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--av-brand)]" />
                توسعه‌یافته به صورت کاملاً متن‌باز و عام‌المنفعه
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}