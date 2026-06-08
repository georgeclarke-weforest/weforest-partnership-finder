"use client";
import { useState, useEffect } from "react";

interface LoadingProps {
  domain: string;
}

export function Loading({ domain }: LoadingProps) {
  const lines = [
    `Reviewing ${domain}…`,
    "Reading your brand and sector…",
    "Matching WeForest partnership models…",
    "Finding the right restoration programme…",
    "Shaping your tailored summary…",
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => Math.min(v + 1, lines.length - 1)), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "var(--wf-bg-2)", padding: "120px clamp(20px,4vw,56px)", minHeight: 420 }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div
          className="wf-spinner"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            margin: "0 auto",
            border: "3px solid var(--wf-hero-green-30)",
            borderTopColor: "var(--wf-hero-green)",
          }}
        />
        <h2 style={{ marginTop: 28, fontSize: 24 }}>Growing your recommendation</h2>
        <p style={{ color: "var(--wf-fg-2)", minHeight: 28, transition: "opacity var(--wf-dur-base)", marginBottom: 0 }}>{lines[i]}</p>
      </div>
    </section>
  );
}
