"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { navGroups, type NavGroup, type NavItem } from "./navData";

const isExternal = (href: string) => href.startsWith("http");

// a product's logo, small, on the right of its name
function Logo({ item }: { item: NavItem }) {
  if (!item.logo) return null;
  const img = "h-auto max-h-6 w-auto max-w-[4.5rem] object-contain";
  return (
    <span className="ml-auto flex shrink-0 items-center">
      <Image
        src={item.logoLight ?? item.logo}
        alt=""
        width={72}
        height={24}
        className={`${img} ${item.logoLight ? "dark:hidden" : ""}`}
      />
      {item.logoLight && <Image src={item.logo} alt="" width={72} height={24} className={`${img} hidden dark:block`} />}
    </span>
  );
}

// one entry of a menu: a name, what it is, and on the right a product's logo. Plain text on a
// hairline; the name turns blue and an arrow appears on hover.
function MenuItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const className = "group block border-t border-black/[0.1] py-5 pr-4 dark:border-white/[0.12]";
  const body = (
    <>
      <span className="flex items-center gap-2">
        <span className="text-[17px] font-medium tracking-[-0.01em] text-[#05060a] transition-colors group-hover:text-[#0061ff] dark:text-white dark:group-hover:text-[#4d9bff]">
          {item.label}
        </span>
        <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-[#0061ff] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 dark:text-[#4d9bff]" />
        <Logo item={item} />
      </span>
      {item.detail && (
        <span className="mt-1.5 block max-w-[28ch] text-[14px] leading-snug text-black/55 dark:text-white/55">
          {item.detail}
        </span>
      )}
    </>
  );
  return isExternal(item.href) ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
      {body}
    </a>
  ) : (
    <Link href={item.href} onClick={onNavigate} className={className}>
      {body}
    </Link>
  );
}

