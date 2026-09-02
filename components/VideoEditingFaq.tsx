"use client";

import { useState } from "react";

const faqs = [
  [
    "What video editing and generation formats do you support?",
    "We handle the entire video spectrum: AI-generated video, motion graphics & VFX, 3D CGI product demos, brand commercials, explainer videos, YouTube long-form, social clips (Reels, TikToks, Shorts), AI avatars/digital twins, and multi-language lip-synced dubbing in 4K resolution.",
  ],
  [
    "How does your team combine Generative AI with human editing?",
    "We use industry-leading generative models (Runway Gen-3, OpenAI Sora, Midjourney, ElevenLabs) for rapid world-building, B-roll synthesis, and voice generation. Then, senior human editors, motion designers, and colorists cut the timeline in Premiere Pro and DaVinci Resolve to ensure cinematic flow, brand accuracy, and pristine fidelity.",
  ],
  [
    "Can you repurpose our existing footage, webinars, or podcasts?",
    "Yes. Send us your long-form webinars, keynote talks, or podcast episodes, and our team extracts high-retention viral moments, adds dynamic motion captions, sound effects, B-roll overlays, and reframes them for 9:16 vertical feeds and 16:9 widescreen distributions.",
  ],
  [
    "What is the typical turnaround time for a video project?",
    "Turnaround times depend on scope. Short-form social cuts and AI-assisted clips can be delivered in 24 to 48 hours. Custom explainer videos, 3D product animations, and master brand films typically take 4 to 10 business days, including storyboard approvals and revisions.",
  ],
  [
    "Do we get full commercial rights and master source files?",
    "Yes. You receive 100% full commercial rights, licensed audio tracks, and upon request, the complete project source files (Premiere Pro/After Effects/DaVinci timelines and raw exports).",
  ],
];

export default function VideoEditingFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-[#020305]">
      <div className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">
              Questions, answered
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              The essential details before we press record.
            </h2>
          </div>
          <div className="border-t border-white/[0.14]">
            {faqs.map(([question, answer], index) => {
              const expanded = open === index;
              return (
                <article
                  key={question}
                  className="border-b border-white/[0.12]"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? -1 : index)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  >
                    <span className="text-base font-medium tracking-[-0.02em] text-white sm:text-lg">
                      {question}
                    </span>
                    <span
                      className={`shrink-0 text-2xl font-light text-sky-300 transition-transform ${
                        expanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {expanded && (
                    <p className="max-w-2xl pb-6 pr-8 text-sm leading-relaxed text-slate-400 sm:text-base">
                      {answer}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
