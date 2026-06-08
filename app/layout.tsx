import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeForest Partnership Finder",
  description: "Find your WeForest business partnership model in two quick answers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
