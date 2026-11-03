import crypto from "crypto";
import FormData from "form-data";
import Mailgun from "mailgun.js";

/* Stateless email-OTP (no DB, Phase 1).
   The code is never stored server-side. Instead we hand the browser a signed,
   httpOnly cookie holding only an HMAC of the code + expiry + remaining attempts.
   Verification recomputes the HMAC from the submitted code. The cookie cannot be
   forged or read without OTP_SIGNING_SECRET, and it survives restarts / multiple
   Azure instances because there is no shared in-memory state to lose. */

export const EMAIL_OTP_COOKIE = "jv_eotp";
export const EMAIL_OTP_LENGTH = 6;
const TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

/** HMAC key. Prefer a dedicated secret; fall back to other server-only secrets so
    a key always exists (MSG91_AUTH_KEY is always set). */
function secret(): string {
  const s =
    process.env.OTP_SIGNING_SECRET ||
    process.env.MSG91_AUTH_KEY ||
    process.env.MAILGUN_API_KEY ||
    "";
  return s;
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Cryptographically-random 6-digit code. */
export function generateCode(): string {
  return String(crypto.randomInt(0, 1_000_000)).padStart(EMAIL_OTP_LENGTH, "0");
}

type Payload = { e: string; h: string; x: number; n: number };

function sign(payload: Payload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(body)}`;
}

function parse(token: string): Payload | null {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, hmac(body))) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Payload;
  } catch {
    return null;
  }
}

/** Build the cookie token for a freshly sent code. */
export function issueToken(email: string, code: string): string {
  const e = email.trim().toLowerCase();
  return sign({ e, h: hmac(`${e}:${code}`), x: Date.now() + TTL_MS, n: MAX_ATTEMPTS });
}

export type VerifyOutcome =
  | { ok: true }
  // cookie: string → replace it (decremented attempts); null → clear it; undefined → leave as-is
  | { ok: false; error: string; cookie: string | null | undefined };

/** Verify a submitted code against the signed cookie token. */
export function verifyToken(
  token: string | undefined,
  email: string,
  code: string,
): VerifyOutcome {
  const expired = "Your code expired or is invalid. Please request a new one.";
  if (!token) return { ok: false, error: expired, cookie: undefined };

  const p = parse(token);
  if (!p) return { ok: false, error: expired, cookie: null };
  if (Date.now() > p.x) return { ok: false, error: expired, cookie: null };
  if (p.e !== email.trim().toLowerCase())
    return { ok: false, error: "Email mismatch. Please request a new code.", cookie: null };

  if (safeEqual(p.h, hmac(`${p.e}:${code}`))) return { ok: true };

  const left = p.n - 1;
  if (left <= 0)
    return { ok: false, error: "Too many attempts. Please request a new code.", cookie: null };

  return {
    ok: false,
    error: `Incorrect code. ${left} attempt${left === 1 ? "" : "s"} left.`,
    cookie: sign({ ...p, n: left }),
  };
}

const mailgun = new Mailgun(FormData);

/** Send the OTP email via Mailgun (same account as /api/register). */
export async function sendOtpEmail(email: string, code: string): Promise<void> {
  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!key || !domain) throw new Error("Email OTP is not configured.");

  const mg = mailgun.client({ username: "api", key });
  await mg.messages.create(domain, {
    from: `JenVeda <noreply@${domain}>`,
    to: [email],
    subject: `${code} is your JenVeda verification code`,
    text: `Your JenVeda verification code is ${code}.\n\nIt expires in 10 minutes. If you didn't request this, you can safely ignore this email.`,
    html: `
      <div style="font-family:sans-serif;max-width:460px;margin:0 auto;padding:28px;border:1px solid #e5e7eb;border-radius:14px">
        <h2 style="margin:0 0 6px;color:#1A1033">Your verification code</h2>
        <p style="margin:0 0 18px;color:#6b7280;font-size:14px">Enter this code to unlock JenVeda Finance Tools.</p>
        <div style="font-size:34px;font-weight:800;letter-spacing:8px;color:#6D28D9;background:#F5F3FF;border-radius:12px;padding:16px 0;text-align:center">${code}</div>
        <p style="margin:18px 0 0;color:#6b7280;font-size:13px">This code expires in 10 minutes. If you didn't request it, ignore this email.</p>
        <hr style="margin:18px 0;border:none;border-top:1px solid #e5e7eb"/>
        <p style="margin:0;color:#9ca3af;font-size:12px">Powered by JenVeda</p>
      </div>`,
  });
}
