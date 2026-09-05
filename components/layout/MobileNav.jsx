// components/layout/MobileNav.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, LibraryBig, Keyboard, Sparkles, Trophy } from "lucide-react";

const items = [
  { href: "/learn", label: "یادگیری", icon: BookOpen },
  { href: "/keyboard", label: "کیبورد", icon: Keyboard },
  { href: "/dictionary", label: "واژه‌ها", icon: LibraryBig },
  { href: "/quiz", label: "آزمون", icon: Sparkles },
  { href: "/progress", label: "کارنامه", icon: Trophy },
];

function haptic(ms = 8) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ناوبری سریع موبایل"
      className="fixed inset-x-2.5 bottom-2.5 z-40 lg:hidden pointer-events-none"
    >
      <div className="av-glass pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-0.5 rounded-[1.35rem] p-1.5 shadow-[var(--av-floating-shadow)] border border-[var(--av-surface-border)]/80 backdrop-blur-xl">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => haptic()}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 px-1 text-[10px] font-medium touch-manipulation select-none outline-none focus:outline-none"
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl bg-[var(--av-brand-soft)] border border-[var(--av-brand)]/25"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <Icon
                className={`relative z-10 h-4 w-4 transition-transform duration-200 ${
                  active
                    ? "scale-110 text-[var(--av-brand)]"
                    : "text-[var(--av-text-muted)] group-active:scale-95"
                }`}
              />

              <span
                className={`relative z-10 tracking-tight leading-none ${
                  active
                    ? "font-bold text-[var(--av-brand)]"
                    : "text-[var(--av-text-secondary)]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
