import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";
import ContentWritingStudio from "@/components/ContentWritingStudio";
import ContentTypesWheel from "@/components/ContentTypesWheel";
import ContentWritingFaq from "@/components/ContentWritingFaq";

export const metadata = {
  title:
    "Tailor-Made Content That Fits Your Brand Perfectly | TransCurators | Rabbitt AI",
  description:
    "We create content around what makes your brand unique. From articles and blogs to website content, technical writing, thought leadership, and multilingual content, every piece is crafted to fit your voice, engage your audience, and support your business goals.",
};

export default function ContentWritingPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient smooth top glow - orthogonal linear wash with zero circular flower banding */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[550px]"
        style={{
          background: "linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(37, 99, 235, 0.03) 55%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 sm:px-10 sm:pt-24 sm:pb-12 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left: Copy & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[2.95rem] xl:text-[3.45rem]">
              Tailor-made content that{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                fits your brand perfectly.
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              We create content around what makes your brand unique. From
              articles and blogs to website content, technical writing, thought
              leadership, and multilingual content, every piece is crafted to
              fit your voice, engage your audience, and support your business
              goals.
            </p>

            {/* CTA Actions */}
            <div className="mt-7 flex flex-row items-center gap-3.5 flex-nowrap sm:gap-4">
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Start a Content Project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-white/[0.16] px-5 py-3 sm:px-6 sm:py-3.5 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Request Catalog Samples
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: content services wheel */}
          <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
            <ContentTypesWheel />
          </div>
        </div>
      </section>

      <ContentWritingStudio />
      <ContentWritingFaq />

      {/* ── CONTACT CTA & FOOTER ────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
