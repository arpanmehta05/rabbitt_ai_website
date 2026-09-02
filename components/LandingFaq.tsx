"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What makes Rabbitt AI different from using a generic LLM API?",
    answer:
      "Generic LLM APIs give you raw model access. Rabbitt AI gives you a production-ready enterprise layer on top — private VPC deployment, zero data retention guarantees, retrieval pipelines grounded in your own proprietary data, and ongoing model adaptation. You get AI that knows your business, not a general assistant that guesses at it.",
  },
  {
    question: "How long does it take to go from first call to a live deployment?",
    answer:
      "For most engagements, initial proof-of-concept to production takes 4–8 weeks. We follow a structured 5-stage journey — discovery, data foundation, model strategy, product delivery, and optimisation — so timelines are predictable rather than open-ended.",
  },
  {
    question: "Do you work with our existing data infrastructure or do we need to migrate?",
    answer:
      "We work with what you have. Rabbitt AI integrates with your existing warehouses, CRMs, knowledge bases, and internal APIs. Migration is never a prerequisite — we build retrieval pipelines that sit alongside your data, not on top of a forced replatforming.",
  },
  {
    question: "Is our data used to train or improve shared models?",
    answer:
      "Never. All enterprise deployments run inside your private VPC with a strict zero data retention policy. Your proprietary data, queries, and outputs are never used to train shared models or accessible outside your environment.",
  },
  {
    question: "Which products are part of the Rabbitt AI ecosystem?",
    answer:
      "Our ecosystem includes CloudWatcher (AI cloud infrastructure observability), AI Quest (enterprise knowledge retrieval), IcyPluto (analytics intelligence), IcyQuill (AI-assisted content generation), OnSkill (L&D intelligence), DRIP (marketing automation), PingU (communications intelligence), and Chance Rag (retrieval-augmented generation). You can adopt products individually or as an integrated suite.",
  },
  {
    question: "What does the engagement model look like — project, retainer, or SaaS?",
    answer:
      "We offer three models: a fixed-scope project engagement for defined deliverables, a managed retainer for ongoing optimisation and support, and a hosted SaaS licensing model for teams who want immediate access to specific products without a full implementation. We'll recommend the right fit based on your goals and team size.",
  },
  {
    question: "Do you support on-premise or air-gapped deployments?",
    answer:
      "Yes. For organisations with strict data sovereignty requirements — government, financial services, healthcare — we support fully on-premise and air-gapped deployments with no external network dependencies.",
  },
];

export default function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#020305] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14)_0%,transparent_70%)] blur-3xl" />

      {/* Subtle top-border separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Questions we get{" "}
            <span className="italic text-slate-400">all the time.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
            If yours isn&apos;t here, drop us a line — we respond within 2 hours.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="flex flex-col divide-y divide-white/[0.07]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-white focus:outline-none"
                >
                  <span
                    className={`text-base font-medium leading-snug transition-colors sm:text-lg ${
                      isOpen ? "text-white" : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Plus / Minus Toggle */}
                  <span
                    className={`relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-sky-400/60 bg-sky-500/15 text-sky-400"
                        : "border-white/20 bg-white/[0.05] text-slate-400 group-hover:border-white/40 group-hover:text-white"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      fill="currentColor"
                    >
                      <path d="M6.75 5.25V0H5.25v5.25H0v1.5h5.25V12h1.5V6.75H12v-1.5H6.75Z" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-sm leading-relaxed text-slate-400 sm:text-base sm:leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col items-start gap-3 border-t border-white/[0.07] pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-slate-400 sm:text-base">
            Still have questions? Our team replies fast.
          </p>
          <a
            href="/contactus"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.09]"
          >
            Talk to us
            <span
              aria-hidden="true"
              className="text-sky-400 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
