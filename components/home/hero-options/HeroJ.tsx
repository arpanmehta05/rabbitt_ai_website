import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option J, trails and shapes, after the Aiven home page. Theirs is a short looping video behind the
// words; this is the same picture drawn in code, in our blues: two trails of hollow dots, each with
// a label pill that rides along it while the dots fill in behind it, then drain again; a thick
// chevron that nudges at the left edge; a starburst that turns slowly at the bottom right; and a
// highlighter bar that is swept behind the second half of the headline when the page opens.
// One 6s cycle, all CSS (.rb-dot, .rb-pill and friends in globals.css) and no script. The drawing
// is 1600 x 900, scaled to cover the screen. A Server Component.
//
// Aiven sets its headline in a heavy weight; ours is Inter 600, the heaviest weight the site uses.
// The buttons are 8px rounded as everywhere else on the site, not pills.

type Pt = [number, number];
const range = (a: number, b: number, step: number) => {
  const out: number[] = [];
  for (let v = a; v <= b + 0.01; v += step) out.push(v);
  return out;
};
const star = (cx: number, cy: number, spikes: number, outer: number, inner: number) =>
  Array.from({ length: spikes * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer * (0.85 + 0.15 * ((i * 7) % 3) / 2) : inner;
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

// trail 1, top right: down a column, round a bend, then a short run to the pill, then a column below
const trail1: Pt[] = [
  ...range(10, 250, 30).map((y): Pt => [1230, y]),
  [1236, 282], [1255, 306], [1285, 324], [1322, 340], [1360, 354],
];
const path1 = "M1230 -40 L1230 250 C1230 310 1270 330 1330 350 L1405 378";
const below1: Pt[] = range(452, 676, 32).map((y): Pt => [1452, y]);

// trail 2, bottom left: along a row, down a bend, to the pill, then a column below
const trail2: Pt[] = [
  ...range(40, 250, 32).map((x): Pt => [x, 640]),
  [278, 648], [304, 662], [330, 678], [356, 692],
];
const path2 = "M-40 640 L250 640 C300 640 320 660 350 680 L420 712";
const below2: Pt[] = range(764, 900, 32).map((y): Pt => [446, y]);

const dots = (pts: Pt[], from: number, span: number, shift: number) =>
  pts.map(([x, y], i) => (
    <circle
      key={`${x}-${y}`}
      cx={x}
      cy={y}
      r="10"
      strokeWidth="1.6"
      className="rb-dot"
      style={{ "--d": `${(shift + from + (i / Math.max(pts.length - 1, 1)) * span).toFixed(2)}s` } as CSSProperties}
    />
  ));

function Pill({ label, path, shift, fill, ink }: { label: string; path: string; shift: number; fill: string; ink: string }) {
  return (
    <g className="rb-pill" style={{ ["--path" as string]: `path("${path}")`, "--d": `${shift}s` } as CSSProperties}>
      <rect x="-118" y="-27" width="236" height="54" rx="27" fill={fill} />
      <text x="0" y="7" textAnchor="middle" fontSize="19" fontWeight="600" letterSpacing="1.6" fill={ink}>
        {label}
      </text>
    </g>
  );
}

export default function HeroJ() {
  return (
    <section id="j" data-nav-theme="dark" className="relative h-svh min-h-[680px] overflow-hidden bg-black">
      {/* the picture behind the words */}
      <svg
        aria-hidden
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        fill="none"
      >
        {/* the chevron at the left edge */}
        <g className="rb-nudge">
          <polygon points="64,433 227,498 227,562 64,627 152,530" fill="#0061ff" />
        </g>

        {/* the starburst at the bottom right, partly off the screen */}
        <g className="rb-spin-at" style={{ ["--cx" as string]: "1520px", ["--cy" as string]: "790px", ["--t" as string]: "28s" } as CSSProperties}>
          <polygon points={star(1520, 790, 8, 150, 52)} fill="#6fb0ff" />
        </g>

        {/* the trails and their pills */}
        <g style={{ ["--fill" as string]: "#0061ff" } as CSSProperties}>{dots(trail1, 0, 2.0, 0)}</g>
        <g style={{ ["--fill" as string]: "#9ad5ff" } as CSSProperties}>{dots(below1, 2.2, 1.0, 0)}</g>
        <g style={{ ["--fill" as string]: "#0061ff" } as CSSProperties}>{dots(trail2, 0, 2.0, 1.5)}</g>
        <g style={{ ["--fill" as string]: "#9ad5ff" } as CSSProperties}>{dots(below2, 2.2, 0.7, 1.5)}</g>
        <Pill label="NOTHING LEAVES" path={path1} shift={0} fill="#9ad5ff" ink="#05060a" />
        <Pill label="YOUR CLOUD" path={path2} shift={1.5} fill="#0061ff" ink="#ffffff" />
      </svg>

      {/* the frame: two hairlines down the page, like the reference */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[5%] hidden w-px bg-white/10 md:block" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[5%] hidden w-px bg-white/10 md:block" />

      {/* the words */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-8 pt-24 text-center sm:px-10">
        <h1
          className="rb-rise text-[clamp(2.25rem,6.6vw,6.25rem)] font-semibold uppercase leading-[0.96] tracking-[-0.03em] text-white"
          style={after(0)}
        >
          <span className="block">Own your data.</span>
          <span className="rb-wipe -mx-3 mt-1 inline-block px-3">Own your AI.</span>
        </h1>
        <p className="rb-rise mt-8 max-w-[38rem] text-base leading-[1.55] text-white/75 sm:text-xl" style={after(200)}>
          Private models and agents that run inside your own cloud. Nothing leaves, and the weights are yours.
        </p>
        <div className="rb-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={after(320)}>
          <Link
            href="/contactus"
            className="group inline-flex h-12 items-center gap-2 rounded-lg border border-white/30 px-7 text-[15px] font-medium text-white transition-colors hover:border-white"
          >
            Book a demo
          </Link>
          <Link
            href="/products"
            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Explore products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
