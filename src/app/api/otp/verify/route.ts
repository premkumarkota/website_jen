import { NextRequest } from "next/server";

/* Verifies a mobile OTP via MSG91 (server-side).
   Mirrors the auth-server flow: POST /api/v5/otp/verify?otp=&mobile= with header authkey. */

function normalizePhone(raw: string): string {
  const p = raw.replace(/[\s\-()+]/g, "");
  return p.length === 10 ? `91${p}` : p;
}

export async function POST(request: NextRequest) {
  let mobile = "";
  let otp = "";
  try {
    ({ mobile, otp } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const phone = normalizePhone(String(mobile ?? ""));
  const code = String(otp ?? "").trim();
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
      // Phase 2: persist { name, mobile, ts } to a DB here.
      return Response.json({ ok: true });
    }
    return Response.json({ error: data?.message || "Invalid or expired OTP." }, { status: 400 });
  } catch {
    return Response.json({ error: "Could not reach the OTP service." }, { status: 502 });
  }
}
