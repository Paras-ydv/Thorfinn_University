"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  LogOut, Menu, X, GraduationCap, LayoutDashboard, Users, BookOpen,
  Bell, Settings, TrendingUp, ChevronRight, AlertCircle, CheckCircle2,
  Building2, DollarSign, UserCheck, ShieldCheck,
} from "lucide-react";

const DEPT_STATS = [
  { name: "Computer Science & Engg", short: "CSE",  students: 1200, faculty: 45, hod: "Dr. Rajesh Kumar",  placement: 96 },
  { name: "Electronics & Comm",      short: "ECE",  students: 850,  faculty: 35, hod: "Dr. Anil Verma",    placement: 91 },
  { name: "Mechanical Engineering",  short: "ME",   students: 900,  faculty: 38, hod: "Dr. Priya Sharma",  placement: 88 },
  { name: "Civil Engineering",       short: "CE",   students: 700,  faculty: 30, hod: "Dr. Sunita Patel",  placement: 82 },
  { name: "Business Administration", short: "MBA",  students: 600,  faculty: 28, hod: "Dr. Vikram Singh",  placement: 94 },
  { name: "CS & Business Systems",   short: "CSBS", students: 500,  faculty: 22, hod: "Dr. Meera Nair",    placement: 90 },
];

const USERS = [
  { id: 1, name: "Rahul Verma",      email: "student.thorfinn@gmail.com", role: "Student", dept: "CSE",  status: "Active" },
  { id: 2, name: "Dr. Priya Sharma", email: "faculty.thorfinn@gmail.com", role: "Faculty", dept: "ME",   status: "Active" },
  { id: 3, name: "Arjun Mehta",      email: "admin.thorfinn@gmail.com",   role: "Admin",   dept: "Admin",status: "Active" },
  { id: 4, name: "Sneha Iyer",       email: "sneha@thorfinn.edu",         role: "Student", dept: "CSBS", status: "Active" },
  { id: 5, name: "Dr. Anil Verma",   email: "anil@thorfinn.edu",          role: "Faculty", dept: "ECE",  status: "Active" },
  { id: 6, name: "Karan Patel",      email: "karan@thorfinn.edu",         role: "Student", dept: "MBA",  status: "Inactive" },
];

const NOTICES = [
  { id: 1, title: "End Semester Examination Schedule Released",    date: "Dec 10, 2024", category: "Academic",  urgent: true },
  { id: 2, title: "Faculty recruitment drive — Applications open", date: "Dec 9, 2024",  category: "HR",        urgent: false },
  { id: 3, title: "Annual budget review meeting — Dec 20",         date: "Dec 8, 2024",  category: "Finance",   urgent: true },
  { id: 4, title: "NAAC accreditation visit scheduled for Feb",    date: "Dec 7, 2024",  category: "Academic",  urgent: true },
  { id: 5, title: "Campus maintenance shutdown — Dec 28–30",       date: "Dec 5, 2024",  category: "General",   urgent: false },
];

const RECENT_ACTIVITY = [
  { action: "New student registered",        user: "Divya Nair",       time: "2 min ago",  type: "user" },
  { action: "Placement record updated",      user: "Placement Cell",   time: "1 hr ago",   type: "placement" },
  { action: "Faculty profile updated",       user: "Dr. Anil Verma",   time: "3 hrs ago",  type: "faculty" },
  { action: "Notice published",              user: "Admin",            time: "5 hrs ago",  type: "notice" },
  { action: "Department budget approved",    user: "Finance Office",   time: "Yesterday",  type: "finance" },
];

const NAV = [
  { id: "overview",    label: "Overview",       icon: LayoutDashboard },
  { id: "departments", label: "Departments",    icon: Building2 },
  { id: "users",       label: "User Management",icon: Users },
  { id: "placements",  label: "Placements",     icon: TrendingUp },
  { id: "notices",     label: "Notices",        icon: Bell },
  { id: "settings",    label: "Settings",       icon: Settings },
];

const ROLE_STYLE: Record<string, string> = {
  Admin:   "bg-red-50 text-red-700",
  Faculty: "bg-violet-50 text-violet-700",
  Student: "bg-blue-50 text-blue-700",
};

