import type { Metadata } from "next";
import { fetchCaseStudies } from "@/lib/cms";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import ContactCta from "@/components/ContactCta";
import CaseStudiesDirectory from "@/components/CaseStudiesDirectory";

export const metadata: Metadata = {
  title: "Case Studies — Rabbitt AI",
  description:
    "Explore how leading engineering and enterprise teams partner with Rabbitt AI to automate operations, fine-tune models, and deploy reliable AI solutions at scale.",
};

export default async function CaseStudiesPage() {
  const studies = await fetchCaseStudies();
  const categories = [...new Set(studies.map((s) => s.about).filter(Boolean))];

  return (
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-24">
        {/* Editorial Header */}
        <header className="border-b border-white/[0.08] pb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-sky-400">
                Production Case Studies
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl leading-[1.08]">
                Real results.{" "}
                <span className="text-slate-400 font-light">Production scale.</span>
              </h1>
            </div>
            <p className="max-w-md text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
              Explore how enterprises partner with Rabbitt AI to eliminate hallucinations, label complex data, and deploy high-accuracy AI systems.
            </p>
          </div>
        </header>

        {/* Directory Section */}
        <section className="pt-10">
          <CaseStudiesDirectory studies={studies} categories={categories} />
        </section>
      </div>

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
