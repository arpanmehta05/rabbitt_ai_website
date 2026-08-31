"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";

interface Item {
  _id: string;
  title: string;
  slug: string;
  description: string;
  about: string;
  image: string;
  dateAdded: string;
}

interface ContentFilterProps {
  items: Item[];
  categories: string[];
  hrefPrefix: string; // "/blogs" or "/casestudies"
}

const CATEGORY_MAX = 20;

function truncateCategory(cat: string): string {
  if (cat.length <= CATEGORY_MAX) return cat;
  return cat.slice(0, CATEGORY_MAX).trimEnd() + "…";
}

export default function ContentFilter({
  items,
  categories,
  hrefPrefix,
}: ContentFilterProps) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? items : items.filter((b) => b.about === active);

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            title={cat}
            className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
              active === cat
                ? "border-sky-400 bg-sky-500/15 text-sky-300"
                : "border-white/[0.1] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
            }`}
          >
            {truncateCategory(cat)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-slate-500">No posts in this category yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <BlogCard
              key={item._id}
              title={item.title}
              slug={item.slug}
              description={item.description}
              about={item.about}
              image={item.image}
              dateAdded={item.dateAdded}
              href={`${hrefPrefix}/${item.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
