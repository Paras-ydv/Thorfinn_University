"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";

const PROGRAMS = [
  { level: "Undergraduate", programs: ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "B.Tech CE", "B.Tech CSBS", "BBA"], duration: "4 Years", seats: "120 per program" },
  { level: "Postgraduate", programs: ["M.Tech AI/ML", "M.Tech VLSI", "M.Tech Manufacturing", "MBA", "M.Sc Data Science"], duration: "2 Years", seats: "60 per program" },
  { level: "Doctoral", programs: ["Ph.D CSE", "Ph.D ECE", "Ph.D ME", "Ph.D Management", "Ph.D Civil"], duration: "3–5 Years", seats: "20 per program" },
];

export default function AcademicsPage() {
  return (
    <div className="bg-slate-50 pt-16">
      <section className="relative section-padding overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/Quick_cuts_of_campus_life—stud.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-violet-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50" />
        </div>
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              <span className="gradient-text">Academics</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Rigorous programs designed to challenge, inspire, and prepare you for the future.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding container-max">
        <SectionHeader badge="Programs" title="Academic Programs" subtitle="From undergraduate to doctoral — find your path." />
        <div className="space-y-6">
          {PROGRAMS.map((level, i) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{level.level}</h2>
                  <div className="flex gap-4 mt-2 text-sm text-slate-600">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {level.duration}</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {level.seats}</span>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {level.programs.map((prog) => (
                  <div key={prog} className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-slate-200 transition-colors cursor-pointer group">
                    <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-700 text-sm flex-1">{prog}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="section-padding container-max">
        <SectionHeader badge="Calendar" title="Academic Calendar 2024–25" />
        <div className="glass rounded-3xl p-8 max-w-3xl mx-auto">
          {[
            { event: "Semester I Begins", date: "July 15, 2024" },
            { event: "Mid-Semester Exams", date: "September 10–20, 2024" },
            { event: "Semester I Ends", date: "November 30, 2024" },
            { event: "Semester II Begins", date: "January 6, 2025" },
            { event: "Mid-Semester Exams", date: "March 5–15, 2025" },
            { event: "End Semester Exams", date: "May 1–20, 2025" },
          ].map((item, i) => (
            <motion.div
              key={item.event}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between py-4 border-b border-slate-200 last:border-0"
            >
              <span className="text-slate-700 font-medium">{item.event}</span>
              <span className="text-blue-400 text-sm font-semibold">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
