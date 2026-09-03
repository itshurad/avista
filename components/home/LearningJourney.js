"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "۰۱", title: "الفبا", desc: "۵۳ گلیف رسمی یونیکد" },
  { num: "۰۲", title: "آواها", desc: "آوانگاری فونتیک IPA" },
  { num: "۰۳", title: "واژگان", desc: "تحلیل متون اصیل گاهان" },
  { num: "۰۴", title: "تثبیت", desc: "آزمون مرحله‌ای و SRS" },
];

export default function LearningJourney() {
  return (
    <section className="py-16 border-t border-[var(--av-surface-border)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <motion.div
              key={step.num}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] text-right"
            >
              <span className="  text-xs font-bold text-[var(--av-brand)] block mb-1">
                {step.num}
              </span>
              <h2 className="text-sm font-bold text-[var(--av-text)]">
                {step.title}
              </h2>
              <p className="text-xs text-[var(--av-text-muted)] mt-1">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
