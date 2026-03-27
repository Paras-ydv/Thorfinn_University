"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Users, FileText } from "lucide-react";

const PROGRAMS = [
  {
    name: "B.Tech Computer Science & Engineering",
    level: "Undergraduate",
    description: "Foundations in algorithms, systems programming, AI/ML, and software engineering with industry-aligned curriculum.",
    duration: "4 Years", intake: "180 seats", entrance: "JEE Main",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    href: "/departments/computer-science",
  },
  {
    name: "B.Tech Electronics & Communication",
    level: "Undergraduate",
    description: "In-depth study of VLSI design, signal processing, embedded systems, and wireless communication technologies.",
    duration: "4 Years", intake: "120 seats", entrance: "JEE Main",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    href: "/departments/electronics",
  },
  {
    name: "B.Tech Mechanical Engineering",
    level: "Undergraduate",
    description: "Comprehensive training in design, thermodynamics, manufacturing processes, and robotics engineering.",
    duration: "4 Years", intake: "120 seats", entrance: "JEE Main",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&q=80",
    href: "/departments/mechanical",
  },
  {
    name: "B.Tech Civil Engineering",
    level: "Undergraduate",
    description: "Structural analysis, geotechnics, environmental engineering, and sustainable infrastructure design.",
    duration: "4 Years", intake: "120 seats", entrance: "JEE Main",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    href: "/departments/civil",
  },
  {
    name: "B.Tech CS & Business Systems",
    level: "Undergraduate",
    description: "Bridging computer science and business strategy for the digital economy and enterprise systems.",
    duration: "4 Years", intake: "60 seats", entrance: "JEE Main",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    href: "/departments/csbs",
  },
  {
    name: "BBA",
    level: "Undergraduate",
    description: "Core business fundamentals covering finance, marketing, operations, and organizational management.",
    duration: "3 Years", intake: "60 seats", entrance: "University Entrance Test",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    href: "/departments/mba",
  },
  {
    name: "M.Tech Artificial Intelligence & ML",
    level: "Postgraduate",
    description: "Advanced study in deep learning, NLP, computer vision, and large-scale AI systems research.",
    duration: "2 Years", intake: "60 seats", entrance: "GATE",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    href: "/departments/computer-science",
  },
  {
    name: "M.Tech VLSI Design",
    level: "Postgraduate",
    description: "Specialised training in chip architecture, RTL design, verification, and semiconductor fabrication.",
    duration: "2 Years", intake: "30 seats", entrance: "GATE",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&q=80",
    href: "/departments/electronics",
  },
  {
    name: "M.Tech Manufacturing Systems",
    level: "Postgraduate",
    description: "Advanced manufacturing, lean systems, automation, and industrial engineering methodologies.",
    duration: "2 Years", intake: "30 seats", entrance: "GATE",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
    href: "/departments/mechanical",
  },
  {
    name: "MBA (Full-time)",
    level: "Postgraduate",
    description: "General management, strategy, finance, and leadership for aspiring business professionals.",
    duration: "2 Years", intake: "120 seats", entrance: "CAT / MAT",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
    href: "/departments/mba",
  },
  {
    name: "Ph.D Computer Science",
    level: "Doctoral",
    description: "Original research in distributed systems, AI, cybersecurity, and human-computer interaction.",
    duration: "3–5 Years", intake: "20 seats", entrance: "University Entrance Test",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80",
    href: "/departments/computer-science",
  },
  {
    name: "Ph.D Mechanical Engineering",
    level: "Doctoral",
    description: "Advanced research in thermal sciences, materials engineering, and next-generation manufacturing.",
    duration: "3–5 Years", intake: "15 seats", entrance: "University Entrance Test",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    href: "/departments/mechanical",
  },
];

