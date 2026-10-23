"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// "wordmark" logos already spell the name on a transparent background; "icon" logos are
// app-style squares, so the name is set next to them to make every entry read the same way.
type Company = { name: string; src: string; kind: "wordmark" | "icon" };

const companies: Company[] = [
  { name: "Groww", src: "/brands/groww.png", kind: "wordmark" },
  { name: "Paytm", src: "/brands/paytm.svg", kind: "wordmark" },
  { name: "PhonePe", src: "/brands/phonepe.png", kind: "icon" },
  { name: "Acko", src: "/brands/acko.svg", kind: "wordmark" },
  { name: "Policybazaar", src: "/brands/policybazaar.png", kind: "icon" },
  { name: "upGrad", src: "/brands/upgrad.png", kind: "icon" },
  { name: "Unacademy", src: "/brands/unacademy.svg", kind: "wordmark" },
  { name: "Cars24", src: "/brands/cars24.png", kind: "wordmark" },
  { name: "Spinny", src: "/brands/spinny.svg", kind: "wordmark" },
  { name: "Acko Drive", src: "/brands/ackodrive.webp", kind: "wordmark" },
  { name: "99acres", src: "/brands/99acres.png", kind: "icon" },
  { name: "Magicbricks", src: "/brands/magicbricks.png", kind: "icon" },
  { name: "NoBroker", src: "/brands/nobroker.png", kind: "icon" },
  { name: "Square Yards", src: "/brands/squareyards.svg", kind: "wordmark" },
  { name: "91wheels", src: "/brands/91wheels.png", kind: "icon" },
  { name: "HealthKart", src: "/brands/healthkart.png", kind: "icon" },
  { name: "Tata 1mg", src: "/brands/tata1mg.svg", kind: "wordmark" },
  { name: "Truemeds", src: "/brands/truemeds.png", kind: "icon" },
  { name: "Pristyn Care", src: "/brands/pristyncare.svg", kind: "icon" },
  { name: "Darwinbox", src: "/brands/darwinbox.webp", kind: "wordmark" },
  { name: "SHRM", src: "/brands/shrm.png", kind: "icon" },
  { name: "MoEngage", src: "/brands/moengage.png", kind: "icon" },
  { name: "LeadSquared", src: "/brands/leadsquared.png", kind: "icon" },
  { name: "Extramarks", src: "/brands/extramarks.png", kind: "icon" },
  { name: "Interview Kickstart", src: "/brands/interviewkickstart.png", kind: "icon" },
];

// wordmark logos have a dark-mode variant in /brands/dark (generated, always a png)
const darkSrc = (src: string) => `/brands/dark/${src.split("/").pop()!.replace(/\.[^.]+$/, "")}.png`;

const edgeMask ="linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

// the marquee keyframes scroll by a third of the track, so the list is repeated three times
const track = [...companies, ...companies, ...companies];

export default function Companies() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative overflow-hidden">
      {/* light mode: pick the hero's aurora back up so the two sections read as one */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dark:hidden">
        <div className="absolute -top-[200px] right-[-8%] h-[560px] w-[720px] rounded-[50%] bg-[#ff2d95]/20 blur-[130px]" />
        <div className="absolute -top-[260px] left-[28%] h-[420px] w-[640px] rounded-[50%] bg-[#4d9bff]/25 blur-[120px]" />
      </div>
      {/* dark mode: a soft blue glow behind the logos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute left-1/2 top-[30%] h-[460px] w-[900px] -translate-x-1/2 rounded-[50%] bg-[#0061ff]/15 blur-[140px]" />
      </div>

      <div className="relative w-full px-6 pt-24 sm:px-10 lg:px-14 lg:pt-32 xl:px-20">
        <motion.div {...reveal()} className="mx-auto max-w-5xl text-center">
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.045em] text-[#05060a] dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Companies we&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text text-transparent dark:from-[#3d7bff] dark:to-[#b4cdff]">
              worked with.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black/60 dark:text-white/60">
            From fintech and mobility to health and education, teams across industries trust
            Rabbitt with their data and their AI.
          </p>
        </motion.div>
      </div>

      {/* a hairline-framed logo band: no tiles, full-colour marks, fading out at both edges */}
      <motion.div {...reveal(0.1)} className="relative mt-16 pb-24 lg:pb-32">
        <div className="border-y border-black/[0.08] py-10 dark:border-white/10">
          <div
            className="overflow-hidden motion-reduce:overflow-x-auto"
            style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
          >
            <ul className="animate-marquee-left flex w-max items-center motion-reduce:animate-none">
              {track.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= companies.length}
                  className="flex shrink-0 items-center px-8 sm:px-12"
                >
                  {c.kind === "icon" ? (
                    <span className="flex items-center gap-3.5">
                      <Image
                        src={c.src}
                        alt={i < companies.length ? c.name : ""}
                        width={56}
                        height={56}
                        className="h-10 w-10 rounded-xl object-contain dark:ring-1 dark:ring-white/15 sm:h-11 sm:w-11"
                      />
                      <span className="whitespace-nowrap text-lg font-medium tracking-[-0.02em] text-[#05060a]/75 dark:text-white/80 sm:text-xl">
                        {c.name}
                      </span>
                    </span>
                  ) : (
                    <>
                      {/* the original logo on light, a dark-mode variant of the same logo on dark */}
                      <Image
                        src={c.src}
                        alt={i < companies.length ? c.name : ""}
                        width={180}
                        height={56}
                        className="h-9 w-auto max-w-[11rem] object-contain dark:hidden sm:h-10"
                      />
                      <Image
                        src={darkSrc(c.src)}
                        alt=""
                        aria-hidden
                        width={180}
                        height={56}
                        className="hidden h-9 w-auto max-w-[11rem] object-contain dark:block sm:h-10"
                      />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
