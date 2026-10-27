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

const edgeMask = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

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
    <section className="relative">
      <div className="pt-20 lg:pt-28">
        <motion.h2
          {...reveal()}
          className="max-w-2xl text-[clamp(2rem,3.6vw,3.6rem)] leading-[1.1] tracking-[-0.035em] text-[#05060a] dark:text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="font-semibold">Companies we&apos;ve worked with,</span>{" "}
          <span className="font-light">across fintech, mobility, health and education.</span>
        </motion.h2>
      </div>

      {/* a band on a dot grid, framed by thin lines; it bleeds to the left edge of the screen and
          stops at the globe column */}
      <motion.div
        {...reveal(0.1)}
        className="relative -ml-6 mt-14 pb-20 sm:-ml-10 lg:-ml-14 lg:mt-16 lg:pb-28 xl:-ml-20"
      >
        <div
          className="border-y border-black/[0.12] py-12 [--dot:rgba(5,6,10,0.1)] dark:border-white/15 dark:[--dot:rgba(255,255,255,0.09)] lg:py-14"
          style={{
            backgroundImage: "radial-gradient(var(--dot) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div
            className="overflow-hidden motion-reduce:overflow-x-auto"
            style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
          >
            <ul className="animate-marquee-left flex w-max items-center motion-reduce:animate-none">
              {track.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= companies.length}
                  className="flex shrink-0 items-center px-9 sm:px-14"
                >
                  {c.kind === "icon" ? (
                    <span className="flex items-center gap-4">
                      <Image
                        src={c.src}
                        alt={i < companies.length ? c.name : ""}
                        width={64}
                        height={64}
                        className="h-11 w-11 rounded-xl object-contain dark:ring-1 dark:ring-white/15 sm:h-12 sm:w-12"
                      />
                      <span className="whitespace-nowrap text-xl font-medium tracking-[-0.02em] text-[#05060a]/80 dark:text-white/85 sm:text-2xl">
                        {c.name}
                      </span>
                    </span>
                  ) : (
                    <>
                      {/* the original logo on light, a dark-mode variant of the same logo on dark */}
                      <Image
                        src={c.src}
                        alt={i < companies.length ? c.name : ""}
                        width={200}
                        height={64}
                        className="h-10 w-auto max-w-[12rem] object-contain dark:hidden sm:h-11"
                      />
                      <Image
                        src={darkSrc(c.src)}
                        alt=""
                        aria-hidden
                        width={200}
                        height={64}
                        className="hidden h-10 w-auto max-w-[12rem] object-contain dark:block sm:h-11"
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
