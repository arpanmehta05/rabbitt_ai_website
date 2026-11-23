"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { isExternal, type Product } from "@/app/products/products";

// "Every product": all products in their four families, with filter tabs (All and each family, with the
// count). Each family is a row: its name and line on the first column, its products in three columns.
// On a phone the "All" view shows the first family and a "Show all" button, so the page is not endless.

type Family = { name: string; line: string; products: Product[] };

export default function Catalogue({ families }: { families: Family[] }) {
  const [filter, setFilter] = useState("All");
  const [more, setMore] = useState(false);
  const total = families.reduce((n, f) => n + f.products.length, 0);
  const shown = filter === "All" ? families : families.filter((f) => f.name === filter);
  const collapsed = filter === "All" && !more;

  const tab = (label: string, count: number) => {
    const on = filter === label;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={on}
        onClick={() => setFilter(label)}
        className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-[18px] text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text ${
          on ? "bg-white text-[#05060a]" : "bg-white/[0.06] text-white/85 hover:bg-white/10"
        }`}
      >
        {label}
        <span className={`text-[13px] font-normal ${on ? "text-[#05060a]/50" : "text-white/45"}`}>{count}</span>
      </button>
    );
  };

  return (
    <>
      <div role="group" aria-label="Filter by family" className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-[48px] lg:flex-wrap lg:overflow-visible lg:px-0">
        {tab("All", total)}
        {families.map((f) => tab(f.name, f.products.length))}
      </div>

      <div className="mt-8 lg:mt-12">
        {shown.map((f, i) => (
          <section
            key={f.name}
            aria-labelledby={`family-${f.name}`}
            className={`border-t border-white/[0.16] pb-2 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:pb-4 ${collapsed && i > 0 ? "hidden lg:grid" : ""}`}
          >
            <div className="pt-6 lg:pt-7">
              <h3 id={`family-${f.name}`} className="text-[24px] font-semibold leading-[30px] tracking-[-0.01em] lg:text-[26px] lg:leading-8">
                {f.name}
              </h3>
              <p className="mt-3 max-w-[280px] text-[15px] leading-[23px] text-white/55 lg:mt-4">{f.line}</p>
            </div>
            <ul className="mt-4 lg:col-span-3 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {f.products.map((p) => (
                <li key={p.name} className="border-t border-white/[0.08] lg:[&:nth-child(-n+3)]:border-t-0">
                  <a
                    href={p.href}
                    {...(isExternal(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group block py-4 lg:pb-8 lg:pt-7"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-[16px] font-semibold leading-6 lg:text-[17px]">{p.name}</span>
                      <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-brand-text" />
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-[21px] text-white/55 lg:text-[15px] lg:leading-[22px]">{p.line}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <div className="border-t border-white/[0.16]">
          {collapsed && (
            <button
              type="button"
              onClick={() => setMore(true)}
              className="inline-flex cursor-pointer items-center gap-2 py-5 text-[15px] font-medium text-brand-text transition-colors hover:text-white lg:hidden"
            >
              Show all {total} products <ArrowDown aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
