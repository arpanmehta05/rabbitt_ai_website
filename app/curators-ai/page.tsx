import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "CuratorsAI — Voice-Driven Conversational AI Platform | Rabbitt AI",
  description:
    "The ultimate end-to-end framework for building LLM-based voice-driven conversational applications with sub-250ms latency, multi-lingual support, and enterprise CRM integrations.",
};

const applications = [
  {
    category: "Outbound Sales",
    title: "Autonomous Lead Qualification & Calendar Booking",
    description:
      "Conduct natural, fluid qualification conversations, handle customer objections, check availability, and directly book qualified demos into Salesforce, HubSpot, or Google Calendar.",
    specs: ["Salesforce & HubSpot", "Objection Handling", "Calendar Booking", "Dynamic Cadence"],
  },
  {
    category: "Customer Experience",
    title: "Zero-Wait Inbound Support & Intelligent Triage",
    description:
      "Resolve high-volume customer inquiries instantly with complete conversational memory, real-time database lookups, order tracking, and seamless warm handoffs to human specialists.",
    specs: ["Zendesk & Freshdesk", "Contextual Memory", "Warm Human Transfer", "Instant Resolution"],
  },
  {
    category: "Talent & Recruiting",
    title: "Candidate Pre-Screening & Structured Interviews",
    description:
      "Accelerate hiring cycles by conducting interactive voice screens, evaluating skill competencies against job rubrics, and auto-populating structured interview scorecards into your ATS.",
    specs: ["Greenhouse & Lever ATS", "Competency Scoring", "Structured Rubrics", "Unbiased Screening"],
  },
  {
    category: "Call Intelligence",
    title: "Real-Time Rep Guidance & Post-Call Voice Surveys",
    description:
      "Listen in on live calls to feed reps contextual objection counters in real-time, or automatically execute post-interaction voice surveys with comprehensive sentiment and NPS tagging.",
    specs: ["Live Teleprompter", "CSAT & NPS Tagging", "Whisper Transcription", "Executive Dashboards"],
  },
];

const pipelineStages = [
  {
    organ: "Acoustic Perception (The Ear)",
    name: "Streaming Speech-to-Text",
    description:
      "Zero-buffering Voice Activity Detection (VAD) and acoustic noise cancellation stream human speech tokens directly into memory without waiting for sentence completion.",
    technologies: ["Deepgram Nova-2", "OpenAI Whisper v3", "Adaptive Noise VAD", "Real-Time Endpointing"],
  },
  {
    organ: "Cognitive Engine (The Mind)",
    name: "Intelligent LLM Orchestration",
    description:
      "Dynamic model routing dynamically evaluates conversation complexity, streaming response tokens while simultaneously running RAG queries and tool calls.",
    technologies: ["OpenAI GPT-4o", "Claude 3.5 Sonnet", "Meta LLaMA 3.3", "Mistral Large"],
  },
  {
    organ: "Voice Modulation (The Voice)",
    name: "Neural Voice Modulation",
    description:
      "Full-duplex neural speech synthesis delivers natural conversational inflection, realistic breath pauses, and emotive tone modulation with zero lag.",
    technologies: ["ElevenLabs Turbo v2.5", "Cartesia Sonic", "Amazon Polly Neural", "Custom Voice Clones"],
  },
];

const supportedLanguages = [
  { code: "EN", name: "English", region: "US, UK, IN, AU", native: "English" },
  { code: "HI", name: "Hindi", region: "India & Hinglish", native: "हिंदी" },
  { code: "ES", name: "Spanish", region: "Spain & LATAM", native: "Español" },
  { code: "FR", name: "French", region: "France & Canada", native: "Français" },
  { code: "DE", name: "German", region: "Germany & Austria", native: "Deutsch" },
  { code: "JA", name: "Japanese", region: "Japan (Tokyo)", native: "日本語" },
  { code: "PT", name: "Portuguese", region: "Brazil & Portugal", native: "Português" },
  { code: "IT", name: "Italian", region: "Italy (Rome)", native: "Italiano" },
];

