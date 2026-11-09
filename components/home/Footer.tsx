"use client";

import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// The end of the page, done like a shop shutter. The footer is a white panel with rounded lower
// corners; below it, fixed to the bottom of the screen, is a huge wordmark on blue. The panel is
// the shutter: as you reach the end it lifts away and the wordmark rises into view from behind it.
//
// The wordmark's layer is `fixed`, and its parent clips it, so it only shows inside the stretch
// of page that the parent occupies. That stretch is empty space: scrolling through it is what
// lifts the panel.

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Marketing", href: "/products" },
      { label: "Learning", href: "/products" },
      { label: "Technology", href: "/products" },
      { label: "Ecosystem Products", href: "/products" },
      { label: "View all products", href: "/products" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Content Writing", href: "/services/content-writing" },
      { label: "Content Strategy", href: "/services/content-strategy" },
      { label: "Video Editing & Generation", href: "/services/video-editing" },
      { label: "University Training", href: "/services/university-training" },
      { label: "Website Revamp", href: "/services/website-revamp" },
      { label: "Corporate Trainings", href: "/services/corporate-trainings" },
      { label: "Data Annotation", href: "/services/data-annotation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blogs" },
      { label: "Case Studies", href: "/casestudies" },
      { label: "Webinars", href: "/webinars" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Rabbitt AI", href: "/about" },
      { label: "Contact Us", href: "/contactus" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const REVEAL = "min(78svh, max(260px, 55vw))";

export default function Footer() {
  const reveal = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: reveal, offset: ["start end", "end end"] });
  // the wordmark rises a little as the shutter goes up
  const rise = useTransform(scrollYProgress, [0, 1], ["34%", "0%"]);
  const glow = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <footer aria-label="Site footer" data-nav-theme="light">
      {/* the shutter */}
      <div className="relative z-10 rounded-b-[36px] bg-white shadow-[0_40px_80px_-30px_rgba(0,30,120,0.35)] md:rounded-b-[56px]">
        <div className="px-6 pb-8 pt-20 sm:px-10 md:pt-28 lg:px-[5vw]">
          {/* the closing line, and the way in */}
          <div className="flex flex-col gap-8 border-b border-black/[0.08] pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
            <h2 className="text-[clamp(2.6rem,6.4vw,6rem)] font-normal leading-[0.98] tracking-[-0.02em] text-[#05060a]" style={{ fontFamily: "var(--font-serif-display), 'Times New Roman', serif" }}>
              <span className="block">Own your data.</span>
              <span className="block italic text-[#0061ff]">Own your AI.</span>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contactus" className="inline-flex h-12 items-center rounded-full bg-[#0061ff] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#1a47d6]">
                Book a demo
              </Link>
              <Link href="/products" className="inline-flex h-12 items-center rounded-full border border-black/80 px-7 text-[15px] font-medium transition-colors hover:bg-black hover:text-white">
                Explore products
              </Link>
            </div>
          </div>

          {/* the links, across the whole width */}
          <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_3fr] lg:gap-8">
            <div>
              <Link href="/" aria-label="Rabbitt AI home" className="inline-flex items-center gap-2.5">
                <Image src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
                <span className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text pb-0.5 text-[1.4rem] font-semibold leading-none tracking-[-0.045em] text-transparent" style={{ fontFamily: "var(--font-display)" }}>
                  Rabbitt AI
                </span>
              </Link>
              <p className="mt-5 max-w-[28ch] text-[15px] leading-relaxed text-black/55">Private models and agents that run inside your own cloud.</p>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
              {columns.map((c) => (
                <div key={c.title}>
                  <h3 className="text-[12px] font-medium uppercase tracking-[0.16em] text-black/45">{c.title}</h3>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {c.links.map((l) => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-[16px] leading-snug text-[#05060a] transition-colors hover:text-[#0061ff]">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-6 text-[13px] text-black/50">
            <span>© 2026 Rabbitt AI</span>
            <span className="flex gap-6">
              <Link href="/privacy" className="transition-colors hover:text-[#0061ff]">
                Privacy Policy
              </Link>
              <CookieSettingsButton className="transition-colors hover:text-[#0061ff]" />
              <a href="https://www.linkedin.com/company/rabbitt-ai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#0061ff]">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/rabbitt.ai/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#0061ff]">
                Instagram
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* what is under the shutter: this block is empty page; the fixed layer inside it is what you see */}
      <div ref={reveal} className="relative" style={{ height: REVEAL, clipPath: "inset(0)" }}>
        <div className="fixed bottom-0 left-0 w-full overflow-hidden bg-[#0061ff]" style={{ height: REVEAL }}>
          <motion.div aria-hidden style={{ opacity: glow }} className="absolute inset-0">
            <div className="absolute -right-[8%] -top-[30%] h-[70%] w-[55%] rounded-full bg-[#ff4da6]/18 blur-[120px]" />
            <div className="absolute -bottom-[40%] -left-[10%] h-[80%] w-[60%] rounded-full bg-[#7fb4ff]/50 blur-[130px]" />
          </motion.div>
          <motion.div style={{ y: rise }} className="absolute inset-x-0 bottom-0 flex justify-center">
            <svg viewBox="0 0 1000 250" className="block w-full translate-y-[14%]" role="img" aria-label="Rabbitt AI">
              <text x="500" y="226" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs" fill="#ffffff" fontSize="276" fontWeight="700" style={{ fontFamily: "var(--font-display), 'Inter Tight', sans-serif", letterSpacing: "-0.05em" }}>
                Rabbitt AI
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
