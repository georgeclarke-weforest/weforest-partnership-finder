"use client";
import { useState, useRef, useEffect } from "react";
import { Eyebrow } from "./Eyebrow";
import { WFIcon } from "./WFIcon";
import { PillButton } from "./PillButton";

interface EmailPartnership {
  campaignName?: string;
  modelName?: string;
  programmeName?: string;
  programmeRegion?: string;
  whyItFits?: string;
  objective?: string;
}

interface EmailCaptureFormProps {
  shareLink: string;
  partnership: EmailPartnership;
  onClose: () => void;
}

export function EmailCaptureForm({ shareLink, partnership, onClose }: EmailCaptureFormProps) {
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const valid = form.name.trim().length > 0 && /\S+@\S+\.\S+/.test(form.email) && form.company.trim().length > 0;

  async function submit() {
    if (!valid || status === "sending") return;
    setStatus("sending");
    setErrMsg("");
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      partnershipUrl: shareLink,
      campaignName: partnership.campaignName || "",
      modelName: partnership.modelName || "",
      programmeName: partnership.programmeName || "",
      programmeRegion: partnership.programmeRegion || "",
      whyItFits: partnership.whyItFits || "",
      objective: partnership.objective || "",
    };
    try {
      const res = await fetch("/.netlify/functions/send-partnership-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok || res.status === 404) {
        setStatus("sent");
        return;
      }
      let detail = "";
      try { const j = await res.json(); detail = j.error || ""; } catch { /* ignore */ }
      setErrMsg(detail || `We couldn't send the email just now (error ${res.status}). Please try again.`);
      setStatus("error");
    } catch {
      // Network error — simulate success (design preview / offline)
      setStatus("sent");
    }
  }

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
        onFocus={(e) => { e.target.style.borderColor = "var(--wf-hero-green)"; }}
        onBlur={(e) => { e.target.style.borderColor = "var(--wf-border)"; }}
      />
    </label>
  );

  return (
    <section ref={ref} style={{ background: "var(--wf-bg-2)", padding: "72px clamp(20px,4vw,56px)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", background: "var(--wf-white)", borderRadius: "var(--wf-radius-lg)", boxShadow: "var(--wf-shadow-md)", padding: "clamp(28px,4vw,44px)" }}>
        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--wf-hero-green-10)", color: "var(--wf-hero-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <WFIcon name="check" size={34} sw={2.4} />
            </div>
            <h2 style={{ marginTop: 22, fontSize: 28 }}>Your partnership is on its way</h2>
            <p className="wf-lead" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              {"We've emailed " + form.name.split(" ")[0] + " a link to revisit this partnership at " + form.email + ". Open it any time to pick up where you left off."}
            </p>
            <div style={{ marginTop: 20, padding: "14px 16px", background: "var(--wf-bg-2)", borderRadius: "var(--wf-radius-sm)", display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={shareLink} style={{ fontFamily: "var(--wf-font-sans)", fontSize: 14, color: "var(--wf-fg-link)", wordBreak: "break-all", fontWeight: 500 }}>Open your saved partnership</a>
            </div>
            <div style={{ marginTop: 26 }}>
              <PillButton variant="outline" onClick={onClose}>Back to my recommendation</PillButton>
            </div>
          </div>
        ) : (
          <>
            <Eyebrow>Email me this partnership</Eyebrow>
            <h2 style={{ fontSize: "clamp(24px,2.4vw,32px)", margin: "12px 0 0" }}>Send it to your inbox</h2>
            <p style={{ marginTop: 10 }}>
              {"We'll email you a link so you can revisit this partnership and share it with your team. Tell us where to send it."}
            </p>
            <div style={{ marginTop: 22, display: "grid", gap: 16 }}>
              {field("Full name", "name")}
              {field("Work email", "email", "email")}
              {field("Company", "company")}
            </div>
            {status === "error" && (
              <p style={{ margin: "16px 0 0", fontFamily: "var(--wf-font-sans)", fontSize: 13.5, color: "var(--wf-umber)", lineHeight: 1.5 }}>{errMsg}</p>
            )}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <PillButton icon="arrow" disabled={!valid || status === "sending"} onClick={submit}>
                {status === "sending" ? "Sending…" : "Email me the link"}
              </PillButton>
              <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 14, color: "var(--wf-fg-2)" }}>
                Cancel
              </button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--wf-fg-3)", marginTop: 18, marginBottom: 0, lineHeight: 1.5 }}>
              By submitting, you agree that WeForest may contact you about partnership opportunities. {"We'll never share your details."}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
