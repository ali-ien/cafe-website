const recipient = "bakeryservice@alarak.com";
import { client } from "@/lib/sanity";

export async function POST(request: Request) {
  let payload: { email?: unknown; message?: unknown; website?: unknown };

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  // Quietly accept bot submissions that fill the hidden honeypot field.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 2 || message.length > 5000) {
    return Response.json({ error: "INVALID_MESSAGE" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !sender) {
    return Response.json({ error: "EMAIL_NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    let destination = recipient;
    try {
      const settings = await client.fetch<{email?: string} | null>(
        'coalesce(*[_type == "siteSettings" && _id == "siteSettings"][0], *[_type == "siteSettings"] | order(_updatedAt desc)[0]){email}',
        {}, {cache: "no-store"},
      );
      if (settings?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) destination = settings.email;
    } catch { /* Preserve existing delivery when the public CMS cannot be reached. */ }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        reply_to: email,
        subject: "New message from the Alarak website",
        text: `From: ${email}\n\n${message}`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Contact email provider rejected the message", {
        status: response.status,
        details: details.slice(0, 1000),
      });
      return Response.json({ error: "EMAIL_DELIVERY_FAILED" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email delivery request failed", error);
    return Response.json({ error: "EMAIL_DELIVERY_FAILED" }, { status: 502 });
  }
}
