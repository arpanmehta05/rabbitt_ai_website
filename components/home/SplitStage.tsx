"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

// WebGL, loaded as its own chunk and only started on wide screens. It is decoration: nothing the
// page says depends on it, and the stage markup around it is rendered on the server.
const Globe = dynamic(() => import("./Globe"));

// The closing part of the page: content in the left column, and in the right column a globe the
// size of the content, both centred on the same line. It lines up with the rest of the page: the same
// full-width content and the same side gutters (design.md §7). The globe only exists inside this
// stage, so it can never show up early or late.
export default function SplitStage({ children }: { children: ReactNode }) {
  // the globe column only exists on wide screens, so the 3D scene is only started there
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative">
      {/* a soft glow of the brand blue behind the globe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[12%] hidden h-[520px] w-[620px] rounded-[50%] bg-brand/30 blur-[140px] lg:block" />
      </div>

      <div className="relative mx-auto grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:items-center">
        <div className="min-w-0 px-5 sm:px-8 lg:pl-12 lg:pr-10">{children}</div>

        <div className="hidden justify-center pr-12 lg:flex">
          <div className="aspect-square w-full max-w-[min(420px,60svh)]">{wide && <Globe />}</div>
        </div>
      </div>
    </div>
  );
}
