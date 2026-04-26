function attrValue(attrs, name) {
  const match = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i").exec(
    attrs || "",
  );
  return match ? match[2] || match[3] || "" : "";
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripTags(value) {
  return String(value || "").replace(/<[^>]*>/g, "").trim();
}

function isImageUrl(url) {
  return /^(https?:\/\/|\/|data:image\/)/i.test(String(url || ""));
}

function imageHtml(url, name) {
  if (!isImageUrl(url)) return escapeAttribute(name);
  const safeName = name || "Изображение";
  return `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(safeName)}" class="cms-inline-image" loading="lazy" />`;
}

export function countCmsImages(value) {
  const html = String(value || "");
  const tokenCount = (html.match(/data-cms-image=/gi) || []).length;
  const markdownCount = (html.match(/!\[[^\]]*]\([^)]+\)/g) || []).length;
  const imgCount = (html.match(/<img\b/gi) || []).length;
  return tokenCount + markdownCount + imgCount;
}

export function renderCmsContent(value, { stripImages = false } = {}) {
  let html = String(value || "");

  html = html.replace(
    /<span\b([^>]*)data-cms-image=(["'])(.*?)\2([^>]*)>(.*?)<\/span>/gis,
    (match, before, quote, url, after, label) => {
      if (stripImages) return "";
      const attrs = `${before} ${after}`;
      const name = attrValue(attrs, "data-cms-filename") || stripTags(label);
      return imageHtml(url, name);
    },
  );

  html = html.replace(/!\[([^\]]*)]\(([^)]+)\)/g, (match, name, url) => {
    if (stripImages) return "";
    return imageHtml(url, name);
  });

  if (stripImages) {
    html = html.replace(/<img\b[^>]*>/gi, "");
  }

  return html;
}
