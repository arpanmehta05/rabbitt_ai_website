"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { WHAT_WE_DO } from "./contactData";

// "What we can do for you" (Figma): Services, Products and Data as tabs, three cards each. A card is
// a box with the name in the middle, then one line and a link under it. The first box carries the
// products card's gradient, the second is plain, the third a softer gradient. No borders.

function Glow({ soft = false }: { soft?: boolean }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${soft ? "opacity-50" : ""}`}>
      <span className="absolute -left-[10%] -top-[20%] h-[90%] w-[55%] rounded-full bg-[#0061ff]/55 blur-[60px]" />
      <span className="absolute left-[45%] top-[5%] h-[95%] w-[70%] rounded-full bg-[#4d9bff]/40 blur-[60px]" />
      <span className="absolute left-[25%] top-[55%] h-[70%] w-[50%] rounded-full bg-[#1a47d6]/60 blur-[60px]" />
      <span className="absolute -left-[15%] top-[45%] h-[60%] w-[50%] rounded-full bg-black/50 blur-[60px]" />
    </span>
  );
}

export default function WhatWeDo() {
  const [tab, setTab] = useState(WHAT_WE_DO[0].id);
  const current = WHAT_WE_DO.find((t) => t.id === tab)!;
  const external = (href: string) => href.startsWith("http");

  return (
    <section aria-labelledby="what-we-do" className="rb-container py-20 lg:py-28">
      <h2 id="what-we-do" className="text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.04em] text-white lg:text-[48px]">
        What we can do for you
      </h2>
      <div className="mt-6 flex justify-center lg:mt-8">
        <div role="tablist" aria-label="What we can do" className="flex w-full bg-white/[0.06] p-1 sm:w-auto">
          {WHAT_WE_DO.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-11 flex-1 px-6 text-[14px] font-medium transition-colors sm:flex-none lg:text-[15px] ${
                tab === t.id ? "bg-brand text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {t.id}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-5 lg:mt-12">
        {current.items.map((item, i) => {
          const body = (
            <>
              <span className="relative isolate grid h-[200px] place-items-center overflow-hidden bg-[#111317] px-6 lg:h-[260px]">
                {i !== 1 && <Glow soft={i === 2} />}
                <span className="text-center text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white lg:text-[34px]">
                  {item.label}
                </span>
              </span>
              <span className="mt-4 block text-[14px] leading-[1.5] text-white/60 lg:text-[15px]">{item.detail}</span>
              {/* pinned to the bottom, so the links line up however long the line above is */}
              <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[14px] font-medium text-white">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </>
          );
          return external(item.href) ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col">
              {body}
            </a>
          ) : (
            <Link key={item.label} href={item.href} className="group flex flex-col">
              {body}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center lg:mt-12">
        <Link href={current.more.href} className="group inline-flex items-center gap-2 text-[15px] font-medium text-white/80 hover:text-white">
          {current.more.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
