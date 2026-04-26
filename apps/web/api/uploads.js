import { uploadAsset } from '../src/utils/storage.js';
import { isAdminRequest, sendUnauthorized } from '../src/utils/adminAuth.js';

export const config = { api: { bodyParser: false } };

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);

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
    if (buffer[afterBoundary] === 0x2d && buffer[afterBoundary + 1] === 0x2d) break;
    const headerStart = afterBoundary + 2;
    const headerEnd = buffer.indexOf('\r\n\r\n', headerStart);
    if (headerEnd < 0) break;
    const headerStr = buffer.slice(headerStart, headerEnd).toString('utf8');
    const bodyStart = headerEnd + 4;
    const nextBoundary = buffer.indexOf(boundaryBuf, bodyStart);
    const bodyEnd = nextBoundary < 0 ? buffer.length : nextBoundary - 2;
    const body = buffer.slice(bodyStart, bodyEnd);
    const filename = /filename="([^"]*)"/i.exec(headerStr)?.[1];
    parts.push({ filename, body });
    idx = nextBoundary < 0 ? buffer.length : nextBoundary;
  }
  return parts;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!isAdminRequest(req)) {
    sendUnauthorized(res);
    return;
  }

  try {
    const contentType = req.headers['content-type'] || '';
    const match = /boundary=([^;]+)/.exec(contentType);
    if (!match) {
      res.status(400).json({ error: 'Missing multipart boundary' });
      return;
    }
    const buffer = await readBody(req);
    const parts = parseMultipart(buffer, match[1]);
    const file = parts.find((part) => part.filename);
    if (!file || !file.filename) {
      res.status(400).json({ error: "No file" });
      return;
    }
    if (file.body.length > MAX_UPLOAD_BYTES) {
      res.status(413).json({ error: 'File too large (max 5 MB)' });
      return;
    }
    const ext = (file.filename.split('.').pop() || 'bin')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'bin';
    if (!ALLOWED_EXT.has(ext)) {
      res.status(415).json({ error: 'Unsupported file type' });
      return;
    }

    const fileName = `img_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
    const result = await uploadAsset({ fileName, buffer: file.body });

    res.status(200).json({
      url: result.url
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}
