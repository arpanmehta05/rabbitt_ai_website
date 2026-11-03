"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navGroups, type NavGroup, type NavItem } from "./navData";

const isExternal = (href: string) => href.startsWith("http");

// a long ease-out, so things settle into place rather than stop
const EASE = [0.22, 1, 0.36, 1] as const;

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

// one entry of a menu: a name, what it is, and on the right a product's logo. Plain text; the name
// turns blue and an arrow appears on hover.
function MenuItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const className = "group block rounded-lg py-3 pr-4";
  const body = (
    <>
      <span className="flex items-center gap-2">
        <span className="text-[17px] font-medium tracking-[-0.01em] text-[#05060a] transition-colors group-hover:text-brand dark:text-white dark:group-hover:text-brand-text">
          {item.label}
        </span>
        <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 dark:text-brand-text" />
        <Logo item={item} />
      </span>
      {item.detail && (
        <span className="mt-1.5 block max-w-[34ch] text-[14px] leading-snug text-black/55 dark:text-white/55">
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

const GLYPHS_UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&{}*<>/#%";
const GLYPHS_LOW = "abcdefghijklmnopqrstuvwxyz0123456789&{}*<>/#%";

// Text that decodes: every letter flickers through random characters and then settles, from left
// to right, until the real text is there. Used for the headings of the menus. Screen readers get
// the real text at once, and with reduced motion there is no flicker.
function Scramble({ text, delay = 0, duration = 650 }: { text: string; delay?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (reduce) return;
    const pick = (ch: string) => {
      if (ch === " ") return " ";
      const upper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
      const set = upper ? GLYPHS_UP : GLYPHS_LOW;
      return set[Math.floor(Math.random() * set.length)];
    };
    const start = performance.now() + delay;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 45) {
        last = now;
        const p = Math.min(Math.max((now - start) / duration, 0), 1);
        if (p >= 1) {
          setShown(text);
          return;
        }
        const settled = Math.floor(p * text.length);
        setShown(
          text
            .split("")
            .map((ch, i) => (i < settled ? ch : pick(ch)))
            .join(""),
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, duration, reduce]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{shown}</span>
    </>
  );
}

const sectionLabel = "text-[12px] font-medium uppercase tracking-[0.08em] text-black/55 dark:text-white/55";

// each part of the panel rises into place a moment after the one before it
function Reveal({ i, className = "", children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.06 + i * 0.035, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// The dropdown, after the one on adyen.com: a wide panel hanging from the bar. On the left the name
// of the menu and one line about it; on the right the entries in groups under small labels. It
// closes when the pointer leaves, on Escape, or on a click on the page behind it.
function Panel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const sections = group.sections ?? [];
  const multi = sections.length > 1;
  let n = 0;
  return (
    <div className="rb-container relative grid gap-10 pb-14 pt-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
      <Reveal i={0}>
        <h2 className="text-[clamp(1.75rem,2.4vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[#05060a] dark:text-white">
          <Scramble text={group.label} delay={60} duration={620} />
        </h2>
        {group.lead && (
          <p className="mt-4 max-w-[26ch] text-[18px] leading-snug text-black/60 dark:text-white/60">
            {group.lead.title}
          </p>
        )}
        {group.lead?.cta && (
          <Link
            href={group.lead.cta.href}
            onClick={onNavigate}
            className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-[#05060a] transition-colors hover:text-brand dark:text-white dark:hover:text-brand-text"
          >
            {group.lead.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </Reveal>

      <div className={`grid min-w-0 gap-x-12 gap-y-6 ${multi ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
        {multi ? (
          sections.map((section, s) => (
            <div key={s}>
              {section.title && (
                <Reveal i={++n}>
                  <p className={`${sectionLabel} pb-3`}>
                    <Scramble text={section.title} delay={140} duration={560} />
                  </p>
                </Reveal>
              )}
              {section.items.map((item) => (
                <Reveal key={item.label} i={++n}>
                  <MenuItem item={item} onNavigate={onNavigate} />
                </Reveal>
              ))}
            </div>
          ))
        ) : (
          <>
            {sections[0]?.title && (
              <Reveal i={++n} className="sm:col-span-full">
                <p className={sectionLabel}>
                  <Scramble text={sections[0].title} delay={140} duration={560} />
                </p>
              </Reveal>
            )}
            {sections
              .flatMap((s) => s.items)
              .map((item) => (
                <Reveal key={item.label} i={++n}>
                  <MenuItem item={item} onNavigate={onNavigate} />
                </Reveal>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

const triggerClass =
  "relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[15px] text-black/65 transition-colors hover:text-black dark:text-white/65 dark:hover:text-white";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [hover, setHover] = useState<string | null>(null); // which item the pointer is on
  const [scrolled, setScrolled] = useState(false);
  // the bar takes the theme of the section it is over: sections mark themselves with data-nav-theme
  const [dark, setDark] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLElement>(null);

  // Compact bar, after the one on adyen.com. Scrolling down folds the bar into a small card at the
  // top left (logo and menu). It opens again when the pointer comes to it, and as soon as the
  // page is scrolled up, even a little, without having to reach the top.
  const [compact, setCompact] = useState(false);
  const [pointerIn, setPointerIn] = useState(false); // the pointer is on the card or the bar
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setPointerIn(true);
  };
  const pointerLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setPointerIn(false), 350);
  };

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    let anchor = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) {
        // back at the top: the full bar, over the hero
        setCompact(false);
        anchor = y;
      } else if (y > anchor + 12) {
        // scrolling down: fold up, unless the pointer is on the bar (a touch screen has no hover)
        anchor = y;
        setCompact(true);
        const onBar = wrapRef.current?.matches(":hover") || cardRef.current?.matches(":hover");
        if (!canHover || !onBar) setPointerIn(false);
      } else if (y < anchor - 6) {
        // scrolling up, even a little: open again
        anchor = y;
        setCompact(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let theme = "light";
      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= 34 && r.bottom > 34) theme = el.dataset.navTheme ?? theme;
      });
      setDark(theme === "dark");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    probe();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // a section can change its own theme without any scrolling
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-nav-theme"] });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
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
  // the full bar shows at the top, while the pointer is on it, while a menu is open, and on the way up
  const expanded = !compact || pointerIn || open || openMenu !== null;

  return (
    <div className={dark ? "dark" : ""}>
      {/* the compact card */}
      <div
        ref={cardRef}
        inert={expanded}
        onPointerEnter={pointerEnter}
        className={`fixed left-4 top-4 z-50 origin-top-left transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:left-8 sm:top-5 ${
          expanded ? "pointer-events-none -translate-y-3 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <div className="flex items-center gap-1 rounded-xl border border-black/10 bg-white py-2 pl-3 pr-2 shadow-[0_12px_32px_-12px_rgba(5,6,10,0.35)] dark:border-white/15 dark:bg-raised dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)]">
          <Link href="/" aria-label="Rabbitt AI home" className="flex items-center">
            <Image src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
          </Link>
          <span aria-hidden className="mx-2 h-6 w-px bg-black/10 dark:bg-white/15" />
          <button
            type="button"
            aria-label="Open the menu"
            onClick={pointerEnter}
            onFocus={pointerEnter}
            className="grid h-11 w-11 place-items-center rounded-lg text-[#05060a] transition-colors hover:bg-black/[0.06] dark:text-white dark:hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* a dim, softly blurred veil over the page while a menu is open */}
      <AnimatePresence>
        {group && group.sections && (
          <motion.div
            key="veil"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={closeAll}
            className="fixed inset-0 z-40 hidden bg-[#02050f]/45 backdrop-blur-[3px] lg:block"
          />
        )}
      </AnimatePresence>

    <header
      ref={wrapRef}
      inert={!expanded}
      onPointerEnter={pointerEnter}
      onPointerLeave={pointerLeave}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,opacity,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        expanded ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      } ${
        openMenu !== null || open
          ? "border-black/[0.08] bg-white dark:border-white/10 dark:bg-raised"
          : solid
            ? "border-black/[0.08] bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-raised/90"
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="relative">
        <div className="rb-container relative flex h-16 items-center justify-between">
          <Link href="/" className="flex h-11 items-center gap-3" aria-label="Rabbitt AI home">
            <Image src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10" priority />
            <span className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-[#05060a] dark:text-white">
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
                  className="absolute inset-0 rounded-lg bg-black/[0.06] dark:bg-white/10"
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
            <Link
              href="/contactus"
              className="group inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
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

        {/* desktop dropdown: hangs from the bar, as wide as the bar */}
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <AnimatePresence>
            {group && group.sections && (
              // one panel that grows from the bar and stays while any menu is open; only its
              // contents change from one menu to the next
              <motion.div
                key="panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden border-b border-black/[0.08] bg-white shadow-[0_40px_60px_-40px_rgba(0,30,120,0.3)] dark:border-white/10 dark:bg-raised dark:shadow-[0_40px_60px_-40px_rgba(0,0,0,0.8)]"
                onMouseEnter={cancelClose}
                onMouseLeave={leave}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Panel group={group} onNavigate={closeAll} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {open && (
          // data-lenis-prevent: this panel scrolls natively, not with the page's smooth scroll
          <div data-lenis-prevent className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-black/[0.08] px-6 pb-6 pt-2 dark:border-white/10 lg:hidden">
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
                            className="mt-1 inline-flex items-center gap-1.5 py-2 text-[15px] font-medium text-brand dark:text-brand-text"
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
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
    </div>
  );
}
