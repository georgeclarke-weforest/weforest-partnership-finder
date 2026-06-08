"use client";
import Image from "next/image";

export function WFNav() {
  return (
    <nav style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: "22px clamp(20px,4vw,56px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <Image src="/assets/logo-white.png" height={48} width={144} alt="WeForest" style={{ height: 48, width: "auto" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: "var(--wf-font-sans)", fontSize: 14, fontWeight: 500, color: "#fff" }}>
        <span style={{ opacity: 0.92 }}>Partner with us</span>
        <a
          href="https://www.weforest.org/partner-with-us/business-partnerships/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "rgba(255,255,255,0.14)",
            color: "#fff",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 9999,
            padding: "9px 20px",
            fontWeight: 700,
          }}
        >
          Visit weforest.org
        </a>
      </div>
    </nav>
  );
}
