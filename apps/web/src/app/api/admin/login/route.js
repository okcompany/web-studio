const COOKIE_NAME = "ok_admin_session";
const DEFAULT_PASSWORD = "admin"; // only used in development if ADMIN_PASSWORD is not set

function getExpectedPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

function getSessionToken() {
  // Prefer a stable token (so old sessions keep working across restarts),
  // but if nothing is configured, fall back to a derived value that at least
  // differs from the plain password.
  const seed = process.env.ADMIN_SESSION_SECRET || getExpectedPassword();
  return `ok-${Buffer.from(seed).toString("base64url")}`;
}

export async function POST(req) {
  try {
    const { password } = await req.json().catch(() => ({}));
    if (!password || password !== getExpectedPassword()) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    const token = getSessionToken();
    // 7 days
    const maxAge = 60 * 60 * 24 * 7;
    const cookie = [
      `${COOKIE_NAME}=${token}`,
      "Path=/",
      `Max-Age=${maxAge}`,
      "HttpOnly",
      "SameSite=Lax",
      "Secure",
    ].join("; ");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    console.error("admin login error", error);
    return new Response(
      JSON.stringify({ error: "Unexpected server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const ok = match && match[1] === getSessionToken();
  return new Response(JSON.stringify({ authenticated: !!ok }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE() {
  const cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`;
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
