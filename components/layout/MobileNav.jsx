"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, LibraryBig, Trophy, Sparkles } from "lucide-react";

const items = [
  { href: "/learn", label: "یادگیری", icon: BookOpen },
  { href: "/dictionary", label: "واژه‌ها", icon: LibraryBig },
  { href: "/quiz", label: "آزمون", icon: Sparkles },
  { href: "/progress", label: "کارنامه", icon: Trophy },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ناوبری سریع"
      className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
    >
      <div className="av-glass mx-auto flex max-w-md items-center justify-around rounded-[1.35rem] px-2 py-2 shadow-[var(--av-floating-shadow)]">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex min-w-16 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-semibold"
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-xl bg-[var(--av-brand-soft)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon className={`relative z-10 h-4 w-4 ${active ? "text-[var(--av-brand)]" : "text-[var(--av-text-muted)]"}`} />
              <span className={`relative z-10 ${active ? "text-[var(--av-brand)]" : "text-[var(--av-text-secondary)]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
