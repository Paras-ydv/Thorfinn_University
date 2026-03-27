"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, X, MapPin, CalendarDays } from "lucide-react";
import { AIChatbot } from "@/components/ui/AIChatbot";

/* ── data ── */
const STATS = [
  { value: 120000, display: "1,20,000+", label: "Students Enrolled" },
  { value: 500, display: "500+", label: "Faculty Members" },
  { value: 94, display: "94%", label: "Placement Rate" },
  { value: 2400, display: "2,400+", label: "Research Publications" },
  { value: 50000, display: "50,000+", label: "Alumni Worldwide" },
  { value: 200, display: "200", label: "Acres Campus" },
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
  { date: "Jan 15", title: "TechSummit 2025", type: "Technical", venue: "Main Auditorium", img: "https://picsum.photos/seed/thorfinnevent0/800/500", desc: "A national-level technology conference featuring keynotes, workshops, and a 24-hour hackathon. Open to all engineering students and faculty." },
  { date: "Jan 20", title: "Admissions Open Day", type: "Admissions", venue: "Admin Block", img: "https://picsum.photos/seed/thorfinnevent1/800/500", desc: "Prospective students and parents are invited to tour the campus, meet faculty, and learn about all undergraduate and postgraduate programs." },
  { date: "Feb 5", title: "Annual Sports Meet", type: "Sports", venue: "Sports Complex", img: "https://picsum.photos/seed/thorfinnevent2/800/500", desc: "Inter-department sports tournament spanning 15 disciplines including cricket, football, basketball, athletics, and swimming." },
  { date: "Feb 14", title: "Research Symposium 2025", type: "Research", venue: "Conference Hall", img: "https://picsum.photos/seed/thorfinnevent3/800/500", desc: "Annual research showcase where faculty and PhD scholars present their latest findings. Includes poster sessions and panel discussions." },
  { date: "Feb 22", title: "Google Campus Recruitment", type: "Placement", venue: "Placement Cell", img: "https://picsum.photos/seed/thorfinnevent4/800/500", desc: "Google's on-campus recruitment drive for final-year students. Roles include SWE, Data Analyst, and Product Manager. Register via the placement portal." },
  { date: "Mar 3", title: "Inter-College Hackathon", type: "Technical", venue: "Innovation Hub", img: "https://picsum.photos/seed/thorfinnevent5/800/500", desc: "48-hour hackathon open to teams from all colleges. Build solutions around sustainability, healthcare, and fintech. Prize pool of ₹5 Lakhs." },
  { date: "Mar 15", title: "Thorfinn Cultural Fest", type: "Cultural", venue: "Open Amphitheatre", img: "https://picsum.photos/seed/thorfinnevent6/800/500", desc: "Three-day cultural extravaganza featuring music, dance, drama, and art competitions. Over 10,000 attendees expected from across the country." },
  { date: "Apr 2", title: "Alumni Meet 2025", type: "General", venue: "Convention Centre", img: "https://picsum.photos/seed/thorfinnevent7/800/500", desc: "Annual gathering of Thorfinn alumni from across the globe. Includes networking sessions, panel talks by industry leaders, and a gala dinner." },
];

const RESEARCH = [
  { area: "Artificial Intelligence & Machine Learning", papers: 145, pi: "Dr. Arun Patel" },
  { area: "VLSI Design & Embedded Systems", papers: 98, pi: "Dr. Anil Verma" },
  { area: "Sustainable Manufacturing", papers: 76, pi: "Dr. Priya Sharma" },
  { area: "Business Analytics & FinTech", papers: 54, pi: "Dr. Meera Nair" },
];

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.07 } }),
};

/* ── animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v).toLocaleString()));
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-[#0f172a] pt-16 overflow-hidden min-h-[85vh] flex items-center">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none">
          <source src="/videos/s_Aerial_drone_shot_sweepi.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-transparent z-0" />

        <div className="container-max py-24 lg:py-32 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="section-label text-blue-400 mb-4"
            >
              Est. 1965 — Ranked #1 in Innovation
            </motion.p>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Advancing Knowledge.<br />Shaping Leaders.
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl"
            >
              Thorfinn University is committed to excellence in education, research, and public service — preparing graduates to lead in a rapidly changing world.
            </motion.p>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="flex flex-wrap gap-3"
            >
              <Link href="/admissions" className="btn-primary">
                Apply for 2025 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/academics" className="btn-outline border-slate-400 text-slate-200 hover:bg-white hover:text-[#1e3a8a]">
                Explore Programs
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="h-1 bg-[#1e3a8a]" />
      </section>

      {/* ── STATS ── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-slate-200">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} custom={i}
                className="px-6 py-10 lg:py-12 text-center flex flex-col justify-center"
              >
                <p className="text-3xl lg:text-4xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">
                  <Counter target={s.value} suffix={s.display.replace(/[\d,]/g, "") || ""} />
                </p>
                <p className="text-sm font-medium text-slate-600 mt-2 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="section-pad border-b border-slate-100">
        <div className="container-max">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="section-label">Academic Departments</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Schools & Departments</h2>
            </div>
            <Link href="/academics" className="text-sm text-[#1e3a8a] font-medium hover:underline hidden sm:flex items-center gap-1">
              All Departments <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
            {DEPARTMENTS.map((dept, i) => (
              <motion.div
                key={dept.short}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              >
                <Link href={dept.href}>
                  <div className="bg-white p-6 hover:bg-slate-50 transition-colors group h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-sm font-bold text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-md">{dept.short}</span>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1e3a8a] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-[#1e3a8a] transition-colors">{dept.name}</h3>
                    </div>
                    <div className="flex gap-5 text-sm font-medium text-slate-500 mt-2">
                      <span>{dept.students} students</span>
                      <span>{dept.faculty} faculty</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
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
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 tracking-tight">Latest Updates</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                  {NEWS.slice(0, 2).map((item, idx) => (
                    <motion.div
                      key={item.title}
                      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={idx}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[4/3] w-full bg-slate-200 rounded-3xl mb-5 overflow-hidden">
                        <img src={`https://picsum.photos/seed/thorfinnnews${idx}/600/400`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">LATEST NEWS</span>
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">{item.category}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-[#1e3a8a] transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{item.date}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-col">
                  {NEWS.slice(2, 3).map((item) => (
                    <motion.div
                      key={item.title}
                      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
                      className="group cursor-pointer h-full"
                    >
                      <div className="aspect-[4/3] md:aspect-[3/4] w-full bg-slate-200 rounded-[2rem] md:rounded-[3rem] mb-6 overflow-hidden">
                        <img src="https://picsum.photos/seed/thorfinnmainnews/800/1000" alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="border border-slate-300 rounded-full px-3 py-1 text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-none">LATEST NEWS</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-3 underline decoration-slate-300 decoration-2 underline-offset-4 group-hover:text-[#1e3a8a] transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{item.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Events */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-light text-slate-800 tracking-tight">Upcoming Events</h2>
              </motion.div>
              <div className="divide-y divide-slate-300 border-y border-slate-300">
                {EVENTS.map((ev, idx) => (
                  <motion.div
                    key={ev.title}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={idx}
                    onClick={() => setSelectedEvent(ev)}
                    className="py-6 group cursor-pointer flex gap-5"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-slate-200 rounded-2xl overflow-hidden relative">
                      <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-slate-600 mb-0.5">{ev.date}, 2025</p>
                      <p className="text-sm text-slate-400 mb-1.5 font-light">{ev.venue}</p>
                      <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1e3a8a] transition-colors">{ev.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section className="section-pad bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="section-label">Innovation & Discovery</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">Research Highlights</h2>
            </div>
            <Link href="/research" className="text-sm text-[#1e3a8a] font-medium hover:underline hidden sm:flex items-center gap-1">
              All Research <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESEARCH.map((r, i) => (
              <motion.div
                key={r.area}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="card p-5 hover:shadow-sm transition-shadow"
              >
                <p className="text-sm font-semibold text-slate-800 leading-snug mb-3">{r.area}</p>
                <p className="text-xs text-slate-500 mb-1">Principal Investigator</p>
                <p className="text-xs font-medium text-slate-700">{r.pi}</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">
                    <Counter target={r.papers} />
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Publications</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALUMNI ── */}
      <section className="section-pad border-b border-slate-100">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="section-label">Our Community</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">A Global Alumni Network</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Over 50,000 Thorfinn alumni are making an impact across industries and continents — from Silicon Valley to Singapore, from research labs to boardrooms.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { v: 50000, display: "50,000+", l: "Alumni" },
                  { v: 80, display: "80+", l: "Countries" },
                  { v: 200, display: "200+", l: "CEOs & Founders" },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    className="text-center p-5 bg-slate-50 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-center"
                  >
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#1e3a8a] font-serif tracking-tight">
                      <Counter target={s.v} suffix={s.display.replace(/[\d,]/g, "")} />
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1.5">{s.l}</p>
                  </motion.div>
                ))}
              </div>
              <Link href="/alumni" className="btn-outline">
                Explore Alumni Network <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="space-y-3">
              {[
                { name: "Arjun Kapoor", batch: "B.Tech CSE, 2010", role: "CTO, TechCorp Inc." },
                { name: "Priya Nair", batch: "MBA, 2012", role: "Vice President, Goldman Sachs" },
                { name: "Rahul Sharma", batch: "B.Tech ECE, 2008", role: "Founder & CEO, StartupX" },
                { name: "Ananya Patel", batch: "B.Tech CSBS, 2015", role: "ML Engineer, Google" },
              ].map((a, i) => (
                <motion.div
                  key={a.name}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="card p-4 flex items-center gap-4 cursor-default"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.role}</p>
                    <p className="text-xs text-slate-400">{a.batch}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <motion.section
        variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="bg-[#1e3a8a]"
      >
        <div className="container-max py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-1">Applications for 2025 are now open</h2>
            <p className="text-blue-200 text-sm">Deadline: March 31, 2025. Limited seats available across all programs.</p>
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
      </motion.section>

      <AIChatbot />

      {/* ── EVENT MODAL ── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              <div className="relative h-56 bg-slate-200">
                <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
                >
                  <X className="w-4 h-4 text-slate-700" />
                </button>
                <span className="absolute bottom-3 left-3 text-xs font-bold bg-white/90 text-slate-700 px-2.5 py-1 rounded">
                  {selectedEvent.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">{selectedEvent.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" />{selectedEvent.date}, 2025</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selectedEvent.venue}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{selectedEvent.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
