import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// What we do for clients, beside the products (design.md §1: "what do you do").
//
// Three practice areas, each a full-width card on the page's own black with a hairline border, like
// every other section (no filled grey or navy surface, which no other part of the page has; the
// card stays opaque so the next one covers it). From 1024px up the cards are `position: sticky` one
// after another, so as the page scrolls each one slides up and settles over the one before it, like
// a stack of sheets. That is CSS only (no script, nothing hidden); below 1024px they are simply
// stacked. The cards carry no pictures, drawings or glow: we have no real photographs or product
// screenshots for these services, and anything generated or drawn to fill the space reads as
// generated (§14, §16). It is set in type only. A card's name is its only heading: no number, label
// or eyebrow above it (§16). Every link goes to a page that exists. A Server Component.

type Service = { name: string; detail: string; href: string };
type Area = { title: string; summary: string; services: Service[] };

const areas: Area[] = [
  {
    title: "Data and AI",
    summary: "The data a model learns from, and the agents built on it.",
    services: [
      {
        name: "Data Annotation",
        detail: "Dataset curation, human review and LLM alignment.",
        href: "/services/data-annotation",
      },
      {
        name: "CuratorsAI",
        detail: "Voice agents and conversational workflows.",
        href: "/curators-ai",
      },
      {
        name: "NavicaAI",
        detail: "Career pathways and talent intelligence, matched on skills.",
        href: "/navica-ai",
      },
    ],
  },
  {
    title: "Content and web",
    summary: "Copy, video and websites for teams that publish a lot.",
    services: [
      {
        name: "Content Writing",
        detail: "Website copy, programmatic SEO and technical documentation.",
        href: "/services/content-writing",
      },
      {
        name: "Content Strategy",
        detail: "Editorial planning and distribution across channels.",
        href: "/services/content-strategy",
      },
      {
        name: "Video Editing & Generation",
        detail: "Editing and generative video production.",
        href: "/services/video-editing",
      },
      {
        name: "Website Revamp",
        detail: "Redesigns and rebuilds, from content to launch.",
        href: "/services/website-revamp",
      },
    ],
  },
  {
    title: "Training",
    summary: "Your people, able to build with AI and use it well.",
    services: [
      {
        name: "Corporate Trainings",
        detail: "AI upskilling for technical teams and leadership.",
        href: "/services/corporate-trainings",
      },
      {
        name: "University Training Programs",
        detail: "Hands-on GenAI curriculum and workshops for students.",
        href: "/services/university-training",
      },
    ],
  },
];

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="border-b border-white/10 first:border-t">
      <Link
        href={service.href}
        className="group flex items-center justify-between gap-6 py-5 sm:py-6"
      >
        <span className="flex flex-col gap-1.5">
          <span className="text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium leading-tight tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-brand-text">
            {service.name}
          </span>
          <span className="max-w-[44ch] text-[15px] leading-snug text-white/65">{service.detail}</span>
        </span>
        <ArrowUpRight
          aria-hidden
          className="h-5 w-5 shrink-0 text-white/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
        />
      </Link>
    </li>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="rb-section scroll-mt-16">
      <div className="rb-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2
              id="services-title"
              className="rb-reveal text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
            >
              Services for every stage of adopting AI.
            </h2>
            <p className="rb-reveal mt-6 max-w-[60ch] text-base leading-[1.6] text-white/70 sm:text-lg">
              Nine services in three areas. Pick one, or start with a conversation.
            </p>
          </div>

          <Link
            href="/contactus"
            className="group inline-flex items-center gap-2 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            Talk to us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* the stack: from 1024px each card sticks a little lower than the one before, so its top
            edge stays visible as the next one slides over it. The cards must all be the same height
            (`auto-rows-fr` makes them as tall as the tallest): a shorter card cannot cover a taller
            one, and the last card would leave the one before it showing underneath. The empty row
            after the cards is scroll room inside the same block: it keeps the finished stack pinned
            for a moment before it scrolls away, instead of collapsing the instant the last card lands. */}
        <div
          style={{ "--rows": `repeat(${areas.length}, 1fr) auto` } as CSSProperties}
          className="mt-10 grid gap-4 lg:mt-14 lg:gap-10 lg:[grid-template-rows:var(--rows)]"
        >
          {areas.map((area, i) => (
            <article
              key={area.title}
              style={{ "--stick": `${88 + i * 18}px` } as CSSProperties}
              className="rounded-xl border border-white/15 bg-page p-6 sm:p-8 lg:sticky lg:top-[var(--stick)] lg:grid lg:min-h-[26rem] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:p-12"
            >
              <div>
                <h3 className="text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
                  {area.title}
                </h3>
                <p className="mt-4 max-w-[32ch] text-base leading-[1.6] text-white/70 sm:text-lg">{area.summary}</p>
              </div>

              <ul className="mt-8 lg:mt-0">
                {area.services.map((service) => (
                  <ServiceRow key={service.href} service={service} />
                ))}
              </ul>
            </article>
          ))}
          <div aria-hidden className="hidden lg:block" style={{ height: "24vh" }} />
        </div>
      </div>
    </section>
  );
}
