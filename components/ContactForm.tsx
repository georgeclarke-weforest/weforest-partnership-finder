"use client";
import { useState, useRef, useEffect } from "react";
import { Eyebrow } from "./Eyebrow";
import { WFIcon } from "./WFIcon";
import { PillButton } from "./PillButton";

interface ContactFormProps {
  prefill: { company: string; message: string };
  onClose: () => void;
}

export function ContactForm({ prefill, onClose }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", company: prefill.company || "", message: prefill.message || "" });
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const valid = form.name.trim().length > 0 && /\S+@\S+\.\S+/.test(form.email);

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginTop: 6,
    padding: "13px 14px",
    border: "1px solid var(--wf-border)",
    borderRadius: "var(--wf-radius-sm)",
    fontFamily: "var(--wf-font-sans)",
    fontSize: 15,
    color: "var(--wf-midnight)",
    outline: "none",
    transition: "border-color var(--wf-dur-fast)",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--wf-font-sans)",
    fontWeight: 500,
    fontSize: 12.5,
    color: "var(--wf-slate)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  const field = (label: string, k: keyof typeof form, type = "text") => (
    <label style={{ display: "block" }}>
      <span style={labelStyle}>{label}</span>
      <input
        type={type}
        value={form[k]}
        onChange={set(k)}
        style={inputStyle}
        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--wf-hero-green)"; }}
        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--wf-border)"; }}
      />
    </label>
  );

  return (
    <section ref={ref} style={{ background: "var(--wf-bg-2)", padding: "72px clamp(20px,4vw,56px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", background: "var(--wf-white)", borderRadius: "var(--wf-radius-lg)", boxShadow: "var(--wf-shadow-md)", padding: "clamp(28px,4vw,44px)" }}>
        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--wf-hero-green-10)", color: "var(--wf-hero-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <WFIcon name="check" size={34} sw={2.4} />
            </div>
            <h2 style={{ marginTop: 22, fontSize: 28 }}>Thank you — we'll be in touch</h2>
            <p className="wf-lead" style={{ maxWidth: 460, margin: "12px auto 0" }}>
              Our Partnerships team will reach out as soon as possible to explore how we can work together.
            </p>
            <div style={{ marginTop: 26 }}>
              <PillButton variant="outline" onClick={onClose}>Back to my recommendation</PillButton>
            </div>
          </div>
        ) : (
          <>
            <Eyebrow>Get in touch</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,2.4vw,32px)", margin: "12px 0 0" }}>Let's shape your partnership</h2>
            <p style={{ marginTop: 10 }}>
              Send this to our Partnerships team and we'll come back to you. Your recommendation is already attached below.
            </p>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginTop: 22 }} className="wf-contact-grid">
              {field("Your name", "name")}
              {field("Work email", "email", "email")}
            </div>
            <div style={{ marginTop: 16 }}>{field("Company", "company")}</div>
            <label style={{ display: "block", marginTop: 16 }}>
              <span style={labelStyle}>Message</span>
              <textarea
                value={form.message}
                onChange={set("message")}
                rows={7}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                onFocus={(e) => { e.target.style.borderColor = "var(--wf-hero-green)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--wf-border)"; }}
              />
            </label>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <PillButton icon="arrow" disabled={!valid} onClick={() => valid && setSent(true)}>
                Send to Partnerships team
              </PillButton>
              <button
                onClick={onClose}
                style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 14, color: "var(--wf-fg-2)" }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
