import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import ContactCta from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "AINama By Rabbitt.AI — 15 Real-World GenAI Case Studies",
  description:
    "A comprehensive collection of 15 case studies across diverse sectors by Harneet Singh, Chief AI Officer of Rabbitt AI. Strategies from BigTech, GenAI startups, IT consulting, consumer businesses, and government.",
};

const sectors = [
  "Leading BigTech and Model Provider companies",
  "Disruptive Gen AI startups",
  "Prominent IT Consulting firms",
  "Dynamic Consumer and Retail businesses",
  "Esteemed Academic and Government institutions",
];

const stats = [
  { value: "15", label: "Industry Experts", desc: "Global leaders across enterprise AI" },
  { value: "15", label: "Case Studies", desc: "Production deployments and architectures" },
  { value: "15", label: "Industries", desc: "Covering tech, finance, health & public sector" },
  { value: "5", label: "Continents", desc: "Global perspective on AI transformation" },
  { value: "1", label: "Definitive Book", desc: "Everything you need to lead in GenAI" },
];

const audiences = [
  {
    role: "CXOs & Enterprise Leaders",
    tag: "Strategic",
    tagline: "ROI modeling, realistic timelines & enterprise safety.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    role: "Founders & Builders",
    tag: "Execution",
    tagline: "Production blueprints, fine-tuning & infrastructure economics.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    role: "Policy Makers & Regulators",
    tag: "Governance",
    tagline: "Data sovereignty, sovereign AI & regulatory standards.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    role: "AI Engineers & Enthusiasts",
    tag: "Technical",
    tagline: "Hybrid RAG pipelines, automated evals & agent architectures.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    role: "For The World",
    tag: "Global",
    tagline: "Democratizing how intelligent systems reshape industry.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const gains = [
  {
    title: "Production Blueprints",
    desc: "Move past toy demos. Discover the actual data pipelines, evaluation benchmarks, and fine-tuning architectures used in high-stakes environments.",
    icon: (
      <svg className="h-6 w-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    title: "Real Economic ROI",
    desc: "Uncover how leading organizations calculate TCO, manage GPU inference budgets, and turn generative models into tangible revenue drivers.",
    icon: (
      <svg className="h-6 w-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Risk & Governance",
    desc: "Practical frameworks for IP protection, hallucinations mitigation, and private data fencing before enterprise deployment.",
    icon: (
      <svg className="h-6 w-6 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function AiNamaPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Top Ambient Smooth Glow - orthogonal linear wash with zero circular flower banding */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[550px]"
        style={{
          background: "linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(37, 99, 235, 0.03) 55%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-16 pb-8 sm:px-10 sm:pt-20 sm:pb-10 lg:px-16 lg:pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 pt-2 sm:pt-4">
            {/* Headline */}
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.75rem]">
              AINama By{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Rabbitt.AI
              </span>
            </h1>

            {/* Lead copy */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              A comprehensive collection of 15 case studies, carefully curated from diverse sectors. The definitive field guide to real-world GenAI strategies and enterprise innovations from:
            </p>

            {/* Sector list */}
            <ul className="mt-5 space-y-2.5">
              {sectors.map((sector) => (
                <li key={sector} className="flex items-center gap-3 text-sm text-slate-300 sm:text-base">
                  <span className="text-base font-light leading-none text-sky-400" aria-hidden="true">
                    ›
                  </span>
                  <span>{sector}</span>
                </li>
              ))}
            </ul>

            {/* CTA Row — modern pill style */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_8px_40px_rgba(255,255,255,0.14)]"
              >
                <span>Request Your Copy</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Speak with Solutions Team
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">→</span>
              </Link>
            </div>
          </div>

          {/* Book Image */}
          <div className="relative flex items-center justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px]">
              <Image
                src="/assets/ainama.png"
                alt="AINama By Rabbitt.AI Book Cover"
                width={1500}
                height={1383}
                sizes="(max-width: 768px) 360px, (max-width: 1200px) 420px, 480px"
                className="h-auto w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.88)] transition-transform duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This Book Stats Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 pb-16 sm:px-10 lg:px-16">
        <div className="border-t border-white/[0.08] pt-12 sm:pt-16">
          {/* Section Header — Balanced editorial two-column layout */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-400">
                Quantifiable Impact
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Why this book?
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-slate-400">
              Real data from the trenches. No generic prompts, no hand-waving theories — just vetted engineering reality distilled from production deployments.
            </p>
          </div>

          {/* Unified Metrics Bar — Clean, authoritative editorial layout without boxy cards */}
          <div className="mt-12 sm:mt-16 border-y border-white/[0.08] py-10 lg:py-12">
            <div className="grid grid-cols-2 gap-y-10 gap-x-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`group flex flex-col lg:px-8 first:lg:pl-0 last:lg:pr-0 ${
                    idx === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="h-[96px] sm:h-[110px] lg:h-[120px] flex flex-col justify-between">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-slate-300">
                      0{idx + 1}
                    </span>
                    <div className="font-sans text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl leading-none">
                      {stat.value}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-4">
                    <h3 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                      {stat.label}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-[0.82rem]">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Is This Book For Section — Minimalist Architectural Split Layout */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 border-t border-white/[0.08]">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-400">
              Target Audience
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Who is this book for?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Tailored chapters written for five distinct perspectives driving the modern AI economy.
            </p>

            <div className="mt-6 text-xs font-mono uppercase tracking-wider text-slate-400">
              5 Focused Reading Tracks
            </div>
          </div>

          {/* Right Column: 5 Minimal, Sleek Roster Rows */}
          <div className="lg:col-span-7 divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-[#050813]/70 overflow-hidden">
            {audiences.map((item) => (
              <div
                key={item.role}
                className="group flex items-center justify-between gap-4 p-5 sm:px-7 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.02] text-sky-400 transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-sky-300">
                        {item.role}
                      </h3>
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-slate-400 border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Will You Gain Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#081224] to-[#040811] p-8 sm:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Core Takeaways
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              What Will You Gain?
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              &ldquo;The book aims to clear the air around the Gen AI world with Real and Powerful Use Cases from Real and Powerful Industry Experts and is an attempt to add real value to businesses and leaders.&rdquo;
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {gains.map((gain) => (
              <div
                key={gain.title}
                className="rounded-2xl border border-white/[0.08] bg-black/40 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-[#111a2b]">
                  {gain.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {gain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {gain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About The Author Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
        <div className="border-t border-white/[0.08] pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Author Portrait */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl border border-white/[0.14] bg-[#060b13] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                <Image
                  src="/assets/harneetsingh.png"
                  alt="Mr. Harneet Singh, Chief AI Officer of Rabbitt AI"
                  fill
                  sizes="(max-width: 1024px) 380px, 420px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Author Biography */}
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                About The Author
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Mr. Harneet Singh
              </h2>
              <p className="mt-2 text-base font-medium text-sky-400">
                Chief AI Officer, Rabbitt AI (London) · Founder &amp; Serial Entrepreneur
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                <p>
                  This book is an initiative led by the Lion Founder, <strong className="font-semibold text-white">Mr. Harneet Singh</strong>, a <span className="text-sky-300">DRDO Medal of Honor</span> recipient, who was chosen among the <strong className="font-semibold text-white">World&apos;s Top 100 AI Leaders in Europe</strong> alongside the likes of the Google DeepMind CEO, Groq CTO, and Hugging Face co-founder.
                </p>
                <p>
                  Mr. Harneet Singh is an <span className="text-sky-300">IIT Delhi alumnus</span> with an extensive track record of building 5 companies from scratch and managing a P&amp;L of <strong>\$1 Billion+</strong>.
                </p>
                <p>
                  He is an active member of the <strong>Forbes Business Council</strong> and <strong>CII</strong>, and has previously served as a specialized AI consultant with the <strong>South Korean Navy</strong>.
                </p>
              </div>

              {/* Badges strip */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "DRDO Medal of Honor",
                  "Top 100 AI Leaders in Europe",
                  "IIT Delhi Alumnus",
                  "Forbes Business Council",
                  "$1B+ P&L Managed",
                  "5x Founder",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact CTA */}
      <ContactCta />

      {/* Footer */}
      <SiteFooter />
    </main>
  );
}
