"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GraduationCap, Briefcase, Globe, Award } from "lucide-react";

const ALUMNI_NOTABLE = [
  { name: "Arjun Kapoor", batch: "2010, CSE", role: "CTO, TechCorp", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", company: "TechCorp" },
  { name: "Priya Nair", batch: "2012, MBA", role: "VP, Goldman Sachs", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200", company: "Goldman Sachs" },
  { name: "Rahul Sharma", batch: "2008, ECE", role: "Founder, StartupX", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", company: "StartupX" },
  { name: "Ananya Patel", batch: "2015, CSBS", role: "ML Engineer, Google", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200", company: "Google" },
  { name: "Vikram Rao", batch: "2011, ME", role: "Director, Tata Motors", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", company: "Tata Motors" },
  { name: "Sneha Iyer", batch: "2014, CSE", role: "Research Scientist, Meta", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", company: "Meta" },
];

const NETWORK_NODES = [
  { label: "USA", count: 8500, x: 20, y: 40 },
  { label: "UK", count: 3200, x: 45, y: 20 },
  { label: "India", count: 28000, x: 65, y: 50 },
  { label: "Singapore", count: 2100, x: 80, y: 60 },
  { label: "Germany", count: 1800, x: 50, y: 30 },
  { label: "Canada", count: 2400, x: 15, y: 25 },
];

import Image from "next/image";

export default function AlumniPage() {
  return (
    <div className="bg-dark-900 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-pink-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Alumni</span> Network
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              50,000+ alumni across 80+ countries, leading industries and shaping the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: GraduationCap, value: "50,000+", label: "Alumni Worldwide" },
            { icon: Globe, value: "80+", label: "Countries" },
            { icon: Briefcase, value: "200+", label: "CEOs & Founders" },
            { icon: Award, value: "15+", label: "Nobel Laureates" },
          ].map(({ icon: Icon, value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center">
              <Icon className="w-8 h-8 text-violet-400 mx-auto mb-3" />
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Network Visualization */}
        <SectionHeader badge="Global Network" title="Alumni Around the World" />
        <div className="glass rounded-3xl p-8 mb-16 relative overflow-hidden" style={{ height: 300 }}>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl" />
          </div>
          {NETWORK_NODES.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="absolute flex flex-col items-center"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 mb-1"
              />
              <span className="text-xs text-white font-semibold bg-dark-800/80 px-2 py-0.5 rounded-full">{node.label}</span>
              <span className="text-xs text-blue-400">{node.count.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>

        {/* Notable Alumni */}
        <SectionHeader badge="Notable Alumni" title="Thorfinn Legends" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALUMNI_NOTABLE.map((alumni, i) => (
            <motion.div key={alumni.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 flex items-center gap-4 card-hover">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-violet-500/30">
                <Image src={alumni.img} alt={alumni.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white">{alumni.name}</h3>
                <p className="text-sm text-violet-400">{alumni.role}</p>
                <p className="text-xs text-gray-500 mt-1">{alumni.batch}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
