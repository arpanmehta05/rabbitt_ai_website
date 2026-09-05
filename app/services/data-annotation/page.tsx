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

const modalities = [
  {
    id: "01",
    tag: "COMPUTER VISION",
    title: "Image & Video Annotation Platform",
    description:
      "Full-stack computer vision annotation suite: high-precision multi-class bounding boxes, polygon segmentation masks, keyframe timelines, and temporal tracking for production CV models.",
    image: "/assets/annotation-vision.jpg",
    alt: "Computer vision annotation studio with bounding boxes, segmentation masks and keypoint tracking",
    stats: "4.2B+ Labels Delivered",
    formats: ["COCO", "YOLO v8", "Pascal VOC", "LabelMe"],
  },
  {
    id: "02",
    tag: "AUDIO & SPEECH",
    title: "Voice Intelligence & Diarization Lab",
    description:
      "Multi-speaker conversational diarization, spectrogram audio frequency analysis, phonetic transcription, and acoustic event tagging with sub-2% word error rate SLAs.",
    image: "/assets/annotation-audio.jpg",
    alt: "Speech and audio data annotation studio with multi-track waveforms and spectrogram heatmaps",
    stats: "<2% Word Error Rate",
    formats: ["Diarization", "Phonemes", "Timestamps", "Spectrogram"],
  },
  {
    id: "03",
    tag: "3D POINT CLOUD",
    title: "LiDAR & 3D Sensor Annotation",
    description:
      "Full 3D LiDAR point cloud semantic segmentation, oriented 3D cuboid bounding, and multi-sensor fusion tracking for autonomous driving and industrial robotics.",
    image: "/assets/annotation-lidar.jpg",
    alt: "3D LiDAR point cloud annotation with 64-beam sensor data and street segmentation",
    stats: "1.4M+ Point Clouds",
    formats: ["64-Beam LiDAR", "Oriented Cuboids", "Semantic Seg", "KITTI"],
  },
  {
    id: "04",
    tag: "HEALTHCARE & MEDICAL",
    title: "Clinical Imaging & DICOM Segmentation",
    description:
      "Multi-planar anatomical contouring, volumetric MRI/CT tumor segmentation, pathological cell classification, and radiology annotation by certified specialists.",
    image: "/assets/annotation-medical.jpg",
    alt: "Medical imaging data annotation workstation with multi-planar MRI scans and volumetric segmentation",
    stats: "99.8% Clinical Accuracy",
    formats: ["DICOM / NIfTI", "Multi-Planar", "Volumetric 3D", "FDA-Ready"],
  },
];

const processSteps = [
  {
    step: "01",
    phase: "REQUIREMENTS",
    title: "Requirement Definition",
    description:
      "We define annotation guidelines, edge-case handling, and quality benchmarks aligned to your model objectives.",
    deliverable: "Taxonomy & SOW Spec",
  },
  {
    step: "02",
    phase: "FRAMEWORK",
    title: "Frame Design",
    description:
      "Custom labeling tooling and taxonomy are configured — bounding boxes, polygons, spans, or custom schemas.",
    deliverable: "Tooling & Schemas",
  },
  {
    step: "03",
    phase: "VALIDATION",
    title: "Data Screening",
    description:
      "Data samples are screened for quality, bias, and relevance before annotation begins at scale.",
    deliverable: "Sample Benchmark Batch",
  },
  {
    step: "04",
    phase: "PRODUCTION",
    title: "Pipeline Execution",
    description:
      "Our annotation pipeline deploys semi-automated pre-labeling to accelerate human review cycles.",
    deliverable: "High-Throughput Ingestion",
  },
  {
    step: "05",
    phase: "AUDIT",
    title: "QA & Management",
    description:
      "Dedicated project managers oversee daily throughput, accuracy checks, and stakeholder reporting.",
    deliverable: "99.2% Consensus SLA",
  },
  {
    step: "06",
    phase: "HANDOFF",
    title: "Output Delivery",
    description:
      "Annotated datasets are delivered in your preferred format — JSON, COCO, YOLO, CSV, or custom exports.",
    deliverable: "Production Export Bundle",
  },
];

export default function DataAnnotationPage() {
  return (
    <main className="min-h-screen bg-[#020305] font-sans antialiased text-white">
      <SiteNavigation />

      {/* Ambient smooth top glow - orthogonal linear wash with zero circular flower banding */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[550px]"
        style={{
          background: "linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(37, 99, 235, 0.03) 55%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 pt-28 pb-14 sm:px-10 sm:pt-32 sm:pb-16 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
              Data Services
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.07] tracking-[-0.04em] sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
              Personalised{" "}
              <span className="bg-gradient-to-r from-blue-400 via-[#3B82F6] to-blue-600 bg-clip-text text-transparent">
                Data Annotation
              </span>
              <br />
              to accelerate your AI
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
              We gather and annotate every piece of data required to develop
              production-grade AI — images, text, audio, video, 3D and RLHF
              labeling, all delivered with expert oversight and 99%+ accuracy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contactus"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                Start a Project
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="#process"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.16] px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06]"
              >
                See Our Process
                <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative lg:col-span-7">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.2)_0%,rgba(37,99,235,0.15)_50%,transparent_70%)] blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-[#070e1b] shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
              <Image
                src="/assets/data-annotation-hero.jpg"
                alt="AI data annotation — computer vision telemetry visualization"
                width={1200}
                height={675}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.1]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO — MODALITY CARDS WITH REAL IMAGES ────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400">
          What We Do
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
          End-to-end annotation across every data modality
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          From multi-sensor computer vision and 3D LiDAR to conversational voice
          diarization and human preference RLHF alignment.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {modalities.map((m) => (
            <div
              key={m.id}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060c18]"
            >
              {/* Image Window - natural aspect ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.08] bg-[#02050b]">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Card Body - compact, no empty gap */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-wider text-sky-400">
                    {m.id} // {m.tag}
                  </span>
                  <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-medium text-sky-300">
                    {m.stats}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {m.description}
                </p>

                {/* Formats directly below */}
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3.5">
                  {m.formats.map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[11px] font-medium text-slate-400"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── PROCESS ──────────────────────────────────────────────────── */}
      <section
        id="process"
        className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16"
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
