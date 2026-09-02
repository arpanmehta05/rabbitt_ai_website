import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navica AI | Unlock Your Perfect Career Path | Rabbitt AI",
  description:
    "Discover your dream AI career with Navica AI. Upload your resume, explore tailored career paths, take compatibility assessments, and follow guided career roadmaps.",
};

const careerPaths = [
  {
    role: "AI Solutions Architect",
    category: "Architecture & Systems",
    salary: "$185k to $240k",
    timeline: "6 Months",
    description:
      "Design and deploy enterprise generative AI architectures, orchestrating foundation models, vector databases, and multi-agent production graphs.",
    skills: ["Enterprise LLMs", "Multi-Agent Graphs", "vLLM / TensorRT", "RAG Systems"],
    deliverable: "Production Architecture Blueprint",
  },
  {
    role: "ML Infrastructure Engineer",
    category: "Systems & Ops",
    salary: "$175k to $225k",
    timeline: "5 Months",
    description:
      "Scale high-performance distributed training clusters, optimize GPU memory utilization, and automate deployment pipelines using Ray, Slurm, and Kubernetes.",
    skills: ["Ray / Slurm", "CUDA Optimization", "Kubernetes", "GPU Clustering"],
    deliverable: "Scalable Cluster Deployment Plan",
  },
  {
    role: "AI Research Scientist",
    category: "Research & Modeling",
    salary: "$190k to $260k",
    timeline: "8 Months",
    description:
      "Pioneer next-generation foundation model architectures, novel fine-tuning methodologies, model compression, and reinforcement learning with human feedback.",
    skills: ["RLHF & DPO", "Model Quantization", "Mechanistic Interpretability", "PyTorch"],
    deliverable: "Benchmark Evaluation & Weights",
  },
  {
    role: "AI Ethics & Governance Consultant",
    category: "Policy & Safety",
    salary: "$140k to $190k",
    timeline: "4 Months",
    description:
      "Establish responsible AI auditing frameworks, ensure regulatory compliance with global standards, and conduct algorithmic bias mitigation audits.",
    skills: ["EU AI Act Compliance", "Algorithmic Fairness", "Safety Guardrails", "Red Teaming"],
    deliverable: "Enterprise Governance Audit Matrix",
  },
  {
    role: "AI Product Manager",
    category: "Product & Strategy",
    salary: "$165k to $210k",
    timeline: "4 Months",
    description:
      "Bridge cutting-edge AI capabilities with user needs. Define evaluation rubrics, scope model integrations, and lead cross-functional development sprints.",
    skills: ["Model Evals", "AI UX Design", "Technical PRDs", "KPI Attribution"],
    deliverable: "Complete AI Product Specification",
  },
  {
    role: "Data & Retrieval Specialist",
    category: "Data Engineering",
    salary: "$150k to $195k",
    timeline: "5 Months",
    description:
      "Build high-throughput multimodal ingestion pipelines, configure hybrid sparse/dense vector search, and curate domain-specific training corpora.",
    skills: ["Vector Databases", "Hybrid Search", "Unstructured ETL", "Knowledge Graphs"],
    deliverable: "Production RAG Data Pipeline",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    tag: "RESUME INGESTION",
    title: "Upload Your Resume",
    description:
      "Upload your resume or paste your LinkedIn profile. Navica AI parses your skill stack, projects, and work history to build an accurate technical profile without guesswork.",
    deliverable: "Extracted Skill DNA & Gap Audit",
  },
  {
    step: "02",
    tag: "ROLE COMPASS",
    title: "Explore 6 Tailored Pathways",
    description:
      "Based on your background and ambitions, explore six tailored AI roles complete with verified market compensation, difficulty ratings, and hiring demand.",
    deliverable: "Role Compatibility Matrix",
  },
  {
    step: "03",
    tag: "ROADMAP GENERATION",
    title: "Get Your Complete Career Guide",
    description:
      "Receive a structured monthly roadmap with hands-on projects, industry certifications, and reading lists tailored to close your exact skill gaps.",
    deliverable: "Monthly Action Plan",
  },
  {
    step: "04",
    tag: "SKILL ASSESSMENT",
    title: "Take Compatibility Assessment",
    description:
      "Complete a 10 question technical diagnostic assessing your real-world problem-solving readiness for your target role with instant diagnostic feedback.",
    deliverable: "Comprehensive Readiness Scorecard",
  },
  {
    step: "05",
    tag: "OFFER ACCELERATION",
    title: "Execute & Land Your Dream Job",
    description:
      "Follow guided milestone execution to build your portfolio, complete mock interview loops with AI hiring managers, and negotiate your offer.",
    deliverable: "Verified Interview Readiness",
  },
];

