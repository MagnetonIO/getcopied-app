import type { Metadata } from "next";
import Link from "next/link";
import { BetaRequestForm } from "@/components/BetaRequestForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Copied iOS Beta",
  description: "Request Copied iOS beta access or try the public TestFlight link. Availability is managed through TestFlight.",
  alternates: { canonical: "/beta" },
};

export default function BetaPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <section className="px-6 pt-28 pb-16">
        <div className="mx-auto max-w-lg">
          <img src="/icon.png" alt="Copied" width={64} height={64} className="mb-6 h-16 w-16" />
          <h1 className="text-3xl font-bold leading-tight">Copied iOS Beta</h1>
          <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
            Request beta access for iPhone and iPad. A request may require email verification and does not guarantee an invitation or a place in TestFlight.
          </p>
          <BetaRequestForm />
          <div className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-[var(--text-secondary)]">
            <p>
              Prefer the public beta? <a href="https://testflight.apple.com/join/A54b13Rv" className="link">Open Copied in TestFlight</a>.
              {" "}Apple will show whether testing is available and any installation steps.
            </p>
            <p className="mt-4">
              iOS uses Apple in-app purchase or Restore Purchases for iCloud Sync, not website license keys.
              {" "}<Link href="/docs#icloud-sync" className="link">iOS activation details</Link>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
