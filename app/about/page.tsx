import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";
import {
  Globe,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Own Your Data, Own Your AI | Rabbitt AI",
  description:
    "Founded in London by Harneet Singh and backed by TechCurators, NVIDIA, Meta, and Microsoft executives, Rabbitt AI helps enterprises build reliable, custom generative AI on their private data.",
};

const stats = [
  {
    value: "2023",
    label: "Founded in London",
    detail: "HQ in London, United Kingdom with global R&D",
  },
  {
    value: "$2.1M",
    label: "Seed Round Raised",
    detail: "Led by TechCurators with NVIDIA, Meta & Microsoft execs",
  },
  {
    value: "70+",
    label: "Enterprise Clients",
    detail: "Healthcare, education, customer service, and finance",
  },
  {
    value: "500+",
    label: "AI Specialists",
    detail: "Global delivery network across US, UK, UAE & India",
  },
];

const pillars = [
  {
    tag: "Data Sovereignty",
    title: "Full Data & IP Ownership",
    description:
      "Enterprises retain 100% control of their private datasets, training checkpoints, and model weights. Zero data leakage, zero third-party training on your proprietary data, and private VPC deployment.",
  },
  {
    tag: "Specialized Intelligence",
    title: "Domain-Specific Architecture",
    description:
      "Generic foundation models often hallucinate on enterprise workflows. Rabbitt AI builds hyper-specialized, efficient models fine-tuned to your business domain, delivering superior precision and ROI.",
  },
  {
    tag: "Open Foundations",
    title: "Open-Source Stance",
    description:
      "We champion open-source architectures including LLaMA, Mistral, Falcon, and Gemma. Custom fine-tuning on open foundations provides vendor independence, reduced inference cost, and low latency.",
  },
  {
    tag: "Enterprise Trust",
    title: "Security & Governance by Design",
    description:
      "Every solution is built with enterprise security controls: SSL encryption in transit and at rest, role-based access control (RBAC), GDPR compliance, and Indian IT Act conformity.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "Company Founded in London",
    description:
      "Rabbitt AI was established in London by Harneet Singh (IIT-Delhi alumnus and serial entrepreneur) with the core mission to help enterprises 'Own their Data and Own their AI'.",
  },
  {
    year: "July 2024",
    title: "Closed $2.1M Seed Funding",
    description:
      "Secured $2.1 million in seed capital led by TechCurators (TC Group), with participation from corporate executives at NVIDIA, Meta, and Microsoft to accelerate platform R&D.",
  },
  {
    year: "September 2024",
    title: "ChanceRAG Platform Launched",
    description:
      "Introduced ChanceRAG, a no-code document-retrieval platform for LLMs featuring hybrid BM25 and dense semantic fusion retrieval, achieving industry-leading retrieval precision.",
  },
  {
    year: "2025 – 2026",
    title: "Global Enterprise Scale",
    description:
      "Expanded enterprise deployment to over 70 organizations worldwide across education, healthcare, customer support, and financial operations.",
  },
];

const complianceBadges = [
  "SSL Encryption in Transit & Rest",
  "GDPR Compliant",
  "India IT Act Compliant",
  "Role-Based Access Control (RBAC)",
  "Private VPC & Air-Gapped Deployments",
  "Zero Third-Party Data Retention",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020305] text-white selection:bg-sky-500/30 selection:text-sky-200">
      <SiteNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(14,165,233,0.18),transparent_75%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl leading-[1.05]">
              Own Your Data. <br className="hidden sm:inline" />
              Own Your AI.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
              We tap into the full potential of your proprietary data to build reliable, custom generative AI solutions you can count on. Moving organizations from passive consumers of generic models to masters of their own intelligence.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contactus"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#020305] shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all hover:bg-slate-200"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:sales@rabbitt.ai"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-sky-400/40 hover:bg-white/[0.08]"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm"
              >
                <p className="font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-sky-300">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="relative border-t border-white/[0.08] bg-[#050b16] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Small is soothing. <br />
                Big is no longer beautiful.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                In the generative AI era, trillion-parameter generic models are often too expensive, too generic, and too unpredictable for core enterprise functions.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                At Rabbitt AI, our conviction is simple: enterprises should own their intelligence. By training domain-adapted models directly on proprietary data, organizations achieve higher accuracy, lower inference costs, and total intellectual property control.
              </p>

              <div className="mt-8 rounded-xl border border-sky-400/25 bg-sky-500/10 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-sky-300">
                  Core Mission
                </p>
                <p className="mt-1.5 text-sm font-medium text-white leading-relaxed">
                  &ldquo;To empower organizations to own their data and own their AI — shifting companies from passive users of third-party tools to creators of sovereign, defensible enterprise intelligence.&rdquo;
                </p>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.tag}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-sky-400/30"
                >
                  <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-sky-400">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History & Key Milestones */}
      <section className="relative border-t border-white/[0.08] bg-[#020305] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              From London roots to global enterprise impact.
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Key chapters in our journey building sovereign generative AI solutions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-sky-400/30"
              >
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-300">
                    Phase 0{idx + 1}
                  </span>
                  <p className="mt-2 font-mono text-2xl font-semibold text-white">
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="relative border-t border-white/[0.08] bg-[#050b16] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Built by AI pioneers and serial founders.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Founder Card */}
            <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/[0.12] bg-[#071328]">
                <Image
                  src="/assets/harneetsingh.png"
                  alt="Harneet Singh, Founder and CAIO of Rabbitt AI"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-sky-400">
                  Founder & Chief AI Officer
                </span>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-white">
                  Harneet Singh
                </h3>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  IIT-Delhi Alumnus · Serial Entrepreneur
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  An IIT-Delhi alumnus and serial entrepreneur, Harneet has founded multiple technology startups and scaled TechCurators to over $14M in global revenue. Recognized among Europe&apos;s Top 100 AI Leaders, he serves on the Generative AI Council in Amsterdam and authored the AI industry book &ldquo;AI NAMA&rdquo;. At Rabbitt AI, he leads strategy, R&D, and enterprise model architecture.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-300">
                    Europe Top 100 AI Leader
                  </span>
                  <span className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-300">
                    Author, AI NAMA
                  </span>
                  <span className="rounded border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-slate-300">
                    IIT Delhi
                  </span>
                </div>
              </div>
            </div>

            {/* Global Delivery & Backing */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-sky-400" />
                  <h4 className="text-base font-semibold text-white">
                    Backed by Tech Industry Leaders
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Rabbitt AI is backed by TechCurators (TC Group) alongside seasoned corporate executives from NVIDIA, Meta, and Microsoft, bringing world-class technical governance and deep enterprise scaling expertise.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-sky-400" />
                  <h4 className="text-base font-semibold text-white">
                    Global Delivery & R&D Network
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Through our strategic partnership with TechCurators, Rabbitt AI leverages an active network of 500+ AI researchers, data annotators, and ML systems engineers across the United States, United Kingdom, UAE, and India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy, Security & Compliance */}
      <section className="relative border-t border-white/[0.08] bg-[#020305] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Enterprise security is in our DNA.
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              We operate under strict data protection protocols ensuring client IP and customer records are isolated and protected.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {complianceBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-xs font-medium text-slate-200"
              >
                <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
