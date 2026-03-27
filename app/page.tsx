import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { AIChatbot } from "@/components/ui/AIChatbot";

const STATS = [
  { value: "1,20,000+", label: "Students Enrolled" },
  { value: "500+", label: "Faculty Members" },
  { value: "94%", label: "Placement Rate" },
  { value: "2,400+", label: "Research Publications" },
  { value: "50,000+", label: "Alumni Worldwide" },
  { value: "200", label: "Acres Campus" },
];

const DEPARTMENTS = [
  { name: "Computer Science & Engineering", short: "CSE", href: "/departments/computer-science", students: 1200, faculty: 45 },
  { name: "Electronics & Communication", short: "ECE", href: "/departments/electronics", students: 850, faculty: 35 },
  { name: "Mechanical Engineering", short: "ME", href: "/departments/mechanical", students: 900, faculty: 38 },
  { name: "Civil Engineering", short: "CE", href: "/departments/civil", students: 700, faculty: 30 },
  { name: "Business Administration", short: "MBA", href: "/departments/mba", students: 600, faculty: 28 },
  { name: "CS & Business Systems", short: "CSBS", href: "/departments/csbs", students: 500, faculty: 22 },
];

const NEWS = [
  { date: "Dec 12, 2024", category: "Research", title: "Thorfinn researchers develop low-power AI chip for edge computing" },
  { date: "Dec 8, 2024", category: "Placements", title: "Record 94% placement rate achieved for the batch of 2024" },
  { date: "Dec 3, 2024", category: "Events", title: "Annual TechSummit 2024 to be held on January 15–17, 2025" },
  { date: "Nov 28, 2024", category: "Admissions", title: "Applications for B.Tech 2025 intake now open — deadline March 31" },
];

const EVENTS = [
  { date: "Jan 15", title: "TechSummit 2025", type: "Technical", venue: "Main Auditorium" },
  { date: "Jan 20", title: "Admissions Open Day", type: "Admissions", venue: "Admin Block" },
  { date: "Feb 5", title: "Annual Sports Meet", type: "Sports", venue: "Sports Complex" },
  { date: "Feb 14", title: "Research Symposium 2025", type: "Research", venue: "Conference Hall" },
];

