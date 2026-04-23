// Vercel serverless function: POST /api/contact
// Sends inbound contact form messages to Telegram bot + Resend email.

const OWNER_EMAIL = process.env.CONTACT_EMAIL || 'kalchenko2022@gmail.com';
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'Oleh Kalchenko <onboarding@resend.dev>';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

async function sendTelegram({ name, email, subject, message }) {
  const token = process.env.TELEGRAMM_TOKEN || process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAMM_ID || process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return { ok: false, skipped: true, reason: 'telegram credentials missing' };
  }
  const text = [
    '<b>Neue Nachricht / Новое сообщение</b>',
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>E-Mail:</b> ${escapeHtml(email)}`,
    subject ? `<b>Betreff / Тема:</b> ${escapeHtml(subject)}` : null,
    '',
    '<b>Nachricht / Сообщение:</b>',
    escapeHtml(message),
  ]
    .filter(Boolean)
    .join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, body };
  }
  return { ok: true };
}

async function sendEmail({ name, email, subject, message }) {
  const apiKey = process.env.RESEND_API_KEY || process.env.resendapikey;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: 'resend api key missing' };
  }
  const safeSubject = subject
    ? `New message from ${name}: ${subject}`
    : `New message from ${name}`;
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; line-height: 1.5;">
      <h2 style="margin:0 0 12px;">New message from the website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;border-left:3px solid #A8D5BA;padding:8px 12px;background:#f8f8f8;">${escapeHtml(message)}</p>
    </div>
  `;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: safeSubject,
      html,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || '-'}\n\n${message}`,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, body };
  }
  return { ok: true };
}

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

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip =
      (req.headers['x-forwarded-for'] || '').toString().split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      'unknown';

    if (!rateLimit(ip)) {
      return res.status(429).json({
        error: 'Too many requests, please try again later.',
      });
    }

    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body || {};
    const { name, email, subject, message, website } = body;

    // Honeypot: real users don't fill `website`
    if (website) return res.status(200).json({ success: true });

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Name, email and message are required.' });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: 'Please provide a valid email address.' });
    }
    if (String(message).length > 4000 || String(name).length > 200) {
      return res.status(400).json({ error: 'Message or name too long.' });
    }

    const [telegram, email_] = await Promise.all([
      sendTelegram({ name, email, subject, message }).catch((e) => ({
        ok: false,
        error: e?.message,
      })),
      sendEmail({ name, email, subject, message }).catch((e) => ({
        ok: false,
        error: e?.message,
      })),
    ]);

    if (!telegram.ok && !email_.ok) {
      return res
        .status(502)
        .json({ error: 'Unable to deliver message, please try again later.' });
    }

    return res.status(200).json({
      success: true,
      telegram: telegram.ok,
      email: email_.ok,
    });
  } catch (err) {
    console.error('contact api error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
