"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// The statement under the hero, on white. While you scroll, each word sharpens from a blur as its
// turn comes (the reveal tryprofound.com uses). A pool of blue light travels down the page with the
// words, lighting the dots of a faint grid just where you are reading. Blue, black and white, with one small touch of pink.

const STATEMENT =
  "Most AI vendors ask you to send them your data. Rabbitt builds private models and agents that run inside your own cloud, so everything you train stays yours.";
const WORDS = STATEMENT.split(" ");
const REVEAL_START = 0.1;
const REVEAL_SPAN = 0.62;
const WORD_WINDOW = 0.08;

const serif = { fontFamily: "var(--font-serif-display), 'Times New Roman', serif" } as const;

// one word that sharpens (blurred, dim and a touch low, to crisp) as the scroll reaches its slot
function Word({ word, index, p }: { word: string; index: number; p: MotionValue<number> }) {
  const start = REVEAL_START + (index / WORDS.length) * REVEAL_SPAN;
  const end = start + WORD_WINDOW;
  const opacity = useTransform(p, [0, start, end, 1], [0.12, 0.12, 1, 1]);
  const blur = useTransform(p, [0, start, end, 1], [12, 12, 0, 0]);
  const y = useTransform(p, [0, start, end, 1], [10, 10, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const blue = word.startsWith("Rabbitt") || word.startsWith("cloud");
  const yours = word.startsWith("yours");

  return (
    <motion.span
      className={`inline-block ${blue ? "text-[#0061ff]" : "text-[#05060a]"} ${yours ? "bg-gradient-to-r from-[#0061ff] to-[#ff4da6] bg-clip-text pr-[0.06em] italic !text-transparent" : ""}`}
      style={{ opacity, filter, y }}
    >
      {word}
    </motion.span>
  );
}

// two hairline orbits, very faint, with a light on each; the second light is the one pink touch
const CX = 600;
const CY = 350;
const orbitPath = (rx: number, ry: number) => `M ${CX + rx} ${CY} A ${rx} ${ry} 0 1 1 ${CX - rx} ${CY} A ${rx} ${ry} 0 1 1 ${CX + rx} ${CY}`;

export default function Statement() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the pool of light follows the reading
  const lightY = useTransform(p, [0.08, 0.78], ["34%", "66%"]);
  const lightOpacity = useTransform(p, [0, 0.12], [0, 1]);
  const ringA = useTransform(p, [0.02, 0.4], [0, 1]);
  const ringB = useTransform(p, [0.14, 0.55], [0, 1]);
  const mask = useLightMask(lightY);

  return (
    <section ref={ref} aria-label="Why Rabbitt" className={`relative bg-white ${reduce ? "py-32" : "h-[280svh]"}`}>
      <div className={`${reduce ? "relative" : "sticky top-0 h-svh"} flex items-center justify-center overflow-hidden px-6`}>
        {/* a faint grid of dots, lit only where the light is */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: reduce ? 1 : lightOpacity,
            backgroundImage: "radial-gradient(rgba(0,97,255,0.55) 1px, transparent 1.4px)",
            backgroundSize: "28px 28px",
            maskImage: reduce ? undefined : mask,
            WebkitMaskImage: reduce ? undefined : mask,
          }}
        />
        <motion.div aria-hidden style={{ top: lightY, opacity: reduce ? 1 : lightOpacity }} className="pointer-events-none absolute left-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0061ff]/[0.14] blur-[130px]" />

        <svg aria-hidden viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
          <g transform={`rotate(-9 ${CX} ${CY})`} fill="none" strokeWidth={1}>
            <motion.ellipse cx={CX} cy={CY} rx={520} ry={270} stroke="rgba(0,97,255,0.28)" style={reduce ? undefined : { pathLength: ringA }} />
            <motion.ellipse cx={CX} cy={CY} rx={760} ry={400} stroke="rgba(5,6,10,0.10)" style={reduce ? undefined : { pathLength: ringB }} />
            {!reduce && (
              <>
                <circle r={4} fill="#0061ff">
                  <animateMotion dur="70s" repeatCount="indefinite" path={orbitPath(520, 270)} />
                </circle>
                <circle r={3} fill="#ff4da6">
                  <animateMotion dur="96s" repeatCount="indefinite" path={orbitPath(760, 400)} />
                </circle>
              </>
            )}
          </g>
        </svg>

        <p className="relative mx-auto max-w-[940px] text-balance text-center text-[clamp(2.1rem,4.8vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.015em]" style={serif}>
          <span className="sr-only">{STATEMENT}</span>
          <span aria-hidden="true">
            {reduce
              ? STATEMENT
              : WORDS.map((w, i) => (
                  <span key={`${w}-${i}`}>
                    <Word word={w} index={i} p={p} />
                    {i < WORDS.length - 1 ? " " : null}
                  </span>
                ))}
          </span>
        </p>
      </div>
    </section>
  );
}

// a soft round window in the grid that moves with the light
function useLightMask(y: MotionValue<string>) {
  return useTransform(y, (v) => `radial-gradient(ellipse 520px 300px at 50% ${v}, #000 0%, transparent 100%)`);
}
