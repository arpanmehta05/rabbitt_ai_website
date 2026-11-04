import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchCaseStudiesCached, type CaseStudy } from "@/lib/cms";

// Proof, right after the numbers (design.md §1: "can I trust you → what have you built"). Three real
// case studies from the CMS, each led by its biggest result as a large tabular number, the same way
// the numbers section reads. Hairlines instead of boxes, one accent, nothing laid over the pictures
// (§3, §8, §16). A Server Component with no script: the rise-in is CSS (.rb-reveal), the hover is
// colour and a hairline drawn in the brand blue. The list is cached for an hour so `/` stays
// pre-rendered (§12); if the CMS cannot be reached the section is left out.

const COUNT = 3;

type Card = {
  slug: string;
  title: string;
  about: string;
  image: string;
  stat?: { value: string; label: string };
};

// The biggest "NN% something" in a study's own headline, e.g. "400% Boost in Data Processing Speed".
// Case studies written without a result in the headline simply have no number.
function biggestResult(content: string): Card["stat"] {
  const heading = (content.match(/^#\s+(.+)$/m)?.[1] ?? "").replace(/[*_`]/g, "");
  let best: { n: number; label: string } | undefined;
  for (const m of heading.matchAll(/(\d+(?:\.\d+)?)%\s+(.+?)(?=\s+and\s+\d|,|\s[–—-]\s|\s+Leading\b|\s+for\b|$)/g)) {
    const n = Number(m[1]);
    if (!best || n > best.n) best = { n, label: m[2].trim() };
  }
  if (!best) return undefined;
  return { value: `${best.n}%`, label: best.label.charAt(0).toUpperCase() + best.label.slice(1) };
}

function toCard(s: CaseStudy): Card {
  return {
    slug: s.slug,
    title: s.title.replace(/\s+/g, " ").trim(),
    about: s.about,
    image: s.image,
    stat: biggestResult(s.content),
  };
}

function CaseCard({ study }: { study: Card }) {
  return (
    <li className="rb-reveal border-b border-white/10 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:first:border-l-0">
      <Link href={`/casestudies/${study.slug}`} className="group relative flex h-full flex-col gap-8 py-10 md:min-h-[26rem] md:py-2">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/55">{study.about}</span>

        {study.stat && (
          <span className="flex flex-col gap-4">
            <span className="text-[clamp(3.5rem,7.2vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-white tabular-nums transition-colors duration-300 group-hover:text-brand-text">
              {study.stat.value}
            </span>
            <span className="text-[15px] leading-snug text-white/70">{study.stat.label}</span>
          </span>
        )}

        <span className="line-clamp-3 text-[17px] font-medium leading-snug text-white">{study.title}</span>

        <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-text">
          Read the case study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        {/* the card's hairline, drawn in the brand blue on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 hidden h-px origin-left scale-x-0 bg-brand-text transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none md:block"
        />
      </Link>
    </li>
  );
}

export default async function CaseStudies() {
  const all = await fetchCaseStudiesCached();
  // studies with a result in their headline first, newest first, then any others to fill the row
  const withResult = all.filter((s) => biggestResult(s.content));
  const rest = all.filter((s) => !withResult.includes(s));
  const cards = [...withResult, ...rest].slice(0, COUNT).map(toCard);

  if (cards.length === 0) return null;

  return (
    <section aria-labelledby="case-studies-title" className="rb-section">
      <div className="rb-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="rb-reveal">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/55">Case studies</p>
            <h2
              id="case-studies-title"
              className="mt-4 max-w-3xl text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            >
              Results from work already in production.
            </h2>
          </div>

          <Link
            href="/casestudies"
            className="group inline-flex items-center gap-2 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            View all case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* the cards carry 32px of padding each side so the three columns are equal; the list is pulled
            out by that much so the first and last cards still line up with the container's edges */}
        <div className="mt-12 border-t border-white/10 md:pt-10 lg:mt-16">
          <ul className="grid md:-mx-8 md:grid-cols-3">
            {cards.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
