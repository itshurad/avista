"use client";

import Link from "next/link";
import Button from "@/components/shared/Button";
import { Sparkles, BookOpen } from "lucide-react";

export default function HeroSection({
  hasProgress = false,
  lastCharacter = "𐬀",
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-28 border-b border-[var(--av-border)]">
      {/* هالهٔ نورانی بسیار ملایم پس‌زمینه */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--av-accent)]/10 blur-3xl pointer-events-none animate-glow" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* محتوای متنی */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] border border-[var(--av-border)] bg-[var(--av-surface)] text-xs text-[var(--av-text)] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--av-accent)]" />
              <span className="font-semibold text-[var(--av-accent)]">
                دین‌دبیره؛
              </span>
              <span className="text-[var(--av-text-muted)]">
                خط کتیبه‌های کهن ایران باستان
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--av-text)] leading-[1.25]">
              بازخوانی میراث صوتی تاریخ
              <span className="text-[var(--av-accent)] block mt-1.5">
                با دقتی بی‌همتا در جهان کهن
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--av-text-muted)] leading-relaxed max-w-xl">
              دبیره‌ای با بیش از ۵۰ نویسهٔ آوایی مجزا که برای حفظ تلفظ دقیق
              سروده‌های کهن ساخته شد. در آویستا، این الفبا و واژگان گاهان را
              مرحله‌به‌مرحله بیاموزید.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
              <Link href="/learn">
                <Button size="lg" variant="primary" className="shadow-sm">
                  آغاز یادگیری دبیره
                </Button>
              </Link>
              <Link href="/dictionary">
                <Button size="lg" variant="secondary" className="gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--av-accent)]" />
                  فرهنگ واژگان
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="ghost">
                  تاریخچهٔ خط
                </Button>
              </Link>
            </div>
          </div>

          {/* لوح زنده و شناور کتیبه */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-72 sm:w-76 sm:h-84 rounded-[10px] border border-[var(--av-border)] bg-[var(--av-surface)] flex flex-col items-center justify-center p-8 shadow-sm animate-float">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-[var(--av-accent)]">
                <Sparkles className="h-3 w-3" />
                <span>U+10B00 · دین‌دبیره</span>
              </div>

              <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--av-text)] hover:text-[var(--av-accent)] transition-colors duration-500">
                𐬀
              </span>

              <div className="mt-5 text-center border-t border-[var(--av-border)] pt-4 w-full">
                <span className="text-xs font-bold text-[var(--av-text)] block">
                  نخستین نویسه: آ کوتاهه
                </span>
                <span className="text-[11px] text-[var(--av-text-muted)] font-mono block mt-1">
                  /a/ · aṣ̌a · راستی
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
