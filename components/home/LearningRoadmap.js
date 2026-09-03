import { roadmapSteps } from "@/data/roadmap";

export default function LearningRoadmap() {
  return (
    <section className="py-14 sm:py-20 border-b border-[var(--av-border)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center sm:text-right max-w-2xl mb-10">
          <span className="text-xs font-bold text-[var(--av-accent)]">مسیر شفاف</span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--av-text)] mt-1">
            آویستا چگونه کار می‌کند؟
          </h2>
          <p className="text-xs sm:text-sm text-[var(--av-text-muted)] mt-2 leading-relaxed">
            یک سازوکار ساده و علمی ۵ مرحله‌ای برای انتقال خط کهن به حافظهٔ بلندمدت شما.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {roadmapSteps.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-[8px] border border-[var(--av-border)] bg-[var(--av-surface)] flex flex-col justify-between"
            >
              <span className="text-xs font-bold font-mono text-[var(--av-accent)] mb-3 block">
                گام ۰{item.step}
              </span>
              <h3 className="text-xs font-bold text-[var(--av-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-[11px] text-[var(--av-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}