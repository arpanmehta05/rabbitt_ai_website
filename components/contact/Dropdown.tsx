"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

// The site's own dropdown, in place of the browser's: a dark panel under the button, no borders,
// the chosen option in blue with a tick. Keyboard: arrows move, Enter or Space picks, Escape and
// Tab close, Home and End jump. Used for the contact form's topic (large) and its product or
// service list (field-sized).

type Option = { value: string; label: string };

export default function Dropdown({
  value,
  options,
  onChange,
  size = "field",
  placeholder = "Choose one",
  labelledBy,
}: {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  size?: "topic" | "field";
  placeholder?: string;
  labelledBy?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.value === value);

  // close on a click anywhere else
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const pick = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
    button.current?.focus();
  };

  function onKey(e: KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  const topic = size === "topic";
  return (
    <div ref={wrap} className={`relative ${topic ? "inline-block" : "block"}`}>
      <button
        ref={button}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={labelledBy ? `${labelledBy} ${id}-value` : undefined}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className={
          topic
            ? "inline-flex items-center gap-3 bg-white/[0.08] py-1.5 pl-3.5 pr-3 text-[24px] font-semibold tracking-[-0.03em] text-brand-text outline-none transition-colors hover:bg-white/[0.12] focus-visible:ring-1 focus-visible:ring-brand-text lg:text-[30px]"
            : "flex h-12 w-full items-center justify-between gap-3 bg-white/[0.06] px-4 text-left text-[15px] outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-1 focus-visible:ring-brand-text"
        }
      >
        {/* every label sits in the same cell and only the chosen one shows, so the button is always
            as wide as the longest option and the panel under it (same width) lines up exactly */}
        <span className="grid text-left">
          {[...options.map((o) => o.label), placeholder].map((l) => {
            const shown = l === (current?.label ?? placeholder);
            return (
              <span
                key={l}
                id={shown ? `${id}-value` : undefined}
                aria-hidden={!shown}
                className={`col-start-1 row-start-1 whitespace-nowrap ${shown ? "" : "invisible"} ${
                  !topic ? (current ? "text-white" : "text-white/40") : ""
                }`}
              >
                {l}
              </span>
            );
          })}
        </span>
        <ChevronDown
          aria-hidden
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${topic ? "h-5 w-5 text-brand-text lg:h-6 lg:w-6" : "h-4 w-4 text-white/60"}`}
        />
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={labelledBy}
          className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-[360px] overflow-auto bg-[#15171c] py-2 [scrollbar-color:rgba(255,255,255,0.2)_transparent] [scrollbar-width:thin] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.85)]`}
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(i)}
                className={`flex cursor-pointer items-center justify-between gap-6 py-3 text-[16px] transition-colors ${topic ? "pl-3.5 pr-3" : "px-4"} ${
                  i === active ? "bg-white/[0.07]" : ""
                } ${selected ? "font-medium text-brand-text" : "text-white/85"}`}
              >
                {o.label}
                {selected && <Check aria-hidden className="h-4 w-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
