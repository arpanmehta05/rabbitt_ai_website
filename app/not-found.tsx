"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteNavigation from "@/components/SiteNavigation";
import SiteFooter from "@/components/SiteFooter";

const popularLinks = [
  {
    title: "Platform Overview",
    description: "Discover how Rabbitt Ai shapes enterprise data into reliable intelligence.",
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
    href: "/#contact",
    badge: "Consultation",
  },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#020305] text-white flex flex-col justify-between overflow-hidden">
      {/* Shared Navigation */}
      <SiteNavigation />

      {/* Main 404 Hero Section */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-36 pb-20 text-center sm:pt-44">
        {/* Background Ambient Depth Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,rgba(14,165,233,0.05)_45%,transparent_70%)] blur-[90px]" />

        {/* 404 Giant Depth Watermark & Floating Rabbitt Logo */}
        <div className="relative mx-auto flex flex-col items-center justify-center">
          {/* Giant Background 404 Watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-[family-name:var(--font-newsreader)] text-[9rem] font-normal leading-none tracking-[-0.06em] text-white/[0.06] sm:text-[14rem] lg:text-[17rem]"
          >
            404
          </span>

          {/* Huge Rabbitt Logo with Layered Depth Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer Concentric Depth Rings */}
            <div className="pointer-events-none absolute h-60 w-60 rounded-full border border-sky-400/10 sm:h-72 sm:w-72" />
            <div className="pointer-events-none absolute h-48 w-48 rounded-full border border-sky-400/20 sm:h-60 sm:w-60" />

            {/* Floating Logo Container with Ambient Glow */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-36 w-36 items-center justify-center rounded-full bg-[#050b14]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_80px_rgba(14,165,233,0.25)] ring-1 ring-sky-300/30 backdrop-blur-xl sm:h-44 sm:w-44"
            >
              <Image
                src="/logo.svg"
                alt="Rabbitt Ai"
                width={120}
                height={120}
                priority
                className="h-24 w-24 object-contain drop-shadow-[0_8px_30px_rgba(56,189,248,0.45)] sm:h-28 sm:w-28"
              />
            </motion.div>
          </div>
        </div>

        {/* Headline & Guidance */}
        <div className="relative z-10 mt-6 sm:mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            Error 404 · Page Not Found
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-newsreader)] text-4xl font-normal tracking-[-0.03em] sm:text-6xl text-white">
            Lost in the hat?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
            The page you are looking for doesn&apos;t exist, has been relocated, or is temporarily unavailable.
          </p>

          {/* Primary Action Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#020305] shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-transform hover:scale-[1.02]"
            >
              <span>Back to Home</span>
              <span aria-hidden="true" className="text-base leading-none">→</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-slate-200 hover:border-sky-400/40 hover:text-white transition-colors"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Links Section */}
      <section className="relative z-10 border-t border-white/[0.08] bg-[#03060c] py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/[0.06]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                Quick Navigation
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Popular Destinations
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Useful links to get you back on track across Rabbitt Ai
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#070e1a]/60 p-6 backdrop-blur-sm transition-all hover:border-sky-400/40 hover:bg-[#0a1526]"
              >
                <div>
                  <span className="inline-block rounded-md border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
                    {item.badge}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                  <span>Visit page</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 text-sky-400">
                    →
                  </span>
                </div>
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