const CALENDAR = [
  { event: "Semester I Commencement", date: "July 15, 2024" },
  { event: "Mid-Semester Examinations", date: "Sep 10–20, 2024" },
  { event: "Semester I End Examinations", date: "Nov 25 – Dec 5, 2024" },
  { event: "Winter Break", date: "Dec 6 – Jan 5, 2026" },
  { event: "Semester II Commencement", date: "January 6, 2026" },
  { event: "Mid-Semester Examinations", date: "Mar 5–15, 2026" },
  { event: "End Semester Examinations", date: "May 1–20, 2026" },
  { event: "Summer Break", date: "May 21 – Jul 14, 2026" },
];

export default function AcademicsPage() {
  return (
    <div className="bg-white pt-16">

      {/* ── Page header ── */}
      <div className="relative bg-[#0f172a] overflow-hidden min-h-[60vh] flex items-center">
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none">
          <source src="/videos/Quick_cuts_of_campus_life—stud.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-transparent z-0" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Academics</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Academic Programs</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            Rigorous, research-driven programs designed to prepare graduates for leadership in their fields.
          </p>
        </div>
      </div>

      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Program sections ── */}
          <div className="lg:col-span-2 space-y-12">
            {([
              { label: "Undergraduate Programs", key: "Undergraduate", badge: "bg-blue-600" },
              { label: "Postgraduate Programs", key: "Postgraduate", badge: "bg-green-600" },
              { label: "Doctoral Programs", key: "Doctoral", badge: "bg-gray-700" },
            ] as const).map((section) => (
              <div key={section.key}>
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
                  <span className={`inline-block w-1 h-6 ${section.badge}`} />
                  <h2 className="font-serif text-xl font-bold text-slate-900">{section.label}</h2>
                </div>

                {/* Cards for this level */}
                <div className="space-y-4">
                  {PROGRAMS.filter((p) => p.level === section.key).map((prog, i) => (
                    <motion.div
                      key={prog.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.3, delay: i * 0.04, ease: "easeOut" }}
                      className="group border border-slate-200 overflow-hidden bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-stretch"
                    >
                      {/* Left: header strip + content */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="bg-[#1e293b] border-b border-white/10 px-6 py-4 group-hover:border-l-4 group-hover:border-l-blue-500 transition-all duration-200">
                          <h3 className="font-serif text-lg font-semibold text-white leading-snug">
                            {prog.name}
                          </h3>
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                          <p className="text-sm text-slate-500 leading-relaxed">{prog.description}</p>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-sm">
                              <Clock className="w-3 h-3" />{prog.duration}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-sm">
                              <Users className="w-3 h-3" />{prog.intake}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-sm">
                              <FileText className="w-3 h-3" />{prog.entrance}
                            </span>
                            <Link
                              href={prog.href}
                              className="ml-auto text-xs font-semibold text-[#1e3a8a] hover:underline inline-flex items-center gap-0.5"
                            >
                              View Details <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Right: image only */}
                      <div className="relative w-full sm:w-48 h-44 sm:h-auto flex-shrink-0">
                        <Image
                          src={prog.image}
                          alt={prog.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 192px"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Academic Calendar 2024–25</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {CALENDAR.map((c) => (
                  <div key={c.event} className="px-6 py-5">
                    <p className="text-lg font-semibold text-slate-800 leading-snug">{c.event}</p>
                    <p className="text-base font-medium text-slate-500 mt-1">{c.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-base font-bold uppercase tracking-widest text-[#1e3a8a] mb-6">Grading System</h3>
              <table className="data-table text-base w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2 font-medium">Grade</th>
                    <th className="py-2 font-medium">Points</th>
                    <th className="py-2 font-medium">Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[["O", "10", "90–100"], ["A+", "9", "80–89"], ["A", "8", "70–79"], ["B+", "7", "60–69"], ["B", "6", "50–59"], ["C", "5", "40–49"], ["F", "0", "<40"]].map(([g, p, r]) => (
                    <tr key={g}><td className="py-3 font-semibold text-slate-800">{g}</td><td className="py-3 text-slate-600">{p}</td><td className="py-3 text-slate-600">{r}</td></tr>
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
