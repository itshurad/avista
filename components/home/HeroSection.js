"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/shared/Button";
import { ArrowLeft, Sparkles, BookOpen, Layers } from "lucide-react";

const heroGlyphs = [
  {
    glyph: "𐬀",
    name: "آ کوتاهه",
    translit: "a",
    ipa: "/a/",
    code: "U+10B00",
    tag: "واکه بنیادین",
  },
  {
    glyph: "𐬁",
    name: "آ کشیده",
    translit: "ā",
    ipa: "/aː/",
    code: "U+10B01",
    tag: "واکه بلند",
  },
  {
    glyph: "𐬌",
    name: "ای کوتاهه",
    translit: "i",
    ipa: "/i/",
    code: "U+10B0C",
    tag: "واکه پیشین",
  },
  {
    glyph: "𐬐",
    name: "کاف",
    translit: "k",
    ipa: "/k/",
    code: "U+10B10",
    tag: "همخوان نرم‌کامی",
  },
  {
    glyph: "𐬴",
    name: "ش برگشته",
    translit: "ṣ̌",
    ipa: "/ʂ/",
    code: "U+10B34",
    tag: "همخوان اصیل",
  },
];

export default function HeroSection() {
  const [selectedGlyphIndex, setSelectedGlyphIndex] = useState(0);
  const current = heroGlyphs[selectedGlyphIndex];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
      {/* بافت زمینه مویرگی و هاله ملایم برند */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--av-surface-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--av-surface-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--av-brand)]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ستون متن و اکشن‌ها */}
          <div className="lg:col-span-7 text-center sm:text-right space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)]/80 backdrop-blur-xs shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--av-brand)]" />
              <span className="text-xs text-[var(--av-text-secondary)] font-medium">
                استاندارد بین‌المللی یونیکد · دین‌دبیره
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[var(--av-text)] leading-[1.2]"
            >
              دبیرهٔ اوستایی را
              <span className="text-[var(--av-brand)] block mt-1.5">
                علمی، روان و تعاملی بیاموزید.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-[var(--av-text-secondary)] max-w-xl mx-auto sm:mx-0 leading-relaxed"
            >
              آویستا مرجع باز و پژوهشی برای آموزش گام‌به‌گام ۵۳ نویسهٔ اوستایی،
              آواشناسی فونتیک (IPA) و فرهنگ واژگان گاهان است.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2"
            >
              <Link href="/learn">
                <Button size="lg" variant="primary">
                  <span>شروع یادگیری</span>
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                </Button>
              </Link>
              <Link href="/dictionary">
                <Button size="lg" variant="secondary">
                  <BookOpen className="h-4 w-4 ml-1.5" />
                  <span>فرهنگ واژگان</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6 border-t border-[var(--av-surface-border)] flex items-center justify-center sm:justify-start gap-6 text-xs text-[var(--av-text-muted)] font-medium"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                ۵۳ نویسهٔ رسمی
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--av-brand)]" />
                مرور هوشمند (SRS)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                متن‌باز و آزاد
              </span>
            </motion.div>
          </div>

          {/* کنسول کاراکترهای تعاملی زنده */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[360px] rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)]/90 backdrop-blur-md p-7 shadow-[var(--av-floating-shadow)] flex flex-col justify-between">
              {/* بار بالای کنسول */}
              <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-4">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[var(--av-brand)]" />
                  <span className="text-xs font-bold text-[var(--av-text)]">
                    کنسول نویسه
                  </span>
                </div>
                <span className="  text-[11px] text-[var(--av-text-muted)]">
                  {current.code}
                </span>
              </div>

              {/* نمایش مرکزی کاراکتر */}
              <div className="py-12 flex flex-col items-center justify-center relative min-h-[220px]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-32 w-32 rounded-full bg-[var(--av-brand)]/8 blur-2xl" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.glyph}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    className="flex flex-col items-center"
                  >
                    <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--av-text)] select-none">
                      {current.glyph}
                    </span>
                    <span className="mt-3 text-xs   text-[var(--av-brand)] font-bold tracking-wider">
                      {current.name} · {current.translit}
                    </span>
                    <span className="text-[11px]   text-[var(--av-text-muted)] mt-0.5">
                      آواشناسی: {current.ipa}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* سلکتور تعویض گلیف */}
              <div className="border-t border-[var(--av-surface-border)] pt-4">
                <div className="flex items-center justify-between text-[11px] text-[var(--av-text-muted)] mb-2">
                  <span>نمونه‌ها</span>
                  <span>{current.tag}</span>
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  {heroGlyphs.map((item, idx) => {
                    const isSelected = selectedGlyphIndex === idx;
                    return (
                      <button
                        key={item.glyph}
                        type="button"
                        onClick={() => setSelectedGlyphIndex(idx)}
                        className={`flex-1 h-9 rounded-xl border flex items-center justify-center text-base transition-all cursor-pointer ${
                          isSelected
                            ? "border-[var(--av-brand)] bg-[var(--av-brand-soft)] text-[var(--av-brand)] font-bold shadow-xs scale-105"
                            : "border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] text-[var(--av-text-secondary)] hover:border-[var(--av-brand)]/40"
                        }`}
                        aria-label={item.name}
                      >
                        <span className="avestan-glyph">{item.glyph}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
