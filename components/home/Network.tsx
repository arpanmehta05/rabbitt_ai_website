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

// A network of data sources that grows across the scene as the page is scrolled, and keeps
// drifting gently once it is there. The layout is generated once from a fixed seed so server
// and client always agree.

const ICONS: LucideIcon[] = [
  Database, FileText, Mail, Cloud, GitBranch, MessageSquare, Lock,
  Server, Folder, Users, Table2, Code2, Shield, Workflow,
];

const COLS = 14;
const ROWS = 7;
const START = 0.3; // first node appears
const SPAN = 0.54; // the last node appears START + SPAN into the scroll
const DRAW = 0.05; // how much scroll an edge or node takes to finish appearing

type Node = { x: number; y: number; at: number; icon?: LucideIcon; tone: "blue" | "pink" | "plain" };
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
  const tones: Node["tone"][] = ["blue", "pink", "plain", "plain", "blue"];

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
      strokeWidth={1}
      className="stroke-[#0061ff]/30 dark:stroke-white/20"
      style={{ pathLength: draw, opacity }}
    />
  );
}

const toneDot: Record<Node["tone"], string> = {
  blue: "fill-[#0061ff] dark:fill-[#4d9bff]",
  pink: "fill-[#ff2d95]",
  plain: "fill-black/35 dark:fill-white/45",
};

function Dot({
  node,
  p,
  setRef,
}: {
  node: Node;
  p: MotionValue<number>;
  setRef: (el: SVGCircleElement | null) => void;
}) {
  const opacity = useTransform(p, appear(node.at), [0, 0, 1, 1]);
  return (
    <motion.circle
      ref={setRef}
      cx={`${node.x * 100}%`}
      cy={`${node.y * 100}%`}
      r={3}
      className={toneDot[node.tone]}
      style={{ opacity }}
    />
  );
}

const toneChip: Record<Node["tone"], string> = {
  blue: "text-[#0061ff] dark:text-[#4d9bff]",
  pink: "text-[#ff2d95]",
  plain: "text-[#0061ff] dark:text-[#4d9bff]",
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
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[0_8px_24px_-10px_rgba(0,60,200,0.5)] ring-1 ring-black/[0.07] dark:bg-[#121b3a] dark:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.7)] dark:ring-white/15">
          <Icon className={`h-[18px] w-[18px] ${toneChip[node.tone]}`} strokeWidth={1.8} />
        </div>
      </motion.div>
    </div>
  );
}

export default function Network({ p }: { p: MotionValue<number> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // float: move every node on its own slow loop and let its lines follow, straight on the DOM
  // so the animation never triggers a React render. It only runs while the scene is on screen.
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
    let frame = 0;

    const tick = (now: number) => {
      const t = now / 1000;
      GRAPH.nodes.forEach((n, i) => {
        const d = DRIFT[i];
        xs[i] = n.x * width + Math.sin(t * d.sx + d.px) * d.ax;
        ys[i] = n.y * height + Math.cos(t * d.sy + d.py) * d.ay;
        const dot = dotRefs.current[i];
        if (dot) {
          dot.setAttribute("cx", String(xs[i]));
          dot.setAttribute("cy", String(ys[i]));
        }
        const icon = iconRefs.current[i];
        if (icon) {
          icon.style.transform = `translate3d(${xs[i] - n.x * width}px, ${ys[i] - n.y * height}px, 0)`;
        }
      });
      GRAPH.edges.forEach((e, i) => {
        const line = lineRefs.current[i];
        if (!line) return;
        line.setAttribute("x1", String(xs[e.a]));
        line.setAttribute("y1", String(ys[e.a]));
        line.setAttribute("x2", String(xs[e.b]));
        line.setAttribute("y2", String(ys[e.b]));
      });
      frame = requestAnimationFrame(tick);
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
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full">
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
              setRef={(el) => {
                dotRefs.current[i] = el;
              }}
            />
          ),
        )}
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
