"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

// A footer link that reopens the consent banner, so people can change their mind at any time.
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Cookie Settings
    </button>
  );
}
