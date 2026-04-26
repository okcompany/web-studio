// Asset proxy — streams binary files (images) directly from the GitHub repo
// through the Contents API. Decouples "image is uploaded" from "Vercel has
// rebuilt": as soon as the file is committed, its URL works here, without a
// cold-start delay of 1-2 min while Vercel redeploys the static site.
//
// GET /api/asset?kind=slideshow&name=slide-xxx.webp
// GET /api/asset?kind=uploads&name=img_xxx.png

const MIME = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

function githubEnv() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_REPO_OWNER || 'okcompany',
    repo: process.env.GITHUB_REPO_NAME || 'web-studio',
    branch:
      process.env.GITHUB_REPO_BRANCH ||
      process.env.VERCEL_GIT_COMMIT_REF ||
      'main',
  };
}

function safeName(name) {
  return String(name || '').replace(/[^a-zA-Z0-9._-]/g, '_');
}

function dirFor(kind) {
  if (kind === 'slideshow') return 'apps/web/public/slideshow';
  if (kind === 'uploads') return 'apps/web/public/uploads';
  return null;
}

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, 'http://x');
    const kind = url.searchParams.get('kind');
    const rawName = url.searchParams.get('name');
    const dir = dirFor(kind);
    if (!dir || !rawName) {
      res.status(400).json({ error: 'Missing kind/name' });
      return;
    }
    const name = safeName(rawName);
    const ext = (name.split('.').pop() || '').toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    const { token, owner, repo, branch } = githubEnv();

    if (token) {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
        `${dir}/${name}`,
      )}?ref=${encodeURIComponent(branch)}`;
      const ghRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.raw',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'webstudiook-asset-proxy',
        },
      });
      if (ghRes.status === 404) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      if (!ghRes.ok) {
        const txt = await ghRes.text();
        res.status(502).json({ error: `GitHub ${ghRes.status}: ${txt}` });
        return;
      }
      const buf = Buffer.from(await ghRes.arrayBuffer());
      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Cache-Control',
        'public, max-age=31536000, s-maxage=31536000, immutable',
      );
      res.status(200).send(buf);
      return;
    }

    // Local dev fallback — read from disk under apps/web/public.
    const { promises: fs } = await import('node:fs');
    const { join } = await import('node:path');
    const local = join(process.cwd(), 'public', kind, name);
    try {
      const buf = await fs.readFile(local);
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.status(200).send(buf);
    } catch {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error('Asset proxy error:', error);
    res.status(500).json({ error: error.message || 'Asset proxy failed' });
  }
}
