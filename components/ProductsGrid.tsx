"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductItem {
  name: string;
  category: string;
  description: string;
  logo?: string;
  icon?: string;
  badge?: string;
}

const allProducts: ProductItem[] = [
  // Marketing
  {
    name: "IcyPluto",
    category: "Marketing",
    description: "Unified platform for marketing automation, campaign intelligence, and customer growth.",
    logo: "/Icypluto.svg",
    badge: "Automation",
  },
  {
    name: "IcyLingo",
    category: "Marketing",
    description: "AI-driven language and localized content generation across global enterprise markets.",
    icon: "◌",
    badge: "Localization",
  },
  {
    name: "IcyLunar",
    category: "Marketing",
    description: "Real-time social listening, trend analysis, and competitive intelligence platform.",
    icon: "☾",
    badge: "Intelligence",
  },
  {
    name: "IcyQuill",
    category: "Marketing",
    description: "AI assistant for long-form enterprise copywriting, technical writing, and narrative editing.",
    logo: "/quill.svg",
    badge: "Content",
  },
  {
    name: "Fire Reach",
    category: "Marketing",
    description: "High-precision outreach automation, automated sequences, and multi-channel lead engagement.",
    logo: "/firereach.svg",
    badge: "Outreach",
  },
  {
    name: "Pluto Circle",
    category: "Marketing",
    description: "Community marketing, advocacy management, and brand audience coordination.",
    icon: "○",
    badge: "Community",
  },

  // Learning
  {
    name: "Drip",
    category: "Learning",
    description: "Adaptive, personalized learning experiences and skill reinforcement for modern enterprise teams.",
    logo: "/drip.svg",
    badge: "Adaptive",
  },
  {
    name: "OnSkill",
    category: "Learning",
    description: "Workforce competency tracking, talent readiness mapping, and skill gap management.",
    logo: "/onskill.svg",
    badge: "Competency",
  },
  {
    name: "AI Quest",
    category: "Learning",
    description: "Gamified enterprise AI learning platform with interactive challenges, quests, and certifications.",
    logo: "/aiquest.svg",
    badge: "Gamified",
  },

  // Technology
  {
    name: "ChanceRAG",
    category: "Technology",
    description: "Enterprise retrieval-augmented generation and deep knowledge base intelligence engine.",
    logo: "/chance.svg",
    badge: "Retrieval",
  },
  {
    name: "Cloud Watcher",
    category: "Technology",
    description: "Autonomous cloud infrastructure cost optimization, telemetry health, and operations insights.",
    logo: "/cloudwatcher.svg",
    badge: "Operations",
  },

  // Independent Products
  {
    name: "Voice Rabbitt",
    category: "Independent Products",
    description: "Low-latency conversational voice AI experiences engineered for enterprise telephony and apps.",
    icon: "◉",
    badge: "Voice AI",
  },
  {
    name: "PingU",
    category: "Independent Products",
    description: "Intelligent notifications, incident alerting, and proactive team coordination.",
    logo: "/pingu.svg",
    badge: "Alerts",
  },

  // Other Initiatives
  {
    name: "AI World",
    category: "Other Initiatives",
    description: "A global open collaboration network dedicated to advancing safe and responsible AI.",
    icon: "✦",
    badge: "Global",
  },
  {
    name: "GMA Council",
    category: "Other Initiatives",
    description: "Global Model Alignment Council driving cross-industry governance and thought leadership.",
    icon: "◎",
    badge: "Governance",
  },
];

const filterCategories = [
  "All",
  "Marketing",
  "Learning",
  "Technology",
  "Independent Products",
  "Other Initiatives",
];

export default function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <section id="products-catalog" className="relative z-10 bg-[#020305] py-24 sm:py-32 text-white border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
              Enterprise Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Engineered for real outcomes.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-slate-400">
            Explore our specialized AI products built to transform customer experiences, operations, and talent.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white text-[#020305] shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "border border-white/[0.12] bg-white/[0.03] text-slate-300 hover:border-sky-400/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Products */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.09] bg-[#070e1b]/70 p-7 backdrop-blur-md transition-all duration-300 hover:border-sky-400/40 hover:bg-[#0a1528] hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)]"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#111a2b] p-2 text-2xl text-sky-400 shadow-inner">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt=""
                          width={44}
                          height={44}
                          className={`object-contain ${
                            item.name === "PingU" || item.name === "Drip"
                              ? "h-8 w-11"
                              : "h-10 w-10"
                          }`}
                        />
                      ) : (
                        item.icon
                      )}
                    </span>
                    {item.badge && (
                      <span className="rounded-md border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-sky-300">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white group-hover:text-sky-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Product Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action / Link */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                  <span>Explore product</span>
                  <span className="text-base leading-none transition-transform group-hover:translate-x-1 text-sky-400">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
