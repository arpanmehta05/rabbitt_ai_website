import Image from "next/image";
import Link from "next/link";
import type { ListingItem } from "@/lib/listing";

// The small parts the blog and case study index pages share (Figma "Blog & Case studies").
// No borders anywhere; buttons are solid blue or solid white; sharp corners.

// "07 Aug, 2026 / Research": the date quiet, the category a little brighter
export function Meta({ item, className = "" }: { item: ListingItem; className?: string }) {
  return (
    <p className={`text-[12px] text-white/50 sm:text-[13px] ${className}`}>
      <time dateTime={item.dateTime}>{item.date}</time>
      <span aria-hidden className="mx-2">
        /
      </span>
      <span className="text-white/80">{item.category}</span>
    </p>
  );
}

function Picture({ item, sizes, preload = false }: { item: ListingItem; sizes: string; preload?: boolean }) {
  return item.image ? (
    <Image
      src={item.image}
      alt=""
      fill
      sizes={sizes}
      preload={preload}
      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
    />
  ) : (
    <div className="absolute inset-0 bg-white/[0.06]" />
  );
}

// a large post: image, meta, title, two lines of summary
export function FeaturedCard({ item, preload = false }: { item: ListingItem; preload?: boolean }) {
  return (
    <Link href={item.href} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
        <Picture item={item} sizes="(min-width: 1024px) 50vw, 100vw" preload={preload} />
      </div>
      <Meta item={item} className="mt-5" />
      <h2 className="mt-2 line-clamp-3 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-white transition-colors group-hover:text-brand-text sm:line-clamp-2 lg:text-[22px]">
        {item.title}
      </h2>
      {item.description && (
        <p className="mt-2.5 line-clamp-2 max-w-[60ch] text-[15px] leading-[1.5] text-white/60">{item.description}</p>
      )}
    </Link>
  );
}

// a post in the grid. From sm it is a card. On a phone, "row" is compact (small image left, text
// right) for long lists like the blog; "stack" keeps the full-width image, for the few case studies.
export function PostCard({ item, phone = "row" }: { item: ListingItem; phone?: "row" | "stack" }) {
  const row = phone === "row";
  return (
    <Link href={item.href} className={`group ${row ? "grid grid-cols-[128px_minmax(0,1fr)] gap-3.5" : "block"} sm:block`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
        <Picture item={item} sizes={`(min-width: 1024px) 33vw, (min-width: 640px) 50vw, ${row ? "128px" : "100vw"}`} />
      </div>
      <div className="min-w-0">
        <Meta item={item} className={row ? "sm:mt-4" : "mt-4"} />
        <h3
          className={`mt-1.5 font-medium leading-[1.4] tracking-[-0.01em] text-white transition-colors group-hover:text-brand-text sm:mt-2 sm:line-clamp-2 sm:text-[17px] ${
            row ? "line-clamp-3 text-[15px]" : "line-clamp-2 text-[17px]"
          }`}
        >
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

// filters: the chosen one is a blue button, the rest plain text. On a phone the row scrolls sideways.
export function Filters({
  options,
  active,
  onChange,
  label,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <div className="flex w-max gap-1">
        {options.map((o) => {
          const on = o === active;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`h-9 whitespace-nowrap px-3.5 text-[13px] font-medium transition-colors ${
                on ? "bg-brand text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const whiteButton =
  "inline-flex h-11 items-center justify-center gap-2 bg-white px-5 text-[15px] font-medium text-[#05060a] transition-colors hover:bg-white/85";
