"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";

const popularLinks = [
  {
    title: "Platform Overview",
    description: "Discover how Rabbitt AI shapes enterprise data into reliable intelligence.",
    href: "/",
    badge: "Home",
  },
  {
    title: "Enterprise Products",
    description: "Explore our full suite of AI products across marketing, learning, and infrastructure.",
    href: "/products",
    badge: "Catalog",
  },
  {
    title: "AI Adoption Journey",
    description: "A structured, 5-stage path from first problem to measurable enterprise impact.",
    href: "/#services",
    badge: "Methodology",
  },
  {
    title: "Book an Enterprise Demo",
    description: "Connect with our AI solutions architects for a technical walkthrough.",
    href: "/contactus",
    badge: "Consultation",
  },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#020305] text-white flex flex-col justify-between overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <SiteNavigation />

      {/* Hero 404 Section */}
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-28 pb-16 text-center sm:pt-36 lg:pt-40">
        {/* Ambient Multi-Layer Background Glows */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22)_0%,rgba(14,165,233,0.12)_40%,transparent_75%)] blur-[95px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]" />

        {/* Subtle Background Grid Accent */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_30%,transparent_100%)] opacity-60" />

        {/* 404 + Overlapping Rabbitt Logo Composition */}
        <div className="relative flex flex-col items-center justify-center select-none">
          {/* Giant Bold White 404 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-sans text-[9rem] font-black leading-none tracking-[-0.06em] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:text-[14rem] md:text-[17rem] lg:text-[20rem]"
          >
            404
          </motion.h1>

          {/* Rabbitt Logo: on top, top 20% overlaps bottom 20% of 404 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.15 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative z-20 -mt-[18%] sm:-mt-[16%] md:-mt-[14%] lg:-mt-[13%] flex items-center justify-center"
          >
            {/* Glow underneath the logo */}
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
              <Image
                src="/logo.svg"
                alt="Rabbitt AI"
                fill
                priority
                className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.98)] drop-shadow-[0_0_60px_rgba(56,189,248,0.4)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Informative Copy & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative z-10 mt-6 max-w-xl sm:mt-8"
        >
          <h2 className="font-sans text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
            Lost in the Rabbitt hole?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base lg:text-lg">
            The page you are looking for doesn&apos;t exist or has moved to another coordinate in our ecosystem.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#020305] shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Back to Home</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-sky-400/50 hover:bg-white/[0.09] hover:text-white"
            >
              Explore Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="relative z-10 bg-[#030712] py-16">
        {/* Top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Quick Navigation
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {popularLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-sky-400/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(14,165,233,0.06)]"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Dot accent */}
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600 transition-colors group-hover:bg-sky-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500 transition-colors group-hover:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-sky-400"
                  aria-hidden="true"
                >
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Shared Footer */}
      <SiteFooter />
    </main>
  );
}
