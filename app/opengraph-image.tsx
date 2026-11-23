import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The picture shown when the site is shared (design.md §14, 1200×630). The background is the
// products card's gradient as drawn in Figma (Landing, "Products section (blue card)": deep navy
// with four blurred circles in the brand blues), exported at 1200×630 to assets/og-background.png
// because the image renderer cannot blur. On it: one headline, one line under it, and the Rabbitt
// mark. Inter, read from assets/fonts (SIL Open Font License), since the renderer does not see the
// page's fonts.

export const alt = "Rabbitt AI. Own your data. Own your AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dataUri = (buf: Buffer, type: string) => `data:${type};base64,${buf.toString("base64")}`;

export default async function OpengraphImage() {
  const [regular, bold, background, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-Regular.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Bold.woff")),
    readFile(join(process.cwd(), "assets/og-background.png")),
    readFile(join(process.cwd(), "public/logo.svg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px 60px",
          backgroundColor: "#050d29",
          backgroundImage: `url(${dataUri(background, "image/png")})`,
          backgroundSize: "1200px 630px",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1.02, letterSpacing: -5 }}>Own your data.</div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1.02, letterSpacing: -5 }}>Own your AI.</div>
          <div style={{ marginTop: 32, fontSize: 32, fontWeight: 400, lineHeight: 1.35, color: "rgba(255,255,255,0.8)" }}>
            Private models and agents that run inside your own cloud.
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- the image renderer only takes <img> */}
        <img src={dataUri(logo, "image/svg+xml")} width={132} height={132} alt="" style={{ marginLeft: -10, marginBottom: -12 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, style: "normal", weight: 400 },
        { name: "Inter", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
