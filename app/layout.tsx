import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/ui/LayoutShell";

export const metadata: Metadata = {
  title: {
    default: "Thorfinn University — Shape Your Future",
    template: "%s | Thorfinn University",
  },
  description:
    "Thorfinn University — A world-class institution fostering innovation, research, and excellence since 1965.",
  keywords: ["university", "engineering", "research", "admissions", "placements"],
  openGraph: {
    title: "Thorfinn University",
    description: "Shape Your Future at Thorfinn University",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
