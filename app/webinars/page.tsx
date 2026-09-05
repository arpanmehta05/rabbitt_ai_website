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
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-24">
        {/* Editorial Header */}
        <header className="border-b border-white/[0.08] pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Technical Masterclasses
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
              Engineering deep dives, architecture blueprints, and production case studies with Rabbitt AI research scientists.
            </p>
          </div>
        </header>

        {/* Masterclasses Directory */}
        <section className="pt-10">
          <WebinarsDirectory />
        </section>
      </div>

      <ContactCta />
      <SiteFooter />
    </main>
  );
}
