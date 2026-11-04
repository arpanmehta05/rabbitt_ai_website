import type { CSSProperties } from "react";
import Image from "next/image";

// The right half of the first screen: one abstract 3D object in the brand blue, in the manner of the
// object on Together AI's home page. The picture is /hero-object.png (transparent background; the
// owner generated it and the colours were set to our blues). It drifts slowly up and down and
// stops for reduced motion. Three thin labels point at it: your data, your model, your cloud. The
// words are live text, not part of the picture, so they stay sharp and can be edited.
//
// A Server Component: markup and CSS only. Hidden below 1024px, with the other large decoration.

const LINE = 64; // px, the length of a label's leader line
const TEXT = 16; // px, the height of a label's text line
const GAP = 3; // px, the air between the end of a line and the picture

// Each label points at one exact spot of the picture, given as a share of its width and height (the
// topmost point of the tilted disc, the top and the bottom of the glass). The label sits in the
// same box as the picture, so it drifts with it and the line never comes loose.
function Label({
  text,
  x,
  y,
  line,
  end = false,
}: {
  text: string;
  x: number;
  y: number;
  line: "down" | "up";
  // true: the text runs to the left of the line instead of to the right (for a point near the right edge)
  end?: boolean;
}) {
  const rule = <span className={`w-px bg-white/40 ${end ? "mr-[5px] self-end" : "ml-[5px]"}`} style={{ height: LINE }} aria-hidden />;
  return (
    <div
      className="absolute flex flex-col"
      style={{
        ...(end ? { right: `calc(${100 - x}% - 5px)` } : { left: `calc(${x}% - 5px)` }),
        top: line === "down" ? `calc(${y}% - ${LINE + TEXT + GAP}px)` : `calc(${y}% + ${GAP}px)`,
      }}
    >
      {line === "up" && rule}
      <span
        className={`flex items-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.08em] text-white/80 ${end ? "flex-row-reverse" : ""}`}
        style={{ height: TEXT, lineHeight: `${TEXT}px` }}
      >
        <span className="h-2.5 w-2.5 shrink-0 bg-brand-text" aria-hidden />
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
      <div className="rb-float absolute inset-0" style={{ animationDuration: "9s" }}>
        <Image
          src="/hero-object.png"
          alt=""
          width={1195}
          height={788}
          priority
          sizes="(min-width: 1024px) 45vw, 0px"
          className="h-full w-full object-contain"
        />

        <Label text="Your data" x={6.4} y={32.4} line="down" />
        <Label text="Your cloud" x={44.2} y={17} line="down" />
        <Label text="Your model" x={91.3} y={69.8} line="up" end />
      </div>

    </div>
  );
}
