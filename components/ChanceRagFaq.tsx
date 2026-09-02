"use client";

import { useState } from "react";

const faqs = [
  [
    "How does ChanceRAG prevent hallucinations compared to standard RAG?",
    "ChanceRAG implements strict citation provenance and cross-encoder re-verification. If retrieved passages do not have high mathematical confidence support for a claim, the model refuses to guess, citing missing evidence instead.",
  ],
  [
    "Can ChanceRAG handle complex tables, charts, and scanned PDFs?",
    "Yes. Unlike standard text extractors that lose spatial relationships, ChanceRAG utilizes spatial vision OCR (LayoutLMv3) to reconstruct tabular schemas, visual hierarchy, and multi-column document flow losslessly.",
  ],
  [
    "What deployment and hosting options are available?",
    "ChanceRAG can be deployed as a fully managed cloud service, private single-tenant AWS/Azure/GCP VPC instance, Kubernetes Helm chart, or completely air-gapped on-premise hardware.",
  ],
  [
    "How does ChanceRAG integrate with enterprise access control and SSO?",
    "ChanceRAG natively integrates with Okta, Azure AD, SAML, and Google Workspace, applying Role-Based (RBAC) and Attribute-Based Access Control (ABAC) at query time so users only retrieve documents they are authorized to view.",
  ],
  [
    "What vector databases and foundation models does ChanceRAG support?",
    "ChanceRAG supports leading vector databases including Qdrant, Milvus, Pinecone, and pgvector, and can route queries to OpenAI GPT-4o, Claude 3.5 Sonnet, or self-hosted open-source models like LLaMA 3.3 and Mistral.",
  ],
];

export default function ChanceRagFaq() {
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
              Technical details before you deploy.
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
