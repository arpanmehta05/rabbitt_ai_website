"use client";

import { useRef, useState, type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";

// "Made for": one row open at a time (a real button with aria-expanded; Up and Down move between
// rows; the panel's height animates with grid rows, no measuring). The big panel on the left is a
// line drawing of the kind of page that audience needs, and it changes with the open row. The drawing
// is decoration only.

const ROWS: { key: string; title: string; text: string }[] = [
  { key: "startups", title: "Startups", text: "Launch pages that explain the product in one scroll and turn visits into sign-ups." },
  { key: "shops", title: "E-commerce brands", text: "Product and checkout pages that load fast on a phone and take fewer taps to buy." },
  { key: "saas", title: "SaaS products", text: "Clear pricing, honest comparisons and a sign-up that does not lose people halfway." },
  { key: "agencies", title: "Agencies", text: "A reliable build partner for client sites, with audits you can put in front of the client." },
  { key: "schools", title: "Schools and colleges", text: "Admissions and programme pages that answer a parent's question in the first screen." },
  { key: "health", title: "Healthcare", text: "Accessible, private and easy to read for people who are not at their best." },
];

const S = "rgba(255,255,255,0.6)";
const B = "#4d9bff";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" fill="none" stroke={S} aria-hidden>
      <rect x="0.5" y="0.5" width="399" height="259" rx="6" />
      <path d="M0 24.5H400" />
      <circle cx="14" cy="12" r="3" />
      <circle cx="26" cy="12" r="3" />
      <circle cx="38" cy="12" r="3" />
      <rect x="60.5" y="6.5" width="140" height="11" rx="5.5" />
      {children}
    </svg>
  );
}

const WIRES: Record<string, ReactNode> = {
  startups: (
    <>
      <path d="M24 46H70M290 46H376" />
      <path d="M24 90H230M24 106H190" strokeWidth="5" />
      <path d="M24 134H200M24 146H170" />
      <rect x="24.5" y="168.5" width="84" height="26" rx="4" stroke={B} fill="rgba(77,155,255,0.12)" />
      <rect x="250.5" y="72.5" width="126" height="132" rx="6" />
      <path d="M262 190L290 150L314 170L346 118L366 140" stroke={B} />
      <path d="M24 226H376" />
    </>
  ),
  shops: (
    <>
      <path d="M24 46H80M260 46H376" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={24.5 + i * 90} y="68.5" width="80" height="100" rx="4" />
          <path d={`M${24 + i * 90} 184H${96 + i * 90}M${24 + i * 90} 198H${70 + i * 90}`} />
          <path d={`M${64 + i * 90} 204H${104 + i * 90}`} stroke={B} />
        </g>
      ))}
      <rect x="290.5" y="226.5" width="86" height="22" rx="4" stroke={B} fill="rgba(77,155,255,0.12)" />
    </>
  ),
  saas: (
    <>
      <path d="M24 46H70M300 46H376" />
      <path d="M130 70H270" strokeWidth="5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={24.5 + i * 126} y={i === 1 ? 92.5 : 102.5} width="110" height={i === 1 ? 140 : 120} rx="6" stroke={i === 1 ? B : S} fill={i === 1 ? "rgba(77,155,255,0.08)" : "none"} />
          <path d={`M${40 + i * 126} ${i === 1 ? 118 : 128}H${90 + i * 126}`} strokeWidth="3" />
          <path d={`M${40 + i * 126} ${i === 1 ? 148 : 158}H${110 + i * 126}M${40 + i * 126} ${i === 1 ? 162 : 172}H${100 + i * 126}M${40 + i * 126} ${i === 1 ? 176 : 186}H${112 + i * 126}`} />
        </g>
      ))}
    </>
  ),
  agencies: (
    <>
      <path d="M24 46H80M290 46H376" />
      <path d="M24 78H200" strokeWidth="5" />
      <rect x="24.5" y="100.5" width="110" height="130" rx="3" />
      <rect x="146.5" y="100.5" width="110" height="60" rx="3" />
      <rect x="146.5" y="170.5" width="110" height="60" rx="3" />
      <rect x="268.5" y="100.5" width="108" height="86" rx="3" />
      <rect x="268.5" y="196.5" width="108" height="34" rx="3" stroke={B} />
      <path d="M40 210L66 176L88 196L112 150" stroke={B} />
    </>
  ),
  schools: (
    <>
      <path d="M24 46H90M300 46H376" />
      <path d="M24 84H260M24 100H210" strokeWidth="5" />
      <rect x="24.5" y="122.5" width="96" height="26" rx="4" stroke={B} fill="rgba(77,155,255,0.12)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M24 ${170 + i * 22}H376`} />
          <path d={`M24 ${160 + i * 22}H120M300 ${160 + i * 22}H376`} />
        </g>
      ))}
    </>
  ),
  health: (
    <>
      <path d="M24 46H80M290 46H376" />
      <path d="M24 78H210" strokeWidth="5" />
      <rect x="24.5" y="104.5" width="170" height="22" rx="3" />
      <rect x="24.5" y="136.5" width="170" height="22" rx="3" />
      <rect x="24.5" y="168.5" width="170" height="22" rx="3" />
      <rect x="24.5" y="204.5" width="110" height="26" rx="4" stroke={B} fill="rgba(77,155,255,0.12)" />
      <rect x="226.5" y="104.5" width="150" height="126" rx="4" />
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i} cx={246 + (i % 5) * 28} cy={128 + Math.floor(i / 5) * 26} r="3" stroke={i === 8 ? B : S} fill={i === 8 ? B : "none"} />
      ))}
    </>
  ),
};