// the dropdown: a flat panel hanging from the bar. A short lead on the left, the items on a grid.
function Panel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const sections = group.sections ?? [];
  const multi = sections.length > 1;
  return (
    <div className="mx-auto flex max-w-[1400px] gap-14 px-6 pb-10 pt-8 lg:px-10">
      <div className="hidden w-[260px] shrink-0 xl:block">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
          {group.label}
        </p>
        {group.lead && (
          <p
            className="mt-4 text-[1.6rem] font-light leading-[1.18] tracking-[-0.035em] text-[#05060a] dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {group.lead.title}
          </p>
        )}
        {group.lead?.cta && (
          <Link
            href={group.lead.cta.href}
            onClick={onNavigate}
            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#05060a] transition-colors hover:text-[#0061ff] dark:text-white dark:hover:text-[#4d9bff]"
          >
            {group.lead.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className={`grid min-w-0 flex-1 gap-x-10 grid-cols-3`}>
        {multi
          ? sections.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <p className="pb-4 text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                    {section.title}
                  </p>
                )}
                <div>
                  {section.items.map((item) => (
                    <MenuItem key={item.label} item={item} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            ))
          : sections
              .flatMap((s) => s.items)
              .map((item) => <MenuItem key={item.label} item={item} onNavigate={onNavigate} />)}
      </div>
    </div>
  );
}

const triggerClass =
  "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] text-black/65 transition-colors hover:text-black dark:text-white/65 dark:hover:text-white";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [hover, setHover] = useState<string | null>(null); // which item the pointer is on
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdowns on Escape or a click outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setHover(null);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setHover(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const enter = (label: string, hasMenu: boolean) => {
    cancelClose();
    setHover(label);
    setOpenMenu(hasMenu ? label : null);
  };
  const leave = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setHover(null);
    }, 160);
  };
  const closeAll = () => {
    setOpenMenu(null);
    setHover(null);
    setOpen(false);
  };

  const lit = openMenu ?? hover;
  const solid = scrolled || open || openMenu !== null;
  const group = navGroups.find((g) => g.label === openMenu);

  return (
    <header
      ref={wrapRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        openMenu !== null || open
          ? "border-black/[0.08] bg-white dark:border-white/10 dark:bg-[#070d20]"
          : solid
            ? "border-black/[0.08] bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#04060c]/85"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="relative">
        <div className="relative mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Rabbitt AI home">
            <Image src="/logo.svg" alt="" width={44} height={44} className="h-11 w-11" priority />
            <span
              className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text pb-0.5 text-[1.65rem] font-semibold leading-none tracking-[-0.045em] text-transparent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Rabbitt AI
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
            aria-label="Main"
            onMouseLeave={leave}
          >
            {navGroups.map((g) => {
              const highlight = lit === g.label && (
                <motion.span
                  layoutId="nav-hover"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-full bg-black/[0.06] dark:bg-white/10"
                />
              );
              return g.href ? (
                <Link
                  key={g.label}
                  href={g.href}
                  onMouseEnter={() => enter(g.label, false)}
                  className={triggerClass}
                >
                  {highlight}
                  <span className="relative">{g.label}</span>
                </Link>
              ) : (
                <button
                  key={g.label}
                  type="button"
                  aria-expanded={openMenu === g.label}
                  aria-haspopup="true"
                  onMouseEnter={() => enter(g.label, true)}
                  // a mouse click opens (hovering has already opened it); only the keyboard toggles
                  onClick={(e) => setOpenMenu((m) => (e.detail === 0 && m === g.label ? null : g.label))}
                  className={`${triggerClass} ${openMenu === g.label ? "!text-black dark:!text-white" : ""}`}
                >
                  {highlight}
                  <span className="relative">{g.label}</span>
                  <ChevronDown
                    className={`relative h-4 w-4 transition-transform duration-200 ${openMenu === g.label ? "rotate-180" : ""}`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="/contactus"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0061ff] py-1.5 pl-5 pr-1.5 text-[15px] font-medium text-white shadow-[0_12px_28px_-14px_rgba(0,97,255,0.9)] transition-colors hover:bg-[#1a47d6]"
            >
              Book a demo
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0061ff] transition-transform duration-300 group-hover:-rotate-45">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="rounded-full p-2 text-black/70 dark:text-white/80"
            >
              {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* desktop dropdown: hangs from the bar, as wide as the bar */}
        <div className="pointer-events-none absolute inset-x-0 top-full hidden lg:block">
          <AnimatePresence>
            {group && group.sections && (
              // absolute, so a panel on its way out never pushes the next one down
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
                className="pointer-events-auto absolute inset-x-0 top-0 border-b border-black/[0.08] bg-white shadow-[0_40px_60px_-40px_rgba(0,30,120,0.3)] dark:border-white/10 dark:bg-[#070d20] dark:shadow-[0_40px_60px_-40px_rgba(0,0,0,0.8)]"
                onMouseEnter={cancelClose}
                onMouseLeave={leave}
              >
                <Panel group={group} onNavigate={closeAll} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {open && (
          <div className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-black/[0.08] px-6 pb-6 pt-2 dark:border-white/10 lg:hidden">
            <nav className="flex flex-col" aria-label="Mobile">
              {navGroups.map((g) =>
                g.href ? (
                  <Link
                    key={g.label}
                    href={g.href}
                    onClick={closeAll}
                    className="border-b border-black/[0.07] px-1 py-4 text-lg text-black/85 dark:border-white/10 dark:text-white/85"
                  >
                    {g.label}
                  </Link>
                ) : (
                  <div key={g.label} className="border-b border-black/[0.07] dark:border-white/10">
                    <button
                      type="button"
                      aria-expanded={mobileGroup === g.label}
                      onClick={() => setMobileGroup((m) => (m === g.label ? null : g.label))}
                      className="flex w-full items-center justify-between px-1 py-4 text-lg text-black/85 dark:text-white/85"
                    >
                      {g.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${mobileGroup === g.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileGroup === g.label && (
                      <div className="pb-3">
                        {g.sections?.flatMap((s) => s.items).map((item) => (
                          <MenuItem key={item.label} item={item} onNavigate={closeAll} />
                        ))}
                        {g.lead?.cta && (
                          <Link
                            href={g.lead.cta.href}
                            onClick={closeAll}
                            className="mt-1 inline-flex items-center gap-1.5 py-2 text-[15px] font-medium text-[#0061ff] dark:text-[#4d9bff]"
                          >
                            {g.lead.cta.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ),
              )}
            </nav>
            <Link
              href="/contactus"
              onClick={closeAll}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0061ff] py-3.5 text-[15px] font-medium text-white"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
