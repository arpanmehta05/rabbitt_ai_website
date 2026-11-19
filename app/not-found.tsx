import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Buttons from "@/components/home/hero-options/Buttons";
import CtaSection from "@/components/home/CtaSection";
import MainFooter from "@/components/home/MainFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// real pages, in the order a visitor most likely wants them
const destinations = [
  { name: "Products", detail: "Private AI that runs in your own cloud.", href: "/products" },
  { name: "Services", detail: "Data, content and training, for every stage of adopting AI.", href: "/#services" },
  { name: "Case studies", detail: "Results from work already in production.", href: "/casestudies" },
  { name: "About", detail: "Who we are and how we work.", href: "/about" },
  { name: "Blogs", detail: "Notes on private and sovereign AI.", href: "/blogs" },
  { name: "Contact", detail: "Tell us what you are building.", href: "/contactus" },
];

// The 404 page, built from the home page's own parts: the first screen's gradient lettering and
// buttons, the Services section's bordered card with its hairline link rows, and the closing block.
// No pictures, no glow.
export default function NotFound() {
  return (
    <>
      <Navbar theme="dark" />
      <main className="dark bg-page text-white selection:bg-blue-600 selection:text-white">
        <section className="rb-container grid min-h-svh items-center gap-12 pb-16 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p
              aria-hidden
              className="select-none bg-[linear-gradient(100deg,#fff_23%,#e2edff_43%,#85b5ff_70%,#317df3_100%)] bg-clip-text pr-[0.06em] text-[clamp(6.5rem,17vw,15rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-transparent"
            >
              404
            </p>
            <h1 className="mt-6 max-w-[16ch] text-balance text-[clamp(2.25rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.035em]">
              This page is not in our data.
            </h1>
            <p className="mt-5 max-w-[42ch] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-white/70">
              The link may be old, or the page may have moved. Go back to the start, or pick one of
              the pages on the right.
            </p>
            <div className="mt-10">
              <Buttons />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-10">
            <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-semibold tracking-[-0.025em]">Where to next</h2>
            <ul className="mt-6">
              {destinations.map((d) => (
                <li key={d.href} className="border-b border-white/10 first:border-t">
                  <Link href={d.href} className="group flex items-center justify-between gap-6 py-4 sm:py-5">
                    <span className="flex flex-col gap-1">
                      <span className="text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-brand-text">
                        {d.name}
                      </span>
                      <span className="max-w-[44ch] text-[15px] leading-snug text-white/65">{d.detail}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-white/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-text"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="relative overflow-hidden border-t border-white/[0.08]">
          <div className="rb-container relative">
            <CtaSection />
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
