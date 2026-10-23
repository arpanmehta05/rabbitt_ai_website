"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.classList.toggle("dark");
    try {
      localStorage.setItem("rabbitt_theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/70 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-white/80 dark:hover:bg-white/10"
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
