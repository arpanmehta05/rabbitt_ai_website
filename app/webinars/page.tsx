import type { Metadata } from "next";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";
import ContactCta from "@/components/ContactCta";
import WebinarsDirectory from "@/components/WebinarsDirectory";

export const metadata: Metadata = {
  title: "Webinars & Technical Masterclasses | Rabbitt AI",
  description:
    "Live engineering sessions, architecture blueprints, and production case studies with Rabbitt AI research scientists and enterprise systems engineers.",
};

export default function WebinarsPage() {
  return (
    <main className="min-h-screen bg-[#020305] text-white selection:bg-sky-500/30">
      <SiteNavigation />

      {/* Main hero wrapper with absolute anchored backlight - never cuts off on scroll */}
      <div className="relative isolate overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[650px] -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(37, 99, 235, 0.03) 55%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          {/* Clean Hero Header - No double/eyebrow headings */}
          <header className="border-b border-white/[0.08] pb-12 pt-36 sm:pt-44">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Webinars & Technical Masterclasses
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                Live engineering deep dives, architecture blueprints, and production case studies with Rabbitt AI research scientists and enterprise systems engineers.
              </p>
            </div>
          </header>

          {/* Directory & Interactive Showcase */}
          <section className="py-14 sm:py-16">
            <WebinarsDirectory />
          </section>
        </div>
      </div>

      {/* Common CTA Component */}
      <ContactCta />

      <SiteFooter />
    </main>
  );
}
