import { ImageResponse } from "next/og";

// The picture shown when the site is shared (design.md §14, 1200×630). Drawn in code from the
// brand's own colours and words: no photograph and no generated art.

export const alt = "Rabbitt AI — Own your data. Own your AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* a soft glow of the brand blue, and a thin blue rule */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -140,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: "radial-gradient(circle, rgba(0,97,255,0.55) 0%, rgba(0,97,255,0) 68%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 14,
              background: "#4d9bff",
              marginRight: 16,
            }}
          />
          Rabbitt AI
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1.04, letterSpacing: -4 }}>Own your data.</div>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1.04, letterSpacing: -4 }}>Own your AI.</div>
          <div style={{ marginTop: 36, fontSize: 32, color: "rgba(255,255,255,0.7)" }}>
            Private models and agents that run inside your own cloud.
          </div>
        </div>

        <div style={{ display: "flex", height: 4, width: 120, background: "#0061ff" }} />
      </div>
    ),
    { ...size },
  );
}