const successStories = [
  {
    name: "Nisha Patel",
    role: "Data Scientist",
    transition: "Data Analyst → Data Scientist",
    quote:
      "I was stuck in repetitive dashboard reporting. Navica gave me a realistic 5-month plan focusing on PyTorch and feature stores. Landed my first data science role with real confidence.",
    timeline: "5 Months",
    company: "Fintech Enterprise",
    initials: "NP",
  },
  {
    name: "Marcus Vance",
    role: "AI Solutions Architect",
    transition: "Backend Dev → AI Architect",
    quote:
      "Instead of drowning in YouTube tutorials, Navica showed me the exact enterprise RAG patterns and multi-agent graphs hiring managers actually tested in interviews.",
    timeline: "6 Months",
    company: "Cloud Platform",
    initials: "MV",
  },
  {
    name: "Priya Sundaram",
    role: "AI Ethics & Safety Lead",
    transition: "Policy Analyst → AI Safety Consultant",
    quote:
      "Navica broke down the EU AI Act frameworks and red-teaming skills that enterprise teams needed. The roadmap helped me transition in under 4 months.",
    timeline: "4 Months",
    company: "AI Governance Lab",
    initials: "PS",
  },
  {
    name: "Liam O'Connor",
    role: "ML Infrastructure Engineer",
    transition: "DevOps Engineer → MLOps Lead",
    quote:
      "The 10-question diagnostic pinpointed my GPU cluster orchestration gaps. The project guide helped me master Ray and Slurm, leading to a 35% compensation bump.",
    timeline: "5 Months",
    company: "Autonomous AI Startup",
    initials: "LO",
  },
];

