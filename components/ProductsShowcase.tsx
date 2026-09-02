"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type Product = {
  name: string;
  description: string;
  href: string;
  logo?: string;
  mark: string;
};

type ProductCatalog = Record<string, Product[]>;

const PRODUCT_CATALOG: ProductCatalog = {
  Marketing: [
    { name: "IcyPluto", description: "A unified platform for marketing automation and measurable growth.", href: "https://new.icypluto.com/", logo: "/Icypluto.svg", mark: "IP" },
    { name: "IcyLingo", description: "AI-driven language content generation for teams working at scale.", href: "https://new.icypluto.com/", mark: "IL" },
    { name: "IcyLunar", description: "Social listening and competitive intelligence for faster market decisions.", href: "https://new.icypluto.com/", mark: "◐" },
    { name: "IcyQuill", description: "An AI content partner for long-form writing, refinement, and editorial flow.", href: "https://quill.icypluto.com/", logo: "/quill.svg", mark: "IQ" },
    { name: "Fire Reach", description: "Outreach automation that keeps lead engagement precise and personal.", href: "https://firereach.rabbitt.ai/", logo: "/firereach.svg", mark: "FR" },
    { name: "Pluto Circle", description: "Community marketing and audience management built around meaningful connection.", href: "https://master.d3tzbu7ir1twhi.amplifyapp.com/", mark: "PC" },
  ],
  Learning: [
    { name: "Rabbitt Learning", description: "Comprehensive AI-driven enterprise learning, upskilling, and organizational knowledge enablement.", href: "https://learning.rabbitt.ai/", logo: "/logo.svg", mark: "RL" },
    { name: "DRIP", description: "Adaptive learning experiences designed for modern, ambitious teams.", href: "https://drip.rabbitt.ai/", logo: "/drip.svg", mark: "D" },
    { name: "LMS", description: "Intelligent learning management system with AI course delivery, tracking, and compliance.", href: "https://admin.learning.rabbitt.ai/", mark: "LMS" },
    { name: "Code Bunny", description: "Interactive AI coding companion and developer learning sandbox for hands-on mastery.", href: "https://learning.rabbitt.ai/codebunny", mark: "CB" },
    { name: "AI Learning Platform Gamified", description: "Engaging, gamified AI learning journeys with interactive quests, rewards, and leaderboards.", href: "https://www.aiquest.rabbitt.ai/", logo: "/aiquest.svg", mark: "ALP" },
    { name: "OnSkill", description: "Workforce competency and skill management with a clear view of progress.", href: "https://onskill.org/", logo: "/onskill.svg", mark: "OS" },
    { name: "R Proctor", description: "Automated AI proctoring system ensuring integrity and security for online assessments.", href: "/contactus?product=r-proctor", mark: "RP" },
  ],
  Technology: [
    { name: "ChanceRAG", description: "Full-fledged enterprise RAG solution for deep document reasoning, precision, and contextual accuracy.", href: "https://rabbitt.ai/chancerag/", logo: "/chance.svg", mark: "CR" },
    { name: "HRMS", description: "Agentic AI-driven human resource management, automated employee workflows, and talent operations.", href: "/contactus?product=hrms", mark: "HR" },
    { name: "Canvas", description: "On-premise visual workflow automation and canvas for enterprise orchestration and execution.", href: "/contactus?product=canvas", mark: "CV" },
  ],
  "Ecosystem Products": [
    { name: "Voice Rabbitt", description: "Conversational voice experiences shaped for enterprise conversations.", href: "https://www.voice.rabbitt.ai/", mark: "VR" },
    { name: "Cloud Watcher", description: "Cloud cost, health, and operations intelligence for confident teams.", href: "https://cloudwatcher.rabbitt.ai/", logo: "/cloudwatcher.svg", mark: "CW" },
    { name: "Ping You", description: "Intelligent notifications and incident coordination when the signal matters.", href: "https://www.pingme.rabbitt.ai/", logo: "/pingu.svg", mark: "PY" },
  ],
};

const CATEGORY_STORAGE_KEY = "rabbitt-products-category";
const CATEGORY_CHANGE_EVENT = "rabbitt-products-category-change";
const categoryNames = Object.keys(PRODUCT_CATALOG);

