"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { TOPICS, type TopicId } from "./contactData";
import { blueButton, input, label } from "./ui";

// The message form (Figma "Contact – Desktop 1440 · Send a message"): "I'd like to discuss [topic]"
// opens it, and the topic changes the line under it and the fields that follow. Work email first,
// then name, company and role, the product or service, and the question. It posts to /api/contact.

export default function ContactForm({ initialTopic }: { initialTopic?: string }) {
  const uid = useId();
  const start = TOPICS.find((t) => t.id === initialTopic) ?? TOPICS[0];
  const [topicId, setTopicId] = useState<TopicId>(start.id);
  const [f, setF] = useState({ email: "", first: "", last: "", company: "", role: "", pick: "", site: "", message: start.starter as string });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const topic = TOPICS.find((t) => t.id === topicId)!;
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  function choose(id: TopicId) {
    const next = TOPICS.find((t) => t.id === id)!;
    setTopicId(id);
    setError(null);
    // a starter sentence comes and goes with its topic, never over what the visitor typed
    setF((p) => {
      const starters: string[] = TOPICS.map((t) => t.starter).filter(Boolean);
      return { ...p, pick: "", message: p.message === "" || starters.includes(p.message) ? next.starter : p.message };
    });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const head = [
      `Topic: ${topic.label}`,
      topic.pick && f.pick ? `${topic.pick.label.replace("?", "")}: ${f.pick}` : "",
      "site" in topic && f.site ? `Website: ${f.site}` : "",
      f.role ? `Role: ${f.role}` : "",
    ].filter(Boolean);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${f.first} ${f.last}`.trim(), email: f.email, company: f.company, message: `${head.join("\n")}\n\n${f.message}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send. Please try again.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="py-6">
        <span className="grid h-12 w-12 place-items-center bg-brand text-white">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-6 text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold tracking-[-0.04em] text-white">Message sent.</p>
        <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed text-white/65">
          A person on the team will reply to {f.email} within 2–4 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setF({ email: "", first: "", last: "", company: "", role: "", pick: "", site: "", message: topic.starter });
          }}
          className="mt-8 text-[15px] text-white/60 underline underline-offset-4 transition-colors hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-white lg:text-[30px]" id={`${uid}-topic-label`}>
          I’d like to discuss
        </h2>
        <span className="relative inline-flex items-center bg-white/[0.08]">
          <select
            aria-labelledby={`${uid}-topic-label`}
            value={topicId}
            onChange={(e) => choose(e.target.value as TopicId)}
            className="cursor-pointer appearance-none bg-transparent py-1.5 pl-3.5 pr-10 text-[24px] font-semibold tracking-[-0.03em] text-brand-text outline-none focus-visible:ring-1 focus-visible:ring-brand-text lg:text-[30px] [&>option]:bg-[#0b0c10] [&>option]:text-[16px] [&>option]:text-white"
          >
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-3 h-5 w-5 text-brand-text" />
        </span>
      </div>
      <p className="max-w-[60ch] text-[15px] leading-[1.55] text-white/60 lg:text-[16px]">{topic.line}</p>

      <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-4">
        <label className={`${label} col-span-2`}>
          Work email
          <input required type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="name@company.com" className={`${input} mt-2`} />
          <span className="mt-2 block text-[13px] font-normal text-white/45">Use your company email so we can reply from the right team.</span>
        </label>
        <label className={label}>
          First name
          <input required autoComplete="given-name" value={f.first} onChange={(e) => set("first", e.target.value)} placeholder="First name" className={`${input} mt-2`} />
        </label>
        <label className={label}>
          Last name
          <input autoComplete="family-name" value={f.last} onChange={(e) => set("last", e.target.value)} placeholder="Last name" className={`${input} mt-2`} />
        </label>
        <label className={label}>
          Company
          <input autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} placeholder="Organisation" className={`${input} mt-2`} />
        </label>
        <label className={label}>
          Job title
          <input autoComplete="organization-title" value={f.role} onChange={(e) => set("role", e.target.value)} placeholder="Your role" className={`${input} mt-2`} />
        </label>

        {topic.pick && (
          <label className={`${label} col-span-2`}>
            {topic.pick.label}
            <span className="relative mt-2 block">
              <select value={f.pick} onChange={(e) => set("pick", e.target.value)} className={`${input} cursor-pointer appearance-none pr-10 [&>option]:bg-[#0b0c10]`}>
                <option value="">Choose one</option>
                {topic.pick.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            </span>
          </label>
        )}
        {"site" in topic && (
          <label className={`${label} col-span-2`}>
            Your website
            <input type="url" inputMode="url" value={f.site} onChange={(e) => set("site", e.target.value)} placeholder="https://" className={`${input} mt-2`} />
          </label>
        )}

        <label className={`${label} col-span-2`}>
          Your question
          <textarea required rows={4} value={f.message} onChange={(e) => set("message", e.target.value)} placeholder={topic.question} className={`${input} mt-2 h-auto resize-none py-3`} />
        </label>
      </div>

      <p className="text-[13px] leading-[1.5] text-white/50">
        By sending this you agree to the Rabbitt AI{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-white">
          Privacy Policy
        </a>
        . Nothing is sent to a list.
      </p>

      {error && (
        <p role="alert" className="bg-rose-500/10 px-4 py-3 text-[14px] text-rose-200">
          {error}
        </p>
      )}

      <div>
        <button type="submit" disabled={state === "sending"} className={`${blueButton} w-full sm:w-auto`}>
          {state === "sending" ? "Sending…" : "Send message"}
          {state !== "sending" && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </button>
      </div>
    </form>
  );
}
