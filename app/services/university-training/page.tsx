import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";
import UniversityTrainingStudio from "@/components/UniversityTrainingStudio";
import UniversityTrainingHeroShowcase from "@/components/UniversityTrainingHeroShowcase";
import UniversityTrainingFaq from "@/components/UniversityTrainingFaq";

export const metadata = {
  title: "University Training Programs & GenAI Curriculum | Rabbitt AI",
  description:
    "Empower university students, faculty, and research labs with industry-grade Generative AI engineering curriculum, cloud GPU sandboxes, and career pathways.",
};

export default function UniversityTrainingPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-10 sm:px-10 sm:pt-24 sm:pb-12 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left: Copy & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[2.95rem] xl:text-[3.45rem]">
              Hands-on GenAI curriculum that{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                empowers the next generation.
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Equip your students, faculty, and research labs with industry-grade Generative AI skills, hands-on LLM engineering workshops, cloud GPU sandboxes, and real-world deployment training tailored for modern academia.
            </p>

            {/* CTA Actions */}
            <div className="mt-7 flex flex-row items-center gap-3.5 flex-nowrap sm:gap-4">
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-[0.92rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Partner With Rabbitt AI
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-white/[0.16] px-5 py-3 sm:px-6 sm:py-3.5 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Request Syllabus & Lab Specs
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Uncropped Studio Visual */}
          <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
            <UniversityTrainingHeroShowcase />
          </div>
        </div>
      </section>

      <UniversityTrainingStudio />
      <UniversityTrainingFaq />

      {/* ── CONTACT CTA & FOOTER ────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
