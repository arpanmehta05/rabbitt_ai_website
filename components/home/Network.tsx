"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  FileText,
  Folder,
  GitBranch,
  Lock,
  Mail,
  MessageSquare,
  Server,
  Shield,
  Table2,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// A network of data sources that grows across the scene as the page is scrolled and keeps living
// once it is there: every node drifts, nearer nodes shift a little more than distant ones as you
// scroll, and small pulses of light travel along the lines. The layout is generated once from a
// fixed seed so server and client always agree.

const ICONS: LucideIcon[] = [
  Database, FileText, Mail, Cloud, GitBranch, MessageSquare, Lock,
  Server, Folder, Users, Table2, Code2, Shield, Workflow,
];

const COLS = 14;
const ROWS = 7;
const START = 0.3; // first node appears
const SPAN = 0.54; // the last node appears START + SPAN into the scroll
const DRAW = 0.05; // how much scroll an edge or node takes to finish appearing
const PULSES = 9;

type Tone = "blue" | "pink" | "plain";
type Node = { x: number; y: number; at: number; icon?: LucideIcon; tone: Tone };
type Edge = { a: number; b: number; at: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(7);
  const pts: { x: number; y: number }[] = [];

  // jittered grid, slightly larger than the screen so lines run off every edge
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = -0.04 + ((col + 0.15 + rand() * 0.7) / COLS) * 1.08;
      const y = -0.02 + ((row + 0.15 + rand() * 0.7) / ROWS) * 1.06;
      // keep the middle clear for the statement
      if (Math.abs(x - 0.5) < 0.27 && Math.abs(y - 0.5) < 0.2) continue;
      pts.push({ x, y });
    }
  }

  // random appearance order
  const order = pts.map((_, i) => i).sort(() => rand() - 0.5);
  const rank = new Array<number>(pts.length);
  order.forEach((idx, r) => (rank[idx] = r));

  // icon chips go on nodes that are fully on screen and clear of the navbar
  const iconSlots = new Set(
    order
      .filter((idx, r) => {
        const { x, y } = pts[idx];
        return r % 3 === 1 && x > 0.04 && x < 0.96 && y > 0.14 && y < 0.94;
      })
      .slice(0, ICONS.length),
  );
  let iconIndex = 0;
  const tones: Tone[] = ["blue", "pink", "plain", "plain", "blue"];

  const nodes: Node[] = pts.map((p, i) => ({
    ...p,
    at: START + (rank[i] / pts.length) * SPAN,
    icon: iconSlots.has(i) ? ICONS[iconIndex++] : undefined,
    tone: tones[Math.floor(rand() * tones.length)],
  }));

  // each node links to its two nearest neighbours that appeared before it
  const edges: Edge[] = [];
  order.forEach((idx, r) => {
    if (r === 0) return;
    const earlier = order
      .slice(0, r)
      .map((j) => ({ j, d: Math.hypot((nodes[j].x - nodes[idx].x) * 1.6, nodes[j].y - nodes[idx].y) }))
      .sort((m, n) => m.d - n.d)
      .slice(0, r < 3 ? 1 : 2);
    earlier.forEach(({ j }) => edges.push({ a: j, b: idx, at: nodes[idx].at }));
  });

  return { nodes, edges };
}

const GRAPH = buildGraph();

// every node floats on its own slow loop; these are fixed per node, not random per render
const DRIFT = GRAPH.nodes.map((_, i) => ({
  ax: 8 + ((i * 5) % 7) * 2.2, // amplitude in px
  ay: 8 + ((i * 3) % 6) * 2.4,
  sx: 0.16 + ((i * 7) % 9) * 0.022, // speed in rad/s
  sy: 0.14 + ((i * 11) % 8) * 0.024,
  px: i * 1.7,
  py: i * 2.3 + 1,
  depth: 0.55 + ((i * 13) % 10) * 0.1, // 0.55 distant to 1.45 near
}));

function appear(at: number) {
  return [0, at, at + DRAW, 1];
}

