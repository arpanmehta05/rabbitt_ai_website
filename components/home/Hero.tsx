import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroGradient from "./HeroGradient";

const links = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services/content-strategy" },
  { label: "Resources", href: "/blogs" },
  { label: "About", href: "/about" },
];

const serif = { fontFamily: "var(--font-serif-display), 'Times New Roman', serif" } as const;

// One screen: an announcement bar, the navigation, and a centred headline over a soft blue and
// pink glow that follows the pointer.
export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col bg-white text-[#05060a]">
      <HeroGradient className="absolute inset-0" />

      {/* navigation */}
      <header className="relative z-10 border-b border-black/[0.06] bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
          <div className="flex items-center gap-7">
            <Link href="/" aria-label="Rabbitt AI home" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="" width={36} height={36} className="h-9 w-9" priority />
              <span className="bg-gradient-to-r from-[#0061ff] to-[#4d9bff] bg-clip-text pb-0.5 text-[1.4rem] font-semibold leading-none tracking-[-0.045em] text-transparent" style={{ fontFamily: "var(--font-display)" }}>
                Rabbitt AI
              </span>
            </Link>
            <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-[15px] text-black/75 transition-colors hover:bg-black/[0.05] hover:text-black">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/contactus" className="hidden h-10 items-center rounded-full border border-black/80 px-4 text-[14.5px] font-medium transition-colors hover:bg-black hover:text-white sm:inline-flex">
              Request a demo
            </Link>
            <Link href="/contactus" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#0061ff] px-5 text-[14.5px] font-medium text-white transition-colors hover:bg-[#1a47d6]">
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* the headline */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-24 pt-10 text-center">
        <h1 className="max-w-[14ch] text-[clamp(3rem,8.6vw,6.5rem)] font-normal leading-[1] tracking-[-0.015em]" style={serif}>
          Own your data. Own your AI.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[clamp(0.95rem,1.5vw,1.08rem)] leading-relaxed text-black/55">
          Private models and agents that run inside your own cloud. Nothing leaves, and the weights are yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contactus" className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#0061ff] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#1a47d6]">
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/products" className="inline-flex h-12 items-center rounded-full border border-black/80 bg-white/40 px-6 text-[15px] font-medium transition-colors hover:bg-black hover:text-white">
            Explore products
          </Link>
        </div>
      </div>
    </section>
  );
}
