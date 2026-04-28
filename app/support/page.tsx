import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support — Copied Clipboard Manager Help, FAQs, Contact",
  description:
    "Help center for Copied: setup, keyboard shortcuts, iCloud Sync, troubleshooting, and how to reach us. 14 answers covering every common question.",
  alternates: { canonical: "/support" },
};

const SUPPORT_EMAIL = "support@getcopied.app";
const GITHUB_ISSUES = "https://github.com/MagnetonIO/copied-app/issues";
const SITE_URL = "https://www.getcopied.app";

// Plain-text FAQ data for Schema.org/FAQPage JSON-LD. Mirrors the JSX
// in the FAQ section below — when you edit a Q&A in the JSX, update the
// matching entry here so SERP rich-results stay in sync.
const FAQ_DATA: { q: string; a: string }[] = [
  // Getting started
  { q: "How do I open Copied after installing?", a: "Copied lives in the menu bar — look for the clipboard icon at the top of your screen. Click it to see your clipboard history. The app doesn't show in the Dock by default." },
  { q: "What's the keyboard shortcut?", a: "Control + Shift + C opens the popover from any app. Change it in Settings → Shortcuts." },
  { q: "Why does Copied ask for Accessibility permission?", a: "macOS requires Accessibility permission for global hotkeys (so the popover can be triggered from any app). Copied does not read any other app's content — the permission is only used to register the keyboard shortcut. If you skip this prompt, you can still open the popover by clicking the menu bar icon." },
  { q: "Where is my clipboard history stored?", a: "Locally, in a SwiftData database inside Copied's application support folder. Clipboard contents never leave your device unless you enable iCloud Sync." },
  // iCloud Sync
  { q: "How do I unlock iCloud Sync?", a: "Open Settings (Cmd + ,) → Sync tab → Unlock iCloud Sync — $4.99. One-time payment. The Mac App Store version uses in-app purchase; the direct-download version uses Stripe." },
  { q: "Does my purchase carry across both versions?", a: "No — App Store purchases and Stripe licenses are separate systems. If you bought on the App Store and want to use the direct-download build, or vice versa, email us and we'll sort it out." },
  { q: "iCloud Sync is on, but my other Mac isn't seeing my clips. What do I check?", a: "1) Both Macs signed into the same Apple ID with iCloud Drive enabled. 2) Both running Copied 1.3.0 or newer. 3) In Settings → Sync, the toggle is on and status shows Sync is active. 4) Give it up to 60 seconds — CloudKit takes a moment for new items. 5) Still nothing? Send us a note — we'll look at your CloudKit logs with you." },
  { q: "How many Macs can I use one license on?", a: "Up to three Macs per license. If you need more, reach out and we'll work with you." },
  // Troubleshooting
  { q: "Copied isn't capturing new clipboard items.", a: "Open Settings → Clipboard and confirm Capture images / Capture rich text match what you're copying. If an app is in the Excluded Apps list, items copied from it won't be captured." },
  { q: "The global hotkey Control+Shift+C doesn't work.", a: "System Settings → Privacy & Security → Accessibility — make sure Copied is listed and toggled on. Quit and relaunch the app after enabling." },
  { q: "How do I reset Copied's history?", a: "Menu bar icon → right-click → Clear All Clippings. For a full reset, also empty the Trash tab and toggle iCloud Sync off then back on (it re-fetches from CloudKit)." },
  { q: "How do I fully uninstall Copied?", a: "1) Quit Copied from the menu bar. 2) Move /Applications/Copied.app to the Trash. 3) Delete local data: ~/Library/Application Support/Copied. 4) Delete preferences: ~/Library/Preferences/com.mlong.copied.mac.plist. 5) Optional — delete license: security delete-generic-password -s com.mlong.copied.license" },
  // Privacy
  { q: "What does Copied send off my Mac?", a: "Nothing, unless you turn on iCloud Sync. Then your clipboard history is stored in your private CloudKit container (only you can read it). We have no servers, no telemetry, no analytics." },
  { q: "Does Copied read passwords from my clipboard?", a: "Copied captures whatever the system clipboard contains — including passwords if a password manager puts them there. To exclude a password manager, add it in Settings → Clipboard → Excluded Apps." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Support", item: `${SITE_URL}/support` },
  ],
};

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <Script id="ld-json-faq" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="ld-json-breadcrumb-support" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            Help Center
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Answers to common questions about Copied, and a direct line to us
            when you need one.
          </p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          <ContactCard
            icon={MailIcon}
            label="Email us"
            value={SUPPORT_EMAIL}
            href={`mailto:${SUPPORT_EMAIL}`}
            description="We read every message. Typical reply within one business day."
          />
          <ContactCard
            icon={GitHubIcon}
            label="Report a bug"
            value="GitHub Issues"
            href={GITHUB_ISSUES}
            description="Search existing issues or open a new one. Best for reproducible bugs."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            Frequently asked questions
          </h2>

          <FAQGroup title="Getting started">
            <FAQItem q="How do I open Copied after installing?">
              Copied lives in the menu bar — look for the clipboard icon at the top of your screen.
              Click it to see your clipboard history. The app doesn&rsquo;t show in the Dock by default.
            </FAQItem>
            <FAQItem q="What&rsquo;s the keyboard shortcut?">
              <kbd className="kbd">⌃</kbd> + <kbd className="kbd">⇧</kbd> + <kbd className="kbd">C</kbd> opens
              the popover from any app. Change it in Settings → Shortcuts.
            </FAQItem>
            <FAQItem q="Why does Copied ask for Accessibility permission?">
              macOS requires Accessibility permission for global hotkeys (so the popover can be
              triggered from any app). Copied does <em>not</em> read any other app&rsquo;s content —
              the permission is only used to register the keyboard shortcut. If you skip this prompt,
              you can still open the popover by clicking the menu bar icon.
            </FAQItem>
            <FAQItem q="Where is my clipboard history stored?">
              Locally, in a SwiftData database inside Copied&rsquo;s application support folder.
              Clipboard contents never leave your device unless you enable iCloud Sync.
            </FAQItem>
          </FAQGroup>

          <FAQGroup title="iCloud Sync (paid)">
            <FAQItem q="How do I unlock iCloud Sync?">
              Open Settings (<kbd className="kbd">⌘</kbd> + <kbd className="kbd">,</kbd>) →
              <b> Sync</b> tab → <b>Unlock iCloud Sync — $4.99</b>. One-time payment.
              The Mac App Store version uses in-app purchase; the direct-download version uses Stripe.
            </FAQItem>
            <FAQItem q="Does my purchase carry across both versions?">
              No — App Store purchases and Stripe licenses are separate systems. If you bought on
              the App Store and want to use the direct-download build, or vice versa, email us and
              we&rsquo;ll sort it out.
            </FAQItem>
            <FAQItem q="iCloud Sync is on, but my other Mac isn&rsquo;t seeing my clips. What do I check?">
              <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)]">
                <li>Both Macs signed into the same Apple ID with iCloud Drive enabled.</li>
                <li>Both running Copied 1.3.0 or newer.</li>
                <li>In Settings → Sync, the toggle is <b>on</b> and status shows <b>Sync is active</b>.</li>
                <li>Give it up to ~60 seconds — CloudKit takes a moment for new items.</li>
                <li>Still nothing? Send us a note — we&rsquo;ll look at your CloudKit logs with you.</li>
              </ol>
            </FAQItem>
            <FAQItem q="How many Macs can I use one license on?">
              Up to three Macs per license. If you need more, reach out and we&rsquo;ll work with you.
            </FAQItem>
          </FAQGroup>

          <FAQGroup title="Troubleshooting">
            <FAQItem q="Copied isn&rsquo;t capturing new clipboard items.">
              Open Settings → <b>Clipboard</b> and confirm <b>Capture images</b> /
              <b> Capture rich text</b> match what you&rsquo;re copying. If an app is in the
              <b> Excluded Apps</b> list, items copied from it won&rsquo;t be captured.
            </FAQItem>
            <FAQItem q="The global hotkey ⌃⇧C doesn&rsquo;t work.">
              System Settings → Privacy &amp; Security → Accessibility — make sure <b>Copied</b>
              is listed and toggled on. Quit and relaunch the app after enabling.
            </FAQItem>
            <FAQItem q="How do I reset Copied&rsquo;s history?">
              Menu bar icon → right-click → <b>Clear All Clippings</b>. For a full reset, also
              empty the Trash tab and toggle iCloud Sync off then back on (it re-fetches from CloudKit).
            </FAQItem>
            <FAQItem q="How do I fully uninstall Copied?">
              <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)]">
                <li>Quit Copied from the menu bar.</li>
                <li>Move <code className="code">/Applications/Copied.app</code> to the Trash.</li>
                <li>Delete local data: <code className="code">~/Library/Application Support/Copied</code></li>
                <li>Delete preferences: <code className="code">~/Library/Preferences/com.mlong.copied.mac.plist</code></li>
                <li>Optional — delete license: <code className="code">security delete-generic-password -s com.mlong.copied.license</code></li>
              </ol>
            </FAQItem>
          </FAQGroup>

          <FAQGroup title="Privacy & data">
            <FAQItem q="What does Copied send off my Mac?">
              Nothing, unless you turn on iCloud Sync. Then your clipboard history is stored in
              your private CloudKit container (only you can read it). We have no servers, no
              telemetry, no analytics. Our full policy: <a className="link" href="/privacy">Privacy Policy</a>.
            </FAQItem>
            <FAQItem q="Does Copied read passwords from my clipboard?">
              Copied captures whatever the system clipboard contains — including passwords if a
              password manager puts them there. To exclude a password manager, add it in
              Settings → <b>Clipboard</b> → <b>Excluded Apps</b>.
            </FAQItem>
          </FAQGroup>

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-[var(--text-secondary)] mb-2">Didn&rsquo;t find what you need?</p>
            <p>
              Email{" "}
              <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>{" "}
              with your app version (Settings → About) and a short description. We&rsquo;ll get back within one business day.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- pieces ---------- */

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  description,
}: {
  icon: (props: { className?: string }) => React.JSX.Element;
  label: string;
  value: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
    >
      <Icon className="w-6 h-6 mb-3 text-emerald-400" />
      <div className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
        {label}
      </div>
      <div className="text-lg font-semibold mb-2">{value}</div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </div>
    </a>
  );
}

function FAQGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
        {title}
      </h3>
      <div className="divide-y divide-white/5 border-y border-white/5">{children}</div>
    </div>
  );
}

function FAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group py-5 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
        <span className="font-medium text-base">{q}</span>
        <span className="shrink-0 mt-1 text-[var(--text-tertiary)] group-open:rotate-45 transition-transform">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </summary>
      <div className="mt-3 text-[var(--text-secondary)] leading-relaxed text-sm">
        {children}
      </div>
    </details>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.09 3.292 9.405 7.86 10.933.575.105.785-.25.785-.556 0-.274-.01-1-.015-1.963-3.195.694-3.87-1.54-3.87-1.54-.524-1.328-1.279-1.682-1.279-1.682-1.044-.713.08-.698.08-.698 1.155.082 1.763 1.186 1.763 1.186 1.026 1.757 2.692 1.25 3.348.956.104-.744.402-1.25.731-1.538-2.55-.29-5.231-1.275-5.231-5.67 0-1.253.448-2.278 1.182-3.08-.118-.29-.512-1.459.112-3.043 0 0 .963-.308 3.155 1.176.915-.255 1.896-.382 2.873-.386.976.004 1.958.131 2.874.386 2.19-1.484 3.151-1.176 3.151-1.176.625 1.584.232 2.753.114 3.043.737.802 1.181 1.827 1.181 3.08 0 4.407-2.685 5.376-5.242 5.66.412.355.78 1.055.78 2.125 0 1.534-.014 2.77-.014 3.146 0 .309.207.667.79.554C20.213 21.402 23.5 17.09 23.5 12c0-6.352-5.148-11.5-11.5-11.5z" />
    </svg>
  );
}
