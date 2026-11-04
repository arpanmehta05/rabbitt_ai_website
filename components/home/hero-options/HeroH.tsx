import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BeamsCanvas from "./BeamsCanvas";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option H, moving light beams, after the Raycast home page. The picture behind the words is a live
// shader (see BeamsCanvas): an animated plasma seen through steep strips of glass, in our blues, that
// grows in for the first couple of seconds and then keeps drifting. The words sit low and centred
// over the brightest part. The section is a Server Component; only the canvas is a client island,
// and the page is black with all its words in the HTML until the canvas starts.
export default function HeroH() {
  return (
    <section id="h" data-nav-theme="dark" className="relative h-svh min-h-[660px] overflow-hidden bg-black">
      <BeamsCanvas />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-20 text-center sm:px-10 sm:pb-24">
        <h1
          className="rb-rise text-[clamp(2.75rem,6.2vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)", ...after(900) }}
        >
          <span className="block">Own your data.</span>
          <span className="block">Own your AI.</span>
        </h1>
        <p
          className="rb-rise mt-6 max-w-[34rem] text-base leading-[1.5] text-white/85 sm:text-xl"
          style={{ textShadow: "0 1px 18px rgba(0,0,0,0.55)", ...after(1050) }}
        >
          Private models and agents that run inside your own cloud. Nothing leaves, and the weights are yours.
        </p>
        <Link
          href="/contactus"
          className="rb-rise group mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-white px-7 text-[15px] font-medium text-[#05060a] transition-colors hover:bg-[#dcecff]"
          style={after(1200)}
        >
          Book a demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
