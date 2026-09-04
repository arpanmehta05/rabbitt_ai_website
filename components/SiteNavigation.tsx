"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

type Product = {
  name: string;
  description: string;
  icon: string;
  logo?: string;
  href: string;
};

const categories: Record<string, Product[]> = {
  Marketing: [
    {
      name: "IcyPluto",
      description: "Unified platform for marketing automation and growth.",
      icon: "◇",
      logo: "/Icypluto.svg",
      href: "https://new.icypluto.com/",
    },
    {
      name: "IcyLingo",
      description: "AI-driven language content generation at scale.",
      icon: "◌",
      href: "https://new.icypluto.com/",
    },
    {
      name: "IcyLunar",
      description: "Social listening and competitive intelligence platform.",
      icon: "☾",
      href: "https://new.icypluto.com/",
    },
    {
      name: "IcyQuill",
      description: "AI content assistant for long-form writing and editing.",
      icon: "↗",
      logo: "/quill.svg",
      href: "https://quill.icypluto.com/",
    },
    {
      name: "Fire Reach",
      description: "Outreach automation and lead engagement platform.",
      icon: "♨",
      logo: "/firereach.svg",
      href: "https://firereach.rabbitt.ai/",
    },
    {
      name: "Pluto Circle",
      description: "Community marketing and audience management.",
      icon: "○",
      href: "https://master.d3tzbu7ir1twhi.amplifyapp.com/",
    },
  ],
  Learning: [
    {
      name: "Rabbitt Learning",
      description:
        "Enterprise AI learning platform and organizational enablement.",
      icon: "⬡",
      logo: "/logo.svg",
      href: "https://learning.rabbitt.ai/",
    },
    {
      name: "DRIP",
      description: "Adaptive learning experiences for modern teams.",
      icon: "◒",
      logo: "/drip.svg",
      href: "https://drip.rabbitt.ai/",
    },
    {
      name: "LMS",
      description:
        "Intelligent learning management system for workforce training.",
      icon: "▤",
      href: "https://admin.learning.rabbitt.ai/",
    },
    {
      name: "Code Bunny",
      description:
        "AI coding companion and interactive developer learning sandbox.",
      icon: "◈",
      href: "https://learning.rabbitt.ai/codebunny",
    },
    {
      name: "AI Learning Platform Gamified",
      description:
        "Gamified learning journeys with challenges, quests, and rewards.",
      icon: "❖",
      logo: "/aiquest.svg",
      href: "https://www.aiquest.rabbitt.ai/",
    },
    {
      name: "OnSkill",
      description: "Workforce competency and skill management.",
      icon: "◆",
      logo: "/onskill.svg",
      href: "https://onskill.org/",
    },
    {
      name: "R Proctor",
      description: "Automated AI proctoring and assessment integrity system.",
      icon: "⦿",
      href: "/contactus?product=r-proctor",
    },
  ],
  Technology: [
    {
      name: "ChanceRAG",
      description:
        "Full-fledged enterprise RAG and intelligent knowledge retrieval.",
      icon: "◫",
      logo: "/chance.svg",
      href: "/chancerag",
    },
    {
      name: "HRMS",
      description:
        "Agentic AI human resource management and workforce intelligence.",
      icon: "▤",
      href: "/contactus?product=hrms",
    },
    {
      name: "Canvas",
      description:
        "On-premise visual workflow automation and dynamic AI canvas.",
      icon: "▦",
      href: "/contactus?product=canvas",
    },
  ],
  "Ecosystem Products": [
    {
      name: "Voice Rabbitt",
      description: "Conversational voice experiences for enterprise.",
      icon: "◉",
      href: "https://www.voice.rabbitt.ai/",
    },
    {
      name: "Cloud Watcher",
      description: "Cloud cost, health, and operations intelligence.",
      icon: "◈",
      logo: "/cloudwatcher.svg",
      href: "https://cloudwatcher.rabbitt.ai/",
    },
    {
      name: "Ping You",
      description: "Intelligent notifications and incident coordination.",
      icon: "◌",
      logo: "/pingu.svg",
      href: "https://www.pingme.rabbitt.ai/",
    },
  ],
};

const categoryDescriptions: Record<string, string> = {
  Marketing: "AI-powered tools to grow your brand and audience.",
  Learning: "AI platforms and tools to accelerate learning and skill mastery.",
  Technology:
    "Advanced RAG systems, workforce intelligence, and collaborative workspaces.",
  "Ecosystem Products":
    "Core voice, observability, and communication platforms.",
};

const categoryNames = Object.keys(categories);

const resourceItems = [
  {
    title: "Blogs",
    description:
      "Technical breakdowns, LLM architectures, and AI engineering insights.",
    href: "/blogs",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    ),
  },
  {
    title: "Case Studies",
    description:
      "Enterprise transformations and production AI deployments in action.",
    href: "/casestudies",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: "Webinars",
    description:
      "Live masterclasses, architecture blueprints, and technical sessions.",
    href: "/webinars",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 10 4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4Z" />
        <rect width="14" height="12" x="1" y="6" rx="2" />
      </svg>
    ),
  },
];

