"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Bell, Calendar, BookOpen, LogOut, Menu, X, ChevronRight,
  GraduationCap, LayoutDashboard, ClipboardList, Clock, Briefcase,
  Users, Layers, TrendingUp, AlertCircle,
} from "lucide-react";
import { SmartCalendar } from "./components/SmartCalendar";
import { CareerSimulator } from "./components/CareerSimulator";
import { RoommateMatch } from "./components/RoommateMatch";
import { UniversityInADay } from "./components/UniversityInADay";
import { MapMarkersAdmin } from "./components/MapMarkersAdmin";

/* ── static data ── */
const ANNOUNCEMENTS = [
  { id: 1, title: "End Semester Examination Schedule Released",    date: "Dec 10, 2024", category: "Academic",  urgent: true },
  { id: 2, title: "Library will remain closed on Dec 25–26",       date: "Dec 9, 2024",  category: "General",   urgent: false },
  { id: 3, title: "Placement drive by Infosys on January 8, 2025", date: "Dec 8, 2024",  category: "Placement", urgent: true },
  { id: 4, title: "Fee payment deadline extended to December 20",   date: "Dec 7, 2024",  category: "Finance",   urgent: false },
  { id: 5, title: "Research symposium registrations now open",      date: "Dec 5, 2024",  category: "Research",  urgent: false },
];

const GRADES = [
  { subject: "Data Structures & Algorithms", code: "CS301", credits: 4, grade: "A", points: 10 },
  { subject: "Computer Networks",            code: "CS302", credits: 3, grade: "A-", points: 9 },
  { subject: "Operating Systems",            code: "CS303", credits: 4, grade: "B+", points: 8 },
  { subject: "Database Management Systems",  code: "CS304", credits: 3, grade: "A",  points: 10 },
  { subject: "Software Engineering",         code: "CS305", credits: 3, grade: "B+", points: 8 },
  { subject: "Discrete Mathematics",         code: "MA301", credits: 3, grade: "A-", points: 9 },
];

const ATTENDANCE = [
  { subject: "Data Structures & Algorithms", code: "CS301", attended: 42, total: 48, pct: 87 },
  { subject: "Computer Networks",            code: "CS302", attended: 35, total: 40, pct: 87 },
  { subject: "Operating Systems",            code: "CS303", attended: 38, total: 44, pct: 86 },
  { subject: "Database Management Systems",  code: "CS304", attended: 40, total: 42, pct: 95 },
  { subject: "Software Engineering",         code: "CS305", attended: 28, total: 38, pct: 73 },
  { subject: "Discrete Mathematics",         code: "MA301", attended: 36, total: 40, pct: 90 },
];

const TIMETABLE: Record<string, { time: string; subject: string; room: string; type: string }[]> = {
  Monday:    [{ time: "9:00–10:00",  subject: "Data Structures", room: "CS-101", type: "Lecture" }, { time: "11:00–1:00", subject: "OS Lab", room: "Lab-3", type: "Lab" }, { time: "2:00–3:00", subject: "Discrete Math", room: "MA-201", type: "Lecture" }],
  Tuesday:   [{ time: "9:00–10:00",  subject: "Computer Networks", room: "CS-102", type: "Lecture" }, { time: "10:00–11:00", subject: "Software Engg", room: "CS-103", type: "Lecture" }, { time: "3:00–4:00", subject: "DBMS", room: "CS-201", type: "Lecture" }],
  Wednesday: [{ time: "9:00–11:00",  subject: "DBMS Lab", room: "Lab-2", type: "Lab" }, { time: "2:00–3:00", subject: "Data Structures", room: "CS-101", type: "Tutorial" }],
  Thursday:  [{ time: "9:00–10:00",  subject: "Operating Systems", room: "CS-104", type: "Lecture" }, { time: "11:00–12:00", subject: "Discrete Math", room: "MA-201", type: "Lecture" }, { time: "2:00–4:00", subject: "Networks Lab", room: "Lab-1", type: "Lab" }],
  Friday:    [{ time: "9:00–10:00",  subject: "Software Engg", room: "CS-103", type: "Lecture" }, { time: "10:00–11:00", subject: "Computer Networks", room: "CS-102", type: "Tutorial" }, { time: "2:00–3:00", subject: "DBMS", room: "CS-201", type: "Tutorial" }],
};

