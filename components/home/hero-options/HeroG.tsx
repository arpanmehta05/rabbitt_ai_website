import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option G, a colour-block hero, after the Cloudflare home page: the screen is the black page with
// one large rounded panel in it, the panel is filled with a single deep colour (navy here, where
// Cloudflare uses orange), a fine dot pattern fades into it, a bright light rises from the bottom
// edge, and everything is centred: one big headline, two lines of copy and one white button.
// Navy (#0a1640 to #0c2a7a) is the old deep blue of this site, kept only for this option so it can be
// told apart from the black page. The white pill button copies the reference; the site's own buttons
// are 8px rounded (design.md §7), so this would change if G is chosen. A Server Component.
export default function HeroG() {
  return (
    <section id="g" data-nav-theme="dark" className="relative px-3 pb-3 pt-[88px] sm:px-6 sm:pb-6">
      {/* the thin dashed line under the header */}
      <div aria-hidden className="absolute inset-x-0 top-[72px] border-t border-dashed border-white/15" />

      <div
        className="relative flex min-h-[calc(100svh-88px-1.5rem)] flex-col items-center justify-center overflow-hidden rounded-[28px] px-5 pb-40 pt-16 text-center sm:px-10"
        style={{ background: "linear-gradient(180deg, #0a1640 0%, #0b2060 55%, #0c2a7a 100%)" }}
      >
        {/* the fine dot pattern, strongest low on the panel */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.4px)",
            backgroundSize: "6px 6px",
            maskImage: "linear-gradient(to bottom, transparent 15%, #000 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 15%, #000 85%)",
          }}
        />
        {/* the light rising from the bottom edge */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, #dcecff 0%, #6fb0ff 14%, rgba(0,97,255,0.75) 34%, rgba(0,97,255,0.25) 58%, transparent 80%)",
          }}
        />

        <h1
          className="rb-rise relative text-[clamp(2.75rem,6.4vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
          style={after(0)}
        >
          <span className="block">Own your data.</span>
          <span className="block">Own your AI.</span>
        </h1>

        <p
          className="rb-rise relative mt-8 max-w-[34rem] text-base leading-[1.5] text-white/85 sm:text-xl"
          style={after(120)}
        >
          One platform for your private models and agents.
          <br className="hidden sm:block" /> Build, run and scale them inside your own cloud.
        </p>

        <Link
          href="/contactus"
          className="rb-rise group relative mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-[16px] font-medium text-[#05060a] transition-colors hover:bg-[#dcecff]"
          style={after(220)}
        >
          Book a demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