function EdgeLine({
  edge,
  p,
  setRef,
}: {
  edge: Edge;
  p: MotionValue<number>;
  setRef: (el: SVGLineElement | null) => void;
}) {
  const stops = appear(edge.at);
  const draw = useTransform(p, stops, [0, 0, 1, 1]);
  const opacity = useTransform(p, stops, [0, 0, 1, 1]);
  const a = GRAPH.nodes[edge.a];
  const b = GRAPH.nodes[edge.b];
  return (
    <motion.line
      ref={setRef}
      x1={`${a.x * 100}%`}
      y1={`${a.y * 100}%`}
      x2={`${b.x * 100}%`}
      y2={`${b.y * 100}%`}
      strokeWidth={1.1}
      stroke="url(#rn-edge)"
      className="[stroke-opacity:0.5] dark:[stroke-opacity:0.38]"
      style={{ pathLength: draw, opacity }}
    />
  );
}

const toneCore: Record<Tone, string> = {
  blue: "fill-[#0061ff] dark:fill-[#4d9bff]",
  pink: "fill-[#ff2d95]",
  plain: "fill-[#05060a]/45 dark:fill-white/60",
};
const toneHalo: Record<Tone, string> = {
  blue: "fill-[#0061ff]/[0.16] dark:fill-[#4d9bff]/25",
  pink: "fill-[#ff2d95]/[0.18] dark:fill-[#ff2d95]/25",
  plain: "fill-[#05060a]/[0.06] dark:fill-white/10",
};

function Dot({
  node,
  p,
  setCore,
  setHalo,
}: {
  node: Node;
  p: MotionValue<number>;
  setCore: (el: SVGCircleElement | null) => void;
  setHalo: (el: SVGCircleElement | null) => void;
}) {
  const opacity = useTransform(p, appear(node.at), [0, 0, 1, 1]);
  const cx = `${node.x * 100}%`;
  const cy = `${node.y * 100}%`;
  return (
    <motion.g style={{ opacity }}>
      <circle ref={setHalo} cx={cx} cy={cy} r={10} className={toneHalo[node.tone]} />
      <circle ref={setCore} cx={cx} cy={cy} r={3.2} className={toneCore[node.tone]} />
    </motion.g>
  );
}

const toneChip: Record<Tone, string> = {
  blue: "text-[#0061ff] shadow-[0_12px_30px_-10px_rgba(0,97,255,0.55)] dark:text-[#4d9bff]",
  pink: "text-[#ff2d95] shadow-[0_12px_30px_-10px_rgba(255,45,149,0.5)]",
  plain: "text-[#0061ff] shadow-[0_12px_30px_-12px_rgba(0,60,200,0.4)] dark:text-[#4d9bff]",
};

