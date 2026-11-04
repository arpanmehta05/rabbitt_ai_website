import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroObject from "./HeroObject";
import HeroRabbit from "./HeroRabbit";

// The first screen, on the dark page: the headline, one line and two buttons on the left; on the right the
// glass rabbit (or, for review on /design, the abstract object). The section is taller than the screen on purpose. The client logos
// that follow are held at the bottom of the screen while this one scrolls away, and then land just
// below it, still on the dark page.
//
// A Server Component: it is plain markup, and the rise-in on load is CSS (.rb-rise), so the page is
// complete in the HTML and nothing waits for JavaScript.

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HeroIntro({ visual = "rabbit" }: { visual?: "rabbit" | "object" }) {
  return (
    <section className="relative min-h-[106svh]">
      <div className="relative h-svh overflow-hidden">
        {/* a faint grid on the black page. It fades out toward the bottom edge, so
            the screen runs into the plain page below it with no line where it ends. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 62%, transparent 96%)",
          }}
        >
          <div
            className="absolute inset-0 text-white opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent)",
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center pb-32 pt-36">
          <div className="rb-container grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="max-w-[640px]">
              <h1 className="rb-rise text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                Own your data.
                <br />
                Own your AI.
              </h1>

              <p
                className="rb-rise mt-8 max-w-[34rem] text-base leading-[1.6] text-white/70 sm:text-lg"
                style={after(120)}
              >
                Private models and agents that run inside your own cloud. Nothing leaves, and the weights
                are yours.
              </p>

              <div className="rb-rise mt-10 flex flex-wrap items-center gap-3" style={after(220)}>
                <Link
                  href="/contactus"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/products"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-7 text-[15px] font-medium text-white transition-colors hover:border-white/40"
                >
                  Explore products
                  <ArrowUpRight className="h-4 w-4 text-brand-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {visual === "object" ? <HeroObject /> : <HeroRabbit />}
          </div>
        </div>
      </div>
    </section>
  );
}
