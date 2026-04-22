import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Copied handles your clipboard data. Short version: locally on your Mac, or in your private iCloud — nowhere else.",
};

const EFFECTIVE_DATE = "April 21, 2026";
const SUPPORT_EMAIL = "support@getcopied.app";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Effective {EFFECTIVE_DATE}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            The short version: your clipboard stays on your Mac, or in your
            private iCloud. We don&rsquo;t run servers that see it, and we
            don&rsquo;t track you.
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="px-6 pb-10">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
          <TLCard
            title="Local by default"
            body="Clipboard history lives in a local SwiftData database inside the app&rsquo;s container. Turning off iCloud Sync = zero network traffic for your clips."
          />
          <TLCard
            title="Your iCloud, your data"
            body="When iCloud Sync is on, clips sync through your private CloudKit container — only your Apple ID can read it. We can&rsquo;t."
          />
          <TLCard
            title="No analytics"
            body="No telemetry, no crash reporters, no ad SDKs, no cross-site trackers. The app doesn&rsquo;t phone home."
          />
        </div>
      </section>

      {/* Body */}
      <section className="px-6 pb-24">
        <article className="prose prose-invert max-w-3xl mx-auto prose-headings:tracking-tight prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-li:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
          <h2>Who this covers</h2>
          <p>
            This policy covers the Copied macOS application and the
            <a href="https://getcopied.app"> getcopied.app</a> website, published
            by Magneton Labs, LLC (&ldquo;we&rdquo;). It does not cover
            third-party services you might open from the app (e.g. Apple&rsquo;s
            App Store, Stripe&rsquo;s Checkout page).
          </p>

          <h2>What Copied collects</h2>
          <h3>Clipboard contents</h3>
          <p>
            When Copied is running, it watches the macOS pasteboard and saves a
            copy of each distinct clipping to a local database. That includes
            text, rich text, HTML, images, file references, URLs, and their
            associated metadata (timestamp, source app bundle ID, content type).
            This is the whole point of the app; without it, there&rsquo;s no
            history to scroll.
          </p>
          <h3>Preferences &amp; app state</h3>
          <p>
            Your settings (capture toggles, excluded apps, retention windows,
            hotkey preference, list names, favorites) are stored in macOS
            UserDefaults under <code className="code">com.mlong.copied.mac</code>.
          </p>
          <h3>Purchase / license state</h3>
          <p>
            If you unlock iCloud Sync, we store a verification flag locally. For
            App Store purchases this is a StoreKit transaction record; for
            direct-download license purchases, it&rsquo;s a signed license JWT
            in the macOS Keychain. Neither includes payment card data.
          </p>
          <h3>What we never collect</h3>
          <ul>
            <li>Analytics or usage telemetry</li>
            <li>Crash reports (outside of Apple&rsquo;s own macOS crash reporter)</li>
            <li>Device identifiers, advertising IDs, or fingerprints</li>
            <li>Location, contacts, calendar, photos library</li>
            <li>Keystrokes, screen contents, or any data from other apps</li>
          </ul>

          <h2>Where your data lives</h2>
          <h3>On your Mac</h3>
          <p>
            All clipboard history is stored in a local SwiftData database under
            the app&rsquo;s container directory. You can delete it any time by
            uninstalling the app (see <a href="/support#uninstall">Support</a>).
          </p>
          <h3>In your iCloud (optional)</h3>
          <p>
            If you enable iCloud Sync, clippings are mirrored to the private
            CloudKit database tied to <em>your</em> Apple ID, under container
            <code className="code">iCloud.com.mlong.copied</code>. Apple&rsquo;s
            privacy policy governs that data. We do not operate any server that
            reads it.
          </p>
          <h3>Our servers</h3>
          <p>
            We operate one small service: the Stripe webhook endpoint that runs
            after a direct-download license purchase. It receives the Stripe
            checkout event, signs a license key, and sends it to the email
            address you entered at checkout. The endpoint logs the event id and
            email address for troubleshooting and retains those logs for 30
            days. It never receives or stores your clipboard contents.
          </p>

          <h2>Third-party services</h2>
          <p>These are the only external services the app interacts with:</p>
          <ul>
            <li>
              <strong>Apple</strong> &mdash; macOS, iCloud, CloudKit, Keychain,
              Accessibility API, and (for the App Store variant) StoreKit In-App
              Purchase. Governed by{" "}
              <a href="https://www.apple.com/legal/privacy/">Apple&rsquo;s privacy policy</a>.
            </li>
            <li>
              <strong>Stripe</strong> (direct-download variant only) &mdash;
              processes the one-time $4.99 iCloud Sync license. Your payment
              details go directly to Stripe; we never see them. Governed by{" "}
              <a href="https://stripe.com/privacy">Stripe&rsquo;s privacy policy</a>.
            </li>
            <li>
              <strong>EmailJS</strong> (direct-download variant only) &mdash; we
              use EmailJS to send the license-key email after a Stripe purchase.
              Only the email you entered at checkout is passed to EmailJS.
            </li>
            <li>
              <strong>Vercel</strong> &mdash; hosts <code className="code">getcopied.app</code>
              and the Stripe webhook endpoint. Standard HTTP access logs apply.
            </li>
          </ul>

          <h2>Your choices</h2>
          <ul>
            <li>
              <strong>Turn off capture.</strong> Settings → Clipboard → uncheck
              Capture images / rich text to narrow what gets saved.
            </li>
            <li>
              <strong>Exclude apps.</strong> Add any app (e.g. your password
              manager) to Excluded Apps and nothing copied from it is captured.
            </li>
            <li>
              <strong>Retention.</strong> Settings → General → Retention lets
              you auto-delete old clips after a window you choose.
            </li>
            <li>
              <strong>Turn off iCloud Sync.</strong> Settings → Sync → toggle off.
              Existing cloud records are left in place on Apple&rsquo;s side;
              delete them via
              <a href="https://icloud.com"> iCloud.com</a> → Account Settings →
              &ldquo;Advanced&rdquo; → &ldquo;Restore Files&rdquo; if needed.
            </li>
            <li>
              <strong>Delete everything.</strong> Menu bar icon → right-click →
              Clear All Clippings. For a full reset, see{" "}
              <a href="/support#uninstall">Support</a>.
            </li>
          </ul>

          <h2>Children</h2>
          <p>
            Copied is not directed to children under 13. We do not knowingly
            collect data from them.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            Material changes will be noted here along with an updated effective
            date at the top of the page. We don&rsquo;t email you about changes
            because we don&rsquo;t have your email unless you bought a
            direct-download license.
          </p>

          <h2>Contact</h2>
          <p>
            Questions, concerns, or a data request — email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Corporate
            address: Magneton Labs, LLC, United States.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- helpers ---------- */

function TLCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</div>
    </div>
  );
}
