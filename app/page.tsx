import Navbar from "@/components/home/Navbar";
import HeroPull from "@/components/home/hero-options/HeroPull";
import CompaniesStrip from "@/components/home/CompaniesStrip";
import ShowreelCard from "@/components/home/ShowreelCard";
import ServicesIndex from "@/components/home/ServicesIndex";
import FeatureCard from "@/components/home/FeatureCard";
import ScrollHero from "@/components/home/ScrollHero";
import SplitStage from "@/components/home/SplitStage";
import CaseShowcase from "@/components/home/CaseShowcase";
import Founder from "@/components/home/Founder";
import Faq from "@/components/home/Faq";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/MainFooter";

export const metadata = {
  title: "Rabbitt AI — Own Your Data. Own Your AI.",
  description:
    "Next-generation enterprise sovereign AI. Orchestrate autonomous agents and fine-tune private foundation models.",
};

// A dark website (design.md §4): every section is on the one background #000000, and there is no
// intro screen (the first screen has its own animation). The navbar follows the section it is over.
// There is no colour button on the page.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[#05060a]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="bg-page selection:bg-blue-600 selection:text-white">
        {/* the first screen, the logos right under it, products, services, then the showreel card that grows
            to the whole screen as it scrolls in (the same card as AINama's numbers) */}
        <div data-nav-theme="dark" className="dark bg-page">
          <HeroPull />
          <CompaniesStrip />
          <FeatureCard />
          <ServicesIndex />
          <ShowreelCard />
        </div>
        {/* the case studies: three customer stories in tabs (placeholder content until the team supplies it) */}
        <div data-nav-theme="dark" className="dark bg-page">
          <CaseShowcase />
        </div>
        {/* the scroll scene, on the same dark page */}
        <div data-nav-theme="dark" className="dark bg-page">
          <ScrollHero />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          <Faq />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          <Founder />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          {/* a hairline of light, then some room, between the numbers and the closing block */}
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
