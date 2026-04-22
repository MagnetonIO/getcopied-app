// Local dev harness for the Copied License flow. In production these routes
// move to Vercel Functions inside the main Next.js site (Phase 7). Kept as
// a standalone Node server here so testing doesn't require tearing apart the
// static export config of the marketing site.
//
// Flow:
//   1. App opens  http://localhost:3000/buy?app=mac  in the user's browser.
//   2. This server creates a Stripe Checkout Session (test mode) and redirects
//      the browser to it.
//   3. User pays with card 4242 4242 4242 4242.
//   4. Stripe redirects back to /unlock?session=cs_test_... (success URL).
//   5. /unlock handler: fetches the Session, looks up the license we signed
//      in the webhook, then serves an HTML page that deep-links to
//      copied://unlock?key=<signed-jwt>.
//   6. App catches the URL, verifies Ed25519 signature against its baked-in
//      public key, stores in Keychain, flips iCloudSyncPurchased=true, restarts.
//
// Run:
//   STRIPE_SECRET_KEY=sk_test_...  (from Stripe Dashboard → Developers → API keys)
//   STRIPE_WEBHOOK_SECRET=whsec_... (Stripe CLI prints this after `stripe listen`)
//   STRIPE_PRICE_ID=price_... (create in Stripe Dashboard → Products)
//   LICENSE_PRIVATE_KEY_PATH=/absolute/path/to/.keys/license/signing.pem
//   node server.js
//
// Test via (in a second terminal):
//   stripe listen --forward-to localhost:3000/webhook
//   (copy the `whsec_...` it prints into STRIPE_WEBHOOK_SECRET and restart this server)
//
// Paste stripeCheckoutURL override into Copied (DEBUG) UserDefaults, or the
// app reads it automatically when CopiedStripeLocalOverride is set (see app).

import express from "express";
import crypto from "node:crypto";
import fs from "node:fs";
import Stripe from "stripe";

const PORT = process.env.PORT || 3000;
const stripe = new Stripe(requireEnv("STRIPE_SECRET_KEY"));
const endpointSecret = requireEnv("STRIPE_WEBHOOK_SECRET");
const priceId = requireEnv("STRIPE_PRICE_ID");
const privKey = loadPrivateKey(requireEnv("LICENSE_PRIVATE_KEY_PATH"));

// EmailJS is optional — webhook still works without it, just won't email.
const emailjs = {
  serviceId: process.env.EMAILJS_SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID,
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY
};

// session_id → signed license JWT. In production use KV/Redis with TTL.
const licensesBySession = new Map();

const app = express();

// ------------------------------------------------------------
// POST /webhook — Stripe delivers here (must receive raw body)
// ------------------------------------------------------------
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], endpointSecret);
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email ?? session.customer_email ?? "unknown@example.com";
    const license = signLicense({
      product: "copied-mac-icloud",
      email,
      purchasedAt: new Date().toISOString(),
      deviceLimit: 3
    });
    licensesBySession.set(session.id, license);
    console.log(`✓ Issued license for session ${session.id} → ${email}`);

    // Fire-and-forget the license email. We don't await / retry — if EmailJS
    // is down, the user still gets the license via the /unlock redirect flow
    // and can copy it from their Stripe receipt. Production Vercel version
    // (Phase 7) should write to a queue on failure.
    sendLicenseEmail({ email, license })
      .then((r) => console.log(`  email: ${r}`))
      .catch((err) => console.error(`  email error:`, err.message));
  }

  res.json({ received: true });
});

// All subsequent routes use standard JSON parsing
app.use(express.json());

// ------------------------------------------------------------
// GET /buy?app=mac — create Checkout Session, redirect to Stripe
// ------------------------------------------------------------
app.get("/buy", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `http://localhost:${PORT}/unlock?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:${PORT}/cancel`,
      allow_promotion_codes: true
    });
    res.redirect(303, session.url);
  } catch (err) {
    console.error("Checkout create failed:", err);
    res.status(500).send(`Checkout error: ${err.message}`);
  }
});

// ------------------------------------------------------------
// GET /unlock?session=cs_test_... — look up license + deep-link
// ------------------------------------------------------------
app.get("/unlock", async (req, res) => {
  const sessionId = String(req.query.session ?? "");
  if (!sessionId) return res.status(400).send("Missing session id");

  // Wait up to ~10s for the webhook to land (Stripe delivers it asynchronously
  // and /unlock is hit from the browser the moment Stripe redirects).
  for (let i = 0; i < 20; i++) {
    if (licensesBySession.has(sessionId)) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  const license = licensesBySession.get(sessionId);
  if (!license) {
    return res.status(504).send("License not ready yet. Reload this page in a few seconds.");
  }

  const deepLink = `copied://unlock?key=${encodeURIComponent(license)}`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html><head>
<meta charset="utf-8">
<title>Unlocking Copied…</title>
<meta http-equiv="refresh" content="0; url=${deepLink}">
<style>body{font-family:-apple-system,sans-serif;padding:40px;max-width:560px;margin:0 auto}a{color:#0a84ff}</style>
</head><body>
<h2>Thank you — unlocking Copied…</h2>
<p>If the app doesn't open automatically, <a href="${deepLink}">click here to unlock</a>.</p>
<p>License key (save this in case you reinstall):</p>
<textarea readonly style="width:100%;height:100px;font-family:monospace;font-size:11px">${license}</textarea>
</body></html>`);
});

app.get("/cancel", (_req, res) => res.send("Payment canceled."));

app.listen(PORT, () => {
  console.log(`copied-webhook-dev listening on http://localhost:${PORT}`);
  console.log(`  /buy?app=mac   — creates a Stripe Checkout session`);
  console.log(`  /webhook       — Stripe delivers events here (forward via stripe-cli)`);
  console.log(`  /unlock?session=... — browser lands here after successful payment`);
});

// ---------- helpers ----------

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
  return v;
}

function loadPrivateKey(path) {
  return crypto.createPrivateKey({
    key: fs.readFileSync(path),
    format: "pem"
  });
}

function base64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function signLicense(payload) {
  const payloadBytes = Buffer.from(JSON.stringify(payload));
  const signature = crypto.sign(null, payloadBytes, privKey);
  return `${base64url(payloadBytes)}.${base64url(signature)}`;
}

async function sendLicenseEmail({ email, license }) {
  if (!emailjs.serviceId || !emailjs.templateId || !emailjs.publicKey || !emailjs.privateKey) {
    return "skipped (EmailJS env vars not set)";
  }
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: emailjs.templateId,
      user_id: emailjs.publicKey,
      accessToken: emailjs.privateKey,
      template_params: {
        // to_email is what the Settings → "To Email" field should reference.
        // email/user_email/reply_to are aliases for starter templates that
        // default to a different variable name.
        to_email: email,
        email: email,
        user_email: email,
        reply_to: email,
        license_key: license,
        purchase_date: new Date().toISOString().slice(0, 10)
      }
    })
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${body}`);
  return `sent to ${email} (${res.status})`;
}
