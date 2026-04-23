// Unified storage facade. Uses GitHub API when GITHUB_TOKEN is set
// (production on Vercel where FS is read-only), falls back to local
// filesystem for dev.

import * as github from "./githubStorage.js";
import * as files from "./fileStorage.js";

function backend() {
  return github.isGithubStorageAvailable() ? github : files;
}

export function backendName() {
  return github.isGithubStorageAvailable() ? "github" : "filesystem";
}

export const getNewsItems = (...a) => backend().getNewsItems(...a);
export const getNewsItem = (...a) => backend().getNewsItem(...a);
export const addNewsItem = (...a) => backend().addNewsItem(...a);
export const updateNewsItem = (...a) => backend().updateNewsItem(...a);
export const deleteNewsItem = (...a) => backend().deleteNewsItem(...a);

export const getPortfolioItems = (...a) => backend().getPortfolioItems(...a);
export const getPortfolioItem = (...a) => backend().getPortfolioItem(...a);
export const addPortfolioItem = (...a) => backend().addPortfolioItem(...a);
export const updatePortfolioItem = (...a) =>
  backend().updatePortfolioItem(...a);
export const deletePortfolioItem = (...a) =>
  backend().deletePortfolioItem(...a);

export const listSlideshow = (...a) => backend().listSlideshow(...a);
export const addSlideshowImage = (...a) => backend().addSlideshowImage(...a);
export const deleteSlideshowImage = (...a) =>
  backend().deleteSlideshowImage(...a);

export const getLegal = (...a) => backend().getLegal(...a);
export const setLegal = (...a) => backend().setLegal(...a);

export async function uploadAsset({ fileName, buffer }) {
  if (github.isGithubStorageAvailable()) {
    return github.uploadAsset({ fileName, buffer });
  }
  const { promises: fs } = await import("node:fs");
  const { join } = await import("node:path");
  const dir = join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  await fs.writeFile(join(dir, safe), buffer);
  return { url: `/uploads/${safe}`, path: `public/uploads/${safe}` };
}
