"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";

// The first screen, after heronaiapp.com's: an empty sheet, a drawing of a website draws itself line
// by line, a blue scan line sweeps down it and everything it passes turns into the finished, rendered
// site, and then the headline and the bar at the bottom come in. After that the sheet is live: guide
// lines follow the cursor, and if you click and drag over the site a selection box appears and the
// problems inside it are called out (low contrast, a vague button, a slow image, a layout jump).
// The site is shown on a MacBook: it appears, the lid opens, the screen lights up, the site draws
// itself on the screen, then the scan line builds it. The drawing and the finished site are one list of shapes drawn twice, so they always line up.
// Reduced motion: the finished site and the callouts-on-drag, with no animation. About 4.5 seconds.

const W = 960; // drawn on a 720-wide grid, then stretched sideways so the site reads wide
const SX = W / 720;
const H = 510;

type Shape =
  | { k: "rect"; x: number; y: number; w: number; h: number; rx?: number; fill?: string; fillOnly?: boolean }
  | { k: "line"; x1: number; y1: number; x2: number; y2: number; op?: number }
  | { k: "circle"; x: number; y: number; r: number; fill?: string }
  | { k: "text"; x: number; y: number; size: number; weight?: number; fill: string; str: string; wire: [number, number, number][] }
  | { k: "path"; d: string; stroke?: string };

const W_STROKE = "rgba(255,255,255,0.55)";

const baseShapes: Shape[] = [
  { k: "rect", x: 0.5, y: 0.5, w: 719, h: 509, rx: 8, fill: "#070b14" },
  { k: "line", x1: 0, y1: 36.5, x2: 720, y2: 36.5, op: 0.35 },
  { k: "circle", x: 20, y: 18, r: 4, fill: "#2a2f3a" },
  { k: "circle", x: 36, y: 18, r: 4, fill: "#2a2f3a" },
  { k: "circle", x: 52, y: 18, r: 4, fill: "#2a2f3a" },
  { k: "rect", x: 80.5, y: 9.5, w: 196, h: 18, rx: 9, fill: "rgba(255,255,255,0.07)" },
  { k: "text", x: 96, y: 22, size: 10, fill: "#8a93a6", str: "acme-co.com", wire: [[96, 18, 70]] },
  { k: "line", x1: 0, y1: 76.5, x2: 720, y2: 76.5, op: 0.35 },
  { k: "rect", x: 40.5, y: 46.5, w: 22, h: 14, rx: 3, fill: "#0061ff" },
  { k: "text", x: 70, y: 58, size: 14, weight: 600, fill: "#ffffff", str: "Acme", wire: [[70, 54, 34]] },
  { k: "text", x: 330, y: 60, size: 12, fill: "#c7cdda", str: "Products", wire: [[330, 56, 44]] },
  { k: "text", x: 398, y: 60, size: 12, fill: "#c7cdda", str: "Pricing", wire: [[398, 56, 38]] },
  { k: "text", x: 458, y: 60, size: 12, fill: "#c7cdda", str: "About", wire: [[458, 56, 30]] },
  { k: "rect", x: 620.5, y: 46.5, w: 60, h: 22, rx: 6, fill: "#0061ff" },
  { k: "text", x: 633, y: 61, size: 11, fill: "#ffffff", str: "Sign up", wire: [[633, 57, 34]] },
  { k: "text", x: 40, y: 140, size: 32, weight: 600, fill: "#ffffff", str: "Everything your team", wire: [[40, 128, 290], [40, 128, 0]] },
  { k: "text", x: 40, y: 178, size: 32, weight: 600, fill: "#ffffff", str: "needs to ship faster,", wire: [[40, 166, 270]] },
  { k: "text", x: 40, y: 216, size: 32, weight: 600, fill: "#ffffff", str: "together.", wire: [[40, 204, 150]] },
  { k: "text", x: 40, y: 244, size: 12, fill: "#5b6472", str: "A single workspace for plans, tasks and", wire: [[40, 240, 300]] },
  { k: "text", x: 40, y: 262, size: 12, fill: "#5b6472", str: "reports your whole team can open.", wire: [[40, 258, 250]] },
  { k: "rect", x: 40.5, y: 292.5, w: 110, h: 36, rx: 8, fill: "#2a3350" },
  { k: "text", x: 70, y: 315, size: 13, fill: "#8fa0c8", str: "Submit", wire: [[70, 311, 50]] },
  { k: "rect", x: 400.5, y: 100.5, w: 280, h: 200, rx: 10, fill: "url(#rv-g1)" },
  { k: "path", d: "M416 270 L470 222 L520 246 L590 172 L664 196", stroke: "rgba(255,255,255,0.9)" },
  { k: "rect", x: 416.5, y: 118.5, w: 60, h: 8, rx: 4, fill: "rgba(255,255,255,0.85)" },
  { k: "rect", x: 40.5, y: 350.5, w: 200, h: 130, rx: 10, fill: "rgba(255,255,255,0.05)" },
  { k: "rect", x: 56.5, y: 366.5, w: 20, h: 20, rx: 5, fill: "rgba(0,97,255,0.35)" },
  { k: "text", x: 56, y: 416, size: 14, weight: 600, fill: "#ffffff", str: "Fast hosting", wire: [[56, 411, 76]] },
  { k: "text", x: 56, y: 436, size: 12, fill: "#8a93a6", str: "Pages load in under a", wire: [[56, 432, 120]] },
  { k: "text", x: 56, y: 452, size: 12, fill: "#8a93a6", str: "second on any phone.", wire: [[56, 448, 110]] },
  { k: "rect", x: 260.5, y: 350.5, w: 200, h: 130, rx: 10, fill: "rgba(255,255,255,0.05)" },
  { k: "rect", x: 276.5, y: 366.5, w: 20, h: 20, rx: 5, fill: "rgba(77,155,255,0.35)" },
  { k: "text", x: 276, y: 416, size: 14, weight: 600, fill: "#ffffff", str: "Clear paths", wire: [[276, 411, 70]] },
  { k: "text", x: 276, y: 436, size: 12, fill: "#8a93a6", str: "Every page has one", wire: [[276, 432, 110]] },
  { k: "text", x: 276, y: 452, size: 12, fill: "#8a93a6", str: "action that stands out.", wire: [[276, 448, 126]] },
  { k: "rect", x: 480.5, y: 350.5, w: 200, h: 130, rx: 10, fill: "rgba(255,255,255,0.05)" },
  { k: "text", x: 496, y: 372, size: 12, fill: "#8a93a6", str: "Weekly visits", wire: [[496, 368, 70]] },
  { k: "rect", x: 500.5, y: 428.5, w: 18, h: 32, fill: "#4d9bff" },
  { k: "rect", x: 530.5, y: 408.5, w: 18, h: 52, fill: "#4d9bff" },
  { k: "rect", x: 560.5, y: 420.5, w: 18, h: 40, fill: "#4d9bff" },
  { k: "rect", x: 590.5, y: 392.5, w: 18, h: 68, fill: "#4d9bff" },
  { k: "rect", x: 620.5, y: 412.5, w: 18, h: 48, fill: "#4d9bff" },
  { k: "line", x1: 0, y1: 494.5, x2: 720, y2: 494.5, op: 0.3 },
];

