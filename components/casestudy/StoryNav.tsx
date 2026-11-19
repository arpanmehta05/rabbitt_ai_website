"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// "In this story": links to the article's own headings, with a blue bar on the one being read.
// The links work without script (plain #anchors); the script moves the highlight and, when the list is
// longer than the room it has, slides the list up so the part being read is at the top and the parts
// already read have moved out of the way (with a fade at the top edge), so the next headings are
// always in view however long the article is.
export default function StoryNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [offset, setOffset] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // slide the list so the active heading is the first one in view (never past the end of the list)
  useLayoutEffect(() => {
    const update = () => {
      const b = box.current;
      const l = list.current;
      if (!b || !l) return;
      const li = l.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
      const room = b.clientHeight;
      const max = Math.max(0, l.scrollHeight - room);
      setOffset(li ? Math.min(Math.max(0, li.offsetTop - 4), max) : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active, items]);

  if (!items.length) return null;
  return (
    <nav aria-label="In this story" className="flex min-h-0 flex-1 flex-col">
      <p className="shrink-0 text-[15px] font-medium text-[#090d16]">In this story</p>
      <div
        ref={box}
        className="relative mt-4 min-h-[132px] flex-1 overflow-hidden"
        style={offset > 0 ? { WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 28px)", maskImage: "linear-gradient(to bottom, transparent 0, #000 28px)" } : undefined}
      >
        <ul
          ref={list}
          className="border-l border-[#e5e7eb] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{ transform: `translateY(${-offset}px)` }}
        >
          {items.map((i) => (
            <li key={i.id} data-id={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={`-ml-px block border-l-2 py-2.5 pl-[18px] text-[15px] transition-colors ${
                  active === i.id ? "border-[#0061ff] text-[#0061ff]" : "border-transparent text-[#6b7280] hover:text-[#090d16]"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
