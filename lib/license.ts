import crypto from "node:crypto";

/**
 * Signs a license JWT for the Copied app to verify offline.
 *
 * Format: `<base64url(payload_json)>.<base64url(ed25519_signature)>`
 * The payload bytes — not the base64 string — are what gets signed, matching
 * `LicenseValidator.swift` in the Copied app.
 *
 * The private key is read from the LICENSE_PRIVATE_KEY_PEM env var (paste the
 * whole PEM block, including -----BEGIN/END----- lines).
 */

export type LicensePayload = {
  product: string;
  email: string;
  purchasedAt: string;  // ISO 8601
  deviceLimit: number;
};

let cachedKey: crypto.KeyObject | null = null;

function getKey(): crypto.KeyObject {
  if (cachedKey) return cachedKey;
  const pem = process.env.LICENSE_PRIVATE_KEY_PEM;
  if (!pem) throw new Error("LICENSE_PRIVATE_KEY_PEM env var not set");
  cachedKey = crypto.createPrivateKey({ key: pem, format: "pem" });
  return cachedKey;
}

function base64url(buf: Buffer | Uint8Array): string {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function signLicense(payload: LicensePayload): string {
  const payloadBytes = Buffer.from(JSON.stringify(payload));
  const signature = crypto.sign(null, payloadBytes, getKey());
  return `${base64url(payloadBytes)}.${base64url(signature)}`;
}
