import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whiteButton } from "./ui";

// The column beside the form (Figma): email, phone, and two ways to look around first.
export default function ContactRail() {
  const block = "bg-white/[0.04] p-5 py-6 lg:p-8";
  const head = "text-[18px] font-semibold tracking-[-0.02em] text-white lg:text-[20px]";
  const note = "mt-2 text-[14px] leading-[1.5] text-white/60 lg:text-[15px]";
  return (
    <div className="flex flex-col gap-4">
      <div className={block}>
        <h3 className={head}>Email us</h3>
        <a href="mailto:sales@rabbitt.ai" className="mt-2 block text-[20px] font-medium tracking-[-0.02em] text-brand-text hover:underline lg:text-[22px]">
          sales@rabbitt.ai
        </a>
        <p className={note}>For pricing, pilots and anything else.</p>
      </div>
      <div className={block}>
        <h3 className={head}>Talk with us</h3>
        <a href="tel:+919911059386" className="mt-2 block text-[20px] font-medium tracking-[-0.02em] text-white hover:underline lg:text-[22px]">
          +91 99110 59386
        </a>
        <p className={note}>Monday to Friday, during working hours.</p>
      </div>
      <div className={block}>
        <h3 className={head}>See what we build</h3>
        <p className={note}>IcyPluto, DRIP, RAW, Cloud Watcher and ChanceRAG, each running on your own data.</p>
        <Link href="/products" className={`${whiteButton} mt-5 h-11`}>
          Explore products
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      <div className={block}>
        <h3 className={head}>Read the results</h3>
        <p className={note}>How teams cut hallucinations, labelled data and shipped voice agents with us.</p>
        <Link href="/casestudies" className={`${whiteButton} mt-5 h-11`}>
          Read case studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
