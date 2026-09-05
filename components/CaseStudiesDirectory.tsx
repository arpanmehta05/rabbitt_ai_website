"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/cms";
import { formatDate } from "@/lib/cms";

interface CaseStudiesDirectoryProps {
  studies: CaseStudy[];
  categories: string[];
}

export default function CaseStudiesDirectory({
  studies,
  categories,
}: CaseStudiesDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredStudies = useMemo(() => {
    if (activeCategory === "All") return studies;
    return studies.filter((item) => item.about === activeCategory);
  }, [studies, activeCategory]);

  return (
    <div className="space-y-12">
      {/* Clean Category Navigation */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <nav
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar"
          aria-label="Filter case studies by category"
        >
          {["All", ...categories].map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-all rounded-md cursor-pointer ${
                  isSelected
                    ? "bg-white text-[#020305] font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2-Column Gallery Grid */}
      <div className="grid gap-8 lg:gap-10 md:grid-cols-2">
        {filteredStudies.map((study, idx) => {
          const indexStr = String(idx + 1).padStart(2, "0");

          return (
            <Link
              key={study._id}
              href={`/casestudies/${study.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#040711] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-[#060b1b] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Visual Artwork Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#020408] border border-white/[0.06]">
                  {study.image ? (
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#070b16]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040711]/60 via-transparent to-transparent" />
                </div>

                {/* Domain & Date Taxonomy */}
                <div className="mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
                  <span className="text-sky-400 font-semibold">{study.about}</span>
                  <span className="text-slate-400 font-mono">{indexStr}</span>
                </div>

                {/* Headline */}
                <h2 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug group-hover:text-sky-300 transition-colors duration-200">
                  {study.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-3">
                  {study.description}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-5 text-xs">
                <span className="text-slate-400 font-mono">
                  {formatDate(study.dateAdded)}
                </span>

                <span className="inline-flex items-center gap-2 font-medium text-white transition-all duration-200 group-hover:translate-x-1 group-hover:text-sky-300">
                  <span>Explore study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
