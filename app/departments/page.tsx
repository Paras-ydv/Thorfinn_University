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
        <div className="container-max py-12">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">Departments</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Schools & Departments</h1>
          <p className="text-slate-400 mt-2 text-sm">Six departments offering world-class programs and research opportunities.</p>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Head of Department</th>
                <th>Students</th>
                <th>Faculty</th>
                <th>Programs</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((d) => (
                <tr key={d.slug}>
                  <td>
                    <div>
                      <span className="text-xs font-bold text-[#1e3a8a] mr-2">{d.short}</span>
                      <span className="font-medium text-slate-900">{d.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-600">{d.hod}</td>
                  <td>{d.students}</td>
                  <td>{d.faculty}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {d.programs.slice(0, 2).map(p => (
                        <span key={p} className="badge-gray">{p}</span>
                      ))}
                      {d.programs.length > 2 && <span className="badge-gray">+{d.programs.length - 2}</span>}
                    </div>
                  </td>
                  <td>
                    <Link href={`/departments/${d.slug}`} className="text-xs text-[#1e3a8a] hover:underline flex items-center gap-1 whitespace-nowrap">
                      View <ChevronRight className="w-3 h-3" />
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
