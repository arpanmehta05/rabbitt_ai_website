"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactCta() {
  return (
    <section className="relative bg-[#020305] px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-[#070e1c] p-8 sm:p-12 md:p-16 lg:p-20 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
        >
          {/* Subtle architectural ambient background elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Heading */}
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-normal leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                Ready to build AI that <span className="text-[#4b8aff]">delivers</span> for your enterprise?
              </h2>

              {/* Subheading */}
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
                Partner with Rabbitt AI to engineer secure, production-grade intelligence.
                From custom model adaptation to enterprise retrieval, we help you launch in weeks.
              </p>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium sm:text-sm">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Private VPC Deployment
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Zero Data Retention
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  2-Hour Response SLA
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row lg:flex-col shrink-0">
              <Link
                href="/contactus"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_30px_rgba(14,165,233,0.3)] transition-all hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_40px_rgba(14,165,233,0.5)] focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              >
                <span>Contact Us</span>
                <span className="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/[0.1] hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
