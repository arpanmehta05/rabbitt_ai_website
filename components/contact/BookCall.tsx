"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SLOTS } from "./contactData";
import { blueButton, input } from "./ui";

// "Book a call" (Figma "Contact – Desktop 1440 · Book a call"): the call on the left, a month in the
// middle, the times on the right. Weekdays from tomorrow for two weeks can be picked. There is no
// calendar system behind it yet, so picking a time sends a request through /api/contact and the team
// confirms by email; the button says "Request", not "Confirm".

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// today, read on the client only: the server renders nothing for the calendar, so a different time
// zone on the server can never disagree with the visitor's own date
const noop = () => () => {};
const todayKey = () => new Date().toDateString();
const useToday = () => useSyncExternalStore(noop, todayKey, () => null);

const dayStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export default function BookCall() {
  const key = useToday();
  const today = useMemo(() => (key ? dayStart(new Date(key)) : null), [key]);
  const [offset, setOffset] = useState(0); // months from this one
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [who, setWho] = useState({ name: "", email: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const open = (d: Date) => {
    if (!today) return false;
    const diff = (dayStart(d).getTime() - today.getTime()) / 86_400_000;
    const wd = d.getDay();
    return diff >= 1 && diff <= 14 && wd !== 0 && wd !== 6;
  };

  const month = today ? new Date(today.getFullYear(), today.getMonth() + offset, 1) : null;
  const cells: (Date | null)[] = month
    ? [
        ...Array<null>((month.getDay() + 6) % 7).fill(null), // Monday first
        ...Array.from(
          { length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() },
          (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
        ),
      ]
    : [];

  const same = (a: Date | null, b: Date | null) => !!a && !!b && a.toDateString() === b.toDateString();
  const dayLabel = (d: Date) => `${DAYS[(d.getDay() + 6) % 7]} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!day || !time) return;
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: who.name,
          email: who.email,
          company: "",
          message: `Call request: ${dayLabel(day)} ${day.getFullYear()}, ${time} India Standard Time (30 minutes, Google Meet).`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send. Please try again.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("idle");
    }
  }

  return (
    <div className="grid bg-white/[0.04] lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,260px)]">
      <div className="p-5 py-6 lg:p-8">
        <h2 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.02em] text-white lg:text-[24px]">Discovery call with Rabbitt AI</h2>
        <p className="mt-4 text-[14px] leading-[1.55] text-white/60 lg:text-[15px]">
          Thirty minutes with the team. Bring your use case and where your data lives, and leave with a clear next step.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-[13px] text-white/80 lg:block lg:space-y-3 lg:text-[15px]">
          <li>30 minutes</li>
          <li>Google Meet</li>
          <li>India Standard Time</li>
        </ul>
      </div>

      <div className="border-t border-white/[0.08] p-5 lg:border-l lg:border-t-0 lg:p-8">
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-semibold text-white lg:text-[18px]">{month ? `${MONTHS[month.getMonth()]} ${month.getFullYear()}` : " "}</p>
          <div className="flex gap-1">
            <button type="button" aria-label="Previous month" disabled={offset === 0} onClick={() => setOffset(0)} className="grid h-9 w-9 place-items-center text-white/70 hover:text-white disabled:opacity-30">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next month" disabled={offset === 1} onClick={() => setOffset(1)} className="grid h-9 w-9 place-items-center text-white/70 hover:text-white disabled:opacity-30">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => (
            <span key={d} className="pb-2 text-[12px] font-medium uppercase text-white/50">
              <span className="lg:hidden">{d[0]}</span>
              <span className="hidden lg:inline">{d}</span>
            </span>
          ))}
          {cells.map((d, i) =>
            d ? (
              <button
                key={i}
                type="button"
                disabled={!open(d)}
                aria-pressed={same(d, day)}
                onClick={() => {
                  setDay(d);
                  setTime(null);
                }}
                className={`relative h-11 text-[14px] transition-colors lg:h-14 lg:text-[16px] ${
                  same(d, day)
                    ? "bg-brand font-medium text-white"
                    : open(d)
                      ? "bg-white/[0.08] font-medium text-white hover:bg-white/[0.14]"
                      : "text-white/35"
                }`}
              >
                {d.getDate()}
                {same(d, today) && <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 bg-white/70" />}
              </button>
            ) : (
              <span key={i} />
            ),
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.08] p-5 lg:border-l lg:border-t-0 lg:p-8">
        {state === "sent" && day && time ? (
          <div role="status">
            <span className="grid h-10 w-10 place-items-center bg-brand text-white">
              <Check className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-white">Request sent.</p>
            <p className="mt-2 text-[14px] leading-[1.55] text-white/65">
              We will confirm {dayLabel(day)}, {time} by email to {who.email}, with the Google Meet link.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="text-[17px] font-semibold text-white lg:text-[18px]">{day ? dayLabel(day) : "Pick a day"}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={!day}
                  aria-pressed={time === s}
                  onClick={() => setTime(s)}
                  className={`h-12 text-[15px] font-medium transition-colors disabled:opacity-35 ${
                    time === s ? "bg-white text-[#05060a]" : "bg-white/[0.08] text-white hover:bg-white/[0.14]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {day && time && (
              <div className="mt-4 grid gap-2">
                <input required autoComplete="name" aria-label="Your name" placeholder="Your name" value={who.name} onChange={(e) => setWho((w) => ({ ...w, name: e.target.value }))} className={input} />
                <input required type="email" autoComplete="email" aria-label="Work email" placeholder="Work email" value={who.email} onChange={(e) => setWho((w) => ({ ...w, email: e.target.value }))} className={input} />
              </div>
            )}
            {error && (
              <p role="alert" className="mt-3 bg-rose-500/10 px-3 py-2 text-[13px] text-rose-200">
                {error}
              </p>
            )}
            <button type="submit" disabled={!day || !time || state === "sending"} className={`${blueButton} mt-4 w-full`}>
              {state === "sending" ? "Sending…" : time ? `Request ${time}` : "Choose a time"}
              {time && state !== "sending" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
