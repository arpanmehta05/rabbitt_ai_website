"use client";

import { useState } from "react";

const faqs = [
  [
    "What does a complete Content Strategy deliverable include?",
    "A full content strategy includes a comprehensive search & competitor gap audit, defined target audience personas, high-intent topic cluster architectures, semantic keyword mapping, a 6 to 12-month editorial roadmap, multi-channel distribution playbooks, and brand voice guidelines.",
  ],
  [
    "How do you optimize content for AI Answer Engines (like ChatGPT & Perplexity)?",
    "We structure content using semantic entities, schema markup, direct question-answer headers, verifiable citations, and authoritative original data. This ensures your content is cited as a primary source by LLMs and generative search engines (GEO / Generative Engine Optimization).",
  ],
  [
    "How long does it typically take to see measurable SEO & pipeline results?",
    "While high-intent bottom-of-funnel content can generate pipeline within weeks via distribution and sales enablement, organic search dominance typically builds compounding velocity between 3 to 6 months as topic clusters achieve topical authority.",
  ],
  [
    "Can you audit and revamp our existing library of blog posts and pages?",
    "Yes. Our content audit evaluates every existing page for search intent, traffic decay, technical performance, and conversion value. We provide clear action items: consolidate, refresh, rewrite, or prune to maximize your domain authority.",
  ],
  [
    "How does Content Strategy connect directly with Content Writing & Production?",
    "Strategy serves as the blueprint for writing. Every strategic brief given to our writing studio contains target intent, competitor angles, required talking points, semantic entities, and conversion goals, guaranteeing zero wasted effort.",
  ],
];

export default function ContentStrategyFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-[#020305]">
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">
              Questions, answered
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              The strategic details before we plan.
            </h2>
          </div>
          <div className="border-t border-white/[0.14]">
            {faqs.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <article key={question} className="border-b border-white/[0.12]">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? -1 : index)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  >
                    <span className="text-base font-medium tracking-[-0.02em] text-white sm:text-lg">
                      {question}
                    </span>
                    <span
                      className={`shrink-0 text-2xl font-light text-sky-300 transition-transform ${
                        expanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {expanded && (
                    <p className="max-w-2xl pb-6 pr-8 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {answer}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
