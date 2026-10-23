import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const yours = [
  { noun: "data", detail: "stays inside your cloud" },
  { noun: "model", detail: "weights you own" },
  { noun: "agents", detail: "run under your rules" },
];

// The closing section. A contained panel in the page's own palette: the pitch and the two
// hero buttons on one side, the three things that stay yours, set as type, on the other.
export default function CtaSection() {
  return (
    <section className="relative px-6 pb-8 pt-20 sm:px-10 lg:px-14 lg:pb-12 lg:pt-28 xl:px-20">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f3f7ff] via-white to-white shadow-[0_30px_80px_-40px_rgba(0,97,255,0.4)] ring-1 ring-black/[0.07] before:absolute before:inset-x-12 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#4d9bff] before:to-transparent dark:from-[#111b3d] dark:via-[#0c1430] dark:to-[#0a1228] dark:shadow-none dark:ring-white/10">
        {/* faint grid in the corner, soft glows */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 text-[#05060a] opacity-[0.05] dark:text-white dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 55% 80% at 100% 0%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 55% 80% at 100% 0%, #000, transparent)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 top-[-120px] -z-10 h-[360px] w-[520px] rounded-[50%] bg-[#0061ff]/10 blur-[110px] dark:bg-[#0061ff]/25"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 right-[-60px] -z-10 h-[300px] w-[460px] rounded-[50%] bg-[#ff2d95]/10 blur-[110px] dark:bg-[#ff2d95]/10"
        />

        <div className="grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-16 xl:p-20">
          <div>
            <h2
              className="text-[clamp(2.4rem,4.8vw,4.2rem)] font-medium leading-[1.03] tracking-[-0.05em] text-[#05060a] dark:text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s build the future
              <br />
              <span className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text text-transparent dark:from-[#3d7bff] dark:to-[#b4cdff]">
                together.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-black/60 dark:text-white/60">
              Book a demo and see it running in your own cloud, on your own data.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2 rounded-full bg-[#05060a] px-8 py-4 text-base font-medium text-white transition hover:bg-[#0061ff] dark:bg-white dark:text-[#04060c] dark:hover:bg-[#0061ff] dark:hover:text-white"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-[#05060a] shadow-[0_10px_30px_-12px_rgba(0,97,255,0.45)] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:ring-[#0061ff]/50 dark:bg-[#0061ff] dark:text-white dark:shadow-[0_10px_30px_-12px_rgba(0,97,255,0.8)] dark:ring-0 dark:hover:bg-[#2f7bff]"
              >
                Explore products
                <ArrowUpRight className="h-4 w-4 text-[#0061ff] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-white" />
              </Link>
            </div>
          </div>

          <ul className="border-t border-black/[0.09] dark:border-white/12">
            {yours.map(({ noun, detail }) => (
              <li
                key={noun}
                className="group flex items-baseline justify-between gap-6 border-b border-black/[0.09] py-6 dark:border-white/12 sm:py-7"
              >
                <span
                  className="text-[clamp(1.9rem,3.2vw,2.9rem)] font-medium leading-none tracking-[-0.045em] text-[#05060a] transition-colors duration-300 group-hover:text-[#0061ff] dark:text-white dark:group-hover:text-[#4d9bff]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-black/30 transition-colors duration-300 group-hover:text-[#0061ff]/50 dark:text-white/35 dark:group-hover:text-[#4d9bff]/60">
                    Your{" "}
                  </span>
                  {noun}
                </span>
                <span className="hidden text-right text-[15px] text-black/50 dark:text-white/50 sm:block">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
