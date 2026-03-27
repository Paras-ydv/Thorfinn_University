import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = { title: "Academics" };

const PROGRAMS = [
  {
    level: "Undergraduate (B.Tech)",
    duration: "4 Years",
    intake: "720 seats",
    exam: "JEE Main",
    list: ["B.Tech Computer Science & Engineering", "B.Tech Electronics & Communication", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "B.Tech CS & Business Systems"],
  },
  {
    level: "Postgraduate (M.Tech / MBA)",
    duration: "2 Years",
    intake: "300 seats",
    exam: "GATE / CAT",
    list: ["M.Tech Artificial Intelligence & ML", "M.Tech VLSI Design", "M.Tech Manufacturing Systems", "M.Tech Structural Engineering", "MBA (Full-time)"],
  },
  {
    level: "Doctoral (Ph.D)",
    duration: "3–5 Years",
    intake: "100 seats",
    exam: "University Entrance Test",
    list: ["Ph.D Computer Science", "Ph.D Electronics", "Ph.D Mechanical Engineering", "Ph.D Management", "Ph.D Civil Engineering"],
  },
];

const CALENDAR = [
  { event: "Semester I Commencement",    date: "July 15, 2024" },
  { event: "Mid-Semester Examinations",  date: "Sep 10–20, 2024" },
  { event: "Semester I End Examinations",date: "Nov 25 – Dec 5, 2024" },
  { event: "Winter Break",               date: "Dec 6 – Jan 5, 2025" },
  { event: "Semester II Commencement",   date: "January 6, 2025" },
  { event: "Mid-Semester Examinations",  date: "Mar 5–15, 2025" },
  { event: "End Semester Examinations",  date: "May 1–20, 2025" },
  { event: "Summer Break",               date: "May 21 – Jul 14, 2025" },
];

export default function AcademicsPage() {
  return (
    <div className="bg-white pt-16">
      <div className="relative bg-[#0f172a] overflow-hidden min-h-[60vh] flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none"
        >
          <source src="/videos/Quick_cuts_of_campus_life—stud.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-transparent z-0"></div>

        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Academics</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Academic Programs</h1>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Rigorous, research-driven programs designed to prepare graduates for leadership in their fields.
          </p>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {PROGRAMS.map((prog) => (
              <div key={prog.level} className="card overflow-hidden">
                <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-bold text-slate-900 text-base">{prog.level}</h2>
                  <div className="flex gap-4 text-sm font-medium text-slate-500">
                    <span>Duration: <strong className="text-slate-700">{prog.duration}</strong></span>
                    <span>Intake: <strong className="text-slate-700">{prog.intake}</strong></span>
                    <span>Entrance: <strong className="text-slate-700">{prog.exam}</strong></span>
                  </div>
                </div>
                <ul className="divide-y divide-slate-100">
                  {prog.list.map((p) => (
                    <li key={p} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                      <span className="text-base text-slate-700 font-medium">{p}</span>
                      <Link href="/departments" className="text-sm font-semibold text-[#1e3a8a] hover:underline flex items-center gap-1">
                        Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-800">Academic Calendar 2024–25</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {CALENDAR.map((c) => (
                  <div key={c.event} className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800">{c.event}</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">{c.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#1e3a8a] mb-5">Grading System</h3>
              <table className="data-table text-sm">
                <thead><tr><th>Grade</th><th>Points</th><th>Range</th></tr></thead>
                <tbody>
                  {[["O","10","90–100"],["A+","9","80–89"],["A","8","70–79"],["B+","7","60–69"],["B","6","50–59"],["C","5","40–49"],["F","0","<40"]].map(([g,p,r]) => (
                    <tr key={g}><td className="font-medium">{g}</td><td>{p}</td><td>{r}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
