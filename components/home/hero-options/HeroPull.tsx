"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Buttons from "./Buttons";
import styles from "./HeroPull.module.css";

// Option J · "The pull", after the agent section on krea.ai, told as our story in three beats that
// play by themselves once the screen is in view (no scrolling needed):
//   1. The joke. One dry line about big public models, fading in word by word, with particles of
//      light streaming out from around it: your data, leaving.
//   2. The pull. Once the line has been read, every particle is pulled back in, and together they
//      spell the headline, "Own your data. Own your AI.", which then sharpens into the real text.
//   3. The promise. The particles settle into a slow orbit around the headline and its one line of
//      copy, and the buttons come in.
// All the words are in the HTML from the first paint; the particles are a decorative canvas.

const JOKE = "A trillion parameters, and it still can't find your refund policy.";

// The timeline. The joke fades in word by word (about 1s) and stays long enough to be read; then the
// transition plays out over TRANSITION seconds. The ranges below are fractions of that transition (0 to 1).
const READ_DELAY = 3.2; // seconds from coming into view until the pull begins
const TRANSITION = 7.5; // seconds the pull and the landing take
const JOKE_OUT: [number, number] = [0, 0.16]; // the joke fades and blurs away
const FORM: [number, number] = [0.03, 0.36]; // the particles fly in and spell the headline, left to right
// 0.36 - 0.5: the headline holds, spelled in particles
const HEADLINE_IN: [number, number] = [0.5, 0.6]; // the real headline sharpens in over them
const SETTLE: [number, number] = [0.58, 0.88]; // the particles leave the words for their orbit
const REST_IN: [number, number] = [0.64, 0.78]; // the copy and buttons rise in

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const norm = (v: number, [a, b]: [number, number]) => clamp01((v - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const useRamp = (p: MotionValue<number>, [a, b]: [number, number], from: number, to: number) =>
  // every map spans 0 to 1 so values hold after their last keyframe
  useTransform(p, [0, a, b, 1], [from, from, to, to]);

type Rect = { x: number; y: number; w: number; h: number };
type Particle = {
  hx: number; // home, as a star
  hy: number;
  tx: number; // its place in the headline
  ty: number;
  stream: boolean; // streams out of the first chat, then orbits the second; otherwise a star
  a: number; // angle around a chat
  sp: number; // speed
  off: number; // phase
  r: number; // how far out it orbits (0 close, 1 far)
  size: number;
  blue: boolean;
  d1: number; // when it starts flying in
  d2: number; // when it leaves the words
  keep: boolean; // stays on screen after the headline has formed (about a third do; the rest fade out)
  lx: number; // where it was drawn last frame
  ly: number;
};

// ---------------------------------------------------------------------------------------------
// The particle field. It reads the timeline's progress every frame and positions each particle by
// blending three places: where it is in beat 1, its spot in the headline, and where it is in beat 3.
// Each particle is drawn as a short streak along its own motion, so anything moving fast reads as
// light being pulled, and anything still reads as a star.
// ---------------------------------------------------------------------------------------------
function useParticleField(opts: {
  progress: MotionValue<number>;
  reduce: boolean;
  stage: RefObject<HTMLDivElement | null>;
  canvas: RefObject<HTMLCanvasElement | null>;
  headline: RefObject<HTMLHeadingElement | null>;
  source: RefObject<HTMLElement | null>; // the streams leave from around this
  orbit: RefObject<HTMLDivElement | null>;
}) {
  const { progress, reduce, stage: stageRef, canvas: canvasRef, headline, source, orbit } = opts;

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!stage || !canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let parts: Particle[] = [];
    let raf = 0;
    let onScreen = true;
    let prog = reduce ? 1 : progress.get();
    let last = 0;
    let cancelled = false;
    let fontsReady = false;
    let sampleTimer = 0;
    // where the joke and the headline block are, measured once (and again on resize or when the font
    // arrives) instead of on every frame: reading layout 60 times a second, right after the timeline
    // has changed styles, forces the browser to lay the page out each frame
    let box1: Rect | null = null;
    let box2: Rect | null = null;

    const rel = (el: Element | null): Rect | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    };
    const measureBoxes = () => {
      box1 = rel(source.current);
      box2 = rel(orbit.current);
    };

    // Sample the headline's letters at exactly the place and size the real headline is laid out. Only
    // the headline's own box is drawn and read (not the whole screen), so this stays cheap.
    const headlinePoints = (): [number, number][] => {
      const h1 = headline.current;
      if (!h1) return [];
      const rows = Array.from(h1.children)
        .map((el) => ({ el, b: rel(el) }))
        .filter((r): r is { el: Element; b: Rect } => !!r.b);
      if (!rows.length) return [];
      const pad = 12;
      const x0 = Math.max(0, Math.floor(Math.min(...rows.map((r) => r.b.x)) - pad));
      const y0 = Math.max(0, Math.floor(Math.min(...rows.map((r) => r.b.y)) - pad));
      const x1 = Math.min(w, Math.ceil(Math.max(...rows.map((r) => r.b.x + r.b.w)) + pad));
      const y1 = Math.min(h, Math.ceil(Math.max(...rows.map((r) => r.b.y + r.b.h)) + pad));
      const off = document.createElement("canvas");
      off.width = Math.max(1, x1 - x0);
      off.height = Math.max(1, y1 - y0);
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return [];
      const cs = getComputedStyle(h1);
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      if ("letterSpacing" in o) (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = cs.letterSpacing;
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      for (const { el, b } of rows)
        o.fillText(el.textContent ?? "", b.x + b.w / 2 - x0, b.y + b.h / 2 + parseFloat(cs.fontSize) * 0.04 - y0);
      const { data } = o.getImageData(0, 0, off.width, off.height);
      const step = w < 640 ? 2 : 3;
      const pts: [number, number][] = [];
      for (let y = 0; y < off.height; y += step)
        for (let x = 0; x < off.width; x += step) if (data[(y * off.width + x) * 4 + 3] > 150) pts.push([x + x0, y + y0]);
      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      return pts;
    };

    // Give every particle its place in the headline. This waits for the font and runs a moment later,
    // off the first frames: the field is on screen and moving from the first paint, and the particles
    // only head for their letters when the pull begins, seconds later.
    const assignTargets = () => {
      window.clearTimeout(sampleTimer);
      sampleTimer = window.setTimeout(() => {
        if (cancelled) return;
        const pts = headlinePoints();
        if (!pts.length) return;
        parts.forEach((q, i) => {
          const t = pts[i % pts.length];
          const extra = i >= pts.length; // more particles than points: double up, slightly offset
          q.tx = t[0] + (extra ? Math.random() * 2 - 1 : 0);
          q.ty = t[1] + (extra ? Math.random() * 2 - 1 : 0);
          q.d1 = 0.26 * (q.tx / Math.max(w, 1)) + Math.random() * 0.1;
        });
      }, 60);
    };

    const build = () => {
      const s = stage.getBoundingClientRect();
      w = s.width;
      h = s.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureBoxes();

      const n = Math.round(Math.min(2600, Math.max(700, (w * h) / 480)));
      parts = Array.from({ length: n }, (_, i) => {
        const hx = Math.random() * w;
        const hy = Math.random() * h;
        return {
          hx,
          hy,
          // until the headline has been sampled a particle's "place in the headline" is just its home
          tx: hx,
          ty: hy,
          stream: i % 5 < 2,
          a: Math.random() * Math.PI * 2,
          sp: 0.06 + Math.random() * 0.16,
          off: Math.random(),
          r: Math.pow(Math.random(), 2.2),
          size: 0.6 + Math.random() * 1.1,
          blue: Math.random() < 0.22,
          d1: Math.random() * 0.1,
          d2: Math.random() * 0.3,
          keep: Math.random() < (i % 5 < 2 ? 0.4 : 0.3),
          lx: NaN,
          ly: NaN,
        };
      });
      if (fontsReady) assignTargets();
    };

    // alpha is bucketed so the whole field is drawn in a dozen strokes, not thousands
    const BUCKETS = 6;
    const lines: Path2D[] = [];
    const dots: Path2D[] = [];

    const draw = (time: number) => {
      const target = reduce ? 1 : progress.get();
      // ease toward the timeline at the same speed whatever the frame rate
      const dt = last ? Math.min(0.1, (time - last) / 1000) : 1 / 60;
      last = time;
      prog += (target - prog) * (1 - Math.pow(0.82, dt * 60));
      const p = prog;
      const tt = reduce ? 0 : time / 1000;
      const form = norm(p, FORM);
      const settle = norm(p, SETTLE);
      const b1 = box1;
      const b2 = box2;
      const diag = Math.hypot(w, h);

      for (let i = 0; i < BUCKETS * 2; i++) {
        lines[i] = new Path2D();
        dots[i] = new Path2D();
      }
      ctx.clearRect(0, 0, w, h);

      for (const q of parts) {
        // beat 1: a star drifting, or a streak leaving the first chat
        const sx = q.hx + Math.sin(tt * 0.07 + q.off * 6) * 6;
        const sy = q.hy + Math.cos(tt * 0.05 + q.off * 6) * 6;
        const twinkle = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(tt * 1.3 + q.off * 20));
        let ax = sx;
        let ay = sy;
        let aAlpha = twinkle * 0.7;
        if (q.stream && b1) {
          const ca = Math.cos(q.a);
          const sa = Math.sin(q.a);
          const frac = (tt * q.sp + q.off) % 1;
          let dx = ca - sa * 0.35;
          let dy = sa + ca * 0.35;
          const len = Math.hypot(dx, dy);
          dx /= len;
          dy /= len;
          const dist = frac * frac * diag * 0.55;
          ax = b1.x + b1.w / 2 + (b1.w / 2 + 4) * ca + dx * dist;
          ay = b1.y + b1.h / 2 + (b1.h / 2 + 4) * sa + dy * dist;
          aAlpha = Math.sin(Math.PI * frac) * 0.9;
        }

        // beat 3: a star again, or orbiting the headline and its copy
        let cx = sx;
        let cy = sy;
        let cAlpha = q.keep ? twinkle * 0.5 : 0;
        if (q.stream && b2 && q.keep) {
          const th = q.a + tt * q.sp * 2.4;
          const rx = b2.w / 2 + 24 + q.r * w * 0.18;
          const ry = b2.h / 2 + 18 + q.r * h * 0.16;
          cx = b2.x + b2.w / 2 + rx * Math.cos(th);
          cy = b2.y + b2.h / 2 + ry * Math.sin(th);
          cAlpha = 0.75 - q.r * 0.5;
        }

        const f = ease(clamp01((form - q.d1) / 0.64));
        const s = ease(clamp01((settle - q.d2) / 0.7));
        let x = ax + (q.tx - ax) * f;
        let y = ay + (q.ty - ay) * f;
        x += (cx - x) * s;
        y += (cy - y) * s;
        const alpha = (aAlpha + (0.95 - aAlpha) * f) * (1 - s) + cAlpha * s;

        const mx = x - q.lx;
        const my = y - q.ly;
        q.lx = x;
        q.ly = y;
        if (alpha < 0.04 || x < -60 || y < -60 || x > w + 60 || y > h + 60) continue;
        // Particles are drawn at full strength wherever they are, including behind the words (the
        // canvas sits under the text, which is not on a plate). They used to be dimmed near the text,
        // which left an empty patch around it; the owner asked for that to go.
        const k = (q.blue ? BUCKETS : 0) + Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
        const moved = Math.hypot(mx, my);
        if (Number.isFinite(moved) && moved > 0.35 && moved < 90) {
          // a streak trailing behind, longer the faster it moves. Long while streaming and orbiting;
          // short as it closes in on its letter, so the words read while they form.
          const trail = 3 - 1.9 * f * (1 - s);
          const scale = Math.min(trail, 36 / moved);
          lines[k].moveTo(x, y);
          lines[k].lineTo(x - mx * scale, y - my * scale);
        } else {
          const z = q.size * (1 - f * 0.25 + f * 0.15);
          dots[k].rect(x - z / 2, y - z / 2, z, z);
        }
      }

      ctx.lineCap = "round";
      ctx.lineWidth = 1.1;
      for (let i = 0; i < BUCKETS * 2; i++) {
        const blue = i >= BUCKETS;
        ctx.globalAlpha = ((i % BUCKETS) + 0.5) / BUCKETS;
        ctx.strokeStyle = blue ? "#4d9bff" : "#ffffff";
        ctx.fillStyle = ctx.strokeStyle;
        ctx.stroke(lines[i]);
        ctx.fill(dots[i]);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      if (!reduce && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        // an observer always reports once when it starts: only rebuild when the size really changed
        const s = stage.getBoundingClientRect();
        if (Math.abs(s.width - w) < 1 && Math.abs(s.height - h) < 1) {
          measureBoxes();
          return;
        }
        build();
        start();
      }, 120);
    });
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
    });
    io.observe(stage);
    const onVisible = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVisible);

    // The field starts at once, without waiting for anything. The headline's font must be loaded
    // before its letters are sampled, and once it is the text may have moved a little, so the boxes
    // are measured again.
    build();
    start();
    document.fonts.ready.then(() => {
      if (cancelled) return;
      fontsReady = true;
      measureBoxes();
      assignTargets();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.clearTimeout(sampleTimer);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [progress, reduce, stageRef, canvasRef, headline, source, orbit]);
}

