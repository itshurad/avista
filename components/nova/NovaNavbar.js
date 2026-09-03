"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/layout/Providers";
import NovaButton from "./NovaButton";
import DonateModal from "@/components/shared/DonateModal";
import {
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  BookOpen,
  GraduationCap,
  BarChart3,
  Coffee,
  Layers,
} from "lucide-react";

const navLinks = [
  { href: "/learn", label: "مسیر یادگیری", icon: GraduationCap },
  { href: "/dictionary", label: "واژه‌نامه", icon: BookOpen },
  { href: "/quiz", label: "آزمون‌ها", icon: Compass },
  { href: "/progress", label: "پیشخوان پیشرفت", icon: BarChart3 },
  { href: "/about", label: "دربارهٔ پروژه", icon: Layers },
];

export default function NovaNavbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] nova-surface-glass transition-colors">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--accent)] shadow-[var(--shadow-xs)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[0_4px_14px_var(--accent-glow)]">
              <span className="avestan-glyph text-xl font-bold">𐬀</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-[var(--foreground)] leading-none">
                آویستا{" "}
                <span className="text-[var(--accent)] font-mono text-xs">
                  NOVA
                </span>
              </span>
              <span className="text-[11px] font-medium text-[var(--foreground-muted)] mt-1">
                دبیره و واژگان اوستایی
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav
            className="hidden md:flex items-center gap-1.5"
            aria-label="ناوبری اصلی"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-bold transition-all duration-200 rounded-[var(--radius-md)] ${
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent)]/10"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-2.5">
            {/* Donate Modal Trigger */}
            <NovaButton
              size="sm"
              variant="secondary"
              onClick={() => setDonateOpen(true)}
              className="hidden sm:inline-flex"
            >
              <Coffee className="w-3.5 h-3.5 text-[var(--accent)] ml-1" />
              یک پیاله چای
            </NovaButton>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] hover:border-[var(--border-focus)] shadow-[var(--shadow-xs)] cursor-pointer"
              aria-label="تغییر تم رنگی"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors cursor-pointer"
              aria-label="باز کردن منو"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-[290px] bg-[var(--surface)] border-l border-[var(--border)] p-6 shadow-[var(--shadow-lg)] flex flex-col justify-between animate-in slide-in-from-right duration-250 ease-out">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <span className="text-sm font-black text-[var(--foreground)]">
                  منوی ناوبری
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-[var(--radius-md)] text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-[var(--accent)] text-white"
                          : "text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-[var(--border)]">
              <NovaButton
                size="md"
                variant="secondary"
                onClick={() => {
                  setMobileOpen(false);
                  setDonateOpen(true);
                }}
                className="w-full"
              >
                <Coffee className="w-4 h-4 text-[var(--accent)] ml-1" />
                یک پیاله چای
              </NovaButton>

              <NovaButton
                size="md"
                variant="primary"
                href="/learn"
                onClick={() => setMobileOpen(false)}
                className="w-full"
              >
                آغاز یادگیری
              </NovaButton>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
