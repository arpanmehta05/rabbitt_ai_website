import type { CSSProperties } from "react";
import Backdrop from "./Backdrop";
import Buttons from "./Buttons";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option A, type-led: the promise is the picture. One very large headline across the whole width,
// a thin line of light that slides under it, and the sentence and buttons on one row below. Nothing
// else competes with the words. In the manner of Mistral and Cohere. A Server Component.
export default function HeroA() {
  return (
    <section id="a" data-nav-theme="dark" className="relative h-svh min-h-[640px] overflow-hidden">
      <Backdrop glow="bottom" />
      <div className="absolute inset-0 flex flex-col justify-end pb-14 pt-28 sm:pb-20">
        <div className="rb-container">
          <h1 className="rb-rise text-[clamp(2.75rem,min(10.6vw,22svh),10.5rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white">
            Own your data.
            <br />
            <span className="bg-gradient-to-r from-[#6fa8ff] via-[#2f7bff] to-[#0061ff] bg-clip-text text-transparent">
              Own your AI.
            </span>
          </h1>

          <div className="relative mt-10 h-px w-full overflow-hidden bg-white/10 sm:mt-14" aria-hidden>
            <div className="rb-sweep absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-brand-text to-transparent" />
          </div>

          <div className="rb-rise mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" style={after(160)}>
            <p className="max-w-[34rem] text-base leading-[1.6] text-white/70 sm:text-lg">
              Private models and agents that run inside your own cloud. Nothing leaves, and the weights are
              yours.
            </p>
            <Buttons />
          </div>
        </div>
      </div>
    </section>
  );
}
