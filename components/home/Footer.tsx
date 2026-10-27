"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type FooterLink = { label: string; href: string; category?: string };

const columns: { title: string; links: FooterLink[]; cta?: FooterLink }[] = [
  {
    title: "Products",
    links: ["Marketing", "Learning", "Technology", "Ecosystem Products"].map((label) => ({
      label,
      href: "/products",
      category: label,
    })),
    cta: { label: "View all products", href: "/products", category: "Marketing" },
  },
  {
    title: "Services",
    links: [
      { label: "Content Writing", href: "/services/content-writing" },
      { label: "Content Strategy", href: "/services/content-strategy" },
      { label: "Video Editing & Generation", href: "/services/video-editing" },
      { label: "University Training Programs", href: "/services/university-training" },
      { label: "Website Revamp Services", href: "/services/website-revamp" },
      { label: "Corporate Trainings", href: "/services/corporate-trainings" },
      { label: "Data Annotation", href: "/services/data-annotation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Case Studies", href: "/casestudies" },
      { label: "Whitepapers", href: "#" },
      { label: "Webinars", href: "/webinars" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Rabbitt AI", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Contact Us", href: "/contactus" },
    ],
  },
];

const linkClass =
  "text-[15px] text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white";

function selectProductCategory(category: string) {
  window.localStorage.setItem("rabbitt-products-category", category);
  window.dispatchEvent(new Event("rabbitt-products-category-change"));
  if (window.location.pathname === "/products") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function FooterAnchor({ link, className }: { link: FooterLink; className: string }) {
  return (
    <Link
      href={link.href}
      onClick={link.category ? () => selectProductCategory(link.category!) : undefined}
      className={className}
    >
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/[0.06] bg-white text-[#05060a] dark:border-white/10 dark:bg-[#0a1228] dark:text-white">
      {/* ambient glows, same palette as the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* kept clear of the top edge: a glow cut off by the footer's border reads as a hard band */}
        <div className="absolute -left-[12%] top-[14%] hidden h-[360px] w-[560px] rounded-[50%] bg-[#0061ff]/15 blur-[120px] dark:block" />
        <div className="absolute -right-[6%] bottom-[10%] h-[360px] w-[520px] rounded-[50%] bg-[#ff2d95]/10 blur-[120px]" />
      </div>

      <div className="relative w-full px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* link grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:gap-x-10 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:gap-10 lg:py-16">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Rabbitt AI home">
              <Image src="/logo.svg" alt="" width={44} height={44} className="h-11 w-11" />
              <span
                className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text pb-0.5 text-[1.6rem] font-semibold leading-none tracking-[-0.045em] text-transparent"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Rabbitt AI
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-black/60 dark:text-white/60">
              Helping enterprises unlock the full potential of their data with secure, reliable
              and impactful Generative AI.
            </p>
            <div className="mt-8 flex gap-3" aria-label="Social media">
              <SocialLink href="https://www.linkedin.com/company/rabbitt-ai/posts/?feedView=all" label="LinkedIn">
                <span className="text-[15px] font-medium">in</span>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/rabbitt.ai/" label="Instagram">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="3.7" />
                  <circle cx="17.5" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-black/40 dark:text-white/40">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3 lg:mt-6 lg:space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} className={linkClass} />
                  </li>
                ))}
              </ul>
              {column.cta && (
                <Link
                  href={column.cta.href}
                  onClick={() => selectProductCategory(column.cta!.category!)}
                  className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0061ff] transition-colors hover:text-[#4d9bff] dark:text-[#4d8dff]"
                >
                  {column.cta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </nav>
          ))}
        </div>

        {/* legal */}
        <div className="flex flex-col gap-4 border-t border-black/[0.08] py-7 text-sm text-black/50 dark:border-white/10 dark:text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rabbitt AI. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-black dark:hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:border-[#0061ff] hover:text-[#0061ff] dark:border-white/20 dark:text-white/70 dark:hover:border-[#4d8dff] dark:hover:text-[#4d8dff]"
    >
      {children}
    </a>
  );
}
