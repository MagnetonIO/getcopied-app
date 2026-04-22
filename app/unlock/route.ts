import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { signLicense } from "@/lib/license";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionId = new URL(req.url).searchParams.get("session");
  if (!sessionId) {
    return new NextResponse("Missing session id", { status: 400 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return new NextResponse("Stripe not configured", { status: 500 });
  }
  const stripe = new Stripe(stripeSecretKey);

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return new NextResponse("Invalid session id", { status: 404 });
  }

  if (session.payment_status !== "paid") {
    return new NextResponse("Payment not completed", { status: 402 });
  }

  const email =
    session.customer_details?.email ??
    session.customer_email ??
    "unknown@example.com";

  const license = signLicense({
    product: "copied-mac-icloud",
    email,
    purchasedAt: new Date().toISOString(),
    deviceLimit: 3,
  });

  const deepLink = `copied://unlock?key=${encodeURIComponent(license)}`;

  const html = `<!doctype html>
<html><head>
<meta charset="utf-8">
<title>Unlocking Copied…</title>
<meta http-equiv="refresh" content="0; url=${deepLink}">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#000;color:#f5f5f7;padding:40px 20px;max-width:560px;margin:0 auto;line-height:1.5}
  a{color:#34d399}
  .btn{display:inline-block;padding:10px 20px;background:#0071e3;color:#fff;border-radius:999px;text-decoration:none;font-weight:500}
  pre{background:#1a1a1a;color:#f5f5f7;padding:12px;border-radius:8px;font-size:11px;line-height:1.4;white-space:pre-wrap;word-break:break-all;border:1px solid #333}
</style>
</head><body>
<h2>Thanks — unlocking Copied…</h2>
<p>If the app didn't open automatically, <a class="btn" href="${deepLink}">click to unlock</a>.</p>
<p style="margin-top:24px">Save your license key (emailed to ${email}). You can paste it in Copied → Settings → Sync → Enter License Key… on any Mac:</p>
<pre>${license}</pre>
<p style="font-size:13px;color:#86868b;margin-top:24px">— Magneton Labs</p>
</body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
