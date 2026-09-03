"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const stages = [
  {
    label: "Define Problem",
    eyebrow: "01 · Discovery",
    title: "Start with the business outcome.",
    description: "We frame the challenge, the people it serves, and the measurable change your organisation needs from AI.",
  },
  {
    label: "Design and Build Data",
    eyebrow: "02 · Data foundation",
    title: "Build data your AI can trust.",
    description: "We shape secure, useful data foundations that make enterprise knowledge ready for reliable AI delivery.",
  },
  {
    label: "Develop Model",
    eyebrow: "03 · Model strategy",
    title: "Develop the right intelligence.",
    description: "We choose, evaluate, and adapt models around the real workflows, policies, and performance needs of your business.",
  },
  {
    label: "Develop Application",
    eyebrow: "04 · Product delivery",
    title: "Turn intelligence into an experience.",
    description: "We build useful applications that bring AI safely into the hands of teams, customers, and decision makers.",
  },
  {
    label: "Evaluate Data and Model",
    eyebrow: "05 · Continuous assurance",
    title: "Keep quality accountable.",
    description: "We continuously evaluate answers, safety, and outcomes so the system gets better without losing your trust.",
  },
];

export default function LlmAdoptionJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = stages[activeIndex];

  return (
    <section id="services" className="relative overflow-hidden border-t border-white/[0.08] bg-[#020305] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">Generative AI platform</p>
        <div className="mt-6 max-w-4xl">
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Every stage of your AI adoption journey, built around you.</h2>
        </div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
          {stages.map((stage, index) => (
            <button key={stage.label} type="button" onClick={() => setActiveIndex(index)} className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-all sm:px-6 ${activeIndex === index ? "border-white bg-white text-[#020305]" : "border-white/[0.13] bg-white/[0.04] text-slate-300 hover:border-sky-400/50 hover:text-white"}`}>
              <span className="mr-2 text-slate-500">0{index + 1}</span>{stage.label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.div key={activeStage.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">{activeStage.eyebrow}</p>
              <h3 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{activeStage.title}</h3>
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">{activeStage.description}</p>
            </motion.div>
          </AnimatePresence>

          <JourneyVisual activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}

function JourneyVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.div layout className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#060c18] p-6 sm:min-h-[28rem] sm:p-10">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          {activeIndex === 0 && <DiscoveryVisual />}
          {activeIndex === 1 && <DataVisual />}
          {activeIndex === 2 && <ModelVisual />}
          {activeIndex === 3 && <ApplicationVisual />}
          {activeIndex === 4 && <EvaluationVisual />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function DiscoveryVisual() {
  const inputs = [
    {
      step: "01 Objective",
      title: "Business Outcomes",
      desc: "Target KPIs, revenue drivers & ROI metrics",
    },
    {
      step: "02 Workflow",
      title: "User Workflows",
      desc: "Operations, engineering & customer journeys",
    },
    {
      step: "03 Infrastructure",
      title: "Enterprise Stack",
      desc: "CRM, ERP, data lakes & secure API gateways",
    },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_65%),linear-gradient(135deg,#060c18,#040710)] p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-3xl grid-cols-1 items-center gap-5 lg:grid-cols-[1.1fr_auto_1.1fr]">
        {/* Left Inputs */}
        <div className="space-y-2.5">
          {inputs.map((inp) => (
            <div
              key={inp.step}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 backdrop-blur-sm transition-colors hover:border-sky-400/30"
            >
              <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-sky-400">
                {inp.step}
              </p>
              <h4 className="mt-0.5 text-sm font-semibold tracking-[-0.02em] text-white">
                {inp.title}
              </h4>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                {inp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Center Hub */}
        <div className="hidden flex-col items-center justify-center px-2 lg:flex">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/30 bg-[#071326] shadow-[0_0_30px_rgba(56,189,248,0.16)]">
            <Image
              src="/logo.svg"
              alt="Rabbitt"
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <span className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-300">
            Discovery
          </span>
        </div>

        {/* Right Output: AI Solution Spec */}
        <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-5 shadow-xl backdrop-blur-sm">
          <div className="border-b border-white/[0.08] pb-3">
            <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-sky-400">
              Delivery Blueprint
            </p>
            <h4 className="mt-0.5 text-base font-semibold tracking-[-0.02em] text-white">
              AI Solution Spec
            </h4>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <span className="font-mono text-[10px] uppercase text-slate-400">
                Projected Impact
              </span>
              <p className="mt-0.5 text-xl font-semibold tracking-tight text-white">
                +48% Efficiency Gain
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] uppercase text-slate-400">
                Architecture SLA
              </span>
              <p className="mt-0.5 font-mono text-sm font-medium text-sky-300">
                &lt; 350ms Target Latency
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-flex rounded-md border border-sky-400/30 bg-sky-500/10 px-3 py-1 font-mono text-[11px] font-medium text-sky-300">
                Validated for Data Foundation →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataVisual() {
  const steps = [
    {
      step: "01 Ingestion",
      title: "Enterprise Knowledge",
      items: [
        "PostgreSQL & Data Warehouses",
        "PDFs, Notion & Confluence Docs",
        "Live Webhooks & Event Streams",
      ],
      footer: "AES-256 Encrypted",
    },
    {
      step: "02 Processing",
      title: "Vector & RAG Engine",
      items: [
        "Context-Aware Semantic Chunking",
        "Hybrid Dense + BM25 Search",
        "Sub-15ms Similarity Search",
      ],
      footer: "10M+ Vector Capacity",
    },
    {
      step: "03 Grounding",
      title: "Trusted AI Context",
      items: [
        "Role-Based Access Control (RBAC)",
        "Automated PII Masking & Scrubbing",
        "Strict Source Citation Tracking",
      ],
      footer: "100% Grounded Output",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-center bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_65%),linear-gradient(135deg,#060c18,#040710)] p-5 sm:p-8">
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-400/30"
          >
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-sky-400">
                {s.step}
              </p>
              <h4 className="mt-1 text-sm font-semibold tracking-[-0.02em] text-white">
                {s.title}
              </h4>
              <div className="mt-3.5 space-y-2 border-l border-sky-400/30 pl-3 text-xs text-slate-300">
                {s.items.map((it) => (
                  <p key={it} className="leading-snug">
                    {it}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[10px] font-medium text-sky-400/90">
              {s.footer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelVisual() {
  const models = [
    {
      name: "Claude 3.5 Sonnet",
      role: "Complex Reasoning & Architecture",
      latency: "210ms",
      status: "Active",
    },
    {
      name: "GPT-4o",
      role: "Multimodal & General Tasks",
      latency: "235ms",
      status: "Active",
    },
    {
      name: "Rabbitt Llama 3 Fine-Tuned",
      role: "Domain Workflows (LoRA & DPO)",
      latency: "95ms",
      status: "Optimized",
    },
  ];

  return (
    <div className="relative flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_65%),linear-gradient(135deg,#060c18,#040710)] p-4 sm:p-6 lg:p-8">
      {/* Unified Enterprise Console */}
      <div className="w-full max-w-2xl rounded-xl border border-white/[0.1] bg-white/[0.03] shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Console Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 font-mono text-[11px] font-medium text-slate-300">
              Rabbitt Model Gateway Console
            </span>
          </div>
          <span className="rounded border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-sky-300">
            Multi-Model Routing
          </span>
        </div>

        {/* Model Routing Matrix */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                Orchestration Engine
              </p>
              <h4 className="mt-0.5 text-sm font-semibold tracking-[-0.02em] text-white">
                Dynamic Arbitration Matrix
              </h4>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-semibold text-white">180 tok/sec</span>
              <p className="font-mono text-[10px] text-slate-400">vLLM Inference</p>
            </div>
          </div>

          {/* Model Rows */}
          <div className="mt-3.5 space-y-2">
            {models.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2 text-xs transition-colors hover:border-sky-400/30"
              >
                <div>
                  <p className="font-semibold text-white">{m.name}</p>
                  <p className="text-[11px] text-slate-400">{m.role}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] font-medium text-sky-300">
                    {m.latency}
                  </span>
                  <p className="font-mono text-[10px] text-slate-500">{m.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Capability Strip */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-3 text-[11px]">
            <div>
              <p className="font-mono text-[10px] uppercase text-sky-400">Domain Adaptation</p>
              <p className="mt-0.5 text-slate-300">LoRA & DPO Tuning</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-sky-400">Inference Engine</p>
              <p className="mt-0.5 text-slate-300">FP8 Quantization</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase text-sky-400">Policy Guardrails</p>
              <p className="mt-0.5 text-slate-300">Zero Hallucination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationVisual() {
  return (
    <div className="relative flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_65%),linear-gradient(135deg,#060c18,#040710)] p-4 sm:p-6 lg:p-8">
      {/* Unified Copilot Window */}
      <div className="w-full max-w-xl rounded-xl border border-white/[0.1] bg-white/[0.03] shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 font-mono text-[11px] font-medium text-slate-300">
              Rabbitt Enterprise Copilot
            </span>
          </div>
          <span className="rounded border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-sky-300">
            Active Session
          </span>
        </div>

        {/* Conversation Stream */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* User Message (Consistent dark glass styling) */}
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] text-slate-400 mb-1 mr-1">You</span>
            <div className="max-w-[88%] rounded-xl rounded-tr-none border border-white/[0.08] bg-white/[0.05] px-3.5 py-2.5 text-xs text-white shadow-sm">
              Analyze Q3 pipeline expansion and flag high-risk enterprise accounts.
            </div>
          </div>

          {/* AI Response (Exact same dark glass surface & harmony) */}
          <div className="flex flex-col items-start">
            <span className="font-mono text-[10px] text-sky-400 mb-1 ml-1">Rabbitt Copilot</span>
            <div className="max-w-[92%] rounded-xl rounded-tl-none border border-white/[0.08] bg-white/[0.05] p-3.5 text-xs text-slate-200 shadow-sm">
              <p className="leading-relaxed">
                Q3 enterprise pipeline expanded by{" "}
                <strong className="text-white">+28% ($4.2M)</strong>. 3 accounts flagged for renewal review:
              </p>
              <div className="mt-2.5 rounded border border-white/[0.06] bg-black/30 p-2 font-mono text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span>Acme Enterprise</span>
                  <span className="text-sky-300">Action Required</span>
                </div>
                <div className="mt-1 flex justify-between text-slate-300">
                  <span>Globex Global</span>
                  <span className="text-slate-400">Contract Ready (94%)</span>
                </div>
              </div>
              <p className="mt-2 font-mono text-[10px] text-sky-400">
                Mitigation playbooks synchronized to CRM & Slack
              </p>
            </div>
          </div>

          {/* Bottom Chat Prompt Input Bar */}
          <div className="mt-2 flex items-center justify-between rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 text-xs text-slate-400">
            <span className="truncate">Ask Rabbitt Copilot about enterprise data...</span>
            <span className="font-mono text-[10px] text-sky-400">↵ Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvaluationVisual() {
  const metrics = [
    { label: "Faithfulness & Grounding", value: "99.8%", width: "99.8%" },
    { label: "Answer Relevance", value: "98.6%", width: "98.6%" },
    { label: "Policy & Safety Compliance", value: "100%", width: "100%" },
    { label: "Context Retrieval Precision", value: "99.2%", width: "99.2%" },
  ];

  const checks = [
    "Continuous automated regression testing",
    "Real-time hallucination prevention (< 0.15%)",
    "Zero PII data leakage (SOC-2 Type II audit)",
    "Human-in-the-loop telemetry & audit logs",
  ];

  return (
    <div className="flex h-full flex-col justify-center bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),transparent_65%),linear-gradient(135deg,#060c18,#040710)] p-5 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Left Column: Automated Quality Benchmarks */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                Assurance Benchmarks
              </p>
              <h4 className="mt-0.5 text-sm font-semibold tracking-[-0.02em] text-white">
                Quality Metrics
              </h4>
            </div>
            <span className="font-mono text-sm font-semibold text-white">
              99.4% Pass
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{m.label}</span>
                  <span className="font-mono font-medium text-sky-300">
                    {m.value}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/[0.08]">
                  <div
                    style={{ width: m.width }}
                    className="h-full rounded-full bg-sky-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Governance Matrix */}
        <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-sm backdrop-blur-sm">
          <div>
            <div className="border-b border-white/[0.08] pb-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                Governance Layer
              </p>
              <h4 className="mt-0.5 text-sm font-semibold tracking-[-0.02em] text-white">
                Continuous Assurance
              </h4>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-slate-300">
              {checks.map((c) => (
                <div key={c} className="border-l border-sky-400/40 pl-2.5 leading-snug">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-white/[0.08] pt-3">
            <span className="inline-flex rounded border border-sky-400/30 bg-sky-500/10 px-2.5 py-1 font-mono text-[10px] font-medium text-sky-300">
              AUDIT STATUS: ACTIVE & VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
