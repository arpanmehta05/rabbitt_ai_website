import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, exit, rise, useLayout } from "../theme";

// 0:00–0:03.5. The hat drops in and lands with a squash. The line asks for a trick.
export function S1Trick({ duration }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { vertical, pad } = useLayout();
  return (
    <AbsoluteFill style={{ ...exit(f, duration, 6), alignItems: "center", textAlign: "center", padding: `0 ${pad}px` }}>
      <div style={{ marginTop: vertical ? 380 : 170 }}>
        <div style={{ fontSize: vertical ? 120 : 132, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.02, color: C.white, ...rise(f, 24, 12, 40) }}>
          Want to see a trick?
        </div>
        <div style={{ marginTop: 26, fontSize: vertical ? 48 : 48, fontWeight: 500, letterSpacing: "-0.02em", color: C.body, ...rise(f, 50, 12, 20) }}>
          Keep your eye on the hat.
        </div>
      </div>
    </AbsoluteFill>
  );
}
