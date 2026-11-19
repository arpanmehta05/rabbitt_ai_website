"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

// The four numbers, in the products card's blue gradient, from the Figma "Stats card – grow on scroll"
// frames. The card starts as the normal inset card (24px side gap, 20px corners, 440px high), grows
// to the whole screen as it scrolls in, holds there (the section is taller than the screen and the
// card sticks to it) while the numbers count up, then shrinks back and scrolls away. One value, `size`
// from 0 to 1, drives the gap, the corners and the height. Reduced motion: the plain inset card with
// the final numbers, no pin, no count-up. Below 1024px it is the same, in a two-by-two grid.

const STATS = [
  { value: 15, label: "Industry experts", desc: "Global leaders across enterprise AI" },
  { value: 15, label: "Case studies", desc: "Production deployments and architectures" },
  { value: 15, label: "Industries", desc: "Covering tech, finance, health & public sector" },
  { value: 5, label: "Continents", desc: "Global perspective on AI transformation" },
];

function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const c = animate(0, to, { duration: 0.9, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [run, to]);
  return <>{run ? n : 0}</>;
}

function Card({ counted, still }: { counted: boolean; still?: boolean }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 motion-safe:[&>span]:animate-[rb-drift_24s_ease-in-out_infinite_alternate]"
      >
        <span className="absolute -left-[10%] -top-[20%] h-[90%] w-[55%] rounded-full bg-[#0061ff]/55 blur-[110px]" />
        <span className="absolute left-[45%] top-[5%] h-[95%] w-[70%] rounded-full bg-[#4d9bff]/40 blur-[110px]" />
        <span className="absolute left-[25%] top-[55%] h-[70%] w-[50%] rounded-full bg-[#1a47d6]/60 blur-[110px]" />
        <span className="absolute -left-[15%] top-[45%] h-[60%] w-[50%] rounded-full bg-black/50 blur-[110px]" />
      </div>
      <div className="rb-container flex h-full items-center">
        <ul className="grid w-full grid-cols-2 gap-x-5 gap-y-12 py-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <li
              key={s.label}
              className={`relative ${i > 0 ? "lg:before:absolute lg:before:-left-2.5 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-white/25" : ""} ${
                i % 2 === 1 ? "max-lg:before:absolute max-lg:before:-left-2.5 max-lg:before:top-0 max-lg:before:h-full max-lg:before:w-px max-lg:before:bg-white/25" : ""
              }`}
            >
              <p className="text-[clamp(4.5rem,8.9vw,128px)] font-semibold leading-none tracking-[-0.045em] text-white tabular-nums">
                {still ? s.value : <Count to={s.value} run={counted} />}
              </p>
              <p className="mt-9 text-xl font-medium tracking-[-0.01em] text-white lg:mt-12">{s.label}</p>
              <p className="mt-2 max-w-[17rem] text-[15px] leading-[1.5] text-white/80">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function AinamaStats() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // 0 to 1 while it comes in, 1 while it is pinned, back to 0 as it leaves
  const size = useTransform(scrollYProgress, [0.12, 0.45, 0.55, 0.88], [0, 1, 1, 0]);
  const inset = useTransform(size, (v) => `${24 * (1 - v)}px`);
  const radius = useTransform(size, (v) => `${20 * (1 - v)}px`);
  const height = useTransform(size, (v) => `calc(${440 * (1 - v)}px + ${v * 100}svh)`);
  useMotionValueEvent(size, "change", (v) => {
    if (v > 0.9 && !counted) setCounted(true);
  });

  if (reduce) {
    return (
      <section aria-label="AINama in numbers" className="bg-page px-3 py-6 sm:px-6 sm:py-12">
        <div className="relative isolate overflow-hidden rounded-[20px] bg-[#050d29] lg:min-h-[440px]">
          <Card counted still />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="AINama in numbers" className="relative h-[120svh] bg-page">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div
          style={{ marginInline: inset, borderRadius: radius, height }}
          className="relative isolate w-full overflow-hidden bg-[#050d29] will-change-[height]"
        >
          <Card counted={counted} />
        </motion.div>
      </div>
    </section>
  );
}
