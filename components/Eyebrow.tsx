"use client";
import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export function Eyebrow({ children, color = "var(--wf-hero-green)", style }: EyebrowProps) {
  return (
    <div style={{
      fontFamily: "var(--wf-font-sans)",
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      ...style,
    }}>
      {children}
    </div>
  );
}
