"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, FlaskConical, BookOpen, Users } from "lucide-react";

interface Department {
  slug: string; name: string; shortName: string; hod: string; hodEmail: string;
  hodImage: string; description: string; students: number; faculty: number;
  labs: string[]; courses: string[]; color: string; icon: string;
}

const FACULTY_SAMPLES = [
  { name: "Dr. Arun Patel", specialization: "Machine Learning", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Dr. Sneha Iyer", specialization: "Computer Vision", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" },
  { name: "Dr. Ravi Shankar", specialization: "Distributed Systems", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
  { name: "Dr. Priya Menon", specialization: "Cybersecurity", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200" },
];

export function DepartmentDetail({ dept }: { dept: Department }) {
  return (
    <div className="bg-slate-50 pt-16">
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10`} />
        <div className="container-max relative z-10">
          <Link href="/departments" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Departments
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-4xl mb-6`}>
              {dept.icon}
            </div>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{dept.shortName}</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-2 mb-4">{dept.name}</h1>
            <p className="text-xl text-slate-700 max-w-2xl leading-relaxed">{dept.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-max px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Users, value: dept.students, label: "Students" },
            { icon: BookOpen, value: dept.faculty, label: "Faculty" },
            { icon: FlaskConical, value: dept.labs.length, label: "Labs" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center">
              <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8 pb-24 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Courses */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Programs Offered</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {dept.courses.map((course) => (
                <div key={course} className="flex items-center gap-3 glass rounded-xl p-4">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dept.color}`} />
                  <span className="text-slate-700 text-sm font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Labs */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Research Labs</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {dept.labs.map((lab) => (
                <div key={lab} className="flex items-center gap-3 glass rounded-xl p-4">
                  <FlaskConical className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{lab}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Faculty</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {FACULTY_SAMPLES.map((f) => (
                <div key={f.name} className="flex items-center gap-4 glass rounded-xl p-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={f.img} alt={f.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{f.name}</p>
                    <p className="text-xs text-slate-600">{f.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOD Card */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-8 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Head of Department</h3>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                <Image src={dept.hodImage} alt={dept.hod} fill className="object-cover" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">{dept.hod}</h4>
              <p className="text-blue-400 text-sm mt-1 mb-4">Head of Department</p>
              <a
                href={`mailto:${dept.hodEmail}`}
                className="flex items-center justify-center gap-2 btn-ghost text-sm w-full"
              >
                <Mail className="w-4 h-4" /> Contact HOD
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
