"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Music, Trophy, Utensils, Dumbbell, BookOpen, Heart } from "lucide-react";

const CLUBS = [
  { name: "Coding Club", members: 450, icon: "💻", category: "Technical" },
  { name: "Robotics Society", members: 280, icon: "🤖", category: "Technical" },
  { name: "Music Band", members: 120, icon: "🎵", category: "Cultural" },
  { name: "Drama Club", members: 95, icon: "🎭", category: "Cultural" },
  { name: "Photography Club", members: 200, icon: "📷", category: "Creative" },
  { name: "Entrepreneurship Cell", members: 350, icon: "🚀", category: "Professional" },
  { name: "NSS", members: 500, icon: "🌱", category: "Social" },
  { name: "Sports Council", members: 800, icon: "⚽", category: "Sports" },
];

const FACILITIES = [
  { icon: Dumbbell, title: "Sports Complex", desc: "Olympic-size pool, gym, courts for cricket, football, basketball, tennis." },
  { icon: BookOpen, title: "Central Library", desc: "1M+ books, 24/7 digital access, quiet study zones and collaboration spaces." },
  { icon: Utensils, title: "Food Court", desc: "8 cafeterias serving diverse cuisines. Special dietary options available." },
  { icon: Music, title: "Auditorium", desc: "3000-seat auditorium for cultural events, conferences, and performances." },
  { icon: Trophy, title: "Innovation Hub", desc: "Maker space, 3D printers, prototyping labs for student projects." },
  { icon: Heart, title: "Health Center", desc: "24/7 medical facility with doctors, counselors, and emergency care." },
];

export default function CampusLifePage() {
  return (
    <div className="bg-dark-900 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-pink-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Campus Life</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              200 acres of vibrant campus life — where learning meets living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding container-max">
        <SectionHeader badge="Facilities" title="World-Class Facilities" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FACILITIES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Clubs */}
        <SectionHeader badge="Student Life" title="Clubs & Societies" subtitle="50+ clubs across technical, cultural, sports, and social categories." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CLUBS.map((club, i) => (
            <motion.div key={club.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass rounded-2xl p-5 text-center card-hover cursor-pointer">
              <div className="text-3xl mb-3">{club.icon}</div>
              <h3 className="font-semibold text-white text-sm mb-1">{club.name}</h3>
              <p className="text-xs text-gray-500">{club.members} members</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{club.category}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="section-padding container-max">
        <SectionHeader badge="Events" title="Annual Events" />
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: "Thorfinn Fest", type: "Cultural", date: "February", desc: "3-day cultural extravaganza with 10,000+ attendees." },
            { name: "TechSummit", type: "Technical", date: "October", desc: "National-level hackathon and tech conference." },
            { name: "Sports Week", type: "Sports", date: "December", desc: "Inter-college sports tournament across 15 disciplines." },
          ].map((event, i) => (
            <motion.div key={event.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 card-hover">
              <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">{event.type}</span>
              <h3 className="text-xl font-bold text-white mt-3 mb-1">{event.name}</h3>
              <p className="text-sm text-blue-400 mb-3">{event.date}</p>
              <p className="text-sm text-gray-400">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
