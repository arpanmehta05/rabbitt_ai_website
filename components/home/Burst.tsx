"use client";

import { useEffect, useRef } from "react";

// A fan of fine fibres rising from the bottom centre, each ending in a bead of light. They breathe
// slowly, grow in the first time the burst is seen, and lean towards the pointer. Colours ease to
// whatever the section's theme asks for.

export type BurstColors = { line: [number, number, number]; dot: [number, number, number]; tip: [number, number, number]; strength?: number };

type Fibre = { a: number; len: number; seed: number; w: number; r: number; tipMix: number };

function makeFibres(n: number): Fibre[] {
  let s = 31;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: n }, () => {
    // spread evenly round the half circle; most reach the edge of the dome, a few stop short
    const a = Math.PI * (0.035 + 0.93 * rand());
    return { a, len: 1 - 0.6 * Math.pow(rand(), 2.4), seed: rand() * 10, w: 0.55 + rand() * 0.8, r: 1.6 + rand() * 2.2, tipMix: rand() };
  });
}

export default function Burst({ colors, className = "" }: { colors: BurstColors; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  // the colours are read each frame from here, so a theme change does not restart the drawing
  const target = useRef(colors);
  useEffect(() => {
    target.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fibres = makeFibres(window.innerWidth < 640 ? 130 : 280);
    const cur = {
      line: [...target.current.line] as number[],
      dot: [...target.current.dot] as number[],
      tip: [...target.current.tip] as number[],
    };
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;
    let grown = reduce ? 1 : 0;
    const t0 = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
    };

    const ease = (a: number[], b: number[], k: number) => {
      for (let i = 0; i < 3; i++) a[i] += (b[i] - a[i]) * k;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = (now - t0) / 1000;
      ease(cur.line, target.current.line, 0.06);
      ease(cur.dot, target.current.dot, 0.06);
      ease(cur.tip, target.current.tip, 0.06);
      if (grown < 1) grown = Math.min(1, grown + 0.011);
      const g = 1 - Math.pow(1 - grown, 3);
      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;

      ctx.clearRect(0, 0, w, h);
      const ox = w / 2;
      const oy = h + 8;
      for (const f of fibres) {
        const breathe = reduce ? 0 : Math.sin(t * 0.7 + f.seed) * 0.03;
        let ang = f.a + (reduce ? 0 : Math.sin(t * 0.35 + f.seed * 2) * 0.008);
        // the longest a fibre can be and still end inside the picture, at its angle
        // the edge of an ellipse: wide as a dome, as tall as the picture allows
        const rx = w * 0.38;
        const ry = h - 14;
        const room = 1 / Math.sqrt((Math.cos(ang) / rx) ** 2 + (Math.sin(ang) / ry) ** 2);
        const L = room * f.len * (1 + breathe * 0.5) * g;
        let tx = ox + Math.cos(ang) * L;
        let ty = oy - Math.sin(ang) * L;
        // lean towards the pointer, a little, when it is near the tip
        const dx = pointer.x - tx;
        const dy = pointer.y - ty;
        const d = Math.hypot(dx, dy);
        const near = Math.max(0, 1 - d / 190);
        if (near > 0) {
          tx += dx * near * 0.2;
          ty += dy * near * 0.2;
          ang = Math.atan2(oy - ty, tx - ox);
        }
        const lc = cur.line;
        const dc = cur.dot;
        const tc = cur.tip;
        const grad = ctx.createLinearGradient(ox, oy, tx, ty);
        grad.addColorStop(0, `rgba(${lc[0] | 0},${lc[1] | 0},${lc[2] | 0},0.05)`);
        grad.addColorStop(1, `rgba(${lc[0] | 0},${lc[1] | 0},${lc[2] | 0},${Math.min(1, (0.45 * (target.current.strength ?? 1)) + near * 0.55)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = f.w * (1 + near * 0.6);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // the bead: most are the dot colour, a few take the tip colour (the pink touch)
        const c = f.tipMix > 0.9 ? tc : dc;
        ctx.fillStyle = `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${0.55 + near * 0.45})`;
        ctx.beginPath();
        ctx.arc(tx, ty, f.r * (1 + near * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
