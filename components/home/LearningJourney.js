"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, BookOpen, Languages, Sparkles } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

const steps = [
  { num: "۰۱", title: "الفبا", desc: "۵۳ گلیف رسمی یونیکد", icon: BookOpen, href: "/learn" },
  { num: "۰۲", title: "آواها", desc: "آوانگاری و شنیدن صدا", icon: Languages, href: "/learn" },
  { num: "۰۳", title: "واژگان", desc: "ردیابی واژه‌های گاهانی", icon: Sparkles, href: "/dictionary" },
  { num: "۰۴", title: "تثبیت", desc: "آزمون + مرور فاصله‌دار", icon: Brain, href: "/quiz" },
];

export default function LearningJourney() {
  return (
    <section className="av-section-rule py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--av-brand)]">
                <Sparkles className="h-3.5 w-3.5" />
                مسیر یادگیری
              </span>
              <h2 className="text-2xl font-black tracking-tight text-[var(--av-text)] sm:text-3xl">چهار حرکت تا خواندن</h2>
            </div>
            <Link href="/learn" className="hidden items-center gap-1 text-xs font-bold text-[var(--av-brand)] sm:flex">
              ورود به مسیر <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.num} delay={index * 0.06}>
                <Link href={step.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.985 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-4 shadow-[var(--av-card-shadow)] sm:p-5"
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-[10px] font-black text-[var(--av-brand)]">{step.num}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--av-surface-subtle)] text-[var(--av-text-muted)] transition-colors group-hover:bg-[var(--av-brand-soft)] group-hover:text-[var(--av-brand)]">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--av-text)]">{step.title}</h3>
                    <p className="mt-1 text-[10px] leading-6 text-[var(--av-text-muted)] sm:text-xs">{step.desc}</p>
                    <span className="absolute -bottom-6 -left-4 text-7xl font-black text-[var(--av-text)]/[0.025] transition-transform duration-500 group-hover:-translate-y-2">{step.num}</span>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
