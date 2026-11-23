import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// The footer, from the Figma "Footer / Extended" component (dark and light). One grid, so everything
// lines up: the brand block, then Products, Services, Resources, Company and Legal on fixed columns
// (376 / 190 / 232 / 168 / 160 / 186 of the 1312px container, kept as proportions); below them the
// trusted-by logos on the left and "Explore our products" starting on the Company column; and a bottom
// row with the copyright and legal links on the left and the two social links starting on the Legal column.
// Titles are 12px caps, link rows are a fixed 32px apart, and Inter is the only font. Below 1024px it
// is one column on a two-column grid (Products | Resources, Services full width, Company | Legal).
// The light theme is the `rb-light` token remap (design.md §4), with the dark-on-light logo files.
// A Server Component: plain markup, no script (the cookie button is its own client component).

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[]; className: string }[] = [
  {
    title: "Products",
    className: "col-span-1 order-1 lg:order-none",
    links: [
      { label: "IcyPluto", href: "https://new.icypluto.com/", external: true },
      { label: "DRIP", href: "https://drip.rabbitt.ai/", external: true },
      { label: "RAW", href: "https://raw.rabbitt.ai/", external: true },
      { label: "Rabbitt Learning", href: "https://learning.rabbitt.ai/", external: true },
      { label: "Cloud Watcher", href: "https://cloudwatcher.rabbitt.ai/", external: true },
      { label: "ChanceRAG", href: "/chancerag" },
    ],
  },
  {
    title: "Services",
    className: "col-span-2 order-3 lg:order-none lg:col-span-1",
    links: [
      { label: "Content Writing", href: "/services/content-writing" },
      { label: "Content Strategy", href: "/services/content-strategy" },
      { label: "Video Editing", href: "/services/video-editing" },
      { label: "University Training", href: "/services/university-training" },
      { label: "Website Revamp", href: "/services/website-revamp" },
      { label: "Corporate Training", href: "/services/corporate-trainings" },
    ],
  },
  {
    title: "Resources",
    className: "col-span-1 order-2 lg:order-none",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Case studies", href: "/casestudies" },
      { label: "Webinars", href: "/webinars" },
      { label: "AINama", href: "/ainama" },
    ],
  },
  {
    title: "Company",
    className: "col-span-1 order-4 lg:order-none",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Contact us", href: "/contactus" },
    ],
  },
  {
    title: "Legal",
    className: "col-span-1 order-5 lg:order-none",
    links: [{ label: "Privacy policy", href: "/privacy" }],
  },
];

// the client logos: the white-text versions for the dark footer, the standard files for the light one
// `wide`: a very wide wordmark gets a set width (116px) instead of the common 22px height, so it is not squeezed small
const clients: { name: string; dark: string; light: string; wide?: boolean }[] = [
  { name: "Groww", dark: "/brands/dark/groww.png", light: "/brands/groww.png" },
  { name: "Cars24", dark: "/brands/dark/cars24.png", light: "/brands/cars24.png" },
  { name: "Paytm", dark: "/brands/dark/paytm.png", light: "/brands/paytm.svg" },
  { name: "Acko", dark: "/brands/dark/acko.png", light: "/brands/acko.svg" },
  { name: "Unacademy", dark: "/brands/dark/unacademy.png", light: "/brands/unacademy.svg", wide: true },
];

const explore: FooterLink[] = [
  { label: "IcyPluto", href: "https://new.icypluto.com/", external: true },
  { label: "DRIP", href: "https://drip.rabbitt.ai/", external: true },
  { label: "RAW", href: "https://raw.rabbitt.ai/", external: true },
];

// the social links: 44px tiles with a hairline border, so they read as buttons and are easy to hit
const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/20 text-white/85 transition-colors duration-200 hover:border-white/50 hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text";

const titleClass = "text-[12px] font-medium uppercase leading-[17px] tracking-[0.08em] text-white/55";
const linkClass =
  "inline-block py-[5px] text-[15px] leading-[21px] text-white/90 transition-colors duration-150 hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text";

