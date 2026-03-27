import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/ui/LayoutShell";

export const metadata: Metadata = {
  title: {
    default: "Thorfinn University",
    template: "%s | Thorfinn University",
  },
  description: "Thorfinn University — Excellence in Education, Research, and Innovation since 1965.",
  keywords: ["university", "engineering", "research", "admissions", "placements"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
