import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LeadershipCard } from "@/components/ui/FacultyCard";
import { LEADERSHIP } from "@/lib/facultyData";

export const metadata: Metadata = { title: "About" };

const LEADERSHIP_LIST = [
  "Prof. Arjun Mehta",
  "Dr. Kavitha Rao",
  "Prof. Suresh Nair",
  "Dr. Ananya Singh",
  "Dr. Vikram Patel",
  "Prof. Meera Iyer",
];

const MILESTONES = [
  { year: "1965", event: "University established by Act of Parliament with four founding departments." },
  { year: "1972", event: "First batch of postgraduate programs launched. Research output begins." },
  { year: "1985", event: "Establishment of 20+ research centers. First international collaboration." },
  { year: "1998", event: "Autonomous status granted. Curriculum reforms introduced." },
  { year: "2005", event: "Ranked among Asia's top 50 universities. MoUs with MIT and Stanford." },
  { year: "2015", event: "Innovation & Entrepreneurship Centre inaugurated. 100+ startups incubated." },
  { year: "2024", event: "AI Research Institute launched. 94% placement rate. 50,000+ alumni." },
];

export default function AboutPage() {
  return (
    <div className="bg-white pt-16">
      {/* Header */}
      <div className="bg-[#0f172a]">
        <div className="container-max py-12">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">About</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">About Thorfinn University</h1>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            A legacy of academic excellence, research leadership, and public service since 1965.
          </p>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <p className="section-label">Overview</p>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
              <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
                <p>
                  Thorfinn University is a premier institution of higher education and research, established in 1965 by an Act of Parliament. Located on a 200-acre campus in Tech City, the university offers undergraduate, postgraduate, and doctoral programs across six schools.
                </p>
                <p>
                  With over 12,000 students, 500 faculty members, and a global alumni network of 50,000+, Thorfinn University has consistently ranked among the top institutions in Asia for engineering, management, and research output.
                </p>
                <p>
                  The university is committed to its founding principles: academic rigor, inclusive access, and service to society. Our graduates lead organizations, conduct groundbreaking research, and contribute to public life across the world.
                </p>
              </div>
            </section>

            {/* Mission & Vision */}
            <section>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Mission</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To provide transformative education that equips students with knowledge, skills, and values to lead meaningful lives and contribute to the progress of society.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Vision</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    To be a globally recognized institution of excellence, driving innovation and research that addresses humanity's most pressing challenges.
                  </p>
                </div>
              </div>
            </section>

            {/* History */}
            <section>
              <p className="section-label">History</p>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Milestones</h2>
              <div className="relative border-l-2 border-slate-200 pl-6 space-y-6">
                {MILESTONES.map((m) => (
                  <div key={m.year} className="relative">
                    <div className="absolute -left-[29px] w-3 h-3 rounded-full bg-[#1e3a8a] border-2 border-white" />
                    <p className="text-xs font-bold text-[#1e3a8a] mb-1">{m.year}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{m.event}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Quick Facts</h3>
              <div className="space-y-3 divide-y divide-slate-100">
                {[
                  { l: "Founded",       v: "1965" },
                  { l: "Campus",        v: "200 Acres" },
                  { l: "Students",      v: "12,000+" },
                  { l: "Faculty",       v: "500+" },
                  { l: "Departments",   v: "6" },
                  { l: "Research Labs", v: "50+" },
                  { l: "Alumni",        v: "50,000+" },
                  { l: "Accreditation", v: "NAAC A++" },
                ].map(f => (
                  <div key={f.l} className="flex justify-between pt-3 first:pt-0">
                    <span className="text-xs text-slate-500">{f.l}</span>
                    <span className="text-xs font-semibold text-slate-800">{f.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditations */}
            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Accreditations</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {["NAAC A++ Grade", "NBA Accredited Programs", "NIRF Ranked", "QS Asia Rankings"].map(a => (
                  <li key={a} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <p className="section-label">Administration</p>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">University Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEADERSHIP_LIST.map((name) =>
              LEADERSHIP[name] ? (
                <LeadershipCard key={name} member={LEADERSHIP[name]} />
              ) : null
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
