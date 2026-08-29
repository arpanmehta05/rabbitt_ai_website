"use client";

import { motion } from "framer-motion";

export default function ProductsHero() {
  // Generate 36 parametric wave curves for the digital silk / wave ribbon effect
  const wavePaths = Array.from({ length: 36 }).map((_, i) => {
    const t = i / 35;
    const opacity = i === 0 ? 0.95 : Math.max(0.03, (1.0 - t) * 0.22);
    const strokeWidth = i === 0 ? 2.2 : 0.75;
    const stroke =
      i === 0
        ? "#ffffff"
        : i < 5
          ? `rgba(186, 230, 253, ${opacity})`
          : i < 15
            ? `rgba(125, 211, 252, ${opacity})`
            : `rgba(56, 189, 248, ${opacity * 0.9})`;

    const y0 = 260 + i * 1.5;
    const cp1x = 240,
      cp1y = 230 + i * 2.2;
    const cp2x = 480,
      cp2y = 280 + i * 3.2;
    const midx = 720,
      midy = 320 + i * 3.8;
    const cp3x = 960,
      cp3y = 350 + i * 4.2;
    const cp4x = 1200,
      cp4y = 250 + i * 2.6;
    const xend = 1460,
      yend = 220 + i * 3.2;

    const d = `M -20 ${y0.toFixed(1)} C ${cp1x} ${cp1y.toFixed(1)}, ${cp2x} ${cp2y.toFixed(1)}, ${midx} ${midy.toFixed(1)} C ${cp3x} ${cp3y.toFixed(1)}, ${cp4x} ${cp4y.toFixed(1)}, ${xend} ${yend.toFixed(1)}`;

    return { d, stroke, strokeWidth, isCore: i === 0 };
  });

  return (
    <section className="relative min-h-[58vh] lg:min-h-[66vh] overflow-hidden bg-[#030508] pt-20 sm:pt-24 pb-0 text-white flex flex-col justify-between">
      {/* Background Subtle Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.06),transparent_65%)]" />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pt-3 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {/* Main Title */}
          <h1 className="font-[family-name:var(--font-newsreader)] text-4xl font-normal leading-[1.08] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem] text-white">
            We turn your data
            <br />
            into AI that <span className="text-[#4b8aff]">delivers.</span>
          </h1>

          {/* Accent Blue Rule */}
          <div className="mt-5 mb-4 h-[2px] w-12 rounded-full bg-sky-500/80" />

          {/* Description Copy */}
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
            Rabbitt Ai builds secure, reliable and scalable AI solutions that help enterprises unlock real impact.
          </p>
        </motion.div>
      </div>

      {/* Bottom Wave Section */}
      <div className="relative mt-auto w-full overflow-hidden pointer-events-none select-none">
        {/* Soft Blue Center Radial Aura */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 h-36 w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2)_0%,rgba(30,64,175,0.1)_45%,transparent_70%)] blur-[50px]" />

        {/* Generative Luminous Wave SVG */}
        <svg
          className="relative w-full h-[95px] sm:h-[125px] lg:h-[155px]"
          viewBox="0 210 1440 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Core Beam Glow Filter */}
            <filter id="coreGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core Gradient */}
            <linearGradient id="coreLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Wireframe Mesh Waves */}
          {wavePaths.map((wave, index) =>
            wave.isCore ? (
              <g key={index}>
                {/* Blurred halo line behind core */}
                <path
                  d={wave.d}
                  stroke="#38bdf8"
                  strokeWidth={6}
                  strokeOpacity={0.45}
                  filter="url(#coreGlow)"
                  strokeLinecap="round"
                />
                {/* Crisp sharp core beam */}
                <path
                  d={wave.d}
                  stroke="url(#coreLineGradient)"
                  strokeWidth={wave.strokeWidth}
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <path
                key={index}
                d={wave.d}
                stroke={wave.stroke}
                strokeWidth={wave.strokeWidth}
                strokeLinecap="round"
              />
            )
          )}
        </svg>
      </div>
    </section>
  );
}
