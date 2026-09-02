"use client";

import { useState } from "react";

const faqs = [
  [
    "How are Rabbitt AI university programs structured?",
    "Our university programs are modular and can be integrated as full-semester credit courses, intensive weekend bootcamps, summer accelerator programs, or faculty training workshops. We tailor the syllabus to your department's specific academic calendar and credit requirements.",
  ],
  [
    "Do students need high-performance GPU hardware or local setups?",
    "No. We provide cloud-hosted Jupyter lab sandboxes with pre-configured GPU clusters and enterprise API keys. Students only need a web browser and internet connection to build, train, and deploy models.",
  ],
  [
    "Are these programs suitable for undergraduate and postgraduate students?",
    "Yes. We offer foundational tracks for computer science and data science undergraduates, as well as specialized advanced tracks (distributed training, agentic systems, AI safety) for graduate students and faculty researchers.",
  ],
  [
    "How does Rabbitt AI assist students with career placement?",
    "Every program culminates in a Capstone Demo Day where student teams present their working prototypes to our network of enterprise hiring partners, venture studios, and AI tech companies.",
  ],
  [
    "How can faculty members participate or upskill?",
    "We conduct dedicated 'Train-the-Trainer' masterclasses for professors and teaching assistants, providing full lecture slides, grading rubrics, lab solutions, and ongoing academic support.",
  ],
];

export default function UniversityTrainingFaq() {
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
              Academic details before we partner.
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
