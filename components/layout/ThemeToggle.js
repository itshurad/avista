"use client";

import { useTheme } from "./Providers";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[var(--av-border)] bg-[var(--av-surface)] text-[var(--av-text-muted)] transition-colors hover:text-[var(--av-text)] hover:bg-[var(--av-surface-soft)] cursor-pointer"
      aria-label={
        theme === "light" ? "تغییر به حالت تاریک" : "تغییر به حالت روشن"
      }
      title={theme === "light" ? "تغییر به حالت تاریک" : "تغییر به حالت روشن"}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
}
