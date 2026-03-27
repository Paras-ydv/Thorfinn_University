"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown, Star, TrendingUp, Users, BookOpen, X } from "lucide-react";
import { STATS, DEPARTMENTS } from "@/lib/data";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AIChatbot } from "@/components/ui/AIChatbot";

const PATHS = [
  { id: "academics", label: "Academics First", icon: BookOpen, color: "from-blue-500 to-cyan-500", desc: "Explore world-class programs and research opportunities" },
  { id: "career", label: "Career First", icon: TrendingUp, color: "from-violet-500 to-purple-500", desc: "94% placement rate with top global companies" },
  { id: "campus", label: "Campus Life First", icon: Users, color: "from-orange-500 to-pink-500", desc: "Vibrant community, clubs, sports, and events" },
];

const PATH_CONTENT = {
  academics: {
    highlights: ["200+ Programs", "50+ Research Labs", "PhD Programs", "International Exchange"],
    cta: { label: "Explore Academics", href: "/academics" },
  },
  career: {
    highlights: ["₹45 LPA Highest Package", "500+ Hiring Companies", "Career Mentorship", "Internship Network"],
    cta: { label: "View Placements", href: "/placements" },
  },
  campus: {
    highlights: ["200-Acre Campus", "50+ Student Clubs", "World-class Sports", "24/7 Hostel"],
    cta: { label: "Explore Campus", href: "/campus-life" },
  },
};

export default function HomePage() {
  const [activePath, setActivePath] = useState<"academics" | "career" | "campus">("academics");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-slate-50">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video — aerial drone shot */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/s_Aerial_drone_shot_sweepi.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-slate-50/30 to-slate-50" />
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
        </motion.div>

        {/* Animated orbs — always visible, layer behind video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-blue-300 mb-6">
              <Star className="w-4 h-4 fill-current" /> Ranked #1 in Innovation 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Shape Your{" "}
            <span className="gradient-text">Future</span>
            <br />at Thorfinn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Where world-class education meets cutting-edge research and a vibrant campus community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/admissions" className="btn-primary flex items-center gap-2 justify-center text-base">
              Apply for 2025 <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-600"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>



      {/* ── STATS ── */}
      <section className="section-padding container-max">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── PERSONALIZED PATH SELECTOR ── */}
      <section className="section-padding container-max">
        <SectionHeader
          badge="Your Journey"
          title="Choose Your Path"
          subtitle="Thorfinn adapts to what matters most to you. Select your priority and explore a tailored experience."
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {PATHS.map((path) => {
            const Icon = path.icon;
            const active = activePath === path.id;
            return (
              <motion.button
                key={path.id}
                onClick={() => setActivePath(path.id as typeof activePath)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 text-left ${
                  active
                    ? "border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                    : "border-slate-200 glass hover:border-slate-300"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{path.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-[180px]">{path.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activePath}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {PATH_CONTENT[activePath].highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-4 text-center"
              >
                <p className="text-sm font-medium text-slate-900">{h}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href={PATH_CONTENT[activePath].cta.href} className="btn-primary inline-flex items-center gap-2">
              {PATH_CONTENT[activePath].cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── DEPARTMENTS PREVIEW ── */}
      <section className="section-padding container-max">
        <SectionHeader
          badge="Academics"
          title="World-Class Departments"
          subtitle="Six departments, hundreds of programs, and thousands of opportunities."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={`/departments/${dept.slug}`}>
                <div className="glass rounded-2xl p-6 card-hover group cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-2xl mb-4`}>
                    {dept.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-400 transition-colors">{dept.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{dept.description}</p>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>{dept.students} students</span>
                    <span>{dept.faculty} faculty</span>
                    <span>{dept.labs.length} labs</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/departments" className="btn-ghost inline-flex items-center gap-2">
            View All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SCROLL STORYTELLING / TIMELINE ── */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-max">
          <SectionHeader badge="Our Story" title="A Legacy of Excellence" />
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-pink-500 hidden md:block" />
            {[
              { year: "1965", title: "Founded", desc: "Thorfinn University established with a vision to democratize world-class education.", side: "left" },
              { year: "1985", title: "Research Excellence", desc: "Launched 20+ research centers, attracting global talent and funding.", side: "right" },
              { year: "2005", title: "Global Recognition", desc: "Ranked among Asia's top 50 universities. International collaborations with MIT, Stanford.", side: "left" },
              { year: "2015", title: "Innovation Hub", desc: "Opened the Innovation & Entrepreneurship Center. 100+ startups incubated.", side: "right" },
              { year: "2024", title: "AI & Future Tech", desc: "Launched AI Research Institute. 94% placement rate. ₹45 LPA highest package.", side: "left" },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: item.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-center mb-12 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`w-full md:w-5/12 ${item.side === "right" ? "md:pl-8" : "md:pr-8"}`}>
                  <div className="glass rounded-2xl p-6">
                    <span className="text-blue-400 font-bold text-lg">{item.year}</span>
                    <h3 className="text-slate-900 font-bold text-xl mt-1 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-2 border-dark-900 z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-violet-600/10" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Ready to Begin?</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
              Applications for 2025 are now open. Join 12,000+ students shaping the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admissions" className="btn-primary text-base flex items-center gap-2 justify-center">
                Apply Now — 2025 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-ghost text-base">
                Talk to Admissions
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <AIChatbot />
    </div>
  );
}
