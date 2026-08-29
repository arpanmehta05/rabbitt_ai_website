import Image from "next/image";
import type { ReactNode } from "react";

const footerColumns = [
  {
    title: "Products",
    links: ["Marketing", "Learning", "Technology", "Independent Products", "Other Initiatives"],
    cta: "View all products",
  },
  {
    title: "Services",
    links: ["Content Writing", "Content Strategy", "Video Editing & Generation", "University Training Programs", "Website Revamp Services", "Corporate Trainings"],
    cta: "View all services",
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Whitepapers", "Webinars", "Documentation", "Help Center"],
    cta: "View all resources",
  },
  {
    title: "Company",
    links: ["About Rabbitt Ai", "Careers", "Leadership", "Partners", "Newsroom", "Contact Us"],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#02060d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_12%_38%,rgba(13,73,150,0.13),transparent_70%)]" />
      <div className="relative w-full px-6 pt-14 pb-7 sm:px-10 lg:px-14 lg:pt-16 lg:pb-8 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.16fr_repeat(4,minmax(0,1fr))] lg:gap-0">
          <section className="border-white/[0.13] lg:border-r lg:pr-10">
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Rabbitt Ai" width={58} height={58} className="h-12 w-12 object-contain" />
              <span className="text-[2rem] font-medium tracking-[-0.055em] text-white">Rabbitt Ai</span>
            </div>
            <p className="mt-8 max-w-[17rem] text-[1.05rem] leading-[1.7] tracking-[-0.025em] text-white">
              Helping enterprises unlock the full potential of their data with secure, reliable and impactful Generative AI solutions.
            </p>
            <a href="/contact" className="mt-9 inline-flex items-center gap-3 text-[1.05rem] text-white transition-colors hover:text-white/80">
              Let&apos;s build the future together <span aria-hidden="true" className="text-2xl leading-none">→</span>
            </a>
            <SocialLinks className="mt-12" />
          </section>

          {footerColumns.map((column) => (
            <section key={column.title} className="flex h-full flex-col border-white/[0.13] lg:border-r lg:px-7 xl:px-10 last:border-r-0 last:pr-0">
              <h2 className="text-[0.93rem] font-medium uppercase tracking-[0.1em] text-white">{column.title}</h2>
              <ul className="mt-9 space-y-5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href={link === "Contact Us" ? "/contact" : "#"} className="group flex items-center gap-4 text-[1rem] leading-snug text-white transition-colors hover:text-white/80">
                      <span aria-hidden="true" className="text-2xl font-light leading-none text-white transition-transform group-hover:translate-x-1">›</span>
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
              {column.cta && <a href="#" className="mt-auto inline-flex shrink-0 items-center gap-3 whitespace-nowrap pt-9 text-[1rem] text-white transition-colors hover:text-white/80">{column.cta} <span aria-hidden="true" className="text-2xl leading-none">→</span></a>}
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-7 border-t border-white/[0.13] pt-8 text-[0.95rem] text-white lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 Rabbitt Ai. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {['Privacy Policy', 'Terms of Service'].map((item) => <a key={item} href="#" className="transition-colors hover:text-white/80">{item}</a>)}
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`} aria-label="Social media">
      <SocialLink label="LinkedIn">in</SocialLink>
      <SocialLink label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.7" />
          <circle cx="17.5" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </SocialLink>
    </div>
  );
}

function SocialLink({ label, children }: { label: string; children: ReactNode }) {
  return <a href="#" aria-label={label} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.2] text-lg text-white transition-colors hover:border-white hover:text-white">{children}</a>;
}
