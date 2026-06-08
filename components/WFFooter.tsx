"use client";
import Image from "next/image";

export function WFFooter() {
  return (
    <footer style={{ background: "var(--wf-midnight)", color: "#fff", padding: "56px clamp(20px,4vw,56px) 40px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
        <Image src="/assets/logo-white.png" height={52} width={156} alt="WeForest" style={{ height: 52, width: "auto" }} />
        <div style={{ fontFamily: "var(--wf-font-sans)", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", maxWidth: 360 }}>
          Restoring forests for People, Nature and Climate. WeForest asbl/vzw, Brussels, Belgium ·{" "}
          <a href="mailto:partnerships@weforest.org" style={{ color: "rgba(255,255,255,0.92)" }}>partnerships@weforest.org</a>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--wf-font-sans)", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
        Copyright WeForest 2026 · All Rights Reserved
      </div>
    </footer>
  );
}
