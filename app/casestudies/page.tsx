import type { Metadata } from "next";
import { fetchCaseStudies } from "@/lib/cms";
import { categoriesOf, toListing } from "@/lib/listing";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import CaseIndex from "@/components/listing/CaseIndex";
import SplitStage from "@/components/home/SplitStage";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Case Studies — Rabbitt AI",
  description:
    "Explore how leading engineering and enterprise teams partner with Rabbitt AI to automate operations, fine-tune models, and deploy reliable AI solutions at scale.",
};

// The case study index, from the Figma "Case studies – Desktop 1440" and "– Mobile 390": a headline,
// filters, one story large with its number, the others in a grid, then the landing page's closing
// block (the same CtaSection on the globe stage).
export default async function CaseStudiesPage() {
  const items = (await fetchCaseStudies()).map((s) => toListing(s, "/casestudies"));
  const categories = categoriesOf(items);

  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark min-h-screen bg-page text-white selection:bg-blue-600 selection:text-white">
        <header className="rb-container pb-10 pt-28 lg:pb-12 lg:pt-40">
          <h1 className="max-w-[16ch] text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.04em]">
            What teams built with Rabbitt AI
          </h1>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-white/60 lg:mt-6 lg:text-[18px]">
            Real projects, real numbers. How enterprises run private AI on their own data.
          </p>
        </header>

        <div className="rb-container pb-12 lg:pb-16">
          <div className="border-t border-white/[0.08] pt-8">
            <CaseIndex items={items} categories={categories} />
          </div>
        </div>

        {/* the landing page's closing block */}
        <div className="rb-container" aria-hidden>
          <div className="h-px bg-gradient-to-r from-transparent via-brand-text/45 to-transparent" />
        </div>
        <SplitStage>
          <CtaSection />
        </SplitStage>
      </main>
      <Footer />
    </>
  );
}
