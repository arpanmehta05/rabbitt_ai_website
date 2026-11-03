"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// The client logos, after the hero on adyen.com. The row sits at the bottom of the first screen and
// stays there while that screen scrolls away; the logos change a few at a time. Then the row is
// released and lands just below the hero, and scrolls on with the page. It stops there and goes no
// further.
//
// How it stays and lands: this block is the first thing after the hero and is `sticky` at the
// bottom of the screen. While its own place in the page is still below, it is held at the bottom;
// once the hero has scrolled past, its place arrives and it scrolls like anything else.
//
// It has no bar, no band and no colour of its own: plain white logos on the same dark page as the
// hero, so it never reads as a section of its own.

// wordmarks on a transparent background only; the app-style square icons stay out of this strip
const POOL: { name: string; file: string; scale?: number }[] = [
  { name: "Groww", file: "groww.png" },
  { name: "Cars24", file: "cars24.png" },
  { name: "Paytm", file: "paytm.svg" },
  { name: "Acko", file: "acko.svg" },
  { name: "Unacademy", file: "unacademy.svg" },
  { name: "Darwinbox", file: "darwinbox.webp" },
  { name: "Spinny", file: "spinny.svg", scale: 1.9 },
  { name: "Square Yards", file: "squareyards.svg" },
  { name: "Tata 1mg", file: "tata1mg.svg" },
  { name: "Acko Drive", file: "ackodrive.webp" },
];

// the version made for dark backgrounds (always a png)
const whiteSrc = (file: string) => `/brands/dark/${file.replace(/\.[^.]+$/, "")}.png`;

const EASE = [0.16, 1, 0.3, 1] as const;
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -16, filter: "blur(6px)", transition: { duration: 0.3, ease: EASE } },
};

export default function CompaniesStrip() {
  const reduce = useReducedMotion() ?? false;
  const [group, setGroup] = useState(0);
  const [size, setSize] = useState(5); // logos on screen at once; fewer on a phone

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSize(mq.matches ? 3 : 5);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setGroup((g) => g + 1), 3800);
    return () => clearInterval(id);
  }, [reduce]);

  const shown = Array.from({ length: size }, (_, k) => POOL[(group * size + k) % POOL.length]);

  return (
    <div className="rb-container pointer-events-none sticky bottom-6 z-20 my-12" aria-label="Trusted by">
      <p className="sr-only">Trusted by teams at {POOL.map((l) => l.name).join(", ")}.</p>
      <div className="h-[72px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={group}
            variants={list}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit="exit"
            className="flex h-full items-center justify-between gap-4"
          >
            {shown.map((l, i) => (
              <li key={l.name + i} className="flex h-full flex-1 items-center justify-center">
                <motion.span variants={item} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={whiteSrc(l.file)}
                    alt={l.name}
                    className="w-auto max-w-[130px] object-contain opacity-90 sm:max-w-[170px]"
                    style={{ height: `${1.7 * (l.scale ?? 1)}rem` }}
                  />
                </motion.span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
