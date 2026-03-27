import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | Thorfinn University" };

// Dashboard has its own layout — no global Navbar/Footer
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-50 text-slate-900 antialiased">
      {children}
    </div>
  );
}