const RESEARCH = [
  { area: "Artificial Intelligence & Machine Learning", papers: 145, pi: "Dr. Arun Patel" },
  { area: "VLSI Design & Embedded Systems", papers: 98, pi: "Dr. Anil Verma" },
  { area: "Sustainable Manufacturing", papers: 76, pi: "Dr. Priya Sharma" },
  { area: "Business Analytics & FinTech", papers: 54, pi: "Dr. Meera Nair" },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ── HERO ── */}
      <section className="relative bg-[#0f172a] pt-16 overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none"
        >
          <source src="/videos/s_Aerial_drone_shot_sweepi.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-transparent z-0"></div>

        <div className="container-max py-24 lg:py-32 relative z-10 w-full">
          <div className="max-w-3xl">
            <p className="section-label text-blue-400 mb-4">Est. 1965 — Ranked #1 in Innovation</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Advancing Knowledge.<br />Shaping Leaders.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              Thorfinn University is committed to excellence in education, research, and public service — preparing graduates to lead in a rapidly changing world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/admissions" className="btn-primary">
                Apply for 2025 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/academics" className="btn-outline border-slate-400 text-slate-200 hover:bg-white hover:text-[#1e3a8a]">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom border accent */}
        <div className="h-1 bg-[#1e3a8a]" />
      </section>

      {/* ── STATS ── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-slate-200">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-10 lg:py-12 text-center flex flex-col justify-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">{s.value}</p>
                <p className="text-sm font-medium text-slate-600 mt-2 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="section-pad border-b border-slate-100">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label">Academic Departments</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Schools & Departments</h2>
            </div>
            <Link href="/academics" className="text-sm text-[#1e3a8a] font-medium hover:underline hidden sm:flex items-center gap-1">
              All Departments <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
            {DEPARTMENTS.map((dept) => (
              <Link key={dept.short} href={dept.href}>
                <div className="bg-white p-6 hover:bg-slate-50 transition-colors group h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm font-bold text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-md">
                        {dept.short}
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1e3a8a] transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-[#1e3a8a] transition-colors">
                      {dept.name}
                    </h3>
                  </div>
                  <div className="flex gap-5 text-sm font-medium text-slate-500 mt-2">
                    <span>{dept.students} students</span>
                    <span>{dept.faculty} faculty</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 sm:hidden">
            <Link href="/academics" className="text-sm text-[#1e3a8a] font-medium hover:underline flex items-center gap-1">
              View all departments <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS + EVENTS ── */}
      <section className="section-pad border-b border-slate-100 bg-[#fefdfa]">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* News */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 tracking-tight">Latest Updates</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column (2 smaller stacked cards) */}
                <div className="flex flex-col gap-8">
                  {NEWS.slice(0, 2).map((item, idx) => (
                    <div key={item.title} className="group cursor-pointer">
                      <div className="aspect-[4/3] w-full bg-slate-200 rounded-3xl mb-5 overflow-hidden">
                        <img src={`https://picsum.photos/seed/thorfinnnews${idx}/600/400`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">LATEST NEWS</span>
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">{item.category}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-[#1e3a8a] transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{item.date}</p>
                    </div>
                  ))}
                </div>

                {/* Right Column (1 large card) */}
                <div className="flex flex-col">
                  {NEWS.slice(2, 3).map((item) => (
                    <div key={item.title} className="group cursor-pointer h-full">
                      <div className="aspect-[4/3] md:aspect-[3/4] w-full bg-slate-200 rounded-[2rem] md:rounded-[3rem] mb-6 overflow-hidden">
                        <img src={`https://picsum.photos/seed/thorfinnmainnews/800/1000`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">LATEST NEWS</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-3 underline decoration-slate-300 decoration-2 underline-offset-4 group-hover:text-[#1e3a8a] transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 tracking-tight">Upcoming Events</h2>
              </div>
              <div className="divide-y divide-slate-300 border-y border-slate-300">
                {EVENTS.map((ev, idx) => (
                  <div key={ev.title} className="py-6 group cursor-pointer flex gap-5">
                    <div className="flex-shrink-0 w-20 h-20 bg-slate-200 rounded-2xl overflow-hidden relative">
                      <img src={`https://picsum.photos/seed/thorfinnevent${idx}/200/200`} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-slate-600 mb-0.5">Saturday. {ev.date}, 2026</p>
                      <p className="text-sm text-slate-400 mb-1.5 font-light">12:00 pm–2:00 pm</p>
                      <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1e3a8a] transition-colors">{ev.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="section-pad bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label">Innovation & Discovery</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Research Highlights</h2>
            </div>
            <Link href="/research" className="text-sm text-[#1e3a8a] font-medium hover:underline hidden sm:flex items-center gap-1">
              All Research <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESEARCH.map((r) => (
              <div key={r.area} className="card p-5 hover:shadow-sm transition-shadow">
                <p className="text-sm font-semibold text-slate-800 leading-snug mb-3">{r.area}</p>
                <p className="text-xs text-slate-500 mb-1">Principal Investigator</p>
                <p className="text-xs font-medium text-slate-700">{r.pi}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">{r.papers}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Publications</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALUMNI HIGHLIGHT ── */}
      <section className="section-pad border-b border-slate-100">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">Our Community</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                A Global Alumni Network
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Over 50,000 Thorfinn alumni are making an impact across industries and continents — from Silicon Valley to Singapore, from research labs to boardrooms.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { v: "50,000+", l: "Alumni" },
                  { v: "80+", l: "Countries" },
                  { v: "200+", l: "CEOs & Founders" },
                ].map((s) => (
                  <div key={s.l} className="text-center p-5 bg-slate-50 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">{s.v}</p>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>
              <Link href="/alumni" className="btn-outline">
                Explore Alumni Network <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Arjun Kapoor", batch: "B.Tech CSE, 2010", role: "CTO, TechCorp Inc." },
                { name: "Priya Nair", batch: "MBA, 2012", role: "Vice President, Goldman Sachs" },
                { name: "Rahul Sharma", batch: "B.Tech ECE, 2008", role: "Founder & CEO, StartupX" },
                { name: "Ananya Patel", batch: "B.Tech CSBS, 2015", role: "ML Engineer, Google" },
              ].map((a) => (
                <div key={a.name} className="card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.role}</p>
                    <p className="text-xs text-slate-400">{a.batch}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#1e3a8a]">
        <div className="container-max py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-1">
              Applications for 2025 are now open
            </h2>
            <p className="text-blue-200 text-sm">
              Deadline: March 31, 2025. Limited seats available across all programs.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/admissions" className="btn-primary bg-white text-[#1e3a8a] hover:bg-blue-50">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#1e3a8a]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <AIChatbot />
    </div>
  );
}
