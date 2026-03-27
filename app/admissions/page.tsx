import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = { title: "Admissions" };

const DATES = [
  { event: "Application Portal Opens",       date: "January 1, 2026" },
  { event: "Application Deadline (B.Tech)",  date: "March 31, 2026" },
  { event: "Application Deadline (M.Tech)",  date: "April 15, 2026" },
  { event: "Application Deadline (MBA)",     date: "April 30, 2026" },
  { event: "Entrance Exam (University Test)",date: "May 10, 2026" },
  { event: "Results Announcement",           date: "May 25, 2026" },
  { event: "Counseling & Seat Allotment",    date: "June 1–15, 2026" },
  { event: "Fee Payment Deadline",           date: "June 20, 2026" },
  { event: "Commencement of Classes",        date: "July 15, 2026" },
];

const PROGRAMS = [
  { name: "B.Tech (All branches)", fee: "1,20,000", seats: 720, exam: "JEE Main" },
  { name: "M.Tech",                fee: "80,000",   seats: 300, exam: "GATE" },
  { name: "MBA",                   fee: "1,50,000", seats: 120, exam: "CAT / MAT" },
  { name: "Ph.D",                  fee: "40,000",   seats: 100, exam: "University Test" },
];

export default function AdmissionsPage() {
  return (
    <div className="bg-white pt-16">
      <div className="bg-[#0f172a] min-h-[60vh] flex items-center">
        <div className="container-max py-20 lg:py-24 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Admissions</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Admissions 2026</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            Applications for the 2026 intake are now open. Review eligibility criteria and apply before the deadline.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Process */}
            <section>
              <p className="section-label">How to Apply</p>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Admission Process</h2>
              <ol className="space-y-4">
                {[
                  { n: "01", t: "Check Eligibility",    d: "Review the eligibility criteria for your chosen program. Ensure you meet the academic and entrance exam requirements." },
                  { n: "02", t: "Register Online",      d: "Create an account on the admissions portal and fill in the application form with accurate personal and academic details." },
                  { n: "03", t: "Upload Documents",     d: "Upload scanned copies of mark sheets, certificates, ID proof, and passport-size photograph as specified." },
                  { n: "04", t: "Pay Application Fee",  d: "Pay the non-refundable application fee of Rs. 1,000 via net banking, UPI, or credit/debit card." },
                  { n: "05", t: "Appear for Entrance",  d: "Appear for JEE Main / GATE / CAT or the university entrance test as applicable to your program." },
                  { n: "06", t: "Counseling & Joining", d: "Attend the counseling session, confirm your seat, pay the first-semester fee, and complete enrollment formalities." },
                ].map(s => (
                  <li key={s.n} className="flex gap-5">
                    <span className="text-2xl font-bold text-slate-200 font-serif flex-shrink-0 w-8">{s.n}</span>
                    <div className="pt-1">
                      <p className="font-semibold text-slate-900 text-sm mb-1">{s.t}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Fee structure */}
            <section>
              <p className="section-label">Fees</p>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Fee Structure (Annual)</h2>
              <div className="card overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Annual Fee (INR)</th>
                      <th>Seats</th>
                      <th>Entrance Exam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRAMS.map(p => (
                      <tr key={p.name}>
                        <td className="font-medium text-slate-900">{p.name}</td>
                        <td>Rs. {p.fee}</td>
                        <td>{p.seats}</td>
                        <td><span className="badge-blue">{p.exam}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">* Fees are subject to revision. Hostel and mess charges are additional.</p>
            </section>

            {/* Eligibility */}
            <section>
              <p className="section-label">Eligibility</p>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Eligibility Criteria</h2>
              <div className="space-y-3">
                {[
                  { prog: "B.Tech", criteria: "10+2 with Physics, Chemistry, Mathematics. Minimum 60% aggregate. Valid JEE Main score." },
                  { prog: "M.Tech", criteria: "B.Tech / B.E. in relevant discipline with minimum 60% aggregate. Valid GATE score." },
                  { prog: "MBA",    criteria: "Bachelor's degree in any discipline with minimum 50% aggregate. Valid CAT / MAT score." },
                  { prog: "Ph.D",   criteria: "Master's degree in relevant discipline with minimum 55% aggregate. University entrance test." },
                ].map(e => (
                  <div key={e.prog} className="card p-4 flex gap-4">
                    <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2 py-1 rounded h-fit flex-shrink-0">{e.prog}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{e.criteria}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#1e3a8a] rounded-lg p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-3">Apply Now</p>
              <p className="text-sm text-blue-100 mb-4">Applications for 2026 are open. Deadline: March 31, 2026.</p>
              <Link href="/signup" className="block text-center bg-white text-[#1e3a8a] font-semibold text-sm py-2.5 rounded hover:bg-blue-50 transition-colors">
                Start Application
              </Link>
            </div>

            <div className="card overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-700">Important Dates</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {DATES.map(d => (
                  <div key={d.event} className="px-5 py-3">
                    <p className="text-xs font-medium text-slate-800">{d.event}</p>
                    <p className="text-xs text-[#1e3a8a] font-semibold mt-0.5">{d.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Contact Admissions</h3>
              <p className="text-sm text-slate-600">admissions@thorfinn.edu</p>
              <p className="text-sm text-slate-600">+91 80 2345 6790</p>
              <p className="text-xs text-slate-500 mt-2">Mon–Fri, 9:00 AM – 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
