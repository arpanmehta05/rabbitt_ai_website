import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { hatAt } from "../hat";
import { C, chip, ip, exit, rise, useLayout, EASE_IN } from "../theme";

// 0:03.5–0:08.5. Everything a company knows falls into the hat, one thing on every other half-beat,
// and the hat gulps each one down.
const ITEMS = ["contracts", "support tickets", "invoices", "chat logs", "product docs", "sales calls", "spreadsheets", "HR policies"];
const FIRST = 20;
const GAP = 10;
const FALL = 26;

export function S2DataIn({ duration, from }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { vertical, width, pad } = useLayout();
  const fontSize = vertical ? 38 : 34;

  return (
    <AbsoluteFill style={{ ...exit(f, duration, 6) }}>
      <div
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: vertical ? 220 : 110,
          textAlign: "center",
          fontSize: vertical ? 104 : 120,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
          color: C.white,
          ...rise(f, 2, 12, 30),
        }}
      >
        Your data goes in.
      </div>

      {ITEMS.map((item, i) => {
        const start = FIRST + i * GAP;
        const t = (f - start) / FALL;
        if (t < 0 || t > 1.05) return null;
        const hat = hatAt(from + start + FALL, vertical);
        const tx = hat.x;
        const ty = hat.mouth(hat.yRest);
        // each one starts somewhere along the top, then falls under gravity to the mouth of the hat
        const sx = ip(random(`x-${i}`), [0, 1], [pad + 120, width - pad - 120], (q) => q);
        const sy = (vertical ? 680 : 380) + random(`y-${i}`) * 60;
        const p = ip(t, [0, 1], [0, 1], EASE_IN);
        const x = sx + (tx - sx) * ip(t, [0, 1], [0, 1], (q) => 1 - (1 - q) * (1 - q));
        const y = sy + (ty - sy) * p;
        const scale = ip(t, [0, 0.7, 1], [1, 0.8, 0.1]);
        const spin = (random(`r-${i}`) - 0.5) * 50 * p;
        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${spin}deg)`,
              opacity: ip(t, [0, 0.1, 0.92, 1], [0, 1, 1, 0], (q) => q),
              ...chip(fontSize),
              zIndex: 10,
            }}
          >
            {item}
          </div>
        );
      })}

      {/* a running count under the heading */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: vertical ? 500 : 250,
          textAlign: "center",
          fontSize: vertical ? 36 : 32,
          color: C.dim,
          fontVariantNumeric: "tabular-nums",
          ...rise(f, 10, 12, 10),
        }}
      >
        {Math.min(ITEMS.length, Math.max(0, Math.floor((f - FIRST - FALL) / GAP) + 1))} of {ITEMS.length} in the hat
      </div>
    </AbsoluteFill>
  );
}
