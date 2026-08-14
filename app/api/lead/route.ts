import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Where lead notifications are sent. Override with SEEK_LEAD_EMAIL.
const NOTIFY_EMAIL = process.env.SEEK_LEAD_EMAIL || "ravenschest33@gmail.com";

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

    // Email notification via Gmail (best-effort — never fails the visitor's submission).
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: gmailUser, pass: gmailPass },
        });
        await transporter.sendMail({
          from: `RavenSeek <${gmailUser}>`,
          to: NOTIFY_EMAIL,
          replyTo: email,
          subject: `New RavenSeek ${label} lead — ${name}`,
          text,
        });
      } catch (mailErr) {
        console.error("RavenSeek lead email failed (lead is in logs):", mailErr);
      }
    } else {
      console.warn("GMAIL_USER / GMAIL_APP_PASSWORD not set — lead captured in logs only, no email sent.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RavenSeek lead error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
