"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

// Set these in .env (and in the Amplify environment variables). A missing ID simply skips that tool.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
// Google Tag Manager container (GTM-XXXX). Loads in addition to the direct GA4 tag above, so do not
// also add the same G- tag inside the container, or visits are counted twice.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

// Remove the cookies the two tools set, for when someone withdraws consent.
function clearTrackingCookies() {
  const names = document.cookie.split(";").map((c) => c.split("=")[0].trim());
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = [host, `.${host}`];
  if (parts.length > 2) domains.push(`.${parts.slice(-2).join(".")}`);
  for (const name of names) {
    if (/^(_ga|_gid|_gat|_clck|_clsk|CLID|ANONCID|MR|MUID|SM|SRM_B|_cltk)/.test(name)) {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

export default function ConsentManager() {
  // null until the browser has been checked, so nothing flashes on load
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  // both optional tools start switched on in Customize; nothing runs until the visitor saves
  const [analytics, setAnalytics] = useState(true);
  const [recording, setRecording] = useState(true);
  const loadedRef = useRef({ analytics: false, recording: false });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser storage after mount
    setChoice(saved);
    if (saved) {
      setAnalytics(saved.analytics);
      setRecording(saved.recording);
    }
    setOpen(!saved);
    setReady(true);
  }, []);

  // the footer's "Cookie Settings" link reopens the banner on the detailed view
  useEffect(() => {
    const reopen = () => {
      const saved = readConsent();
      setAnalytics(saved?.analytics ?? true);
      setRecording(saved?.recording ?? true);
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // remember which tools have already been loaded on this page view
  useEffect(() => {
    if (choice?.analytics) loadedRef.current.analytics = true;
    if (choice?.recording) loadedRef.current.recording = true;
  }, [choice]);

  const save = useCallback(
    (a: boolean, r: boolean) => {
      const withdrew =
        (loadedRef.current.analytics && !a) || (loadedRef.current.recording && !r);
      const next = writeConsent(a, r);
      setChoice(next);
      setAnalytics(a);
      setRecording(r);
      setOpen(false);
      setCustomize(false);
      if (withdrew) {
        // stop Clarity, clear both tools' cookies and reload so nothing keeps running
        if (!r) window.clarity?.("consent", false);
        clearTrackingCookies();
        window.location.reload();
      }
    },
    [],
  );

  // Escape closes the banner without saving, only when a choice already exists
  useEffect(() => {
    if (!open || !choice) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, choice]);

  return (
    <>
      {/* Google Analytics 4: only after the visitor accepts analytics */}
      {ready && choice?.analytics && GTM_ID ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}

      {ready && choice?.analytics && GA_ID ? (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}

      {/* Microsoft Clarity: only after the visitor accepts recordings */}
      {ready && choice?.recording && CLARITY_ID ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});`}
        </Script>
      ) : null}


      {ready && open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="Cookie settings"
          className="fixed inset-x-4 bottom-4 z-[200] overflow-hidden rounded-xl border border-white/[0.14] bg-black text-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)] motion-safe:animate-[rb-consent-in_0.6s_cubic-bezier(0.16,1,0.3,1)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[400px]"
        >
          {/* a single bright hairline along the top edge, the one accent */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-text/80 to-transparent"
          />

          <div className="flex flex-col gap-5 p-5">
            <div className="contents">
              <p className="max-w-[56ch] text-[15px] leading-relaxed text-white/70">
                <span className="font-medium text-white">We count visits to improve the site.</span>{" "}
                Nothing optional runs until you say yes.{" "}
                <Link href="/privacy" className="text-brand-text underline-offset-2 hover:underline">
                  Privacy policy
                </Link>
              </p>

              {customize ? (
                <div className="grid gap-px overflow-hidden rounded-lg bg-white/10">
                  <ToggleRow
                    title="Essential"
                    text="Remembers this choice and keeps the site working."
                    checked
                    disabled
                  />
                  <ToggleRow
                    title="Analytics"
                    text="Google Analytics: pages visited, traffic source, device and country."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ToggleRow
                    title="Session recording"
                    text="Microsoft Clarity: heatmaps and replays. Form fields are masked."
                    checked={recording}
                    onChange={setRecording}
                  />
                </div>
              ) : null}

              <div className="grid grid-cols-2 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomize((v) => !v)}
                  aria-expanded={customize}
                  className="order-last col-span-2 inline-flex h-11 items-center justify-center rounded-lg px-3 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
                >
                  {customize ? "Hide options" : "Customize"}
                </button>
                {customize ? null : (
                  <button
                    type="button"
                    onClick={() => save(false, false)}
                    className="h-11 rounded-lg border border-white/15 px-5 text-[15px] font-medium text-white transition-colors hover:border-white/40"
                  >
                    Reject all
                  </button>
                )}
                {customize ? (
                  <button
                    type="button"
                    onClick={() => save(analytics, recording)}
                    className="h-11 rounded-lg border border-white/15 px-5 text-[15px] font-medium text-white transition-colors hover:border-white/40"
                  >
                    Save choices
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => save(true, true)}
                  className="h-11 rounded-lg bg-brand px-6 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ToggleRow({
  title,
  text,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 bg-black p-4">
      <div>
        <p className="text-[15px] font-medium">{title}</p>
        <p className="mt-1 text-[14px] leading-snug text-white/55">{text}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-white/20"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}
