import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The closing block, in the left column of the stage: one headline, one line of copy, one primary
// button and one text link (design.md §8, CTA block). No box, no ornament. A Server Component.
export default function CtaSection() {
  return (
    <section aria-labelledby="cta-title" className="py-12 md:py-16 lg:py-24">
      <h2
        id="cta-title"
        className="max-w-2xl text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white"
      >
        Put your data to work, without ever giving it up.
      </h2>

      <p className="mt-6 max-w-[34rem] text-base leading-[1.6] text-white/70 sm:text-lg">
        Bring one use case. We will run it on your data inside your own cloud, and show you what it
        does for your team.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link
          href="/contactus"
          className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Book a demo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
        >
          Explore products
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
