import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { APP_VERSION, RELEASES_URL } from "@/lib/version";

const SITE_URL = "https://www.getcopied.app";

type Release = {
  version: string;
  date: string;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
};

const releases: Release[] = [
  {
    version: "1.3.3",
    date: "April 30, 2026",
    title: "Pin, favorite, and list polish",
    summary:
      "Pinned clippings now stay visible, favorite state is easier to scan, and list assignment works from the popover and main window.",
    bullets: [
      "Pinned items are fetched separately so old pinned clips stay at the top of the popover.",
      "Favorite stars remain visible after hover and row action icons follow the current input mode.",
      "Add to List now supports existing lists and new-list creation without crashing.",
      "iOS-created lists and swipe-to-favorite changes now sync back to Mac.",
    ],
    href: "https://github.com/MagnetonIO/copied-app/releases/tag/v1.3.3",
  },
  {
    version: "1.3.2",
    date: "April 29, 2026",
    title: "Memory regression fix",
    summary:
      "A targeted performance release for high memory use, sluggish copy events, and expensive content reclassification.",
    bullets: [
      "The reclassification migration now runs in an ephemeral context instead of holding every clipping in memory.",
      "Code-language regex work moved off the main thread so the popover stays responsive after copy events.",
      "HTML capture skips trivial wrappers, thumbnail cache size is lower, and idle pasteboard polling is cheaper.",
    ],
    href: "https://github.com/MagnetonIO/copied-app/releases/tag/v1.3.2",
  },
  {
    version: "1.3.1",
    date: "April 28, 2026",
    title: "Smarter content detection",
    summary:
      "Copied gained a broader code-detection engine, Markdown handling, richer iOS clipboard capture, and popover workflow fixes.",
    bullets: [
      "Code detection now covers 25+ languages with anchor-pattern matching.",
      "Markdown is recognized as its own content type and rendered with richer detail previews.",
      "iOS captures HTML and rich text from the clipboard, not only plain text.",
      "Image previews and editor handoff actions are smoother in the Mac popover.",
    ],
    href: "https://github.com/MagnetonIO/copied-app/releases/tag/v1.3.1",
  },
  {
    version: "1.3.0",
    date: "April 28, 2026",
    title: "Mac and iOS TestFlight",
    summary:
      "A cross-platform TestFlight release with a unified bundle ID, fresh App Store Connect listing, and iOS companion app.",
    bullets: [
      "Mac and iOS builds ship under the same Magneton bundle identity.",
      "The iOS app includes Share Extension and Action Extension capture flows.",
      "iCloud Sync unlock is available in the Mac App Store TestFlight build.",
      "Direct Mac distribution continues through a signed and notarized Stripe-license package.",
    ],
    href: "https://github.com/MagnetonIO/copied-app/releases/tag/v1.3.0",
  },
  {
    version: "1.2.0",
    date: "April 22, 2026",
    title: "Direct download with iCloud Sync",
    summary:
      "The first public direct-download release with one-time iCloud Sync unlock, refreshed settings, and a notarized installer.",
    bullets: [
      "iCloud Sync arrived as a one-time unlock for cross-Mac clipboard history.",
      "Settings gained dedicated Sync, About, and Legal sections.",
      "The popover returns the cursor to the top after copy-and-paste.",
      "The installer is Developer ID signed, notarized, stapled, and auto-launches Copied after install.",
    ],
    href: "https://github.com/MagnetonIO/copied-app/releases/tag/v1.2.0",
  },
];

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Version history for Copied, the clipboard manager for macOS and iOS. See recent fixes, iCloud Sync updates, content detection improvements, and release notes.",
  alternates: { canonical: "/changelog" },
  openGraph: {
    title: "Copied Changelog",
    description:
      "Recent Copied releases, including iCloud Sync, content detection, performance fixes, and Mac/iOS polish.",
    type: "website",
    url: `${SITE_URL}/changelog`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Copied changelog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copied Changelog",
    description:
      "Recent Copied releases, including iCloud Sync, content detection, performance fixes, and Mac/iOS polish.",
    images: ["/og.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Changelog", item: `${SITE_URL}/changelog` },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Copied changelog",
  itemListElement: releases.map((release, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: release.href,
    name: `Copied ${release.version}: ${release.title}`,
  })),
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen">
      <Script id="ld-json-breadcrumb-changelog" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="ld-json-changelog-list" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(itemListJsonLd)}
      </Script>
      <Nav />

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Current version {APP_VERSION}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            Changelog
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            What changed in Copied, grouped by release. Short notes first,
            full GitHub release notes when you need the details.
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-1">
                Latest release
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                Copied {releases[0].version}
              </p>
            </div>
            <a
              href={RELEASES_URL}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              View GitHub releases
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="relative border-l border-white/10 pl-6 sm:pl-8">
            {releases.map((release) => (
              <article key={release.version} className="relative pb-12 last:pb-0">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 h-3 w-3 rounded-full bg-emerald-400 ring-8 ring-black" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {release.version} <span className="text-[var(--text-secondary)]">{release.title}</span>
                  </h2>
                  <time className="text-sm text-[var(--text-tertiary)]">
                    {release.date}
                  </time>
                </div>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  {release.summary}
                </p>
                <ul className="mt-5 space-y-3">
                  {release.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={release.href}
                  className="mt-5 inline-flex text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  Full release notes
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
