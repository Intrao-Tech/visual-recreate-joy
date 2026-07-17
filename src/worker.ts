/**
 * Cloudflare Worker entry. Static assets are still served asset-first (and
 * free) by the `assets` config in wrangler.jsonc; this script only runs for
 * requests that don't match an asset — in practice POST /api/contact, which
 * relays the contact form to Telegram (Bot API sendMessage).
 *
 * Secrets (production: `wrangler secret put <NAME>`; local: .dev.vars):
 *   TELEGRAM_BOT_TOKEN — bot token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat that receives the leads (getUpdates to find it)
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

// Origins allowed to POST the form: production apex + local dev servers.
const ALLOWED_ORIGINS = new Set([
  "https://angl-consulting.com",
  "http://localhost:8080", // vite dev (proxies /api to wrangler dev)
  "http://localhost:8787", // wrangler dev
]);

// Caps keep the relayed message under Telegram's 4096-char sendMessage limit.
const LIMITS = { name: 200, email: 200, phone: 100, message: 3500 } as const;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function handleContact(request: Request, env: Env): Promise<Response> {
  // Browsers always send Origin on cross-site and same-site POSTs; curl and
  // some bots don't, so an absent header is rejected too.
  const origin = request.headers.get("Origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return json(403, { ok: false, error: "forbidden" });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  // Honeypot: humans never see the "website" field; bots fill it. Pretend
  // success so the bot doesn't learn it was filtered.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json(200, { ok: true });
  }

  const field = (key: keyof typeof LIMITS) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, LIMITS[key]) : "";

  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const message = field("message");
  if (!name || !email) {
    return json(400, { ok: false, error: "name and email are required" });
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    // Secrets not set yet — fail loudly so the frontend shows its error state
    // instead of silently dropping the lead.
    return json(503, { ok: false, error: "telegram is not configured" });
  }

  const lang = typeof body.lang === "string" ? body.lang.slice(0, 5) : "";
  const text = [
    "🔔 Нова заявка з сайту angl-consulting.com",
    "",
    `Ім'я: ${name}`,
    `Email: ${email}`,
    phone && `Телефон: ${phone}`,
    message && `\nПовідомлення:\n${message}`,
    lang && `\nМова сайту: ${lang}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Plain text (no parse_mode), so user input needs no HTML/Markdown escaping.
  const tg = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
  });
  if (!tg.ok) {
    console.error("telegram sendMessage failed", tg.status, await tg.text());
    return json(502, { ok: false, error: "failed to deliver" });
  }

  return json(200, { ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return json(405, { ok: false, error: "method not allowed" });
      }
      return handleContact(request, env);
    }
    // Everything else falls through to the static site, keeping the 404 and
    // trailing-slash behaviour configured in wrangler.jsonc.
    return env.ASSETS.fetch(request);
  },
};
