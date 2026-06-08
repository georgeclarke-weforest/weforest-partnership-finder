"use client";
import { Eyebrow } from "./Eyebrow";
import { WFIcon } from "./WFIcon";
import { PillButton } from "./PillButton";
import { WF_MODELS, WF_INCLUDES, WF_INCLUDES_ICONS, programmeMeta, type RecommendResult, type Objective } from "@/lib/data";

interface ResultCardProps {
  data: RecommendResult;
  domain: string;
  objective: Objective;
  onContact: () => void;
  onRestart: () => void;
}

export function ResultCard({ data, domain, objective: _objective, onContact, onRestart }: ResultCardProps) {
  const prog = programmeMeta(data.programme);
  const modelLabel = WF_MODELS[data.modelKey] || data.modelTitle || WF_MODELS.branding;

  return (
    <section style={{ background: "var(--wf-white)", padding: "72px clamp(20px,4vw,56px) 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Eyebrow>Your tailored partnership</Eyebrow>
          <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, color: "var(--wf-fg-3)" }}>
            for {data.companyName || domain}{data.industry ? ` · ${data.industry}` : ""}
          </span>
        </div>

        <div style={{ marginTop: 18, borderRadius: "var(--wf-radius-lg)", overflow: "hidden", boxShadow: "var(--wf-shadow-md)", border: "1px solid var(--wf-border)" }}>
          {/* Banner */}
          <div style={{ background: "var(--wf-midnight)", color: "#fff", padding: "clamp(28px,4vw,40px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: "50%", background: "rgba(120,139,43,0.22)" }} />
            <div style={{ position: "relative" }}>
              <Eyebrow color="var(--wf-hero-green-60)">Recommended model</Eyebrow>
              <h2 style={{ color: "#fff", fontSize: "clamp(26px,3vw,40px)", margin: "10px 0 0", lineHeight: 1.1 }}>
                {data.modelTitle || modelLabel}
              </h2>
              {data.tagline && (
                <p style={{ color: "var(--wf-hero-green-50)", fontSize: 17, fontWeight: 500, margin: "12px 0 0", fontStyle: "italic", marginBottom: 0 }}>
                  {data.tagline}
                </p>
              )}
              <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 9999, padding: "6px 14px" }}>
                <WFIcon name="check" size={16} stroke="var(--wf-hero-green-50)" sw={2.4} />
                <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, color: "rgba(255,255,255,0.88)" }}>
                  Based on {modelLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "clamp(28px,4vw,40px)" }}>
            <div style={{ display: "grid", gap: 36, gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }} className="wf-result-grid">
              <div>
                <h3 style={{ fontSize: 18 }}>Why this fits {data.companyName || "you"}</h3>
                <p style={{ marginBottom: 0 }}>{data.whyItFits}</p>

                <h3 style={{ fontSize: 18, marginTop: 32 }}>Ways to bring it to life</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
                  {(data.activations || []).slice(0, 3).map((a, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ flexShrink: 0, marginTop: 2, width: 26, height: 26, borderRadius: "50%", background: "var(--wf-hero-green-10)", color: "var(--wf-hero-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <WFIcon name="check" size={15} sw={2.4} />
                      </span>
                      <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 15.5, color: "var(--wf-fg-2)", lineHeight: 1.5 }}>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: "var(--wf-bg-2)", borderRadius: "var(--wf-radius-md)", padding: "24px 22px" }}>
                <Eyebrow style={{ fontSize: 12 }}>Programme match</Eyebrow>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 4, background: prog.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 17, color: "var(--wf-midnight)", lineHeight: 1.2 }}>{prog.name}</span>
                </div>
                <div style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, color: "var(--wf-fg-3)", marginTop: 6 }}>{prog.region}</div>
                <p style={{ fontSize: 14.5, marginTop: 12, marginBottom: 0 }}>{data.programmeReason}</p>
              </div>
            </div>

            {/* What's included */}
            <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid var(--wf-divider)" }}>
              <h3 style={{ fontSize: 18 }}>Every partnership includes</h3>
              <div style={{ marginTop: 14, display: "grid", gap: "12px 28px", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
                {WF_INCLUDES.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <WFIcon name={WF_INCLUDES_ICONS[i] || "check"} size={20} stroke="var(--wf-hero-green)" />
                    <span style={{ fontFamily: "var(--wf-font-sans)", fontSize: 14, color: "var(--wf-fg-2)", lineHeight: 1.45 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
              <PillButton icon="arrow" onClick={onContact}>Contact the Partnerships team</PillButton>
              <PillButton variant="outline" onClick={onRestart}>Try another objective</PillButton>
            </div>
            <p style={{ fontSize: 13, color: "var(--wf-fg-3)", marginTop: 16, marginBottom: 0 }}>
              This recommendation is an AI-generated starting point. Your partnership is shaped together with our team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
