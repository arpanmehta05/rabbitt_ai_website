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
    description: "Organisations trusting Rabbitt AI in their critical workflows",
  },
];

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
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
      className="relative bg-[#020305] px-6 sm:px-10 lg:px-16"
    >
      {/* Full-width hairline separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
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
              className="flex flex-col justify-center py-12 px-0 sm:px-12 first:pl-0 last:pr-0"
            >
              {/* Number */}
              <p className="tabular-nums text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                <CountUp end={stat.value} active={isInView} duration={2} />
                <span className="text-sky-400">{stat.suffix}</span>
              </p>

              {/* Label */}
              <p className="mt-3 text-sm font-semibold text-slate-200 sm:text-base">
                {stat.label}
              </p>

              {/* Description */}
              <p className="mt-1.5 max-w-[22ch] text-xs leading-relaxed text-slate-500 sm:text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
