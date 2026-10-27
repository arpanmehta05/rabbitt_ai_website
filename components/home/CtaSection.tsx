import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The closing block, in the left column of the stage: a two-weight headline, one line of copy
// and one clear action. No box, no ornament.
export default function CtaSection() {
  return (
    <section className="pb-24 pt-6 lg:pb-36 lg:pt-10">
      <h2
        className="max-w-2xl text-[clamp(2.1rem,3.8vw,3.7rem)] leading-[1.1] tracking-[-0.035em] text-[#05060a] dark:text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="font-semibold">Put your data to work,</span>{" "}
        <span className="font-light">without ever giving it up.</span>
      </h2>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-black/65 dark:text-white/65 sm:text-xl">
        Bring one use case. We will run it on your data inside your own cloud, and show you what it
        does for your team.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Link
          href="/contactus"
          className="group inline-flex items-center gap-5 rounded-full bg-[#0061ff] py-2 pl-8 pr-2 text-[17px] font-medium text-white shadow-[0_16px_36px_-16px_rgba(0,97,255,0.85)] transition-colors duration-300 hover:bg-[#1a47d6]"
        >
          Book a demo
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0061ff] transition-transform duration-300 group-hover:-rotate-45">
            <ArrowRight className="h-5 w-5" />
          </span>
        </Link>

        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 border-b border-black/25 pb-1 text-[17px] font-medium text-[#05060a] transition-colors hover:border-[#0061ff] hover:text-[#0061ff] dark:border-white/30 dark:text-white dark:hover:border-[#4d9bff] dark:hover:text-[#4d9bff]"
        >
          Explore products
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
