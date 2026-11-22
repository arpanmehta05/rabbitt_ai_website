"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ListingItem } from "@/lib/listing";
import { Filters, Meta, PostCard } from "./ListingParts";

const ALL = "All stories";

// the headline number of a story, when its title has one ("Achieving 80% reduction…" → "80%")
const metricOf = (title: string) => title.match(/\d+(?:\.\d+)?\s?%|\d+(?:\.\d+)?x\b/i)?.[0].replace(/\s/g, "") ?? null;

// The case study index under the header (Figma "Case studies – Desktop 1440"): filters and a count, one
// story large with its number, then the others in three columns.
export default function CaseIndex({ items, categories }: { items: ListingItem[]; categories: string[] }) {
  const [active, setActive] = useState(ALL);
  const matches = useMemo(() => (active === ALL ? items : items.filter((i) => i.category === active)), [items, active]);

  // lead with a story that has a number to show, else the newest
  const lead = matches.find((i) => metricOf(i.title)) ?? matches[0];
  const others = matches.filter((i) => i !== lead);
  const metric = lead ? metricOf(lead.title) : null;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-white/50 sm:text-[14px]">
          {matches.length} {matches.length === 1 ? "story" : "stories"}
        </p>
        <Filters label="Filter stories" options={[ALL, ...categories]} active={active} onChange={setActive} />
      </div>

      {lead && (
        <Link
          href={lead.href}
          className="group mt-8 grid gap-6 border-b border-white/[0.08] pb-12 lg:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start lg:gap-12 lg:pb-16"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
            {lead.image && (
              <Image
                src={lead.image}
                alt=""
                fill
                preload
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            )}
          </div>
          <div className="flex h-full flex-col">
            <Meta item={lead} className="lg:mt-2" />
            {metric && (
              <p className="mt-4 text-[72px] font-semibold leading-none tracking-[-0.05em] text-brand-text lg:mt-6 lg:text-[96px]">
                {metric}
              </p>
            )}
            <h2 className="mt-5 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-white lg:text-[22px]">{lead.title}</h2>
            {lead.description && (
              <p className="mt-3 line-clamp-3 text-[15px] leading-[1.55] text-white/65 lg:text-[16px]">{lead.description}</p>
            )}
            <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-white lg:mt-auto lg:pt-8">
              Read the story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}

      {others.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-y-12 lg:mt-12 lg:grid-cols-3">
          {others.map((item) => (
            <PostCard key={item.id} item={item} phone="stack" />
          ))}
        </div>
      )}
    </>
  );
}
