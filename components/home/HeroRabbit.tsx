import type { CSSProperties } from "react";
import Image from "next/image";

// The right half of the first screen: a glass rabbit made of the same blue shapes as the rest of the
// page (discs, panes and a thin bar passing through it). It is the company's name and mark in one
// picture. The picture is /hero-rabbit.png (transparent background; the owner generated it in our
// blues). It drifts slowly up and down and stops for reduced motion. No glow or shadow is put around
// it: it sits on the plain black page.
//
// A Server Component: markup and CSS only. Hidden below 1024px, with the other large decoration.
export default function HeroRabbit() {
  return (
    <div
      className="rb-rise relative mx-auto hidden lg:block"
      style={{ width: "min(100%, 640px, calc((100svh - 14rem) * 1.1))", aspectRatio: "1108 / 1004", ["--d" as string]: "200ms" } as CSSProperties}
    >
      <div className="rb-float absolute inset-0" style={{ animationDuration: "9s" }}>
        <Image
          src="/hero-rabbit.png"
          alt="A rabbit sculpted in glass and blue discs, the Rabbitt mark."
          width={1108}
          height={1004}
          priority
          sizes="(min-width: 1024px) 45vw, 0px"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