// `replay` shows a small button to play it again (for the /design review page only).
export default function HeroPull({ replay = false }: { replay?: boolean }) {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jokeRef = useRef<HTMLParagraphElement>(null);
  const sourceRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  // the timeline runs on its own, once the hero is mostly in view
  const timeline = useMotionValue(0);
  const still = useMotionValue(1);
  const p = reduce ? still : timeline;
  const [run, setRun] = useState(0); // 0: not seen yet; each replay adds one
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun((r) => (r === 0 ? 1 : r));
          io.disconnect();
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  useEffect(() => {
    if (run === 0 || reduce) return;
    timeline.set(0);
    const controls = animate(timeline, 1, { duration: TRANSITION, delay: READ_DELAY, ease: "linear" });
    return () => controls.stop();
  }, [run, reduce, timeline]);
  const done = useTransform(timeline, (v) => (v >= 1 ? 1 : 0));

  // beat 1
  const jokeOpacity = useRamp(p, JOKE_OUT, 1, 0);
  const jokeBlur = useTransform(useRamp(p, JOKE_OUT, 0, 10), (b) => `blur(${b}px)`);
  const jokeScale = useRamp(p, JOKE_OUT, 1, 0.96);
  const jokeEvents = useTransform(jokeOpacity, (o) => (o > 0.5 ? "auto" : "none"));
  // beat 2 and 3
  const headlineOpacity = useRamp(p, HEADLINE_IN, 0, 1);
  const headlineBlur = useTransform(useRamp(p, HEADLINE_IN, 12, 0), (b) => `blur(${b}px)`);
  const restOpacity = useRamp(p, REST_IN, 0, 1);
  const restY = useRamp(p, REST_IN, 16, 0);
  const restEvents = useTransform(restOpacity, (o) => (o > 0.5 ? "auto" : "none"));

  useParticleField({
    progress: p,
    reduce,
    stage: stageRef,
    canvas: canvasRef,
    headline: headlineRef,
    source: sourceRef,
    orbit: orbitRef,
  });

  const jokeWords = JOKE.split(" ");

  return (
    <section ref={sectionRef} data-nav-theme="dark" className="relative bg-page text-white">
      <div ref={stageRef} className="relative h-svh min-h-[640px] overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`pointer-events-none absolute inset-0 h-full w-full ${styles.field}`}
        />

        {/* beat 1: the joke */}
        {!reduce && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-5 pt-16"
            style={{
              opacity: jokeOpacity,
              filter: jokeBlur,
              scale: jokeScale,
              pointerEvents: jokeEvents,
              // own layer, so the blur and fade are done by the GPU and never repaint the text
              willChange: "opacity, filter, transform",
            }}
          >
            <p
              ref={(el) => {
                jokeRef.current = el;
                sourceRef.current = el;
              }}
              className="max-w-[960px] text-balance text-center text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.035em]"
            >
              {jokeWords.map((word, i) => (
                <span
                  // On the home page the fade is plain CSS, running from the first paint with no script.
                  // On /design (`replay`) it is keyed to the run so the button can start it again.
                  key={replay ? `${run}-${i}` : i}
                  className={!replay || run > 0 ? styles.word : undefined}
                  style={{ "--d": `${0.2 + i * 0.09}s` } as CSSProperties}
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          </motion.div>
        )}

        {/* beats 2 and 3: the headline the particles spell, then its one line and the buttons */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 pt-16">
          <div ref={orbitRef} className="flex flex-col items-center">
            <motion.h1 ref={headlineRef} className={styles.headline} style={{ opacity: headlineOpacity, filter: headlineBlur, willChange: "opacity, filter" }}>
              <span>Own your data.</span>
              <span>Own your AI.</span>
            </motion.h1>
            <motion.p
              style={{ opacity: restOpacity, y: restY, willChange: "opacity, transform" }}
              className="mt-6 max-w-[44ch] text-balance text-center text-[clamp(18px,1.6vw,22px)] leading-relaxed text-white/70"
            >
              Small language models trained on your data and run inside your own cloud. They know your business, and nothing leaves.
            </motion.p>
          </div>

          <motion.div
            className="mt-10 flex justify-center [&>div]:justify-center"
            style={{ opacity: restOpacity, y: restY, pointerEvents: restEvents, willChange: "opacity, transform" }}
          >
            <Buttons />
          </motion.div>
        </div>

        {replay && !reduce && (
          <motion.button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            style={{ opacity: done }}
            className="absolute bottom-6 right-6 inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-[13px] font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Replay
          </motion.button>
        )}
      </div>
    </section>
  );
}
