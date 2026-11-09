"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Network from "./Network";

const STATEMENT =
  "Most AI vendors ask you to send them your data. Rabbitt builds private models and agents that run inside your own cloud, so everything you train stays yours.";
const WORDS = STATEMENT.split(" ");
// the first words are already sharpening when the screen pins (p = 0.24), so it never reads as blank
const REVEAL_START = 0.2;
const REVEAL_SPAN = 0.58;
const WORD_WINDOW = 0.09;

const statementClass =
  "mx-auto max-w-[860px] text-balance text-center text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.16] tracking-[-0.035em] text-white";

// one word that sharpens (blur and dim to crisp) as the scroll reaches its slot, like tryprofound.com
function Word({ word, index, p }: { word: string; index: number; p: MotionValue<number> }) {
  const start = REVEAL_START + (index / WORDS.length) * REVEAL_SPAN;
  const end = start + WORD_WINDOW;
  // words still to come stay on screen, dimmed and softly blurred, so the whole sentence is there
  const opacity = useTransform(p, [0, start, end, 1], [0.28, 0.28, 1, 1]);
  const blur = useTransform(p, [0, start, end, 1], [6, 6, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const accent = word.startsWith("Rabbitt") || word.startsWith("cloud");

  return (
    <motion.span className={`inline-block ${accent ? "text-brand-text" : ""}`} style={{ opacity, filter }}>
      {word}
    </motion.span>
  );
}

// The scene that follows the first screen, on the dark page: a network of data sources grows
// across it, lit in the brand blue, and the statement is revealed word by word over it while the
// screen stays pinned.
export default function ScrollHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Scene timeline (p is progress through the scene; it starts at 0.24, when the screen is pinned).
  // The whole statement is on screen, dimmed and blurred, from the moment the scene scrolls in:
  //   0.20 - 0.87  the statement sharpens word by word (the first words are already under way)
  //   0.28 - 0.38  the network fades in, and then grows node by node (0.30 - 0.80)
  //   0.87 - 1.00  hold, then the page scrolls on
  // every map spans the full 0 to 1 range so values hold after their last keyframe
  const p = useTransform(raw, [0, 1], [0.24, 1]);

  const networkOpacity = useTransform(p, [0, 0.28, 0.38, 1], [0, 0, 1, 1]);

  // soft glows of the brand blue that settle into the page background

  return (
    <section ref={ref} className={`relative ${reduce ? "h-svh" : "h-[230svh]"}`}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* faint grid, fading out from the centre */}
        <div
          aria-hidden
          className="absolute inset-0 text-white opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent)",
          }}
        />

        {/* data-source network: it appears with the statement, not before it, and grows behind it
            as the words are revealed */}
        {!reduce && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity: networkOpacity }}>
            <Network p={p} />
          </motion.div>
        )}

        {/* statement, revealed word by word over the network */}
        {reduce ? (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className={statementClass} style={{ fontFamily: "var(--font-display)" }}>
              {STATEMENT}
            </p>
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <p className={statementClass} style={{ fontFamily: "var(--font-display)" }}>
              <span className="sr-only">{STATEMENT}</span>
              <span aria-hidden="true">
                {WORDS.map((w, i) => (
                  <span key={`${w}-${i}`}>
                    <Word word={w} index={i} p={p} />
                    {i < WORDS.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
