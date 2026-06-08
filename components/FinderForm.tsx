"use client";
import { useState } from "react";
import { Eyebrow } from "./Eyebrow";
import { WFIcon } from "./WFIcon";
import { PillButton } from "./PillButton";
import { WF_OBJECTIVES, type Objective } from "@/lib/data";

interface FinderFormProps {
  onSubmit: (url: string, objective: Objective) => void;
}

export function FinderForm({ onSubmit }: FinderFormProps) {
  const [url, setUrl] = useState("");
  const [obj, setObj] = useState<Objective | null>(null);
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const valid = url.trim().length > 3 && url.includes(".") && obj !== null;

  return (
    <section id="finder" style={{ background: "var(--wf-bg-2)", padding: "84px clamp(20px,4vw,56px)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto" }}>
          <Eyebrow style={{ justifyContent: "center" }}>Find your model</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,2.6vw,38px)", margin: "14px 0 0", lineHeight: 1.15 }}>
            Two quick answers. One tailored partnership.
          </h2>
          <p className="wf-lead" style={{ marginTop: 14 }}>
            Add your website and pick the objective you care about most. We'll do the rest.
          </p>
        </div>

        <div style={{ marginTop: 40, background: "var(--wf-white)", borderRadius: "var(--wf-radius-lg)", boxShadow: "var(--wf-shadow-md)", padding: "clamp(24px,4vw,44px)" }}>
          <label style={{ display: "block" }}>
            <span style={{ fontFamily: "var(--wf-font-sans)", fontWeight: 500, fontSize: 13, color: "var(--wf-slate)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Your company website
            </span>
            <div style={{ position: "relative", marginTop: 8 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--wf-fg-muted)", fontSize: 15, fontFamily: "var(--wf-font-sans)", pointerEvents: "none" }}>https://</span>
              <input
                type="text"
                inputMode="url"
                placeholder="yourcompany.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={() => { setTouched(true); setFocused(false); }}
                onFocus={() => setFocused(true)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "15px 16px 15px 78px",
                  border: `1px solid ${touched && !url ? "var(--wf-umber)" : focused ? "var(--wf-hero-green)" : "var(--wf-border)"}`,
                  boxShadow: focused ? "0 0 0 3px var(--wf-hero-green-20)" : "none",
                  borderRadius: "var(--wf-radius-sm)",
                  fontFamily: "var(--wf-font-sans)",
                  fontSize: 16,
                  color: "var(--wf-midnight)",
                  outline: "none",
                  transition: "border-color var(--wf-dur-fast), box-shadow var(--wf-dur-fast)",
                }}
              />
            </div>
          </label>

          <div style={{ marginTop: 28 }}>
            <span style={{ fontFamily: "var(--wf-font-sans)", fontWeight: 500, fontSize: 13, color: "var(--wf-slate)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Your primary objective
            </span>
            <div style={{ marginTop: 12, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {WF_OBJECTIVES.map((o) => {
                const active = obj?.id === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setObj(o)}
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      background: active ? "var(--wf-hero-green-10)" : "var(--wf-white)",
                      border: `1.5px solid ${active ? "var(--wf-hero-green)" : "var(--wf-border)"}`,
                      borderRadius: "var(--wf-radius-md)",
                      padding: "16px 16px",
                      transition: "border-color var(--wf-dur-fast), background var(--wf-dur-fast)",
                    }}
                  >
                    <span style={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: active ? "var(--wf-hero-green)" : "var(--wf-hero-green-10)",
                      color: active ? "#fff" : "var(--wf-hero-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background var(--wf-dur-fast), color var(--wf-dur-fast)",
                    }}>
                      <WFIcon name={o.icon} size={22} />
                    </span>
                    <span>
                      <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 15, color: "var(--wf-midnight)", lineHeight: 1.25 }}>{o.label}</span>
                      <span style={{ display: "block", fontFamily: "var(--wf-font-sans)", fontSize: 13.5, color: "var(--wf-fg-2)", marginTop: 4, lineHeight: 1.4 }}>{o.blurb}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
            <PillButton icon="arrow" disabled={!valid} onClick={() => valid && onSubmit(url, obj!)}>
              Reveal my partnership model
            </PillButton>
            <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, color: "var(--wf-fg-3)" }}>
              Takes about 10 seconds · No sign-up needed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
