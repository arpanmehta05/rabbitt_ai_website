import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ip, useLayout, EASE } from "./theme";

// The hat: the Rabbitt logo (a rabbit in a magician's hat) is the one character in the film. It
// lives on its own layer across every scene, moves between marks, gulps when something drops in,
// stretches when something pops out, and tips its brim at the end.
//
// A mark is [frame, x, y, size]: x and y are the centre of the logo's box.
type Mark = [number, number, number, number];

const MARKS: Mark[] = [
  [20, 960, 620, 260], // lands
  [100, 960, 620, 260],
  [118, 960, 800, 300], // data goes in
  [400, 960, 800, 300],
  [420, 700, 640, 260], // nothing leaves
  [536, 700, 640, 260],
  [556, 960, 985, 130], // deals the cards
  [746, 960, 985, 130],
  [768, 960, 600, 300], // no smoke, no mirrors
  [832, 960, 600, 300],
  [848, 640, 540, 210], // the lock-up
];
const MARKS_V: Mark[] = [
  [20, 540, 1150, 320],
  [100, 540, 1150, 320],
  [118, 540, 1560, 340],
  [400, 540, 1560, 340],
  [420, 540, 980, 280],
  [536, 540, 980, 280],
  [556, 540, 1690, 150],
  [746, 540, 1690, 150],
  [768, 540, 1000, 340],
  [832, 540, 1000, 340],
  [848, 540, 860, 260],
];

// frames where something drops in (gulp) or pops out (stretch)
export const GULPS = [...Array.from({ length: 8 }, (_, i) => 151 + i * 10), ...[0, 1, 2, 3].map((i) => 405 + 52 + i * 16), 540 + 196];
export const POPS = [...Array.from({ length: 6 }, (_, i) => 255 + 16 + i * 14), ...Array.from({ length: 6 }, (_, i) => 540 + 12 + i * 6)];
export const TIP = 852;

const pulse = (f: number, at: number) => ip(f - at, [0, 3, 12], [0, 1, 0], (t) => t);

export const hatAt = (f: number, vertical: boolean) => {
  const m = vertical ? MARKS_V : MARKS;
  const frames = m.map((k) => k[0]);
  const x = ip(f, frames, m.map((k) => k[1]), EASE);
  const yRest = ip(f, frames, m.map((k) => k[2]), EASE);
  const size = ip(f, frames, m.map((k) => k[3]), EASE);
  return { x, yRest, size, mouth: (y: number) => y - size * 0.07 };
};

export function Hat() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical } = useLayout();
  const { x, yRest, size } = hatAt(f, vertical);

  // the drop: from above the frame, on a bouncy spring
  const drop = spring({ frame: f, fps, config: { damping: 9, stiffness: 110, mass: 0.9 } });
  const y = yRest - (1 - drop) * (vertical ? 1400 : 900);
  const land = pulse(f, 12) * 1.6;

  const gulp = Math.max(0, ...GULPS.map((g) => pulse(f, g)));
  const pop = Math.max(0, ...POPS.map((p) => pulse(f, p)));
  const sx = 1 + 0.14 * (gulp + land) - 0.1 * pop;
  const sy = 1 - 0.14 * (gulp + land) + 0.14 * pop;

  // a tip of the brim at the end, ta-da
  const tip = spring({ frame: f - TIP, fps, config: { damping: 8, stiffness: 120 } });
  const rot = f >= TIP ? Math.sin(tip * Math.PI) * -16 : 0;
  // a little idle wobble, so it never sits dead still
  const idle = Math.sin(f / 9) * 1.5;

  const opacity = ip(f, [890, 898], [1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${rot + idle}deg) scale(${sx}, ${sy})`,
        transformOrigin: "50% 92%",
        opacity,
        zIndex: 20,
      }}
    >
      {/* the mark in white, so it reads on the blue stage */}
      <Img src={staticFile("logo.svg")} style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}
