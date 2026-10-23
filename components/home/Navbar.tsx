"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Products", href: "/products" },
  { label: "Data", href: "/services/data-annotation" },
  { label: "Services", href: "/services/content-writing" },
  { label: "Resources", href: "/blogs" },
  { label: "AINama", href: "/ainama" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-black/[0.08] bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#04060c]/80"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3.5" aria-label="Rabbitt AI home">
          <Image src="/logo.svg" alt="" width={56} height={56} className="h-14 w-14" priority />
          <span
            className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text pb-0.5 text-[1.9rem] font-semibold leading-none tracking-[-0.045em] text-transparent"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Rabbitt AI
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-base text-black/60 transition-colors hover:text-black dark:text-white/65 dark:hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contactus"
            className="group inline-flex items-center gap-2 rounded-full bg-[#05060a] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#0061ff] dark:bg-white dark:text-[#04060c] dark:hover:bg-[#0061ff] dark:hover:text-white"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-lg p-2 text-black/70 dark:text-white/80"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.08] px-6 pb-6 pt-3 dark:border-white/10 lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-black/80 dark:text-white/80"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contactus"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#05060a] py-3.5 text-[15px] font-medium text-white dark:bg-white dark:text-[#04060c]"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
