const COOKIE_NAME = "ok_admin_session";
const DEFAULT_PASSWORD = "admin";

function getExpectedPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSessionToken() {
  const seed = process.env.ADMIN_SESSION_SECRET || getExpectedPassword();
  return `ok-${Buffer.from(seed).toString("base64url")}`;
}

export function isAdminRequest(req) {
  const cookieHeader =
    (req?.headers?.get && req.headers.get("cookie")) ||
    req?.headers?.cookie ||
    "";
  if (!cookieHeader) return false;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return !!match && match[1] === getSessionToken();
}

export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: "Unauthorized" }),
    { status: 401, headers: { "Content-Type": "application/json" } },
  );
}
