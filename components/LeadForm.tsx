"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export type SeekService = "estate-consultation" | "buyout" | "referral";

type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  full?: boolean; // span both columns
};

const CONFIG: Record<SeekService, { submitLabel: string; fields: Field[] }> = {
  "estate-consultation": {
    submitLabel: "Request a Consultation",
    fields: [
      {
        name: "situation", label: "Tell me about the estate or collection", type: "textarea", required: true, full: true,
        placeholder: "What do you have, and what's prompting you to reach out? (downsizing, an inherited estate, settling affairs, curiosity about value…)",
      },
      {
        name: "timeline", label: "Timeline", type: "select", full: false,
        options: [
          { value: "", label: "Select a timeline…" },
          { value: "Just exploring", label: "Just exploring" },
          { value: "Within 1–3 months", label: "Within 1–3 months" },
          { value: "Soon — a few weeks", label: "Soon — a few weeks" },
          { value: "Urgent", label: "Urgent" },
        ],
      },
      { name: "location", label: "Location (city / state)", type: "text", placeholder: "e.g. Asheville, NC", full: false },
    ],
  },
  buyout: {
    submitLabel: "Request a Buyout Offer",
    fields: [
      {
        name: "items", label: "What do you have?", type: "textarea", required: true, full: true,
        placeholder: "Describe the pieces or the collection — types of items, approximate quantity, any names or marks you can read…",
      },
      {
        name: "category", label: "Type of items", type: "select", full: false,
        options: [
          { value: "", label: "Select the closest…" },
          { value: "Antique / vintage jewelry", label: "Antique / vintage jewelry" },
          { value: "Sterling silver / flatware", label: "Sterling silver / flatware" },
          { value: "Coins / currency", label: "Coins / currency" },
          { value: "Watches", label: "Watches" },
          { value: "General antiques / collectibles", label: "General antiques / collectibles" },
          { value: "Mixed estate", label: "Mixed estate" },
        ],
      },
      {
        name: "size", label: "Approximate scope", type: "select", full: false,
        options: [
          { value: "", label: "Select a range…" },
          { value: "A few pieces", label: "A few pieces" },
          { value: "A box or small lot", label: "A box or small lot" },
          { value: "A large collection", label: "A large collection" },
          { value: "A full estate", label: "A full estate" },
        ],
      },
      { name: "location", label: "Location (city / state)", type: "text", placeholder: "e.g. Asheville, NC", full: true },
    ],
  },
  referral: {
    submitLabel: "Send the Referral",
    fields: [
      { name: "relationship", label: "How do you know them / your connection", type: "text", placeholder: "e.g. friend, attorney, fellow dealer, neighbor", full: true },
      {
        name: "details", label: "Who or what are you referring?", type: "textarea", required: true, full: true,
        placeholder: "Tell me about the person and what they have, or the estate/collection you'd like to point my way.",
      },
      { name: "bestContact", label: "Best way to reach them", type: "text", placeholder: "Their phone, email, or 'have me reach out to you first'", full: true },
    ],
  },
};

export function LeadForm({ service }: { service: SeekService }) {
  const cfg = CONFIG[service];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const setField = (n: string, v: string) => setExtra((p) => ({ ...p, [n]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, name, email, phone, fields: extra }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="sk-panel" style={{ padding: "3rem 2.5rem", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid var(--sk-copper)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.4rem" }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--sk-copper-lt)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 style={{ fontFamily: "var(--sk-serif)", fontSize: "2rem", color: "var(--sk-candle)", marginBottom: ".8rem" }}>Message received.</h2>
        <p style={{ color: "var(--sk-muted)", lineHeight: 1.75, maxWidth: 380, margin: "0 auto 2rem" }}>
          Thank you for reaching out. I read every message personally and I&rsquo;ll be in touch shortly.
        </p>
        <Link href="/" className="sk-btn">Back to RavenSeek</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="sk-panel" style={{ padding: "clamp(1.5rem,4vw,2.8rem)" }}>
      {state === "error" && (
        <div style={{ background: "rgba(180,60,60,.15)", border: "1px solid rgba(180,60,60,.4)", color: "#f0a5a5", padding: ".8rem 1rem", fontSize: ".82rem", marginBottom: "1.5rem" }}>
          {errorMsg}
        </div>
      )}

      {/* Name + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.4rem" }} className="sk-grid2">
        <div>
          <label className="sk-label" htmlFor="lf-name">Name <span className="sk-req">*</span></label>
          <input id="lf-name" className="sk-input" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label className="sk-label" htmlFor="lf-email">Email <span className="sk-req">*</span></label>
          <input id="lf-email" className="sk-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>

      {/* Phone */}
      <div style={{ marginBottom: "1.4rem" }}>
        <label className="sk-label" htmlFor="lf-phone">Phone <span className="sk-req" style={{ textTransform: "none", letterSpacing: ".08em" }}>(optional)</span></label>
        <input id="lf-phone" className="sk-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" />
      </div>

      {/* Per-service fields */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }} className="sk-grid2">
        {cfg.fields.map((f) => (
          <div key={f.name} style={{ gridColumn: f.full ? "1 / -1" : "auto", marginBottom: ".2rem" }}>
            <label className="sk-label" htmlFor={`lf-${f.name}`}>
              {f.label} {f.required && <span className="sk-req">*</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea id={`lf-${f.name}`} className="sk-input" required={f.required} value={extra[f.name] ?? ""} onChange={(e) => setField(f.name, e.target.value)} placeholder={f.placeholder} style={{ minHeight: 130, resize: "vertical", lineHeight: 1.6 }} />
            ) : f.type === "select" ? (
              <select id={`lf-${f.name}`} className="sk-input" required={f.required} value={extra[f.name] ?? ""} onChange={(e) => setField(f.name, e.target.value)}>
                {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : (
              <input id={`lf-${f.name}`} className="sk-input" type="text" required={f.required} value={extra[f.name] ?? ""} onChange={(e) => setField(f.name, e.target.value)} placeholder={f.placeholder} />
            )}
          </div>
        ))}
      </div>

      <button type="submit" disabled={state === "submitting"} className="sk-btn solid" style={{ width: "100%", textAlign: "center", marginTop: "1.8rem", opacity: state === "submitting" ? 0.6 : 1 }}>
        {state === "submitting" ? "Sending…" : cfg.submitLabel}
      </button>
      <p style={{ color: "var(--sk-muted)", fontSize: ".7rem", textAlign: "center", marginTop: "1rem", letterSpacing: ".04em" }}>
        I typically respond within one business day.
      </p>

      <style>{`@media(max-width:560px){.sk-grid2{grid-template-columns:1fr !important}}`}</style>
    </form>
  );
}
