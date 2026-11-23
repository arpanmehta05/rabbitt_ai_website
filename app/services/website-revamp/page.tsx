import Navbar from "@/components/home/Navbar";
import CtaSection from "@/components/home/CtaSection";
import SplitStage from "@/components/home/SplitStage";
import Footer from "@/components/home/MainFooter";
import RevampHero from "@/components/revamp/RevampHero";
import MadeFor from "@/components/revamp/MadeFor";
import { Checks, Problems, Process } from "@/components/revamp/RevampSections";
import Intro from "@/components/revamp/Intro";

export const metadata = {
  title: "Website Revamp Services | Rabbitt AI & Icypluto",
  description:
    "Transform your digital presence with modern, high-converting web experiences built for the AI era. Rabbitt audits every page, flags what costs you visitors, and rebuilds it.",
};

// The Website Revamp page, from the Figma "Website Revamp" frames: a dark page drawn as a boxed
// sheet (1px hairlines, a 12px margin), the hero's audit drawing, then problems, a statement, the
// four steps, six checks, who it is made for, and the same closing block and footer as the landing
// page. Every section has its own layout on purpose. Server Components except the hero and the
// accordion.
export default function WebsiteRevampPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-[#05060a]"
      >
        Skip to content
      </a>
      <Navbar theme="dark" />
      <main id="main" className="dark bg-page pt-16 selection:bg-blue-600 selection:text-white">
        <RevampHero />
        <div className="bg-page">
          <Intro />
          <Problems />
          <Process />
          <Checks />
          <MadeFor />
        </div>
        <div className="mt-12">
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
