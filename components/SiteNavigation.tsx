"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

type Product = { name: string; description: string; icon: string; logo?: string };

const categories: Record<string, Product[]> = {
  Marketing: [
    { name: "IcyPluto", description: "Unified platform for marketing automation and growth.", icon: "◇", logo: "/Icypluto.svg" },
    { name: "IcyLingo", description: "AI-driven language content generation at scale.", icon: "◌" },
    { name: "IcyLunar", description: "Social listening and competitive intelligence platform.", icon: "☾" },
    { name: "IcyQuill", description: "AI content assistant for long-form writing and editing.", icon: "↗", logo: "/quill.svg" },
    { name: "Fire Reach", description: "Outreach automation and lead engagement platform.", icon: "♨", logo: "/firereach.svg" },
    { name: "Pluto Circle", description: "Community marketing and audience management.", icon: "○" },
  ],
  Learning: [
    { name: "Drip", description: "Adaptive learning experiences for modern teams.", icon: "◒", logo: "/drip.svg" },
    { name: "OnSkill", description: "Workforce competency and skill management.", icon: "◆", logo: "/onskill.svg" },
  ],
  Technology: [
    { name: "ChanceRAG", description: "Enterprise retrieval and knowledge intelligence.", icon: "⌘", logo: "/chance.svg" },
    { name: "Cloud Watcher", description: "Cloud cost, health, and operations intelligence.", icon: "◈", logo: "/cloudwatcher.svg" },
  ],
  "Independent Products": [
    { name: "Voice Rabbitt", description: "Conversational voice experiences for enterprise.", icon: "◉" },
    { name: "PingU", description: "Intelligent notifications and incident coordination.", icon: "◌", logo: "/pingu.svg" },
  ],
  "Other Initiatives": [
    { name: "AI World", description: "A global network advancing responsible AI.", icon: "✦" },
    { name: "GMA Council", description: "Industry collaboration and thought leadership.", icon: "◎" },
  ],
};

const categoryNames = Object.keys(categories);

