import assert from "node:assert/strict";
import { test } from "node:test";
import { decideCopiedCheckout, loadCopiedCheckoutDecision } from "../lib/copied-checkout.ts";

const PRICE = "price_copied";

test("fulfils a checkout whose line items include the Copied price", () => {
  assert.deepEqual(decideCopiedCheckout(PRICE, [PRICE]), { action: "fulfil" });
  assert.deepEqual(decideCopiedCheckout(PRICE, ["price_other", PRICE]), { action: "fulfil" });
});

test("ignores a checkout for another product on the same Stripe account", () => {
  assert.deepEqual(decideCopiedCheckout(PRICE, ["price_magneton_consulting"]), {
    action: "ignore",
    reason: "foreign-product",
  });
});

test("ignores a checkout with no priced line items", () => {
  for (const priceIds of [[], [null], [undefined]]) {
    assert.deepEqual(decideCopiedCheckout(PRICE, priceIds), { action: "ignore", reason: "foreign-product" });
  }
});

test("skips every checkout when the Copied price is not configured", () => {
  for (const expected of [undefined, ""]) {
    assert.deepEqual(decideCopiedCheckout(expected, [PRICE]), { action: "ignore", reason: "missing-price-config" });
  }
});

test("reads the session's line items from Stripe to decide", async () => {
  const calls = [];
  const decision = await loadCopiedCheckoutDecision("cs_test_1", PRICE, async (sessionId, params) => {
    calls.push({ sessionId, params });
    return { data: [{ price: { id: PRICE } }] };
  });
  assert.deepEqual(decision, { action: "fulfil" });
  assert.deepEqual(calls, [{ sessionId: "cs_test_1", params: { limit: 100 } }]);
});

test("ignores a foreign session read from Stripe", async () => {
  const decision = await loadCopiedCheckoutDecision("cs_test_2", PRICE, async () => ({
    data: [{ price: { id: "price_magneton_consulting" } }, { price: null }],
  }));
  assert.deepEqual(decision, { action: "ignore", reason: "foreign-product" });
});

test("does not call Stripe when the Copied price is not configured", async () => {
  let called = false;
  const decision = await loadCopiedCheckoutDecision("cs_test_3", undefined, async () => {
    called = true;
    return { data: [] };
  });
  assert.deepEqual(decision, { action: "ignore", reason: "missing-price-config" });
  assert.equal(called, false);
});
