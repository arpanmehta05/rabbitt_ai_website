import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import HeroA from "@/components/home/hero-options/HeroA";
import HeroB from "@/components/home/hero-options/HeroB";
import HeroC from "@/components/home/hero-options/HeroC";
import HeroG from "@/components/home/hero-options/HeroG";
import HeroH from "@/components/home/hero-options/HeroH";
import HeroLoop from "@/components/home/HeroLoop";
import HeroJ from "@/components/home/hero-options/HeroJ";
import HeroIntro from "@/components/home/HeroIntro";

// A review page, not part of the site: the hero options one under the other, so one can be chosen.
// It is kept out of search engines and out of the sitemap. Delete this folder and
// components/home/hero-options once a choice is made.
export const metadata: Metadata = {
  title: "Hero options",
  robots: { index: false, follow: false },
};

// one row per option, in letter order, with no gaps. The component files keep their old names
// (HeroG is option F, HeroH is G, HeroJ is I; option H is components/home/HeroLoop, the home page's hero); the letters below are the ones shown.
const options = [
  { id: "a", label: "Option A · Type-led", node: <HeroA /> },
  { id: "b", label: "Option B · Product on show", node: <HeroB /> },
  { id: "c", label: "Option C · The story as a scene", node: <HeroC /> },
  { id: "d", label: "Option D · The abstract object with labels", node: <HeroIntro visual="object" /> },
  { id: "e", label: "Option E · The glass rabbit", node: <HeroIntro visual="rabbit" /> },
  { id: "f", label: "Option F · Navy colour block, after Cloudflare", node: <HeroG /> },
  { id: "g", label: "Option G · Light beams, after Raycast", node: <HeroH /> },
  { id: "h", label: "Option H · The loop, after Prime Intellect (on the home page now)", node: <HeroLoop /> },
  { id: "i", label: "Option I · Trails and shapes, after Aiven", node: <HeroJ /> },
];

export default function DesignPage() {
  return (
    <>
      <Navbar />
      <main className="bg-page">
        {options.map((o, i) => (
          <div key={o.id} id={`opt-${o.id}`} className="relative">
            {o.node}
            <span
              style={{ top: 84 }}
              className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-page/80 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-white/70 backdrop-blur"
            >
              {o.label}
            </span>
            {i < options.length - 1 && <div className="h-px w-full bg-white/20" aria-hidden />}
          </div>
        ))}
      </main>
      <nav
        aria-label="Hero options"
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-raised/90 p-1 backdrop-blur"
      >
        {options.map((o) => (
          <a
            key={o.id}
            href={`#opt-${o.id}`}
            className="rounded-full px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {o.id.toUpperCase()}
          </a>
        ))}
      </nav>
    </>
  );
}
