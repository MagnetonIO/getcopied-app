import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use — Copied",
  description:
    "Terms and conditions for Copied, the macOS clipboard manager by Magneton Labs, LLC.",
};

const EFFECTIVE_DATE = "April 21, 2026";
const SUPPORT_EMAIL = "support@getcopied.app";

export default function TermsPage() {
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
            Terms of Use
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Plain-English agreement between you and Magneton Labs, LLC when you
            use Copied. Short, but binding.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-6 pb-24">
        <article className="prose prose-invert max-w-3xl mx-auto prose-headings:tracking-tight prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed prose-li:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">

          <h2>1. Agreement</h2>
          <p>
            By downloading, installing, or using the Copied macOS application
            (&ldquo;the app&rdquo;) or the{" "}
            <a href="https://getcopied.app">getcopied.app</a> website, you agree
            to these terms. If you don&rsquo;t, don&rsquo;t use the app. The
            agreement is between you and Magneton Labs, LLC (&ldquo;we,&rdquo;
            &ldquo;us&rdquo;), a U.S. limited liability company.
          </p>

          <h2>2. License</h2>
          <h3>The free, local version</h3>
          <p>
            We grant you a personal, non-transferable, non-exclusive license to
            install and use the app&rsquo;s local (free) features on any Mac
            you own or control, for as long as these terms are in effect.
          </p>
          <h3>iCloud Sync (paid)</h3>
          <p>
            Unlocking iCloud Sync is a <strong>one-time purchase</strong> of
            $4.99 USD (or local-currency equivalent). The unlock is a license
            to use the sync feature on up to three Macs signed into the same
            iCloud account. Licenses are tied to the iCloud identity used at
            purchase; they aren&rsquo;t transferable between people.
          </p>
          <h3>What you can&rsquo;t do</h3>
          <ul>
            <li>Reverse-engineer, decompile, or disassemble the app beyond what applicable law permits.</li>
            <li>Redistribute, resell, sublicense, or lease the app.</li>
            <li>Remove copyright or attribution notices.</li>
            <li>Bypass license-verification mechanisms or share license keys with people outside your household.</li>
          </ul>

          <h2>3. Purchases &amp; refunds</h2>
          <p>
            Purchases through the Mac App Store are governed by Apple&rsquo;s
            refund policy — request refunds through{" "}
            <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
          </p>
          <p>
            Purchases through getcopied.app (Stripe) are eligible for a refund
            within <strong>14 days</strong> of purchase, for any reason. Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the
            address you used at checkout. After 14 days refunds are at our
            discretion.
          </p>

          <h2>4. Acceptable use</h2>
          <p>
            You may use Copied for personal or business productivity. You
            won&rsquo;t use it to capture or store data you don&rsquo;t have
            the right to possess — credentials stolen from another person,
            regulated data you aren&rsquo;t authorized to handle, or content
            that violates applicable law. We don&rsquo;t monitor your local
            clipboard or your iCloud data, but nothing in these terms lets you
            use the app unlawfully.
          </p>

          <h2>5. Your content</h2>
          <p>
            Anything you copy into Copied stays your content. We don&rsquo;t
            claim rights to it, don&rsquo;t sell or share it, and don&rsquo;t
            use it to train models. See the{" "}
            <a href="/privacy">Privacy Policy</a> for the data handling
            specifics.
          </p>

          <h2>6. Updates</h2>
          <p>
            We may release updates that change features, performance, or
            security. We try not to remove features people rely on without a
            migration path, but we can&rsquo;t promise every feature will
            exist forever.
          </p>

          <h2>7. Third-party services</h2>
          <p>
            The app interacts with Apple services (iCloud, CloudKit, App Store,
            Keychain), and the License variant also talks to Stripe for payment
            and EmailJS for license-key delivery. Those services are governed
            by their own terms — we&rsquo;re not responsible for their
            availability or behavior.
          </p>

          <h2>8. No warranty</h2>
          <p>
            The app is provided <strong>&ldquo;as is&rdquo;</strong>, without
            warranties of any kind — express or implied — including
            merchantability, fitness for a particular purpose, and
            non-infringement. We do our best to keep it stable, but we
            don&rsquo;t warrant that it will be uninterrupted, error-free, or
            fit for any particular purpose you have in mind.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the fullest extent allowed by law, Magneton Labs, LLC
            isn&rsquo;t liable for indirect, incidental, special,
            consequential, or punitive damages — including lost data, lost
            profits, or business interruption — arising from your use of the
            app, even if we&rsquo;ve been advised of the possibility of such
            damages. Our total liability to you for any claim arising from
            these terms won&rsquo;t exceed the amount you paid for Copied in
            the 12 months before the claim, which for most users is either $0
            or $4.99.
          </p>

          <h2>10. Termination</h2>
          <p>
            You can terminate this agreement at any time by uninstalling the
            app. We can terminate the license if you materially breach these
            terms; in that case, stop using the app. Sections on no-warranty,
            limitation of liability, and governing law survive termination.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Delaware,
            USA, without regard to conflict-of-laws principles. Disputes will
            be resolved in the state or federal courts located in Delaware,
            and you consent to personal jurisdiction there.
          </p>

          <h2>12. Changes</h2>
          <p>
            We may update these terms. Material changes will be reflected in
            the effective date at the top of the page. Continued use of the
            app after a change means you accept the updated terms.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Corporate
            address: Magneton Labs, LLC, United States.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}
