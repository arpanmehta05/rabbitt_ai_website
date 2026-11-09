import Navbar from "@/components/home/Navbar";
import HeroPull from "@/components/home/hero-options/HeroPull";
import CompaniesStrip from "@/components/home/CompaniesStrip";
import ProductsIndex from "@/components/home/ProductsIndex";
import Services from "@/components/home/Services";
import ScrollHero from "@/components/home/ScrollHero";
import Backbone from "@/components/home/Backbone";
import SplitStage from "@/components/home/SplitStage";
import CaseStudies from "@/components/home/CaseStudies";
import WhereItRuns from "@/components/home/WhereItRuns";
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
        {/* the first screen, the logos that land right under it, the products and the services, on the dark page */}
        <div data-nav-theme="dark" className="dark bg-page">
          <HeroPull />
          <CompaniesStrip />
          <ProductsIndex />
          <Services />
        </div>
        {/* the statement scene, on the same dark page */}
        <div data-nav-theme="dark" className="dark bg-page">
          <ScrollHero />
        </div>
        <Backbone />
        <div data-nav-theme="dark" className="dark bg-page">
          <WhereItRuns />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          <CaseStudies />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          <Founder />
        </div>
        <div data-nav-theme="dark" className="dark bg-page">
          <Faq />
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
