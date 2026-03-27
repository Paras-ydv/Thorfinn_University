"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { STATS } from "@/lib/data";
import { Award, Globe, Lightbulb, Heart } from "lucide-react";

const VALUES = [
  { icon: Award, title: "Excellence", desc: "We pursue the highest standards in education, research, and service." },
  { icon: Globe, title: "Global Perspective", desc: "Preparing students to thrive in an interconnected world." },
  { icon: Lightbulb, title: "Innovation", desc: "Fostering creativity and entrepreneurial thinking at every level." },
  { icon: Heart, title: "Inclusivity", desc: "A diverse, welcoming community where everyone belongs." },
];

const LEADERSHIP = [
  { name: "Prof. Arjun Mehta", role: "Vice Chancellor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300" },
  { name: "Dr. Kavitha Rao", role: "Pro Vice Chancellor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300" },
  { name: "Prof. Suresh Nair", role: "Dean of Academics", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
  { name: "Dr. Ananya Singh", role: "Dean of Research", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300" },
];

export function AboutPage() {
  return (
    <div className="bg-slate-50 pt-16">
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-violet-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
              Est. 1965
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
              About <span className="gradient-text">Thorfinn</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              For nearly six decades, Thorfinn University has been at the forefront of education, research, and innovation — shaping leaders who transform the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding container-max">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Our Mission", content: "To provide transformative education that empowers students with knowledge, skills, and values to lead meaningful lives and contribute to society's progress.", gradient: "from-blue-500/10 to-cyan-500/10" },
            { title: "Our Vision", content: "To be a globally recognized institution of excellence, driving innovation and research that addresses humanity's greatest challenges.", gradient: "from-violet-500/10 to-pink-500/10" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`glass rounded-3xl p-8 bg-gradient-to-br ${item.gradient}`}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h2>
              <p className="text-slate-700 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding container-max">
        <SectionHeader badge="By the Numbers" title="Thorfinn at a Glance" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => <StatCard key={stat.label} {...stat} delay={i * 0.08} />)}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding container-max">
        <SectionHeader badge="Core Values" title="What We Stand For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding container-max">
        <SectionHeader badge="Leadership" title="University Leadership" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                <Image src={person.img} alt={person.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-slate-900">{person.name}</h3>
              <p className="text-sm text-blue-400 mt-1">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
