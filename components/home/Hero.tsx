"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Network from "./Network";

// the planet is wider than the viewport so it can cover it completely once it has risen
const planeBox = "absolute left-1/2 top-[78%] h-[1100px] w-[max(1700px,150vw)] -translate-x-1/2";

const STATEMENT =
  "Most AI vendors ask you to send them your data. Rabbitt builds private models and agents that run inside your own cloud, so everything you train stays yours.";
const WORDS = STATEMENT.split(" ");
const FIRST_SENTENCE_END = WORDS.findIndex((w) => w.endsWith("data."));
const REVEAL_START = 0.34;
const REVEAL_SPAN = 0.46;
const WORD_WINDOW = 0.09;

// one word that sharpens (blur and dim to crisp) as the scroll reaches its slot, like tryprofound.com
function Word({ word, index, p }: { word: string; index: number; p: MotionValue<number> }) {
  const start = REVEAL_START + (index / WORDS.length) * REVEAL_SPAN;
  const end = start + WORD_WINDOW;
  const opacity = useTransform(p, [0, start, end, 1], [0.16, 0.16, 1, 1]);
  const blur = useTransform(p, [0, start, end, 1], [8, 8, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  // the first sentence is the problem, set light and quiet; the second is the answer, set bold
  const firstSentence = index <= FIRST_SENTENCE_END;
  const name = word.startsWith("Rabbitt");
  const glow = word.startsWith("cloud") || word.startsWith("yours");
  const tone = glow
    ? "bg-gradient-to-r from-[#0061ff] to-[#ff2d95] bg-clip-text font-semibold text-transparent dark:from-[#4d9bff] dark:to-[#ff6fb5]"
    : name
      ? "font-semibold text-[#0061ff] dark:text-[#4d9bff]"
      : firstSentence
        ? "font-light text-[#05060a]/55 dark:text-white/60"
        : "font-semibold text-[#05060a] dark:text-white";

  return (
    <motion.span className={`inline-block ${tone}`} style={{ opacity, filter }}>
      {word}
    </motion.span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Scene timeline (p is progress through the pinned section):
  //   0.00 - 0.30  the planet rises, the headline lifts away, the background settles
  //   0.32 - 0.89  the statement reveals word by word
  //   0.89 - 1.00  hold, then the page scrolls on
  // every map spans the full 0 to 1 range so values hold after their last keyframe
  const planetY = useTransform(p, [0, 0.3, 1], ["0vh", "-115vh", "-115vh"]);

  // headline lifts away
  const copyOpacity = useTransform(p, [0, 0.12, 1], [1, 0, 0]);
  const copyY = useTransform(p, [0, 0.12, 1], [0, -70, -70]);
  const copyEvents = useTransform(p, (v) => (v < 0.12 ? "auto" : "none"));

  // statement block fades in once the planet has covered the screen
  const statementOpacity = useTransform(p, [0, 0.26, 0.34, 1], [0, 0, 1, 1]);

  // light mode: the dome keeps a crisp rim while its inside turns pearly (pale blue over white),
  // and soft aurora glows settle into the page once it has risen
  const domeColor = useTransform(
    p,
    [0, 0.08, 0.16, 0.24, 0.34, 1],
    ["#060f48", "#060f48", "#1a4fe0", "#bcd3ff", "#ffffff", "#ffffff"],
  );
  // each element gets its own motion value, as sharing one across elements stalls scroll-linked updates
  const litOpacity = useTransform(p, [0, 0.14, 0.26, 1], [1, 0.6, 0, 0]);
  const veilOpacity = useTransform(p, [0, 0.08, 0.22, 1], [0, 0, 1, 1]);
  const auroraOpacity = useTransform(p, [0, 0.25, 0.4, 1], [0, 0, 1, 1]);
  const lightHazeOpacity = useTransform(p, [0, 0.2, 0.32, 1], [1, 0.5, 0, 0]);
  const pinkHazeOpacity = useTransform(p, [0, 0.2, 0.32, 1], [1, 0.5, 0, 0]);

  // dark mode: the black planet lifts to a deep navy and its glow settles down
  const bodyColor = useTransform(p, [0, 0.35, 1], ["#04060c", "#0a1228", "#0a1228"]);
  const darkGlowOpacity = useTransform(p, [0, 0.28, 1], [1, 0.45, 0.1]);
  const darkCoreOpacity = useTransform(p, [0, 0.28, 1], [1, 0.45, 0.1]);
  const darkFlareOpacity = useTransform(p, [0, 0.28, 1], [1, 0.45, 0.1]);
  const rimOpacity = useTransform(p, [0, 0.25, 0.35, 1], [1, 1, 0, 0]);

  const move = (style: object) => (reduce ? undefined : style);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      ref={ref}
      className={`relative bg-white dark:bg-[#04060c] ${reduce ? "h-svh" : "h-[280svh]"}`}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* faint grid, fading out from the centre */}
        <div
          aria-hidden
          className="absolute inset-0 text-[#05060a] opacity-[0.06] dark:text-white dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, #000, transparent)",
          }}
        />

        {/* light mode planet */}
        <div aria-hidden className="absolute inset-0 overflow-hidden dark:hidden">
          <motion.div className="absolute inset-0" style={move({ y: planetY })}>
            <div className={planeBox}>
              <motion.div
                className="absolute left-1/2 top-0 h-[300px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0061ff]/25 blur-[110px]"
                style={move({ opacity: lightHazeOpacity })}
              />
              <motion.div
                className="absolute left-[calc(50%+380px)] top-[60px] h-[80px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#ff2d95]/35 blur-[60px]"
                style={move({ opacity: pinkHazeOpacity })}
              />
              {/* crisp rim: blue, bright in the middle, pink at the far right */}
              <div
                className="absolute inset-0 rounded-[50%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 3%, #2f6bff 20%, #ffffff 50%, #5b97ff 72%, #ff4aa8 88%, transparent 97%)",
                }}
              />
              {/* dome body, 2px lower so only the rim hairline shows. One shape: an elliptical top
                  that continues as a straight-sided block, so nothing shows below it once it has risen */}
              <motion.div
                className="absolute inset-x-0 top-[2px] h-[2150px] rounded-[50%_50%_0_0/550px_550px_0_0]"
                style={{ backgroundColor: reduce ? "#060f48" : domeColor }}
              />
              {/* top lighting with a pink highlight on the right, fading out as the dome rises */}
              <motion.div
                className="absolute inset-0 top-[2px] rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(ellipse 16% 9% at 72% 0%, rgba(255,61,166,0.85), transparent), radial-gradient(ellipse 50% 28% at 50% 0%, #5b97ff 0%, #0b52ee 38%, #0a2fa3 72%, rgba(6,15,72,0) 100%)",
                  ...(reduce ? {} : { opacity: litOpacity }),
                }}
              />
              {/* pearl veil: pale blue at the top easing to white, takes over the inside */}
              <motion.div
                className="absolute inset-0 top-[2px] rounded-[50%]"
                style={{
                  background: "linear-gradient(180deg, #bcd3ff 0%, #e9f0ff 28%, #ffffff 58%)",
                  ...(reduce ? { opacity: 0 } : { opacity: veilOpacity }),
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* light mode: aurora glows that become the page background */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden"
            style={{ opacity: auroraOpacity }}
          >
            <div className="absolute -left-[10%] -top-[15%] h-[620px] w-[760px] rounded-[50%] bg-[#0061ff]/20 blur-[120px]" />
            <div className="absolute -bottom-[18%] right-[-8%] h-[560px] w-[720px] rounded-[50%] bg-[#ff2d95]/20 blur-[130px]" />
            <div className="absolute bottom-[-25%] left-[28%] h-[420px] w-[640px] rounded-[50%] bg-[#4d9bff]/25 blur-[120px]" />
          </motion.div>
        )}

        {/* dark mode planet */}
        <div aria-hidden className="absolute inset-0 hidden overflow-hidden dark:block">
          <motion.div className="absolute inset-0" style={move({ y: planetY })}>
            <div className={planeBox}>
              <motion.div
                className="absolute left-1/2 top-0 h-[340px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0061ff]/45 blur-[120px]"
                style={move({ opacity: darkGlowOpacity })}
              />
              <motion.div
                className="absolute left-1/2 top-0 h-[36px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#bcd2ff]/70 blur-[34px]"
                style={move({ opacity: darkCoreOpacity })}
              />
              <motion.div
                className="absolute left-[calc(50%+380px)] top-[60px] h-[70px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#ff2d95]/60 blur-[50px]"
                style={move({ opacity: darkFlareOpacity })}
              />
              <motion.div
                className="absolute inset-0 rounded-[50%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 4%, #1f55e0 22%, #eaf1ff 50%, #2f6bff 72%, #ff4aa8 88%, transparent 97%)",
                  ...(reduce ? {} : { opacity: rimOpacity }),
                }}
              />
              <motion.div
                className="absolute inset-x-0 top-[2px] h-[2150px] rounded-[50%_50%_0_0/550px_550px_0_0]"
                style={{ backgroundColor: reduce ? "#04060c" : bodyColor }}
              />
            </div>
          </motion.div>
        </div>

        {/* headline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 pb-32 pt-36 text-center"
          style={move({ opacity: copyOpacity, y: copyY, pointerEvents: copyEvents })}
        >
          <div className="max-w-4xl">
            <motion.h1
              {...rise(0)}
              className="text-[clamp(3.1rem,8vw,7rem)] font-medium leading-[1] tracking-[-0.05em] text-[#05060a] dark:text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Own your data.
              <br />
              <span className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text text-transparent dark:from-[#3d7bff] dark:to-[#b4cdff]">
                Own your AI.
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-black/60 dark:text-white/60 sm:text-xl"
            >
              Private models and agents that run inside your own cloud. Nothing
              leaves, and the weights are yours.
            </motion.p>

            <motion.div
              {...rise(0.22)}
              className="mt-11 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2 rounded-full bg-[#05060a] px-8 py-4 text-base font-medium text-white transition hover:bg-[#0061ff] dark:bg-white dark:text-[#04060c] dark:hover:bg-[#0061ff] dark:hover:text-white"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-[#05060a] shadow-[0_10px_30px_-12px_rgba(0,97,255,0.45)] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:ring-[#0061ff]/50 dark:bg-[#0061ff] dark:text-white dark:shadow-[0_10px_30px_-12px_rgba(0,97,255,0.8)] dark:ring-0 dark:hover:bg-[#2f7bff]"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 text-[#0061ff] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* data-source network that grows behind the statement as it is revealed */}
        {!reduce && <Network p={p} />}

        {/* statement, revealed word by word on the risen planet */}
        {!reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: statementOpacity }}
          >
            {/* a soft halo behind the words, so they stay crisp over the network */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_54%_40%_at_50%_50%,rgba(255,255,255,0.9),transparent_74%)] dark:bg-[radial-gradient(ellipse_54%_40%_at_50%_50%,rgba(8,14,34,0.72),transparent_74%)]"
            />
            <p
              className="relative mx-auto max-w-[1000px] text-balance text-center text-[clamp(2.1rem,4.5vw,4.3rem)] leading-[1.1] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
