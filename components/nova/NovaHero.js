"use client";

import NovaButton from "./NovaButton";
import { Sparkles, ShieldCheck, Cpu } from "lucide-react";

export default function NovaHero({
  badgeText = "سیستم هوشمند گجت‌ها و تکنولوژی مدرن",
  headingLead = "پیشرفته‌ترین گجت‌ها،",
  headingAccent = "در ساختاری هوشمند",
  description = "بررسی تخصصی، انتخاب هوشمندانه و تجربهٔ خرید مستقیم جدیدترین کالاهای دیجیتال با تضمین بالاترین اصالت و کمترین پیچیدگی ممکن.",
  primaryActionLabel = "شروع کاوش در بازار",
  primaryActionHref = "/learn",
  secondaryActionLabel = "فرهنگ جامع واژگان",
  secondaryActionHref = "/dictionary",
  featuredCharacter = "𐬀",
}) {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Main Hero Container */}
        <div className="relative overflow-hidden rounded-[var(--radius-hero)] border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-secondary)] p-8 sm:p-12 lg:p-16 shadow-[var(--shadow-hero)] transition-all duration-500">
          
          {/* Ambient Blurred Light Orbs (Glow A & Glow B) */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-[90px] animate-nova-glow" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[110px] animate-nova-glow [animation-delay:2s]" />

          {/* Very Subtle Grid Pattern */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }}
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            
            {/* Right: Structured Typography Hierarchy */}
            <div className="lg:col-span-7 space-y-6 text-center sm:text-right">
              
              {/* Animated Technology Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-[var(--shadow-xs)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span>{badgeText}</span>
              </div>

              {/* Major Display Heading */}
              <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl leading-[1.25]">
                {headingLead}
                <span className="block mt-2 nova-accent-text-gradient">
                  {headingAccent}
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-xl text-sm sm:text-base font-medium text-[var(--foreground-muted)] leading-relaxed">
                {description}
              </p>

              {/* Strategic Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3 sm:justify-start">
                <NovaButton
                  href={primaryActionHref}
                  size="lg"
                  variant="primary"
                  showArrow
                >
                  {primaryActionLabel}
                </NovaButton>

                <NovaButton
                  href={secondaryActionHref}
                  size="lg"
                  variant="secondary"
                >
                  {secondaryActionLabel}
                </NovaButton>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-[var(--foreground-subtle)] sm:justify-start border-t border-[var(--border)]/60">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-[var(--accent)]" />
                  بر پایهٔ هویت تعاملی NOVA
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)]" />
                  تضمین اصالت مراجع علمی
                </span>
              </div>
            </div>

            {/* Left: Elevated Visual Artifact with Layered Depth */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 h-80 sm:h-92 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--surface)]/90 p-8 shadow-[var(--shadow-lg)] backdrop-blur-xl animate-nova-float flex flex-col items-center justify-between">
                
                {/* Visual Glow Layer Inside Artifact */}
                <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-gradient-to-tr from-[var(--accent)]/10 via-transparent to-transparent opacity-80" />

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[var(--foreground-muted)]">
                  <span className="flex items-center gap-1 text-[var(--accent)]">
                    <Sparkles className="w-3.5 h-3.5" /> NOVA SPEC
                  </span>
                  <span>U+10B00</span>
                </div>

                {/* Main Hero Artifact */}
                <div className="my-auto text-center select-none">
                  <span className="avestan-glyph text-8xl sm:text-9xl text-[var(--foreground)] transition-transform duration-500 hover:scale-105 block">
                    {featuredCharacter}
                  </span>
                </div>

                <div className="w-full text-center border-t border-[var(--border)]/70 pt-3">
                  <span className="text-xs font-bold text-[var(--foreground)] block">
                    نویسهٔ مبنا: آ کوتاهه
                  </span>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)] block mt-0.5">
                    Electric Blue Glow · 100% Motion Driven
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}