"use client";

import { useState } from "react";

const faqs = [
  [
    "What types of content can you help us create?",
    "We support everything represented in the service wheel: website copy, articles, executive thought leadership, product content, campaigns, technical documentation, scripts, newsletters, and multilingual work.",
  ],
  [
    "How do you make sure the writing sounds like our brand?",
    "We start by understanding your existing language, audience, subject experts, and the decisions each piece needs to support. That becomes a practical voice guide before drafting begins.",
  ],
  [
    "Can you work with technical or specialist subject matter?",
    "Yes. Our process pairs disciplined research with review from your internal experts, so the content remains clear for readers without losing the precision specialists expect.",
  ],
  [
    "Can one project create content for several channels?",
    "Absolutely. A report, interview, or launch can become a focused body of work across the website, articles, email, social, and sales materials—without simply duplicating the same copy.",
  ],
];

export default function ContentWritingFaq() {
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
              The useful details before we begin.
            </h2>
          </div>
          <div className="border-t border-white/[0.14]">
            {faqs.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <article
                  key={question}
                  className="border-b border-white/[0.12]"
                >
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
                      className={`shrink-0 text-2xl font-light text-sky-300 transition-transform ${expanded ? "rotate-45" : ""}`}
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
