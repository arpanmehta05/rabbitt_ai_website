"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// The picture on the left and the summary and numbers on the right, always. Case study pictures come
// from the CMS in every shape, so the picture box takes the picture's own shape once it has loaded
// (between tall 3:4 and wide 2.2:1); anything more extreme is shown whole inside that box, never
// cropped. A wide or normal picture gets columns 1-3 and the text columns 4-5; a square or tall one
// gets a narrower box, columns 1-2, and the text columns 3-5. Before the picture loads (and without
// script) it is laid out as the usual wide one.
//
// The summary is trimmed to the picture: from 1024px up it is cut, at the end of a line with "…", so
// that it and the numbers together are never taller than the picture beside them. A short summary is
// shown whole. Below 1024px it is cut at six lines.

export default function CaseHero({
  src,
  alt,
  summary,
  numbers,
}: {
  src: string;
  alt: string;
  summary: string;
  numbers: { value: string; label: string }[];
}) {
  const ref = useRef<HTMLImageElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const nums = useRef<HTMLUListElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);
  const [lines, setLines] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth) {
      const r = el.naturalWidth / el.naturalHeight;
      const t = window.setTimeout(() => setRatio(r), 0);
      return () => clearTimeout(t);
    }
  }, []);

  // how many lines of the summary fit beside the picture, after the numbers
  useLayoutEffect(() => {
    const fit = () => {
      const b = box.current;
      const t = text.current;
      if (!b || !t) return;
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        setLines(null);
        return;
      }
      const room = b.getBoundingClientRect().height - (nums.current ? nums.current.getBoundingClientRect().height + 40 : 0);
      const lh = parseFloat(getComputedStyle(t).lineHeight) || 29;
      setLines(Math.max(3, Math.floor(room / lh)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (box.current) ro.observe(box.current);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [ratio, summary, numbers.length]);

  const r = ratio ?? 1.56;
  const wide = r >= 1.3;
  const boxRatio = Math.min(Math.max(r, 0.75), 2.2);

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-5 lg:gap-x-5">
      <div className={wide ? "lg:col-span-3" : "lg:col-span-2"}>
        <div ref={box} className="relative overflow-hidden rounded-[20px] bg-[#f1f3f9]" style={{ aspectRatio: boxRatio }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={ref}
            src={src}
            alt={alt}
            onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
      <div className={wide ? "lg:col-span-2" : "lg:col-span-3"}>
        {summary && (
          <p
            ref={text}
            className="line-clamp-6 text-lg leading-[1.6] text-[#4b5563] lg:line-clamp-none"
            style={lines ? { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: lines, overflow: "hidden" } : undefined}
          >
            {summary}
          </p>
        )}
        {numbers.length > 0 && (
          <ul ref={nums} className="mt-10 border-t border-[#e5e7eb]">
            {numbers.map((n) => (
              <li key={n.value + n.label} className="grid grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] items-center gap-4 border-b border-[#e5e7eb] py-5">
                <span className="text-[clamp(2rem,3vw,2.75rem)] font-medium leading-none tracking-[-0.03em] tabular-nums">{n.value}</span>
                <span className="text-[15px] leading-snug text-[#6b7280]">{n.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
