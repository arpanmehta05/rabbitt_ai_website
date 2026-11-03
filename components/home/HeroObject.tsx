import type { CSSProperties } from "react";
import Image from "next/image";

// The right half of the first screen: one abstract 3D object in the brand blue, in the manner of the
// object on Together AI's home page. The picture is /hero-object.png (transparent background; the
// owner generated it and the colours were set to our blues). It drifts slowly up and down and
// stops for reduced motion. Three thin labels point at it: your data, your model, your cloud. The
// words are live text, not part of the picture, so they stay sharp and can be edited.
//
// A Server Component: markup and CSS only. Hidden below 1024px, with the other large decoration.

const LINE = 56; // px, the length of a label's leader line

function Label({ text, style, line }: { text: string; style: CSSProperties; line: "down" | "up" }) {
  const rule = <span className="ml-[5px] w-px bg-white/30" style={{ height: LINE }} aria-hidden />;
  return (
    <div className="absolute flex flex-col" style={style}>
      {line === "up" && rule}
      <span className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.12em] text-white/80">
        <span className="h-2.5 w-2.5 bg-brand-text" aria-hidden />
        {text}
      </span>
      {line === "down" && rule}
    </div>
  );
}

export default function HeroObject() {
  return (
    <div
      role="img"
      aria-label="Abstract picture: a tilted disc, a pane of glass, a flat disc and a plate cutting through one another, labelled your data, your model and your cloud."
      className="rb-rise relative mx-auto hidden lg:block"
      style={{ width: "min(100%, 720px, calc((100svh - 15rem) * 1.5))", aspectRatio: "1195 / 788", ["--d" as string]: "200ms" } as CSSProperties}
    >
      {/* the light behind the object */}
      <div
        aria-hidden
        className="absolute inset-[-14%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,97,255,0.4) 0%, rgba(0,97,255,0.13) 32%, rgba(0,97,255,0.04) 50%, transparent 66%)",
        }}
      />

      <div className="rb-float absolute inset-0" style={{ animationDuration: "9s" }}>
        <Image
          src="/hero-object.png"
          alt=""
          width={1195}
          height={788}
          priority
          sizes="(min-width: 1024px) 45vw, 0px"
          className="h-full w-full object-contain"
          style={{ filter: "drop-shadow(0 30px 60px rgba(0,60,200,0.45))" }}
        />
      </div>

      <Label text="Your data" line="down" style={{ left: "1%", top: `calc(30% - ${LINE + 16}px)` }} />
      <Label text="Your model" line="down" style={{ left: "38%", top: `calc(14% - ${LINE + 16}px)` }} />
      <Label text="Your cloud" line="up" style={{ left: "52%", top: "88%" }} />
    </div>
  );
}
