"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  LogOut, Menu, X, GraduationCap, LayoutDashboard, BookOpen,
  ClipboardList, Bell, Users, ChevronRight, CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";

const COURSES = [
  { code: "CS301", name: "Data Structures & Algorithms", dept: "CSE", semester: 3, students: 62 },
  { code: "CS401", name: "Machine Learning",             dept: "CSE", semester: 5, students: 48 },
  { code: "CS302", name: "Computer Networks",            dept: "CSE", semester: 3, students: 58 },
];

const STUDENTS: Record<string, { roll: string; name: string; attendance: number }[]> = {
  CS301: [
    { roll: "21CS001", name: "Aarav Mehta",    attendance: 88 },
    { roll: "21CS002", name: "Priya Sharma",   attendance: 72 },
    { roll: "21CS003", name: "Rahul Verma",    attendance: 91 },
    { roll: "21CS004", name: "Sneha Iyer",     attendance: 65 },
    { roll: "21CS005", name: "Karan Patel",    attendance: 84 },
    { roll: "21CS006", name: "Divya Nair",     attendance: 78 },
  ],
  CS401: [
    { roll: "21CS011", name: "Arjun Singh",    attendance: 95 },
    { roll: "21CS012", name: "Meera Rao",      attendance: 80 },
    { roll: "21CS013", name: "Vikram Das",     attendance: 70 },
    { roll: "21CS014", name: "Ananya Pillai",  attendance: 88 },
  ],
  CS302: [
    { roll: "21CS021", name: "Rohan Gupta",    attendance: 76 },
    { roll: "21CS022", name: "Nisha Kapoor",   attendance: 90 },
    { roll: "21CS023", name: "Suresh Kumar",   attendance: 68 },
    { roll: "21CS024", name: "Pooja Reddy",    attendance: 83 },
  ],
};

const GRADES_DATA: Record<string, { roll: string; name: string; mid: number; end: number; grade: string }[]> = {
  CS301: [
    { roll: "21CS001", name: "Aarav Mehta",  mid: 38, end: 72, grade: "A" },
    { roll: "21CS002", name: "Priya Sharma", mid: 30, end: 58, grade: "B+" },
    { roll: "21CS003", name: "Rahul Verma",  mid: 42, end: 78, grade: "A+" },
    { roll: "21CS004", name: "Sneha Iyer",   mid: 25, end: 50, grade: "B" },
    { roll: "21CS005", name: "Karan Patel",  mid: 35, end: 65, grade: "A-" },
    { roll: "21CS006", name: "Divya Nair",   mid: 32, end: 60, grade: "B+" },
  ],
  CS401: [
    { roll: "21CS011", name: "Arjun Singh",   mid: 45, end: 82, grade: "A+" },
    { roll: "21CS012", name: "Meera Rao",     mid: 36, end: 68, grade: "A-" },
    { roll: "21CS013", name: "Vikram Das",    mid: 28, end: 55, grade: "B" },
    { roll: "21CS014", name: "Ananya Pillai", mid: 40, end: 74, grade: "A" },
  ],
  CS302: [
    { roll: "21CS021", name: "Rohan Gupta",  mid: 31, end: 60, grade: "B+" },
    { roll: "21CS022", name: "Nisha Kapoor", mid: 43, end: 79, grade: "A" },
    { roll: "21CS023", name: "Suresh Kumar", mid: 22, end: 48, grade: "B-" },
    { roll: "21CS024", name: "Pooja Reddy",  mid: 37, end: 70, grade: "A-" },
  ],
};

const ANNOUNCEMENTS = [
  { id: 1, title: "Mid-semester exam schedule published", date: "Dec 10, 2024", category: "Academic" },
  { id: 2, title: "Faculty development program — Jan 15", date: "Dec 8, 2024",  category: "General" },
  { id: 3, title: "Research grant applications due Dec 31", date: "Dec 5, 2024", category: "Research" },
];

const NAV = [
  { id: "overview",    label: "Overview",    icon: LayoutDashboard },
  { id: "courses",     label: "My Courses",  icon: BookOpen },
  { id: "attendance",  label: "Attendance",  icon: ClipboardList },
  { id: "grades",      label: "Grades",      icon: GraduationCap },
  { id: "students",    label: "Students",    icon: Users },
  { id: "notices",     label: "Notices",     icon: Bell },
];

function gradeColor(g: string) {
  if (g.startsWith("A")) return "text-emerald-700 bg-emerald-50";
  if (g.startsWith("B")) return "text-blue-700 bg-blue-50";
  return "text-amber-700 bg-amber-50";
}

function attColor(pct: number) {
  if (pct >= 85) return "bg-emerald-500";
  if (pct >= 75) return "bg-amber-400";
  return "bg-red-500";
}

function attText(pct: number) {
  if (pct >= 85) return "text-emerald-600";
  if (pct >= 75) return "text-amber-600";
  return "text-red-600";
}

