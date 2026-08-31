import type { Metadata } from "next";
import { fetchCaseStudies } from "@/lib/cms";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import ContentFilter from "@/components/ContentFilter";

export const metadata: Metadata = {
  title: "Case Studies — Rabbitt AI",
  description:
    "Real enterprise AI transformations — how Rabbitt AI helps organizations go from data to deployed solutions.",
};

export default async function CaseStudiesPage() {
  const studies = await fetchCaseStudies();
  const categories = [...new Set(studies.map((s) => s.about).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(14,165,233,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="border-b border-white/[0.07] pb-12 pt-36 sm:pt-44">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-400">
              Case Studies
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Real results,{" "}
              <span className="text-slate-400">real scale.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              A look at how enterprises are using Rabbitt AI to accelerate annotation operations, ship production models, and solve hard data problems.
            </p>
          </div>
        </header>

        {/* Filter + Grid */}
        <section className="py-16">
          <ContentFilter
            items={studies}
            categories={categories}
            hrefPrefix="/casestudies"
          />
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
