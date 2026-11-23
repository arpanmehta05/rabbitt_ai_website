import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// The two buttons of the first screen, shared by the hero options.
export default function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/contactus"
        className="group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Book a demo
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link
        href="/products"
        className="group inline-flex h-12 items-center gap-2 rounded-lg border border-white/10 px-7 text-[15px] font-medium text-white transition-colors hover:border-white/40"
      >
        Explore products
        <ArrowUpRight className="h-4 w-4 text-brand-text transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
