import Link from "next/link";

const disciplines = [
  {
    number: "01",
    title: "LLM Engineering & Agents",
    note: "Hands-on model fine-tuning, advanced prompt engineering, RAG pipelines & autonomous agent loops.",
    tone: "border-t-sky-400",
    tags: ["LangChain & LlamaIndex", "Vector DBs", "Autonomous Agents"],
  },
  {
    number: "02",
    title: "GenAI for Academic Research",
    note: "Automated literature synthesis, multi-modal discovery, data modeling & scientific paper acceleration.",
    tone: "border-t-blue-500",
    tags: ["Research AI", "Scientific Modeling", "Data Analysis"],
  },
  {
    number: "03",
    title: "Faculty Enablement & Tools",
    note: "Upskilling educators, AI pedagogical integration, ethical AI frameworks & automated assessment.",
    tone: "border-t-sky-300",
    tags: ["Faculty Training", "AI Ethics", "Pedagogy"],
  },
  {
    number: "04",
    title: "Hackathons & Capstones",
    note: "Real enterprise problem statements, industry mentor office hours & student placement pipelines.",
    tone: "border-t-blue-400",
    tags: ["Campus Hackathons", "Industry Capstones", "Placements"],
  },
];

const process = [
  {
    step: "01",
    title: "Academic needs assessment & curriculum mapping",
    description:
      "We collaborate with department heads to map learning outcomes against current degree syllabi and industry demand.",
  },
  {
    step: "02",
    title: "Cloud compute & AI sandbox provisioning",
    description:
      "Students receive zero-setup cloud Jupyter environments, pre-configured GPU clusters, and enterprise API access.",
  },
  {
    step: "03",
    title: "Live masterclasses & hands-on lab sprints",
    description:
      "Senior AI engineers and researchers lead interactive live coding sessions, architectural reviews, and debugging labs.",
  },
  {
    step: "04",
    title: "Capstone demo days & career placement",
    description:
      "Students present working prototypes to enterprise hiring partners, receive credentials, and access hiring networks.",
  },
];

const curriculumModules = [
  {
    module: "01",
    title: "Foundations of LLMs & Attention Mechanisms",
    duration: "Week 1 - 2",
    topics: "Transformer architecture, tokenization, embeddings & pre-training intuition",
  },
  {
    module: "02",
    title: "Production RAG & Vector Database Systems",
    duration: "Week 3 - 4",
    topics: "Chunking strategies, semantic retrieval, hybrid search & reranking models",
  },
  {
    module: "03",
    title: "Agentic Workflows & Tool-Augmented AI",
    duration: "Week 5 - 6",
    topics: "Multi-agent coordination, function calling, memory persistence & web search integration",
  },
  {
    module: "04",
    title: "Fine-Tuning, Guardrails & Production Deployment",
    duration: "Week 7 - 8",
    topics: "LoRA/QLoRA parameter-efficient tuning, hallucination guardrails & API deployment",
  },
];

export default function UniversityTrainingStudio() {
  return (
    <>
      {/* ── TRAINING DISCIPLINES ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="lg:pb-5">
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
                Curriculum built for builders, not just spectators.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                Textbook theory isn&apos;t enough. We bring production AI systems, real-world deployment challenges, and enterprise engineering practices directly into university lecture halls.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/[0.12] bg-white/[0.12] sm:grid-cols-2">
              {disciplines.map((item) => (
                <article
                  key={item.number}
                  className={`group min-h-48 border-t-2 ${item.tone} bg-[#060914] p-6 transition-colors hover:bg-[#0a1020] sm:p-7 flex flex-col justify-between`}
                >
                  <div>
                    <span className="font-mono text-xs text-slate-500">{item.number}</span>
                    <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.note}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
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
        </div>
      </section>

      {/* ── CURRICULUM ARCHITECTURE & LAB SHOWCASE ───────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14] p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Production-grade sandboxes & accredited syllabi.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Every student receives pre-configured cloud environments, enterprise API credits, and hands-on lab manuals designed by practicing AI researchers and industry practitioners.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Zero setup: cloud Jupyter labs with GPU acceleration</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Real enterprise dataset repositories and benchmark suites</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Modular integration into existing semester credit systems</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contactus"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
                >
                  Request University Syllabus
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.12] bg-[#030611] p-5 sm:p-6 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase text-sky-400">
                    Core Academic Track
                  </span>
                  <h4 className="text-base font-semibold text-white">
                    Generative AI & LLM Systems Engineering
                  </h4>
                </div>
                <span className="rounded bg-blue-600/30 px-2.5 py-1 text-blue-200 font-mono text-[11px] border border-blue-500/40">
                  8-Week Program
                </span>
              </div>

              <div className="space-y-3">
                {curriculumModules.map((mod) => (
                  <div
                    key={mod.module}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-sky-400">
                          {mod.module}
                        </span>
                        <h5 className="text-sm font-medium text-white">
                          {mod.title}
                        </h5>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 shrink-0">
                        {mod.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 pl-6">
                      {mod.topics}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR METHODOLOGY ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="flex flex-col justify-between gap-7 border-b border-white/[0.12] pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              Academic excellence meets production engineering.
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/[0.10]">
          {process.map((item) => (
            <article
              key={item.step}
              className="grid gap-5 py-8 transition-colors sm:grid-cols-[80px_1fr_minmax(230px,0.72fr)] sm:items-start sm:py-10 hover:bg-white/[0.018]"
            >
              <span className="font-mono text-xs text-sky-400">{item.step}</span>
              <h3 className="text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">
                {item.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── IMPACT FRAMEWORK ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-24">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                Empower your institution with an industry-grade AI ecosystem.
              </h2>
            </div>
            <Link
              href="/contactus"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Discuss a university partnership{" "}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>

          <div className="border-l border-white/[0.15] pl-6 sm:pl-10">
            <p className="font-serif text-2xl leading-[1.36] tracking-[-0.025em] sm:text-[2rem]">
              “University education must bridge the gap between theoretical machine learning and production-scale AI systems. We empower students to build real systems that matter.”
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/[0.15] sm:grid-cols-3">
              {[
                ["The foundation", "Core LLM Architectures"],
                ["The lab", "Production RAG Sandboxes"],
                ["The capstone", "Multi-Agent System Builds"],
                ["The faculty", "Pedagogical Enablement"],
                ["The credential", "Verified AI Certification"],
                ["The outcome", "Enterprise Placement Pipelines"],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#020305] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
