const OWNER_EMAIL = process.env.CONTACT_EMAIL || "kalchenko2022@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Oleh Kalchenko <onboarding@resend.dev>";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

async function sendTelegram({ name, email, subject, message }) {
  const token = process.env.TELEGRAMM_TOKEN || process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAMM_ID || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, skipped: true, reason: "telegram credentials missing" };
  }

  const text = [
    "<b>Neue Nachricht / Новое сообщение</b>",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>E-Mail:</b> ${escapeHtml(email)}`,
    subject ? `<b>Betreff / Тема:</b> ${escapeHtml(subject)}` : null,
    "",
    `<b>Nachricht / Сообщение:</b>`,
    escapeHtml(message),
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, body };
  }
  return { ok: true };
}

async function sendEmail({ name, email, subject, message }) {
  const apiKey = process.env.RESEND_API_KEY || process.env.resendapikey;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: "resend api key missing" };
  }

  const safeSubject = subject
    ? `New message from ${name}: ${subject}`
    : `New message from ${name}`;

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.5;">
      <h2 style="margin:0 0 12px;">New message from the website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;border-left:3px solid #A8D5BA;padding:8px 12px;background:#f8f8f8;">${escapeHtml(message)}</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: safeSubject,
      html,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, body };
  }
  return { ok: true };
}

// Simple in-memory rate limit (per IP) – best effort, survives within a single runtime.
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 5;
const rateStore = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = rateStore.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateStore.set(ip, entry);
  return entry.count <= RATE_MAX;
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests, please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, email, subject, message, website } = body || {};

    // Honeypot — real users never fill this.
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
    if (String(message).length > 4000 || String(name).length > 200) {
      return new Response(
        JSON.stringify({ error: "Message or name too long." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : "",
      message: String(message).trim(),
    };

    const [telegramResult, emailResult] = await Promise.all([
      sendTelegram(payload).catch((e) => ({ ok: false, error: String(e) })),
      sendEmail(payload).catch((e) => ({ ok: false, error: String(e) })),
    ]);

    const anySuccess = telegramResult.ok || emailResult.ok;
    if (!anySuccess) {
      console.error("Contact delivery failed", { telegramResult, emailResult });
      return new Response(
        JSON.stringify({
          error: "Failed to deliver message. Please try again later.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        telegram: telegramResult.ok,
        email: emailResult.ok,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("/api/contact error", error);
    return new Response(
      JSON.stringify({ error: "Unexpected server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, hint: "POST a JSON body with name/email/message." }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