const ACADEMIC_LINKS = [
  { label: "View Timetable",       href: "#" },
  { label: "Attendance Record",    href: "#" },
  { label: "Examination Schedule", href: "#" },
  { label: "Grade Report",         href: "#" },
  { label: "Fee Payment",          href: "#" },
  { label: "Library Account",      href: "#" },
];

const OVERVIEW_STATS = [
  { label: "CGPA", value: "8.7", sub: "Semester 5", color: "text-[#1e3a8a]" },
  { label: "Attendance", value: "87%", sub: "This semester", color: "text-emerald-600" },
  { label: "Credits", value: "124", sub: "of 160 required", color: "text-[#1e3a8a]" },
  { label: "Backlogs", value: "0", sub: "All clear", color: "text-emerald-600" },
];

/* ── nav groups ── */
const NAV = [
  {
    group: "Portal",
    items: [
      { id: "overview",      label: "Overview",       icon: LayoutDashboard },
      { id: "announcements", label: "Announcements",  icon: Bell },
      { id: "grades",        label: "Grades",         icon: TrendingUp },
      { id: "attendance",    label: "Attendance",     icon: ClipboardList },
      { id: "timetable",     label: "Timetable",      icon: Clock },
      { id: "calendar",      label: "Event Calendar", icon: Calendar },
    ],
  },
  {
    group: "Campus",
    items: [
      { id: "career",      label: "Career Simulator", icon: Briefcase },
      { id: "roommate",    label: "Roommate Match",   icon: Users },
      { id: "dayinlife",   label: "Day in Life",      icon: Layers },
      { id: "mapmarkers",  label: "Map Markers",      icon: AlertCircle },
    ],
  },
];

/* ── grade colour ── */
function gradeColor(g: string) {
  if (g.startsWith("A")) return "text-emerald-600 bg-emerald-50";
  if (g.startsWith("B")) return "text-blue-600 bg-blue-50";
  return "text-amber-600 bg-amber-50";
}

function attColor(pct: number) {
  if (pct >= 85) return "bg-emerald-500";
  if (pct >= 75) return "bg-amber-400";
  return "bg-red-500";
}

