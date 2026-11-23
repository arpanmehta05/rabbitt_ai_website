import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { hatAt } from "../hat";
import { C, ip, exit, rise, useLayout, EASE_IN } from "../theme";

// 0:18–0:25. "Pick a card." The hat deals six cards into a fan, face down, and they flip one by one
// to show the six products. Then they are swept back into the hat.
const CARDS = [
  { name: "IcyPluto", line: "Marketing automation and growth" },
  { name: "DRIP", line: "Adaptive learning for modern teams" },
  { name: "RAW", line: "AI agents, tuned for accuracy and cost" },
  { name: "Rabbitt Learning", line: "Enterprise upskilling, AI-driven" },
  { name: "Cloud Watcher", line: "Cloud cost, health and operations" },
  { name: "ChanceRAG", line: "Answers grounded in your documents" },
];
const DEAL = 12;
const DEAL_GAP = 6;
const FLIP = 64;
const FLIP_GAP = 12;
const SWEEP = 176;

export function S5Cards({ duration, from }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, width } = useLayout();
  const hat = hatAt(from + 20, vertical);
  const mx = hat.x;
  const my = hat.mouth(hat.yRest);

  const cw = vertical ? 290 : 250;
  const ch = vertical ? 410 : 350;

  // the fan on a wide screen; two rows of three on a phone
  const slot = (i: number) => {
    if (vertical) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return { x: width / 2 + (col - 1) * (cw + 28), y: 720 + row * (ch + 50), rot: (col - 1) * 4 };
    }
    const k = i - 2.5;
    return { x: 960 + k * 236, y: 560 + Math.abs(k) * Math.abs(k) * 9, rot: k * 5 };
  };

  return (
    <AbsoluteFill style={{ ...exit(f, duration, 6) }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: vertical ? 220 : 90,
          textAlign: "center",
          fontSize: 120,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          lineHeight: 1.02,
          color: C.white,
          ...rise(f, 0, 12, 30),
        }}
      >
        Pick a card.
      </div>

      {CARDS.map((card, i) => {
        const dealt = spring({ frame: f - DEAL - i * DEAL_GAP, fps, config: { damping: 14, stiffness: 120, mass: 0.7 } });
        const flip = spring({ frame: f - FLIP - i * FLIP_GAP, fps, config: { damping: 12, stiffness: 90 } });
        const sweep = ip(f, [SWEEP + i * 2, SWEEP + 14 + i * 2], [0, 1], EASE_IN);
        if (f < DEAL + i * DEAL_GAP) return null;
        const s = slot(i);
        const x = mx + (s.x - mx) * dealt * (1 - sweep);
        const y = my + (s.y - my) * dealt * (1 - sweep);
        const scale = (0.25 + 0.75 * dealt) * (1 - sweep * 0.85);
        const rot = s.rot * dealt + (1 - dealt) * 30 + sweep * 40;
        // a 2D flip: the card narrows to an edge, swaps faces, and widens again. A real 3D rotateY
        // puts the card on a 3D layer, and Chrome draws those edges without smoothing.
        const turn = Math.cos(Math.min(1, Math.max(0, flip)) * Math.PI);
        const showFace = turn < 0;
        const squeeze = Math.max(0.02, Math.abs(turn));
        const face: React.CSSProperties = {
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          overflow: "hidden",
        };
        return (
          <div
            key={card.name}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: cw,
              height: ch,
              transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
              opacity: 1 - ip(sweep, [0.7, 1], [0, 1], (q) => q),
              zIndex: 10 + i,
            }}
          >
            <div style={{ position: "absolute", inset: 0, transform: `scale(${squeeze}, ${1 + (1 - squeeze) * 0.04})` }}>
              {/* the back: the deck's own navy, the mark in the middle */}
              {!showFace && (
                <div style={{ ...face, background: C.navy, border: `2px solid ${C.lineMid}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 14, borderRadius: 10, border: `1.5px solid rgba(77,155,255,0.45)` }} />
                  <Img src={staticFile("logo.svg")} style={{ width: cw * 0.42, height: cw * 0.42 }} />
                </div>
              )}
              {/* the face: the product */}
              {showFace && (
              <div
                style={{
                  ...face,
                  background: C.white,
                  color: "#05060a",
                  padding: vertical ? 28 : 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: vertical ? 40 : 34, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{card.name}</div>
                <div style={{ fontSize: vertical ? 24 : 20, lineHeight: 1.35, color: "#3b4252" }}>{card.line}</div>
              </div>
              )}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: vertical ? 1500 : 830,
          textAlign: "center",
          fontSize: vertical ? 38 : 34,
          color: C.body,
          opacity: ip(f, [100, 110, SWEEP, SWEEP + 8], [0, 1, 1, 0]),
        }}
      >
        Six products. Six services. One private cloud.
      </div>
    </AbsoluteFill>
  );
}
