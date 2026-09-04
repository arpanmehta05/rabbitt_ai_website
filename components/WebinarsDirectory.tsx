"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Calendar, Play, CheckCircle2, X, ArrowRight } from "lucide-react";

export interface Webinar {
  id: string;
  title: string;
  category: "Enterprise RAG" | "Agentic Systems" | "Data Annotation" | "Inference & Fine-Tuning" | "Security & Compliance";
  status: "upcoming" | "on-demand";
  date: string;
  duration: string;
  description: string;
  takeaways: string[];
}

const WEBINARS_DATA: Webinar[] = [
  {
    id: "production-rag-scale",
    title: "Architecting Production RAG: Hybrid Indexing, Guardrails & Deterministic Tooling",
    category: "Enterprise RAG",
    status: "upcoming",
    date: "Thursday, Oct 24, 2025 • 11:00 AM EDT / 8:00 AM PDT",
    duration: "60 mins • Live interactive Q&A",
    description:
      "A technical walkthrough of production-grade retrieval augmented generation architectures. Explore how our engineering team combines sparse lexical search with dense vector representations, keeps cross-encoder re-ranking under 40ms SLA, and enforces deterministic JSON schema validation for multi-agent workflows.",
    takeaways: [
      "Sub-50ms hybrid search pipelines combining BM25 and hierarchical vector indexing",
      "Semantic caching and hallucination mitigation with automated evals",
      "Deterministic tool-calling patterns with structured JSON schema outputs",
    ],
  },
  {
    id: "fine-tuning-llama-production",
    title: "Fine-Tuning Open Models for Specialized Legal and Financial Analysis",
    category: "Inference & Fine-Tuning",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "52 mins",
    description:
      "Parameter-efficient fine-tuning (LoRA/QLoRA) strategies, custom tokenizer alignment, and domain evaluation benchmarks for regulated industries requiring strict SLA and compliance.",
    takeaways: [
      "LoRA rank selection and target module ablation on 70B parameter models",
      "Synthetic domain alignment data generation and quality filtering",
      "Benchmarking domain retention vs. general reasoning capability",
    ],
  },
  {
    id: "multi-agent-orchestration-production",
    title: "Multi-Agent Workflows in Production: State, Memory & Human Gates",
    category: "Agentic Systems",
    status: "upcoming",
    date: "Wednesday, Nov 12, 2025 • 1:00 PM EDT / 10:00 AM PDT",
    duration: "55 mins • Live Q&A",
    description:
      "Designing stateful multi-agent choreographies with persistent episodic memory, fault-tolerant retries, tool execution sandboxes, and seamless human approval gates.",
    takeaways: [
      "State machine orchestration patterns vs. free-form autonomous loops",
      "Short-term working memory vs. long-term vector-backed episodic retrieval",
      "Implementing deterministic human-in-the-loop escalation paths",
    ],
  },
  {
    id: "data-annotation-at-scale",
    title: "High-Throughput Data Annotation: Quality Automation for Multimodal AI",
    category: "Data Annotation",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "48 mins",
    description:
      "Scaling human-in-the-loop annotation workflows to 10M+ tokens and frames weekly while maintaining consensus accuracy above 99.4% through multi-tier verification.",
    takeaways: [
      "Automating preliminary model pre-labeling with active uncertainty sampling",
      "Inter-annotator agreement scoring algorithms (Cohen's Kappa & Krippendorff's Alpha)",
      "Building custom taxonomy schemas for complex domain-specific annotation",
    ],
  },
  {
    id: "zero-trust-llm-security",
    title: "Zero-Trust LLM Infrastructure: Private VPCs, Guardrails & Dynamic DLP",
    category: "Security & Compliance",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "58 mins",
    description:
      "Architectural patterns for private cloud LLM inference, tenant boundary isolation, real-time prompt injection filtering, and automated PII redaction under SOC2 and HIPAA.",
    takeaways: [
      "Zero-retention VPC deployment patterns across AWS, Azure, and GCP",
      "Real-time token-level redaction and anonymization proxies",
      "Defense-in-depth against prompt injection and model extraction attacks",
    ],
  },
  {
    id: "automating-llm-evals",
    title: "Continuous LLM Evaluations: Beyond Synthetic Benchmarks in CI/CD",
    category: "Enterprise RAG",
    status: "upcoming",
    date: "Thursday, Nov 27, 2025 • 11:00 AM EDT / 8:00 AM PDT",
    duration: "50 mins • Live Q&A",
    description:
      "Moving past static public benchmarks to build production CI/CD evaluation pipelines that track regression, semantic accuracy, and edge-case hallucination across releases.",
    takeaways: [
      "Designing golden test sets from anonymized production failure logs",
      "LLM-as-a-judge calibration with human expert correlation",
      "Automating regression gates in GitHub Actions before model deployments",
    ],
  },
  {
    id: "inference-latency-optimization",
    title: "Optimizing Inference Latency: Speculative Decoding & Tensor Parallelism",
    category: "Inference & Fine-Tuning",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "64 mins",
    description:
      "Engineering techniques for cutting time-to-first-token by 60% and scaling multi-GPU vLLM and TensorRT-LLM clusters cost-effectively for high-concurrency workloads.",
    takeaways: [
      "Configuring draft models for speculative decoding on 70B+ architectures",
      "PagedAttention memory management and KV-cache optimization",
      "Dynamic batching and multi-node tensor parallel scaling",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Enterprise RAG",
  "Agentic Systems",
  "Data Annotation",
  "Inference & Fine-Tuning",
  "Security & Compliance",
] as const;

export default function WebinarsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "upcoming" | "on-demand">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalWebinar, setActiveModalWebinar] = useState<Webinar | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const featuredWebinar = WEBINARS_DATA[0];

  const filteredWebinars = useMemo(() => {
    const isDefaultView =
      selectedCategory === "All" &&
      selectedStatus === "all" &&
      !searchQuery.trim();
    const sourceData = isDefaultView ? WEBINARS_DATA.slice(1) : WEBINARS_DATA;

    return sourceData.filter((item) => {
      // Status filter
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalWebinar) {
        setActiveModalWebinar(null);
        setFormSubmitted(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalWebinar]);

  const openRegistrationModal = (webinar: Webinar) => {
    setActiveModalWebinar(webinar);
    setFormSubmitted(false);
    setEmailInput("");
    setNameInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div>
      {/* Featured Webinar Showcase - Clean, no badges, no fake profile avatars */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#060e1d]/70 p-8 sm:p-10 lg:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                {featuredWebinar.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {featuredWebinar.description}
              </p>

              {/* Key Takeaways */}
              <div className="mt-6 space-y-2.5">
                {featuredWebinar.takeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openRegistrationModal(featuredWebinar)}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#020305] shadow-[0_0_24px_rgba(255,255,255,0.18)] transition-all hover:bg-slate-100"
                >
                  <Calendar className="h-4 w-4 text-[#020305]" />
                  <span>Reserve Live Seat Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Session Details */}
            <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#030712]/80 p-6 sm:p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    Schedule
                  </span>
                  <p className="mt-1.5 text-base font-semibold text-white">
                    {featuredWebinar.date}
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-5">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    Duration & Format
                  </span>
                  <p className="mt-1.5 text-sm text-slate-200">
                    {featuredWebinar.duration}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Interactive engineering session with architecture walkthrough and live Q&A.
                  </p>
                </div>

                <div className="border-t border-white/[0.08] pt-5">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                    Track
                  </span>
                  <p className="mt-1.5 text-sm font-medium text-sky-300">
                    {featuredWebinar.category}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-white/[0.06] bg-black/40 p-3.5 text-xs text-slate-400">
                Includes access to architecture blueprints, reference code, and session replay recording.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="mb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Tabs */}
          <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
            <button
              type="button"
              onClick={() => setSelectedStatus("all")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                selectedStatus === "all"
                  ? "bg-white text-[#020305] shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("upcoming")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                selectedStatus === "upcoming"
                  ? "bg-white text-[#020305] shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Upcoming Live
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus("on-demand")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                selectedStatus === "on-demand"
                  ? "bg-white text-[#020305] shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              On-Demand
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search webinars or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-400 focus:bg-white/[0.05] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                selectedCategory === cat
                  ? "border-sky-400 bg-sky-500/15 text-sky-300"
                  : "border-white/[0.1] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Webinars Grid - Clean cards without fake profile avatars or names */}
      <section className="mb-20">
        {filteredWebinars.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] py-20 text-center">
            <p className="text-base text-slate-400">
              No sessions match your current filter or search criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedStatus("all");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold text-sky-400 hover:text-sky-300 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWebinars.map((webinar) => {
              const isUpcoming = webinar.status === "upcoming";
              return (
                <div
                  key={webinar.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060d1a] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Top Row: Category and Timing */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                      <span className="font-medium text-slate-300">
                        {webinar.category}
                      </span>
                      <span>
                        {isUpcoming ? webinar.date.split("•")[0]?.trim() : webinar.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-sky-200">
                      {webinar.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-400">
                      {webinar.description}
                    </p>
                  </div>

                  {/* Card Action Footer */}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {isUpcoming ? "Live Session" : "On-Demand"}
                    </span>

                    <button
                      type="button"
                      onClick={() => openRegistrationModal(webinar)}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10 hover:text-sky-200"
                    >
                      {isUpcoming ? (
                        <>
                          <span>Register</span>
                          <ArrowRight className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 fill-current" />
                          <span>Watch</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Registration / Watch Modal */}
      {activeModalWebinar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveModalWebinar(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.15] bg-[#060b14] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalWebinar(null)}
              className="absolute right-5 top-5 rounded-full border border-white/10 p-1.5 text-slate-400 hover:border-white/25 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {formSubmitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="mt-4 text-xl font-bold text-white">
                  {activeModalWebinar.status === "upcoming" ? "You're Registered!" : "Access Granted!"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {activeModalWebinar.status === "upcoming"
                    ? `Calendar invitation and session access details have been sent to ${emailInput}.`
                    : `Instant replay access is unlocked for ${emailInput}.`}
                </p>

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#0a1222] p-4 text-left text-xs text-slate-400">
                  <p className="font-semibold text-white">{activeModalWebinar.title}</p>
                  <p className="mt-1">{activeModalWebinar.date} • {activeModalWebinar.duration}</p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveModalWebinar(null)}
                    className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-[#020305] hover:bg-slate-100"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-400">
                  {activeModalWebinar.category}
                </span>

                <h4 className="mt-2 text-xl font-bold leading-snug text-white">
                  {activeModalWebinar.status === "upcoming" ? "Register for Live Masterclass" : "Watch On-Demand Session"}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {activeModalWebinar.title}
                </p>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                  <span>{activeModalWebinar.date}</span>
                  <span>•</span>
                  <span>{activeModalWebinar.duration}</span>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Full Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-400 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300">
                      Work Email <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-400 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-white py-3 text-sm font-semibold text-[#020305] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all hover:bg-slate-100"
                  >
                    {activeModalWebinar.status === "upcoming" ? "Confirm Free Registration" : "Unlock Instant Replay"}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    No spam. You will only receive session access details.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
