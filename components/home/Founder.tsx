import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// A real person behind the company (design.md §1: "can I trust you"). Nothing here is written for
// the page: the quote is the founder's own, as published in Rabbitt's funding announcement, and the
// facts are the ones in that announcement, worded the way it words them (the investors are angel
// investors from NVIDIA, Meta and Microsoft, not those companies themselves). It links to the
// announcement. The photo is a real photograph (§14), shown in its own colours (the owner chose
// that over black and white).
//
// The quote is the section's only headline; the name sits under it, never above (§16). A Server
// Component with no script; the rise-in is CSS (.rb-reveal).

const ANNOUNCEMENT = "/blogs/rabbittai-raises-21-million-from-tc-group-of-companies";

export default function Founder() {
  return (
    <section aria-label="The founder" className="rb-section">
      <div className="rb-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-20">
        <div className="rb-reveal">
          <div className="relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-xl border border-white/10 bg-raised">
            <Image
              src="/assets/harneetsingh.png"
              alt="Harneet Singh, founder of Rabbitt AI"
              width={800}
              height={800}
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        </div>

        <figure className="rb-reveal">
          <blockquote className="text-[clamp(1.5rem,2.9vw,2.625rem)] font-medium leading-[1.22] tracking-[-0.02em] text-white">
            &ldquo;In the new world, we are helping companies become the landlords of AI world rather than just the
            tenants like the past Internet world.&rdquo;
          </blockquote>

          <figcaption className="mt-8">
            <p className="text-base font-medium text-white">Harneet Singh</p>
            <p className="mt-1 text-[15px] text-white/65">Founder, Rabbitt AI</p>
          </figcaption>

          <p className="mt-8 max-w-[56ch] text-base leading-[1.65] text-white/70 sm:text-lg">
            A serial entrepreneur and IIT Delhi alum who has built five companies from scratch. In 2024 Rabbitt AI
            raised a $2.1 million seed round, with participation from TC Group and angel investors from NVIDIA, Meta
            and Microsoft.
          </p>

          <Link
            href={ANNOUNCEMENT}
            className="group mt-4 inline-flex items-center gap-1.5 py-3 text-[15px] font-medium text-brand-text underline-offset-4 transition-colors hover:underline"
          >
            Read the announcement
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </figure>
      </div>
    </section>
  );
}
