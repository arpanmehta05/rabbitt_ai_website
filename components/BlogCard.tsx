import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/cms";

const CATEGORY_MAX = 20;

function truncateCategory(cat: string): string {
  if (cat.length <= CATEGORY_MAX) return cat;
  return cat.slice(0, CATEGORY_MAX).trimEnd() + "…";
}

interface BlogCardProps {
  title: string;
  slug: string;
  description: string;
  about: string;
  image: string;
  dateAdded: string;
  href: string; // "/blogs/slug" or "/casestudies/slug"
}

export default function BlogCard({
  title,
  description,
  about,
  image,
  dateAdded,
  href,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden border border-white/[0.08] bg-[#060d1a] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e1b30] to-[#060d1a]" />
        )}
        {/* Bottom fade overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060d1a] to-transparent" />
        {/* Category tag — max 20 chars, square, black background with white text */}
        {about && (
          <span
            className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/15 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm shadow-md"
            title={about}
          >
            {truncateCategory(about)}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-sky-200">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {description}
        </p>

        {/* Author + date row */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            {/* Author avatar — square frame */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden border border-white/[0.1] bg-[#0b1525]">
              <Image
                src="/logo.svg"
                alt="Rabbitt AI"
                width={18}
                height={18}
                className="object-contain opacity-80"
              />
            </div>
            <span className="text-xs text-slate-400">Rabbitt AI</span>
            <span className="text-xs text-slate-600">·</span>
            <time className="text-xs text-slate-500" dateTime={dateAdded}>
              {formatDate(dateAdded)}
            </time>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-sky-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            Read
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
