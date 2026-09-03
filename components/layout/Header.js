"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import DonateModal from "@/components/shared/DonateModal";
import { Menu, X, Coffee, BookOpen } from "lucide-react";

const navigationItems = [
  { href: "/learn", label: "یادگیری دبیره" },
  { href: "/dictionary", label: "واژه‌نامهٔ اوستایی" },
  { href: "/quiz", label: "آزمون‌ها" },
  { href: "/progress", label: "کارنامه" },
  { href: "/sources", label: "منابع علمی" },
  { href: "/about", label: "دربارهٔ آویستا" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  // قفل اسکرول بدنه هنگام باز بودن کشوی موبایل
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--av-border)] bg-[var(--av-bg)]/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* راست: لوگو و پیوندهای دسکتاپ */}
          <div className="flex items-center gap-7">
            <Logo />
            <nav
              className="hidden lg:flex items-center gap-5"
              aria-label="ناوبری اصلی"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold text-[var(--av-text-muted)] transition-colors hover:text-[var(--av-text)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* چپ: دکمهٔ حمایت، پوسته و کلید منو */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* دکمهٔ حمایت در هدر */}
            <button
              type="button"
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-semibold text-[var(--av-accent)] border border-[var(--av-accent)]/30 bg-[var(--av-accent-soft)] hover:bg-[var(--av-accent)] hover:text-white rounded-[6px] transition-all cursor-pointer"
              title="حمایت مالی از پروژه"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">یک پیاله چای</span>
            </button>

            <ThemeToggle />

            {/* دکمه همبرگری موبایل */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--av-border)] bg-[var(--av-surface)] text-[var(--av-text)] cursor-pointer hover:bg-[var(--av-surface-soft)] transition-colors"
              aria-label="باز کردن منوی ناوبری"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* منوی کشویی انیمیشنی (Slide-over Drawer) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* لایهٔ تیره و مات پس‌زمینه */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setDrawerOpen(false)}
          />

          {/* بدنهٔ منو که از سمت راست با اسلاید نرم وارد می‌شود */}
          <div className="fixed inset-y-0 right-0 z-50 w-[280px] sm:w-[320px] bg-[var(--av-surface)] border-l border-[var(--av-border)] p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 ease-out">
            <div>
              {/* سربرگ دراور */}
              <div className="flex items-center justify-between border-b border-[var(--av-border)] pb-4 mb-6">
                <Logo />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-[4px] text-[var(--av-text-muted)] hover:text-[var(--av-text)] cursor-pointer"
                  aria-label="بستن منو"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* فهرست پیوندها */}
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-[6px] text-xs font-semibold text-[var(--av-text)] hover:bg-[var(--av-surface-soft)] hover:text-[var(--av-accent)] transition-all"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-[var(--av-text-muted)] font-mono">
                      ←
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* پانویس منو و اقدام حمایت */}
            <div className="border-t border-[var(--av-border)] pt-4 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setDonateOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 h-10 text-xs font-bold text-[var(--av-accent)] border border-[var(--av-accent)]/40 bg-[var(--av-accent-soft)] rounded-[6px] cursor-pointer"
              >
                <Coffee className="h-4 w-4" />
                <span>همیاری (یک پیاله چای)</span>
              </button>

              <Link
                href="/learn"
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center justify-center h-10 text-xs font-bold text-white bg-[var(--av-primary)] rounded-[6px]"
              >
                آغاز یادگیری دبیره
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* پنجرهٔ مودال همیاری */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
