import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { signLicense } from "@/lib/license";
import { sendLicenseEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Stripe delivers webhook events here after a Checkout completes. We only
 * handle `checkout.session.completed` — its sole job is to fire the
 * license-delivery email. The actual license JWT for the immediate unlock
 * flow is signed synchronously in /unlock, so this route is async / best-
 * effort.
 */
export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !webhookSecret) {
    return new NextResponse("Stripe not configured", { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing stripe-signature", { status: 400 });

  const stripe = new Stripe(stripeSecretKey);
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Webhook signature verification failed: ${msg}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email =
      session.customer_details?.email ??
      session.customer_email ??
      null;

    if (email) {
      const license = signLicense({
        product: "copied-mac-icloud",
        email,
        purchasedAt: new Date().toISOString(),
        deviceLimit: 3,
      });
      try {
        const result = await sendLicenseEmail({ email, license });
        console.log(`✓ License email: ${result} (session ${session.id})`);
      } catch (err) {
        console.error("License email failed:", err);
        // Swallow — we don't want Stripe to retry the whole webhook; the user
        // already got their license via the /unlock redirect page.
      }
    }
  }

  return NextResponse.json({ received: true });
}