const sx = (n: number) => n * SX;
const shapes: Shape[] = baseShapes.map((s) => {
  if (s.k === "rect") return { ...s, x: sx(s.x), w: sx(s.w) };
  if (s.k === "line") return { ...s, x1: sx(s.x1), x2: sx(s.x2) };
  if (s.k === "circle") return { ...s, x: sx(s.x) };
  if (s.k === "text") return { ...s, x: sx(s.x), wire: s.wire.map(([x, y, l]) => [sx(x), y, sx(l)] as [number, number, number]) };
  let i = 0;
  return { ...s, d: s.d.replace(/-?\d+(\.\d+)?/g, (m) => (i++ % 2 === 0 ? String(sx(parseFloat(m))) : m)) };
});

type Violation = { id: string; rule: string; text: string; r: [number, number, number, number]; mark: [number, number] };

const baseViolations: Violation[] = [
  { id: "V1", rule: "WCAG 1.4.3", text: "SUBHEAD CONTRAST 2.9:1. NEEDS 4.5:1.", r: [36, 228, 320, 40], mark: [356, 236] },
  { id: "V2", rule: "CONVERSION", text: "BUTTON SAYS SUBMIT. IT NEVER SAYS WHAT HAPPENS NEXT.", r: [36, 288, 118, 44], mark: [154, 292] },
  { id: "V3", rule: "SPEED · LCP 4.2 S", text: "HERO IMAGE IS NOT PRELOADED. TARGET 2.5 S.", r: [396, 96, 288, 208], mark: [676, 104] },
  { id: "V4", rule: "LAYOUT · CLS 0.31", text: "CHART HAS NO SET SIZE AND JUMPS. TARGET 0.1.", r: [476, 346, 208, 138], mark: [676, 354] },
];

