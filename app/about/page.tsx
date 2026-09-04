import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowUpRight,
  Database,
  Network,
  Sparkles,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import JarvisHologram from "@/components/JarvisHologram";

export const metadata: Metadata = {
  title: "About Rabbitt AI | Enterprise intelligence, on your terms",
  description:
    "Rabbitt AI helps enterprises create dependable AI systems around their private data, domain knowledge, and operational reality.",
};

const operatingPrinciples = [
  {
    number: "01",
    title: "Your intelligence stays yours.",
    copy: "Your data, model weights, and hard-won domain knowledge remain under your control—across every deployment and every decision.",
  },
  {
    number: "02",
    title: "Specialisation beats scale for real work.",
    copy: "We shape systems around the language, workflow, and standards that make your organisation distinctive—not a generic benchmark.",
  },
  {
    number: "03",
    title: "Trust is part of the architecture.",
    copy: "Governance, isolation, access controls, and observability are designed in from the first conversation, not added at the end.",
  },
];

const milestones = [
  ["2023", "Founded in London", "A focused team with a clear belief: enterprises should own the intelligence they create."],
  ["2024", "Platform & partnerships", "ChanceRAG launches and the team expands its research and delivery footprint."],
  ["Today", "Built for enterprise work", "Rabbitt AI supports organisations across education, healthcare, customer operations, and finance."],
];

const trustItems = [
  "Private VPC and air-gapped deployment options",
  "Role-based access controls and auditability",
  "Encrypted data handling in transit and at rest",
  "No third-party training on your enterprise data",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#02050b] text-white selection:bg-sky-300 selection:text-slate-950">
      <SiteNavigation />

      <section className="relative isolate border-b border-white/[0.09]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#02050b]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] -z-10"
          style={{
            background: "linear-gradient(180deg, rgba(14, 165, 233, 0.09) 0%, rgba(37, 99, 235, 0.03) 55%, transparent 100%)",
            maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-14 pt-20 sm:px-10 sm:pb-16 sm:pt-24 lg:grid-cols-2 lg:gap-10 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-white sm:text-7xl lg:text-[5.4rem]">
              Intelligence should feel like <span className="text-sky-300">your own.</span>
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
              We partner with ambitious organisations to turn proprietary data into dependable AI systems—built around their people, knowledge, and standards.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition hover:bg-slate-100"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-sky-300/70 hover:bg-white/[0.05]"
              >
                Explore our products
              </Link>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center">
            <JarvisHologram />
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.09] bg-[#07111f] px-6 py-7 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            ["London", "Headquartered"],
            ["70+", "Enterprise engagements"],
            ["500+", "AI specialists network"],
            ["Global", "Delivery footprint"],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-3 first:pl-0 last:pr-0 sm:px-7">
              <p className="text-xl font-semibold tracking-[-0.04em] text-white sm:text-2xl">{value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.09] bg-[#050b16] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <h2 className="max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">The best AI should make your organisation more itself.</h2>
            </div>
            <div className="max-w-2xl pt-1">
              <p className="text-xl leading-8 text-slate-300 sm:text-2xl sm:leading-9">Generic models can answer questions. They cannot inherit your context, responsibilities, or ambition. That is the gap Rabbitt AI was created to close.</p>
              <p className="mt-6 text-base leading-7 text-slate-400">We bring research, product engineering, and enterprise delivery together to create systems that are practical from day one—and valuable long after the first prototype.</p>
            </div>
          </div>

          <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
            {operatingPrinciples.map((principle) => (
              <article key={principle.number} className="grid gap-5 py-8 sm:grid-cols-[72px_1fr_1fr] sm:gap-8 sm:py-10">
                <p className="font-mono text-xs font-medium text-sky-400">{principle.number}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{principle.title}</h3>
                <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">{principle.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#02050b] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="pointer-events-none absolute right-[-12rem] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-sky-500/[0.11] blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl">A different operating model for enterprise AI.</h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">We do not sell access to a black box. We help teams establish an enduring capability: one that is secure, adaptable, and measurably useful.</p>
            <Link href="/products" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-white">
              See the Rabbitt AI platform <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              [Database, "Own the substrate", "Private data, models, and deployments are designed around your control boundary."],
              [Network, "Connect the context", "Make knowledge useful across the workflows where decisions actually happen."],
              [Sparkles, "Keep improving", "A practical foundation for evaluation, adaptation, and responsible scale."],
            ].map(([Icon, title, copy]) => {
              const FeatureIcon = Icon as typeof Database;
              return (
                <div key={title as string} className="rounded-2xl border border-white/[0.11] bg-white/[0.035] p-6 transition hover:border-sky-300/40 hover:bg-white/[0.055] sm:p-7">
                  <FeatureIcon className="h-5 w-5 text-sky-300" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{copy as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.09] bg-[#02050b] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="max-w-md text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">London roots.<br />Global perspective.</h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">Rabbitt AI was founded by Harneet Singh with the conviction that enterprise AI must be useful enough to trust and accountable enough to own. Today, we work with a global network of researchers, data specialists, and engineers to make that conviction real.</p>
          </div>
          <div className="mt-16 grid gap-0 border-t border-white/10 md:grid-cols-3">
            {milestones.map(([date, title, copy]) => (
              <article key={date} className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:border-white/10 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="font-mono text-sm font-semibold text-sky-400">{date}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.09] bg-[#050b16] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl shadow-slate-900/10">
              <Image src="/assets/harneetsingh.png" alt="Harneet Singh, Founder and Chief AI Officer of Rabbitt AI" fill className="object-cover object-center" sizes="(min-width: 1024px) 360px, 80vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-7 pt-20 text-white">
                <p className="text-lg font-semibold">Harneet Singh</p>
                <p className="mt-1 text-sm text-slate-200">Founder &amp; Chief AI Officer</p>
              </div>
            </div>
          </div>
          <div className="self-center">
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">Technical ambition, grounded in the work.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">An IIT Delhi alumnus and serial entrepreneur, Harneet has built and scaled technology companies across global markets. At Rabbitt AI, he leads the company’s strategy, research direction, and enterprise model architecture.</p>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-sm font-medium text-slate-300">
              <span>Europe Top 100 AI Leader</span><span>Author, AI NAMA</span><span>IIT Delhi</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.09] bg-[#07111f] px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl">Security is a product decision.</h2>
          </div>
          <div className="self-end">
            <p className="max-w-xl text-lg leading-8 text-slate-300">Enterprise confidence comes from clear boundaries. Every Rabbitt AI engagement begins with the environment, controls, and operating model required for the work at hand.</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta />

      <SiteFooter />
    </main>
  );
}