const dataServices = [
  {
    title: "Data Annotation",
    description: "Our LLMs in action",
    href: "/services/data-annotation",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
  },
];

const dataSolutions = [
  {
    title: "CuratorsAI",
    description: "AI powered voice agent creation platform",
    href: "/curators-ai",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "NavicaAI",
    description: "Explore careers based on your skills & interest",
    href: "/navica-ai",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 10-2 2 2 2" />
        <path d="m15 10 2 2-2 2" />
      </svg>
    ),
  },
];

const serviceItems = [
  {
    title: "Content Writing",
    description: "High-volume website copy, programmatic SEO, and exam banks.",
    href: "/services/content-writing",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Content Strategy",
    description:
      "Data-driven editorial planning and multi-channel AI distribution.",
    href: "/services/content-strategy",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    title: "Video Editing & Generation",
    description: "AI-powered generative video production and motion workflows.",
    href: "/services/video-editing",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="15" height="14" x="2" y="5" rx="2" />
        <path d="m22 7-5 5 5 5V7z" />
      </svg>
    ),
  },
  {
    title: "University Training Programs",
    description:
      "Hands-on GenAI curriculum, workshops, and student enablement.",
    href: "/services/university-training",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Website Revamp Services",
    description:
      "Modern, high-converting digital web experiences built for the AI era.",
    href: "/services/website-revamp",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Corporate Trainings",
    description:
      "Custom enterprise upskilling for technical teams and leadership.",
    href: "/services/corporate-trainings",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

interface SiteNavigationProps {
  opacity?: MotionValue<number> | number;
  brandTargetRef?: RefObject<HTMLDivElement | null>;
}

export default function SiteNavigation({
  opacity = 1,
  brandTargetRef,
}: SiteNavigationProps = {}) {
  const [openMenu, setOpenMenu] = useState<
    "products" | "services" | "data" | "resources" | null
  >(null);
  const [activeCategory, setActiveCategory] = useState("Marketing");
  const navigationRef = useRef<HTMLElement>(null);
  const products = categories[activeCategory];

  const handleCategoryNavigate = (category: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rabbitt-products-category", category);
      window.dispatchEvent(new Event("rabbitt-products-category-change"));
    }
    setOpenMenu(null);
  };

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (openMenu && !navigationRef.current?.contains(event.target as Node))
        setOpenMenu(null);
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
      className="font-sans pointer-events-auto fixed inset-x-0 top-0 z-[100] border-b border-white/[0.08] bg-[#030507]/90 backdrop-blur-xl"
    >
      <nav
        ref={navigationRef}
        className="relative mx-auto flex h-16 max-w-[1600px] items-center px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            ref={brandTargetRef}
            className="flex h-10 w-10 shrink-0 items-center justify-center"
          >
            <Image
              src="/logo.svg"
              alt="Rabbitt"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="font-sans text-[1.5rem] font-bold tracking-[-0.02em] bg-gradient-to-r from-[#9AD5FF] via-[#4895FF] to-[#0061FF] bg-clip-text text-transparent">
            Rabbitt
          </span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-7 text-[0.95rem] text-slate-100 xl:gap-8">
          <button
            type="button"
            onClick={() =>
              setOpenMenu((value) => (value === "data" ? null : "data"))
            }
            aria-expanded={openMenu === "data"}
            className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "data" ? "text-sky-400" : ""}`}
          >
            Data <Chevron open={openMenu === "data"} />
          </button>
          <button
            type="button"
            onClick={() =>
              setOpenMenu((value) => (value === "products" ? null : "products"))
            }
            aria-expanded={openMenu === "products"}
            className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "products" ? "text-sky-400" : ""}`}
          >
            Products <Chevron open={openMenu === "products"} />
          </button>
          <button
            type="button"
            onClick={() =>
              setOpenMenu((value) => (value === "services" ? null : "services"))
            }
            aria-expanded={openMenu === "services"}
            className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "services" ? "text-sky-400" : ""}`}
          >
            Services <Chevron open={openMenu === "services"} />
          </button>
          <button
            type="button"
            onClick={() =>
              setOpenMenu((value) =>
                value === "resources" ? null : "resources",
              )
            }
            aria-expanded={openMenu === "resources"}
            className={`flex items-center gap-2 transition-colors hover:text-sky-300 ${openMenu === "resources" ? "text-sky-400" : ""}`}
          >
            Resources <Chevron open={openMenu === "resources"} />
          </button>
          <Link href="/ainama" className="transition-colors hover:text-sky-300">
            AINama
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-6 text-[0.95rem]">
          <Link
            href="/contactus"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_6px_24px_rgba(255,255,255,0.15)]"
          >
            Book a Demo{" "}
            <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <AnimatePresence>
          {openMenu === "products" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="no-scrollbar absolute left-1/2 top-[calc(100%+1px)] w-[calc(100vw-6rem)] max-w-[76rem] -translate-x-1/2 overflow-hidden rounded-b-[1.3rem] border border-white/[0.14] bg-[#060b13] shadow-[0_24px_60px_rgba(0,0,0,0.62)]"
            >
              <div className="grid grid-cols-[18rem_minmax(0,1fr)] overflow-hidden rounded-[1.25rem]">
                <aside className="flex flex-col justify-between border-r border-white/[0.12] p-5">
                  <div className="space-y-1">
                    {categoryNames.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-[0.95rem] transition-colors ${activeCategory === category ? "bg-[#0e1b30] text-sky-400" : "text-slate-100 hover:bg-white/[0.04] hover:text-sky-200"}`}
                      >
                        <span>{category}</span>
                        <span className="text-2xl font-light text-slate-400 transition-transform group-hover:translate-x-1">
                          ›
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl border border-white/[0.12] px-5 py-5 text-center">
                    <p className="text-base text-slate-200">
                      Not sure where to start?
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      We&apos;ll help you find the right solution.
                    </p>
                    <Link
                      href="/contactus"
                      onClick={() => setOpenMenu(null)}
                      className="mt-4 inline-flex items-center gap-2 text-base text-sky-400 transition-colors hover:text-sky-200"
                    >
                      Talk to Rabbitt AI <span className="text-xl">→</span>
                    </Link>
                  </div>
                </aside>

                <section className="grid grid-cols-1 grid-rows-1 min-w-0 px-7 py-5">
                  {categoryNames.map((cat) => {
                    const isSelected = activeCategory === cat;
                    const catProducts = categories[cat] || [];
                    return (
                      <div
                        key={cat}
                        className={`col-start-1 row-start-1 flex min-w-0 flex-col justify-between transition-opacity duration-150 ${
                          isSelected
                            ? "opacity-100 z-10"
                            : "pointer-events-none opacity-0 invisible"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="border-b border-white/[0.12] pb-4">
                            <h2 className="text-[1.5rem] font-semibold tracking-[-0.04em] text-white">
                              {cat}
                            </h2>
                            <p className="mt-1.5 text-sm text-slate-400">
                              {categoryDescriptions[cat] ||
                                "AI-powered tools to grow your brand and audience."}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-x-12">
                            {catProducts.map((product) => {
                              const isExternal =
                                product.href.startsWith("http");
                              return (
                                <Link
                                  key={product.name}
                                  href={product.href}
                                  target={isExternal ? "_blank" : undefined}
                                  rel={
                                    isExternal
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  onClick={() => setOpenMenu(null)}
                                  tabIndex={isSelected ? 0 : -1}
                                  className="group flex min-w-0 items-center gap-3.5 border-b border-white/[0.08] py-3"
                                >
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111a2b] p-1 text-xl text-white">
                                    {product.logo ? (
                                      <Image
                                        src={product.logo}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className={`object-contain ${
                                          product.name === "PingU" ||
                                          product.name === "Ping You" ||
                                          product.name === "DRIP"
                                            ? "h-6 w-9"
                                            : product.name ===
                                                "Rabbitt Learning"
                                              ? "h-9 w-9 scale-110"
                                              : "h-8 w-8"
                                        }`}
                                      />
                                    ) : (
                                      product.icon
                                    )}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-base font-semibold text-white">
                                      {product.name}
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-5 text-slate-400">
                                      {product.description}
                                    </span>
                                  </span>
                                  <span className="text-xl font-light text-slate-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                                    →
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                        <div className="pt-4">
                          <Link
                            href="/products"
                            onClick={() => handleCategoryNavigate(cat)}
                            tabIndex={isSelected ? 0 : -1}
                            className="inline-flex items-center gap-2 text-sm text-sky-400 transition-colors hover:text-sky-200"
                          >
                            Explore all products{" "}
                            <span className="text-lg">→</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </div>
            </motion.div>
          )}

          {openMenu === "data" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%+1px)] w-[26rem] max-w-[calc(100vw-2rem)] -translate-x-[75%] rounded-2xl border border-white/[0.14] bg-[#060b13] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.62)] backdrop-blur-2xl"
            >
              {/* Services section */}
              <div className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                Services
              </div>
              <div className="space-y-1">
                {dataServices.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-white transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
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

              {/* Solutions section */}
              <div className="mt-3 px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                Solutions
              </div>
              <div className="space-y-1">
                {dataSolutions.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-white transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
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

          {openMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-[calc(100%+1px)] w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-[42%] rounded-2xl border border-white/[0.14] bg-[#060b13] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.62)] backdrop-blur-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {serviceItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setOpenMenu(null)}
                    className="group flex items-start gap-3.5 rounded-xl p-3.5 transition-colors hover:bg-white/[0.05]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-white transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
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
              <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.08] px-3.5 pt-3 text-xs text-slate-400">
                <span>Looking for bespoke AI advisory or engineering?</span>
                <Link
                  href="/contactus"
                  onClick={() => setOpenMenu(null)}
                  className="flex items-center gap-1.5 font-medium text-sky-400 transition-colors hover:text-sky-300"
                >
                  Book a consultation <span aria-hidden="true">→</span>
                </Link>
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
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111a2b] text-white transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-500/10">
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
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
