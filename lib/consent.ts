// Cookie-consent choice: what is stored, and the event the footer uses to reopen the banner.

export type ConsentChoice = {
  /** Google Analytics 4: visits, sources, pages, events. */
  analytics: boolean;
  /** Microsoft Clarity: session recordings and heatmaps. */
  recording: boolean;
  /** Bump this when the policy changes, so everyone is asked again. */
  version: number;
  savedAt: number;
};

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = "rabbitt_consent";
export const OPEN_CONSENT_EVENT = "rabbitt:open-consent";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean, recording: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    analytics,
    recording,
    version: CONSENT_VERSION,
    savedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    // storage blocked: the choice still applies for this page view
  }
  return choice;
}
