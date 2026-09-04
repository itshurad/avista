"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { roadmapSteps } from "@/data/roadmap";
import Reveal from "@/components/shared/Reveal";

export default function LearningRoadmap() {
  return (
    <section className="av-section-rule py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-9 max-w-2xl">
            <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--av-brand)]">
              <Sparkles className="h-3.5 w-3.5" />
              نقشهٔ راه
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[var(--av-text)] sm:text-3xl">هر مرحله یک لایه از خط را باز می‌کند.</h2>
            <p className="mt-2 text-xs leading-7 text-[var(--av-text-secondary)] sm:text-sm">ساختار محتوا از شناخت شکل شروع می‌شود و با بازیابی فعال و مرور فاصله‌دار به حافظهٔ بلندمدت می‌رسد.</p>
          </div>
        </Reveal>

        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="absolute right-[10%] left-[10%] top-8 hidden h-px bg-[var(--av-surface-border)] lg:block" />
          {roadmapSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                className="relative z-10 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-5 shadow-[var(--av-card-shadow)]"
              >
                <span className="mb-6 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--av-brand)]/20 bg-[var(--av-brand-soft)] text-[10px] font-black text-[var(--av-brand)]">{item.step}</span>
                <h3 className="text-xs font-black text-[var(--av-text)]">{item.title}</h3>
                <p className="mt-2 text-[10px] leading-6 text-[var(--av-text-secondary)]">{item.description}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
