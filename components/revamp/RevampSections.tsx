import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import InView from "./InView";

// The sections between the intro and the "made for" accordion, set the way the landing page is set:
// one black page, the page's own side gutters and section rhythm, a heading in Inter, and hairlines
// (white at 10%) instead of boxes, all on the page's five columns (20px gutters): Problems puts its note
// in column 1 and its four items in columns 2 to 5, Process and Checks are hairline rows whose parts start
// on columns 1, 3 and 5.
// Server Components; the only script is InView, which starts the line drawings.

const h2 = "text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 160 160" className="rv-draw h-[120px] w-[120px] text-white/70" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      {children}
    </svg>
  );
}

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

const PROBLEMS = [
  {
    title: "Slow",
    text: "Every extra second of load time costs you visitors before they read a word.",
    icon: (
      <Icon>
        <circle data-d pathLength={1} cx="80" cy="80" r="72" />
        <circle data-d pathLength={1} cx="80" cy="80" r="58" style={d(120)} />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return <path key={i} data-d pathLength={1} d={`M${80 + 52 * Math.sin(a)} ${80 - 52 * Math.cos(a)} L${80 + 58 * Math.sin(a)} ${80 - 58 * Math.cos(a)}`} style={d(200 + i * 30)} />;
        })}
        <path data-d pathLength={1} d="M80 80 V36" style={d(500)} className="stroke-brand-text" />
        <path data-d pathLength={1} d="M80 80 L108 96" style={d(650)} />
      </Icon>
    ),
  },
  {
    title: "Unclear",
    text: "Visitors cannot tell in five seconds what you do or what to click next.",
    icon: (
      <Icon>
        <rect data-d pathLength={1} x="12.5" y="28.5" width="135" height="104" rx="6" />
        <path data-d pathLength={1} d="M12 52.5 H148" style={d(150)} />
        <circle data-d pathLength={1} cx="26" cy="40" r="3" style={d(250)} />
        <circle data-d pathLength={1} cx="38" cy="40" r="3" style={d(300)} />
        <path data-d pathLength={1} d="M68 78 a12 12 0 1 1 18 10 c-4 3 -6 5 -6 10" style={d(400)} className="stroke-brand-text" strokeWidth="1.5" />
        <circle data-d pathLength={1} cx="80" cy="110" r="1.5" style={d(700)} className="stroke-brand-text" />
      </Icon>
    ),
  },
  {
    title: "Inaccessible",
    text: "Low contrast and missing labels shut out people and fail audits.",
    icon: (
      <Icon>
        <path data-d pathLength={1} d="M8 80 C34 36 126 36 152 80 C126 124 34 124 8 80 Z" />
        <circle data-d pathLength={1} cx="80" cy="80" r="26" style={d(200)} />
        <circle data-d pathLength={1} cx="80" cy="80" r="9" style={d(350)} />
        <path data-d pathLength={1} d="M24 136 L136 24" style={d(500)} className="stroke-brand-text" strokeWidth="1.5" />
      </Icon>
    ),
  },
  {
    title: "Invisible",
    text: "Pages search engines cannot read are pages customers never find.",
    icon: (
      <Icon>
        <rect data-d pathLength={1} x="14.5" y="14.5" width="78" height="100" rx="3" />
        {[34, 48, 62, 76].map((y, i) => (
          <path key={y} data-d pathLength={1} d={`M28 ${y} H${i % 2 ? 70 : 78}`} style={d(200 + i * 90)} />
        ))}
        <circle data-d pathLength={1} cx="98" cy="92" r="32" style={d(300)} className="stroke-brand-text" strokeWidth="1.5" />
        <path data-d pathLength={1} d="M121 115 L148 146" style={d(550)} className="stroke-brand-text" strokeWidth="1.5" />
      </Icon>
    ),
  },
];

