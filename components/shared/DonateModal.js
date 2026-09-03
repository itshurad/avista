"use client";

import { useState } from "react";
import { Coffee, Copy, Check, Heart, X } from "lucide-react";
import Button from "./Button";

export default function DonateModal({ isOpen, onClose }) {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-[10px] border border-[var(--av-border)] bg-[var(--av-surface)] p-6 shadow-xl space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* بستن */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 text-[var(--av-text-muted)] hover:text-[var(--av-text)] transition-colors cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="h-5 w-5" />
        </button>

        {/* سربرگ مودال */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--av-accent-soft)] text-[var(--av-accent)] mb-1">
            <Coffee className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[var(--av-text)]">
            مهرانه و همیاری با آویستا
          </h3>
          <p className="text-xs text-[var(--av-text-muted)] leading-relaxed px-4">
            آویستا یک پروژهٔ مستقل، رایگان و بدون آگهی است. همیاری شما به
            اندازهٔ «یک پیاله چای» به پایداری سرورها و گسترش پژوهش خطوط باستانی
            یاری می‌رساند.
          </p>
        </div>

        {/* روش‌های پرداخت */}
        <div className="space-y-3 pt-2">
          {/* کارت به کارت */}
          <div className="p-3.5 rounded-[6px] border border-[var(--av-border)] bg-[var(--av-bg)] flex items-center justify-between">
            <div className="text-right">
              <span className="text-[11px] text-[var(--av-text-muted)] block">
                شماره کارت بانکی (بلوبانک / سامان)
              </span>
              <span className="font-mono text-xs font-bold text-[var(--av-text)] tracking-wider">
                ۶۲۱۹ - ۸۶۱۰ - **** - ۵۴۲۱
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy("6219861000005421", "card")}
            >
              {copiedKey === "card" ? (
                <Check className="h-3.5 w-3.5 text-[var(--av-success)]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>

          {/* تتر / رمزارز */}
          <div className="p-3.5 rounded-[6px] border border-[var(--av-border)] bg-[var(--av-bg)] flex items-center justify-between">
            <div className="text-right max-w-[240px]">
              <span className="text-[11px] text-[var(--av-text-muted)] block">
                تتر (شبکه TRC20)
              </span>
              <span className="font-mono text-[11px] text-[var(--av-text)] truncate block">
                TYsL9wKQG...7jK8mX2
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy("TYsL9wKQG3N8qRt7jK8mX2", "crypto")}
            >
              {copiedKey === "crypto" ? (
                <Check className="h-3.5 w-3.5 text-[var(--av-success)]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="text-[11px] text-[var(--av-text-muted)] flex items-center justify-center gap-1">
            با مهر و سپاس از همراهی شما{" "}
            <Heart className="h-3 w-3 text-[var(--av-accent)] fill-[var(--av-accent)]" />
          </span>
        </div>
      </div>
    </div>
  );
}
