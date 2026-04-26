// GitHub-backed storage for CMS content.
// Commits JSON + binary assets directly to the configured repo/branch via the
// Contents API. Required env: GITHUB_TOKEN. Optional: GITHUB_REPO_OWNER
// (default Tor2024), GITHUB_REPO_NAME (default WebStudioOK),
// GITHUB_REPO_BRANCH (default devin/initial-import).
//
// Every write triggers a new commit → Vercel auto-redeploys the site.

function env() {
  return {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_REPO_OWNER || "Tor2024",
    repo: process.env.GITHUB_REPO_NAME || "WebStudioOK",
    branch: process.env.GITHUB_REPO_BRANCH || "devin/initial-import",
  };
}

export function isGithubStorageAvailable() {
  return Boolean(process.env.GITHUB_TOKEN);
}

async function ghFetch(path, init = {}) {
  const { token } = env();
  if (!token) throw new Error("GITHUB_TOKEN is not set");
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "webstudiook-cms",
      ...(init.headers || {}),
    },
  });
  return res;
}

async function getContent(path) {
  const { owner, repo, branch } = env();
  const res = await ghFetch(
    `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getContent ${path} ${res.status}`);
  return res.json();
}

async function listDir(path) {
  const data = await getContent(path);
  if (!data) return [];
  return Array.isArray(data) ? data : [];
}

async function readJson(path) {
  const data = await getContent(path);
  if (!data || Array.isArray(data) || data.type !== "file") return null;
  const raw = Buffer.from(data.content, "base64").toString("utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function getFileSha(path) {
  const data = await getContent(path);
  if (!data || Array.isArray(data) || data.type !== "file") return null;
  return data.sha;
}

async function writeFile({ path, content, message, isBinary = false }) {
  const { owner, repo, branch } = env();
  const sha = await getFileSha(path);
  const base64 = isBinary
    ? Buffer.from(content).toString("base64")
    : Buffer.from(content, "utf-8").toString("base64");
  const body = {
    message,
    content: base64,
    branch,
    ...(sha ? { sha } : {}),
  };
  const res = await ghFetch(
    `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub writeFile ${path} ${res.status}: ${txt}`);
  }
  return res.json();
}

async function deleteFile({ path, message }) {
  const { owner, repo, branch } = env();
  const sha = await getFileSha(path);
  if (!sha) return false;
  const res = await ghFetch(
    `/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sha, branch }),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub deleteFile ${path} ${res.status}: ${txt}`);
  }
  return true;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function dirFor(type) {
  return `apps/web/content_data/${type}`;
}

async function getItems(type) {
  const entries = await listDir(dirFor(type));
  const items = [];
  for (const e of entries) {
    if (e.type !== "file" || !e.name.endsWith(".json")) continue;
    const item = await readJson(`${dirFor(type)}/${e.name}`);
    if (item) items.push(item);
  }
  return items;
}

async function addItem(type, item) {
  const folder =
    item.folder_name ||
    slugify(item.title || item.title_de || item.title_en || Date.now());
  const withDefaults = {
    ...item,
    folder_name: folder,
    date: item.date || new Date().toISOString(),
  };
  await writeFile({
    path: `${dirFor(type)}/${folder}.json`,
    content: JSON.stringify(withDefaults, null, 2),
    message: `cms: add ${type} ${folder}`,
  });
  return withDefaults;
}

async function updateItem(type, folderName, item) {
  const withDefaults = { ...item, folder_name: folderName };
  await writeFile({
    path: `${dirFor(type)}/${folderName}.json`,
    content: JSON.stringify(withDefaults, null, 2),
    message: `cms: update ${type} ${folderName}`,
  });
  return withDefaults;
}

async function removeItem(type, folderName) {
  await deleteFile({
    path: `${dirFor(type)}/${folderName}.json`,
    message: `cms: delete ${type} ${folderName}`,
  });
  return true;
}

// Public API matching fileStorage.js signatures

export async function getNewsItems() {
  return getItems("news");
}
export async function getNewsItem(folderName) {
  return readJson(`${dirFor("news")}/${folderName}.json`);
}
export async function addNewsItem(item) {
  return addItem("news", item);
}
export async function updateNewsItem(folderName, item) {
  return updateItem("news", folderName, item);
}
export async function deleteNewsItem(folderName) {
  return removeItem("news", folderName);
}

export async function getPortfolioItems() {
  return getItems("portfolio");
}
export async function getPortfolioItem(folderName) {
  return readJson(`${dirFor("portfolio")}/${folderName}.json`);
}
export async function addPortfolioItem(item) {
  return addItem("portfolio", item);
}
export async function updatePortfolioItem(folderName, item) {
  return updateItem("portfolio", folderName, item);
}
export async function deletePortfolioItem(folderName) {
  return removeItem("portfolio", folderName);
}

export async function uploadAsset({ fileName, buffer }) {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `apps/web/public/uploads/${safe}`;
  await writeFile({
    path,
    content: buffer,
    message: `cms: upload ${safe}`,
    isBinary: true,
  });
  return { url: rawUrl(path), path };
}

// Slideshow images live under public/slideshow — listed / added / deleted as
// raw files so a fresh clone still contains the defaults committed to git.
const SLIDESHOW_DIR = "apps/web/public/slideshow";

function rawUrl(path) {
  const { owner, repo, branch } = env();
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

function slideshowUrl(name) {
  return rawUrl(`${SLIDESHOW_DIR}/${name}`);
}

export async function listSlideshow() {
  const entries = await listDir(SLIDESHOW_DIR);
  return entries
    .filter((e) => e.type === "file" && /\.(webp|jpg|jpeg|png)$/i.test(e.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => ({ name: e.name, url: slideshowUrl(e.name) }));
}

export async function addSlideshowImage({ fileName, buffer }) {
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${SLIDESHOW_DIR}/${safe}`;
  await writeFile({
    path,
    content: buffer,
    message: `cms: slideshow add ${safe}`,
    isBinary: true,
  });
  return { name: safe, url: slideshowUrl(safe) };
}

export async function deleteSlideshowImage(name) {
  const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
  await deleteFile({
    path: `${SLIDESHOW_DIR}/${safe}`,
    message: `cms: slideshow delete ${safe}`,
  });
  return true;
}

// Legal pages content (Impressum + Datenschutz) stored as a single JSON
// blob so the admin can edit three-language text areas inline.
const LEGAL_PATH = "apps/web/content_data/legal.json";

export async function getLegal() {
  return (await readJson(LEGAL_PATH)) || null;
}

export async function setLegal(payload) {
  await writeFile({
    path: LEGAL_PATH,
    content: JSON.stringify(payload, null, 2),
    message: "cms: update legal pages",
  });
  return payload;
}
