"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const footerColumns = [
  {
    title: "Products",
    links: ["Marketing", "Learning", "Technology", "Ecosystem Products"],
    cta: "View all products",
  },
  {
    title: "Services",
    links: [
      "Content Writing",
      "Content Strategy",
      "Video Editing & Generation",
      "University Training Programs",
      "Website Revamp Services",
      "Corporate Trainings",
      "Data Annotation",
    ],
  },
  {
    title: "Resources",
    links: [
      "Blog",
      "Case Studies",
      "Whitepapers",
      "Webinars",
    ],
  },
  {
    title: "Company",
    links: [
      "About Rabbitt AI",
      "Careers",
      "Newsroom",
      "Contact Us",
    ],
  },
];

const PRODUCT_CATEGORIES = new Set([
  "Marketing",
  "Learning",
  "Technology",
  "Ecosystem Products",
]);

export default function SiteFooter() {
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
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#02060d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_12%_38%,rgba(13,73,150,0.13),transparent_70%)]" />
      <div className="relative w-full px-6 pt-14 pb-7 sm:px-10 lg:px-14 lg:pt-16 lg:pb-8 xl:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.16fr_repeat(4,minmax(0,1fr))] lg:gap-0">
          <section className="border-white/[0.13] lg:border-r lg:pr-10">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Rabbitt"
                width={58}
                height={58}
                className="h-12 w-12 object-contain"
              />
              <span className="text-[2rem] font-bold tracking-[-0.02em] bg-gradient-to-r from-[#9AD5FF] via-[#4895FF] to-[#0061FF] bg-clip-text text-transparent">
                Rabbitt
              </span>
            </div>
            <p className="mt-8 max-w-[17rem] text-[1.05rem] leading-[1.7] tracking-[-0.025em] text-white">
              Helping enterprises unlock the full potential of their data with
              secure, reliable and impactful Generative AI solutions.
            </p>
            <Link
              href="/contactus"
              className="mt-9 inline-flex items-center gap-3 text-[1.05rem] text-white transition-colors hover:text-white/80"
            >
              Let&apos;s build the future together{" "}
              <span aria-hidden="true" className="text-2xl leading-none">
                →
              </span>
            </Link>
            <SocialLinks className="mt-12" />
          </section>

          {footerColumns.map((column) => (
            <section
              key={column.title}
              className="flex h-full flex-col border-white/[0.13] lg:border-r lg:px-7 xl:px-10 last:border-r-0 last:pr-0"
            >
              <h2 className="text-[0.93rem] font-medium uppercase tracking-[0.1em] text-white">
                {column.title}
              </h2>
              <ul className="mt-9 space-y-5">
                {column.links.map((link) => {
                  const isProductCategory =
                    column.title === "Products" && PRODUCT_CATEGORIES.has(link);
                  const href = isProductCategory
                    ? "/products"
                    : link === "Content Writing"
                      ? "/services/content-writing"
                      : link === "Content Strategy"
                        ? "/services/content-strategy"
                        : link === "Video Editing & Generation"
                          ? "/services/video-editing"
                          : link === "University Training Programs"
                            ? "/services/university-training"
                          : link === "Website Revamp Services"
                            ? "/services/website-revamp"
                          : link === "Corporate Trainings"
                            ? "/services/corporate-trainings"
                          : link === "Data Annotation"
                            ? "/services/data-annotation"
                          : link === "Contact Us"
                            ? "/contactus"
                            : link === "About Rabbitt AI"
                              ? "/about"
                              : link === "Blog"
                                ? "/blogs"
                                : link === "Case Studies"
                                  ? "/casestudies"
                                  : "#";
                  return (
                    <li key={link}>
                      <Link
                        href={href}
                        onClick={
                          isProductCategory
                            ? () => handleProductCategoryClick(link)
                            : undefined
                        }
                        className="group flex items-center gap-4 text-[1rem] leading-snug text-white transition-colors hover:text-white/80"
                      >
                        <span
                          aria-hidden="true"
                          className="text-2xl font-light leading-none text-white transition-transform group-hover:translate-x-1"
                        >
                          ›
                        </span>
                        <span>{link}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {column.cta && (
                <Link
                  href={column.cta === "View all products" ? "/products" : "#"}
                  onClick={
                    column.cta === "View all products"
                      ? () => handleProductCategoryClick("Marketing")
                      : undefined
                  }
                  className="mt-auto inline-flex shrink-0 items-center gap-3 whitespace-nowrap pt-9 text-[1rem] text-white transition-colors hover:text-white/80"
                >
                  {column.cta}{" "}
                  <span aria-hidden="true" className="text-2xl leading-none">
                    →
                  </span>
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-7 border-t border-white/[0.13] pt-8 text-[0.95rem] text-white lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 Rabbitt AI. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href="/privacy"
              className="transition-colors hover:text-white/80"
            >
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white/80">
              Terms of Service
            </a>
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="3.7" />
          <circle
            cx="17.5"
            cy="6.8"
            r="0.8"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </SocialLink>
    </div>
  );
}

function SocialLink({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.2] text-lg text-white transition-colors hover:border-white hover:text-white"
    >
      {children}
    </a>
  );
}
