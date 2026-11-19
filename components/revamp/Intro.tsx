"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import InView from "./InView";

// The first section after the hero. On the left, a drawing of a website taken apart into its three
// layers (content, design, code) that draws itself in as it scrolls into view; on the right a
// statement whose words light up one by one as you scroll through it, With reduced
// motion the words are simply all lit.

const TEXT =
  "Most websites are not broken. They are quietly losing people, one slow page, one unclear button, one missing label at a time. Rabbitt finds where, and rebuilds the site so every page does the one job it exists for.";

function Word({ word, i, n, p, still }: { word: string; i: number; n: number; p: MotionValue<number>; still: boolean }) {
  const o = useTransform(p, [i / n, Math.min((i + 1.6) / n, 1)], [0.25, 1]);
  return (
    <motion.span style={still ? undefined : { opacity: o }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

function Layers() {
  const layers = [
    { y: 0, label: "Content", note: "What each page says" },
    { y: 150, label: "Design", note: "What it looks like" },
    { y: 300, label: "Code", note: "How fast it runs" },
  ];
  return (
    <InView className="w-full">
      <svg viewBox="0 0 700 520" className="rv-draw mx-auto h-auto w-full max-w-[640px] text-white/70" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
        {[100, 320, 540].map((x, i) => (
          <path key={x} data-d pathLength={1} d={`M${x} ${x === 320 ? 22 : 52} V${x === 320 ? 392 : 422}`} strokeDasharray="4 6" style={{ ["--d" as string]: `${700 + i * 80}ms` }} />
        ))}
        {layers.map((l, i) => (
          <g key={l.label} style={{ ["--d" as string]: `${i * 220}ms` }}>
            <path data-d pathLength={1} d={`M100 ${60 + l.y} L320 ${12 + l.y} L540 ${60 + l.y} L320 ${108 + l.y} Z`} className={i === 1 ? "fill-brand-text/10 stroke-brand-text" : ""} />
            <path data-d pathLength={1} d={`M100 ${60 + l.y} V${72 + l.y} L320 ${120 + l.y} L540 ${72 + l.y} V${60 + l.y}`} />
            <path data-d pathLength={1} d={`M240 ${58 + l.y} L320 ${42 + l.y} L400 ${58 + l.y}`} style={{ ["--d" as string]: `${i * 220 + 300}ms` }} />
            <path data-d pathLength={1} d={`M270 ${70 + l.y} L320 ${60 + l.y} L370 ${70 + l.y}`} style={{ ["--d" as string]: `${i * 220 + 400}ms` }} />
            <text x="560" y={62 + l.y} fontSize="14" fill="#ffffff" stroke="none" fontFamily="var(--font-sans)" fontWeight="500">
              {l.label}
            </text>
            <text x="560" y={82 + l.y} fontSize="12" fill="currentColor" fillOpacity="0.65" stroke="none" fontFamily="var(--font-sans)">
              {l.note}
            </text>
          </g>
        ))}
        <rect x="312" y="244" width="16" height="16" className="fill-brand-text stroke-none" />
      </svg>
    </InView>
  );
}

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = TEXT.split(" ");

  return (
    <section aria-labelledby="intro-title" className="rb-section">
      <div className="rb-container grid items-center gap-14 lg:grid-cols-5 lg:gap-x-5">
        <div className="lg:col-span-2 lg:pr-10">
          <Layers />
        </div>
        <div ref={ref} className="flex flex-col gap-10 lg:col-span-3">
          <h2 id="intro-title" className="text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
            {words.map((w, i) => (
              <Word key={i} word={w} i={i} n={words.length} p={scrollYProgress} still={reduce} />
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
