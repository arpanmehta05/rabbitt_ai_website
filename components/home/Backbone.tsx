"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Burst, { type BurstColors } from "./Burst";

// A strip of numbers over a burst of light, after the one on stripe.com. The first number is lit by
// default; hover another and the others sink back while a bright hairline slides under it. The
// section is the page's own dark blue, with a soft glow of the brand blue behind the burst that
// fades out before its edges, so it joins the sections above and below it without a seam.
//
// The numbers are in the HTML as they are (no count-up from zero, design.md §8). This file is a
// client component only for the hover state.

const BURST: BurstColors = { line: [170, 200, 255], dot: [255, 255, 255], tip: [140, 200, 255], strength: 1 };

const FG = "#ffffff";
const DIM = "rgba(255,255,255,0.55)"; // --text-subtle, the lowest text colour allowed
const RULE = "rgba(255,255,255,0.1)"; // --line

const STATS = [
  { value: "6", label: "products,", sub: "private by design" },
  { value: "7", label: "services, from content", sub: "to data annotation" },
  { value: "4", label: "business units,", sub: "one private cloud" },
  { value: "100%", label: "of your data", sub: "stays in your cloud" },
];

export default function Backbone() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="backbone-title"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-page"
      style={{ color: FG }}
    >
      <div className="relative">
        <div className="rb-container py-12 text-center md:py-16 lg:py-24">
          <h2
            id="backbone-title"
            className="text-balance text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] md:whitespace-nowrap"
          >
            The backbone of private AI
          </h2>
        </div>

        {/* the numbers, between two lines that run the whole width */}
        <div className="relative">
          <Rule active={active} />
          {/* the first number is lit by default; a hovered one takes it over only while hovered */}
          <div className="mx-auto grid grid-cols-2 lg:grid-cols-4" onPointerLeave={() => setActive(0)}>
            {STATS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.label}
                  type="button"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(0)}
                  className="relative px-3 py-10 text-center md:py-14"
                  style={{ color: on ? FG : DIM, transition: "color 500ms" }}
                >
                  <span className="block text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">
                    {s.value}
                  </span>
                  <span className="mt-4 block text-[15px] leading-snug md:text-base">
                    {s.label}
                    <br />
                    {s.sub}
                  </span>
                </button>
              );
            })}
          </div>
          <Rule active={active} />
        </div>

        {/* the burst fills the width, and fades out at the bottom so the section has no hard edge */}
        <div
          className="relative h-[clamp(380px,46vw,640px)]"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
          }}
        >
          <Burst colors={BURST} className="absolute inset-x-0 bottom-0 top-[8%] h-[92%] w-full" />
        </div>
      </div>
    </section>
  );
}

// the line above or below the numbers, with a bright stretch that slides to the one in focus
function Rule({ active }: { active: number }) {
  return (
    <div aria-hidden className="pointer-events-none relative h-px w-full" style={{ background: RULE }}>
      <div className="relative mx-auto h-px">
        <motion.div
          className="absolute top-0 h-px"
          style={{ width: "25%", background: "linear-gradient(90deg, transparent, #7fb4ff 35%, #ffffff 50%, #7fb4ff 65%, transparent)" }}
          animate={{ left: `${active * 25}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        >
          <span className="absolute inset-x-[20%] top-[-1px] h-[3px] rounded-full bg-brand-text opacity-70 blur-[3px]" />
        </motion.div>
      </div>
    </div>
  );
}
