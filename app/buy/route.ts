import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!stripeSecretKey || !priceId) {
    return new NextResponse("Stripe not configured (missing env vars)", { status: 500 });
  }
  const stripe = new Stripe(stripeSecretKey);

  const origin = new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/unlock?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      allow_promotion_codes: true,
    });
    if (!session.url) {
      return new NextResponse("Stripe did not return a checkout URL", { status: 502 });
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Checkout error: ${msg}`, { status: 500 });
  }
}
