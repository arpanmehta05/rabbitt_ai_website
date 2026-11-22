"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ListingItem } from "@/lib/listing";
import { FeaturedCard, Filters, PostCard, whiteButton } from "./ListingParts";

const ALL = "All posts";
const PAGE = 9;

// The blog index under the header (Figma "Blog – Desktop 1440"): search and filters, the two newest
// posts large, then the rest in a three-column grid, nine at a time. While searching or filtering,
// everything that matches goes in the grid.
export default function BlogIndex({ items, categories }: { items: ListingItem[]; categories: string[] }) {
  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const browsing = active === ALL && query.trim() === "";
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (active === ALL || i.category === active) &&
        (!q || i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)),
    );
  }, [items, active, query]);

  const featured = browsing ? matches.slice(0, 2) : [];
  const rest = browsing ? matches.slice(2) : matches;
  const visible = rest.slice(0, shown);

  const choose = (c: string) => {
    setActive(c);
    setShown(PAGE);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-11 w-full items-center gap-2.5 bg-white/[0.06] px-3.5 sm:w-80">
          <Search className="h-4 w-4 shrink-0 text-white/45" aria-hidden />
          <span className="sr-only">Search posts</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search posts"
            className="w-full bg-transparent text-[15px] text-white placeholder:text-white/45 focus:outline-none"
          />
        </label>
        <Filters label="Filter posts" options={[ALL, ...categories]} active={active} onChange={choose} />
      </div>

      {featured.length > 0 && (
        <div className="mt-8 grid gap-10 border-b border-white/[0.08] pb-12 lg:mt-10 lg:grid-cols-2 lg:gap-6 lg:pb-16">
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} preload={i === 0} />
          ))}
        </div>
      )}

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:mt-12 lg:grid-cols-3">
          {visible.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        featured.length === 0 && <p className="py-20 text-white/55">Nothing matches that yet.</p>
      )}

      {rest.length > shown && (
        <div className="mt-12 flex justify-center lg:mt-16">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className={`${whiteButton} w-full sm:w-auto`}>
            Load more posts
          </button>
        </div>
      )}
    </>
  );
}