export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="rb-section">
      <div className="rb-container">
        <h2 id="problems-title" className={`${h2} max-w-3xl`}>
          Your website looks fine. It just doesn&apos;t convert.
        </h2>

        {/* the note in column 1, the four problems in columns 2 to 5: every column has a hairline on top */}
        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          <div className="border-t border-white/10 pt-8 sm:col-span-2 lg:col-span-1">
            <p className="max-w-[26rem] text-[15px] leading-[1.65] text-white/70">
              A site can be pretty and still lose people at every step. The cause is usually small, repeated across dozens of pages, and
              invisible until someone measures it.
            </p>
            <Link href="#checks-title" className="group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-brand-text underline-offset-4 hover:underline">
              See what we check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="contents">
            {PROBLEMS.map((p, i) => (
              <li key={p.title} className="group border-t border-white/10 pt-8 transition-colors duration-500 hover:border-brand-text">
                <InView delay={i * 120} className="flex h-full flex-col">
                  {p.icon}
                  <h3 className="mt-12 text-2xl font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-brand-text">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/65">{p.text}</p>
                </InView>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { word: "Audit", text: "We crawl every page and score speed, SEO, accessibility and conversion.", out: "Crawl, score, rank the fixes", href: "#audit" },
  { word: "Design", text: "New layouts that put the one action each page exists for first.", out: "Layouts, copy, components", href: "#design" },
  { word: "Build", text: "Rebuilt on a fast, accessible stack, with your content moved across.", out: "Stack, content move, QA", href: "#build" },
  { word: "Launch", text: "Redirects, monitoring and a handover, so nothing you earned in search is lost.", out: "Redirects, monitoring, handover", href: "#launch" },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="rb-section">
      <div className="rb-container">
        <div className="grid gap-4 lg:grid-cols-5 lg:items-end lg:gap-x-5">
          <h2 id="process-title" className={`${h2} lg:col-span-3`}>
            Four steps from audit to launch.
          </h2>
          <p className="text-[15px] text-white/65 lg:col-span-2 lg:col-start-4 lg:pb-1">A typical project takes 4 to 8 weeks.</p>
        </div>

        <ol className="mt-10 border-t border-white/10 lg:mt-12">
          {STEPS.map((s) => (
            <li key={s.word} className="rb-reveal border-b border-white/10">
              <Link href={s.href} className="group relative grid items-center gap-3 py-8 lg:grid-cols-5 lg:gap-x-5 lg:py-10">
                <span className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.035em] text-white transition-colors group-hover:text-brand-text lg:col-span-2">
                  {s.word}
                </span>
                <span className="flex flex-col gap-2 lg:col-span-2">
                  <span className="max-w-[28rem] text-base leading-[1.55] text-white/70">{s.text}</span>
                  <span className="text-sm text-white/45">{s.out}</span>
                </span>
                <ArrowRight aria-hidden className="hidden h-6 w-6 justify-self-end text-brand-text opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 lg:block" />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-text transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const ci = (children: React.ReactNode) => (
  <svg viewBox="0 0 48 48" className="rv-draw h-12 w-12 text-white/70" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
    {children}
  </svg>
);

const CHECKS = [
  {
    t: "Speed",
    d: "Load time, layout shift and weight, measured on a real phone.",
    l: ["Largest paint and shift", "Page weight and images", "Scripts that block the page"],
    icon: ci(
      <>
        <path data-d pathLength={1} d="M6 36 a18 18 0 1 1 36 0" />
        <path data-d pathLength={1} d="M24 36 L33 22" className="stroke-brand-text" style={d(300)} />
        <circle data-d pathLength={1} cx="24" cy="36" r="2" style={d(450)} />
      </>,
    ),
  },
  {
    t: "SEO",
    d: "Titles, structure, links and what search can actually read.",
    l: ["Titles and headings", "Internal links", "What a crawler can read"],
    icon: ci(
      <>
        <circle data-d pathLength={1} cx="21" cy="21" r="13" />
        <path data-d pathLength={1} d="M31 31 L42 42" className="stroke-brand-text" style={d(300)} />
        <path data-d pathLength={1} d="M14 21 H28 M14 16 H24 M14 26 H26" style={d(200)} />
      </>,
    ),
  },
  {
    t: "Accessibility",
    d: "WCAG 2.2 contrast, labels, keyboard paths and focus.",
    l: ["Colour contrast", "Labels and names", "Keyboard and focus"],
    icon: ci(
      <>
        <circle data-d pathLength={1} cx="24" cy="24" r="19" />
        <circle data-d pathLength={1} cx="24" cy="14" r="2.5" style={d(200)} className="stroke-brand-text" />
        <path data-d pathLength={1} d="M14 20 H34 M24 20 V30 M24 30 L18 38 M24 30 L30 38" style={d(300)} />
      </>,
    ),
  },
  {
    t: "Conversion",
    d: "Where the main action sits and what gets in its way.",
    l: ["The one main action", "Forms and steps", "Proof near the button"],
    icon: ci(
      <>
        <rect data-d pathLength={1} x="4.5" y="14.5" width="39" height="19" rx="4" />
        <path data-d pathLength={1} d="M14 24 H30" style={d(250)} />
        <path data-d pathLength={1} d="M26 20 L34 24 L26 28" className="stroke-brand-text" style={d(400)} />
      </>,
    ),
  },
  {
    t: "Content",
    d: "Clarity, duplication and pages nobody reads.",
    l: ["Does it say what you do", "Duplicated pages", "Dead and thin pages"],
    icon: ci(
      <>
        <rect data-d pathLength={1} x="9.5" y="4.5" width="29" height="39" rx="3" />
        <path data-d pathLength={1} d="M16 14 H32 M16 21 H32 M16 28 H26" style={d(250)} />
        <path data-d pathLength={1} d="M16 35 H22" className="stroke-brand-text" style={d(500)} />
      </>,
    ),
  },
  {
    t: "Security",
    d: "Headers, forms, dependencies and exposed data.",
    l: ["Headers and HTTPS", "Form handling", "Outdated dependencies"],
    icon: ci(
      <>
        <rect data-d pathLength={1} x="9.5" y="21.5" width="29" height="21" rx="3" />
        <path data-d pathLength={1} d="M15 21 V15 a9 9 0 0 1 18 0 V21" style={d(200)} />
        <circle data-d pathLength={1} cx="24" cy="31" r="2.5" className="stroke-brand-text" style={d(450)} />
      </>,
    ),
  },
];

export function Checks() {
  return (
    <section aria-labelledby="checks-title" className="rb-section">
      <div className="rb-container">
        {/* three columns by two rows, on the same 20px gutters as the page's five columns: the note sits over the third column */}
        <div className="grid gap-6 lg:grid-cols-3 lg:items-end lg:gap-x-5">
          <h2 id="checks-title" className={`${h2} lg:col-span-2`}>
            Six checks on every page.
          </h2>
          <p className="text-[15px] leading-[1.6] text-white/70 lg:pb-1">
            Not a score for its own sake. Each check ends in a plain-language fix, ranked by how many visitors it affects, with what it costs
            and the effort to put it right.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {CHECKS.map((c, i) => (
            <li key={c.t} className="group border-t border-white/10 pt-8 transition-colors duration-500 hover:border-brand-text">
              <InView delay={(i % 3) * 120} className="flex h-full flex-col">
                {c.icon}
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-brand-text">{c.t}</h3>
                <p className="mt-3 max-w-[24rem] text-[15px] leading-[1.6] text-white/70 lg:min-h-[3.2em]">{c.d}</p>
                {/* the list is pushed to the bottom, so the three lists in a row start on the same line */}
                <ul className="mt-auto space-y-2.5 border-t border-white/10 pt-6 text-sm text-white/65 lg:mt-8">
                  {c.l.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check aria-hidden className="h-4 w-4 shrink-0 text-brand-text" strokeWidth={2} />
                      {x}
                    </li>
                  ))}
                </ul>
              </InView>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
