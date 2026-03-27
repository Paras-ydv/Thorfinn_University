"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, GraduationCap, Briefcase, Globe, Award } from "lucide-react";

const ALUMNI_NOTABLE = [
  { name: "Arjun Kapoor", batch: "2010, CSE", role: "CTO, TechCorp", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { name: "Priya Nair", batch: "2012, MBA", role: "VP, Goldman Sachs", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" },
  { name: "Rahul Sharma", batch: "2008, ECE", role: "Founder, StartupX", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200" },
  { name: "Ananya Patel", batch: "2015, CSBS", role: "ML Engineer, Google", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200" },
  { name: "Vikram Rao", batch: "2011, ME", role: "Director, Tata Motors", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
  { name: "Sneha Iyer", batch: "2014, CSE", role: "Research Scientist, Meta", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
];

const NETWORK_NODES = [
  { label: "USA", count: 8500, x: 20, y: 40 },
  { label: "UK", count: 3200, x: 45, y: 20 },
  { label: "India", count: 28000, x: 65, y: 50 },
  { label: "Singapore", count: 2100, x: 80, y: 60 },
  { label: "Germany", count: 1800, x: 50, y: 30 },
  { label: "Canada", count: 2400, x: 15, y: 25 },
];

export default function AlumniPage() {
  return (
    <div className="bg-white pt-16">
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center">
          <source src="https://res.cloudinary.com/dblwlysku/video/upload/v1774612490/alumni_network_o0svjy.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Alumni</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Alumni Network</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            50,000+ alumni across 80+ countries, leading industries and shaping the world.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Stats */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Alumni by the Numbers</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: GraduationCap, value: "50,000+", label: "Alumni Worldwide" },
                  { icon: Globe, value: "80+", label: "Countries" },
                  { icon: Briefcase, value: "200+", label: "CEOs & Founders" },
                  { icon: Award, value: "15+", label: "Nobel Laureates" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="card p-8 flex items-center gap-5">
                    <div className="w-14 h-14 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#1e3a8a]" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900">{value}</p>
                      <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Global Network */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Global Presence</h2>
              <div className="card overflow-hidden" style={{ height: 280 }}>
                <div className="relative w-full h-full bg-slate-50">
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
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                        className="w-4 h-4 rounded-full bg-[#1e3a8a] shadow-lg mb-1"
                      />
                      <span className="text-xs text-slate-800 font-bold bg-white border border-slate-200 px-2 py-0.5 rounded">{node.label}</span>
                      <span className="text-xs text-slate-500 mt-0.5">{node.count.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Notable Alumni */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Notable Alumni</h2>
              <div className="card overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {ALUMNI_NOTABLE.map((alumni, i) => (
                    <motion.div
                      key={alumni.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="p-6 hover:bg-slate-50 transition-colors flex items-center gap-5"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-200">
                        <Image src={alumni.img} alt={alumni.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{alumni.name}</h3>
                        <p className="text-sm font-medium text-[#1e3a8a]">{alumni.role}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{alumni.batch}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Alumni by Region</h3>
                <p className="text-sm text-slate-500 mt-1">Top locations worldwide</p>
              </div>
              <div className="divide-y divide-slate-100">
                {NETWORK_NODES.sort((a, b) => b.count - a.count).map((node) => (
                  <div key={node.label} className="flex justify-between items-center p-5">
                    <span className="font-medium text-slate-700">{node.label}</span>
                    <span className="text-sm font-bold text-[#1e3a8a]">{node.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-slate-900 text-white">
              <h3 className="text-lg font-bold mb-3">Stay Connected</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Join the alumni portal to network, mentor students, and stay updated with Thorfinn events.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-slate-300 transition-colors">
                Get in Touch →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
