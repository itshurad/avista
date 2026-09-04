"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, Waves } from "lucide-react";

import Button from "@/components/shared/Button";
import BeamSurface from "@/components/shared/BeamSurface";

const heroGlyphs = [
  {
    glyph: "𐬀",
    name: "آ کوتاه",
    translit: "a",
    ipa: "/a/",
    code: "U+10B00",
    tag: "واکه",
  },
  {
    glyph: "𐬁",
    name: "آ بلند",
    translit: "ā",
    ipa: "/aː/",
    code: "U+10B01",
    tag: "واکه",
  },
  {
    glyph: "𐬌",
    name: "ای کوتاه",
    translit: "i",
    ipa: "/i/",
    code: "U+10B0C",
    tag: "واکه",
  },
  {
    glyph: "𐬐",
    name: "ک",
    translit: "k",
    ipa: "/k/",
    code: "U+10B10",
    tag: "همخوان",
  },
  {
    glyph: "𐬴",
    name: "ش",
    translit: "š",
    ipa: "/ʃ/",
    code: "U+10B34",
    tag: "همخوان",
  },
];

const ambientGlyphs = [
  ["𐬀", "top-[8%] right-[7%]", "text-7xl"],
  ["𐬴", "top-[43%] left-[4%]", "text-6xl"],
  ["𐬐", "bottom-[12%] right-[17%]", "text-5xl"],
  ["𐬁", "bottom-[8%] left-[23%]", "text-8xl"],
];

