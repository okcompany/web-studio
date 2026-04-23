// Vercel serverless function: GET|POST|DELETE /api/admin/login
// Cookie-based session auth for the admin panel.

const COOKIE_NAME = 'ok_admin_session';
const DEFAULT_PASSWORD = 'admin';

function getExpectedPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSessionToken() {
  const seed = process.env.ADMIN_SESSION_SECRET || getExpectedPassword();
  return `ok-${Buffer.from(seed).toString('base64url')}`;
}

function buildCookie(value, maxAgeSeconds) {
  return [
    `${COOKIE_NAME}=${value}`,
    'Path=/',
    `Max-Age=${maxAgeSeconds}`,
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
  ].join('; ');
}

function getCookieValue(req, name) {
  const raw = req.headers.cookie || '';
  const match = raw.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body =
        typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const { password } = body;
      if (!password || password !== getExpectedPassword()) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = getSessionToken();
      res.setHeader('Set-Cookie', buildCookie(token, 60 * 60 * 24 * 7));
      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      const value = getCookieValue(req, COOKIE_NAME);
      const ok = value && value === getSessionToken();
      return res.status(200).json({ authenticated: !!ok });
    }

    if (req.method === 'DELETE') {
      res.setHeader('Set-Cookie', buildCookie('', 0));
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('admin login api error', err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
