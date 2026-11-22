"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { showcase, showcaseHeading, showcaseLine } from "./showcaseData";

// The case studies on the landing page, from the Figma "Case studies – customer showcase": three text tabs
// (the active one underlined in blue), and under them one story at a time on the page's five columns: the
// story image in columns 1-3 with the customer's logo on it and a line about the project, two big results,
// the quote and a link in columns 4-5. A tab change crossfades the panel and counts the results up; the
// arrow keys move between the tabs. The words and numbers come from showcaseData.ts, which holds
// placeholders until the content team supplies the real ones.

// "87%" counts from 0 to 87; a value with no number in it (a placeholder) is shown as it is
function Result({ value, run }: { value: string; run: boolean }) {
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const to = m ? Number(m[1]) : null;
  const [n, setN] = useState(to ?? 0);
  useEffect(() => {
    if (to === null || !run) return;
    const c = animate(0, to, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Number.isInteger(to) ? Math.round(v) : Math.round(v * 10) / 10),
    });
    return () => c.stop();
  }, [to, run]);
  if (to === null || !m) return <>{value}</>;
  return (
    <>
      {run ? n : to}
      {m[2]}
    </>
  );
}

export default function CaseShowcase() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const story = showcase[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = showcase.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section aria-labelledby="showcase-title" className="rb-section">
      <div className="rb-container">
        <div className="rb-reveal grid gap-6 lg:grid-cols-5 lg:gap-x-5">
          <h2
            id="showcase-title"
            className="text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white lg:col-span-3"
          >
            {showcaseHeading}
          </h2>
          <p className="text-[15px] leading-[1.6] text-white/70 lg:col-span-2 lg:pt-3">{showcaseLine}</p>
        </div>

        {/* the tabs */}
        <div role="tablist" aria-label="Customer stories" className="mt-12 grid grid-cols-3 border-b border-white/15 lg:mt-[4.5rem] lg:grid-cols-5 lg:gap-x-5">
          {showcase.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.tab}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`showcase-tab-${i}`}
                aria-selected={on}
                aria-controls="showcase-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative -mb-px h-12 truncate pr-2 text-left text-[13px] font-medium transition-colors sm:text-base ${
                  on ? "text-brand-text" : "text-white/55 hover:text-white"
                }`}
              >
                {s.tab}
                {on && <motion.span layoutId="showcase-underline" aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-text" transition={{ duration: reduce ? 0 : 0.3 }} />}
              </button>
            );
          })}
        </div>

        {/* the panel: replaced as a whole, so the page does not jump */}
        <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${active}`} className="mt-8 lg:mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-5 lg:gap-x-5"
            >
              {/* the story image, with the logo on it, and a line about the project */}
              <div className="lg:col-span-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[#0a0b10] ring-1 ring-white/10">
                  {story.image ? (
                    <Image src={story.image} alt={`${story.tab}: the project`} fill sizes="(max-width: 1024px) 100vw, 780px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/20 p-6 text-center text-[13px] leading-[1.55] text-white/50">
                      Customer story image
                      <br />
                      or a still from their film
                      <br />
                      16:10, real, no stock
                    </div>
                  )}
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-6 sm:left-6">
                    {story.logo ? (
                      <Image src={story.logo} alt={story.tab} width={150} height={44} className="h-8 w-auto sm:h-11" />
                    ) : (
                      <span className="flex h-8 items-center rounded-lg border border-white/20 bg-white/10 px-3 text-xs text-white/70 sm:h-11 sm:px-4">Customer logo</span>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-[15px] leading-[1.6] text-white/65">{story.story}</p>
              </div>

              {/* the results, the quote and the link */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-x-5 lg:grid-cols-1">
                  {story.results.map((r, i) => (
                    <div key={i} className="border-t border-white/15 pt-4 lg:pt-6">
                      <p
                        className={`text-[clamp(3rem,6.1vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums ${
                          i === 0 ? "text-brand-text" : "text-white"
                        }`}
                      >
                        <Result value={r.value} run={!reduce} />
                      </p>
                      <p className="mt-4 text-[13px] leading-[1.5] text-white/70 sm:text-[15px] lg:mb-8 lg:mt-5">{r.label}</p>
                    </div>
                  ))}
                </div>

                <figure className="mt-8 border-t border-white/15 pt-6 lg:mt-0">
                  <blockquote className="text-lg font-medium leading-[1.35] tracking-[-0.01em] text-white lg:text-[22px]">“{story.quote}”</blockquote>
                  <figcaption className="mt-4">
                    <span className="block text-sm font-medium text-white">{story.name}</span>
                    <span className="block text-[13px] text-white/60">{story.role}</span>
                  </figcaption>
                </figure>

                {story.href && (
                  <Link
                    href={story.href}
                    className="group mt-6 inline-flex items-center gap-2 py-3 text-[15px] font-medium text-brand-text underline-offset-4 hover:underline"
                  >
                    Read the case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
