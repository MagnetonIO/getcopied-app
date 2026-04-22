# copied-webhook-dev

Local Stripe test harness for the Copied License variant. Lets you run the full
purchase flow end-to-end on your Mac before anything is deployed to production
(Phase 7).

## One-time setup

1. **Stripe test-mode keys.** In [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys):
   - Copy the **Secret key** → `sk_test_...`
   - Create a **Product** (Dashboard → Products → + Add product) with a **$4.99 one-time** price.
     Copy its **Price ID** → `price_...`

2. **Private key.** Uses the Ed25519 private key at the repo root:
   `../copied-reverse-engineer/.keys/license/signing.pem`
   (gitignored; generated in Phase 3).

3. **Env file.** Create `.env.local` next to this README:

   ```sh
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   LICENSE_PRIVATE_KEY_PATH=/Users/mlong/Documents/Development/copied-reverse-engineer/.keys/license/signing.pem
   # Filled in after first `stripe listen` run, see step 2 of Running below
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Running (three terminals)

**Terminal 1 — Stripe CLI listener:**
```sh
stripe listen --forward-to localhost:3000/webhook
```
Prints something like `Ready! Your webhook signing secret is whsec_abc123...`.
Copy that secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

**Terminal 2 — webhook server:**
```sh
cd /Users/mlong/Documents/Development/getcopied-app/webhook-dev
set -a; source .env.local; set +a
npm start
```
Should print `copied-webhook-dev listening on http://localhost:3000`.

**Terminal 3 — point the app at localhost (DEBUG builds only):**
```sh
defaults write com.mlong.copied.mac CopiedStripeLocalOverride "http://localhost:3000/buy?app=mac"
```

## Test the flow

1. Install the License PKG: `./scripts/build.sh paid-license` in the Copied repo
   (auto-opens Installer).
2. Launch Copied → ⌘, → **Sync** tab → click **Unlock iCloud Sync — $4.99**.
3. Browser opens → redirects to Stripe Checkout (test mode — real domain,
   test card).
4. Pay with **4242 4242 4242 4242**, any future expiry, any CVC, any ZIP.
5. Stripe redirects to `localhost:3000/unlock?session=cs_test_...`.
6. The unlock page fires `copied://unlock?key=<jwt>` — the app catches it,
   verifies the Ed25519 signature, stores the license in Keychain, and restarts.
7. After restart: **Sync is active** on the Sync tab.

## Reset for a fresh test

```sh
./scripts/reset-iap.sh            # clears UserDefaults flag
security delete-generic-password -s com.mlong.copied.license   # clears Keychain
```

## Going to production (Phase 7)

When ready to ship: migrate these three routes (`/buy`, `/webhook`, `/unlock`)
to Next.js Server Actions or Vercel Functions in the main getcopied-app repo,
remove the `output: "export"` config line (or split into a separate API deploy),
bind real `sk_live_...` + `whsec_...` secrets, and undo the
`CopiedStripeLocalOverride` default.
