"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A quiet band under the hero. The companies are shown five at a time, and every few seconds the
// whole row changes together to the next five, fading out and in as one.

const POOL: { name: string; src: string; scale?: number }[] = [
  { name: "Groww", src: "/brands/groww.png" },
  { name: "Cars24", src: "/brands/cars24.png" },
  { name: "Paytm", src: "/brands/paytm.svg" },
  { name: "Acko", src: "/brands/acko.svg" },
  { name: "Unacademy", src: "/brands/unacademy.svg" },
  { name: "Darwinbox", src: "/brands/darwinbox.webp" },
  { name: "Spinny", src: "/brands/spinny.svg", scale: 1.9 },
  { name: "Square Yards", src: "/brands/squareyards.svg" },
  { name: "Tata 1mg", src: "/brands/tata1mg.svg" },
  { name: "Groww", src: "/brands/groww.png" },
];
const PER = 5;
const GROUPS = Math.floor(POOL.length / PER);

export default function Logos() {
  const [group, setGroup] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setGroup((g) => (g + 1) % GROUPS), 3600);
    return () => clearInterval(id);
  }, []);

  const shown = POOL.slice(group * PER, group * PER + PER);

  return (
    <section aria-label="Trusted by" className="bg-white px-5 py-14 sm:px-8 md:py-16">
      <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-black/40">Trusted by teams at</p>
      <div className="relative mx-auto mt-8 h-20 max-w-[1100px]">
        <AnimatePresence mode="wait">
          <motion.ul
            key={group}
            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-between gap-6"
          >
            {shown.map((l, i) => (
              <li key={l.name + i} className={`flex h-full flex-1 items-center justify-center ${i > 2 ? "hidden sm:flex" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.src} alt={l.name} className="w-auto max-w-[170px] object-contain opacity-80" style={{ filter: "grayscale(1) contrast(1.7) brightness(0.55)", height: `${2 * (l.scale ?? 1)}rem` }} />
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}
