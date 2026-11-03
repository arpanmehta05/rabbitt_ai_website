"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// The opening, on a light screen: the mark appears, a blue ring draws around it, the name and the
// promise fade in, a short line fills, and the whole screen lifts away to show the page.
//
// It is CSS-only (see .rb-intro in globals.css), so it plays without JavaScript, never blocks the
// page content, and is already in the server HTML. JavaScript only does two small things: remember
// that it was seen, so it is not shown again for a day, and let the visitor skip it.

const SEEN_KEY = "rabbitt_intro_timestamp";
const TOTAL_MS = 3300;

export default function Intro() {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const done = () => {
      try {
        localStorage.setItem(SEEN_KEY, Date.now().toString());
        document.cookie = "rabbitt_intro_seen=true; max-age=86400; path=/; SameSite=Lax";
      } catch {
        // storage blocked: the intro simply plays again next time
      }
    };
    const t = setTimeout(done, TOTAL_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        done();
        setLeaving(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`rb-intro${leaving ? " rb-intro--out" : ""}`} role="presentation">
      <div className="rb-intro__grid" aria-hidden />
      <div className="rb-intro__glow" aria-hidden />

      <div className="rb-intro__stage">
        <div className="rb-intro__mark">
          <svg className="rb-intro__ring" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="92" className="rb-intro__track" />
            <circle cx="100" cy="100" r="92" className="rb-intro__arc" pathLength={100} />
          </svg>
          <Image src="/logo.svg" alt="" width={84} height={84} priority className="rb-intro__logo" />
        </div>

        <p className="rb-intro__name">Rabbitt AI</p>
        <p className="rb-intro__line">Own your data. Own your AI.</p>
        <div className="rb-intro__bar" aria-hidden>
          <span />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          try {
            localStorage.setItem(SEEN_KEY, Date.now().toString());
            document.cookie = "rabbitt_intro_seen=true; max-age=86400; path=/; SameSite=Lax";
          } catch {
            // see above
          }
          setLeaving(true);
        }}
        className="rb-intro__skip"
      >
        Skip
      </button>
      <span className="rb-intro__edge" aria-hidden />
    </div>
  );
}
