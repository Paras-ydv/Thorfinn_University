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
              <div className="card overflow-hidden bg-slate-50">
                <div className="relative w-full" style={{ paddingBottom: "50%" }}>
                  <svg
                    viewBox="0 0 1000 500"
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Ocean background */}
                    <rect width="1000" height="500" fill="#f0f4f8" />

                    {/* Continent shapes — simplified flat paths */}
                    {/* North America */}
                    <path d="M80,80 L180,70 L220,90 L240,130 L230,180 L200,220 L170,240 L140,230 L110,200 L90,160 L70,120 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* South America */}
                    <path d="M170,260 L220,250 L250,270 L260,320 L250,380 L220,420 L190,410 L170,370 L160,320 L155,280 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* Europe */}
                    <path d="M420,60 L480,55 L510,70 L520,100 L500,120 L470,130 L440,120 L420,100 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* Africa */}
                    <path d="M430,140 L490,135 L520,160 L530,220 L520,290 L490,340 L460,350 L430,330 L410,270 L405,200 L415,160 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* Asia */}
                    <path d="M530,50 L700,45 L780,70 L800,110 L780,150 L740,170 L680,175 L620,160 L570,140 L540,110 L525,80 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* India subcontinent */}
                    <path d="M620,160 L660,155 L680,175 L670,220 L650,250 L630,245 L615,210 L610,175 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* Southeast Asia */}
                    <path d="M740,170 L800,165 L820,185 L810,210 L780,215 L750,200 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />
                    {/* Australia */}
                    <path d="M760,300 L840,290 L880,310 L890,360 L860,390 L810,395 L770,375 L750,340 Z" fill="#dde6f0" stroke="#b8cce0" strokeWidth="1" />

                    {/* ── Alumni markers ── */}
                    {/* India */}
                    <g>
                      <circle cx="645" cy="185" r="10" fill="#1e3a8a" opacity="0.15" />
                      <circle cx="645" cy="185" r="6" fill="#1e3a8a" />
                      <circle cx="645" cy="185" r="3" fill="white" />
                      <rect x="655" y="172" width="90" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" filter="url(#shadow)" />
                      <text x="700" y="183" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">India</text>
                      <text x="700" y="193" textAnchor="middle" fontSize="7" fill="#64748b">28,000 alumni</text>
                    </g>
                    {/* USA */}
                    <g>
                      <circle cx="155" cy="155" r="9" fill="#1e3a8a" opacity="0.15" />
                      <circle cx="155" cy="155" r="5.5" fill="#1e3a8a" />
                      <circle cx="155" cy="155" r="2.5" fill="white" />
                      <rect x="165" y="143" width="76" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="203" y="154" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">USA</text>
                      <text x="203" y="164" textAnchor="middle" fontSize="7" fill="#64748b">8,500 alumni</text>
                    </g>
                    {/* UK */}
                    <g>
                      <circle cx="448" cy="88" r="7" fill="#1e3a8a" opacity="0.15" />
                      <circle cx="448" cy="88" r="4.5" fill="#1e3a8a" />
                      <circle cx="448" cy="88" r="2" fill="white" />
                      <rect x="457" y="77" width="66" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="490" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">UK</text>
                      <text x="490" y="98" textAnchor="middle" fontSize="7" fill="#64748b">3,200 alumni</text>
                    </g>
                    {/* Germany */}
                    <g>
                      <circle cx="490" cy="88" r="7" fill="#3b82f6" opacity="0.15" />
                      <circle cx="490" cy="100" r="4.5" fill="#3b82f6" />
                      <circle cx="490" cy="100" r="2" fill="white" />
                      <rect x="499" y="89" width="82" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="540" y="100" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">Germany</text>
                      <text x="540" y="110" textAnchor="middle" fontSize="7" fill="#64748b">1,800 alumni</text>
                    </g>
                    {/* Canada */}
                    <g>
                      <circle cx="120" cy="95" r="7" fill="#1e3a8a" opacity="0.15" />
                      <circle cx="120" cy="95" r="4.5" fill="#1e3a8a" />
                      <circle cx="120" cy="95" r="2" fill="white" />
                      <rect x="129" y="84" width="76" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="167" y="95" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">Canada</text>
                      <text x="167" y="105" textAnchor="middle" fontSize="7" fill="#64748b">2,400 alumni</text>
                    </g>
                    {/* Singapore */}
                    <g>
                      <circle cx="768" cy="210" r="7" fill="#1e3a8a" opacity="0.15" />
                      <circle cx="768" cy="210" r="4.5" fill="#1e3a8a" />
                      <circle cx="768" cy="210" r="2" fill="white" />
                      <rect x="660" y="218" width="88" height="26" rx="5" fill="white" stroke="#e2e8f0" strokeWidth="1" />
                      <text x="704" y="229" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1e293b">Singapore</text>
                      <text x="704" y="239" textAnchor="middle" fontSize="7" fill="#64748b">2,100 alumni</text>
                    </g>

                    <defs>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
                      </filter>
                    </defs>
                  </svg>
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
