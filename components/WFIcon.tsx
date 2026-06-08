"use client";

interface WFIconProps {
  name: string;
  size?: number;
  stroke?: string;
  sw?: number;
}

export function WFIcon({ name, size = 24, stroke = "currentColor", sw = 1.6 }: WFIconProps) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    sparkle: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" /><path d="M19 15l.7 2M5 17l.6 1.6" /></>,
    trend: <><path d="M3 17l5-5 4 4 8-8" /><path d="M16 8h5v5" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 6.5a3 3 0 0 1 0 5.8" /><path d="M17 14.5a5.5 5.5 0 0 1 3.5 5" /></>,
    heart: <path d="M12 20s-7-4.5-9.2-9.2C1.4 8 2.6 5 5.6 5c1.9 0 3.1 1.2 3.9 2.3.4.5 1.2.5 1.6 0C11.9 6.2 13.1 5 15 5c3 0 4.2 3 2.8 5.8C19 15.5 12 20 12 20z" />,
    shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
    handshake: <><path d="M3 12l4-4 5 2 5-2 4 4" /><path d="M7 12l3 3a2 2 0 0 0 2.8 0l.7-.7" /><path d="M17 12l-3 3" /><path d="M12 10l-2 2" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16a7 7 0 0 1-7-7z" /><path d="M8 17c4-6 7-7 11-8" /></>,
    map: <><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>,
    badge: <><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></>,
    report: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 16.5h6" /></>,
    chat: <path d="M4 5h16v11H9l-4 4V5z" />,
    library: <><path d="M4 5h5v15H4zM10 5h5v15h-5z" /><path d="M16 6l3.5 1-3 14-3.5-1" /></>,
    check: <path d="M5 13l4 4 10-11" />,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || null}</svg>;
}
