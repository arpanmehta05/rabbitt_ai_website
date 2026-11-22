"use client";

import { useState, type ReactNode } from "react";

// "Send a message | Book a call": one switch under the headline (Figma), and the part under it
// changes. The message view is the form beside the direct-contact blocks; the call view is the
// booking panel. `?mode=call` opens on the call.

export default function ContactSwitch({
  initial,
  message,
  call,
}: {
  initial: "message" | "call";
  message: ReactNode;
  call: ReactNode;
}) {
  const [mode, setMode] = useState(initial);
  const opts = [
    ["message", "Send a message"],
    ["call", "Book a call"],
  ] as const;

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div role="tablist" aria-label="How to reach us" className="flex w-full bg-white/[0.06] p-1 sm:w-auto">
          {opts.map(([id, text]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={`h-11 flex-1 whitespace-nowrap px-3 text-[14px] font-medium transition-colors sm:flex-none sm:px-6 sm:text-[15px] ${
                mode === id ? "bg-white text-[#05060a]" : "text-white/70 hover:text-white"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
      <div id="form" role="tabpanel" className="mt-10 scroll-mt-24 lg:mt-16">
        {mode === "message" ? message : call}
      </div>
    </>
  );
}