const resourceItems = [
  {
    title: "Blogs",
    description: "Technical breakdowns, LLM architectures, and AI engineering insights.",
    href: "/blogs",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
  {
    title: "Case Studies",
    description: "Enterprise transformations and production AI deployments in action.",
    href: "/casestudies",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

interface SiteNavigationProps {
  opacity?: MotionValue<number> | number;
  brandTargetRef?: RefObject<HTMLDivElement | null>;
}

export default function SiteNavigation({ opacity = 1, brandTargetRef }: SiteNavigationProps = {}) {
  const [openMenu, setOpenMenu] = useState<"products" | "resources" | null>(null);
  const [activeCategory, setActiveCategory] = useState("Marketing");
  const navigationRef = useRef<HTMLElement>(null);
  const products = categories[activeCategory];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (openMenu && !navigationRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const closeOnPageScroll = () => setOpenMenu(null);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", closeOnPageScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", closeOnPageScroll);
    };
  }, [openMenu]);

  return (
    <motion.header
      style={{ opacity }}
      className="pointer-events-auto fixed inset-x-0 top-0 z-[100] border-b border-white/[0.08] bg-[#030507]/90 backdrop-blur-xl"
    >
      <nav ref={navigationRef} className="relative mx-auto flex h-16 max-w-[1600px] items-center px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3">
          <div ref={brandTargetRef} className="flex h-10 w-10 shrink-0 items-center justify-center">
            <Image src="/logo.svg" alt="Rabbitt" width={40} height={40} className="h-10 w-10 object-contain" />
          </div>
          <span className="text-[1.5rem] font-bold tracking-[-0.02em] bg-gradient-to-r from-[#9AD5FF] via-[#4895FF] to-[#0061FF] bg-clip-text text-transparent">
            Rabbitt
          </span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-7 text-[0.95rem] text-slate-100 xl:gap-8">
          <a href="#llm" className="transition-colors hover:text-sky-300">LLM</a>
          <a href="#data" className="transition-colors hover:text-sky-300">Data</a>
          <button type="button" onClick={() => setOpenMenu((value) => value === "products" ? null : "products")} aria-expanded={openMenu === "products"} className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "products" ? "text-sky-400" : ""}`}>
            Products <Chevron open={openMenu === "products"} />
          </button>
          <a href="#services" className="flex items-center gap-2 transition-colors hover:text-sky-300">Services <Chevron /></a>
          <button type="button" onClick={() => setOpenMenu((value) => value === "resources" ? null : "resources")} aria-expanded={openMenu === "resources"} className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "resources" ? "text-sky-400" : ""}`}>
            Resources <Chevron open={openMenu === "resources"} />
          </button>
          <a href="#ainama" className="transition-colors hover:text-sky-300">AINama</a>
        </div>

        <div className="ml-auto flex items-center gap-6 text-[0.95rem]">
          <Link href="/contactus" className="inline-flex items-center gap-3 rounded-lg border border-sky-300/65 px-4 py-2 text-slate-50 transition-colors hover:border-sky-200 hover:text-sky-100">Book a Demo <span className="text-xl leading-none">→</span></Link>
        </div>

        <AnimatePresence>
          {openMenu === "products" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%+1px)] w-[calc(100vw-6rem)] max-w-[76rem] -translate-x-1/2 rounded-b-[1.3rem] border border-white/[0.14] bg-[#060b13] shadow-[0_24px_60px_rgba(0,0,0,0.62)]"
            >
              <div className="grid grid-cols-[19rem_minmax(0,1fr)] overflow-hidden rounded-[1.25rem]">
                <aside className="flex flex-col border-r border-white/[0.12] p-6">
                  <div className="space-y-1">
                    {categoryNames.map((category) => (
                      <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[1rem] transition-colors ${activeCategory === category ? "bg-[#0e1b30] text-sky-400" : "text-slate-100 hover:bg-white/[0.04] hover:text-sky-200"}`}>
                        <span>{category}</span><span className="text-2xl font-light text-slate-400 transition-transform group-hover:translate-x-1">›</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl border border-white/[0.12] px-6 py-6 text-center">
                    <p className="text-base text-slate-200">Not sure where to start?</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">We&apos;ll help you find the right solution.</p>
                    <Link href="/contactus" onClick={() => setOpenMenu(null)} className="mt-5 inline-flex items-center gap-2 text-base text-sky-400 transition-colors hover:text-sky-200">Talk to Rabbitt AI <span className="text-xl">→</span></Link>
                  </div>
                </aside>

                <section className="flex min-w-0 flex-col p-7">
                  <div className="border-b border-white/[0.12] pb-5">
                    <h2 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-white">{activeCategory}</h2>
                    <p className="mt-2 text-base text-slate-400">AI-powered tools to grow your brand and audience.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16">
                    {products.map((product) => (
                      <Link key={product.name} href="/products" onClick={() => setOpenMenu(null)} className="group flex min-w-0 items-center gap-4 border-b border-white/[0.1] py-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111a2b] p-1 text-2xl text-sky-400">
                          {product.logo ? (
                            <Image
                              src={product.logo}
                              alt=""
                              width={44}
                              height={44}
                              className={`object-contain ${
                                product.name === "PingU" || product.name === "Drip"
                                   ? "h-7 w-10"
                                   : "h-9 w-9"
                              }`}
                            />
                          ) : (
                            product.icon
                          )}
                        </span>
                        <span className="min-w-0 flex-1"><span className="block text-lg font-semibold text-white">{product.name}</span><span className="mt-1 block text-sm leading-6 text-slate-400">{product.description}</span></span>
                        <span className="text-2xl font-light text-slate-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">→</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/products" onClick={() => setOpenMenu(null)} className="inline-flex items-center gap-2 pt-6 text-base text-sky-400 transition-colors hover:text-sky-200">Explore all products <span className="text-xl">→</span></Link>
                </section>
              </div>
            </motion.div>
          )}

          {openMenu === "resources" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%+1px)] w-[25rem] max-w-[calc(100vw-2rem)] translate-x-[2%] rounded-2xl border border-white/[0.14] bg-[#060b13] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.62)] backdrop-blur-2xl"
            >
              <div className="space-y-1">
                {resourceItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="group flex items-start gap-3.5 rounded-xl p-3.5 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-sky-400 transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white transition-colors group-hover:text-sky-300">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

function Chevron({ open = false }: { open?: boolean }) {
  return <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

