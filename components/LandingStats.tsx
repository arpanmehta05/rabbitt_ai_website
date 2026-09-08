"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    description: "Enterprise AI implementations shipped to production",
  },
  {
    value: 1700000,
    suffix: "+",
    label: "Data Annotations",
    description: "Labelled data points powering fine-tuned enterprise models",
  },
  {
    value: 100,
    suffix: "+",
    label: "Enterprise Clients",
    description:
      "Organisations trusting Rabbitt AI in their critical workflows",
  },
  {
    value: 8,
    suffix: "+",
    label: "Product Platforms",
    description:
      "Connected products across intelligence, learning, content, and operations",
  },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1) + "K";
  return n.toString();
}

function CountUp({
  end,
  duration = 1.8,
  active,
}: {
  end: number;
  duration?: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, end, duration]);

  return <>{formatNumber(display)}</>;
}

export default function LandingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="landing-section relative overflow-hidden bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_74%_at_50%_50%,rgba(14,116,144,0.1),transparent_72%)]" />
      {/* Full-width hairline separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="mx-auto max-w-[1440px]">
        <div className="relative mb-12 flex flex-col gap-4 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
              Impact you can measure.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            From carefully prepared data to live enterprise AI systems, every
            engagement is designed to move meaningful work forward.
          </p>
        </div>
        <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex min-h-64 flex-col justify-center py-10 first:pt-0 sm:min-h-72 sm:px-10 sm:py-8 sm:first:pl-0 xl:py-3 xl:first:pl-0 xl:last:pr-0"
            >
              {/* Number */}
              <p className="tabular-nums text-6xl font-semibold tracking-[-0.04em] text-[#092f6b] sm:text-7xl lg:text-8xl">
                <CountUp end={stat.value} active={isInView} duration={2} />
                <span className="ml-1 text-sky-400 sm:ml-2">{stat.suffix}</span>
              </p>

              {/* Label */}
              <p className="mt-5 text-sm font-semibold text-slate-800 sm:text-base">
                {stat.label}
              </p>

              {/* Description */}
              <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-slate-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