export default function HeroSection() {
  const [selectedGlyphIndex, setSelectedGlyphIndex] = useState(0);
  const current = heroGlyphs[selectedGlyphIndex];
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-18 pt-8 sm:pb-28 sm:pt-14"
    >
      <div
        aria-hidden="true"
        className="av-page-grid absolute inset-0 -z-20 opacity-70"
      />

      <div aria-hidden="true" className="av-noise -z-10" />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-[var(--av-brand)]/10 blur-[120px]"
      />

      {ambientGlyphs.map(([glyph, position, size], index) => (
        <motion.span
          key={`${glyph}-${index}`}
          aria-hidden="true"
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, index % 2 ? -12 : 10, 0],
                  rotate: [0, index % 2 ? -3 : 3, 0],
                }
          }
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          className={`avestan-glyph pointer-events-none absolute ${position} ${size} -z-10 select-none text-[var(--av-text)]/[0.035]`}
        >
          {glyph}
        </motion.span>
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          {/* Hero copy */}
          <div className="text-center sm:text-right">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--av-brand)]/15 bg-[var(--av-surface)]/70 px-3 py-1.5 text-[10px] font-bold text-[var(--av-brand)] shadow-sm backdrop-blur-md"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--av-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--av-accent)]" />
              </span>
              متن‌باز · یونیکد · پژوهش‌محور
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[1.7rem] font-black leading-[1.18] tracking-[-0.055em] text-[var(--av-text)] sm:text-3xl lg:text-[3rem]"
            >
              دبیرهٔ اوستایی را
              <span className="mt-2 block bg-gradient-to-l from-[var(--av-brand)] via-[var(--av-accent)] to-[var(--av-brand)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[av-gradient_6s_ease_infinite]">
                مانند یک زبان زنده لمس کنید.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.14,
              }}
              className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[var(--av-text-secondary)] sm:mx-0 sm:text-base"
            >
              آویستا یک مسیر تعاملی برای شناخت ۵۳ نویسهٔ رسمی دین‌دبیره،
              آواشناسی، واژگان گاهانی و استوار کردن یادگیری است؛ بدون حساب
              کاربری و بدون حواس‌پرتی.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.22,
              }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
            >
              <Link href="/learn" aria-label="آغاز مسیر یادگیری دبیرهٔ اوستایی">
                <Button size="lg" variant="primary">
                  <span>آغاز مسیر</span>
                  <ArrowLeft aria-hidden="true" className="mr-1 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="/dictionary"
                aria-label="رفتن به گنجینهٔ واژگان اوستایی"
              >
                <Button size="lg" variant="secondary">
                  <BookOpen aria-hidden="true" className="ml-1 h-4 w-4" />
                  گنجینهٔ واژگان
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[var(--av-surface-border)] pt-5 text-[10px] font-semibold text-[var(--av-text-muted)] sm:mx-0 sm:justify-start"
            >
              <span className="whitespace-nowrap">۵۳ نویسهٔ رسمی</span>

              <span className="whitespace-nowrap">
                مرور فاصله‌دار (یادآوریِ زمان‌بندی‌شده)
              </span>

              <span className="whitespace-nowrap">نگه‌داری داده در دستگاه</span>
            </motion.div>
          </div>

          {/* Interactive glyph laboratory */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 18,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto w-full max-w-[430px]"
          >
            <BeamSurface strength={0.58} duration={5.5}>
              <div className="overflow-hidden rounded-[1.65rem] border border-[var(--av-surface-border)] bg-[var(--av-surface-solid)] shadow-[var(--av-floating-shadow)]">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--av-brand-soft)] text-[var(--av-brand)]"
                    >
                      <Layers className="h-4 w-4" />
                    </span>

                    <div>
                      <div className="text-xs font-extrabold text-[var(--av-text)]">
                        کارگاه نویسه
                      </div>

                      <div className="text-[9px] text-[var(--av-text-muted)]">
                        شناخت زندهٔ شکل و آوا (تلفظ)
                      </div>
                    </div>
                  </div>

                  <span className="whitespace-nowrap font-mono text-[9px] text-[var(--av-text-muted)]">
                    {current.code}
                  </span>
                </div>

                {/* Main glyph */}
                <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-10">
                  <div
                    aria-hidden="true"
                    className="absolute h-48 w-48 rounded-full bg-[var(--av-brand)]/10 blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute h-36 w-36 rounded-full border border-[var(--av-brand)]/10"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute h-56 w-56 rounded-full border border-dashed border-[var(--av-surface-border)]"
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.glyph}
                      initial={{
                        opacity: 0,
                        scale: 0.72,
                        y: 18,
                        filter: "blur(7px)",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.82,
                        y: -14,
                        filter: "blur(6px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 25,
                      }}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <span
                        aria-label={`نویسهٔ ${current.name}`}
                        className="avestan-glyph whitespace-nowrap text-[9rem] leading-none text-[var(--av-text)] drop-shadow-[0_18px_40px_var(--av-brand-glow)] sm:text-[10rem]"
                      >
                        {current.glyph}
                      </span>

                      <div className="mt-6 flex max-w-full items-center gap-2 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] px-3 py-1.5">
                        <span className="whitespace-nowrap text-[10px] font-bold text-[var(--av-text)]">
                          {current.name}
                        </span>

                        <span className="whitespace-nowrap text-[10px] text-[var(--av-brand)]">
                          {current.translit}
                        </span>

                        <span className="whitespace-nowrap text-[10px] text-[var(--av-text-muted)]">
                          {current.ipa}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer information */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 text-[9px] text-[var(--av-text-muted)]">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Waves
                        aria-hidden="true"
                        className="h-3 w-3 text-[var(--av-accent)]"
                      />
                      آوا (تلفظ) دقیق
                    </span>

                    <span className="whitespace-nowrap">{current.tag}</span>
                  </div>
                </div>

                {/* Glyph selector */}
                <div className="border-t border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)]/60 p-4">
                  <div className="mb-2 flex items-center justify-between text-[9px] font-semibold text-[var(--av-text-muted)]">
                    <span>نمونهٔ تعاملی</span>

                    <span dir="ltr" className="whitespace-nowrap">
                      {selectedGlyphIndex + 1} / {heroGlyphs.length}
                    </span>
                  </div>

                  <div
                    role="tablist"
                    aria-label="نمونه‌های نویسه"
                    className="grid grid-cols-5 gap-2"
                  >
                    {heroGlyphs.map((item, idx) => {
                      const active = selectedGlyphIndex === idx;

                      return (
                        <button
                          key={item.glyph}
                          type="button"
                          role="tab"
                          onClick={() => setSelectedGlyphIndex(idx)}
                          aria-label={`نمایش نویسهٔ ${item.name}`}
                          aria-selected={active}
                          aria-pressed={active}
                          className={`group relative flex h-12 items-center justify-center rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--av-brand)] ${
                            active
                              ? "border-[var(--av-brand)]/40 bg-[var(--av-brand-soft)] text-[var(--av-brand)] shadow-sm"
                              : "border-[var(--av-surface-border)] bg-[var(--av-surface-solid)] text-[var(--av-text-secondary)] hover:-translate-y-0.5 hover:border-[var(--av-brand)]/25"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`avestan-glyph text-xl transition-transform duration-200 ${
                              active ? "scale-110" : "group-hover:scale-110"
                            }`}
                          >
                            {item.glyph}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </BeamSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
