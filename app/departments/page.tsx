import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = { title: "Departments" };

const DEPARTMENTS = [
  { slug: "computer-science", name: "Computer Science & Engineering",  short: "CSE",  hod: "Dr. Rajesh Kumar",  students: 1200, faculty: 45, labs: 4, programs: ["B.Tech CSE", "M.Tech AI/ML", "Ph.D CS", "B.Tech CSBS"] },
  { slug: "electronics",      name: "Electronics & Communication",     short: "ECE",  hod: "Dr. Anil Verma",    students: 850,  faculty: 35, labs: 4, programs: ["B.Tech ECE", "M.Tech VLSI", "Ph.D ECE"] },
  { slug: "mechanical",       name: "Mechanical Engineering",          short: "ME",   hod: "Dr. Priya Sharma",  students: 900,  faculty: 38, labs: 4, programs: ["B.Tech ME", "M.Tech Manufacturing", "Ph.D ME"] },
  { slug: "civil",            name: "Civil Engineering",               short: "CE",   hod: "Dr. Sunita Patel",  students: 700,  faculty: 30, labs: 4, programs: ["B.Tech CE", "M.Tech Structural", "Ph.D CE"] },
  { slug: "mba",              name: "Business Administration",         short: "MBA",  hod: "Dr. Vikram Singh",  students: 600,  faculty: 28, labs: 3, programs: ["MBA", "Executive MBA", "Ph.D Management"] },
  { slug: "csbs",             name: "CS & Business Systems",           short: "CSBS", hod: "Dr. Meera Nair",    students: 500,  faculty: 22, labs: 3, programs: ["B.Tech CSBS", "M.Tech Data Science"] },
];

export default function DepartmentsPage() {
  return (
    <div className="bg-white pt-16">
      <div className="bg-[#0f172a]">
        <div className="container-max py-20 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Departments</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">Schools & Departments</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">Six departments offering world-class programs and research opportunities.</p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="card overflow-hidden">
          <table className="data-table text-base w-full">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-5 font-semibold">Department</th>
                <th className="py-5 font-semibold">Head of Department</th>
                <th className="py-5 font-semibold">Students</th>
                <th className="py-5 font-semibold">Faculty</th>
                <th className="py-5 font-semibold">Programs</th>
                <th className="py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEPARTMENTS.map((d) => (
                <tr key={d.slug} className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded-md">{d.short}</span>
                      <span className="font-bold text-slate-900 text-lg">{d.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-600 font-medium py-5 px-6">{d.hod}</td>
                  <td className="text-slate-700 font-semibold py-5 px-6">{d.students}</td>
                  <td className="text-slate-700 font-semibold py-5 px-6">{d.faculty}</td>
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap gap-2">
                      {d.programs.slice(0, 2).map(p => (
                        <span key={p} className="badge-gray px-3 py-1.5 text-xs font-semibold">{p}</span>
                      ))}
                      {d.programs.length > 2 && <span className="badge-gray px-3 py-1.5 text-xs font-semibold">+{d.programs.length - 2}</span>}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <Link href={`/departments/${d.slug}`} className="text-sm font-bold text-[#1e3a8a] hover:underline flex items-center gap-1 justify-end whitespace-nowrap">
                      View <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
