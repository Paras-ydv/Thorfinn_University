"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen, Users, Award, Calendar } from "lucide-react";

const SERVICES = [
  { icon: BookOpen, title: "Student Portal", desc: "Access grades, attendance, timetable, and academic records." },
  { icon: Users, title: "Clubs & Societies", desc: "Join 50+ clubs and participate in events and competitions." },
  { icon: Award, title: "Scholarships", desc: "Merit and need-based scholarships for deserving students." },
  { icon: Calendar, title: "Event Calendar", desc: "Stay updated with all university events and deadlines." },
];

export default function StudentsPage() {
  return (
    <div className="bg-dark-900 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Students</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need for a successful university experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding container-max">
        <SectionHeader badge="Student Services" title="Resources & Support" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <SectionHeader badge="Quick Access" title="Student Quick Links" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Academic Calendar", "Exam Schedule", "Fee Payment", "Library",
            "Hostel Allotment", "Placement Cell", "Grievance Portal", "Health Center",
          ].map((link, i) => (
            <motion.button key={link} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all text-center">
              {link}
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
