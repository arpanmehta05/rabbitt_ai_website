import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import SplitStage from "@/components/home/SplitStage";
import Products from "@/components/home/Products";
import Companies from "@/components/home/Companies";
import CtaSection from "@/components/home/CtaSection";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Rabbitt AI — Own Your Data. Own Your AI.",
  description:
    "Next-generation enterprise sovereign AI. Orchestrate autonomous agents and fine-tune private foundation models.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-[#0a1228] selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      {/* products: a full-width index, its own section */}
      <Products />
      {/* companies and the CTA: content scrolls on the left, a globe stays pinned on the right */}
      <SplitStage>
        <Companies />
        <CtaSection />
      </SplitStage>
      <Footer />
    </main>
  );
}