const processSteps = [
  {
    step: "01",
    title: "Define Your Agent Persona",
    description:
      "Configure your voice agent's core role, tone of voice, objective parameters, conversation guidelines, and enterprise boundary rules.",
    deliverable: "System Persona & Guardrails",
  },
  {
    step: "02",
    title: "Voice Engine & Modulation",
    description:
      "Select custom cloned voices or enterprise neural voices with real-time inflection, pacing, hesitation, and emotional modulation controls.",
    deliverable: "Acoustic Tuning & Voice Profile",
  },
  {
    step: "03",
    title: "Knowledge Base Ingestion",
    description:
      "Sync your company's product catalogs, knowledge base docs, policy PDFs, and APIs to empower your voice agent with accurate RAG retrieval.",
    deliverable: "Vector RAG Index & FAQ Corpus",
  },
  {
    step: "04",
    title: "Automated Action Triggers",
    description:
      "Equip your agent with custom function calling to trigger CRM updates, webhook dispatches, calendar reservations, and live database queries.",
    deliverable: "Function Calling & Tool Schemas",
  },
  {
    step: "05",
    title: "Simulation & Latency Audit",
    description:
      "Conduct simulated stress testing and voice latency benchmarking across hundreds of conversation paths to guarantee 99%+ response reliability.",
    deliverable: "Readiness & Safety Certification",
  },
  {
    step: "06",
    title: "Telephony Deploy & Scale",
    description:
      "Deploy instantly to production over Twilio SIP trunks, WebRTC web calling, mobile apps, or enterprise PBX systems with real-time analytics.",
    deliverable: "Live Production Telephony Endpoint",
  },
];

export default function CuratorsAiPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-14 sm:px-10 sm:pt-32 sm:pb-16 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Voice Agent Platform
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              CuratorsAI,
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Voice-Driven Conversational
              </span>
              <br />
              Intelligence for Enterprise
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              The ultimate end-to-end framework for building Large Language Model (LLM)-based voice-driven conversational applications. Automate sales qualification, customer support, and operations with sub-250ms human speech.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Deploy Voice Agent
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="#how-it-works"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                See How It Works
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: hero dashboard image */}
          <div className="relative lg:col-span-7">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.2)_0%,rgba(37,99,235,0.15)_50%,transparent_70%)] blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#070e1b] shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
              <Image
                src="/assets/curators-hero.jpg"
                alt="CuratorsAI voice agent platform dashboard with live telemetry, waveforms and CRM actions"
                width={1376}
                height={768}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.1]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL CALLOUT: ARE YOU ON MUTE? ──────────────────────── */}
      <section className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Voice-First Impact
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          Are you on mute?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl sm:leading-relaxed">
          If your customers feel on mute, your business won&apos;t grow.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
            Get a new voice for your business with CuratorsAI.
          </span>
        </p>

        {/* 3 Stat Pillars */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 divide-y divide-white/[0.08] sm:grid-cols-3 sm:gap-8 sm:divide-y-0 sm:divide-x">
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              &lt;240<span className="text-2xl font-semibold text-sky-400">ms</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Full-Duplex Latency
            </p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              99.4<span className="text-2xl font-semibold text-sky-400">%</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              ASR Accuracy
            </p>
          </div>
          <div className="pt-4 sm:pt-0 sm:px-6">
            <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              8<span className="text-2xl font-semibold text-sky-400">+</span>
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Native Languages
            </p>
          </div>
        </div>
      </section>

      {/* ── VERSATILE APPLICATIONS ──────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Versatile Applications
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          Tailor your AI agent across critical business functions
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          From high-velocity outbound lead generation to compassionate 24/7 customer support and autonomous candidate interviews.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {applications.map((app) => (
            <div
              key={app.title}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060c18] p-7 sm:p-8"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
                  {app.category}
                </p>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-white">
                  {app.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {app.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                {app.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-slate-400"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL ARCHITECTURE: CONNECTED VOICE PIPELINE ─────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Core Architecture
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
              The Sub-250ms{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Real-Time Voice Pipeline
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Full-duplex bidirectional streaming architecture: from acoustic perception to dynamic multi-model reasoning and human-grade neural voice synthesis.
            </p>
          </div>
        </div>

        {/* 3-Stage Pipeline */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {pipelineStages.map((stage) => (
            <div
              key={stage.name}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060c18] p-7 sm:p-8"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
                  {stage.organ}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                  {stage.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {stage.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 border-t border-white/[0.06] pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Integrated Stack
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {stage.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Multi-Lingual Engine Rail */}
        <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#060c18] p-7 sm:p-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Global Dialect Coverage
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
              Native Fluency Across 8+ Global Languages
              <br />
              Automatic language detection with real-time dialect switching
            </h3>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {supportedLanguages.map((lang) => (
              <div
                key={lang.code}
                className="flex flex-col justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center transition-colors hover:border-white/[0.14]"
              >
                <span className="text-[10px] font-bold text-sky-400">{lang.code}</span>
                <span className="my-1.5 text-base font-bold text-white">{lang.native}</span>
                <span className="text-[10px] text-slate-400">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (OPTION 3 DESIGN) ──────────────────────────── */}
      <section
        id="how-it-works"
        className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          How It Works
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          Deploy production voice agents{" "}
          <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
            in six simple stages
          </span>
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] border-t-2 border-t-white bg-[#060c18] p-7 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-white/[0.15] bg-white/[0.05] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Step {s.step}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <span className="text-[11px] font-medium tracking-wide text-slate-400">
                  {s.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