export default function NavicaAiPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-14 sm:px-10 sm:pt-32 sm:pb-16 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left: Copy */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              AI Career Intelligence
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              NavicaAI,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Your Dream AI Career
              </span>
              <br />
              Mapped in Clicks
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              Stop wandering in the dark. Navica AI analyzes your unique resume, matches your skills with top AI career choices, and creates a clear, personalized roadmap to land your dream role.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Map Your Future Free
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                See How It Works
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Official Navica AI Visual */}
          <div className="relative lg:col-span-7">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.25)_0%,rgba(59,130,246,0.2)_50%,transparent_70%)] blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#070e1b] shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
              <Image
                src="/navicai.png"
                alt="Navica AI official platform visual"
                width={1152}
                height={768}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.1]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL MANIFESTO: WHY NAVICA AI? ───────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Career Acceleration
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          Because Your Career Deserves More
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl sm:leading-relaxed">
          From resume upload to your dream career,
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
            Navica AI transforms your aspirations into a clear, actionable roadmap.
          </span>
        </p>

        {/* 3 Metrics Pillars */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 divide-y divide-white/[0.08] sm:grid-cols-3 sm:gap-8 sm:divide-y-0 sm:divide-x">
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              6<span className="text-2xl font-semibold text-sky-400">+</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Tailored Career Paths
            </p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              10<span className="text-2xl font-semibold text-sky-400"> Min</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Compatibility Test
            </p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              94<span className="text-2xl font-semibold text-sky-400">%</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Transition Success Rate
            </p>
          </div>
        </div>
      </section>

      {/* ── EXPLORE CAREER OPTIONS (6 ROLES GRID) ────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Tailored Career Options
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          Six high-growth career tracks built for the AI economy
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Each pathway provides verified compensation data, time commitments, core skill competencies, and a tangible deliverable blueprint.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careerPaths.map((cp) => (
            <div
              key={cp.role}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] border-t-2 border-t-white bg-[#060c18] p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sky-400">
                    {cp.category}
                  </span>
                  <span className="font-sans text-xs font-medium text-slate-300">
                    {cp.salary}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                  {cp.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {cp.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                  {cp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <span className="text-[11px] font-medium tracking-wide text-slate-400">
                  Deliverable: {cp.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS: 5-STAGE PROGRESSIVE WALKTHROUGH ─────────────── */}
      <section
        id="how-it-works"
        className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          How It Works
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
          It&apos;s your career,{" "}
          <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
            reimagined step by step
          </span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          From initial resume upload to your dream role, Navica AI turns your career goals into an actionable, verified reality.
        </p>

        {/* 5-Stage Guided Journey */}
        <div className="mt-12 space-y-6">
          {/* Step 1: Resume Upload */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#060c18] p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-400">STEP 01</span>
                  <span className="h-px w-6 bg-white/[0.15]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Resume Ingestion</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  Upload Your Resume
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  Upload your resume or paste your LinkedIn profile. Navica AI parses your skill stack, projects, and work history to build an accurate technical profile without guesswork.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] p-5 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">Drop your PDF or DOCX resume here</p>
                  <p className="mt-3 text-xs text-slate-400">
                    Auto-extracts 40+ skills & gap matrix
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Explore Pathways */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#060c18] p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-400">STEP 02</span>
                  <span className="h-px w-6 bg-white/[0.15]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Role Compass</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  Explore 6 Tailored Career Choices
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  Based on your background and ambitions, explore six tailored AI roles complete with verified market compensation, difficulty ratings, and hiring demand.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                    <div>
                      <p className="text-xs font-bold text-white">AI Solutions Architect</p>
                      <p className="text-[11px] text-sky-300">$185k to $240k • 6 Months</p>
                    </div>
                    <span className="text-xs font-semibold text-white">94% Match</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                    <div>
                      <p className="text-xs font-bold text-white">ML Infrastructure Engineer</p>
                      <p className="text-[11px] text-slate-400">$175k to $225k • 5 Months</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-300">88% Match</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] p-3">
                    <div>
                      <p className="text-xs font-bold text-white">AI Research Scientist</p>
                      <p className="text-[11px] text-slate-400">$190k to $260k • 8 Months</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-300">82% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Complete Career Guide */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#060c18] p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-400">STEP 03</span>
                  <span className="h-px w-6 bg-white/[0.15]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Roadmap Generation</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  Get Your Complete Career Guide
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  Receive a structured monthly roadmap with hands-on projects, industry certifications, and reading lists tailored to close your exact skill gaps.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="space-y-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="text-xs font-bold text-sky-400">Phase 1</span>
                    <div>
                      <p className="text-xs font-bold text-white">Advanced LLM Serving & vLLM Ops</p>
                      <p className="text-[11px] text-slate-400">Quantized models, TensorRT, speculative decoding</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="text-xs font-bold text-sky-400">Phase 2</span>
                    <div>
                      <p className="text-xs font-bold text-white">Enterprise Multi-Agent RAG</p>
                      <p className="text-[11px] text-slate-400">LangGraph orchestration, hybrid vector retrieval</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <span className="text-xs font-bold text-sky-400">Phase 3</span>
                    <div>
                      <p className="text-xs font-bold text-white">Production Portfolio Defense</p>
                      <p className="text-[11px] text-slate-400">System design mocks with ex-Google / OpenAI leads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Compatibility Test */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#060c18] p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-400">STEP 04</span>
                  <span className="h-px w-6 bg-white/[0.15]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Skill Assessment</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  Take Compatibility Assessment
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  Complete a 10 question technical diagnostic assessing your real-world problem-solving readiness for your target role with instant diagnostic feedback.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-400">QUESTION 03 OF 10</p>
                  <p className="mt-1 text-xs font-bold text-white">
                    Which approach best prevents catastrophic forgetting in domain LLM adaptation?
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between rounded border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-xs font-medium text-white">
                      <span>Parameter-Efficient LoRA / QLoRA Adapters</span>
                      <span className="text-[10px] font-semibold text-sky-400">Selected</span>
                    </div>
                    <div className="rounded border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
                      <span>Linear learning rate scaling</span>
                    </div>
                    <div className="rounded border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs text-slate-400">
                      <span>Full model weight unfreezing without replay buffer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Execute & Land Role */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#060c18] p-6 sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-sky-400">STEP 05</span>
                  <span className="h-px w-6 bg-white/[0.15]" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Offer Acceleration</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                  Your Results, Your Roadmap
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-300">
                  Follow guided milestone execution to build your portfolio, complete mock interview loops with AI hiring managers, and negotiate your offer.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">CANDIDATE AUDIT STATUS</p>
                    <span className="text-xs font-semibold text-white">VERIFIED</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">94%</span>
                    <span className="text-xs text-slate-400">Compatibility Score</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    Target Role: <strong className="text-white">AI Solutions Architect</strong>
                  </p>
                  <p className="mt-4 text-[11px] text-slate-400">
                    Ready for Tier 1 Technical Loops & Offer Negotiation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS: REAL SUCCESS STORIES ───────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Success Stories
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          What others are saying about Navica AI
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Real career transitions from engineers, analysts, and product managers who used Navica to navigate the AI economy.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {successStories.map((story) => (
            <div
              key={story.name}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#060c18] p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-sky-400">
                    {story.transition}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {story.timeline}
                  </span>
                </div>

                <blockquote className="mt-4 text-base leading-relaxed text-slate-200">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-bold text-white">
                  {story.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{story.name}</p>
                  <p className="text-xs text-slate-400">
                    {story.role} • {story.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
