import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/MainFooter";
import Glow from "@/components/Glow";
import { blueButton, whiteButton } from "@/components/contact/ui";

export const metadata: Metadata = {
  title: "About Rabbitt AI — AI that companies own",
  description:
    "Rabbitt AI is an enterprise AI company. We build private AI for companies: models trained on their own data, running inside their own cloud, owned by them.",
};

// The about page, from the Figma "About" frames: a headline and what the company is, four facts in
// a 2×2 grid, the mission in one sentence, the story with its timeline, three bets, the founder,
// "Rented AI | AI you own" as two halves, and the closing pair. Inter, square corners, no borders
// (hairline dividers only), buttons solid blue or solid white. A Server Component, no script.

const FACTS = [
  ["London", "Headquarters", "Where Rabbitt AI was founded and is run from."],
  ["2023", "Founded", "By Harneet Singh, IIT Delhi alumnus and five-time founder."],
  ["70+", "Enterprise engagements", "Across education, healthcare, finance and customer operations."],
  ["500+", "AI specialists", "Researchers, engineers and data specialists in our network."],
] as const;

const MILESTONES = [
  ["2023", "Founded in London", "A small team with one belief: companies should own the intelligence they create."],
  ["2024", "Seed round", "$2.1M from TC Group, with angel investors from NVIDIA, Meta and Microsoft."],
  [
    "Today",
    "Six products, 70+ engagements",
    "IcyPluto, DRIP, RAW, Rabbitt Learning, Cloud Watcher and ChanceRAG, across education, healthcare, finance and customer operations.",
  ],
  ["Next", "Every company on its own AI", "Private models as normal as private servers. That is the work ahead."],
] as const;

const BETS = [
  [
    "Companies will want to own their AI, not rent it.",
    "Your data, model weights and domain knowledge stay under your control in every deployment.",
  ],
  [
    "Specialised models beat general ones at real work.",
    "We shape each system around your language, workflow and standards, not a public benchmark.",
  ],
  [
    "Trust has to be built in, not added on.",
    "Isolation, access control and audit are designed in from the first conversation.",
  ],
] as const;

const RENTED = [
  "Runs in their cloud, shared with everyone else.",
  "The vendor holds the model weights.",
  "Your data can train their next model.",
  "Their admins can read your logs.",
  "They hold the encryption keys.",
  "The model changes overnight, without notice.",
];
const OWNED = [
  "Runs in your VPC, on-premise or air-gapped.",
  "You hold the weights. Keep, move and audit them.",
  "Your data never trains anyone else’s model.",
  "Your roles decide who sees what.",
  "You hold the keys, in transit and at rest.",
  "It changes when you decide, after it is tested.",
];

const ANNOUNCEMENT = "/blogs/rabbittai-raises-21-million-from-tc-group-of-companies";

const h2 = "text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[56px] lg:leading-[1.07]";

// 73 ticks along the axis, a longer one every sixth; the last quarter is the road ahead, so dimmer
const TICKS = Array.from({ length: 73 }, (_, i) => i);

