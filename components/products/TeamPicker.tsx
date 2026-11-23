"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { isExternal, type Product } from "@/app/products/products";

// "Find the right one for your team": four teams as tabs and, for the one picked, a sentence and its four
// products. Desktop: the tabs are a list on the first column (a blue bar on the active one, the same as "On
// this page") and the panel takes the other three.
//
// On a desktop screen with motion allowed the section is pinned to the screen and the SCROLL picks the team:
// the section is as tall as the screen plus half a screen per team after the first, the content sticks, and
// how far you are through that height decides which team shows (scrolling back up goes back). Clicking a tab
// or pressing an arrow key scrolls to that team's place. On a phone, or with "reduce motion", nothing is
// pinned: it is the same tabs, changed by click, with the panel under them (tabs scroll sideways).
// All four panels are in the page (one shown), so the links are in the markup for search and for no-script.

type Team = { team: string; sentence: string; products: Product[] };

const STEP_SVH = 50; // the scroll, in screen heights, that each team after the first takes

export default function TeamPicker({ teams, children }: { teams: Team[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const track = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // pinned only on a wide screen where motion is allowed
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // how far through the pinned height we are picks the team
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const room = el.offsetHeight - window.innerHeight;
      if (room <= 0) return;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / room));
      setActive(Math.min(teams.length - 1, Math.floor(p * teams.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pinned, teams.length]);

  // go to a team: when pinned, scroll to the middle of its stretch; otherwise just switch
  const go = (i: number) => {
    const el = track.current;
    if (!pinned || !el) {
      setActive(i);
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const room = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / teams.length) * room, behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % teams.length : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + teams.length) % teams.length : null;
    if (next === null) return;
    e.preventDefault();
    go(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={track}
      aria-labelledby="by-team"
      className="mt-20 lg:mt-32"
      style={pinned ? { height: `calc(100svh + ${(teams.length - 1) * STEP_SVH}svh)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center pt-16" : ""}>
        <div className="rb-container">
          {children}
          <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-x-6">
            <div role="tablist" aria-label="Teams" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
              {teams.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.team}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`team-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`team-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => go(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`h-10 shrink-0 cursor-pointer rounded-lg px-4 text-left text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text lg:h-14 lg:rounded-none lg:border-l-2 lg:bg-transparent lg:px-5 lg:text-[17px] ${
                      on
                        ? "bg-white text-[#05060a] lg:border-brand lg:text-brand-text"
                        : "bg-white/[0.06] text-white/85 hover:text-white lg:border-transparent lg:font-normal lg:text-white/55"
                    }`}
                  >
                    {t.team}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 lg:col-span-3 lg:mt-0">
              {teams.map((t, i) => (
                <div
                  key={t.team}
                  role="tabpanel"
                  id={`team-panel-${i}`}
                  aria-labelledby={`team-tab-${i}`}
                  hidden={i !== active}
                  className="bg-[#111317] px-5 pb-3 pt-6 lg:min-h-[428px] lg:px-10 lg:pb-10 lg:pt-10"
                >
                  <p className="max-w-[560px] text-[20px] font-semibold leading-7 tracking-[-0.01em] lg:text-[26px] lg:leading-[34px]">{t.sentence}</p>
                  <ul className="mt-5 grid lg:mt-[54px] lg:grid-cols-2 lg:gap-x-6">
                    {t.products.map((p) => (
                      <li key={p.name} className="border-t border-white/[0.12]">
                        <a
                          href={p.href}
                          {...(isExternal(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group block py-[18px] lg:pb-7 lg:pt-6"
                        >
                          <span className="flex items-center justify-between gap-4">
                            <span className="text-[17px] font-semibold leading-6 lg:text-[18px] lg:leading-[26px]">{p.name}</span>
                            <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-brand-text" />
                          </span>
                          <span className="mt-1.5 block text-[14px] leading-[21px] text-white/55 lg:text-[15px] lg:leading-[23px]">{p.line}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
