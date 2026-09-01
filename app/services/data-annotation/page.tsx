import Image from "next/image";
import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";
import ContactCta from "@/components/ContactCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Data Annotation Services | Rabbitt AI",
  description:
    "Personalised, production-grade data annotation services to accelerate your AI development — images, text, audio, video, 3D and more.",
};

const annotationTypes = [
  {
    title: "Image & Video",
    description: "Bounding boxes, segmentation masks, keypoints, and frame-level classification for computer vision pipelines.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
  },
  {
    title: "Text & NLP",
    description: "Named entity recognition, sentiment tagging, intent classification, and relation extraction for language models.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16" /><path d="M4 10h16" /><path d="M4 14h10" />
      </svg>
    ),
  },
  {
    title: "Audio & Speech",
    description: "Transcription, speaker diarization, phoneme tagging, and acoustic event labeling for voice-AI applications.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: "3D Point Cloud",
    description: "LiDAR object detection, cuboid annotation, and scene segmentation for autonomous driving and robotics.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Document & OCR",
    description: "Form digitization, table extraction, handwriting recognition, and structured document parsing at scale.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="8" x2="16" y1="13" y2="13" /><line x1="8" x2="16" y1="17" y2="17" />
      </svg>
    ),
  },
  {
    title: "RLHF & Ranking",
    description: "Human preference data, comparative ranking, and reward model labeling for fine-tuning LLMs with RLHF.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    ),
  },
];

const differentiators = [
  {
    stat: "140+",
    label: "NLP Businesses Served",
    description: "Selected by more than 140 NLP-first businesses for mission-critical annotation pipelines.",
  },
  {
    stat: "500M+",
    label: "Data Points Annotated",
    description: "Permanent international AI Data Experts delivering consistent quality across text, image, audio and video.",
  },
  {
    stat: "99.2%",
    label: "Annotation Accuracy",
    description: "Deep Awareness of the Data — our experts maintain a 99.2% accuracy SLA on every project.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirement Definition",
    description: "We define annotation guidelines, edge-case handling, and quality benchmarks aligned to your model objectives.",
  },
  {
    step: "02",
    title: "Frame Design",
    description: "Custom labeling tooling and taxonomy are configured — bounding boxes, polygons, spans, or custom schemas.",
  },
  {
    step: "03",
    title: "Well Screen Design",
    description: "Data samples are screened for quality, bias, and relevance before annotation begins at scale.",
  },
  {
    step: "04",
    title: "Working Machines & Solutions",
    description: "Our annotation pipeline deploys semi-automated pre-labeling to accelerate human review cycles.",
  },
  {
    step: "05",
    title: "Process Operation & Management",
    description: "Dedicated project managers oversee daily throughput, accuracy checks, and stakeholder reporting.",
  },
  {
    step: "06",
    title: "Final Output Delivery",
    description: "Annotated datasets are delivered in your preferred format — JSON, COCO, YOLO, CSV, or custom exports.",
  },
];

export default function DataAnnotationPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(14,165,233,0.09),transparent_70%)]" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-14 sm:px-10 sm:pt-32 sm:pb-16 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Text Content - 5 cols */}
          <div className="lg:col-span-5 xl:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Data Services
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]">
              Personalised{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Data Annotation
              </span>
              <br />
              to accelerate your AI
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              We gather and annotate every piece of data required to develop production-grade AI —
              images, text, audio, video, 3D and RLHF labeling, all delivered with expert oversight and 99%+ accuracy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Start a Project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="#process"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                See Our Process
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">→</span>
              </Link>
            </div>
          </div>

          {/* Large Hero Image - 7 cols */}
          <div className="relative lg:col-span-7 xl:col-span-7">
            {/* Ambient cyan/blue glow behind image */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.22)_0%,rgba(37,99,235,0.18)_50%,transparent_70%)] blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#070e1b] shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
              <Image
                src="/assets/data-annotation-hero.jpg"
                alt="AI Data Annotation in action - computer vision and telemetry visualization"
                width={1200}
                height={675}
                priority
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.1]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE ANNOTATE ────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          What We Do
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          End-to-end annotation across every data modality
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {annotationTypes.map((type) => (
            <div
              key={type.title}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-sky-500/30 hover:bg-white/[0.05]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-sky-400 transition-colors group-hover:border-sky-500/40 group-hover:bg-sky-500/10">
                {type.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-white">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY RABBITTAI ───────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Centered glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14)_0%,transparent_70%)] blur-3xl" />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
            Why Rabbitt AI
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
            Reliable AI data experts — from kickoff to delivery
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {differentiators.map((d) => (
              <div
                key={d.stat}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7"
              >
                <p className="text-4xl font-bold tracking-[-0.04em] text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    {d.stat}
                  </span>
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{d.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────── */}
      <section
        id="process"
        className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          Our Process
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          AI data experts lead your project{" "}
          <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
            from start to end
          </span>
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/[0.14]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
                Step {s.step}
              </p>
              <h3 className="mt-3 text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
              {/* Step number watermark */}
              <span className="pointer-events-none absolute bottom-4 right-5 text-6xl font-black text-white/[0.04] select-none">
                {s.step}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <ContactCta />
      <SiteFooter />
    </main>
  );
}
