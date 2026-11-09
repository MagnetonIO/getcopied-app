export type BetaRequestFields = {
  name: string;
  email: string;
  consent: boolean;
  website: string;
};

export type BetaRequestResult =
  | { status: "success" | "verification-required" }
  | { status: "error"; message: string };

export async function submitBetaRequest(
  fields: BetaRequestFields,
  fetcher: typeof fetch = fetch,
): Promise<BetaRequestResult> {
  const name = fields.name.trim();
  const email = fields.email.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || fields.consent !== true) {
    return { status: "error", message: "Enter your name, a valid email address, and consent to beta-request emails." };
  }

  try {
    const response = await fetcher("https://admin.magnetonlabs.com/api/public/beta-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ appSlug: "copied", name, email, consent: true, website: fields.website }),
    });
    if (!response.ok) {
      return {
        status: "error",
        message: response.status === 429
          ? "Too many requests. Please try again later."
          : "We could not confirm your request. Please try again or contact support@getcopied.app.",
      };
    }

    const data: unknown = await response.json().catch(() => null);
    if (data && typeof data === "object") {
      if (("success" in data && data.success === false) || ("error" in data && data.error)) {
        return { status: "error", message: "We could not confirm your request. Please try again or contact support@getcopied.app." };
      }
      if (("verificationRequired" in data && data.verificationRequired === true)
        || ("status" in data && data.status === "verification_required")) {
        return { status: "verification-required" };
      }
    }
    return { status: "success" };
  } catch {
    return { status: "error", message: "We could not confirm your request. Check your connection and try again, or contact support@getcopied.app." };
  }
}
