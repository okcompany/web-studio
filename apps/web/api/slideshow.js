// Slideshow API — manages hero images shown on the home page.
//
// GET  /api/slideshow          → public list [{ name, url }, ...]
// POST /api/slideshow          → admin multipart upload (field "file")
// DELETE /api/slideshow?name=x → admin remove one image
import {
  listSlideshow,
  addSlideshowImage,
  deleteSlideshowImage,
} from '../src/utils/storage.js';
import { isAdminRequest, sendUnauthorized } from '../src/utils/adminAuth.js';

export const config = { api: { bodyParser: false } };

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

function parseMultipart(buffer, boundary) {
  const boundaryBuf = Buffer.from('--' + boundary);
  const parts = [];
  let idx = 0;
  while (true) {
    const start = buffer.indexOf(boundaryBuf, idx);
    if (start < 0) break;
    const afterBoundary = start + boundaryBuf.length;
    if (buffer[afterBoundary] === 0x2d && buffer[afterBoundary + 1] === 0x2d) {
      break;
    }
    const headerStart = afterBoundary + 2;
    const headerEnd = buffer.indexOf('\r\n\r\n', headerStart);
    if (headerEnd < 0) break;
    const headerStr = buffer.slice(headerStart, headerEnd).toString('utf8');
    const bodyStart = headerEnd + 4;
    const nextBoundary = buffer.indexOf(boundaryBuf, bodyStart);
    const bodyEnd = nextBoundary < 0 ? buffer.length : nextBoundary - 2;
    const body = buffer.slice(bodyStart, bodyEnd);
    const name = /name="([^"]+)"/i.exec(headerStr)?.[1];
    const filename = /filename="([^"]*)"/i.exec(headerStr)?.[1];
    parts.push({ name, filename, body });
    idx = nextBoundary < 0 ? buffer.length : nextBoundary;
  }
  return parts;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await listSlideshow();
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Slideshow-Build', 'v2-asset-proxy');
      res.status(200).json({ items });
      return;
    }

    if (req.method === 'POST') {
      if (!isAdminRequest(req)) return sendUnauthorized(res);
      const contentType = req.headers['content-type'] || '';
      const match = /boundary=([^;]+)/.exec(contentType);
      if (!match) {
        res.status(400).json({ error: 'Missing multipart boundary' });
        return;
      }
      const buffer = await readBody(req);
      const parts = parseMultipart(buffer, match[1]);
      const filePart = parts.find((p) => p.filename);
      if (!filePart) {
        res.status(400).json({ error: 'No file' });
        return;
      }
      const origName = filePart.filename || 'slide.webp';
      const ext = (origName.split('.').pop() || 'webp').toLowerCase();
      if (!['webp', 'jpg', 'jpeg', 'png'].includes(ext)) {
        res
          .status(400)
          .json({ error: 'Unsupported format. Use WebP / JPG / PNG.' });
        return;
      }
      if (filePart.body.length > 3 * 1024 * 1024) {
        res.status(400).json({ error: 'File too large (max 3 MB).' });
        return;
      }
      const fileName = `slide_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
      const result = await addSlideshowImage({
        fileName,
        buffer: filePart.body,
      });
      res.status(201).json(result);
      return;
    }

    if (req.method === 'DELETE') {
      if (!isAdminRequest(req)) return sendUnauthorized(res);
      const name =
        (req.query && req.query.name) ||
        new URL(req.url, 'http://x').searchParams.get('name');
      if (!name) {
        res.status(400).json({ error: 'Missing ?name' });
        return;
      }
      await deleteSlideshowImage(name);
      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Slideshow API error:', error);
    res.status(500).json({ error: error.message || 'Slideshow API failed' });
  }
}