function FooterAnchor({ link, className, arrow = false }: { link: FooterLink; className: string; arrow?: boolean }) {
  const body = (
    <>
      {link.label}
      {arrow && <ArrowUpRight aria-hidden className="h-4 w-4" />}
    </>
  );
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {body}
    </Link>
  );
}

export default function MainFooter({ theme = "dark" }: { theme?: "dark" | "light" } = {}) {
  const light = theme === "light";
  return (
    <footer
      data-nav-theme={theme}
      className={`relative overflow-hidden bg-page text-white ${light ? "rb-light border-t border-[#e5e7eb]" : ""}`}
    >
      <div className="rb-container pb-10 pt-12 lg:pt-16">
        {/* row 1: the brand and the five link columns, on one grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-[376fr_190fr_232fr_168fr_160fr_186fr] lg:gap-x-0 lg:gap-y-0">
          <section className="col-span-2 lg:col-span-1 lg:pr-10">
            <Link href="/" aria-label="Rabbitt AI home" className="inline-flex items-center gap-3">
              <Image src="/logo.svg" alt="" width={56} height={56} className="h-14 w-14 object-contain" />
              <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em]">Rabbitt AI</span>
            </Link>
            <p className="mt-4 text-[18px] leading-[26px] text-white/65">Own your data. Own your AI.</p>
            <p className="mt-4 max-w-[300px] text-[15px] leading-[22px] text-white/65">
              Private AI that runs on your data, inside your own cloud. Nothing leaves, nothing trains on your content.
            </p>
          </section>

          {columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title}`} className={column.className}>
              <h2 id={`footer-${column.title}`} className={titleClass}>
                {column.title}
              </h2>
              <ul className="mt-[18px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} className={linkClass} />
                  </li>
                ))}
                {column.title === "Legal" && (
                  <li>
                    <CookieSettingsButton className={`${linkClass} cursor-pointer`} />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        {/* row 2: trusted by (left) and explore our products (on the Company column) */}
        <div className="mt-14 grid gap-x-0 gap-y-10 lg:mt-14 lg:grid-cols-[966fr_346fr]">
          <section aria-labelledby="footer-trusted">
            <h2 id="footer-trusted" className={titleClass}>
              Trusted by
            </h2>
            <ul className="mt-[15px] grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap">
              {clients.map((c) => (
                <li
                  key={c.name}
                  className="group flex h-[52px] items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-4 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.08] lg:h-14 lg:w-[148px] [.rb-light_&]:bg-[#090d16]/[0.03] [.rb-light_&]:hover:bg-[#090d16]/[0.06]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={light ? c.light : c.dark}
                    alt={c.name}
                    className={`w-auto max-w-full opacity-80 transition-opacity duration-200 group-hover:opacity-100 ${
                      c.wide ? "h-auto w-[104px] lg:w-[116px]" : "h-5 lg:h-[22px]"
                    }`}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={titleClass}>
              Explore our products
            </h2>
            <div className="mt-[15px] flex items-center gap-5 lg:h-14">
              <Image src="/logo.svg" alt="" width={56} height={56} className="hidden h-14 w-14 object-contain lg:block" />
              <ul className="flex flex-wrap items-center gap-x-7">
                {explore.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor
                      link={link}
                      arrow
                      className="inline-flex items-center gap-1 py-2 text-[15px] font-medium leading-[21px] text-brand-text transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* row 3: copyright and legal on the left; the two social links start on the Legal column (clear of the chat button) */}
        <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-8 text-[14px] leading-5 text-white/60 lg:grid lg:grid-cols-[376fr_190fr_232fr_168fr_160fr_186fr] lg:items-center lg:gap-x-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 lg:col-span-5">
            <p>© 2026 Rabbitt AI. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-8 text-white/85">
              <Link href="/privacy" className="inline-block py-2 transition-colors hover:text-brand-text">
                Privacy policy
              </Link>
              <CookieSettingsButton className="inline-block cursor-pointer py-2 transition-colors hover:text-brand-text" />
            </div>
          </div>
          <div className="flex items-center gap-3 lg:col-span-1" aria-label="Social media">
            <a
              href="https://www.linkedin.com/company/rabbitt-ai/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialClass}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/rabbitt.ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[22px] w-[22px]" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
