import Link from "next/link";
import VideoRotationCarousel from "@/components/VideoRotationCarousel";

const disciplines = [
  {
    number: "01",
    title: "AI Video Generation",
    note: "Generative world-building, photorealistic digital twins, dynamic B-roll & synthetic spokesperson videos.",
    tone: "border-t-sky-400",
    tags: ["Runway Gen-3", "OpenAI Sora", "HeyGen Digital Twins"],
  },
  {
    number: "02",
    title: "Post-Production & VFX",
    note: "Pacing, DaVinci Studio color grading, kinetic typography, motion tracking & 3D visual effects.",
    tone: "border-t-blue-500",
    tags: ["DaVinci Resolve", "After Effects", "ACES Color Pipeline"],
  },
  {
    number: "03",
    title: "Commercials & 3D Product",
    note: "Photorealistic 3D product animations, CGI explode views, luxury lighting & brand launch films.",
    tone: "border-t-sky-300",
    tags: ["Cinema 4D / Blender", "Octane Render", "4K Commercial Grade"],
  },
  {
    number: "04",
    title: "Social & Performance Clips",
    note: "High-retention Reels, TikToks, Shorts, viral hooks, auto-caption kinetic typography & podcast cutdowns.",
    tone: "border-t-blue-400",
    tags: ["9:16 Vertical Feeds", "Viral Retention Hooks", "Dynamic Subtitles"],
  },
];

const process = [
  {
    step: "01",
    title: "Script, storyboard & prompt architecture",
    description:
      "We design the visual narrative, shot lists, prompt matrices, and mood boards to align perfectly with your brand tone and goal.",
  },
  {
    step: "02",
    title: "AI generation & raw asset synthesis",
    description:
      "Diffusion models, generative video engines, and custom avatars synthesize cinematic B-roll and photorealistic scenes at scale.",
  },
  {
    step: "03",
    title: "Human precision editing & motion design",
    description:
      "Experienced editors sculpt rhythm, frame transitions, kinetic typography, brand assets, sound design, and color grading.",
  },
  {
    step: "04",
    title: "Sound design & multi-format delivery",
    description:
      "Audio mastering, multi-language AI lip-sync dubbing, and platform-optimized exports across 16:9, 9:16, and 1:1 aspect ratios.",
  },
];

export default function VideoEditingStudio() {
  return (
    <>
      {/* ── VIDEO SUITE DISCIPLINES ─────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="lg:pb-5">
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
                Videos that command attention, not just fill feeds.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                Different channels demand distinct visual pacing. We merge
                cutting-edge generative AI speed with senior post-production
                craftsmanship to produce studio-grade videos built to convert.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/[0.12] bg-white/[0.12] sm:grid-cols-2">
              {disciplines.map((item) => (
                <article
                  key={item.number}
                  className={`group min-h-48 border-t-2 ${item.tone} bg-[#060914] p-6 transition-colors hover:bg-[#0a1020] sm:p-7 flex flex-col justify-between`}
                >
                  <div>
                    <span className="font-mono text-xs text-slate-500">
                      {item.number}
                    </span>
                    <h3 className="mt-6 text-2xl font-medium tracking-[-0.035em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.note}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-slate-400 border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D ROTATIONAL VIDEO STAGE ─────────────────────────────── */}
      <VideoRotationCarousel />

      {/* ── OUR PRODUCTION METHOD ───────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="flex flex-col justify-between gap-7 border-b border-white/[0.12] pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              Flawless production is a sequence of disciplined choices.
            </h2>
          </div>
        </div>

        <div className="divide-y divide-white/[0.10]">
          {process.map((item) => (
            <article
              key={item.step}
              className="grid gap-5 py-8 transition-colors sm:grid-cols-[80px_1fr_minmax(230px,0.72fr)] sm:items-start sm:py-10 hover:bg-white/[0.018]"
            >
              <span className="font-mono text-xs text-sky-400">
                {item.step}
              </span>
              <h3 className="text-2xl font-medium tracking-[-0.035em] text-white sm:text-3xl">
                {item.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── 1 IDEA TO OMNICHANNEL ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-24">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                Start with one core vision. Build an entire video library around
                it.
              </h2>
            </div>
            <Link
              href="/contactus"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Discuss your video production brief{" "}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>

          <div className="border-l border-white/[0.15] pl-6 sm:pl-10">
            <p className="font-serif text-2xl leading-[1.36] tracking-[-0.025em] sm:text-[2rem]">
              “High-impact video pipelines don&apos;t produce one-off assets.
              They turn a single flagship concept into an ecosystem of
              high-converting visual stories across every screen.”
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/[0.15] sm:grid-cols-3">
              {[
                ["The flagship", "4K Master Brand Film"],
                ["The reach", "9:16 Viral Shorts & Reels"],
                ["The proof", "Customer Case Study Cut"],
                ["The action", "High-Converting Ad Hooks"],
                ["The insight", "Product Demo & Walkthrough"],
                ["The global", "AI Lip-Synced Dubs in 15+ Lng"],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#020305] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
