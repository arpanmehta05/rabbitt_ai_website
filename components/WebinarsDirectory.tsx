"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Play, CheckCircle2, X, ArrowRight } from "lucide-react";

export interface Webinar {
  id: string;
  title: string;
  category: "Enterprise RAG" | "Agentic Systems" | "Data Annotation" | "Inference & Fine-Tuning" | "Security & Compliance";
  status: "upcoming" | "on-demand";
  date: string;
  duration: string;
  description: string;
  image: string;
}

const WEBINARS_DATA: Webinar[] = [
  {
    id: "multi-agent-orchestration-production",
    title: "Multi-Agent Workflows in Production: State, Memory & Human Gates",
    category: "Agentic Systems",
    status: "upcoming",
    date: "Wednesday, Nov 12, 2025 • 1:00 PM EDT",
    duration: "55 min",
    description:
      "Designing stateful multi-agent choreographies with persistent episodic memory, fault-tolerant retries, and deterministic human approval gates.",
    image: "/assets/curators-hero.jpg",
  },
  {
    id: "automating-llm-evals",
    title: "Continuous LLM Evaluations: Beyond Synthetic Benchmarks in CI/CD",
    category: "Enterprise RAG",
    status: "upcoming",
    date: "Thursday, Nov 27, 2025 • 11:00 AM EDT",
    duration: "50 min",
    description:
      "Production CI/CD evaluation pipelines tracking regression, semantic accuracy, and edge-case hallucination across continuous model releases.",
    image: "/assets/chance-rag-hero.png",
  },
  {
    id: "fine-tuning-llama-production",
    title: "Fine-Tuning Open Models for Specialized Legal and Financial Analysis",
    category: "Inference & Fine-Tuning",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "52 min",
    description:
      "Parameter-efficient fine-tuning (LoRA/QLoRA) strategies, custom tokenizer alignment, and domain evaluation benchmarks for regulated industries.",
    image: "/assets/annotation-vision.jpg",
  },
  {
    id: "data-annotation-at-scale",
    title: "High-Throughput Data Annotation: Quality Automation for Multimodal AI",
    category: "Data Annotation",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "48 min",
    description:
      "Scaling human-in-the-loop annotation workflows to 10M+ tokens weekly while maintaining consensus accuracy above 99.4% through multi-tier verification.",
    image: "/assets/data-annotation-hero.jpg",
  },
  {
    id: "zero-trust-llm-security",
    title: "Zero-Trust LLM Infrastructure: Private VPCs, Guardrails & Dynamic DLP",
    category: "Security & Compliance",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "58 min",
    description:
      "Architectural patterns for private cloud LLM inference, tenant boundary isolation, real-time prompt injection filtering, and automated PII redaction.",
    image: "/assets/annotation-medical.jpg",
  },
  {
    id: "inference-latency-optimization",
    title: "Optimizing Inference Latency: Speculative Decoding & Tensor Parallelism",
    category: "Inference & Fine-Tuning",
    status: "on-demand",
    date: "On-Demand Session",
    duration: "64 min",
    description:
      "Engineering techniques for cutting time-to-first-token by 60% and scaling multi-GPU vLLM and TensorRT-LLM clusters cost-effectively.",
    image: "/assets/annotation-lidar.jpg",
  },
];

const CATEGORIES = [
  "All",
  "Agentic Systems",
  "Enterprise RAG",
  "Inference & Fine-Tuning",
  "Data Annotation",
  "Security & Compliance",
] as const;

