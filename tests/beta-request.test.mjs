import assert from "node:assert/strict";
import { test } from "node:test";
import { submitBetaRequest } from "../lib/beta-request.ts";

const fields = { name: "  Ada Lovelace  ", email: " ada@example.com ", consent: true, website: "" };

test("posts the public Copied contract without credentials", async () => {
  const result = await submitBetaRequest(fields, async (url, options) => {
    assert.equal(url, "https://admin.magnetonlabs.com/api/public/beta-requests");
    assert.equal(options.method, "POST");
    assert.equal(options.credentials, "omit");
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(options.body), {
      appSlug: "copied", name: "Ada Lovelace", email: "ada@example.com", consent: true, website: "",
    });
    return Response.json({ success: true });
  });
  assert.equal(result.status, "success");
});

test("distinguishes email verification from acceptance", async () => {
  for (const body of [{ verificationRequired: true }, { status: "verification_required" }]) {
    const result = await submitBetaRequest(fields, async () => Response.json(body));
    assert.equal(result.status, "verification-required");
  }
});

test("does not require a response body for an accepted request", async () => {
  const result = await submitBetaRequest(fields, async () => new Response(null, { status: 204 }));
  assert.equal(result.status, "success");
});

test("requires name, email and explicit consent before posting", async () => {
  for (const invalid of [{ name: " " }, { email: "not-an-email" }, { consent: false }]) {
    let sent = false;
    const result = await submitBetaRequest({ ...fields, ...invalid }, async () => {
      sent = true;
      return Response.json({ success: true });
    });
    assert.equal(result.status, "error");
    assert.equal(sent, false);
  }
});

test("includes the honeypot value in the server request", async () => {
  await submitBetaRequest({ ...fields, website: "https://spam.example" }, async (_, options) => {
    assert.equal(JSON.parse(options.body).website, "https://spam.example");
    return Response.json({ success: true });
  });
});

test("handles HTTP, application, network and timeout failures without claiming receipt", async () => {
  for (const fetcher of [
    async () => new Response("Unavailable", { status: 503 }),
    async () => Response.json({ success: false, error: "Rejected" }),
    async () => { throw new TypeError("Failed to fetch"); },
    async () => { throw new DOMException("Timed out", "TimeoutError"); },
  ]) {
    const result = await submitBetaRequest(fields, fetcher);
    assert.equal(result.status, "error");
    assert.ok(result.message);
  }
});

test("provides a retry message for rate limits", async () => {
  const result = await submitBetaRequest(fields, async () => new Response(null, { status: 429 }));
  assert.equal(result.status, "error");
  assert.match(result.message, /later/i);
});
