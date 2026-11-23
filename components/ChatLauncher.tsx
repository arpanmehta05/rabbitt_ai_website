"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";

// The chatbot, bottom right on every page. Only the interface is here for now: the button, the
// panel, a greeting, a few starter questions and the input. The input is disabled until the bot is
// connected; when it is, send the messages from this component.
const starters = ["What does Rabbitt AI build?", "How does private cloud deployment work?", "Book a demo"];

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[150] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open && (
        <section
          role="dialog"
          aria-label="Rabbitt AI assistant"
          className="flex h-[min(34rem,calc(100svh-8rem))] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-white/[0.14] bg-black text-white motion-safe:animate-[rb-consent-in_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        >
          <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
            <Image src="/logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium leading-tight">Rabbitt assistant</p>
              <p className="text-[13px] text-white/55">Ask about our products and services</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the chat"
              className="grid h-9 w-9 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-3 text-[15px] leading-relaxed">
              Hi, I&apos;m the Rabbitt assistant. What would you like to know?
            </p>
            <div className="flex flex-wrap gap-2">
              {starters.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled
                  className="rounded-full border border-white/15 px-3.5 py-2 text-left text-[14px] text-white/80 disabled:cursor-not-allowed"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              disabled
              aria-label="Message"
              placeholder="Chat is coming soon"
              className="h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-transparent px-3.5 text-[15px] text-white placeholder:text-white/45 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled
              aria-label="Send"
              className="grid h-11 w-11 place-items-center rounded-lg bg-brand text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </form>
        </section>
      )}

      {/* the round button only shows while the panel is closed; the panel has its own close button, so there is never a second one */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Chat with Rabbitt AI"
          className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
