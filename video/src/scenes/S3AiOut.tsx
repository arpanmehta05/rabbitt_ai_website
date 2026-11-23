import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { hatAt } from "../hat";
import { C, ip, exit, plate, rise, useLayout } from "../theme";

// 0:08.5–0:13.5. Out of the hat come the things it made: each pops out of the brim on a spring,
// arcs up like a magician's scarf, and lands in its place around the hat.
const OUTS = [
  "a support agent that knows your refunds",
  "a private model, trained on your docs",
  "search that finds the right page",
  "reports that write themselves",
  "an assistant on every sales call",
  "answers in your own words",
];
const FIRST = 16;
const GAP = 14;

export function S3AiOut({ duration, from }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, width } = useLayout();
  const hat = hatAt(from + 20, vertical);
  const mx = hat.x;
  const my = hat.mouth(hat.yRest);

  // where each one lands: two columns either side of the hat, or one column above it on a phone
  const target = (i: number): [number, number, "left" | "right" | "center"] => {
    if (vertical) return [width / 2, 540 + i * 140, "center"];
    const left = i % 2 === 0;
    const row = Math.floor(i / 2);
    return [left ? 880 : 1040, 380 + row * 120, left ? "right" : "left"];
  };

  return (
    <AbsoluteFill style={{ ...exit(f, duration, 6) }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: vertical ? 220 : 110,
          textAlign: "center",
          fontSize: 120,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
          color: C.white,
          ...rise(f, 2, 12, 30),
        }}
      >
        Your <span style={plate}>AI</span> comes out.
      </div>

      {OUTS.map((text, i) => {
        const start = FIRST + i * GAP;
        const s = spring({ frame: f - start, fps, config: { damping: 13, stiffness: 110, mass: 0.8 } });
        if (f < start) return null;
        const [tx, ty, align] = target(i);
        // an arc: straight-line travel plus a lift that peaks halfway
        const x = mx + (tx - mx) * s;
        const lift = Math.sin(Math.min(1, s) * Math.PI) * (vertical ? 120 : 160);
        const y = my + (ty - my) * s - lift;
        const anchor = align === "right" ? "-100%" : align === "left" ? "0%" : "-50%";
        return (
          <div
            key={text}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(${anchor}, -50%) scale(${ip(s, [0, 0.6], [0.2, 1], (q) => q)}) rotate(${(1 - s) * (i % 2 ? 10 : -10)}deg)`,
              transformOrigin: align === "right" ? "right center" : align === "left" ? "left center" : "center",
              opacity: ip(s, [0, 0.25], [0, 1], (q) => q),
              whiteSpace: "nowrap",
              fontSize: vertical ? 40 : 36,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: C.white,
            }}
          >
            {text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
