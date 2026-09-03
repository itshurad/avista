"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import DonateModal from "@/components/shared/DonateModal";
import { Menu, X, Coffee, ArrowLeft } from "lucide-react";

const navItems = [
  { href: "/learn", label: "یادگیری" },
  { href: "/dictionary", label: "واژه‌نامه" },
  { href: "/quiz", label: "آزمون‌ها" },
  { href: "/progress", label: "کارنامه" },
  { href: "/sources", label: "منابع" },
  { href: "/about", label: "درباره" },
];

export default function Header() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="sticky top-3 sm:top-5 z-40 w-full px-3 sm:px-6">
        <div className="mx-auto flex h-12 max-w-4xl items-center justify-between rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)]/75 px-3 shadow-[var(--av-card-shadow)] backdrop-blur-xl transition-all">
          {/* لوگو و پیوندها */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Logo />

            <nav
              className="hidden md:flex items-center gap-0.5"
              aria-label="ناوبری اصلی"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredPath(item.href)}
                    className="relative px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none"
                  >
                    {/* لایه هاور مغناطیسی فلوید */}
                    {hoveredPath === item.href && (
                      <motion.div
                        layoutId="navHover"
                        className="absolute inset-0 rounded-full bg-[var(--av-surface-subtle)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* نشانگر تب فعال جاری */}
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full bg-[var(--av-brand-soft)] border border-[var(--av-brand)]/20"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 select-none ${
                        isActive
                          ? "text-[var(--av-brand)] font-bold"
                          : "text-[var(--av-text-secondary)] hover:text-[var(--av-text)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ابزارها و اکشن‌ها */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDonateOpen(true)}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-[var(--av-brand)] bg-[var(--av-brand-soft)] hover:bg-[var(--av-brand)] hover:text-white rounded-full transition-all cursor-pointer select-none"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">حمایت</span>
            </motion.button>

            <ThemeToggle />

            {/* کلید منوی موبایل */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full text-[var(--av-text)] bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] cursor-pointer"
              aria-label="باز کردن منو"
            >
              <Menu className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* منوی شناور مدرن موبایل */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden p-3 flex flex-col justify-start">
            {/* لایه محو شیشه‌ای پس‌زمینه */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* کادر شناور منو */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-5 shadow-[var(--av-floating-shadow)] z-10"
            >
              <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-3 mb-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--av-surface-subtle)] text-[var(--av-text-muted)] hover:text-[var(--av-text)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1 mb-5">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--av-brand-soft)] text-[var(--av-brand)] font-bold"
                          : "text-[var(--av-text)] hover:bg-[var(--av-surface-subtle)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <ArrowLeft className="h-3.5 w-3.5 text-[var(--av-brand)]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-[var(--av-surface-border)]">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    setDonateOpen(true);
                  }}
                  className="w-full h-10 flex items-center justify-center gap-1.5 text-xs font-bold text-[var(--av-brand)] bg-[var(--av-brand-soft)] rounded-xl cursor-pointer"
                >
                  <Coffee className="h-4 w-4" />
                  <span>یک پیاله چای (مهرانه)</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
