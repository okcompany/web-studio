import { uploadAsset } from '../src/utils/storage.js';
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
    if (
      buffer[afterBoundary] === 0x2d /* - */ &&
      buffer[afterBoundary + 1] === 0x2d
    )
      break;
    const headerStart = afterBoundary + 2; // skip \r\n
    const headerEnd = buffer.indexOf('\r\n\r\n', headerStart);
    if (headerEnd < 0) break;
    const headerStr = buffer.slice(headerStart, headerEnd).toString('utf8');
    const bodyStart = headerEnd + 4;
    const nextBoundary = buffer.indexOf(boundaryBuf, bodyStart);
    const bodyEnd = nextBoundary < 0 ? buffer.length : nextBoundary - 2; // strip \r\n
    const body = buffer.slice(bodyStart, bodyEnd);
    const name = /name="([^"]+)"/i.exec(headerStr)?.[1];
    const filename = /filename="([^"]*)"/i.exec(headerStr)?.[1];
    const contentType = /Content-Type:\s*([^\r\n]+)/i.exec(headerStr)?.[1];
    parts.push({ name, filename, contentType, body });
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
    const boundary = match[1];
    const buffer = await readBody(req);
    const parts = parseMultipart(buffer, boundary);
    const filePart = parts.find((p) => p.filename);
    if (!filePart) {
      res.status(400).json({ error: 'No file' });
      return;
    }
    const ext = (filePart.filename.split('.').pop() || 'bin').toLowerCase();
    const fileName = `img_${Date.now()}_${Math.floor(
      Math.random() * 10000,
    )}.${ext}`;
    const result = await uploadAsset({ fileName, buffer: filePart.body });
    res.status(201).json(result);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Upload failed' });
  }
}
