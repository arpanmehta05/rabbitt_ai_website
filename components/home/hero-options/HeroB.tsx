import type { CSSProperties } from "react";
import Image from "next/image";
import Backdrop from "./Backdrop";
import Buttons from "./Buttons";
import { products } from "../productsData";

const after = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Option B, the product on show: copy on the left and, on the right, a workspace window that runs
// off the edge of the screen, as on Databricks and Glean. The window is drawn in code from our real
// products (names, one-liners, logos from productsData). It is a stand-in: when a real screenshot of
// a product exists, it replaces the body of this window. A Server Component.
const shown = products.filter((p) => p.name !== "Ping U").slice(0, 5);

export default function HeroB() {
  return (
    <section id="b" data-nav-theme="dark" className="relative h-svh min-h-[640px] overflow-hidden">
      <Backdrop />
      <div className="absolute inset-0 flex items-center pb-24 pt-28">
        <div className="rb-container grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="max-w-[600px]">
            <h1 className="rb-rise text-[clamp(2.5rem,5.2vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Own your data.
              <br />
              Own your AI.
            </h1>
            <p className="rb-rise mt-7 max-w-[32rem] text-base leading-[1.6] text-white/70 sm:text-lg" style={after(120)}>
              Private models and agents that run inside your own cloud. Nothing leaves, and the weights are
              yours.
            </p>
            <div className="rb-rise mt-9" style={after(220)}>
              <Buttons />
            </div>
          </div>

          {/* the window runs off the right edge of the screen */}
          <div
            className="rb-rise hidden lg:block"
            style={{ ...after(260), marginRight: "calc(-1 * var(--gutter))" }}
            role="img"
            aria-label="A workspace window listing Rabbitt's products, running inside your own cloud."
          >
            <div className="overflow-hidden rounded-l-2xl border border-r-0 border-white/10 bg-raised shadow-[0_30px_120px_-20px_rgba(0,97,255,0.45)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white/55">
                  Your Rabbitt workspace
                </span>
                <span className="ml-auto flex items-center gap-2 pr-6 text-[12px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-text" />
                  Running inside your cloud
                </span>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                {shown.map((p) => (
                  <div key={p.name} className="flex flex-col gap-4 bg-raised p-6">
                    <div className="flex h-10 items-center">
                      {p.logo && (
                        <Image
                          src={p.logo}
                          alt=""
                          width={160}
                          height={48}
                          className="h-auto max-h-10 w-auto max-w-[8rem] object-contain object-left"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-white">{p.name}</p>
                      <p className="mt-1 text-[13px] leading-[1.5] text-white/55">{p.detail}</p>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col justify-between gap-4 bg-surface/60 p-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-brand-text">Your weights</p>
                  <p className="text-[15px] leading-[1.5] text-white/80">
                    Every model here is trained on your data and stays yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
