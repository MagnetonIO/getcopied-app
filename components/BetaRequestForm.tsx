"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { submitBetaRequest, type BetaRequestResult } from "@/lib/beta-request";

const inputClass = "mt-2 block w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2.5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400";

export function BetaRequestForm() {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<BetaRequestResult | null>(null);
  const completed = result?.status === "success" || result?.status === "verification-required";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || completed) return;
    const data = new FormData(event.currentTarget);
    submitting.current = true;
    setPending(true);
    setResult(null);
    try {
      setResult(await submitBetaRequest({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        consent: data.get("consent") === "on",
        website: String(data.get("website") ?? ""),
      }));
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Beta request" aria-busy={pending} className="mt-8">
      <fieldset disabled={pending || completed} className="space-y-5 disabled:opacity-60">
        <div>
          <label htmlFor="beta-name" className="text-sm font-medium">Name</label>
          <input id="beta-name" name="name" autoComplete="name" required maxLength={200} className={inputClass} />
        </div>
        <div>
          <label htmlFor="beta-email" className="text-sm font-medium">Email</label>
          <input id="beta-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inputClass} />
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="beta-website">Website</label>
          <input id="beta-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-emerald-400" />
          <span>
            I agree to Magneton Labs using my name and email to manage my Copied beta request and contact me about beta access.
            {" "}<Link href="/privacy" className="link">Privacy Policy</Link>
          </span>
        </label>
        <button type="submit" className="min-h-11 w-full rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400 disabled:cursor-not-allowed">
          {pending ? "Submitting..." : completed ? "Request received" : "Request beta access"}
        </button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="mt-5 text-sm leading-6">
        {result?.status === "error" && <p role="alert" className="text-red-300">{result.message}</p>}
        {result?.status === "verification-required" && (
          <p>Check your email to verify your address. Verification is required before your request can proceed. This is not a TestFlight invitation or confirmation of access.</p>
        )}
        {result?.status === "success" && (
          <p>Request received. Check your email for any verification steps. This does not confirm a TestFlight invitation or installation.</p>
        )}
      </div>
    </form>
  );
}