const VIOLATIONS: Violation[] = baseViolations.map((v) => ({ ...v, r: [sx(v.r[0]), v.r[1], sx(v.r[2]), v.r[3]], mark: [sx(v.mark[0]), v.mark[1]] }));

function Mock({ wire }: { wire: boolean }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="rv-g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2a7a" />
          <stop offset="0.55" stopColor="#0061ff" />
          <stop offset="1" stopColor="#4d9bff" />
        </linearGradient>
      </defs>
      {shapes.map((s, i) => {
        if (wire) {
          const delay = `${((i + 1) % 12) * 90 + (i % 5) * 40}ms`;
          const common = {
            className: "rv-wire",
            pathLength: 1,
            stroke: W_STROKE,
            strokeWidth: 1,
            vectorEffect: "non-scaling-stroke" as const,
            style: { transitionDelay: delay },
          };
          if (s.k === "rect") return <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} {...common} />;
          if (s.k === "circle") return <circle key={i} cx={s.x} cy={s.y} r={s.r} {...common} />;
          if (s.k === "line") return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} {...common} strokeOpacity={s.op ?? 1} />;
          if (s.k === "path") return <path key={i} d={s.d} {...common} />;
          return (
            <g key={i}>
              {s.wire
                .filter((l) => l[2] > 0)
                .map((l, j) => (
                  <line key={j} x1={l[0]} y1={l[1]} x2={l[0] + l[2]} y2={l[1]} {...common} strokeWidth={s.size > 20 ? 5 : 1} />
                ))}
            </g>
          );
        }
        if (s.k === "rect")
          return (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={s.rx}
              fill={s.fill}
              stroke={s.fill && s.fill.startsWith("rgba(255,255,255,0.0") ? "rgba(255,255,255,0.1)" : undefined}
            />
          );
        if (s.k === "circle") return <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.fill} />;
        if (s.k === "line") return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgba(255,255,255,0.12)" />;
        if (s.k === "path") return <path key={i} d={s.d} stroke={s.stroke} strokeWidth={2} strokeLinejoin="round" />;
        return (
          <text key={i} x={s.x} y={s.y} fontSize={s.size} fontWeight={s.weight ?? 400} fill={s.fill} fontFamily="var(--font-sans)" letterSpacing={s.size > 20 ? -0.8 : 0}>
            {s.str}
          </text>
        );
      })}
    </svg>
  );
}

const TAGS: { id: string; label: string; side: "l" | "r"; y: number; len: number }[] = [
  { id: "V1", label: "CONTRAST 2.9:1", side: "l", y: 246, len: 36 },
  { id: "V2", label: "VAGUE CTA", side: "l", y: 310, len: 36 },
  { id: "V3", label: "LCP 4.2 S", side: "r", y: 104, len: 36 },
  { id: "V4", label: "CLS 0.31", side: "r", y: 400, len: 36 },
];

const SPEC: [string, string][] = [
  ["Site", "acme-co.com"],
  ["Pages", "48 crawled"],
  ["Issues", "63 found"],
  ["Critical", "9"],
  ["SEO", "41 / 100"],
  ["Speed", "LCP 4.2 s"],
  ["A11Y", "WCAG 2.2 AA"],
  ["Status", "Revamp ready"],
];

