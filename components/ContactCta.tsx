"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-[#020305] px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
      {/* Top hairline divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      {/* Ultra-smooth ambient backlight glow using Gaussian blurred light emitters (no banding or petal edges) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-1/2 h-[550px] w-[750px] -translate-y-1/2 rounded-full bg-sky-500/[0.06] blur-[140px]" />
        <div className="absolute right-[5%] top-1/2 h-[500px] w-[650px] -translate-y-1/2 rounded-full bg-blue-600/[0.06] blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />
      </div>

      {/* Subtle Dot-grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0">
          {/* Left: Text + Buttons */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Let&apos;s build together
            </p>

            <h2 className="mt-4 font-sans text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.25rem]">
              Ready to build AI that{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                delivers
              </span>
              <br />
              for your enterprise?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
              Partner with Rabbitt AI to engineer secure, production-grade
              intelligence. From custom model adaptation to enterprise
              retrieval, we help you launch in weeks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Contact Us
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                Explore Products
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Large logo only */}
          <motion.div
            className="relative hidden shrink-0 items-center justify-center lg:justify-self-center lg:flex"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Buttery smooth circular soft glows behind logo without petal/lobe distortions */}
            <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-sky-500/[0.08] blur-[110px]" />
            <div className="pointer-events-none absolute h-[180px] w-[180px] rounded-full bg-blue-500/[0.10] blur-[70px]" />
            <Image
              src="/logo.svg"
              alt="Rabbitt AI"
              width={220}
              height={220}
              className="relative object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
