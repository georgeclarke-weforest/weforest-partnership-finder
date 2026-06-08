"use client";
import { Eyebrow } from "./Eyebrow";
import { WFIcon } from "./WFIcon";
import { WF_PILLARS } from "@/lib/data";

export function Pillars() {
  return (
    <section style={{ background: "var(--wf-white)", padding: "84px clamp(20px,4vw,56px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow>Why nature, why now</Eyebrow>
          <h2 style={{ fontSize: "clamp(26px,2.6vw,38px)", margin: "14px 0 0", lineHeight: 1.15 }}>
            More than a feel-good gesture. A lever for your business.
          </h2>
          <p className="wf-lead" style={{ marginTop: 16 }}>
            Forest restoration gives you something tangible to deliver against the goals you already
            care about. Here are three of the ways businesses put it to work.
          </p>
        </div>
        <div style={{ marginTop: 48, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {WF_PILLARS.map((p, i) => (
            <div key={i} style={{ background: "var(--wf-bg-2)", borderRadius: "var(--wf-radius-lg)", padding: "32px 30px" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: "var(--wf-white)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--wf-hero-green)", boxShadow: "var(--wf-shadow-sm)",
              }}>
                <WFIcon name={p.icon} size={28} />
              </div>
              <Eyebrow style={{ marginTop: 22, fontSize: 12 }}>{p.eyebrow}</Eyebrow>
              <h3 style={{ marginTop: 8, fontSize: 22 }}>{p.title}</h3>
              <p style={{ marginBottom: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
