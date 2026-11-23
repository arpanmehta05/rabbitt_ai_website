import { AbsoluteFill, useCurrentFrame } from "remotion";
import { hatAt } from "./hat";
import { C, ip, useLayout } from "./theme";

// The stage: midnight navy, and a ring of light on the floor that the hat stands in, with a soft
// shadow under it. The ring follows the hat from mark to mark (a beam from above was tried and
// dropped by the owner).
//
// Drawn as flat shapes with short soft edges, in the flat style of the rest of the film. There is
// no long gradient (it bands into rings once compressed) and no grain (it reads as noisy pixels).
export function Stage() {
  const f = useCurrentFrame();
  const { vertical } = useLayout();
  const hat = hatAt(f, vertical);

  // the light comes on with a flicker as the hat lands, and goes out at the very end
  const flicker = f < 8 ? 0 : f < 11 ? 0.55 : f < 13 ? 0.15 : f < 22 ? ip(f, [13, 22], [0.4, 1]) : 1;
  const on = flicker * ip(f, [886, 897], [1, 0]);

  const base = hat.yRest + hat.size * 0.47; // where the hat stands
  // while the cards are out the ring opens a little wider
  const spread = ip(f, [540, 560, 744, 768], [1, 1.7, 1.7, 1]);
  const poolRx = hat.size * (vertical ? 1.15 : 1.3) * spread;
  const poolRy = hat.size * 0.2 * Math.min(spread, 2.2);

  return (
    <AbsoluteFill style={{ background: C.stage }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: on }}>
        <defs>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="softer" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        {/* the pool on the floor */}
        <ellipse cx={hat.x} cy={base} rx={poolRx} ry={poolRy} fill={C.pool} filter="url(#soft)" />
        {/* the shadow under the hat */}
        <ellipse cx={hat.x} cy={base} rx={hat.size * 0.4} ry={hat.size * 0.055} fill="rgba(2,8,30,0.55)" filter="url(#softer)" />
      </svg>
    </AbsoluteFill>
  );
}
