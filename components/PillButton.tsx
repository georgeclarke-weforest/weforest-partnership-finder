"use client";
import React, { useState } from "react";
import { WFIcon } from "./WFIcon";

interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "onDark" | "ghost";
  icon?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function PillButton({ children, onClick, variant = "solid", icon, type = "button", disabled, style }: PillButtonProps) {
  const [hover, setHover] = useState(false);

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    border: "none",
    borderRadius: 9999,
    padding: "15px 30px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "var(--wf-font-sans)",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1,
    transition: `background var(--wf-dur-fast) var(--wf-ease-out), color var(--wf-dur-fast) var(--wf-ease-out), opacity var(--wf-dur-fast)`,
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
    ...style,
  };

  const variants: Record<string, React.CSSProperties> = {
    solid: { background: "var(--wf-hero-green)", color: "#fff" },
    outline: { background: "transparent", color: "var(--wf-midnight)", border: "1.5px solid var(--wf-border-strong)" },
    onDark: { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.6)" },
    ghost: { background: "transparent", color: "var(--wf-hero-green)", padding: "12px 8px" },
  };

  const hoverStyles: Record<string, React.CSSProperties> = {
    solid: { background: "var(--wf-accent-press)" },
    outline: { background: "var(--wf-midnight)", color: "#fff", borderColor: "var(--wf-midnight)" } as React.CSSProperties,
    onDark: { background: "#fff", color: "var(--wf-midnight)" },
    ghost: { color: "var(--wf-accent-press)" },
  };

  const hov = !disabled && hover ? hoverStyles[variant] : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...hov }}
    >
      {children}
      {icon && <WFIcon name={icon} size={18} sw={2} />}
    </button>
  );
}
