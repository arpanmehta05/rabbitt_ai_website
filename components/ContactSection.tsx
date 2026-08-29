"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const interestOptions = [
  "Enterprise RAG & Search",
  "Custom Model Adaptation",
  "Data Foundations & Pipelines",
  "Autonomous Agents",
  "Cloud Cost & Health",
  "Voice & Conversational AI",
];

const faqs = [
  {
    q: "Can Rabbitt Ai deploy directly inside our private cloud or VPC?",
    a: "Yes. All Rabbitt Ai systems and products can deploy natively within your private AWS, Azure, GCP, or on-premise Kubernetes environments. Your data never leaves your security boundary.",
  },
  {
    q: "Will our enterprise data ever be used to train external models?",
    a: "Never. We enforce strict zero-data-retention (ZDR) and isolated execution pipelines. Your proprietary enterprise knowledge, intellectual property, and customer interactions remain strictly your own.",
  },
  {
    q: "How fast can we build and test a production proof of concept?",
    a: "Our typical enterprise sprint delivers a fully validated, production-grade proof of concept with measurable benchmarks within 2 to 4 weeks.",
  },
  {
    q: "What level of ongoing support and monitoring is included?",
    a: "We provide 24/7 telemetry, real-time hallucination and drift monitoring, continuous evaluation, and dedicated solutions engineering SLAs.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Enterprise RAG & Search",
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section className="relative z-10 min-h-screen bg-[#020305] pt-32 pb-24 text-white sm:pt-40">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(14,165,233,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Page Header */}
        <div className="max-w-3xl pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Contact & Consultation
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-newsreader)] text-4xl font-normal leading-[1.1] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
            Let&apos;s build intelligence that <span className="text-[#4b8aff]">delivers.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
            Speak directly with our enterprise solutions team. Whether you need custom model adaptation, enterprise retrieval, or private cloud deployment, we&apos;re here to guide your AI journey.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Left Column: Direct Channels & Office Info */}
          <div className="flex flex-col justify-between space-y-12">
            <div className="space-y-8">
              {/* Direct Channels */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#070e1b]/70 p-8 backdrop-blur-md">
                <h2 className="text-xl font-semibold text-white">Direct Channels</h2>
                <div className="mt-6 space-y-5 text-sm">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">Enterprise Solutions</span>
                    <a href="mailto:solutions@rabbitt.ai" className="mt-1 block text-base font-medium text-sky-400 hover:text-sky-300 transition-colors">
                      solutions@rabbitt.ai
                    </a>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <span className="block text-xs uppercase tracking-wider text-slate-400">General Inquiries</span>
                    <a href="mailto:hello@rabbitt.ai" className="mt-1 block text-base font-medium text-slate-200 hover:text-white transition-colors">
                      hello@rabbitt.ai
                    </a>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <span className="block text-xs uppercase tracking-wider text-slate-400">Response Commitment</span>
                    <p className="mt-1 text-slate-300 font-medium flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Senior architect response within 2 business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Global Hubs */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#070e1b]/70 p-8 backdrop-blur-md">
                <h2 className="text-xl font-semibold text-white">Global Presence</h2>
                <div className="mt-6 grid grid-cols-2 gap-5 text-sm">
                  <div>
                    <span className="font-semibold text-slate-200">San Francisco</span>
                    <p className="text-xs text-slate-400 mt-1">Americas Headquarters</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">London</span>
                    <p className="text-xs text-slate-400 mt-1">EMEA Hub</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Singapore</span>
                    <p className="text-xs text-slate-400 mt-1">Asia-Pacific Centre</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200">Bengaluru</span>
                    <p className="text-xs text-slate-400 mt-1">AI Engineering Lab</p>
                  </div>
                </div>
              </div>

              {/* Enterprise Security Standards */}
              <div className="rounded-2xl border border-sky-400/20 bg-sky-950/20 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 text-lg">
                    🔒
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Enterprise-Grade Security</h3>
                    <p className="text-xs text-sky-200/70 mt-0.5">SOC2 Type II Certified · HIPAA Ready · GDPR Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="rounded-3xl border border-white/[0.12] bg-[#060c18] p-8 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
                    ✓
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">Thank you for reaching out</h3>
                  <p className="mt-3 max-w-md text-slate-300 text-sm leading-relaxed">
                    We&apos;ve received your inquiry. One of our senior AI solutions architects will review your requirements and respond within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", role: "", message: "" });
                    }}
                    className="mt-8 rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Book an Enterprise Consultation
                  </h2>
                  <p className="text-sm text-slate-400">
                    Share your requirements and we&apos;ll schedule a technical deep-dive tailored to your stack.
                  </p>

                  {/* Area of Interest Multi-Choice Chips */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                      What are you looking to build?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((option) => {
                        const active = selectedInterests.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleInterest(option)}
                            className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                              active
                                ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-sky-400/30 hover:text-white"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Two-Column Inputs */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-300">
                        Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#02050b] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300">
                        Work Email <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@enterprise.com"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#02050b] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-slate-300">
                        Company Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Global"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#02050b] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-xs font-medium text-slate-300">
                        Role / Title
                      </label>
                      <input
                        id="role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="VP of Engineering"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#02050b] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300">
                      Project Overview & Goals
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your data infrastructure, target workflows, or deployment constraints..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#02050b] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(14,165,233,0.3)] hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <span className="text-lg leading-none">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    We respect your privacy. Under NDA by default. Zero proprietary data training.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Enterprise FAQs Accordion */}
        <div className="mt-28 border-t border-white/[0.08] pt-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-slate-400">Everything you need to know about working with Rabbitt Ai.</p>
          </div>

          <div className="mt-8 space-y-4 max-w-4xl">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/[0.08] bg-[#060c18] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-base text-white">{faq.q}</span>
                    <span className={`text-xl text-sky-400 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 text-sm leading-relaxed text-slate-300 border-t border-white/[0.04] pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
