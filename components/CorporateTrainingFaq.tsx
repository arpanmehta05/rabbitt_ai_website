"use client";

import { useState } from "react";

const faqs = [
  [
    "How do you ensure our proprietary code and internal data remain secure?",
    "All hands-on training and lab environments are isolated in dedicated, SOC2-compliant private cloud sandboxes. We sign strict Enterprise NDAs and enforce zero-data-retention policies so your proprietary IP never leaves your organization.",
  ],
  [
    "Can the training curriculum be customized to our specific tech stack?",
    "Yes. Prior to kickoff, we conduct a technical discovery call to map the syllabus directly to your infrastructure (e.g., AWS Bedrock, Azure OpenAI, GCP Vertex AI, Databricks, PostgreSQL pgvector, LangChain, etc.) and real internal problem statements.",
  ],
  [
    "What is the recommended cohort size and delivery format?",
    "We deliver training both on-site at your enterprise headquarters and via interactive virtual cohorts. To ensure maximum hands-on mentorship, cohort sizes typically range from 15 to 35 participants per track.",
  ],
  [
    "Do you offer executive and leadership workshops?",
    "Yes. Our Executive AI Strategy track is designed specifically for VP and C-level leaders, focusing on strategic capital allocation, AI governance, compliance frameworks, team structuring, and competitive positioning.",
  ],
  [
    "What support do you provide after the training program completes?",
    "Every corporate training package includes 30 to 90 days of post-training advisory, code review office hours, architectural check-ins, and access to internal AI Champion resources.",
  ],
];

export default function CorporateTrainingFaq() {
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
              Enterprise details before we begin.
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
