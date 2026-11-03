import type { CSSProperties } from "react";
import Backdrop from "./Backdrop";
import Buttons from "./Buttons";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option C, the story as a scene: your data flows into a private model, answers come out, and the
// line to the public AI stops at the edge of your cloud. Everything is inside the dashed boundary
// except the public AI. Drawn in SVG, moved with CSS only (a Server Component). The scene is hidden
// below 768px, where it would be too small to read.
const sources = ["Documents", "Databases", "Apps", "Tickets"];
const rows = [107, 159, 211, 263];
const inPaths = rows.map((y) => `M300 ${y} C400 ${y} 420 170 498 170`);
const outPath = "M622 170 L810 170";

const dot = (path: string, t: string, d: string, key: string) => (
  <circle
    key={key}
    r="3.5"
    fill="#ffffff"
    className="rb-flow"
    style={{ offsetPath: `path("${path}")`, ["--t" as string]: t, ["--d" as string]: d } as CSSProperties}
  />
);

export default function HeroC() {
  return (
    <section id="c" data-nav-theme="dark" className="relative h-svh min-h-[680px] overflow-hidden">
      <Backdrop glow="bottom" />
      <div className="absolute inset-0 flex flex-col justify-center gap-10 pb-16 pt-28">
        <div className="rb-container grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <h1 className="rb-rise text-[clamp(2.5rem,min(5.4vw,9svh),4.75rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
            Own your data.
            <br />
            Own your AI.
          </h1>
          <div className="rb-rise flex flex-col gap-7" style={after(140)}>
            <p className="max-w-[32rem] text-base leading-[1.6] text-white/70 sm:text-lg">
              Private models and agents that run inside your own cloud. Nothing leaves, and the weights are
              yours.
            </p>
            <Buttons />
          </div>
        </div>

        <div
          className="rb-container rb-rise hidden md:block"
          style={after(280)}
          role="img"
          aria-label="Your documents, databases, apps and tickets flow into a private model inside your own cloud, and answers come out. The line to public AI stops at the edge of your cloud."
        >
          <svg viewBox="0 0 1200 340" className="mx-auto h-auto w-full max-h-[40svh]" fill="none" aria-hidden>
            <defs>
              <radialGradient id="hc-core" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#0061ff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#0061ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* the edge of your cloud */}
            <rect x="140" y="20" width="860" height="300" rx="28" stroke="rgba(255,255,255,0.28)" strokeDasharray="3 7" strokeLinecap="round" />
            <text x="172" y="56" fill="rgba(255,255,255,0.55)" fontSize="13" fontWeight="500" letterSpacing="1.2">
              INSIDE YOUR CLOUD
            </text>

            {/* where your data lives */}
            {sources.map((label, i) => (
              <g key={label}>
                <rect x="180" y={rows[i] - 18} width="120" height="36" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" />
                <text x="240" y={rows[i] + 5} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="14">
                  {label}
                </text>
              </g>
            ))}
            {inPaths.map((d, i) => (
              <path key={i} d={d} stroke="rgba(77,155,255,0.35)" strokeWidth="1" />
            ))}

            {/* the private model */}
            <circle cx="560" cy="170" r="104" fill="url(#hc-core)" />
            <circle cx="560" cy="170" r="62" fill="#0a1640" stroke="rgba(77,155,255,0.7)" strokeWidth="1.5" />
            <image href="/logo.svg" x="526" y="136" width="68" height="68" />
            <text x="560" y="266" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="14">
              Your private model
            </text>

            {/* what comes out */}
            <path d={outPath} stroke="rgba(77,155,255,0.35)" strokeWidth="1" />
            <rect x="810" y="140" width="150" height="60" rx="12" fill="rgba(0,97,255,0.14)" stroke="rgba(77,155,255,0.6)" />
            <text x="885" y="175" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="500">
              Answers and agents
            </text>

            {/* the way out that is closed */}
            <path d="M1000 170 H1060" stroke="rgba(255,255,255,0.22)" strokeDasharray="4 6" />
            <g stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M1023 163 L1037 177" />
              <path d="M1037 163 L1023 177" />
            </g>
            <rect x="1060" y="140" width="124" height="60" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.14)" strokeDasharray="3 5" />
            <text x="1122" y="175" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="14">
              Public AI
            </text>
            <text x="1122" y="226" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="13">
              Nothing leaves
            </text>

            {/* data on its way in, answers on their way out */}
            {inPaths.flatMap((d, i) => [dot(d, "5s", `${i * 0.6}s`, `a${i}`), dot(d, "5s", `${i * 0.6 + 2.5}s`, `b${i}`)])}
            {[0, 1, 2].map((i) => dot(outPath, "3.2s", `${i * 1.07}s`, `o${i}`))}
          </svg>
        </div>
      </div>
    </section>
  );
}
