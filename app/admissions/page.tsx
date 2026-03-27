"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle, Calendar, FileText, ArrowRight } from "lucide-react";

const STEPS = [
  { step: "01", title: "Check Eligibility", desc: "Review program requirements and entrance exam criteria.", icon: FileText },
  { step: "02", title: "Fill Application", desc: "Complete the online application form with all required documents.", icon: FileText },
  { step: "03", title: "Entrance Exam", desc: "Appear for JEE/GATE/CAT or university entrance test.", icon: Calendar },
  { step: "04", title: "Counseling", desc: "Attend counseling session and select your preferred program.", icon: CheckCircle },
  { step: "05", title: "Admission Confirmed", desc: "Pay fees and complete enrollment formalities.", icon: CheckCircle },
];

const PROGRAMS_FEE = [
  { program: "B.Tech (All branches)", fee: "₹1,20,000/year", seats: 720, exam: "JEE Main" },
  { program: "M.Tech", fee: "₹80,000/year", seats: 300, exam: "GATE" },
  { program: "MBA", fee: "₹1,50,000/year", seats: 120, exam: "CAT/MAT" },
  { program: "Ph.D", fee: "₹40,000/year", seats: 100, exam: "University Test" },
];

export default function AdmissionsPage() {
  return (
    <div className="bg-dark-900 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
              Applications Open — 2025
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Join <span className="gradient-text">Thorfinn</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Begin your journey to excellence. Applications for 2025 intake are now open.
            </p>
            <Link href="/signup" className="btn-primary text-base inline-flex items-center gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding container-max">
        <SectionHeader badge="Process" title="How to Apply" subtitle="Simple 5-step admission process." />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-violet-500 hidden sm:block" />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 relative"
              >
                <div className="w-16 h-16 rounded-full glass border border-blue-500/30 flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-blue-400 font-bold">{step.step}</span>
                </div>
                <div className="glass rounded-2xl p-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section-padding container-max">
        <SectionHeader badge="Fees" title="Fee Structure" />
        <div className="glass rounded-3xl overflow-hidden max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Program</span><span>Annual Fee</span><span>Seats</span><span>Entrance</span>
          </div>
          {PROGRAMS_FEE.map((p, i) => (
            <motion.div
              key={p.program}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-sm"
            >
              <span className="text-white font-medium">{p.program}</span>
              <span className="text-green-400 font-semibold">{p.fee}</span>
              <span className="text-gray-400">{p.seats}</span>
              <span className="text-blue-400">{p.exam}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
