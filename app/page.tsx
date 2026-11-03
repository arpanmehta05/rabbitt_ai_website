import Intro from "@/components/home/Intro";
import Navbar from "@/components/home/Navbar";
import HeroIntro from "@/components/home/HeroIntro";
import CompaniesStrip from "@/components/home/CompaniesStrip";
import ProductsIndex from "@/components/home/ProductsIndex";
import ScrollHero from "@/components/home/ScrollHero";
import Backbone from "@/components/home/Backbone";
import SplitStage from "@/components/home/SplitStage";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/MainFooter";

export const metadata = {
  title: "Rabbitt AI — Own Your Data. Own Your AI.",
  description:
    "Next-generation enterprise sovereign AI. Orchestrate autonomous agents and fine-tune private foundation models.",
};

// A dark website (design.md §4): every section is on the one background #060d26. The only light
// thing is the intro screen that plays first. The navbar follows the section it is over. There is no
// colour button on the page.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[#05060a]"
      >
        Skip to content
      </a>
      <Intro />
      <Navbar />
      <main id="main" className="bg-page selection:bg-blue-600 selection:text-white">
        {/* the first screen, the logos that land right under it, and the products, on the dark page */}
        <div data-nav-theme="dark" className="dark bg-page">
          <HeroIntro />
          <CompaniesStrip />
          <ProductsIndex />
        </div>
        {/* the statement scene, on the same dark page */}
        <div data-nav-theme="dark" className="dark bg-page">
          <ScrollHero />
        </div>
        <Backbone />
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