function subscribeToCategory(callback: () => void) {
  window.addEventListener(CATEGORY_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CATEGORY_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readStoredCategory() {
  const storedCategory = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
  return storedCategory && Object.hasOwn(PRODUCT_CATALOG, storedCategory)
    ? storedCategory
    : "Marketing";
}

function ProductMark({ product, compact = false }: { product: Product; compact?: boolean }) {
  if (product.logo) {
    const isRabbitt = product.name === "Rabbitt Learning" || product.logo === "/logo.svg";
    return (
      <Image
        src={product.logo}
        alt={`${product.name} logo`}
        width={compact ? 84 : isRabbitt ? 280 : 200}
        height={compact ? 84 : isRabbitt ? 280 : 200}
        className={`object-contain transition-transform duration-300 ${
          compact
            ? isRabbitt
              ? "h-24 w-24"
              : "max-h-full w-auto max-w-full"
            : isRabbitt
              ? "h-44 w-44 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]"
              : "h-36 w-36 max-h-full max-w-full"
        }`}
      />
    );
  }

  return (
    <span className={`${compact ? "text-2xl" : "text-5xl sm:text-6xl"} font-semibold tracking-[-0.08em] text-white`}>
      {product.mark}
    </span>
  );
}

function getTitleSize(name: string) {
  if (name.length > 20) {
    return "text-3xl sm:text-4xl xl:text-5xl leading-[1.08] tracking-[-0.03em]";
  }
  if (name.length > 12) {
    return "text-4xl sm:text-5xl xl:text-6xl leading-[1.04] tracking-[-0.035em]";
  }
  return "text-5xl sm:text-6xl xl:text-7xl leading-[1.02] tracking-[-0.04em]";
}

export default function ProductsShowcase() {
  const selectedCategory = useSyncExternalStore(
    subscribeToCategory,
    readStoredCategory,
    () => "Marketing",
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const products = PRODUCT_CATALOG[selectedCategory] || PRODUCT_CATALOG.Marketing;

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(products.length - 1, Math.floor(progress * products.length));
    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  const activeProduct = products[activeIndex] || products[0];
  const stageHeight = useMemo(() => `${Math.max(products.length, 1) * 100}vh`, [products.length]);

  function chooseCategory(category: string) {
    if (category === selectedCategory) return;
    setActiveIndex(0);
    window.localStorage.setItem(CATEGORY_STORAGE_KEY, category);
    window.dispatchEvent(new Event(CATEGORY_CHANGE_EVENT));
  }

  return (
    <section className="bg-[#030712] text-white">
      <div className="border-b border-white/[0.09] bg-[#030712] py-4 sm:py-5">
        <div className="mx-auto flex max-w-7xl justify-center overflow-x-auto px-6 sm:px-10 lg:px-16">
          <div className="flex min-w-max gap-1 rounded-full border border-sky-300/25 bg-[#06111f] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" role="tablist" aria-label="Product categories">
            {categoryNames.map((category) => {
              const selected = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => chooseCategory(category)}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-5 ${selected ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  {selected && <motion.span layoutId="active-product-category" className="absolute inset-0 rounded-full border border-sky-300/40 bg-sky-400/[0.12]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={stageRef} className="hidden lg:block" style={{ height: stageHeight }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(14,116,144,0.11),transparent_30%),linear-gradient(116deg,#030712_16%,#061120_60%,#030712_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_88%,transparent)]" />

          <div className="relative mx-auto grid h-full max-w-7xl grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 px-8 sm:px-10 xl:px-16">
            <div className="relative flex items-center overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout" custom={activeIndex}>
                <motion.div
                  key={`${selectedCategory}-${activeProduct.name}`}
                  custom={activeIndex}
                  initial={{ x: "40%", opacity: 0, filter: "blur(7px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ x: "-35%", opacity: 0, filter: "blur(7px)" }}
                  transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute w-full max-w-2xl pr-4"
                >
                  <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">{selectedCategory}</p>
                  <h2 className={`font-bold text-white ${getTitleSize(activeProduct.name)}`}>{activeProduct.name}</h2>
                  <p className="mt-8 max-w-md text-lg leading-8 text-slate-300">{activeProduct.description}</p>
                  <Link
                    href={activeProduct.href}
                    target={activeProduct.href.startsWith("http") ? "_blank" : undefined}
                    rel={activeProduct.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
                  >
                    <span>Explore {activeProduct.name}</span>
                    <span className="text-lg transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative flex items-center justify-center">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`${selectedCategory}-${activeProduct.name}-mark`}
                  initial={{ x: "34%", opacity: 0, scale: 0.94 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: "-28%", opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[40%] left-1/2 z-10 flex w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                >
                  <div
                    className={`flex items-center justify-center transition-all duration-300 ${
                      activeProduct.logo
                        ? activeProduct.name === "Rabbitt Learning"
                          ? "h-56 w-56"
                          : "h-44 w-44"
                        : "h-36 w-36 rounded-full border border-sky-200/30 bg-[#071427]/80 shadow-[0_0_0_10px_rgba(14,116,144,0.04)]"
                    }`}
                  >
                    <ProductMark product={activeProduct} />
                  </div>
                  <span className="mt-5 text-sm font-medium tracking-[0.14em] text-slate-200">{activeProduct.name}</span>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-[22%] left-[5%] right-[5%] h-px bg-white/70" />
              <span className="absolute bottom-[calc(22%-2px)] left-[5%] h-1 w-1 -translate-x-1/2 rounded-full bg-white" />
              <span className="absolute bottom-[calc(22%-2px)] right-[5%] h-1 w-1 translate-x-1/2 rounded-full bg-white" />
              <div className="absolute bottom-[calc(22%-7px)] left-[5%] right-[5%] flex justify-between">
                {products.map((product, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <span key={product.name} className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white bg-[#030712]">
                      {index % 2 === 0 && (
                        <span
                          className={`absolute bottom-full mb-2 h-7 w-px transition-all duration-300 ${
                            isActive ? "bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-white/75"
                          }`}
                        />
                      )}
                      {index % 2 !== 0 && (
                        <span
                          className={`absolute top-full mt-2 h-7 w-px transition-all duration-300 ${
                            isActive ? "bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-white/75"
                          }`}
                        />
                      )}
                      {isActive ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_0_5px_rgba(56,189,248,0.16),0_0_20px_rgba(56,189,248,0.9)]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                      )}
                      <span
                        className={`absolute ${index % 2 === 0 ? "bottom-[calc(100%+2.15rem)]" : "top-[calc(100%+2.15rem)]"} h-px w-8 ${
                          index % 2 === 0 ? "translate-x-4" : "-translate-x-10"
                        } transition-all duration-300 ${
                          isActive ? "bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "bg-white/45"
                        }`}
                      />
                      <span
                        className={`absolute ${
                          index % 2 === 0 ? "bottom-[calc(100%+2.5rem)]" : "top-[calc(100%+2.5rem)]"
                        } ${
                          index % 2 === 0 ? "-translate-x-0.5" : "-translate-x-2"
                        } text-[11px] tracking-[0.08em] transition-all duration-300 ${
                          isActive
                            ? "font-bold text-sky-300 scale-110 drop-shadow-[0_0_12px_rgba(56,189,248,1)] [text-shadow:0_0_8px_#38bdf8,0_0_16px_#38bdf8,0_0_24px_rgba(56,189,248,0.8)]"
                            : "font-semibold text-slate-500"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Scroll to explore</p>
        </div>
      </div>

      <div className="lg:hidden">
        {products.map((product, index) => (
          <article key={product.name} className="relative overflow-hidden border-b border-white/[0.09] px-6 py-16 sm:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(14,116,144,0.13),transparent_35%)]" />
            <div className="relative mx-auto max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">{String(index + 1).padStart(2, "0")}</p>
              <div
                className={`mt-10 flex items-center justify-center transition-all duration-300 ${
                  product.logo
                    ? product.name === "Rabbitt Learning"
                      ? "h-36 w-36"
                      : "h-28 w-28"
                    : "h-32 w-32 rounded-full border border-sky-200/30 bg-[#071427]/80 shadow-[0_0_0_10px_rgba(14,116,144,0.04)]"
                }`}
              >
                <ProductMark product={product} compact />
              </div>
              <h2 className="mt-8 text-5xl font-bold leading-none tracking-[-0.06em]">{product.name}</h2>
              <p className="mt-5 text-base leading-7 text-slate-300">{product.description}</p>
              <Link
                href={product.href}
                target={product.href.startsWith("http") ? "_blank" : undefined}
                rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020305] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-slate-100"
              >
                <span>Explore {product.name}</span>
                <span className="text-base transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
