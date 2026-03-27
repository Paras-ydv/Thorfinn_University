"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DEPARTMENTS } from "@/lib/data";
import { ArrowRight, Users, BookOpen, FlaskConical } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <div className="bg-slate-50 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-violet-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              Our <span className="gradient-text">Departments</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Six world-class departments offering cutting-edge programs and research opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding container-max">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/departments/${dept.slug}`}>
                <div className="glass rounded-3xl p-8 card-hover group h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-3xl mb-6`}>
                    {dept.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dept.shortName}</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1 mb-3 group-hover:text-blue-400 transition-colors">{dept.name}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{dept.description}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: Users, value: dept.students, label: "Students" },
                      { icon: BookOpen, value: dept.faculty, label: "Faculty" },
                      { icon: FlaskConical, value: dept.labs.length, label: "Labs" },
                    ].map(({ icon: Icon, value, label }) => (
                      <div key={label} className="glass rounded-xl p-3 text-center">
                        <Icon className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-slate-900 font-bold text-sm">{value}</p>
                        <p className="text-slate-500 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Department <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
