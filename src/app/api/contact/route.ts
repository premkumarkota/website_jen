import { NextRequest } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);

export async function POST(request: NextRequest) {
  const { name, email, company, message } = await request.json();

  if (!name || !email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY!,
  });

  const emailBody = `
New lead from JenVeda contact form

Name:    ${name}
Email:   ${email}
Company: ${company || "—"}

Message:
${message || "—"}
  `.trim();

  await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `JenVeda Website <noreply@${process.env.MAILGUN_DOMAIN}>`,
    to: ["contact@jenveda.com", "subbareddy@Jenveda.com", "madhug8.mg@gmail.com"],
    subject: `New Enquiry from ${name}`,
    text: emailBody,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="margin:0 0 16px;color:#1e1b4b">New Enquiry from JenVeda Website</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6b7280;width:90px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0">${company || "—"}</td></tr>
        </table>
        <hr style="margin:16px 0;border:none;border-top:1px solid #e5e7eb"/>
        <p style="color:#6b7280;margin:0 0 6px">Message</p>
        <p style="margin:0;white-space:pre-wrap">${message || "—"}</p>
      </div>
    `,
  });

  return Response.json({ success: true });
}
