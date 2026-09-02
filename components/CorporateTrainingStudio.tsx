import Link from "next/link";

const disciplines = [
  {
    number: "01",
    title: "Engineering & LLM Systems",
    note: "Production RAG, fine-tuning, latency optimization, vector search & autonomous agent loops.",
    tone: "border-t-sky-400",
    tags: ["LLM Architecture", "Enterprise RAG", "Model Tuning"],
  },
  {
    number: "02",
    title: "Product & AI Solution Design",
    note: "Feasibility modeling, generative UX patterns, prompt design & high-impact AI product roadmaps.",
    tone: "border-t-blue-500",
    tags: ["AI Product Strategy", "Prompt Engineering", "ROI Validation"],
  },
  {
    number: "03",
    title: "Leadership & AI Governance",
    note: "Executive AI strategy, data privacy (GDPR/SOC2), copyright compliance & risk mitigation.",
    tone: "border-t-sky-300",
    tags: ["Executive Strategy", "Data Governance", "Risk & Security"],
  },
  {
    number: "04",
    title: "Cross-Functional Automation",
    note: "Empowering marketing, sales, legal & finance teams with tailored AI productivity workflows.",
    tone: "border-t-blue-400",
    tags: ["Workflow Automation", "Sales & Marketing AI", "Productivity"],
  },
];

const process = [
  {
    step: "01",
    title: "Skills gap & organizational workflow audit",
    description:
      "We evaluate team capabilities, internal bottlenecks, legacy tools, and target operational ROI goals.",
  },
  {
    step: "02",
    title: "Custom curriculum & secure sandbox design",
    description:
      "We design custom modules aligned to your proprietary tech stack, data compliance policies, and security guardrails.",
  },
  {
    step: "03",
    title: "Cohort masterclasses & live build sprints",
    description:
      "Senior AI engineers deliver hands-on, live-coding sessions solving real enterprise use cases with internal data.",
  },
  {
    step: "04",
    title: "Post-training governance & production handover",
    description:
      "Teams receive deployment playbooks, reusable code repositories, internal AI champion playbooks, and ongoing advisory.",
  },
];

const enterpriseTracks = [
  {
    track: "01",
    role: "Technical Teams & Architects",
    focus: "Production LLM Engineering & Agentic Pipelines",
    format: "Hands-on Code Labs & Architecture Reviews",
  },
  {
    track: "02",
    role: "Product Managers & Tech Leads",
    focus: "AI Feasibility, UX Patterns & Roadmap Design",
    format: "Solution Discovery & Prototype Sprints",
  },
  {
    track: "03",
    role: "Executive Leadership & C-Suite",
    focus: "Enterprise Strategy, Governance & ROI Delivery",
    format: "Strategic Masterclasses & Policy Playbooks",
  },
  {
    track: "04",
    role: "Business & Operations Teams",
    focus: "Workflow Automation & Generative Productivity",
    format: "Interactive Tool Labs & Prompt Workflows",
  },
];

export default function CorporateTrainingStudio() {
  return (
    <>
      {/* ── ENTERPRISE TRAINING DISCIPLINES ─────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="lg:pb-5">
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
                Upskilling designed for production, not theory.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                Generic webinars don&apos;t move the needle. We deliver immersive, engineer-led training tailored to your company&apos;s proprietary architecture, security protocols, and business KPIs.
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

      {/* ── ENTERPRISE TRACKS & LAB SHOWCASE ────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14] p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Secure sandboxes & role-specific learning paths.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Whether training senior cloud architects or non-technical business operators, our training occurs in zero-data-leakage enterprise sandboxes equipped with your internal guidelines.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>SOC2-compliant, zero-data-retention training environments</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Custom use-case sprints built around your internal codebase</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Ongoing advisory, architectural review & post-training QA</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contactus"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
                >
                  Schedule Corporate Training Consultation
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
                    Enterprise Capability Matrix
                  </span>
                  <h4 className="text-base font-semibold text-white">
                    Multi-Tier Organizational AI Enablement
                  </h4>
                </div>
                <span className="rounded bg-blue-600/30 px-2.5 py-1 text-blue-200 font-mono text-[11px] border border-blue-500/40">
                  Custom Cohorts
                </span>
              </div>

              <div className="space-y-3">
                {enterpriseTracks.map((tr) => (
                  <div
                    key={tr.track}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-sky-400">
                          {tr.track}
                        </span>
                        <h5 className="text-sm font-medium text-white">
                          {tr.role}
                        </h5>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 shrink-0">
                        {tr.format}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 pl-6">
                      {tr.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STRATEGIC METHOD ────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="flex flex-col justify-between gap-7 border-b border-white/[0.12] pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              From foundational understanding to production delivery.
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

      {/* ── ENTERPRISE IMPACT FRAMEWORK ─────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-24">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                Build internal capabilities that compound over time.
              </h2>
            </div>
            <Link
              href="/contactus"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Inquire about enterprise cohort availability{" "}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>

          <div className="border-l border-white/[0.15] pl-6 sm:pl-10">
            <p className="font-serif text-2xl leading-[1.36] tracking-[-0.025em] sm:text-[2rem]">
              “The most successful AI-driven enterprises don&apos;t outsource their core intelligence. They systematically upskill their engineers and leaders to build proprietary competitive advantage.”
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/[0.15] sm:grid-cols-3">
              {[
                ["The strategy", "Executive AI Roadmaps"],
                ["The engineering", "Production RAG & Agents"],
                ["The product", "Feasibility & AI UX"],
                ["The operations", "Automated Workflows"],
                ["The security", "SOC2 & Private Data Safety"],
                ["The ROI", "Measurable Speed & Scale"],
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
