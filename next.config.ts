import type { NextConfig } from "next";

// Removed `output: "export"` in Phase 7 so server-side routes work:
//   /buy           → creates a Stripe Checkout session and redirects
//   /unlock        → verifies payment + signs license + deep-links copied://unlock
//   /api/stripe/webhook → handles checkout.session.completed (license email)
// Existing marketing pages (/, /support, /privacy, /terms, /blog/*) still
// render as static builds on deploy; they just go out through the edge
// runtime instead of a CDN directly.
const nextConfig: NextConfig = {};

export default nextConfig;