export default function FacultyDashboard() {
  const [activeTab,    setActiveTab]    = useState("overview");
  const [user,         setUser]         = useState<{ name?: string; email?: string } | null>(null);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [activeCourse, setActiveCourse] = useState("CS301");
  const [present,      setPresent]      = useState<Record<string, boolean>>({});
  const [saved,        setSaved]        = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const role = data.user.user_metadata?.role;
      if (role !== "Faculty") { router.push("/dashboard"); return; }
      setUser({ name: data.user.user_metadata?.name || data.user.email?.split("@")[0], email: data.user.email });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/"); };
  const navigate = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  const togglePresent = (roll: string) =>
    setPresent(p => ({ ...p, [roll]: !p[roll] }));

  const saveAttendance = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const renderContent = () => {
    switch (activeTab) {

      case "overview": return (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 text-lg mb-1">Welcome, {user?.name || "Faculty"} 👋</h2>
            <p className="text-sm text-slate-500">Faculty Dashboard — Thorfinn University</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Courses", value: COURSES.length, color: "text-[#1e3a8a]" },
              { label: "Total Students", value: COURSES.reduce((a, c) => a + c.students, 0), color: "text-[#1e3a8a]" },
              { label: "Avg Attendance", value: "82%", color: "text-emerald-600" },
              { label: "Pending Grades", value: "0", color: "text-emerald-600" },
            ].map(s => (
              <div key={s.label} className="card p-5 text-center">
                <p className={`text-3xl font-extrabold font-serif tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">My Courses</h3>
              <button onClick={() => navigate("courses")} className="text-xs text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {COURSES.map(c => (
                <div key={c.code} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.code} · Sem {c.semester} · {c.dept}</p>
                  </div>
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded">{c.students} students</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800 text-sm">Recent Notices</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {ANNOUNCEMENTS.map(a => (
                <div key={a.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{a.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.date} · {a.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case "courses": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">My Courses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.map(c => (
              <div key={c.code} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded">{c.code}</span>
                  <span className="text-xs text-slate-500">Sem {c.semester}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{c.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{c.dept} Department</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">{c.students} enrolled</span>
                  <button onClick={() => { setActiveCourse(c.code); navigate("attendance"); }}
                    className="text-xs font-medium text-[#1e3a8a] hover:underline">Mark Attendance →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case "attendance": return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Mark Attendance</h2>
            {saved && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved</span>}
          </div>
          <div className="flex gap-2 mb-5 flex-wrap">
            {COURSES.map(c => (
              <button key={c.code} onClick={() => setActiveCourse(c.code)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeCourse === c.code ? "bg-[#1e3a8a] text-white" : "card text-slate-600 hover:bg-slate-50"}`}>
                {c.code}
              </button>
            ))}
          </div>
          <div className="card overflow-hidden mb-4">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">{COURSES.find(c => c.code === activeCourse)?.name}</p>
              <p className="text-xs text-slate-400">Today — {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
            </div>
            <div className="divide-y divide-slate-100">
              {STUDENTS[activeCourse]?.map(s => (
                <div key={s.roll} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{s.roll} · Overall: <span className={attText(s.attendance)}>{s.attendance}%</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPresent(p => ({ ...p, [s.roll]: true }))}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${present[s.roll] === true ? "bg-emerald-500 text-white border-emerald-500" : "border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600"}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Present
                    </button>
                    <button onClick={() => setPresent(p => ({ ...p, [s.roll]: false }))}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${present[s.roll] === false ? "bg-red-500 text-white border-red-500" : "border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-600"}`}>
                      <XCircle className="w-3.5 h-3.5" /> Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={saveAttendance} className="btn-primary">Save Attendance</button>
        </div>
      );

      case "grades": return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Student Grades</h2>
          </div>
          <div className="flex gap-2 mb-5 flex-wrap">
            {COURSES.map(c => (
              <button key={c.code} onClick={() => setActiveCourse(c.code)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeCourse === c.code ? "bg-[#1e3a8a] text-white" : "card text-slate-600 hover:bg-slate-50"}`}>
                {c.code}
              </button>
            ))}
          </div>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Roll No.</th><th>Name</th><th>Mid-Sem (50)</th><th>End-Sem (100)</th><th>Grade</th></tr>
              </thead>
              <tbody>
                {GRADES_DATA[activeCourse]?.map(g => (
                  <tr key={g.roll}>
                    <td className="font-mono text-xs text-slate-500">{g.roll}</td>
                    <td className="font-medium text-slate-900">{g.name}</td>
                    <td className="text-slate-700">{g.mid}</td>
                    <td className="text-slate-700">{g.end}</td>
                    <td><span className={`badge font-bold ${gradeColor(g.grade)}`}>{g.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case "students": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Student Overview</h2>
          <div className="space-y-6">
            {COURSES.map(c => (
              <div key={c.code} className="card overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.code} · {c.students} students</p>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {STUDENTS[c.code]?.map(s => (
                    <div key={s.roll} className="px-5 py-3.5 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{s.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{s.roll}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${attColor(s.attendance)}`} style={{ width: `${s.attendance}%` }} />
                        </div>
                        <span className={`text-xs font-bold w-10 text-right ${attText(s.attendance)}`}>{s.attendance}%</span>
                        {s.attendance < 75 && <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case "notices": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Notices & Announcements</h2>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Category</th><th>Date</th></tr></thead>
              <tbody>
                {ANNOUNCEMENTS.map(a => (
                  <tr key={a.id}>
                    <td className="font-medium text-slate-900">{a.title}</td>
                    <td><span className="badge-gray">{a.category}</span></td>
                    <td className="text-slate-500">{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-2.5 px-5 h-14 border-b border-slate-200 flex-shrink-0">
          <img src="/images/favicon.png" alt="Thorfinn University" className="w-7 h-7 rounded" />
          <span className="font-semibold text-slate-900 text-sm">Thorfinn University</span>
        </div>
        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "F"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || "Faculty"}</p>
              <p className="text-xs text-violet-600 font-medium">Faculty</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${activeTab === item.id ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />{item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-3 border-t border-slate-200 space-y-0.5">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <GraduationCap className="w-4 h-4" /> University Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 px-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-semibold text-slate-900 text-sm">{NAV.find(t => t.id === activeTab)?.label}</h1>
          </div>
          <span className="text-xs text-violet-600 font-medium hidden sm:block">Faculty Portal</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