/* ── component ── */
export default function DashboardPage() {
  const [activeTab,   setActiveTab]   = useState("overview");
  const [user,        setUser]        = useState<{ name?: string; email?: string; role?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [weekDay,     setWeekDay]     = useState("Monday");
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

  const navigate = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  const renderContent = () => {
    switch (activeTab) {

      case "overview": return (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 text-lg mb-1">Welcome back, {user?.name || "Student"} 👋</h2>
            <p className="text-sm text-slate-500">Here's your academic summary for Semester 5.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {OVERVIEW_STATS.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <p className={`text-3xl font-extrabold font-serif tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Announcements preview */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Recent Announcements</h3>
              <button onClick={() => navigate("announcements")} className="text-xs text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {ANNOUNCEMENTS.slice(0, 3).map((a) => (
                <div key={a.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                  {a.urgent && <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{a.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.date} · {a.category}</p>
                  </div>
                  {a.urgent && <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded flex-shrink-0">Urgent</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Today's timetable */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Today's Classes <span className="text-slate-400 font-normal">(Monday)</span></h3>
              <button onClick={() => navigate("timetable")} className="text-xs text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
                Full timetable <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {TIMETABLE["Monday"].map((cls) => (
                <div key={cls.subject} className="px-5 py-3.5 flex items-center gap-4">
                  <div className="w-20 flex-shrink-0">
                    <p className="text-xs font-semibold text-[#1e3a8a]">{cls.time.split("–")[0]}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{cls.subject}</p>
                    <p className="text-xs text-slate-400">{cls.room}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${cls.type === "Lab" ? "bg-violet-50 text-violet-700" : cls.type === "Tutorial" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                    {cls.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance warning */}
          {ATTENDANCE.some(a => a.pct < 75) && (
            <div className="card p-4 border-l-4 border-red-500 bg-red-50">
              <p className="text-sm font-semibold text-red-700">Attendance Warning</p>
              <p className="text-xs text-red-600 mt-1">
                {ATTENDANCE.filter(a => a.pct < 75).map(a => a.code).join(", ")} — below 75% threshold.
              </p>
            </div>
          )}
        </div>
      );

      case "announcements": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Announcements</h2>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th></tr>
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

      case "grades": return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Grades — Semester 5</h2>
            <div className="card px-4 py-2 text-sm">
              CGPA: <span className="font-bold text-[#1e3a8a]">8.7</span>
            </div>
          </div>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Subject</th><th>Code</th><th>Credits</th><th>Grade</th><th>Points</th></tr>
              </thead>
              <tbody>
                {GRADES.map(g => (
                  <tr key={g.code}>
                    <td className="font-medium text-slate-900">{g.subject}</td>
                    <td className="text-slate-500 font-mono text-xs">{g.code}</td>
                    <td className="text-slate-600">{g.credits}</td>
                    <td><span className={`badge font-bold ${gradeColor(g.grade)}`}>{g.grade}</span></td>
                    <td className="font-semibold text-slate-800">{g.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">* Grades are provisional until official declaration.</p>
        </div>
      );

      case "attendance": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Attendance — Semester 5</h2>
          <div className="space-y-3">
            {ATTENDANCE.map(a => (
              <div key={a.code} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{a.subject}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{a.code}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${a.pct >= 85 ? "text-emerald-600" : a.pct >= 75 ? "text-amber-600" : "text-red-600"}`}>{a.pct}%</p>
                    <p className="text-xs text-slate-400">{a.attended}/{a.total} classes</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${attColor(a.pct)}`} style={{ width: `${a.pct}%` }} />
                </div>
                {a.pct < 75 && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Below minimum requirement
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      );

      case "timetable": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Weekly Timetable</h2>
          <div className="flex gap-2 mb-5 flex-wrap">
            {Object.keys(TIMETABLE).map(day => (
              <button key={day} onClick={() => setWeekDay(day)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${weekDay === day ? "bg-[#1e3a8a] text-white" : "card text-slate-600 hover:bg-slate-50"}`}>
                {day}
              </button>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="divide-y divide-slate-100">
              {TIMETABLE[weekDay].map((cls, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-28 flex-shrink-0">
                    <p className="text-sm font-semibold text-[#1e3a8a]">{cls.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{cls.subject}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cls.room}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded flex-shrink-0 ${cls.type === "Lab" ? "bg-violet-50 text-violet-700" : cls.type === "Tutorial" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                    {cls.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case "calendar":    return <SmartCalendar />;
      case "career":      return <CareerSimulator />;
      case "roommate":    return <RoommateMatch />;
      case "dayinlife":   return <UniversityInADay />;
      case "mapmarkers":  return user?.role === "Admin" ? <MapMarkersAdmin /> : <p className="text-sm text-slate-500">Admin access required.</p>;

      default: return null;
    }
  };

  const allItems = NAV.flatMap(g => g.items);
  const activeLabel = allItems.find(t => t.id === activeTab)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64
        bg-white border-r border-slate-200 flex flex-col
        transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-slate-200 flex-shrink-0">
          <img src="/images/favicon.png" alt="Thorfinn University" className="w-7 h-7 rounded" />
          <span className="font-semibold text-slate-900 text-sm">Thorfinn University</span>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || "Loading..."}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
          {NAV.map(group => (
            <div key={group.group}>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">{group.group}</p>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 text-[#1e3a8a]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
            <h1 className="font-semibold text-slate-900 text-sm">{activeLabel}</h1>
          </div>
          <span className="text-xs text-slate-500 hidden sm:block">{user?.name} — {user?.role}</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
