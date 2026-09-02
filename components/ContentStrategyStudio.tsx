import Image from "next/image";
import Link from "next/link";

const disciplines = [
  {
    number: "01",
    title: "Topic Clusters & Pillars",
    note: "Semantic keyword mapping, pillar-cluster graphs & high-authority domain dominance.",
    tone: "border-t-sky-400",
    tags: ["Search Intent", "Topic Hubs", "Semantic Graphs"],
  },
  {
    number: "02",
    title: "Multi-Channel Distribution",
    note: "Omnichannel repurposing across search, LinkedIn, executive newsletters & social.",
    tone: "border-t-blue-500",
    tags: ["Distribution Engine", "Audience Channels", "Syndication"],
  },
  {
    number: "03",
    title: "Audience & Intent Intel",
    note: "Competitor gap analysis, buyer search triggers, and voice-of-customer synthesis.",
    tone: "border-t-sky-300",
    tags: ["Competitor Gaps", "Buyer Journey", "Intent Modeling"],
  },
  {
    number: "04",
    title: "Editorial Governance & AI",
    note: "Brand voice playbooks, quality calibration, and AI-augmented editorial scaling.",
    tone: "border-t-blue-400",
    tags: ["Voice Guidelines", "Review Rubrics", "AI Workflow"],
  },
];

const process = [
  {
    step: "01",
    title: "Search landscape audit & gap analysis",
    description:
      "We analyze domain authority, competitor content gaps, high-intent search queries, and audience conversion opportunities.",
  },
  {
    step: "02",
    title: "Pillar & topic cluster architecture",
    description:
      "We design interconnected pillar hubs, sub-clusters, internal link webs, and target keyword difficulty tiers.",
  },
  {
    step: "03",
    title: "Production roadmap & editorial playbook",
    description:
      "We establish editorial calendars, multi-tier QA rubrics, author assignments, and brand voice guidelines.",
  },
  {
    step: "04",
    title: "Attribution & continuous optimization",
    description:
      "We monitor ranking velocity, organic conversion funnels, reader engagement, and conduct regular refresh sprints.",
  },
];

export default function ContentStrategyStudio() {
  return (
    <>
      {/* ── STRATEGY SUITE DISCIPLINES ──────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="lg:pb-5">
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
                Strategy that drives revenue, not just vanity metrics.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                Random publishing produces random results. We construct an engineered editorial architecture that positions your brand at the center of every critical buying conversation.
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

      {/* ── VISUAL TOPIC CLUSTERS SHOWCASE ──────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b14] p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Semantic topic clusters & search intent pathways.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Modern search algorithms and AI answer engines reward topical depth over isolated articles. We build semantic hub-and-spoke networks that establish complete category dominance.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>High-intent buyer keyword mapping across awareness to conversion</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Optimized for traditional Google Search & Generative AI engines</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span>Measurable organic traffic growth and pipeline attribution</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contactus"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
                >
                  Request a Strategic Content Audit
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/[0.12] bg-[#020305] lg:col-span-7">
              <Image
                src="/assets/content-strategy-desk.jpg"
                alt="Content Strategy and Editorial Topic Intelligence Workspace"
                width={1280}
                height={720}
                className="block h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px] text-slate-300">
                <span className="rounded bg-black/80 px-2.5 py-1 backdrop-blur border border-white/10 text-blue-300">
                  EDITORIAL COMMAND HUB
                </span>
                <span className="rounded bg-blue-600/30 px-2.5 py-1 text-blue-200 border border-blue-500/40 font-semibold">
                  AUDIENCE RETENTION
                </span>
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
              Market authority is built on consistent strategic clarity.
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

      {/* ── 1 THESIS TO OMNICHANNEL ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-24">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                Start with one core thesis. Command every relevant channel.
              </h2>
            </div>
            <Link
              href="/contactus"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Discuss your content strategy brief{" "}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>

          <div className="border-l border-white/[0.15] pl-6 sm:pl-10">
            <p className="font-serif text-2xl leading-[1.36] tracking-[-0.025em] sm:text-[2rem]">
              “A great content strategy doesn&apos;t just produce more words. It builds an enduring intellectual footprint that attracts, educates, and closes high-intent buyers on autopilot.”
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/[0.15] sm:grid-cols-3">
              {[
                ["The thesis", "Industry Benchmark Report"],
                ["The reach", "Search-Optimized Pillar Series"],
                ["The signal", "Executive Thought Leadership"],
                ["The nurture", "Targeted Email Newsletter"],
                ["The action", "Solution Comparison Pages"],
                ["The enablement", "Sales Deck & Case Studies"],
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
