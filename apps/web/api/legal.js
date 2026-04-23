// Legal pages API — Impressum and Datenschutz content.
//
// GET /api/legal    → public (returns the current JSON blob, or defaults)
// PUT /api/legal    → admin-only, saves the JSON blob
//
// The blob has the shape:
//   {
//     impressum: { de: string, en: string, ru: string },
//     datenschutz: { de: string, en: string, ru: string },
//     updatedAt: ISO string
//   }
// Content is plain text / light markdown; the public pages render it with
// simple paragraph/line-break handling.
import { getLegal, setLegal } from '../src/utils/storage.js';
import { isAdminRequest, sendUnauthorized } from '../src/utils/adminAuth.js';
import { DEFAULT_LEGAL } from '../src/utils/defaultLegal.js';

function sanitizeLangBlock(value) {
  if (!value || typeof value !== 'object') return { de: '', en: '', ru: '' };
  const s = (v) => (typeof v === 'string' ? v : '');
  return { de: s(value.de), en: s(value.en), ru: s(value.ru) };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const stored = await getLegal();
      const payload = stored && stored.impressum ? stored : DEFAULT_LEGAL;
      res.setHeader(
        'Cache-Control',
        'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
      );
      res.status(200).json(payload);
      return;
    }

    if (req.method === 'PUT') {
      if (!isAdminRequest(req)) return sendUnauthorized(res);
      let body = req.body;
      if (!body || typeof body !== 'object') {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const raw = Buffer.concat(chunks).toString('utf-8');
        try {
          body = JSON.parse(raw || '{}');
        } catch {
          res.status(400).json({ error: 'Invalid JSON' });
          return;
        }
      }
      const payload = {
        impressum: sanitizeLangBlock(body.impressum),
        datenschutz: sanitizeLangBlock(body.datenschutz),
        updatedAt: new Date().toISOString(),
      };
      await setLegal(payload);
      res.status(200).json(payload);
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Legal API error:', error);
    res.status(500).json({ error: error.message || 'Legal API failed' });
  }
}
