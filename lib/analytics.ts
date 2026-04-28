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

// GA4 recommended events accept nested structures (e.g. `items` for commerce
// events), so keep this permissive — gtag serializes whatever we pass.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrackParams = Record<string, any>;

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
  // License (paid) is the canonical "Copied" download → no qualifier in
  // the filename. OSS keeps the "-OSS" suffix so analytics can split the
  // funnels.
  const fileName = params.variant === "license"
    ? `Copied-v${params.version}.pkg`
    : `Copied-OSS-v${params.version}.pkg`;
  track("file_download", {
    file_name: fileName,
    file_extension: "pkg",
    link_url: `https://github.com/MagnetonIO/copied-app/releases/download/v${params.version}/${fileName}`,
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
