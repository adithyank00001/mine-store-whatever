import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const from = process.env.RESEND_FROM_EMAIL;
const key = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_INBOX_EMAIL || "byepanda.store@gmail.com";
const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

if (!key || !from) {
  console.log(JSON.stringify({ ok: false, error: "missing RESEND env" }));
  process.exit(1);
}

const paymentId = `pay_local_test_${Date.now()}`;
const downloadUrl = `${appUrl}/api/store/download?payment_id=${encodeURIComponent(paymentId)}`;
const pdfPath = resolve(
  "private/store/downloads/KIDS-LEARNING-BUNDLE-2026.pdf",
);
const pdf = readFileSync(pdfPath);

const text = [
  "Hi there,",
  "",
  "Thank you very much for your purchase of 15,000+ Printable Kids Learning Bundle!",
  "",
  "Amount: INR 497",
  `Payment ID: ${paymentId}`,
  "",
  "Your 15,000+ printable kids worksheets & activities bundle PDF is attached to this email.",
  `Download link: ${downloadUrl}`,
  "",
  "— ByePanda",
].join("\n");

const html = `
<p>Local env purchase-email test.</p>
<p><a href="${downloadUrl}">Download PDF</a></p>
<p>Payment ID: ${paymentId}</p>
`.trim();

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    "Idempotency-Key": `byepanda-purchase-email-${paymentId}`,
  },
  body: JSON.stringify({
    from,
    to: [to],
    reply_to: to,
    subject: "Your Kids Learning Bundle is ready! — local env test",
    text,
    html,
    attachments: [
      {
        filename: "KIDS-LEARNING-BUNDLE-2026.pdf",
        content: pdf.toString("base64"),
        content_type: "application/pdf",
      },
    ],
  }),
});

const body = await response.text();
let emailId = null;
try {
  emailId = JSON.parse(body).id ?? null;
} catch {
  // ignore
}

console.log(
  JSON.stringify(
    {
      ok: response.ok,
      status: response.status,
      from,
      to,
      paymentId,
      emailId,
      error: response.ok ? null : body.slice(0, 400),
    },
    null,
    2,
  ),
);

process.exit(response.ok ? 0 : 1);