export default function MadeFor() {
  const [open, setOpen] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = ROWS[open]?.key ?? ROWS[0].key;

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowDown" ? 1 : ROWS.length - 1)) % ROWS.length;
    refs.current[n]?.focus();
  }

  return (
    <section aria-labelledby="madefor-title" className="rb-section">
      <div className="rb-container grid gap-12 lg:grid-cols-5 lg:gap-x-5">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <div>
            <h2 id="madefor-title" className="max-w-md text-[clamp(1.875rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
              Made for teams that live on their website.
            </h2>
            <p className="mt-6 max-w-[26rem] text-[15px] leading-[1.6] text-white/70">
              If customers, students or patients reach you through a page, the page is part of the product.
            </p>
          </div>
          <div aria-hidden className="relative hidden aspect-[400/260] w-full max-w-[560px] sm:block lg:sticky lg:top-28">
            {ROWS.map((r) => (
              <div key={r.key} className={`absolute inset-0 transition-opacity duration-500 ${r.key === current ? "opacity-100" : "opacity-0"}`}>
                <Frame>{WIRES[r.key]}</Frame>
              </div>
            ))}
          </div>
        </div>

        <ul className="border-t border-white/10 lg:col-span-3">
          {ROWS.map((r, i) => {
            const isOpen = open === i;
            return (
              <li key={r.key} className="border-b border-white/10">
                <h3>
                  <button
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`madefor-panel-${i}`}
                    id={`madefor-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`flex w-full items-center justify-between gap-6 px-1 py-6 text-left text-[clamp(1.375rem,2.2vw,1.875rem)] font-semibold tracking-[-0.02em] transition-colors lg:px-3 ${
                      isOpen ? "text-brand-text" : "text-white hover:text-brand-text"
                    }`}
                  >
                    {r.title}
                    {isOpen ? <Minus aria-hidden className="h-5 w-5 shrink-0" /> : <Plus aria-hidden className="h-5 w-5 shrink-0 text-white/50" />}
                  </button>
                </h3>
                <div
                  id={`madefor-panel-${i}`}
                  role="region"
                  aria-labelledby={`madefor-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-[240ms] ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[28rem] px-1 pb-7 text-[15px] leading-[1.6] text-white/70 lg:px-3">{r.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
