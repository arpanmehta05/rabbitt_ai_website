import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";
import ChanceRagFaq from "@/components/ChanceRagFaq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChanceRAG — Full-Fledged Enterprise RAG & Document Reasoning | Rabbitt AI",
  description:
    "Enterprise-grade Retrieval-Augmented Generation (RAG) platform with hybrid semantic search, multi-modal PDF parsing, page-level citation provenance, and zero data leakage.",
};

const capabilities = [
  {
    number: "01",
    title: "Multi-Modal Document Ingestion",
    description:
      "Parse complex PDFs, scanned financial tables, nested diagrams, SEC filings, and technical blueprints with spatial visual OCR.",
    specs: ["LayoutLMv3 OCR", "Table Extraction", "Multi-Column Layouts", "Lossless Vectorization"],
    tone: "border-t-sky-400",
  },
  {
    number: "02",
    title: "Hybrid Semantic & Sparse Search",
    description:
      "Combine BM25 keyword precision with dense embedding vectors and cross-encoder reranking for ultra-low latency contextual retrieval.",
    specs: ["Dense + Sparse BM25", "Cohere Rerank v3", "Vector Similarity", "Sub-200ms Query"],
    tone: "border-t-blue-500",
  },
  {
    number: "03",
    title: "Verifiable Citation Provenance",
    description:
      "Every generated response is mathematically linked to the exact source page, bounding box, and paragraph with zero hallucinations.",
    specs: ["Bounding-Box Citations", "Source Highlighting", "Confidence Scoring", "Fact-Checking Engine"],
    tone: "border-t-sky-300",
  },
  {
    number: "04",
    title: "Role-Based Access & Security",
    description:
      "Enforce granular document permissions, Active Directory/Okta SSO, SOC2 compliance, and air-gapped on-premise deployments.",
    specs: ["RBAC & ABAC", "SOC2 Type II", "VPC & Air-Gapped", "Zero-Data Retention"],
    tone: "border-t-blue-400",
  },
];

const pipelineStages = [
  {
    step: "01",
    name: "Intelligent Ingestion & Layout Parsing",
    detail: "Deconstructs unstructured documents into semantic chunks preserving headers, tabular schemas, and visual footnotes.",
    tools: ["OCR Vision Engine", "Schema Preserving Chunker", "Metadata Extractor"],
  },
  {
    step: "02",
    name: "Dual-Index Hybrid Vector Embedding",
    detail: "Generates high-dimensional semantic embeddings alongside sparse keyword indexes stored in high-throughput vector databases.",
    tools: ["Qdrant / Milvus / pgvector", "BGE-Large-En Embeddings", "BM25 Sparse Inverted Index"],
  },
  {
    step: "03",
    name: "Context Compression & Cross-Encoder Reranking",
    detail: "Filters irrelevant passages, deduplicates overlapping tokens, and ranks top-k chunks with deep contextual cross-encoders.",
    tools: ["Cross-Encoder Rerankers", "Contextual Compression", "Dynamic Top-K Windowing"],
  },
  {
    step: "04",
    name: "Synthesized Reasoning & Citation Grounding",
    detail: "Feeds curated context into foundation LLMs with strict provenance guardrails to generate mathematically grounded answers.",
    tools: ["Guardrail Verifier", "Bounding Box Linker", "Enterprise LLM Gateway"],
  },
];

const useCases = [
  {
    title: "Financial Filings & Due Diligence",
    description: "Query 10-K filings, earnings transcripts, and portfolio balance sheets with verifiable accounting precision.",
    metric: "10x faster audit review cycles",
  },
  {
    title: "Legal & Contract Intelligence",
    description: "Compare complex clauses across thousands of Master Service Agreements with redline provenance.",
    metric: "99.4% citation accuracy",
  },
  {
    title: "Clinical Protocols & Research",
    description: "Cross-reference medical publications, trial safety sheets, and pharmaceutical monographs securely.",
    metric: "HIPAA-compliant environment",
  },
  {
    title: "Technical Engineering Manuals",
    description: "Empower field technicians and engineers with instant answers from thousands of pages of schematics.",
    metric: "<250ms median latency",
  },
];

export default function ChanceRagPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-16 sm:px-10 sm:pt-24 sm:pb-20 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.2rem] xl:text-[3.8rem]">
              Full-fledged RAG for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                deep document reasoning.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg max-w-2xl">
              Turn millions of complex enterprise documents into an accurate, queryable intelligence engine. Featuring multi-modal parsing, hybrid dense-sparse search, sub-second latency, and verified page-level citations.
            </p>

            <div className="mt-8 flex flex-row items-center gap-3.5 flex-nowrap sm:gap-4">
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Deploy ChanceRAG
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-white/[0.16] px-6 py-3.5 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Request Technical Specs
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            <div className="relative w-full max-w-[580px]">
              {/* Blue Glow Background */}
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22),transparent_70%)] blur-2xl" />
              <div className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

              {/* Clean Image Container with no black bars */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(59,130,246,0.15)] leading-none">
                <Image
                  src="/assets/chance-rag-hero.png"
                  alt="ChanceRAG Enterprise Document Intelligence"
                  width={1280}
                  height={720}
                  priority
                  className="block h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 580px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES GRID ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
              Engineered for accuracy, scale, and enterprise trust.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              ChanceRAG solves the fundamental weaknesses of naive vector search—eliminating hallucinations, missing context, and tabular data distortion.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/[0.12] bg-white/[0.12] sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <article
                key={item.number}
                className={`group min-h-60 border-t-2 ${item.tone} bg-[#060914] p-6 transition-colors hover:bg-[#0a1020] sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <span className="font-mono text-xs text-slate-500">{item.number}</span>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.035em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {item.specs.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-slate-400 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-STAGE RAG PIPELINE ────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="border-b border-white/[0.12] pb-8">
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
            The ChanceRAG 4-stage retrieval pipeline.
          </h2>
        </div>

        <div className="divide-y divide-white/[0.10]">
          {pipelineStages.map((stage) => (
            <article
              key={stage.step}
              className="grid gap-5 py-8 transition-colors sm:grid-cols-[80px_1fr_minmax(250px,0.85fr)] sm:items-start sm:py-10 hover:bg-white/[0.018]"
            >
              <span className="font-mono text-xs text-sky-400">{stage.step}</span>
              <div>
                <h3 className="text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">
                  {stage.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  {stage.detail}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stage.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── USE CASES & IMPACT ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
              Proven in mission-critical enterprise environments.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="rounded-xl border border-white/[0.12] bg-[#060914] p-6 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-white">{uc.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {uc.description}
                  </p>
                </div>
                <div className="mt-6 border-t border-white/[0.08] pt-4 font-mono text-xs font-semibold text-sky-400">
                  {uc.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────────── */}
      <ChanceRagFaq />

      {/* ── CONTACT CTA & FOOTER ────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
