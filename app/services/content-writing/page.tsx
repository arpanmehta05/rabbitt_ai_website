import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Tailor-Made Content Solutions & Translation Services | TransCurators | Rabbitt AI",
  description:
    "TransCurators is a digital solution company specializing in providing tailor-made content solutions and translation services to organisations.",
};

export default function ContentWritingPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left: Copy & Value Proposition */}
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              TransCurators · Digital Solutions
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem]">
              Tailor-made content solutions &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                translation services
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              We take pride in informing you that TransCurators is a digital solution company that specializes in providing tailor-made content solutions and translation services to organisations. Produce and deploy digital content at scale — from high-converting website copy and programmatic SEO topic clusters to multi-language localization and standardized exam question banks.
            </p>

            {/* Quick feature tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
                Tailor-Made Content
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
                Translation &amp; Localization
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
                Programmatic SEO
              </span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs font-medium text-slate-300">
                Enterprise Catalog Scale
              </span>
            </div>

            {/* CTA Actions */}
            <div className="mt-8 flex flex-row items-center gap-3.5 flex-nowrap sm:gap-4">
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

          {/* Right: TransCurators Solutions Card */}
          <div className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.18)_0%,rgba(37,99,235,0.12)_50%,transparent_70%)] blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070e1b]/95 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.85)] sm:p-8">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  TransCurators · Digital Solution Engine
                </span>
                <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-400">
                  Active
                </span>
              </div>

              {/* Solution Preview Grid */}
              <div className="mt-6 space-y-3.5">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 bg-sky-500/10 text-sky-400">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Tailor-Made Content</p>
                        <p className="text-xs text-slate-400">Website copy, blogs, SEO clusters &amp; exam banks</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">Enterprise</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Translation Services</p>
                        <p className="text-xs text-slate-400">Multi-language localization with cultural &amp; domain accuracy</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-emerald-400/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">40+ Languages</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10 text-violet-400">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Production-Grade Scale</p>
                        <p className="text-xs text-slate-400">Multi-tier human + AI review pipeline with 99%+ quality</p>
                      </div>
                    </div>
                    <span className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-300">High Speed</span>
                  </div>
                </div>
              </div>

              {/* Bottom stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-4 text-center">
                <div>
                  <p className="text-lg font-bold text-white">50M+</p>
                  <p className="text-[11px] text-slate-400">Words Delivered</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-sky-400">40+</p>
                  <p className="text-[11px] text-slate-400">Languages</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-[11px] text-slate-400">Customized</p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.08]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA & FOOTER ────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
