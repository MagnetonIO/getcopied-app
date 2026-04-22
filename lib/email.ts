/**
 * Fires the license-delivery email via EmailJS's REST API.
 *
 * DMARC: the EmailJS service connected in the dashboard is support@magnetonlabs.com,
 * so set the template's Settings → From Email to support@magnetonlabs.com. DKIM +
 * SPF for magnetonlabs.com (Google Workspace) aligns and DMARC passes. Set Reply To
 * to support@getcopied.app if you want replies routed there.
 */
export async function sendLicenseEmail(params: {
  email: string;
  license: string;
}): Promise<string> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return "skipped (EmailJS env vars not set)";
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: params.email,
        email: params.email,
        user_email: params.email,
        reply_to: params.email,
        license_key: params.license,
        purchase_date: new Date().toISOString().slice(0, 10),
      },
    }),
  });

  const body = await res.text();
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${body}`);
  return `sent to ${params.email} (${res.status})`;
}
