"use client";

import { useEffect, useState } from "react";

type ConsentState = "granted" | "denied" | null;
const STORAGE_KEY = "copied-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function setConsent(state: "granted" | "denied") {
  localStorage.setItem(STORAGE_KEY, state);
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      ad_storage: state,
    });
  }
}

export function ConsentBanner() {
  const [decision, setDecision] = useState<ConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    setDecision(stored);
    // Replay any stored decision in case gtag loaded after the inline default.
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    }
  }, []);

  if (!mounted || decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 inset-x-4 sm:bottom-6 sm:right-6 sm:inset-x-auto sm:max-w-sm z-[60] rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl p-5 shadow-2xl shadow-black/50"
    >
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
        We use Google Analytics to see which pages people visit. No ads, no
        cross-site tracking. See our{" "}
        <a href="/privacy" className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setConsent("granted");
            setDecision("granted");
          }}
          className="flex-1 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            setConsent("denied");
            setDecision("denied");
          }}
          className="flex-1 px-4 py-2 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