export default function AdminDashboard() {
  const [activeTab,   setActiveTab]   = useState("overview");
  const [user,        setUser]        = useState<{ name?: string; email?: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [noticeForm,  setNoticeForm]  = useState({ title: "", category: "Academic", urgent: false });
  const [noticeSent,  setNoticeSent]  = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      const role = data.user.user_metadata?.role;
      if (role !== "Admin") { router.push("/dashboard"); return; }
      setUser({ name: data.user.user_metadata?.name || data.user.email?.split("@")[0], email: data.user.email });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); router.push("/"); };
  const navigate = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  const postNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeSent(true);
    setNoticeForm({ title: "", category: "Academic", urgent: false });
    setTimeout(() => setNoticeSent(false), 3000);
  };

  const renderContent = () => {
    switch (activeTab) {

      case "overview": return (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 text-lg mb-1">Welcome, {user?.name || "Admin"} 👋</h2>
            <p className="text-sm text-slate-500">Admin Dashboard — Thorfinn University</p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users,      label: "Total Students", value: "4,750",  color: "text-[#1e3a8a]",    bg: "bg-blue-50" },
              { icon: UserCheck,  label: "Faculty",        value: "198",    color: "text-violet-700",   bg: "bg-violet-50" },
              { icon: TrendingUp, label: "Avg Placement",  value: "90%",    color: "text-emerald-700",  bg: "bg-emerald-50" },
              { icon: DollarSign, label: "Research Funds", value: "₹45 Cr", color: "text-amber-700",    bg: "bg-amber-50" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="card p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded ${s.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-extrabold font-serif tracking-tight ${s.color}`}>{s.value}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent activity */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 text-sm">Recent Activity</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{a.action}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.user}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent notices */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-sm">Urgent Notices</h3>
                <button onClick={() => navigate("notices")} className="text-xs text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {NOTICES.filter(n => n.urgent).map(n => (
                  <div key={n.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.date} · {n.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department snapshot */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 text-sm">Department Snapshot</h3>
              <button onClick={() => navigate("departments")} className="text-xs text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {DEPT_STATS.slice(0, 4).map(d => (
                <div key={d.short} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded w-14 text-center flex-shrink-0">{d.short}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{d.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{d.students} students · {d.faculty} faculty</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded flex-shrink-0">{d.placement}% placed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case "departments": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Departments</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {DEPT_STATS.map(d => (
              <div key={d.short} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded">{d.short}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">{d.placement}% placed</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{d.name}</h3>
                <p className="text-xs text-slate-500 mb-4">HoD: {d.hod}</p>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Students</p>
                    <p className="text-lg font-bold text-slate-900">{d.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Faculty</p>
                    <p className="text-lg font-bold text-slate-900">{d.faculty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

      case "users": return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">User Management</h2>
            <div className="flex gap-2 text-xs">
              <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded">{USERS.filter(u => u.role === "Student").length} Students</span>
              <span className="bg-violet-50 text-violet-700 font-bold px-2.5 py-1 rounded">{USERS.filter(u => u.role === "Faculty").length} Faculty</span>
              <span className="bg-red-50 text-red-700 font-bold px-2.5 py-1 rounded">{USERS.filter(u => u.role === "Admin").length} Admin</span>
            </div>
          </div>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Dept</th><th>Status</th></tr>
              </thead>
              <tbody>
                {USERS.map(u => (
                  <tr key={u.id}>
                    <td className="font-medium text-slate-900">{u.name}</td>
                    <td className="text-slate-500 text-xs">{u.email}</td>
                    <td><span className={`badge font-bold ${ROLE_STYLE[u.role]}`}>{u.role}</span></td>
                    <td className="text-slate-600">{u.dept}</td>
                    <td>
                      <span className={`badge font-medium ${u.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

      case "placements": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">Placement Overview</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Overall Placement Rate", value: "90%",    color: "text-emerald-700" },
              { label: "Highest Package",         value: "₹45 LPA", color: "text-[#1e3a8a]" },
              { label: "Companies Visited",       value: "120+",  color: "text-[#1e3a8a]" },
            ].map(s => (
              <div key={s.label} className="card p-6 text-center">
                <p className={`text-3xl font-extrabold font-serif tracking-tight ${s.color}`}>{s.value}</p>
                <p className="text-sm font-medium text-slate-600 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="card overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800 text-sm">Department-wise Placement</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {DEPT_STATS.map(d => (
                <div key={d.short} className="px-5 py-4 flex items-center gap-4">
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded w-14 text-center flex-shrink-0">{d.short}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-slate-800">{d.name}</p>
                      <span className="text-sm font-bold text-emerald-600">{d.placement}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.placement}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

      case "notices": return (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-slate-900 mb-4">All Notices</h2>
            <div className="card overflow-hidden">
              <table className="data-table">
                <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {NOTICES.map(n => (
                    <tr key={n.id}>
                      <td className="font-medium text-slate-900">{n.title}</td>
                      <td><span className="badge-gray">{n.category}</span></td>
                      <td className="text-slate-500">{n.date}</td>
                      <td>{n.urgent ? <span className="badge bg-red-50 text-red-700 font-bold">Urgent</span> : <span className="badge-gray">Info</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 mb-4">Post New Notice</h2>
            <form onSubmit={postNotice} className="card p-6 space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                <input
                  type="text" required
                  value={noticeForm.title}
                  onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  placeholder="Notice title..."
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select value={noticeForm.category} onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })}
                  className="input">
                  {["Academic", "Finance", "HR", "Research", "General"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="urgent" checked={noticeForm.urgent}
                  onChange={e => setNoticeForm({ ...noticeForm, urgent: e.target.checked })}
                  className="w-4 h-4 accent-[#1e3a8a]" />
                <label htmlFor="urgent" className="text-sm font-medium text-slate-700">Mark as Urgent</label>
              </div>
              <button type="submit" className="btn-primary">
                {noticeSent ? <><CheckCircle2 className="w-4 h-4" /> Published!</> : "Publish Notice"}
              </button>
            </form>
          </div>
        </div>
      );

      case "settings": return (
        <div>
          <h2 className="font-semibold text-slate-900 mb-4">System Settings</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              { icon: ShieldCheck, title: "Security & Access",    desc: "Manage roles, permissions, and 2FA settings." },
              { icon: Bell,        title: "Notification Settings", desc: "Configure email and in-app notification rules." },
              { icon: BookOpen,    title: "Academic Calendar",     desc: "Set semester dates, holidays, and exam windows." },
              { icon: DollarSign,  title: "Fee Configuration",     desc: "Update tuition, hostel, and miscellaneous fees." },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card p-6 flex gap-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#1e3a8a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors">{s.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
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
            <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || "Admin"}</p>
              <p className="text-xs text-red-600 font-medium">Administrator</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${activeTab === item.id ? "bg-red-50 text-red-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
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
          <span className="text-xs text-red-600 font-medium hidden sm:block">Admin Portal</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