// the outer div carries the drift, the inner motion.div carries the scroll-driven pop-in
function IconNode({
  node,
  p,
  setRef,
}: {
  node: Node;
  p: MotionValue<number>;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const stops = appear(node.at);
  const opacity = useTransform(p, stops, [0, 0, 1, 1]);
  const scale = useTransform(p, stops, [0.6, 0.6, 1, 1]);
  const Icon = node.icon!;
  return (
    <div
      ref={setRef}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}
    >
      <motion.div style={{ opacity, scale }}>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-black/[0.06] dark:bg-[#10193a] dark:ring-white/15 ${toneChip[node.tone]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </div>
      </motion.div>
    </div>
  );
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);

// the lines and chips fade out toward the middle so they never fight with the statement
const readabilityMask = "radial-gradient(ellipse 46% 34% at 50% 50%, rgba(0,0,0,0.1) 0%, #000 84%)";

export default function Network({ p }: { p: MotionValue<number> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const coreRefs = useRef<(SVGCircleElement | null)[]>([]);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pulseCoreRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseHaloRefs = useRef<(SVGCircleElement | null)[]>([]);

  // float and pulse, straight on the DOM so it never triggers a React render. It only runs while
  // the scene is on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let width = root.clientWidth;
    let height = root.clientHeight;
    const resize = new ResizeObserver(() => {
      width = root.clientWidth;
      height = root.clientHeight;
    });
    resize.observe(root);

    const xs = new Array<number>(GRAPH.nodes.length);
    const ys = new Array<number>(GRAPH.nodes.length);
    const pulses = Array.from({ length: PULSES }, () => ({ edge: -1, start: 0, dur: 2 }));
    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const t = now / 1000;
      const progress = p.get();
      // nearer nodes move a little more than distant ones as the scene scrolls
      const parallax = (progress - 0.6) * 220;

      GRAPH.nodes.forEach((n, i) => {
        const d = DRIFT[i];
        xs[i] = n.x * width + Math.sin(t * d.sx + d.px) * d.ax;
        ys[i] = n.y * height + Math.cos(t * d.sy + d.py) * d.ay + parallax * (d.depth - 1);
        const core = coreRefs.current[i];
        if (core) {
          core.setAttribute("cx", String(xs[i]));
          core.setAttribute("cy", String(ys[i]));
        }
        const halo = haloRefs.current[i];
        if (halo) {
          halo.setAttribute("cx", String(xs[i]));
          halo.setAttribute("cy", String(ys[i]));
        }
        const icon = iconRefs.current[i];
        if (icon) {
          icon.style.transform = `translate3d(${xs[i] - n.x * width}px, ${ys[i] - n.y * height}px, 0)`;
        }
      });

      const drawn: number[] = [];
      GRAPH.edges.forEach((e, i) => {
        if (e.at + DRAW * 0.6 <= progress) drawn.push(i);
        const line = lineRefs.current[i];
        if (!line) return;
        line.setAttribute("x1", String(xs[e.a]));
        line.setAttribute("y1", String(ys[e.a]));
        line.setAttribute("x2", String(xs[e.b]));
        line.setAttribute("y2", String(ys[e.b]));
      });

      // light pulses travelling along lines that have already grown in
      pulses.forEach((pl, k) => {
        const core = pulseCoreRefs.current[k];
        const halo = pulseHaloRefs.current[k];
        if (!core || !halo) return;
        let u = pl.edge < 0 ? 2 : (now - pl.start) / (pl.dur * 1000);
        if (u >= 1) {
          if (drawn.length === 0) {
            core.setAttribute("opacity", "0");
            halo.setAttribute("opacity", "0");
            pl.edge = -1;
            return;
          }
          pl.edge = drawn[Math.floor(Math.random() * drawn.length)];
          pl.start = now - Math.random() * 600;
          pl.dur = 1.8 + Math.random() * 1.8;
          u = (now - pl.start) / (pl.dur * 1000);
        }
        const e = GRAPH.edges[pl.edge];
        const along = smooth(Math.min(Math.max(u, 0), 1));
        const x = lerp(xs[e.a], xs[e.b], along);
        const y = lerp(ys[e.a], ys[e.b], along);
        const alpha = Math.sin(Math.PI * Math.min(Math.max(u, 0), 1));
        core.setAttribute("cx", String(x));
        core.setAttribute("cy", String(y));
        core.setAttribute("opacity", String(alpha));
        halo.setAttribute("cx", String(x));
        halo.setAttribute("cy", String(y));
        halo.setAttribute("opacity", String(alpha * 0.85));
      });
    };

    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    visibility.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
    };
  }, [p]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ maskImage: readabilityMask, WebkitMaskImage: readabilityMask }}
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          {/* the lines run from blue on the left to pink on the right, like the aurora behind them */}
          <linearGradient id="rn-edge" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0" stopColor="#2f7bff" />
            <stop offset="0.55" stopColor="#7d8cff" />
            <stop offset="1" stopColor="#ff4aa8" />
          </linearGradient>
        </defs>

        {GRAPH.edges.map((e, i) => (
          <EdgeLine
            key={i}
            edge={e}
            p={p}
            setRef={(el) => {
              lineRefs.current[i] = el;
            }}
          />
        ))}

        {GRAPH.nodes.map((n, i) =>
          n.icon ? null : (
            <Dot
              key={i}
              node={n}
              p={p}
              setCore={(el) => {
                coreRefs.current[i] = el;
              }}
              setHalo={(el) => {
                haloRefs.current[i] = el;
              }}
            />
          ),
        )}

        {Array.from({ length: PULSES }, (_, k) => {
          const pink = k % 3 === 2;
          return (
            <g key={`pulse-${k}`}>
              <circle
                ref={(el) => {
                  pulseHaloRefs.current[k] = el;
                }}
                r={9}
                opacity={0}
                className={pink ? "fill-[#ff2d95]/25" : "fill-[#0061ff]/25 dark:fill-[#4d9bff]/35"}
              />
              <circle
                ref={(el) => {
                  pulseCoreRefs.current[k] = el;
                }}
                r={2.6}
                opacity={0}
                className={pink ? "fill-[#ff2d95]" : "fill-[#0061ff] dark:fill-white"}
              />
            </g>
          );
        })}
      </svg>

      {GRAPH.nodes.map((n, i) =>
        n.icon ? (
          <IconNode
            key={i}
            node={n}
            p={p}
            setRef={(el) => {
              iconRefs.current[i] = el;
            }}
          />
        ) : null,
      )}
    </div>
  );
}
