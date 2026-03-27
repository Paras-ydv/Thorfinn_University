"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { HappeningNow } from "./components/HappeningNow";
import { RoommateMatch } from "./components/RoommateMatch";
import { UniversityInADay } from "./components/UniversityInADay";
import { CareerSimulator } from "./components/CareerSimulator";
import { SmartCalendar } from "./components/SmartCalendar";
import { GraduationCap, Radio, Users, Map, Briefcase, Calendar, LogOut, Menu, X } from "lucide-react";

const TABS = [
  { id: "happening", label: "Happening Now", icon: Radio },
  { id: "roommate", label: "Roommate Match", icon: Users },
  { id: "day", label: "University in a Day", icon: Map },
  { id: "career", label: "Career Simulator", icon: Briefcase },
  { id: "calendar", label: "Event Calendar", icon: Calendar },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("happening");
  const [user, setUser] = useState<{ name?: string; email?: string; role?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser({
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0],
        email: data.user.email,
        role: data.user.user_metadata?.role || "Student",
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "happening": return <HappeningNow />;
      case "roommate": return <RoommateMatch />;
      case "day": return <UniversityInADay />;
      case "career": return <CareerSimulator />;
      case "calendar": return <SmartCalendar />;
      default: return <HappeningNow />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900">
      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64
          glass-dark border-r border-white/10 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">Thorfinn</span>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3 glass rounded-xl p-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user?.name || "Loading..."}</p>
              <p className="text-xs text-blue-400">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <GraduationCap className="w-4 h-4" /> Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 glass-dark border-b border-white/10 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-bold text-white">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h1>
          </div>
          <span className="text-xs text-gray-500 hidden sm:block">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="p-6"
          >
            {renderTab()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
