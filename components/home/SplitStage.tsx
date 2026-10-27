"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

// WebGL, so it is loaded in the browser only.
const Globe = dynamic(() => import("./Globe"), { ssr: false });

// The scrolling part of the page: content in the left column, and in the right column a globe
// that stays pinned while the content scrolls past. Sections can be added to the left column
// freely; the globe only exists inside this stage, so it can never show up early or late.
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
      {/* dark mode: a soft blue glow behind the globe */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[12%] hidden h-[520px] w-[620px] rounded-[50%] bg-[#0061ff]/15 blur-[140px] dark:block" />
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <div className="min-w-0 px-6 sm:px-10 lg:pl-14 lg:pr-10 xl:pl-20">{children}</div>

        <div className="hidden lg:block">
          <div className="sticky top-[68px] h-[calc(100svh-68px)] pr-6 xl:pr-12">
            {wide && <Globe />}
          </div>
        </div>
      </div>
    </div>
  );
}
