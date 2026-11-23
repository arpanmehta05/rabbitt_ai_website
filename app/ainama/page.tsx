import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import SplitStage from "@/components/home/SplitStage";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/MainFooter";
import AinamaHero from "@/components/ainama/AinamaHero";
import AinamaStats from "@/components/ainama/AinamaStats";
import BookParts from "@/components/ainama/BookParts";
import AuthorSection from "@/components/ainama/AuthorSection";

export const metadata: Metadata = {
  title: "AINama By Rabbitt.AI — 15 Real-World GenAI Case Studies",
  description:
    "A comprehensive collection of 15 case studies across diverse sectors by Harneet Singh, Chief AI Officer of Rabbitt AI. Strategies from BigTech, GenAI startups, IT consulting, consumer businesses, and government.",
};

// The AINama page, from the Figma "AINama – Desktop" and "– Mobile" frames: the dark site. The name of
// the book and the book in front of it; the four numbers in a card that grows to the whole screen as
// you scroll to it; the five reading tracks; the author; and the same closing block and footer as the
// rest of the site (the book is asked for through the contact page).
export default function AiNamaPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[#05060a]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="dark bg-page selection:bg-blue-600 selection:text-white">
        <div data-nav-theme="dark" className="bg-page">
          <AinamaHero />
        </div>
        <div data-nav-theme="dark" className="bg-page">
          <AinamaStats />
        </div>
        <div data-nav-theme="dark" className="bg-page">
          <BookParts />
        </div>
        <div data-nav-theme="dark" className="bg-page">
          <AuthorSection />
        </div>
        <div data-nav-theme="dark" className="bg-page">
          <div className="rb-container" aria-hidden>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-text/45 to-transparent" />
          </div>
          <SplitStage>
            <CtaSection />
          </SplitStage>
        </div>
      </main>
      <Footer />
    </>
  );
}
