import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Website Revamp Services | Rabbitt AI & Icypluto",
  description:
    "Transform your digital presence with modern, high-converting web experiences built for the AI era. Lightning-fast performance, modern aesthetics, and conversion architecture.",
};

export default function WebsiteRevampPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white flex flex-col justify-between">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24 lg:px-16 flex-grow flex items-center">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16 w-full">
          {/* Left: Copy & Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-6">
            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[2.95rem] xl:text-[3.45rem]">
              Transform your digital presence with a{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                high-converting revamp.
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Upgrade to a lightning-fast, conversion-engineered digital
              experience built for the modern AI era. Our dedicated digital
              product studio at Icypluto revamps outdated websites into
              responsive, visually captivating, and search-optimized growth
              engines.
            </p>

            {/* CTA Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href="https://icypluto.com/website-revamp-services"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
              >
                Explore Website Revamp on Icypluto
                <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 font-bold">
                  ↗
                </span>
              </a>

              <Link
                href="/contactus"
                className="group inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full border border-white/[0.16] px-6 py-4 text-[0.92rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Schedule Consultation
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Uncropped Hero Visual */}
          <div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
            <div className="relative w-full max-w-[650px]">
              {/* Ambient blue background glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22),transparent_70%)] blur-2xl" />
              <div className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(59,130,246,0.15)] leading-none">
                <Image
                  src="/assets/website-revamp-clean.jpg"
                  alt="Modern Website Revamp Digital Experience Showcase"
                  width={1280}
                  height={720}
                  priority
                  className="block h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                  sizes="(max-width: 768px) 100vw, 650px"
                />
              </div>
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
