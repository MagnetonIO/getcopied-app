/**
 * Thin GA4 event helper. Respects Consent Mode v2 — calling `track()` when
 * consent is denied still pushes the event to dataLayer; gtag drops it for
 * storage but counts it as a cookieless ping for Google's modeling.
 *
 * Standard GA4 recommended event names where possible (so reports
 * auto-aggregate); custom names where nothing fits.
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params?: TrackParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", event, params ?? {});
}

// Named helpers for the two conversion-intent events we care about on the
// marketing site. Standard GA4 event names where possible.
export function trackDownload(params: {
  location: "hero" | "download_section" | "nav_cta";
  variant: "license" | "oss";
  version: string;
}) {
  track("file_download", {
    file_name: `Copied-${params.variant === "license" ? "License" : "OSS"}-v${params.version}.pkg`,
    file_extension: "pkg",
    link_url: `https://github.com/MagnetonIO/copied-app/releases/download/v${params.version}/Copied-${
      params.variant === "license" ? "License" : "OSS"
    }-v${params.version}.pkg`,
    cta_location: params.location,
    app_version: params.version,
  });
}

export function trackUnlockClick(location: "hero" | "download_section") {
  track("begin_checkout", {
    currency: "USD",
    value: 4.99,
    items: [
      {
        item_id: "copied-mac-icloud",
        item_name: "Copied iCloud Sync",
        price: 4.99,
        quantity: 1,
      },
    ],
    cta_location: location,
  });
}
