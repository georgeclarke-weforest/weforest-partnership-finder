"use client";
import { WFNav } from "./WFNav";
import { Eyebrow } from "./Eyebrow";
import { PillButton } from "./PillButton";

interface HeroProps {
  onStart: () => void;
}

const headline = {
  h1: "What could nature restoration do for your business?",
  sub: "Tell us your goal and your website. We'll show you a WeForest partnership built to help you reach it — backed by science, grounded in community.",
};

export function Hero({ onStart }: HeroProps) {
  return (
    <section style={{
      position: "relative",
      minHeight: 620,
      overflow: "hidden",
      background: `url('/assets/img-mangrove-restoration.jpg') center/cover`,
    }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--wf-overlay-gradient)" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
      <WFNav />
      <div style={{
        position: "relative",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "150px clamp(20px,4vw,56px) 84px",
        display: "flex",
        alignItems: "flex-end",
        minHeight: 620,
        boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: 760, color: "#fff" }}>
          <Eyebrow color="rgba(255,255,255,0.85)">For businesses · Partnership finder</Eyebrow>
          <h1 style={{
            fontFamily: "var(--wf-font-sans)",
            fontWeight: 700,
            color: "#fff",
            fontSize: "clamp(34px,4.4vw,58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
            margin: "18px 0 0",
            textWrap: "balance",
          }}>{headline.h1}</h1>
          <p style={{
            fontSize: 19,
            lineHeight: 1.55,
            marginTop: 22,
            maxWidth: 600,
            fontFamily: "var(--wf-font-sans)",
            color: "rgba(255,255,255,0.92)",
            marginBottom: 0,
          }}>{headline.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
            <PillButton icon="arrow" onClick={onStart}>Find your partnership model</PillButton>
            <PillButton variant="onDark" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              How it works
            </PillButton>
          </div>
        </div>
      </div>
      <div style={{
        position: "absolute",
        right: 20,
        bottom: 14,
        color: "rgba(255,255,255,0.8)",
        fontFamily: "var(--wf-font-sans)",
        fontSize: 12,
        letterSpacing: "0.03em",
      }}>©WeForest</div>
    </section>
  );
}
