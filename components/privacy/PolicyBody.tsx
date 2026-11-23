"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ChevronDown, Minus, Plus } from "lucide-react";
import type { PolicySection } from "@/app/privacy/policy";

// The policy body, from the Figma "Privacy" frames.
// Desktop: "On this page" on the left, sticky, with the details and the PDF link under it; the list
// follows the reading (the same scroll spy as the article pages' "In this story": a thin track with a
// blue bar on the section being read, and the list slides when it is taller than its room). The
// policy is on the right, every section open.
// Mobile: the details as rows, "On this page" as a drop-down, and each section as an accordion
// (the first one open). A link to a section, from the list or a #hash, opens that section.

type Detail = { label: string; value: string; href?: string };

export default function PolicyBody({
  sections,
  details,
  pdfHref,
}: {
  sections: PolicySection[];
  details: Detail[];
  pdfHref: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [open, setOpen] = useState<Set<string>>(() => new Set(sections[0] ? [sections[0].id] : []));
  const [offset, setOffset] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // scroll spy: the topmost section in the reading band is the active one
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
        // above the policy (back at the top of the page): the first section
        else if (els[0] && els[0].getBoundingClientRect().top > 96) setActive(els[0].id);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // slide the list so the active item stays in view when the list is taller than its room
  useLayoutEffect(() => {
    const update = () => {
      const b = box.current;
      const l = list.current;
      if (!b || !l) return;
      const li = l.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
      const max = Math.max(0, l.scrollHeight - b.clientHeight);
      setOffset(li ? Math.min(Math.max(0, li.offsetTop - li.offsetHeight * 2), max) : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  // a #hash (on load or from a link) opens that section on mobile
  useEffect(() => {
    const openHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (sections.some((s) => s.id === id)) setOpen((o) => new Set(o).add(id));
    };
    openHash();
    window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, [sections]);

  const toggle = (id: string) =>
    setOpen((o) => {
      const n = new Set(o);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const jump = (id: string) => setOpen((o) => new Set(o).add(id));

  return (
    <div className="rb-container pb-20 lg:grid lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-x-[72px] lg:pb-[120px]">
      {/* left: on this page and the details (desktop); details and a drop-down list (mobile) */}
      <aside className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-120px)] lg:flex-col lg:self-start">
        <nav aria-label="On this page" className="hidden min-h-0 flex-col lg:flex">
          <p className="shrink-0 text-[15px] font-medium leading-[22px] text-white">On this page</p>
          <div
            ref={box}
            className="relative mt-4 min-h-[132px] overflow-hidden"
            style={offset > 0 ? { WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 28px)", maskImage: "linear-gradient(to bottom, transparent 0, #000 28px)" } : undefined}
          >
            <ul
              ref={list}
              className="border-l border-white/[0.12] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
              style={{ transform: `translateY(${-offset}px)` }}
            >
              {sections.map((s) => (
                <li key={s.id} data-id={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`-ml-px block border-l-2 py-2.5 pl-[18px] text-[15px] leading-[22px] transition-colors ${
                      active === s.id ? "border-brand font-medium text-brand-text" : "border-transparent text-white/55 hover:text-white"
                    }`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* details: stacked pairs under the list (desktop), rows in a panel (mobile) */}
        <div className="mt-8 bg-white/[0.04] px-5 py-2 lg:mt-[22px] lg:shrink-0 lg:border-t lg:border-white/[0.12] lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-[18px]">
          <dl className="lg:space-y-[18px]">
            {details.map((d) => (
              <div key={d.label} className="flex items-center justify-between gap-4 py-3 lg:block lg:py-0">
                <dt className="text-[14px] leading-5 text-white/50 lg:text-[13px] lg:leading-[18px] lg:text-white/45">{d.label}</dt>
                <dd className="text-right text-[14px] font-medium leading-5 text-white lg:mt-0.5 lg:text-left lg:text-[15px] lg:leading-[22px]">
                  {d.href ? (
                    <a href={d.href} className="text-brand-text transition-colors hover:text-white">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <a
            href={pdfHref}
            download
            className="mt-[18px] hidden items-center gap-2 text-[15px] font-medium leading-[22px] text-brand-text transition-colors hover:text-white lg:inline-flex"
          >
            Download PDF <ArrowDown aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <details className="group mt-8 bg-white/[0.06] lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[15px] font-medium text-white [&::-webkit-details-marker]:hidden">
            On this page
            <ChevronDown aria-hidden className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="px-5 pb-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => jump(s.id)}
                  className="block border-t border-white/[0.08] py-3 text-[15px] text-white/70 hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </aside>

      {/* right: the policy */}
      <article className="mt-6 border-b border-white/[0.12] lg:mt-0 lg:border-b-0">
        {sections.map((s, i) => {
          const isOpen = open.has(s.id);
          return (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className={`scroll-mt-24 border-t border-white/[0.12] lg:border-white/10 ${i === 0 ? "lg:border-t-0" : "lg:mt-12 lg:pt-5"}`}
            >
              <h2 id={`${s.id}-title`} className="text-[20px] font-semibold leading-[26px] text-white lg:text-[30px] lg:leading-9">
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${s.id}-body`}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left lg:pointer-events-none lg:cursor-text lg:py-0"
                >
                  {s.title}
                  {isOpen ? (
                    <Minus aria-hidden className="h-[18px] w-[18px] shrink-0 lg:hidden" />
                  ) : (
                    <Plus aria-hidden className="h-[18px] w-[18px] shrink-0 lg:hidden" />
                  )}
                </button>
              </h2>
              <div id={`${s.id}-body`} className={`${isOpen ? "block" : "hidden"} pb-4 lg:block lg:pb-0`}>
                <SectionBody s={s} />
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
}

const para = "text-[16px] leading-[26px] text-white/[0.72] lg:text-[18px] lg:leading-[30px]";

function SectionBody({ s }: { s: PolicySection }) {
  return (
    <div className="space-y-4 lg:mt-5 lg:space-y-5">
      {s.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className={para}>
          {p}
        </p>
      ))}
      {s.items && (
        <dl className="space-y-5">
          {s.items.map((it) => (
            <div key={it.term}>
              <dt className="text-[17px] font-semibold leading-[26px] text-white lg:text-[18px] lg:leading-7">{it.term}</dt>
              <dd className="mt-1 text-[16px] leading-[26px] text-white/[0.62] lg:text-[17px] lg:leading-7">{it.detail}</dd>
            </div>
          ))}
        </dl>
      )}
      {s.bullets && (
        <ul className="space-y-3 lg:space-y-5">
          {s.bullets.map((b) => (
            <li key={b} className={`flex gap-3.5 ${para}`}>
              <span aria-hidden className="mt-[10px] h-1.5 w-1.5 shrink-0 bg-brand lg:mt-[11px]" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {s.note && <p className="bg-white/[0.04] px-5 py-5 text-[15px] leading-6 text-white/[0.72] lg:text-[16px] lg:leading-[26px]">{s.note}</p>}
      {s.contact && (
        <div>
          <a href={`mailto:${s.contact.email}`} className="text-[22px] font-semibold leading-[31px] text-brand-text transition-colors hover:text-white lg:text-[26px]">
            {s.contact.email}
          </a>
          <p className="mt-1.5 text-[15px] leading-6 text-white/60 lg:text-[16px] lg:leading-[26px]">{s.contact.note}</p>
        </div>
      )}
    </div>
  );
}
