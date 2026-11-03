import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { EMAIL_OTP_COOKIE, verifyToken } from "../emailOtp";

/* Verifies a one-time code for the channel the user picked:
   - "sms"   → MSG91 (server-side).
   - "email" → recompute the HMAC from the signed cookie (see ../emailOtp.ts). */

function normalizePhone(raw: string): string {
  const p = raw.replace(/[\s\-()+]/g, "");
  return p.length === 10 ? `91${p}` : p;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: { channel?: string; mobile?: string; email?: string; otp?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const channel = body.channel === "email" ? "email" : "sms";
  const code = String(body.otp ?? "").trim();

  /* ── Email channel ─────────────────────────────────────────── */
  if (channel === "email") {
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!/^\d{6}$/.test(code)) {
      return Response.json({ error: "Enter the 6-digit code sent to your email." }, { status: 400 });
    }

    const jar = await cookies();
    const token = jar.get(EMAIL_OTP_COOKIE)?.value;
    const result = verifyToken(token, email, code);

    if (result.ok) {
      jar.delete(EMAIL_OTP_COOKIE);
      return Response.json({ ok: true });
    }
    // Replace the cookie with the decremented one, or clear it, per the outcome.
    if (result.cookie === null) {
      jar.delete(EMAIL_OTP_COOKIE);
    } else if (typeof result.cookie === "string") {
      jar.set(EMAIL_OTP_COOKIE, result.cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 600,
      });
    }
    return Response.json({ error: result.error }, { status: 400 });
  }

  /* ── SMS channel (MSG91) ───────────────────────────────────── */
  const phone = normalizePhone(String(body.mobile ?? ""));
  if (!/^91\d{10}$/.test(phone)) {
    return Response.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }
  if (!/^\d{4,6}$/.test(code)) {
    return Response.json({ error: "Enter the OTP sent to your mobile." }, { status: 400 });
  }

  const authKey = process.env.MSG91_AUTH_KEY;
  if (!authKey) {
    return Response.json({ error: "OTP service is not configured." }, { status: 500 });
  }

  try {
    const url = `https://control.msg91.com/api/v5/otp/verify?otp=${encodeURIComponent(code)}&mobile=${phone}`;
    const res = await fetch(url, { method: "POST", headers: { authkey: authKey } });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.type === "success") {
      return Response.json({ ok: true });
    }
    return Response.json({ error: data?.message || "Invalid or expired OTP." }, { status: 400 });
  } catch {
    return Response.json({ error: "Could not reach the OTP service." }, { status: 502 });
  }
}
