import { AbsoluteFill, useCurrentFrame } from "remotion";
import { hatAt } from "../hat";
import { C, chip, ip, exit, rise, useLayout } from "../theme";

// 0:13.5–0:18. A ring draws round the hat (your cloud). Things try to slip out, hit the ring, bounce
// back and get gulped down again; the counter beside it never moves off zero.
const RUNAWAYS = ["a prompt", "a file", "a log", "an answer"];
const FIRST = 30;
const GAP = 16;
const OUT = 14; // frames to reach the ring
const BACK = 8; // frames back into the hat

export function S4Stays({ duration, from }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { vertical, width, height, pad } = useLayout();
  const hat = hatAt(from + 20, vertical);
  const cx = hat.x;
  const cy = hat.yRest;
  const r = vertical ? 330 : 300;
  const circ = 2 * Math.PI * r;
  const draw = ip(f, [10, 30], [0, 1]);

  let hit = 0;
  const runners = RUNAWAYS.map((text, i) => {
    const start = FIRST + i * GAP;
    const t = f - start;
    const angle = (-30 + i * 75) * (Math.PI / 180) * (vertical ? 1 : 1) + (vertical ? Math.PI / 2 : 0);
    const reach = r - (vertical ? 70 : 64);
    let d = 0;
    if (t >= 0 && t < OUT) d = ip(t, [0, OUT], [0, reach]);
    else if (t >= OUT && t < OUT + BACK) d = ip(t, [OUT, OUT + BACK], [reach, 0]);
    const near = t >= OUT - 2 && t < OUT + 3;
    if (near) hit = 1;
    const squash = near ? 0.75 : 1;
    const visible = t >= 0 && t < OUT + BACK;
    return {
      text,
      x: cx + Math.cos(angle) * d,
      y: cy - hat.size * 0.07 + Math.sin(angle) * d,
      squash,
      angle,
      visible,
      scale: ip(t, [0, 4, OUT + BACK - 3, OUT + BACK], [0.3, 1, 1, 0.2]),
    };
  });

  const shake = hit ? Math.sin(f * 2.4) * 6 : 0;

  return (
    <AbsoluteFill style={{ ...exit(f, duration, 6) }}>
      <div
        style={{
          position: "absolute",
          left: pad,
          right: vertical ? pad : undefined,
          top: vertical ? 220 : 110,
          textAlign: vertical ? "center" : "left",
          fontSize: vertical ? 112 : 112,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
          color: C.white,
          ...rise(f, 2, 12, 30),
        }}
      >
        And nothing leaves the hat.
      </div>

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={C.white}
          strokeOpacity={hit ? 1 : 0.6}
          strokeWidth={hit ? 5 : 2.5}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - draw)}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>

      {runners.map(
        (k) =>
          k.visible && (
            <div
              key={k.text}
              style={{
                position: "absolute",
                left: k.x,
                top: k.y,
                transform: `translate(-50%, -50%) scale(${k.scale * k.squash}, ${k.scale * (2 - k.squash)})`,
                ...chip(vertical ? 34 : 30),
                zIndex: 25,
              }}
            >
              {k.text}
            </div>
          ),
      )}

      {/* the counter that never moves */}
      <div
        style={{
          position: "absolute",
          left: vertical ? 0 : 1180,
          right: vertical ? 0 : undefined,
          top: vertical ? 1430 : 470,
          textAlign: vertical ? "center" : "left",
          ...rise(f, 20, 12, 20),
        }}
      >
        <div style={{ fontSize: vertical ? 190 : 200, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1, color: C.white, transform: `translateX(${shake}px)` }}>
          0 bytes
        </div>
        <div style={{ marginTop: 22, fontSize: vertical ? 38 : 34, color: C.body }}>sent outside your cloud</div>
      </div>
    </AbsoluteFill>
  );
}
