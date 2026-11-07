import { NextRequest } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

/* Finance-tools registration: runs AFTER the mobile OTP is verified.
   Phase 1: email the lead to sales via Mailgun (no DB store). */

const mailgun = new Mailgun(FormData);
const SALES_RECIPIENTS = ["contact@jenveda.com", "subbareddy@Jenveda.com", "madhug8.mg@gmail.com"];

type Lead = {
  name?: string;
  mobile?: string;
  email?: string;
  company?: string;
  industry?: string;
  size?: string;
  role?: string;
  note?: string;
};

export async function POST(request: NextRequest) {
  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!lead.company?.trim() || !lead.industry?.trim() || !lead.size?.trim()) {
    return Response.json({ error: "Company name, type and size are required." }, { status: 400 });
  }

  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!key || !domain) {
    // Don't trap the user if email isn't configured — just let them through.
    return Response.json({ ok: true, emailed: false });
  }

  try {
    const mg = mailgun.client({ username: "api", key });
    const row = (k: string, v?: string) =>
      `<tr><td style="padding:7px 0;color:#6b7280;width:120px">${k}</td><td style="padding:7px 0;font-weight:600">${v || "—"}</td></tr>`;
    await mg.messages.create(domain, {
      from: `JenVeda Finance Tools <noreply@${domain}>`,
      to: SALES_RECIPIENTS,
      subject: `New Finance Tools lead — ${lead.company || lead.name || lead.mobile || "Unknown"}`,
      text: `New Finance Tools registration (OTP-verified)

Name:     ${lead.name || "—"}
Mobile:   ${lead.mobile || "—"}
Email:    ${lead.email || "—"}
Company:  ${lead.company || "—"}
Industry: ${lead.industry || "—"}
Size:     ${lead.size || "—"}
Role:     ${lead.role || "—"}

Looking to improve:
${lead.note || "—"}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
          <h2 style="margin:0 0 4px;color:#1e1b4b">New Finance Tools lead</h2>
          <p style="margin:0 0 16px;color:#6b7280;font-size:13px">Mobile OTP verified · via /finance-tools</p>
          <table style="width:100%;border-collapse:collapse">
            ${row("Name", lead.name)}
            ${row("Mobile", lead.mobile)}
            ${row("Email", lead.email)}
            ${row("Company", lead.company)}
            ${row("Industry", lead.industry)}
            ${row("Company size", lead.size)}
            ${row("Role", lead.role)}
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb"/>
          <p style="color:#6b7280;margin:0 0 6px">Looking to improve</p>
          <p style="margin:0;white-space:pre-wrap">${lead.note || "—"}</p>
        </div>`,
    });
    return Response.json({ ok: true, emailed: true });
  } catch (e) {
    console.error("[register] Mailgun send failed:", e);
    // Still let the user in; the lead just wasn't emailed.
    return Response.json({ ok: true, emailed: false });
  }
}
