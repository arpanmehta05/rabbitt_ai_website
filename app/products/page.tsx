import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import CtaSection from "@/components/home/CtaSection";
import SplitStage from "@/components/home/SplitStage";
import Glow from "@/components/Glow";
import TeamPicker from "@/components/products/TeamPicker";
import Catalogue from "@/components/products/Catalogue";
import { blueButton } from "@/components/contact/ui";
import { FACTS, FAMILIES, FLAGSHIPS, PRINCIPLES, STEPS, TEAMS, isExternal } from "./products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Twenty AI products in four families, built on one rule: the AI runs on your data, inside your cloud, and belongs to you. Use one, or put them together.",
};

// The products page, from the Figma "Products – Desktop 1440" frame, on the 4-column grid of the other pages
// (310px columns, 24px gaps at 1440): a headline and intro, the facts on the blue gradient, the six flagships
// as type-only blocks, what every product has in common, a team picker, the full catalogue with filters,
// "Start with one", and the closing block. Inter, hairlines, no borders on cards, buttons solid blue.
// Only the team picker and the catalogue filter are Client Components.

const TONE = {
  blue: "bg-brand text-white",
  card: "bg-[#111317] text-white",
  sky: "bg-brand-text text-[#05060a]",
  deep: "bg-brand-hover text-white",
} as const;

const h2 = "text-[36px] font-semibold leading-[42px] tracking-[-0.02em] lg:text-[52px] lg:leading-[58px]";
const intro = "mt-4 text-[15px] leading-[23px] text-white/60 lg:mt-2 lg:text-[17px] lg:leading-[26px]";

export default function ProductsPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark bg-page text-white selection:bg-blue-600 selection:text-white">
        {/* 1 · headline, intro and the facts on the gradient */}
        <header className="rb-container pt-28 lg:pt-[152px]">
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
            <h1 className="text-[64px] font-semibold leading-none tracking-[-0.04em] sm:text-[88px] lg:col-span-2 lg:text-[clamp(88px,8.34vw,120px)]">Products</h1>
            <div className="mt-5 lg:col-span-2 lg:mt-3">
              <p className="max-w-[604px] text-[16px] leading-[25px] text-white/60 lg:text-[20px] lg:leading-[30px]">
                Twenty products, one rule: the AI runs on your data, inside your cloud, and belongs to you. Use one, or put them together.
              </p>
              <a href="#catalogue" className={`${blueButton} mt-6 w-full rounded-lg lg:mt-8 lg:w-auto`}>
                See every product <ArrowDown aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <section aria-label="Products in numbers" className="relative isolate mt-10 overflow-hidden lg:mt-[60px]">
          <Glow blur={90} />
          <ul className="rb-container grid grid-cols-2 gap-x-5 gap-y-8 py-8 lg:grid-cols-4 lg:gap-x-6 lg:py-12">
            {FACTS.map((f) => (
              <li key={f.label}>
                <p className="text-[44px] font-semibold leading-[48px] tracking-[-0.03em] lg:text-[56px] lg:leading-[60px]">{f.value}</p>
                <p className="mt-2 text-[14px] leading-5 text-white/75 lg:mt-3 lg:text-[15px] lg:leading-[22px]">{f.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 2 · the six flagships */}
        <section aria-labelledby="flagships" className="rb-container mt-16 lg:mt-[100px]">
          <div className="lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-6">
            <h2 id="flagships" className={`${h2} lg:col-span-2`}>
              The flagships.
            </h2>
            <p className={`${intro} max-w-[400px] lg:col-span-2 lg:mt-2 lg:max-w-[604px]`}>
              Six products most teams start with. Each one stands alone and works with the rest.
            </p>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-y-6">
            {FLAGSHIPS.map((f) => (
              <li key={f.name} className={f.span === 2 ? "lg:col-span-2" : ""}>
                <a
                  href={f.href}
                  {...(isExternal(f.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block"
                >
                  <span className={`flex h-[168px] items-end p-6 lg:h-[280px] lg:p-8 ${TONE[f.tone]}`}>
                    <span
                      className={`font-semibold tracking-[-0.02em] text-balance ${
                        f.span === 2 ? "text-[28px] leading-[34px] lg:text-[44px] lg:leading-[50px]" : "text-[28px] leading-[34px] lg:text-[32px] lg:leading-[38px]"
                      }`}
                    >
                      {f.statement}
                    </span>
                  </span>
                  <span className="mt-5 flex items-center justify-between gap-4 lg:mt-6">
                    <span className="text-[20px] font-semibold leading-[26px] tracking-[-0.01em]">{f.name}</span>
                    <span className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-text transition-colors group-hover:text-white">
                      Visit <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[520px] text-[15px] leading-[23px] text-white/60">{f.line}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* 3 · what every product has in common */}
        <section aria-labelledby="same-way" className="rb-container mt-20 lg:mt-32">
          <h2 id="same-way" className="max-w-[1000px] text-[28px] font-semibold leading-[34px] tracking-[-0.02em] lg:text-[40px] lg:leading-[48px]">
            Use one or all. <span className="text-white/40">Every product is built the same way.</span>
          </h2>
          <ul className="mt-8 lg:mt-14">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-t border-white/[0.16] py-6 last:border-b lg:grid lg:min-h-[136px] lg:grid-cols-4 lg:gap-x-6 lg:py-9">
                <h3 className="text-[22px] font-semibold leading-7 tracking-[-0.01em] lg:col-span-2 lg:text-[32px] lg:leading-10">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-[23px] text-white/65 lg:col-span-2 lg:mt-1 lg:max-w-[604px] lg:text-[18px] lg:leading-7">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 · find the right one for a team: pinned on desktop, the scroll picks the team */}
        <TeamPicker teams={TEAMS}>
          <h2 id="by-team" className={h2}>
            Find the right one for your team.
          </h2>
        </TeamPicker>

        {/* 5 · every product, with filters */}
        <section id="catalogue" aria-labelledby="every-product" className="rb-container mt-20 scroll-mt-24 lg:mt-32">
          <div className="lg:grid lg:grid-cols-4 lg:items-start lg:gap-x-6">
            <h2 id="every-product" className={`${h2} lg:col-span-2`}>
              Every product.
            </h2>
            <p className={`${intro} lg:col-span-2 lg:mt-2 lg:max-w-[604px]`}>Twenty products in four families. Pick a family to narrow the list.</p>
          </div>
          <Catalogue families={FAMILIES} />
        </section>

        {/* 6 · start with one */}
        <section aria-labelledby="start-with-one" className="rb-container mt-20 lg:mt-32">
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
            <div>
              <h2 id="start-with-one" className={h2}>
                Start with one.
              </h2>
              <p className="mt-3 max-w-[280px] text-[15px] leading-[23px] text-white/55 lg:mt-5">Most teams begin with one product on one problem, then add the next.</p>
            </div>
            <ol className="mt-6 lg:col-span-3 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {STEPS.map((s) => (
                <li key={s.title} className="border-t border-white/[0.16] py-5 lg:pb-0 lg:pt-7">
                  <h3 className="text-[20px] font-semibold leading-[26px] tracking-[-0.01em] lg:text-[22px] lg:leading-7">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[23px] text-white/60 lg:mt-3 lg:max-w-[290px]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 · the closing block, the same as the landing page */}
        <div className="mt-16 lg:mt-24">
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
