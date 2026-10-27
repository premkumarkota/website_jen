import { NextRequest } from "next/server";

/* Sends a mobile OTP via MSG91 (server-side; the auth key never reaches the browser).
   Mirrors the HR MicroService auth-server flow: POST /api/v5/otp with header authkey. */

/** Strip formatting and ensure the India country code (91XXXXXXXXXX). */
function normalizePhone(raw: string): string {
  const p = raw.replace(/[\s\-()+]/g, "");
  return p.length === 10 ? `91${p}` : p;
}

// Best-effort per-phone cooldown (in-memory; resets on redeploy). MSG91 enforces the real limits.
const lastSent = new Map<string, number>();
const COOLDOWN_MS = 30_000;

export async function POST(request: NextRequest) {
  let mobile = "";
  try {
    ({ mobile } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = normalizePhone(String(mobile ?? ""));
  if (!/^91\d{10}$/.test(phone)) {
    return Response.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }

  const now = Date.now();
  const prev = lastSent.get(phone);
  if (prev && now - prev < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (now - prev)) / 1000);
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