export default function RevampHero() {
  const [reduced, setReduced] = useState(false);
  const [screen, setScreen] = useState(false); // the window appears
  const [drawn, setDrawn] = useState(false); // then the website draws itself in it
  const [p, setP] = useState(0); // scan progress, 0 to 1
  const [ui, setUi] = useState(false); // headline and bottom bar
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [overStage, setOverStage] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [sel, setSel] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const [hits, setHits] = useState<string[]>([]);

  const sheetRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const ready = p >= 1;

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let raf = 0;
    if (rm) {
      timers.push(
        window.setTimeout(() => {
          setReduced(true);
          setScreen(true);
          setDrawn(true);
          setP(1);
          setUi(true);
        }, 0),
      );
    } else {
      timers.push(window.setTimeout(() => setScreen(true), 150));
      timers.push(window.setTimeout(() => setDrawn(true), 300));
      const t0 = performance.now() + 1900;
      const tick = (now: number) => {
        const t = Math.min(Math.max((now - t0) / 2000, 0), 1);
        setP(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      timers.push(window.setTimeout(() => setUi(true), 3800));
    }
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toStage = useCallback((e: { clientX: number; clientY: number }) => {
    const r = stageRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height };
  }, []);

  const onMove = (e: RPointerEvent) => {
    const r = sheetRef.current!.getBoundingClientRect();
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    if (dragging.current && sel) {
      const s = toStage(e);
      setSel({ ...sel, x1: s.x, y1: s.y });
    }
  };

  const onDown = (e: RPointerEvent) => {
    if (!ready) return;
    const s = toStage(e);
    if (s.x < 0 || s.y < 0 || s.x > s.w || s.y > s.h) return;
    dragging.current = true;
    setHits([]);
    setSel({ x0: s.x, y0: s.y, x1: s.x, y1: s.y });
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (!sel || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const k = W / r.width;
    const [ax, bx] = [Math.min(sel.x0, sel.x1) * k, Math.max(sel.x0, sel.x1) * k];
    const [ay, by] = [Math.min(sel.y0, sel.y1) * k, Math.max(sel.y0, sel.y1) * k];
    const found = VIOLATIONS.filter((v) => ax < v.r[0] + v.r[2] && bx > v.r[0] && ay < v.r[1] + v.r[3] && by > v.r[1]).map((v) => v.id);
    setHits(found);
    setDragged(true);
    if (!found.length) setSel(null);
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHits([]);
        setSel(null);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <section aria-labelledby="revamp-title" className="relative bg-black">
      <div
        ref={sheetRef}
        onPointerMove={onMove}
        onPointerLeave={() => setMouse(null)}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative flex min-h-[calc(100svh-4rem)] select-none lg:h-[calc(100svh-4rem)] lg:min-h-[520px] flex-col overflow-hidden border-b border-white/25 touch-pan-y"
      >
        {/* corner marks */}
        {["left-2.5 top-2.5", "right-2.5 top-2.5", "bottom-[clamp(168px,24svh,208px)] left-2.5 max-lg:hidden", "bottom-[clamp(168px,24svh,208px)] right-2.5 max-lg:hidden"].map((c) => (
          <span key={c} aria-hidden className={`pointer-events-none absolute ${c} text-[15px] leading-none text-white/50`}>
            +
          </span>
        ))}

        {/* guide lines that follow the cursor */}
        {mouse && ready && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
            <span className="absolute inset-y-0 w-px bg-white/15" style={{ left: mouse.x }} />
            <span className="absolute inset-x-0 h-px bg-white/15" style={{ top: mouse.y }} />
          </div>
        )}

        {/* the stage: a MacBook that opens, with the site drawn and then built on its screen */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 py-6 [container-type:size] max-lg:h-[clamp(320px,86vw,580px)] max-lg:flex-none lg:px-8 lg:py-8">
          <div className="relative aspect-[960/510] w-[min(100cqw,calc(100cqh*1.8824),760px)] lg:w-[min(68cqw,calc(100cqh*1.8824))]">
            {/* crop marks around the elevation */}
            {["-left-3 -top-3", "-right-3 -top-3", "-bottom-3 -left-3", "-bottom-3 -right-3"].map((c) => (
              <span key={c} aria-hidden className={`pointer-events-none absolute ${c} text-[13px] leading-none text-white/40 max-lg:hidden`}>
                +
              </span>
            ))}

            {/* the finished site, drawn then built; this is what you can drag over */}
            <div
              ref={stageRef}
              onPointerEnter={() => setOverStage(true)}
              onPointerLeave={() => setOverStage(false)}
              className={`absolute inset-0 transition-opacity duration-700 ${ready ? "cursor-crosshair" : ""}`}
              style={{ opacity: screen ? 1 : 0 }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-lg border border-white/30 bg-[#05070c]">
                <div data-drawn={drawn ? "" : undefined} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: screen && !ready ? 1 : 0 }}>
                  <Mock wire />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 0 ${(1 - p) * 100}% 0)` }}
                  role="img"
                  aria-label="A finished, fast and accessible website"
                >
                  <Mock wire={false} />
                </div>
                {/* the scan band */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 z-20 h-0 transition-opacity duration-500"
                  style={{ top: `${p * 100}%`, opacity: p > 0 && p < 1 ? 1 : 0 }}
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-brand-text" />
                  <span className="absolute inset-x-0 top-0 h-10 -translate-y-full bg-gradient-to-t from-brand-text/25 to-transparent" />
                  <span className="absolute right-0 top-0 -translate-y-full bg-brand-text px-2 py-0.5 font-mono text-[9px] font-semibold tracking-[0.08em] text-black">
                    WCAG 2.2 AUDIT {String(Math.round(p * 100)).padStart(3, "0")}%
                  </span>
                </div>
              </div>

              {/* markers: something here is worth a look */}
              {ready &&
                VIOLATIONS.map((v, i) => (
                  <span key={v.id} aria-hidden className="rv-pop absolute size-[9px] bg-brand-text" style={{ left: pct(v.mark[0] - 4, W), top: pct(v.mark[1] - 4, H), animationDelay: `${i * 110}ms` }} />
                ))}

              {/* the selection box and the problems found in it */}
              {sel && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute z-20 border border-brand-text bg-brand-text/10"
                  style={{ left: Math.min(sel.x0, sel.x1), top: Math.min(sel.y0, sel.y1), width: Math.abs(sel.x1 - sel.x0), height: Math.abs(sel.y1 - sel.y0) }}
                />
              )}
              {hits.map((id) => {
                const v = VIOLATIONS.find((x) => x.id === id)!;
                const right = v.r[0] > W / 2;
                return (
                  <div key={id} aria-hidden className="pointer-events-none absolute inset-0 z-30">
                    <span
                      className="absolute border border-brand-text bg-gradient-to-br from-brand-text/5 to-brand-text/45"
                      style={{ left: pct(v.r[0], W), top: pct(v.r[1], H), width: pct(v.r[2], W), height: pct(v.r[3], H) }}
                    />
                    <div
                      className="rv-pop absolute w-[210px] bg-brand-text px-3 py-2.5 font-mono text-[9px] font-semibold leading-[1.5] tracking-[0.04em] text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                      style={{
                        left: right ? undefined : pct(v.r[0] + 8, W),
                        right: right ? `calc(${pct(W - v.r[0] - v.r[2], W)} + 8px)` : undefined,
                        top: pct(v.r[1] + v.r[3] * 0.35, H),
                      }}
                    >
                      <span className="block font-normal text-black/65">
                        {v.id} · {v.rule}
                      </span>
                      {v.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* issue tags either side, each on a leader line to what it names (desktop) */}
            {ready &&
              TAGS.map((t, i) => (
                <div
                  key={t.id}
                  aria-hidden
                  className="rv-pop pointer-events-none absolute z-10 flex items-center max-lg:hidden"
                  style={{
                    top: pct(t.y, H),
                    transform: "translateY(-50%)",
                    animationDelay: `${300 + i * 120}ms`,
                    ...(t.side === "l" ? { right: "100%", flexDirection: "row" } : { left: "100%", flexDirection: "row-reverse" }),
                  }}
                >
                  <span className="whitespace-nowrap border border-white/30 bg-black px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-[0.06em] text-white/85">
                    <span className="text-brand-text">{t.id}</span> {t.label}
                  </span>
                  <span className="h-px bg-brand-text/70" style={{ width: t.len }} />
                </div>
              ))}
          </div>
        </div>

        {/* the tooltip that follows the cursor until the first drag */}
        {mouse && ready && overStage && !dragged && (
          <div
            aria-hidden
            className="pointer-events-none absolute z-40 w-[150px] bg-white px-2 py-1.5 font-mono text-[9px] leading-[1.4] tracking-[0.04em] text-black"
            style={{ left: mouse.x + 14, top: mouse.y + 14 }}
          >
            CLICK AND DRAG YOUR MOUSE TO SEE VIOLATIONS
          </div>
        )}
        {ready && !reduced && <span className="sr-only">Click and drag over the site to see what it gets wrong.</span>}

        {/* the bar at the bottom: headline | spec readout */}
        <div
          className={`grid border-t border-white/25 bg-black transition-all duration-700 ease-out lg:h-[clamp(168px,24svh,208px)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] ${
            ui ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="flex items-center px-5 py-7 lg:border-r lg:border-white/25 lg:px-8">
            <h1
              id="revamp-title"
              className="text-[clamp(1.5rem,min(2.6vw,4.2svh),2.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.03em] text-white"
            >
              Designed by Rabbitt,
              <br />
              the AI website
              <br />
              revamp studio
            </h1>
          </div>
          <div aria-hidden className="hidden flex-col justify-between px-8 py-6 font-mono text-[10px] uppercase leading-[1.55] tracking-[0.06em] text-white/60 lg:flex">
            <dl className="grid grid-cols-[4.5rem_1fr] gap-x-2">
              {SPEC.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-white/45">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <span className="text-white/40">[Scroll to continue]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
