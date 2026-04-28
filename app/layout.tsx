import type { Metadata } from "next";
import Script from "next/script";
import { ConsentBanner } from "@/components/ConsentBanner";
import { APP_VERSION, PKG_URL } from "@/lib/version";
import "./globals.css";

const GA_ID = "G-7LYHYJ4FM7";
const SITE_URL = "https://www.getcopied.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Copied — Clipboard Manager for macOS",
    template: "%s — Copied",
  },
  description:
    "Copied is a fast menu-bar clipboard manager for macOS. Fuzzy search, smart content detection, rich-paste, and optional iCloud sync across all your Macs.",
  keywords: [
    "clipboard manager",
    "clipboard manager mac",
    "macOS clipboard",
    "clipboard history",
    "pasteboard manager",
    "code snippet manager",
    "iCloud clipboard sync",
    "productivity mac app",
    "developer tools mac",
    "copy paste manager",
  ],
  authors: [{ name: "Magneton Labs, LLC", url: SITE_URL }],
  creator: "Magneton Labs, LLC",
  publisher: "Magneton Labs, LLC",
  applicationName: "Copied",
  category: "productivity",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
    url: SITE_URL,
    siteName: "Copied",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Copied — Clipboard Manager for macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copied — Clipboard Manager for macOS",
    description:
      "Code detection, fuzzy search, smart paste, iCloud sync. Your clipboard, supercharged.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console / Bing Webmaster ownership tokens. Set the env vars
  // in Vercel → Project → Settings → Environment Variables after
  // claiming each property and pasting the meta-tag verification value.
  // Empty/undefined values render no <meta>, which is fine until claimed.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION ?? "",
    },
  },
};

// Structured data for Google Rich Results + AI crawlers. Next.js recommends
// next/script with type="application/ld+json" as the canonical pattern.
const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Copied",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 15.0 or later",
  description:
    "Clipboard manager for macOS with fuzzy search, code detection, rich-paste, and optional iCloud sync across Macs.",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  downloadUrl: PKG_URL,
  softwareVersion: APP_VERSION,
  author: {
    "@type": "Organization",
    name: "Magneton Labs, LLC",
    url: SITE_URL,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free download",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "iCloud Sync unlock",
      price: "4.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/buy`,
    },
  ],
};

// Schema.org Organization — separate node so search engines can link
// the publisher entity across SoftwareApplication, FAQPage, and any
// future BreadcrumbList nodes. `sameAs` ties the site to its public
// profiles so Google can dedupe the brand across the web.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Magneton Labs, LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: "support@getcopied.app",
  sameAs: [
    "https://github.com/MagnetonIO",
    "https://github.com/MagnetonIO/copied-app",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            // Consent Mode v2 — deny analytics until user opts in via the
            // banner. ConsentBanner.tsx fires gtag('consent','update',...)
            // after Accept. Essential storage stays granted.
            gtag('consent', 'default', {
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script
          id="ld-json-software"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(softwareAppJsonLd)}
        </Script>
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(organizationJsonLd)}
        </Script>
      </head>
      <body>
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
