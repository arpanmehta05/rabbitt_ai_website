import type React from "react";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Easing, interpolate, useVideoConfig } from "remotion";

// One family, as on the site (design.md §6).
export const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

// The film is played on its own stage: one flat midnight navy (no spotlight, no gradient). It is dark
// enough to sit on the dark site, but it is not the site's black, so the section still stands apart.
// Everything on it is white; the accent is inverted (white plate, blue type).
export const C = {
  stage: "#0a1d54",
  pool: "rgba(150,190,255,0.20)", // where it lands on the floor
  accent: "#0b4fe0", // blue type on a white plate or chip
  // the site's tokens that still apply
  navy: "#050d29",
  brand: "#0061ff",
  white: "#ffffff",
  ink: "#05060a",
  body: "rgba(255,255,255,0.84)",
  dim: "rgba(255,255,255,0.7)",
  lineMid: "rgba(255,255,255,0.45)",
  lineStrong: "rgba(255,255,255,0.9)",
};

// a chip (a file, a log): a white pill with blue type, so it pops off the stage
export const chip = (fontSize: number): React.CSSProperties => ({
  whiteSpace: "nowrap",
  fontSize,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: C.accent,
  background: C.white,
  padding: `${Math.round(fontSize * 0.42)}px ${Math.round(fontSize * 0.8)}px`,
  borderRadius: 999,
  lineHeight: 1,
  boxShadow: "0 6px 18px -8px rgba(0,20,90,0.6)",
});

// the accent: a white plate behind blue type, like a highlighter
export const plate: React.CSSProperties = {
  background: C.white,
  color: C.accent,
  borderRadius: "0.14em",
  padding: "0 0.16em",
  margin: "0 -0.04em",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
};

export const FPS = 30;
export const BEAT = 15; // 120 BPM at 30 fps
export const TOTAL = 900; // 30 s

// [from, duration] in frames; every cut lands on a beat
export const SCENES = {
  trick: [0, 105],
  dataIn: [105, 150],
  aiOut: [255, 150],
  stays: [405, 135],
  cards: [540, 210],
  close: [750, 150],
} as const;

// the site's ease-out, cubic-bezier(0.22, 1, 0.36, 1)
export const EASE = Easing.bezier(0.22, 1, 0.36, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.4);

// interpolate, always clamped
export const ip = (f: number, input: number[], output: number[], easing: (t: number) => number = EASE) =>
  interpolate(f, input, output, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

// 16:9 is laid out on a 1920-wide grid, 9:16 on a 1080-wide one
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  return { vertical, width, height, pad: vertical ? 72 : 160 };
};

// a word or line rising into place: 24px up, fading in, over `dur` frames
export const rise = (f: number, start: number, dur = 12, dist = 24) => ({
  opacity: ip(f, [start, start + dur * 0.7], [0, 1]),
  transform: `translateY(${ip(f, [start, start + dur], [dist, 0])}px)`,
});

// the last frames of a scene: a quick fade and a slight push in, so cuts land soft but on the beat
export const exit = (f: number, duration: number, len = 6) => ({
  opacity: ip(f, [duration - len, duration], [1, 0], EASE_IN),
  transform: `scale(${ip(f, [duration - len, duration], [1, 1.03], EASE_IN)})`,
});
