"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const stages = [
  {
    label: "Define Problem",
    eyebrow: "01 · Discovery",
    title: "Start with the business outcome.",
    description: "We frame the challenge, the people it serves, and the measurable change your organisation needs from AI.",
  },
  {
    label: "Design and Build Data",
    eyebrow: "02 · Data foundation",
    title: "Build data your AI can trust.",
    description: "We shape secure, useful data foundations that make enterprise knowledge ready for reliable AI delivery.",
  },
  {
    label: "Develop Model",
    eyebrow: "03 · Model strategy",
    title: "Develop the right intelligence.",
    description: "We choose, evaluate, and adapt models around the real workflows, policies, and performance needs of your business.",
  },
  {
    label: "Develop Application",
    eyebrow: "04 · Product delivery",
    title: "Turn intelligence into an experience.",
    description: "We build useful applications that bring AI safely into the hands of teams, customers, and decision makers.",
  },
  {
    label: "Evaluate Data and Model",
    eyebrow: "05 · Continuous assurance",
    title: "Keep quality accountable.",
    description: "We continuously evaluate answers, safety, and outcomes so the system gets better without losing your trust.",
  },
];

export default function LlmAdoptionJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = stages[activeIndex];

  return (
    <section id="services" className="relative overflow-hidden border-t border-white/[0.08] bg-[#020305] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-sky-300">Generative AI platform</p>
        <div className="mt-6 flex max-w-4xl flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Every stage of your AI adoption journey, built around you.</h2>
          <p className="max-w-sm text-base leading-7 text-slate-400">A clear, enterprise-ready path from first problem to measurable AI outcomes.</p>
        </div>

        <div className="mt-12 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none]">
          {stages.map((stage, index) => (
            <button key={stage.label} type="button" onClick={() => setActiveIndex(index)} className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-all sm:px-6 ${activeIndex === index ? "border-white bg-white text-[#020305]" : "border-white/[0.13] bg-white/[0.04] text-slate-300 hover:border-sky-400/50 hover:text-white"}`}>
              <span className="mr-2 text-slate-500">0{index + 1}</span>{stage.label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <AnimatePresence mode="wait">
            <motion.div key={activeStage.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-sky-300">{activeStage.eyebrow}</p>
              <h3 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{activeStage.title}</h3>
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">{activeStage.description}</p>
              <a href="#contact" className="mt-9 inline-flex items-center gap-3 text-base font-medium text-sky-300 transition-colors hover:text-sky-100">Talk to Rabbitt <span aria-hidden="true" className="text-2xl">→</span></a>
            </motion.div>
          </AnimatePresence>

          <JourneyVisual activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}

function JourneyVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.div layout className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#060c18] p-6 sm:min-h-[28rem] sm:p-10">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0">
          {activeIndex === 0 && <DiscoveryVisual />}
          {activeIndex === 1 && <DataVisual />}
          {activeIndex === 2 && <ModelVisual />}
          {activeIndex === 3 && <ApplicationVisual />}
          {activeIndex === 4 && <EvaluationVisual />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function DiscoveryVisual() {
  return <div className="h-full bg-[radial-gradient(circle_at_55%_50%,rgba(14,165,233,0.32),transparent_32%),linear-gradient(135deg,#06101d,#05070d)]"><div className="absolute left-[12%] top-[24%] space-y-4">{[0, 1, 2].map((item) => <div key={item} className="h-14 w-36 rounded-lg border border-sky-200/25 bg-sky-400/[0.08]" />)}</div><div className="absolute right-[9%] top-[25%] h-44 w-40 rounded-xl border border-sky-200/25 bg-[#dbeafe] p-4"><span className="block h-4 w-full rounded bg-slate-700" /><span className="mt-4 block h-7 rounded bg-sky-600" /><span className="mt-3 block h-16 rounded bg-white" /></div><div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-300/30 bg-[#071321]"><Image src="/logo.svg" alt="Rabbitt AI" width={76} height={76} className="h-20 w-20 object-contain" /></div><svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 360" preserveAspectRatio="none"><path d="M170 104H248C270 104 272 150 300 150M170 180H300M170 256H248C270 256 272 210 300 210M350 180H448" fill="none" stroke="rgba(125,211,252,.72)" strokeWidth="1.2" strokeLinecap="round" /></svg></div>;
}

function DataVisual() {
  return <div className="flex h-full items-center justify-around bg-[radial-gradient(circle_at_50%_52%,rgba(68,95,230,.32),transparent_32%),linear-gradient(135deg,#061b42,#05070d)] px-8"><FlowNode label="Data" type="layers" /><span className="text-3xl text-white/70">→</span><FlowNode label="Transform" type="orbs" /><span className="text-3xl text-white/70">→</span><FlowNode label="LLM" type="model" /></div>;
}

function ModelVisual() {
  return <div className="h-full bg-[radial-gradient(circle_at_50%_52%,rgba(0,140,255,.52),transparent_13%),linear-gradient(135deg,#061b42,#071d49)]"><div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-sky-200/50 bg-gradient-to-b from-sky-400 to-blue-700 shadow-[0_0_70px_rgba(14,165,233,.65)]" /><div className="absolute left-1/2 top-[19%] h-16 w-36 -translate-x-1/2 rounded-xl border border-sky-200/50 bg-sky-400/80" /><div className="absolute bottom-[14%] left-[15%] h-14 w-24 -skew-y-6 border border-sky-200/60 bg-blue-500/70" /><div className="absolute bottom-[14%] right-[15%] h-14 w-24 skew-y-6 border border-sky-200/60 bg-blue-500/70" /></div>;
}

function ApplicationVisual() {
  return <div className="h-full bg-[radial-gradient(circle_at_56%_78%,rgba(25,101,255,.6),transparent_38%),linear-gradient(135deg,#060f20,#05070d)]"><div className="absolute left-1/2 top-[13%] h-[78%] w-44 -translate-x-1/2 rounded-[2rem] border-[10px] border-white/80 bg-slate-100"><span className="absolute left-1/2 top-3 h-2 w-14 -translate-x-1/2 rounded-full bg-slate-300" /><Bubble className="left-[-5.5rem] top-[23%]" text="You can ask me anything!" /><Bubble className="right-[-5rem] top-[42%] bg-cyan-500 text-white" text="Sounds nice!" /><Bubble className="left-[-5.5rem] top-[60%]" text="How about this weekend?" /></div></div>;
}

function EvaluationVisual() {
  return <div className="h-full bg-[radial-gradient(circle_at_75%_60%,rgba(28,97,255,.55),transparent_45%),linear-gradient(135deg,#06122c,#103a9d)]"><div className="absolute inset-x-[12%] top-[16%] grid grid-cols-2 overflow-hidden rounded-xl border border-white/15 bg-[#143690]/90"><div className="p-6"><p className="text-lg font-semibold">Chatbot Quality</p><div className="mt-10 flex h-36 items-end gap-2 border-b border-l border-white/70 px-4">{[34, 72, 54, 88, 41, 66].map((height, index) => <span key={index} style={{ height: `${height}%` }} className="flex-1 bg-sky-400/70" />)}</div></div><div className="border-l border-white/15 p-6"><p className="text-lg font-semibold">Factuality</p><p className="mt-5 text-sm leading-6 text-sky-100">Continuous evaluation helps answers stay accurate, useful, and aligned with your policies.</p><span className="mt-8 block h-9 rounded-full bg-blue-500" /></div></div></div>;
}

function FlowNode({ label, type }: { label: string; type: "layers" | "orbs" | "model" }) {
  return <div className="flex flex-col items-center gap-5 text-center"><div className="relative flex h-32 w-32 items-center justify-center">{type === "layers" && <>{[0, 1, 2].map((item) => <span key={item} className="absolute h-14 w-20 rotate-45 border border-sky-200/60 bg-sky-300/50" style={{ transform: `translateY(${item * 16}px) rotate(45deg)` }} />)}</>}{type === "orbs" && <>{[0, 1, 2, 3].map((item) => <span key={item} className="absolute h-14 w-14 rounded-full bg-sky-300/55" style={{ transform: `translate(${item % 2 ? 20 : -20}px, ${item > 1 ? 20 : -20}px)` }} />)}</>}{type === "model" && <span className="h-24 w-16 border border-sky-200/60 bg-gradient-to-b from-sky-400 to-slate-100" />}</div><span className="text-lg">{label}</span></div>;
}

function Bubble({ className, text }: { className: string; text: string }) {
  return <span className={`absolute w-36 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-lg ${className}`}>{text}</span>;
}
