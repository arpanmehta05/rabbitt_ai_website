import Link from "next/link";

const disciplines = [
  {
    number: "01",
    title: "Brand stories",
    note: "Websites, brand voice, campaign copy",
    tone: "border-t-amber-300",
  },
  {
    number: "02",
    title: "Authority",
    note: "Articles, reports, thought leadership",
    tone: "border-t-sky-400",
  },
  {
    number: "03",
    title: "Conversion",
    note: "Product pages, email, sales enablement",
    tone: "border-t-rose-400",
  },
  {
    number: "04",
    title: "Clarity",
    note: "Technical docs, guides, localization",
    tone: "border-t-emerald-400",
  },
];

const process = [
  {
    step: "01",
    title: "Listen for the useful detail",
    description:
      "We begin with your product, customers, language, and the moment the reader needs an answer.",
  },
  {
    step: "02",
    title: "Find the sharpest angle",
    description:
      "Research and editorial structure turn subject expertise into a story with a clear point of view.",
  },
  {
    step: "03",
    title: "Make every line earn its place",
    description:
      "Writers shape the draft for rhythm, accuracy, discoverability, and a voice that sounds like yours.",
  },
  {
    step: "04",
    title: "Deliver work people can use",
    description:
      "A final editorial pass makes the piece ready for the CMS, sales room, launch plan, or local market.",
  },
];

export default function ContentWritingStudio() {
  return (
    <>
      <section className="relative overflow-hidden border-y border-white/[0.09] bg-[#060914]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <div className="lg:pb-5">
              {/* <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">The content room</p> */}
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl">
                Content with a job to do, not just space to fill.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                Different moments need different writing. We bring the right
                editorial discipline to the brief, without flattening every idea
                into the same template.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/[0.12] bg-white/[0.12] sm:grid-cols-2">
              {disciplines.map((item) => (
                <article
                  key={item.number}
                  className={`group min-h-48 border-t-2 ${item.tone} bg-[#060914] p-6 transition-colors hover:bg-[#0a1020] sm:p-7`}
                >
                  <span className="font-mono text-xs text-slate-500">
                    {item.number}
                  </span>
                  <h3 className="mt-10 text-2xl font-medium tracking-[-0.035em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.note}
                  </p>
                  <span className="mt-6 inline-block text-sm text-white/35 transition-all group-hover:translate-x-1 group-hover:text-white">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="flex flex-col justify-between gap-7 border-b border-white/[0.12] pb-8 sm:flex-row sm:items-end">
          <div>
            {/* <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">Our editorial method</p> */}
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl">
              Good writing is a sequence of good decisions.
            </h2>
          </div>
          {/* <p className="max-w-sm text-sm leading-relaxed text-slate-400 sm:text-right">
            A simple process built for thoughtful work, fast feedback, and fewer surprises at handover.
          </p> */}
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

      <section className="relative overflow-hidden border-y border-white/[0.10] bg-[#020305] text-white">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border-[28px] border-sky-400/25" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-16 lg:py-24">
          <div className="flex flex-col justify-between">
            <div>
              {/* <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">One voice, many places</p> */}
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl">
                Start with one good idea. Build a body of work around it.
              </h2>
            </div>
            <Link
              href="/contactus"
              className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold transition-opacity hover:opacity-60"
            >
              Talk through your next brief{" "}
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>

          <div className="border-l border-white/[0.15] pl-6 sm:pl-10">
            <p className="font-serif text-2xl leading-[1.36] tracking-[-0.025em] sm:text-[2rem]">
              “The best content programs don&apos;t repeat themselves. They let
              one strong point of view travel naturally—from the homepage to the
              inbox to the meeting room.”
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-white/[0.15] sm:grid-cols-3">
              {[
                ["The source", "Founder interview"],
                ["The proof", "Research report"],
                ["The reach", "Article series"],
                ["The signal", "Executive newsletter"],
                ["The action", "Campaign landing page"],
                ["The detail", "Sales enablement"],
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