export default function AboutPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main data-nav-theme="dark" className="dark bg-page text-white selection:bg-blue-600 selection:text-white">
        {/* hero */}
        <section className="rb-container pt-28 lg:pt-[152px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
            <h1 className="text-[clamp(36px,11.2vw,48px)] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[72px] lg:text-[96px] lg:leading-none">
              We build AI
              <span className="block text-white/40">companies own.</span>
            </h1>
            <div className="lg:pt-2">
              <p className="text-[16px] leading-[1.55] text-white/70 lg:text-[18px] lg:leading-[1.6]">
                Rabbitt AI is an enterprise AI company. Our researchers, engineers and data specialists build private AI
                for companies: models trained on their own data, running inside their own cloud, owned by them.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contactus" className={`${blueButton} w-full sm:w-auto`}>
                  Book a demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link href="/products" className={`${whiteButton} w-full sm:w-auto`}>
                  Explore products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 lg:mt-24 lg:gap-x-12">
            {FACTS.map(([value, label, detail]) => (
              <li key={label} className="border-t border-white/[0.16] py-6 lg:py-9">
                <p className="text-[36px] font-semibold leading-[1.1] tracking-[-0.04em] lg:text-[64px] lg:leading-[1.06]">{value}</p>
                <p className="mt-3 text-[15px] font-semibold lg:text-[18px]">{label}</p>
                <p className="mt-1 text-[13px] leading-[1.45] text-white/55 lg:text-[16px]">{detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* mission */}
        <section aria-label="Mission" className="rb-section">
          <div className="rb-container">
            <p className="max-w-[1180px] text-[28px] font-medium leading-[1.28] tracking-[-0.04em] sm:text-[40px] lg:text-[52px] lg:leading-[1.19]">
              Rabbitt AI exists so that every company can <span className="text-brand-text">own the intelligence it creates</span>{" "}
              – its data, its models and the decisions they make.{" "}
              <span className="text-white/[0.32]">Generic AI rents you answers. We help you build your own.</span>
            </p>
          </div>
        </section>

        {/* story and timeline */}
        <section aria-labelledby="story" className="rb-section">
          <div className="rb-container">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_432px] lg:gap-12">
              <h2 id="story" className={h2}>
                Founded at the <br className="hidden lg:block" />
                right moment.
              </h2>
              <p className="text-[16px] leading-[1.6] text-white/65 lg:mt-2 lg:text-[17px] lg:leading-[1.6]">
                By 2023 open models were good enough for real work, every enterprise sat on years of private data, and none
                of them wanted to send it to someone else’s cloud. Rabbitt AI started in London to close that gap.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-14">
              {/* the axis: a tick every ~18px, the last quarter dashed and dimmer */}
              <div aria-hidden className="absolute inset-x-0 top-0 hidden h-6 lg:block">
                <div className="absolute inset-x-0 top-6 flex h-3 -translate-y-full items-end justify-between">
                  {TICKS.map((i) => (
                    <span key={i} className={`w-px ${i % 6 === 0 ? "h-3" : "h-1.5"} ${i > 54 ? "bg-white/[0.12]" : "bg-white/30"}`} />
                  ))}
                </div>
                <span className="absolute left-0 top-6 h-px w-3/4 bg-white/30" />
                <span className="absolute right-0 top-6 h-px w-1/4 bg-[repeating-linear-gradient(90deg,#4d9bff_0_4px,transparent_4px_10px)]" />
              </div>

              <ol className="grid lg:grid-cols-4 lg:gap-x-6">
                {MILESTONES.map(([year, title, text], i) => {
                  const last = i === MILESTONES.length - 1;
                  return (
                    <li key={year} className="relative pb-9 pl-8 lg:pb-0 lg:pl-0 lg:pt-[76px]">
                      <span aria-hidden className={`absolute left-0 top-3 h-2.5 w-2.5 ${last ? "bg-brand-text" : "bg-brand"} lg:top-5`} />
                      {/* mobile: the line down to the next marker, dashed after the last */}
                      <span
                        aria-hidden
                        className={`absolute left-[4.5px] top-[22px] w-px lg:hidden ${
                          last ? "h-[calc(100%-58px)] bg-[repeating-linear-gradient(180deg,#4d9bff_0_4px,transparent_4px_10px)]" : "h-full bg-white/25"
                        }`}
                      />
                      <span aria-hidden className="absolute left-[4.5px] top-[30px] hidden h-7 w-px bg-white/25 lg:block" />
                      <p className={`text-[32px] font-semibold leading-[1.15] tracking-[-0.04em] lg:text-[44px] lg:leading-[1.1] ${last ? "text-brand-text" : ""}`}>
                        {year}
                      </p>
                      <h3 className="mt-3 text-[16px] font-semibold leading-snug lg:mt-4 lg:text-[17px]">{title}</h3>
                      <p className="mt-2 max-w-[280px] text-[15px] leading-[1.55] text-white/60">{text}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* three bets */}
        <section aria-labelledby="bets" className="rb-section">
          <div className="rb-container">
            <h2 id="bets" className={h2}>
              We made three bets.
            </h2>
            <div className="mt-8 grid gap-9 lg:mt-[60px] lg:grid-cols-3 lg:gap-5">
              {BETS.map(([title, text], i) => (
                <div key={title} className={["", "lg:mt-16", "lg:mt-32"][i]}>
                  <div className="relative isolate flex h-[220px] items-end overflow-hidden bg-[#111317] p-[22px] lg:h-[300px] lg:p-7">
                    {i !== 1 && <Glow soft={i === 2} blur={63} />}
                    <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.03em] lg:text-[30px] lg:leading-[1.2]">{title}</h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.55] text-white/60 lg:mt-[18px] lg:max-w-[calc(100%-24px)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* founder */}
        <section aria-label="The founder" className="rb-section">
          <div className="rb-container grid gap-10 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-16">
            <div className="relative aspect-[13/16] w-full overflow-hidden bg-[#111317]">
              <Image
                src="/assets/harneetsingh.png"
                alt="Harneet Singh, founder of Rabbitt AI"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figure className="lg:pt-6">
              <blockquote className="max-w-[664px] text-[24px] font-medium leading-[1.33] tracking-[-0.025em] lg:text-[40px] lg:leading-[1.25]">
                “In the new world, we are helping companies become the landlords of the AI world rather than just the tenants,
                like the past Internet world.”
              </blockquote>
              <figcaption className="mt-8 lg:mt-9">
                <p className="text-[16px] font-semibold lg:text-[17px]">Harneet Singh</p>
                <p className="mt-1 text-[14px] text-white/60 lg:text-[15px]">Founder &amp; Chief AI Officer, Rabbitt AI</p>
              </figcaption>
              <p className="mt-8 max-w-[600px] text-[16px] leading-[1.6] text-white/70 lg:text-[17px] lg:leading-[1.65]">
                An IIT Delhi alumnus and serial entrepreneur who has built five companies from scratch. He leads Rabbitt AI’s
                strategy, research direction and model architecture, and wrote AI NAMA, our book on building AI you own.
              </p>
              <p className="mt-6 text-[14px] font-medium text-white/85 lg:text-[15px]">
                IIT Delhi <span className="px-1.5 text-white/40">·</span> Europe Top 100 AI Leader{" "}
                <span className="px-1.5 text-white/40">·</span> Author, AI NAMA
              </p>
              <Link
                href={ANNOUNCEMENT}
                className="group mt-6 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
              >
                Read the funding announcement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </figure>
          </div>
        </section>

        {/* Rented AI | AI you own: two halves, line against line */}
        <section aria-label="Rented AI and AI you own" className="grid md:grid-cols-2">
          <div className="bg-[#111317] px-5 py-14 sm:px-8 lg:px-12 lg:pb-7 lg:pt-24 xl:px-16">
            <h2 className="text-[48px] font-semibold leading-[1.08] tracking-[-0.045em] text-white/90 lg:text-[80px] lg:leading-[1.05]">Rented AI.</h2>
            <p className="mt-3 text-[16px] text-white/45 lg:mt-4 lg:text-[18px]">What most companies sign up for.</p>
            <ul className="mt-10 lg:mt-[67px]">
              {RENTED.map((line) => (
                <li key={line} className="border-t border-white/10 py-[18px] text-[18px] leading-[1.45] tracking-[-0.01em] text-white/50 lg:py-6 lg:text-[22px] lg:leading-[1.36]">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate overflow-hidden px-5 py-14 sm:px-8 lg:px-12 lg:pb-7 lg:pt-24 xl:px-16">
            <Glow blur={150} />
            <h2 className="text-[48px] font-semibold leading-[1.08] tracking-[-0.045em] lg:text-[80px] lg:leading-[1.05]">AI you own.</h2>
            <p className="mt-3 text-[16px] text-white/75 lg:mt-4 lg:text-[18px]">What Rabbitt AI builds with you.</p>
            <ul className="mt-10 lg:mt-[67px]">
              {OWNED.map((line) => (
                <li key={line} className="border-t border-white/[0.18] py-[18px] text-[18px] font-medium leading-[1.45] tracking-[-0.01em] lg:py-6 lg:text-[22px] lg:leading-[1.36]">
                  {line}
                </li>
              ))}
            </ul>
            <Link href="/contactus" className={`${whiteButton} mt-8 w-full sm:w-auto lg:mt-10`}>
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </section>

        {/* closing */}
        <section aria-label="Work with us" className="rb-container grid gap-3 pb-24 pt-24 lg:grid-cols-2 lg:gap-5 lg:pb-[120px] lg:pt-[160px]">
          <div className="relative isolate flex min-h-[320px] flex-col overflow-hidden bg-[#111317] p-6 lg:min-h-[380px] lg:p-12">
            <Glow blur={80} />
            <h2 className="max-w-[12ch] text-balance text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] lg:text-[44px] lg:leading-[1.09]">
              Build your own AI with us.
            </h2>
            <p className="mt-4 max-w-[460px] text-[16px] leading-[1.6] text-white/80 lg:mt-6 lg:text-[17px]">
              Bring one use case. We will run it on your own data, inside your cloud, and show you what it does for your team.
            </p>
            <Link href="/contactus" className={`${whiteButton} mt-8 w-full self-start sm:w-auto lg:mt-auto`}>
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="flex min-h-[320px] flex-col bg-[#111317] p-6 lg:min-h-[380px] lg:p-12">
            <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] lg:text-[44px] lg:leading-[1.09]">Join the team.</h2>
            <p className="mt-4 max-w-[460px] text-[16px] leading-[1.6] text-white/65 lg:mt-6 lg:text-[17px]">
              We hire researchers, engineers and data specialists who want to ship AI that people can own.
            </p>
            <Link href="/contactus?topic=other" className={`${blueButton} mt-8 w-full self-start sm:w-auto lg:mt-auto`}>
              Write to us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
