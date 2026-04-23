import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { isAdminRequest, unauthorizedResponse } from '../../../utils/adminAuth.js';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);

export async function POST(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  const form = await req.formData();
  const file = form.get('file');
  if (!file) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
  }
  const size = typeof file.size === 'number' ? file.size : 0;
  if (size > MAX_UPLOAD_BYTES) {
    return new Response(JSON.stringify({ error: "File too large (max 5 MB)" }), { status: 413 });
  }
  // генерируем уникальное имя файла
  const rawExt = (file.name || '').split('.').pop() || 'bin';
  const ext = String(rawExt).toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  if (!ALLOWED_EXT.has(ext)) {
    return new Response(JSON.stringify({ error: "Unsupported file type" }), { status: 415 });
  }
  const fileName = `img_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(join(UPLOAD_DIR, fileName), new Uint8Array(arrayBuffer));

  // отдаём URL (относительно сайта)
  return new Response(JSON.stringify({
    url: `/uploads/${fileName}`
  }), { status: 200 });
}
