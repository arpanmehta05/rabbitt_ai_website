"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (k: string, v: string) => setFields((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputs: {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    multiline?: boolean;
  }[] = [
    { id: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
    { id: "email", label: "Email", type: "email", placeholder: "Work email", required: true },
    { id: "company", label: "Company", type: "text", placeholder: "Organisation name" },
    { id: "message", label: "Message", type: "text", placeholder: "Tell us what you're working on", multiline: true },
  ];

  return (
    <section className="relative z-10 min-h-screen bg-[#020305] text-white">
      {/* Very subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(14,165,233,0.05),transparent_80%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* ── Top spacer for nav ── */}
        <div className="pt-32 sm:pt-40" />

        {/* ── Two-column layout ── */}
        <div className="grid min-h-[70vh] grid-cols-1 gap-20 pb-24 lg:grid-cols-2 lg:gap-32">

          {/* ── Left: editorial copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                Contact
              </p>
              <h1 className="mt-6 font-sans text-5xl font-bold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                Let&apos;s build<br />
                intelligence that<br />
                <span className="text-[#3B82F6]">delivers.</span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-slate-500 lg:text-lg">
                Speak directly with our enterprise solutions team. No sales pipeline, no automated responses.
              </p>
            </div>

            {/* Contact lines */}
            <div className="mt-16 space-y-6 lg:mt-0">
              <div className="border-t border-white/[0.07] pt-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-700">Sales</p>
                <a
                  href="mailto:sales@rabbitt.ai"
                  className="mt-2 block text-base font-medium text-slate-300 transition-colors hover:text-white"
                >
                  sales@rabbitt.ai
                </a>
              </div>
            </div>

          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start lg:items-center"
          >
            <div className="w-full">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12"
                  >
                    {/* Minimal checkmark */}
                    <svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="h-10 w-10 text-emerald-400"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <circle cx="24" cy="24" r="20" strokeOpacity={0.3} />
                      <path d="M15 24l6 6 12-12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="mt-6 text-2xl font-semibold text-white">Message sent.</h3>
                    <p className="mt-2 text-slate-500">
                      We&apos;ll be in touch within 2 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setErrorMessage(null);
                        setFields({ name: "", email: "", company: "", message: "" });
                      }}
                      className="mt-8 text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-0"
                  >
                    {inputs.map(({ id, label, type, placeholder, required, multiline }) => {
                      const isFocused = focused === id;
                      const hasValue = fields[id as keyof typeof fields].length > 0;

                      return (
                        <div
                          key={id}
                          className={`group relative border-b transition-colors duration-200 ${
                            isFocused ? "border-white/50" : "border-white/20"
                          }`}
                        >
                          <label
                            htmlFor={id}
                            className={`absolute left-0 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                              isFocused || hasValue
                                ? "top-3 text-sky-400"
                                : "top-1/2 -translate-y-1/2 text-slate-400"
                            }`}
                          >
                            {label}
                            {required && (
                              <span className="ml-0.5 text-sky-500">*</span>
                            )}
                          </label>

                          {multiline ? (
                            <textarea
                              id={id}
                              rows={4}
                              value={fields[id as keyof typeof fields]}
                              onFocus={() => setFocused(id)}
                              onBlur={() => setFocused(null)}
                              onChange={(e) => set(id, e.target.value)}
                              placeholder={isFocused ? placeholder : ""}
                              className="w-full resize-none bg-transparent pb-4 pt-10 text-sm text-white placeholder-slate-500 outline-none"
                            />
                          ) : (
                            <input
                              id={id}
                              type={type}
                              required={required}
                              value={fields[id as keyof typeof fields]}
                              onFocus={() => setFocused(id)}
                              onBlur={() => setFocused(null)}
                              onChange={(e) => set(id, e.target.value)}
                              placeholder={isFocused ? placeholder : ""}
                              className="w-full bg-transparent pb-3 pt-8 text-sm text-white placeholder-slate-500 outline-none"
                            />
                          )}
                        </div>
                      );
                    })}

                    {errorMessage && (
                      <div className="mt-6 rounded-lg border border-rose-500/30 bg-rose-950/20 px-4 py-3 text-xs text-rose-300">
                        <p className="font-semibold text-rose-200">Unable to send message</p>
                        <p className="mt-1 text-rose-300/80">{errorMessage}</p>
                      </div>
                    )}

                    <div className="pt-10">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#020305] transition-all hover:bg-slate-100 disabled:opacity-60"
                      >
                        {loading ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#020305] border-t-transparent" />
                        ) : (
                          <>
                            <span>Send message</span>
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                              aria-hidden="true"
                            >
                              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="mt-5 text-[10px] text-slate-700">
                        Zero data training · Private deployment · NDA on request
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
