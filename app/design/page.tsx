import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar";
import HeroA from "@/components/home/hero-options/HeroA";
import HeroB from "@/components/home/hero-options/HeroB";
import HeroC from "@/components/home/hero-options/HeroC";
import HeroIntro from "@/components/home/HeroIntro";

// A review page, not part of the site: the hero options one under the other, so one can be chosen.
// It is kept out of search engines and out of the sitemap. Delete this folder and
// components/home/hero-options once a choice is made.
export const metadata: Metadata = {
  title: "Hero options",
  robots: { index: false, follow: false },
};

const tags = [
  { id: "a", label: "Option A · Type-led" },
  { id: "b", label: "Option B · Product on show" },
  { id: "c", label: "Option C · The story as a scene" },
  { id: "d", label: "Option D · The object (on the home page now)" },
];

export default function DesignPage() {
  return (
    <>
      <Navbar />
      <main className="bg-page">
        {[HeroA, HeroB, HeroC, HeroIntro].map((Hero, i) => (
          <div key={tags[i].id} id={i === 3 ? "d" : undefined} className="relative">
            <Hero />
            <span style={{ top: 84 }} className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-page/80 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-white/70 backdrop-blur">
              {tags[i].label}
            </span>
            {i < tags.length - 1 && <div className="h-px w-full bg-white/20" aria-hidden />}
          </div>
        ))}
      </main>
      <nav
        aria-label="Hero options"
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full border border-white/10 bg-raised/90 p-1 backdrop-blur"
      >
        {tags.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="rounded-full px-4 py-2 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t.id.toUpperCase()}
          </a>
        ))}
      </nav>
    </>
  );
}
