import { roadmapSteps } from "@/data/roadmap";
import { Sparkles } from "lucide-react";

export default function LearningRoadmap() {
  return (
    <section className="py-14 sm:py-20 border-t border-[var(--av-surface-border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center sm:text-right max-w-2xl mb-10 space-y-1">
          <span className="text-xs   font-bold text-[var(--av-brand)] uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="h-3.5 w-3.5" />
            نقشهٔ راه یادگیری
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--av-text)]">
            آویستا چگونه کار می‌کند؟
          </h2>
          <p className="text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed">
            یک سازوکار ۵ مرحله‌ای و علمی برای تثبیت دائمی نویسه‌ها و اصوات در
            حافظهٔ شما.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {roadmapSteps.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] flex flex-col justify-between hover:border-[var(--av-brand)]/30 transition-colors"
            >
              <div>
                <span className="text-xs font-extrabold   text-[var(--av-brand)] bg-[var(--av-brand-soft)] px-2 py-0.5 rounded-md mb-3 inline-block">
                  گام ۰{item.step}
                </span>
                <h3 className="text-xs font-bold text-[var(--av-text)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[var(--av-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
