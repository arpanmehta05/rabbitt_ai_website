// Shared helpers for the blog and case study index pages (Figma "Blog & Case studies").

import type { Blog, CaseStudy } from "@/lib/cms";

// One entry as the index pages need it. Dates are formatted on the server so the client never
// renders a different string (time zones would otherwise cause a hydration mismatch).
export interface ListingItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  date: string; // "07 Aug, 2026"
  dateTime: string; // ISO, for <time dateTime>
  category: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}, ${d.getUTCFullYear()}`;
}

// The CMS "about" field is free text: sometimes a tag ("LLM"), sometimes a run of keywords, sometimes
// an internal word ("topstories"). The index pages show one short, readable category instead.
const RENAME: Record<string, string> = {
  topstories: "Industry",
  "rabbitt ai": "Company",
  chancerag: "Product",
  llama: "LLM",
  graphs: "Research",
  "ai visibility": "GEO",
};

export function categoryLabel(about: string): string {
  const first = (about ?? "").split(/\s{2,}|,/)[0].trim();
  if (!first) return "Notes";
  const known = RENAME[first.toLowerCase()];
  if (known) return known;
  return first.length > 22 ? first.slice(0, 22).trimEnd() + "…" : first;
}

export function toListing(entry: Blog | CaseStudy, hrefPrefix: string): ListingItem {
  return {
    id: entry._id,
    title: entry.title.trim(),
    description: (entry.description ?? "").trim(),
    image: entry.image,
    href: `${hrefPrefix}/${entry.slug}`,
    date: shortDate(entry.dateAdded),
    dateTime: entry.dateAdded,
    category: categoryLabel(entry.about),
  };
}

// categories in the order they first appear (newest first), without repeats
export function categoriesOf(items: ListingItem[]): string[] {
  return [...new Set(items.map((i) => i.category))];
}
