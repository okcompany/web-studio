import { isAdminRequest, unauthorizedResponse } from '../../../utils/adminAuth.js';
import { uploadAsset } from '../../../utils/storage.js';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export async function POST(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  const form = await req.formData();
  const file = form.get('file');
  if (!file) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400, headers: JSON_HEADERS });
  }
  const size = typeof file.size === 'number' ? file.size : 0;
  if (size > MAX_UPLOAD_BYTES) {
    return new Response(JSON.stringify({ error: "File too large (max 5 MB)" }), { status: 413, headers: JSON_HEADERS });
  }
  const rawExt = (file.name || '').split('.').pop() || 'bin';
  const ext = String(rawExt).toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  if (!ALLOWED_EXT.has(ext)) {
    return new Response(JSON.stringify({ error: "Unsupported file type" }), { status: 415, headers: JSON_HEADERS });
  }
  const fileName = `img_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const result = await uploadAsset({ fileName, buffer: Buffer.from(arrayBuffer) });

  return new Response(JSON.stringify({
    url: result.url
  }), { status: 200, headers: JSON_HEADERS });
}
