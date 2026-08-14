import { NextResponse } from "next/server";

// Where lead notifications are sent. Override with SEEK_LEAD_EMAIL.
const NOTIFY_EMAIL = process.env.SEEK_LEAD_EMAIL || "ravenschest33@gmail.com";
// Verified Resend sender. Set LEAD_FROM_EMAIL to a sender on your verified
// domain (e.g. "RavenSeek <leads@ravenseek.com>") once the domain is verified.
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "RavenSeek <onboarding@resend.dev>";

const SERVICE_LABELS: Record<string, string> = {
  "estate-consultation": "Estate Consultation",
  buyout: "Buyout",
  referral: "Referral",
};

// Human labels for the structured fields, in the order they should appear.
const FIELD_LABELS: Record<string, string> = {
  situation: "About the estate/collection",
  items: "What they have",
  category: "Type of items",
  size: "Approximate scope",
  timeline: "Timeline",
  location: "Location",
  relationship: "Connection",
  details: "Referral details",
  bestContact: "Best way to reach them",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service: string = body?.service;
    const name: string = (body?.name ?? "").trim();
    const email: string = (body?.email ?? "").trim();
    const phone: string = (body?.phone ?? "").trim();
    const fields: Record<string, string> = body?.fields ?? {};

    if (!SERVICE_LABELS[service]) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 });
    }
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const label = SERVICE_LABELS[service];
    const lines = Object.keys(FIELD_LABELS)
      .filter((k) => (fields[k] ?? "").trim())
      .map((k) => `${FIELD_LABELS[k]}: ${fields[k].trim()}`);
    const composed = lines.join("\n") || "(no additional details provided)";

    const text =
      `New RavenSeek ${label} lead\n\n` +
      `Name:  ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `\n${composed}\n`;

    // Always log — a durable backup in the Vercel logs even if email is down.
    console.log(`[RavenSeek lead] ${label} — ${name} <${email}>\n${text}`);

    // Email notification (best-effort — never fails the visitor's submission).
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          replyTo: email,
          subject: `New RavenSeek ${label} lead — ${name}`,
          text,
        });
        if ("error" in result && result.error) {
          console.error("RavenSeek lead email failed (lead is in logs):", result.error);
        }
      } catch (mailErr) {
        console.error("RavenSeek lead email threw (lead is in logs):", mailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not set — lead captured in logs only, no email sent.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RavenSeek lead error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
