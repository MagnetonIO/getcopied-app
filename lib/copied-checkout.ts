/**
 * The Stripe account is shared with other products, so a completed checkout
 * is only a Copied purchase when one of its line items uses the Copied price.
 */
export type CopiedCheckoutDecision =
  | { action: "fulfil" }
  | { action: "ignore"; reason: "foreign-product" | "missing-price-config" };

export type ListCheckoutLineItems = (
  sessionId: string,
  params: { limit: number },
) => Promise<{ data: ReadonlyArray<{ price?: { id: string } | null }> }>;

export function decideCopiedCheckout(
  copiedPriceId: string | undefined,
  lineItemPriceIds: ReadonlyArray<string | null | undefined>,
): CopiedCheckoutDecision {
  if (!copiedPriceId) return { action: "ignore", reason: "missing-price-config" };
  if (lineItemPriceIds.includes(copiedPriceId)) return { action: "fulfil" };
  return { action: "ignore", reason: "foreign-product" };
}

export async function loadCopiedCheckoutDecision(
  sessionId: string,
  copiedPriceId: string | undefined,
  listLineItems: ListCheckoutLineItems,
): Promise<CopiedCheckoutDecision> {
  if (!copiedPriceId) return decideCopiedCheckout(copiedPriceId, []);
  const lineItems = await listLineItems(sessionId, { limit: 100 });
  return decideCopiedCheckout(
    copiedPriceId,
    lineItems.data.map((item) => item.price?.id),
  );
}
