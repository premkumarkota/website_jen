import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { EMAIL_OTP_COOKIE, generateCode, issueToken, sendOtpEmail } from "../emailOtp";

/* Sends a one-time code by the channel the user picked:
   - "sms"   → MSG91 (server-side; the auth key never reaches the browser).
   - "email" → Mailgun + a stateless signed cookie (see ../emailOtp.ts). */

/** Strip formatting and ensure the India country code (91XXXXXXXXXX). */
function normalizePhone(raw: string): string {
  const p = raw.replace(/[\s\-()+]/g, "");
  return p.length === 10 ? `91${p}` : p;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-recipient cooldown (in-memory; resets on redeploy). Providers enforce the real limits.
const lastSent = new Map<string, number>();
const COOLDOWN_MS = 30_000;

function cooldownLeft(key: string, now: number): number {
  const prev = lastSent.get(key);
  if (prev && now - prev < COOLDOWN_MS) return Math.ceil((COOLDOWN_MS - (now - prev)) / 1000);
  return 0;
}

export async function POST(request: NextRequest) {
  let body: { channel?: string; mobile?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const channel = body.channel === "email" ? "email" : "sms";
  const now = Date.now();

  /* ── Email channel ─────────────────────────────────────────── */
  if (channel === "email") {
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const wait = cooldownLeft(`email:${email}`, now);
    if (wait > 0) {
      return Response.json({ error: `Please wait ${wait}s before requesting another code.` }, { status: 429 });
    }

    try {
      const code = generateCode();
      await sendOtpEmail(email, code);
      const jar = await cookies();
      jar.set(EMAIL_OTP_COOKIE, issueToken(email, code), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
      });
      lastSent.set(`email:${email}`, now);
      return Response.json({ ok: true });
    } catch (e) {
      console.error("[otp/send] email failed:", e);
      return Response.json({ error: "Could not send the email code. Please try again." }, { status: 502 });
    }
  }

  /* ── SMS channel (MSG91) ───────────────────────────────────── */
  const phone = normalizePhone(String(body.mobile ?? ""));
  if (!/^91\d{10}$/.test(phone)) {
    return Response.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }

  const wait = cooldownLeft(phone, now);
  if (wait > 0) {
    return Response.json({ error: `Please wait ${wait}s before requesting another OTP.` }, { status: 429 });
  }

  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  if (!authKey || !templateId) {
    return Response.json({ error: "OTP service is not configured." }, { status: 500 });
  }

  try {
    const res = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: { authkey: authKey, "Content-Type": "application/json" },
      body: JSON.stringify({ template_id: templateId, mobile: phone }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.type === "success") {
      lastSent.set(phone, now);
      return Response.json({ ok: true });
    }
    return Response.json({ error: data?.message || "Could not send OTP. Please try again." }, { status: 502 });
  } catch {
    return Response.json({ error: "Could not reach the OTP service." }, { status: 502 });
  }
}
