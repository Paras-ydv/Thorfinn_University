"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Bell, Calendar, Radio, BookOpen, LogOut, Menu, X, ChevronRight, GraduationCap } from "lucide-react";
import { HappeningNow } from "./components/HappeningNow";
import { SmartCalendar } from "./components/SmartCalendar";

const ANNOUNCEMENTS = [
  { id: 1, title: "End Semester Examination Schedule Released",    date: "Dec 10, 2024", category: "Academic",  urgent: true },
  { id: 2, title: "Library will remain closed on Dec 25–26",       date: "Dec 9, 2024",  category: "General",   urgent: false },
  { id: 3, title: "Placement drive by Infosys on January 8, 2025", date: "Dec 8, 2024",  category: "Placement", urgent: true },
  { id: 4, title: "Fee payment deadline extended to December 20",   date: "Dec 7, 2024",  category: "Finance",   urgent: false },
  { id: 5, title: "Research symposium registrations now open",      date: "Dec 5, 2024",  category: "Research",  urgent: false },
];

const TABS = [
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "happening",     label: "Happening Now", icon: Radio },
  { id: "calendar",      label: "Event Calendar", icon: Calendar },
  { id: "academics",     label: "Academics",      icon: BookOpen },
];

const ACADEMIC_LINKS = [
  { label: "View Timetable",         href: "#" },
  { label: "Attendance Record",      href: "#" },
  { label: "Examination Schedule",   href: "#" },
  { label: "Grade Report",           href: "#" },
  { label: "Fee Payment",            href: "#" },
  { label: "Library Account",        href: "#" },
];

export default function DashboardPage() {
  const [activeTab,   setActiveTab]   = useState("announcements");
  const [user,        setUser]        = useState<{ name?: string; email?: string; role?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser({
        name:  data.user.user_metadata?.name || data.user.email?.split("@")[0],
        email: data.user.email,
        role:  data.user.user_metadata?.role || "Student",
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "announcements": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Announcements</h2>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ANNOUNCEMENTS.map(a => (
                  <tr key={a.id} className="cursor-pointer">
                    <td className="font-medium text-slate-900">{a.title}</td>
                    <td><span className="badge-gray">{a.category}</span></td>
                    <td className="text-slate-500">{a.date}</td>
                    <td>{a.urgent ? <span className="badge bg-red-50 text-red-700">Urgent</span> : <span className="badge-gray">Info</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      case "happening": return <HappeningNow />;
      case "calendar":  return <SmartCalendar />;
      case "academics": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Academic Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ACADEMIC_LINKS.map(l => (
              <Link key={l.label} href={l.href} className="card p-4 flex items-center justify-between hover:shadow-sm transition-shadow group">
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#1e3a8a] transition-colors">{l.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1e3a8a] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-60
        bg-white border-r border-slate-200 flex flex-col
        transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-slate-200 flex-shrink-0">
          <div className="w-7 h-7 bg-[#1e3a8a] rounded flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-sm">Thorfinn University</span>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || "Loading..."}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-[#1e3a8a]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3 border-t border-slate-200 space-y-0.5">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <GraduationCap className="w-4 h-4" /> University Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-semibold text-slate-900 text-sm">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <span className="text-xs text-slate-500 hidden sm:block">
            {user?.name} — {user?.role}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
