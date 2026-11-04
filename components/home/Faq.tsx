import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

// The questions buyers ask before they write to us (design.md §1: "can I trust you → how do I
// start"). Dark page, one heading, hairlines instead of boxes (§3, §8). A Server Component with no
// script: each question is a native <details>, and `name` makes the browser keep one open at a time.
// The answers are also sent as FAQPage data for search engines.

const faqs = [
  {
    q: "What makes Rabbitt AI different from using a generic LLM API?",
    a: "A generic API gives you raw model access. We build the layer around it: deployment in your own cloud, retrieval grounded in your own data, and ongoing tuning. The result is AI that knows your business instead of a general assistant that guesses at it.",
  },
  {
    q: "Is our data used to train or improve shared models?",
    a: "No. Deployments run inside your private cloud with zero data retention. Your data, queries and outputs are never used to train shared models and never leave your environment.",
  },
  {
    q: "Do we need to migrate our data first?",
    a: "No. We work with your existing warehouses, CRMs, knowledge bases and internal APIs. Retrieval pipelines sit alongside your data, so nothing has to be moved or replatformed.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most engagements go from a first proof of concept to production in 4 to 8 weeks. We follow five stages (discovery, data foundation, model strategy, delivery and optimisation), so the timeline is set early and does not drift.",
  },
  {
    q: "Do you support on-premise or air-gapped deployments?",
    a: "Yes. For teams with strict data sovereignty needs, such as government, financial services and healthcare, we run fully on-premise and air-gapped, with no external network dependency.",
  },
  {
    q: "What does an engagement look like?",
    a: "There are three models: a fixed-scope project, a managed retainer for ongoing optimisation and support, and hosted licences of our products for teams that want to start without a full implementation. We recommend the one that fits your goals and team.",
  },
  {
    q: "Which products can we use?",
    a: "IcyPluto, DRIP, RAW, Cloud Watcher and ChanceRAG. You can adopt one on its own or several together, and we can build custom solutions on top of them.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="rb-section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="rb-container grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="faq-title"
            className="max-w-md text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
          >
            Questions we hear before we start.
          </h2>
          <p className="mt-6 max-w-[28rem] text-base leading-[1.6] text-white/70 sm:text-lg">
            Cannot find yours? Tell us what you are trying to build and we will answer it directly.
          </p>
          <Link
            href="/contactus"
            className="group mt-8 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            Talk to us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="border-t border-white/10">
          {faqs.map(({ q, a }) => (
            <details key={q} name="faq" className="rb-faq group border-b border-white/10">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-medium leading-snug text-white transition-colors marker:hidden hover:text-brand-text [&::-webkit-details-marker]:hidden">
                {q}
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-white/55 transition-[transform,color] duration-500 ease-out group-open:rotate-45 group-open:text-brand-text"
                />
              </summary>
              <p className="rb-faq__answer max-w-[40rem] pb-6 pr-10 text-base leading-[1.65] text-white/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
