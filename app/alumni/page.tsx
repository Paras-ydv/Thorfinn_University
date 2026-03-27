"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, GraduationCap, Briefcase, Globe, Award, X, MapPin, Calendar, Building2, ExternalLink } from "lucide-react";
import { GlobalMap } from "@/components/ui/GlobalMap";

type Alumni = {
  name: string;
  batch: string;
  role: string;
  img: string;
  company: string;
  location: string;
  year: string;
  dept: string;
  bio: string;
  achievements: string[];
  linkedin: string;
};

const ALUMNI_NOTABLE: Alumni[] = [
  {
    name: "Arjun Kapoor",
    batch: "2010, CSE",
    role: "CTO, TechCorp",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    company: "TechCorp Inc.",
    location: "San Francisco, USA",
    year: "2010",
    dept: "Computer Science & Engineering",
    bio: "Arjun graduated with a gold medal in CSE and went on to build distributed systems at scale. He joined TechCorp as a senior engineer and rose to CTO within eight years, leading a 400-person engineering org across three continents.",
    achievements: ["Forbes 30 Under 30 — Technology", "Led TechCorp's $2B cloud migration", "Filed 12 patents in distributed systems", "Guest lecturer, IIT Bombay & MIT"],
    linkedin: "#",
  },
  {
    name: "Priya Nair",
    batch: "2012, MBA",
    role: "VP, Goldman Sachs",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    company: "Goldman Sachs",
    location: "New York, USA",
    year: "2012",
    dept: "School of Business Administration",
    bio: "Priya topped her MBA cohort and joined Goldman Sachs's investment banking division straight out of campus. She specialises in cross-border M&A in the technology sector and has closed deals worth over $18B in transaction value.",
    achievements: ["Closed $18B+ in M&A transactions", "Named in Business Today's 40 Under 40", "Mentor, Thorfinn Women in Finance Cell", "Speaker, World Economic Forum 2023"],
    linkedin: "#",
  },
  {
    name: "Rahul Sharma",
    batch: "2008, ECE",
    role: "Founder & CEO, StartupX",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    company: "StartupX",
    location: "Bengaluru, India",
    year: "2008",
    dept: "Electronics & Communication Engineering",
    bio: "Rahul founded StartupX in 2014 after five years at Qualcomm. The company builds IoT infrastructure for smart cities and has deployed solutions across 40 Indian cities. StartupX raised a $120M Series C in 2023.",
    achievements: ["Raised $120M Series C (2023)", "Deployed IoT in 40+ Indian cities", "Economic Times Startup of the Year 2022", "Thorfinn Distinguished Alumni Award 2021"],
    linkedin: "#",
  },
  {
    name: "Ananya Patel",
    batch: "2015, CSBS",
    role: "ML Engineer, Google DeepMind",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    company: "Google DeepMind",
    location: "London, UK",
    year: "2015",
    dept: "CS & Business Systems",
    bio: "Ananya joined Google straight from campus and transferred to DeepMind in 2019. Her research focuses on reinforcement learning for protein structure prediction. She co-authored three papers published at NeurIPS and ICML.",
    achievements: ["3 papers at NeurIPS & ICML", "Co-contributor to AlphaFold research", "Google PhD Fellowship recipient", "Thorfinn Best Thesis Award 2015"],
    linkedin: "#",
  },
  {
    name: "Vikram Rao",
    batch: "2011, ME",
    role: "Director of Engineering, Tata Motors",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    company: "Tata Motors",
    location: "Pune, India",
    year: "2011",
    dept: "Mechanical Engineering",
    bio: "Vikram leads the EV powertrain division at Tata Motors, overseeing the engineering of the Nexon EV and Punch EV platforms. He holds an M.Tech from IISc and joined Tata Motors after a stint at Bosch Germany.",
    achievements: ["Led Nexon EV & Punch EV powertrain", "15 patents in EV drivetrain systems", "SAE India Young Engineer Award 2018", "Represented India at COP28 EV summit"],
    linkedin: "#",
  },
  {
    name: "Sneha Iyer",
    batch: "2014, CSE",
    role: "Research Scientist, Meta AI",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    company: "Meta AI",
    location: "Menlo Park, USA",
    year: "2014",
    dept: "Computer Science & Engineering",
    bio: "Sneha completed her PhD at Stanford before joining Meta AI Research. Her work on large language model alignment and responsible AI has been cited over 3,000 times. She leads a team of 20 researchers working on next-generation foundation models.",
    achievements: ["3,000+ research citations", "Stanford AI Lab PhD Fellowship", "Co-author, LLaMA 2 technical report", "MIT Technology Review Innovator Under 35"],
    linkedin: "#",
  },
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
  const [selected, setSelected] = useState<Alumni | null>(null);
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
              <GlobalMap />
            </section>

            {/* Notable Alumni */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Notable Alumni</h2>
              <div className="card overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {ALUMNI_NOTABLE.map((alumni, i) => (
                    <motion.button
                      key={alumni.name}
                      onClick={() => setSelected(alumni)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-center gap-5 group"
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-200 group-hover:ring-[#1e3a8a] transition-all">
                        <Image src={alumni.img} alt={alumni.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#1e3a8a] transition-colors">{alumni.name}</h3>
                        <p className="text-sm font-medium text-[#1e3a8a]">{alumni.role}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{alumni.batch}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1e3a8a] flex-shrink-0 transition-colors" />
                    </motion.button>
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

      {/* Alumni detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              {/* Header image strip */}
              <div className="relative h-36 bg-[#0f172a] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#0f172a]" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {/* Avatar overlapping the strip */}
                <div className="absolute -bottom-10 left-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <Image src={selected.img} alt={selected.name} fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="pt-14 px-6 pb-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900">{selected.name}</h2>
                    <p className="text-sm font-semibold text-[#1e3a8a] mt-0.5">{selected.role}</p>
                  </div>
                  <a
                    href={selected.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1e3a8a] border border-slate-200 hover:border-[#1e3a8a] px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />{selected.company}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />{selected.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />Class of {selected.year} · {selected.dept}
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{selected.bio}</p>

                {/* Achievements */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Achievements</p>
                  <ul className="space-y-1.5">
                    {selected.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] flex-shrink-0 mt-1.5" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
