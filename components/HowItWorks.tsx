"use client";
import { Eyebrow } from "./Eyebrow";
import { PillButton } from "./PillButton";
import { WFIcon } from "./WFIcon";

interface HowItWorksProps {
  onStart: () => void;
}

const steps = [
  { n: "01", t: "Tell us your goal", d: "Share your website and the one business objective that matters most right now." },
  { n: "02", t: "We review the fit", d: "Our tool reviews your company and matches it to the WeForest model and programme that fit best." },
  { n: "03", t: "Get your model", d: "Receive a tailored partnership summary and connect with our Partnerships team." },
];

export function HowItWorks({ onStart }: HowItWorksProps) {
  return (
    <section id="how" style={{ background: "var(--wf-midnight)", color: "#fff", padding: "76px clamp(20px,4vw,56px)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <Eyebrow color="var(--wf-hero-green-60)">How it works</Eyebrow>
        <h2 style={{ color: "#fff", fontSize: "clamp(26px,2.6vw,38px)", margin: "14px 0 0", maxWidth: 640, lineHeight: 1.15 }}>
          A partnership model in three steps.
        </h2>
        <div style={{ marginTop: 44, display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ borderTop: "2px solid var(--wf-hero-green)", paddingTop: 20 }}>
              <div style={{ fontFamily: "var(--wf-font-sans)", fontWeight: 700, fontSize: 14, color: "var(--wf-hero-green-60)", letterSpacing: "0.1em" }}>{s.n}</div>
              <h3 style={{ color: "#fff", marginTop: 12, fontSize: 21 }}>{s.t}</h3>
              <p style={{ color: "rgba(255,255,255,0.74)", marginBottom: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 44, padding: "20px 24px", borderRadius: "var(--wf-radius-md)",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
          display: "flex", gap: 14, alignItems: "flex-start", maxWidth: 760,
        }}>
          <span style={{ flexShrink: 0, marginTop: 1 }}>
            <WFIcon name="chat" size={22} stroke="var(--wf-hero-green-50)" />
          </span>
          <p style={{ margin: 0, fontFamily: "var(--wf-font-sans)", fontSize: 15.5, lineHeight: 1.55, color: "rgba(255,255,255,0.82)" }}>
            Whatever model the tool suggests is just an initial idea to get the conversation started. Every real partnership is co-created. Our team works closely with you to shape a solution tailored to your goals, your budget, and the difference you want to make.
          </p>
        </div>
        <div style={{ marginTop: 32 }}>
          <PillButton icon="arrow" onClick={onStart}>Start now</PillButton>
        </div>
      </div>
    </section>
  );
}
