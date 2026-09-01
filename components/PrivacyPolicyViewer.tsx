"use client";

import { useEffect, useState } from "react";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";

export interface PrivacySection {
  id: string;
  title: string;
  content: string[];
  list?: { term: string; detail: string }[];
  bullets?: string[];
  footer?: string;
  contact?: { email: string; note: string };
}

interface PrivacyPolicyViewerProps {
  sections: PrivacySection[];
  lastUpdated: string;
}

export default function PrivacyPolicyViewer({
  sections,
  lastUpdated,
}: PrivacyPolicyViewerProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || "purpose"
  );

  useEffect(() => {
    const handleScroll = () => {
      // Offset to account for sticky navigation header
      const scrollPosition = window.scrollY + 200;
      let current = sections[0]?.id || "";

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = s.id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <main className="min-h-screen bg-[#020305] text-white">
      <SiteNavigation />

      {/* Top ambient glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[300px] bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(14,165,233,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* ── Header ── */}
        <header className="border-b border-white/[0.07] pb-12 pt-36 sm:pt-44">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Legal
            </p>
            <h1 className="mt-5 font-sans text-5xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4rem]">
              Privacy Policy
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              We keep this plain and readable. Here is exactly what data we collect, why, and what you can do about it.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Last updated: {lastUpdated}
            </p>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-20 xl:grid-cols-[260px_1fr]">
          {/* Sticky sidebar TOC with active scroll tracking and glow */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Contents
              </p>
              <div className="space-y-1">
                {sections.map((s) => {
                  const isActive = activeSection === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => scrollToSection(e, s.id)}
                      className={`group flex items-center justify-between rounded-r-lg py-2 pr-3 text-xs transition-all duration-200 ${
                        isActive
                          ? "border-l-2 border-sky-400 bg-sky-500/[0.09] pl-3 font-medium text-sky-300 shadow-[inset_0_0_14px_rgba(56,189,248,0.12),0_0_18px_rgba(56,189,248,0.14)]"
                          : "border-l-2 border-transparent pl-3 text-slate-400 hover:border-white/20 hover:bg-white/[0.02] hover:text-slate-200"
                      }`}
                    >
                      <span className="truncate">{s.title}</span>
                      {isActive && (
                        <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <article className="max-w-2xl space-y-16">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.content.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-400 sm:text-base">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Definition list (term + detail) */}
                {s.list && (
                  <dl className="mt-6 space-y-4">
                    {s.list.map((item) => (
                      <div
                        key={item.term}
                        className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4"
                      >
                        <dt className="text-sm font-semibold text-slate-200">
                          {item.term}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-500">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Bullet list */}
                {s.bullets && (
                  <ul className="mt-5 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer note */}
                {s.footer && (
                  <p className="mt-5 text-sm italic leading-relaxed text-slate-600">
                    {s.footer}
                  </p>
                )}

                {/* Contact block */}
                {s.contact && (
                  <div className="mt-6 inline-flex flex-col gap-1 rounded-xl border border-white/[0.09] bg-white/[0.03] px-6 py-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Data Privacy Officer
                    </p>
                    <a
                      href={`mailto:${s.contact.email}`}
                      className="mt-1 text-base font-medium text-sky-400 transition-colors hover:text-sky-300"
                    >
                      {s.contact.email}
                    </a>
                    <p className="mt-1 text-xs text-slate-600">
                      {s.contact.note}
                    </p>
                  </div>
                )}
              </section>
            ))}

            {/* Bottom note */}
            <div className="border-t border-white/[0.07] pt-10 text-sm text-slate-600">
              <p>
                Rabbitt AI reserves the right to update this Privacy Policy periodically. Any material changes will be communicated via email or a prominent notice on our website before they take effect. Your continued use of our services after changes are published constitutes acceptance of the revised policy.
              </p>
            </div>
          </article>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
