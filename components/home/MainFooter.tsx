"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

// The footer, on the layout it had on main: the brand on the left with its line, one invitation and
// the social links, then Products, Services, Resources and Company side by side on hairlines, and a
// bar at the bottom with the copyright and the privacy policy. No arrows. Styled by design.md: Inter,
// the page's `#060d26`, 12px uppercase labels, muted links that turn white, 8px corners. Below 1024px
// the four columns become an accordion (design.md §8): one tap on a title opens it.

type FooterLink = { label: string; href: string; category?: boolean };

const footerColumns: { title: string; links: FooterLink[]; cta?: FooterLink }[] = [
  {
    title: "Products",
    links: [
      { label: "Marketing", href: "/products", category: true },
      { label: "Learning", href: "/products", category: true },
      { label: "Technology", href: "/products", category: true },
      { label: "Ecosystem Products", href: "/products", category: true },
    ],
    cta: { label: "View all products", href: "/products", category: true },
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

const labelClass = "text-[12px] font-medium uppercase tracking-[0.08em] text-white/55";

// a link that draws an underline from the left on hover, with a comfortable height to hit
const underline =
  "relative inline-block py-3 transition-colors duration-200 lg:py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-text after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";
const linkClass = `${underline} text-[15px] leading-snug text-white/70 hover:text-white`;

export default function MainFooter() {
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  // the Products page opens on the category that was chosen here
  const handleProductCategoryClick = (category: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rabbitt-products-category", category);
      window.dispatchEvent(new Event("rabbitt-products-category-change"));
      if (window.location.pathname === "/products") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      data-nav-theme="dark"
      className="relative overflow-hidden border-t border-white/[0.08] bg-page text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_12%_38%,rgba(0,97,255,0.2),transparent_70%)]" />
      <div className="rb-container relative pb-8 pt-12 md:pt-16 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.1fr_1.35fr_0.9fr_0.9fr]">
          {/* the brand */}
          <section className="border-b border-white/10 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            <Link href="/" aria-label="Rabbitt AI home" className="inline-flex items-center gap-3">
              <Image src="/logo.svg" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
              <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">Rabbitt AI</span>
            </Link>
            <p className="mt-8 max-w-[17rem] text-[16px] leading-[1.7] text-white/70">
              Helping enterprises unlock the full potential of their data with secure, reliable and
              impactful Generative AI solutions.
            </p>
            <Link
              href="/contactus"
              className={`${underline} mt-7 text-[16px] font-medium text-white`}
            >
              Let&apos;s build the future together
            </Link>
            <SocialLinks className="mt-10" />
          </section>

          {/* the four columns; an accordion below 1024px */}
          {footerColumns.map((column) => {
            const open = openColumn === column.title;
            const id = `footer-${column.title}`;
            return (
              <section
                key={column.title}
                className="flex flex-col border-b border-white/10 last:border-b-0 lg:h-full lg:border-b-0 lg:border-r lg:px-6 lg:last:border-r-0 xl:px-7"
              >
                <h2 className={`hidden lg:block ${labelClass}`}>{column.title}</h2>
                <h2 className="lg:hidden">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={id}
                    onClick={() => setOpenColumn(open ? null : column.title)}
                    className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
                  >
                    <span className={labelClass}>{column.title}</span>
                    {open ? (
                      <Minus className="h-4 w-4 text-white/55" aria-hidden />
                    ) : (
                      <Plus className="h-4 w-4 text-white/55" aria-hidden />
                    )}
                  </button>
                </h2>

                <div id={id} className={`${open ? "block" : "hidden"} pb-6 lg:flex lg:flex-1 lg:flex-col lg:pb-0`}>
                  <ul className="lg:mt-9 lg:space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={link.category ? () => handleProductCategoryClick(link.label) : undefined}
                          className={linkClass}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {column.cta && (
                    <Link
                      href={column.cta.href}
                      onClick={() => handleProductCategoryClick("Marketing")}
                      className={`${underline} mt-2 self-start text-[15px] font-medium text-brand-text hover:text-white lg:mt-auto lg:pt-9`}
                    >
                      {column.cta.label}
                    </Link>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* the bottom bar: the copyright on the left, the privacy policy on the right */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-[14px] text-white/55 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>© 2026 Rabbitt AI. All rights reserved.</p>
          <Link href="/privacy" className="inline-block py-3 transition-colors hover:text-white sm:py-2">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`} aria-label="Social media">
      <SocialLink href="https://www.linkedin.com/company/rabbitt-ai/posts/?feedView=all" label="LinkedIn">
        in
      </SocialLink>
      <SocialLink href="https://www.instagram.com/rabbitt.ai/" label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.7" />
          <circle cx="17.5" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      </SocialLink>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 text-lg font-medium text-white/80 transition-colors hover:border-white/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
    >
      {children}
    </a>
  );
}
