"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactCta() {
  return (
    <section className="landing-section relative overflow-hidden bg-[#edf5ff] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 border-t border-slate-200">
      {/* Ultra-smooth orthogonal light wash - zero circular curvature, zero flower petals */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14, 165, 233, 0.05) 0%, rgba(37, 99, 235, 0.02) 40%, transparent 85%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* Smoothly feathered dot-grid - seamless fade top and bottom, no hard rectangular cut */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center">
          {/* Left: Text + Buttons */}
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sans text-3xl font-bold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[3.25rem]">
              Ready to build AI that{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                delivers
              </span>
              <br />
              for your enterprise?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Partner with Rabbitt AI to engineer secure, production-grade intelligence.
              From custom model adaptation to enterprise retrieval, we help you launch in weeks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#092f6b] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_12px_26px_rgba(9,47,107,0.18)] transition-all duration-200 hover:bg-[#0d3d86]"
              >
                Contact Us
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 rounded-full border border-[#092f6b] bg-transparent px-7 py-3.5 text-[0.95rem] font-semibold text-[#092f6b] transition-all duration-200 hover:bg-white/70"
              >
                Explore Products
                <span className="text-[#1769aa] transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Large logo with soft glow (NO circular blur disc) */}
          <motion.div
            className="relative hidden shrink-0 items-center justify-center lg:flex"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.svg"
              alt="Rabbitt AI"
              width={220}
              height={220}
              className="relative object-contain drop-shadow-[0_0_45px_rgba(37,99,235,0.35)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