export default function WebinarsDirectory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "upcoming" | "on-demand">("all");
  const [activeModalWebinar, setActiveModalWebinar] = useState<Webinar | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const filteredWebinars = useMemo(() => {
    return WEBINARS_DATA.filter((item) => {
      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedStatus]);

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

  const featuredSession = selectedCategory === "All" && selectedStatus === "all" ? WEBINARS_DATA[0] : null;
  const gridSessions = featuredSession ? filteredWebinars.slice(1) : filteredWebinars;

  return (
    <div className="space-y-12">
      {/* Category Navigation Bar (Clean Underline Tabs, No Badges/Pills) */}
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-1 sm:flex-row sm:items-center sm:justify-between">
        <nav
          className="flex items-center gap-7 overflow-x-auto no-scrollbar"
          aria-label="Filter masterclasses by topic"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
                {isSelected && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Minimal Status Toggle (All / Live / On-Demand) */}
        <div className="flex items-center gap-1 pb-2 sm:pb-3 shrink-0">
          {(["all", "upcoming", "on-demand"] as const).map((status) => {
            const label = status === "all" ? "All" : status === "upcoming" ? "Live" : "On-Demand";
            const isSelected = selectedStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.08] text-white font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Masterclass Spotlight (Flagship 2-Column Showcase) */}
      {featuredSession && (
        <div className="group overflow-hidden rounded-2xl border border-white/[0.1] bg-[#04060d] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-white/[0.2]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Visual 16:9 Artwork with subtle play indicator */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#020306] border border-white/[0.08] lg:col-span-7">
              <Image
                src={featuredSession.image}
                alt={featuredSession.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Status pill on image */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-emerald-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                Featured Live Session
              </div>

              {/* Duration timestamp */}
              <div className="absolute bottom-4 right-4 rounded-md bg-black/80 px-2.5 py-1 text-xs font-mono text-white border border-white/10 backdrop-blur-sm">
                {featuredSession.duration}
              </div>
            </div>

            {/* Narrative Column */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                {featuredSession.category}
              </div>

              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-[1.2] group-hover:text-slate-200 transition-colors">
                {featuredSession.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-400 line-clamp-3">
                {featuredSession.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-white/[0.08] pt-6">
                <div className="text-xs font-mono text-slate-400">
                  {featuredSession.date}
                </div>

                <button
                  type="button"
                  onClick={() => openRegistrationModal(featuredSession)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-[#020305] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Register Free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Catalogue Grid (3 Columns) */}
      {filteredWebinars.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-base text-slate-400">No sessions match your selected filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedStatus("all");
            }}
            className="mt-4 text-xs font-semibold text-white underline underline-offset-4 hover:text-slate-300"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {featuredSession && gridSessions.length > 0 && (
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                All Masterclasses
              </span>
              <span className="text-xs font-mono text-slate-400">
                {gridSessions.length} {gridSessions.length === 1 ? "Session" : "Sessions"}
              </span>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridSessions.map((webinar) => {
              const isUpcoming = webinar.status === "upcoming";

              return (
                <div
                  key={webinar.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#04060d] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.2] hover:bg-[#060914] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                >
                  <div>
                    {/* Visual 16:9 Artwork Thumbnail */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#020306] border-b border-white/[0.06]">
                      <Image
                        src={webinar.image}
                        alt={webinar.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-black/20 to-transparent" />

                      {/* Status Tag */}
                      {isUpcoming ? (
                        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
                          Live
                        </div>
                      ) : (
                        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md border border-white/10">
                          <Play className="h-2.5 w-2.5 fill-current" />
                          On-Demand
                        </div>
                      )}

                      {/* Duration timestamp */}
                      <div className="absolute bottom-2.5 right-2.5 rounded bg-black/80 px-2 py-0.5 text-[11px] font-mono text-slate-300 border border-white/10 backdrop-blur-sm">
                        {webinar.duration}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-medium">
                        {webinar.category}
                      </div>

                      <h3 className="mt-2.5 text-base sm:text-lg font-semibold tracking-tight text-white leading-snug group-hover:text-sky-300 transition-colors line-clamp-2">
                        {webinar.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {webinar.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.04] mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      {isUpcoming ? webinar.date.split("•")[0]?.trim() : "Instant Replay"}
                    </span>

                    <button
                      type="button"
                      onClick={() => openRegistrationModal(webinar)}
                      className="inline-flex items-center gap-1.5 font-semibold text-white group-hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      <span>{isUpcoming ? "Register" : "Watch"}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Registration / Watch Modal */}
      {activeModalWebinar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveModalWebinar(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.15] bg-[#050814] p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
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
                  {activeModalWebinar.status === "upcoming" ? "You're Registered!" : "Access Unlocked!"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {activeModalWebinar.status === "upcoming"
                    ? `Session calendar invite and live stream link have been sent to ${emailInput}.`
                    : `Instant masterclass replay access is ready for ${emailInput}.`}
                </p>

                <div className="mt-6 rounded-xl border border-white/[0.08] bg-[#02040a] p-4 text-left text-xs text-slate-400">
                  <p className="font-semibold text-white">{activeModalWebinar.title}</p>
                  <p className="mt-1">{activeModalWebinar.date} • {activeModalWebinar.duration}</p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveModalWebinar(null)}
                    className="w-full rounded-lg bg-white py-2.5 text-sm font-semibold text-[#020305] hover:bg-slate-100 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-sky-400">
                  {activeModalWebinar.category}
                </span>

                <h4 className="mt-2 text-xl font-bold leading-snug text-white">
                  {activeModalWebinar.status === "upcoming" ? "Register for Live Masterclass" : "Watch On-Demand Session"}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {activeModalWebinar.title}
                </p>

                <div className="mt-3 flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>{activeModalWebinar.date}</span>
                  <span>•</span>
                  <span>{activeModalWebinar.duration}</span>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Full Name <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-400 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300">
                      Work Email <span className="text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-400 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-lg bg-white py-3 text-sm font-semibold text-[#020305] shadow-sm transition-all hover:bg-slate-100 cursor-pointer"
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
