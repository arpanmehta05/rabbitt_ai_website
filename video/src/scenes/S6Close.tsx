import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TIP } from "../hat";
import { C, ip, plate, rise, useLayout, EASE_IN } from "../theme";

// 0:25–0:30. "No smoke. No mirrors. Just your cloud." Then the hat slides over, tips its brim, and the
// name lands beside it. It ends on the empty stage, so the loop starts clean.
export function S6Close({ duration, from }: { duration: number; from: number }) {
  const f = useCurrentFrame();
  const { vertical, pad } = useLayout();
  const linesOut = ip(f, [84, 92], [1, 0], EASE_IN);
  const toBlack = ip(f, [duration - 10, duration - 2], [1, 0], EASE_IN);
  const tipLocal = TIP - from;

  return (
    <AbsoluteFill style={{ opacity: toBlack }}>
      <div style={{ position: "absolute", left: pad, right: pad, top: vertical ? 300 : 110, textAlign: "center", opacity: linesOut }}>
        <div style={{ fontSize: vertical ? 104 : 112, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.04, color: C.white }}>
          <span style={{ display: "inline-block", ...rise(f, 4, 12, 30) }}>No smoke.</span>{" "}
          <span style={{ display: "inline-block", ...rise(f, 30, 12, 30) }}>No mirrors.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          top: vertical ? 1300 : 840,
          textAlign: "center",
          fontSize: vertical ? 104 : 96,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          color: C.white,
          opacity: linesOut,
        }}
      >
        <div style={rise(f, 62, 12, 30)}><span style={plate}>Just your cloud.</span></div>
      </div>

      {/* the lock-up: the hat has moved to its mark, the name lands beside it (or under it on a phone) */}
      <div
        style={{
          position: "absolute",
          left: vertical ? 0 : 780,
          right: vertical ? 0 : undefined,
          // on a wide screen the name and the URL are centred on the hat's line (y 540)
          top: vertical ? 1040 : 540 - 66 - 28,
          textAlign: vertical ? "center" : "left",
          ...rise(f, tipLocal - 4, 12, 20),
        }}
      >
        <div style={{ fontSize: vertical ? 120 : 132, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1, color: C.white }}>Rabbitt AI</div>
        <div style={{ marginTop: 18, fontSize: vertical ? 40 : 38, color: C.body, ...rise(f, tipLocal + 8, 12, 12) }}>rabbitt.ai</div>
      </div>
    </AbsoluteFill>
  );
}
