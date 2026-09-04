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
    desc: "Cut through vendor hype. Understand realistic timelines, ROI modeling, and team upskilling required to deploy production GenAI safely.",
    tag: "Strategic",
  },
  {
    role: "Founders & Builders",
    desc: "Learn hard-won architectural patterns, fine-tuning lessons, and infrastructure choices from startups shipping at the cutting edge.",
    tag: "Execution",
  },
  {
    role: "Policy Makers & Regulators",
    desc: "Insights into data sovereignty, compliance standards, and sovereign AI strategies from international advisory engagements.",
    tag: "Governance",
  },
  {
    role: "AI Engineers & Enthusiasts",
    desc: "Detailed technical breakdowns of RAG pipelines, data curation methodologies, and evaluation loops implemented at enterprise scale.",
    tag: "Technical",
  },
  {
    role: "For The World",
    desc: "A universal guide democratizing AI knowledge for anyone curious about how intelligent systems are reshaping human industry.",
    tag: "Global",
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

      {/* Top Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 -top-[240px] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-sky-500/[0.07] blur-[150px]" />
        <div className="absolute left-1/2 -top-[100px] h-[350px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/[0.05] blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-12 sm:px-10 sm:pt-24 sm:pb-16 lg:px-16">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
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

          {/* Book Image — fixed height, no tall gap */}
          <div className="relative flex items-start justify-center lg:col-span-5 lg:justify-end">
            <div className="relative h-[460px] w-full max-w-[400px] sm:h-[560px] sm:max-w-[480px] lg:h-[640px] lg:max-w-[540px]">
              <Image
                src="/assets/ainama.png"
                alt="AINama By Rabbitt.AI Book Cover"
                fill
                sizes="(max-width: 768px) 400px, (max-width: 1200px) 480px, 540px"
                className="object-contain object-top drop-shadow-[0_30px_70px_rgba(0,0,0,0.92)] transition-transform duration-500 hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This Book Stats Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
        <div className="border-t border-white/[0.08] pt-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Quantifiable Impact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Why This Book?
            </h2>
            <p className="mt-3 text-base text-slate-400">
              Real data from the trenches. No generic prompts, no hand-waving theories — just vetted engineering reality.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060d1a] p-6 transition-all hover:border-sky-500/30 hover:bg-[#091224]"
              >
                <div className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-sky-300">
                  {stat.label}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This Book For Section */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
            Target Audience
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Who Is This Book For?
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Engineered for practitioners, architects, and decision makers charged with delivering business results from GenAI.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.role}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#060b13] p-7 transition-all hover:border-white/[0.18] hover:bg-[#09101d]"
            >
              <div>
                <span className="inline-block rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white transition-colors group-hover:text-sky-300">
                  {item.role}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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
