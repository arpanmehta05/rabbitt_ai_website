"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// "How the book is organized": five reading tracks as rows on hairlines, from the Figma frame. The
// reading track the pointer (or keyboard focus) is on turns blue and its arrow lights up; with
// nothing under the pointer the first one is lit. Each row goes to the contact page, where the
// copy is asked for.
const PARTS = [
  { tag: "Strategic", role: "CXOs & Enterprise Leaders", line: "ROI modeling, realistic timelines & enterprise safety." },
  { tag: "Execution", role: "Founders & Builders", line: "Production blueprints, fine-tuning & infrastructure economics." },
  { tag: "Governance", role: "Policy Makers & Regulators", line: "Data sovereignty, sovereign AI & regulatory standards." },
  { tag: "Technical", role: "AI Engineers & Enthusiasts", line: "Hybrid RAG pipelines, automated evals & agent architectures." },
  { tag: "Global", role: "For The World", line: "Democratizing how intelligent systems reshape industry." },
];

export default function BookParts() {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="parts-title" className="rb-container bg-page py-16 lg:py-24">
      <h2 id="parts-title" className="text-[clamp(2.25rem,3.9vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.055em] text-white">
        How the book is organized.
      </h2>
      <p className="mt-5 text-lg text-white/65">Fifteen cases, five ways to read them. Start with the part written for you.</p>

      <ul className="mt-12 border-b border-white/20 lg:mt-[84px]" onMouseLeave={() => setActive(0)}>
        {PARTS.map((p, i) => {
          const on = active === i;
          return (
            <li key={p.tag} className={`border-t transition-colors ${on ? "border-brand-text/70" : "border-white/20"}`}>
              <Link
                href="/contactus?topic=ainama#form"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="grid items-center gap-x-5 gap-y-3 py-8 lg:min-h-[136px] lg:grid-cols-4 lg:py-0"
              >
                <span className={`text-lg font-medium tracking-[-0.03em] transition-colors ${on ? "text-brand-text" : "text-white/50"}`}>
                  {p.tag}
                </span>
                <span
                  className={`text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-[1.1] tracking-[-0.06em] transition-colors lg:col-span-2 ${
                    on ? "text-brand-text" : "text-white"
                  }`}
                >
                  {p.role}
                </span>
                <span className="flex items-start justify-between gap-6">
                  <span className="max-w-[16rem] text-[17px] leading-[1.4] text-white/70">{p.line}</span>
                  <ArrowUpRight
                    aria-hidden
                    className={`mt-0.5 h-6 w-6 shrink-0 transition-all ${on ? "-translate-y-0.5 translate-x-0.5 text-brand-text" : "text-white/40"}`}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
