const recipient = "wahby.compte@gmail.com";

export async function POST(request: Request) {
  let payload: { email?: unknown; message?: unknown; website?: unknown };

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Quietly accept bot submissions that fill the hidden honeypot field.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return Response.json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 2 || message.length > 5000) {
    return Response.json({ error: "Enter a valid email and a message under 5,000 characters." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !sender) {
    return Response.json({ error: "Email delivery is not configured yet." }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: "New message from the Alarak website",
        text: `From: ${email}\n\n${message}`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json({ error: "The message could not be sent. Please try again later." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The message could not be sent. Please try again later." }, { status: 502 });
  }
}
