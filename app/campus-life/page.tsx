"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight, Music, Trophy, Utensils, Dumbbell, BookOpen, Heart,
  ArrowRight, Radio, X, Calendar, Users, MapPin,
} from "lucide-react";
import { HappeningNow } from "@/app/dashboard/components/HappeningNow";
import { CampusMapImage } from "./components/CampusMapImage";

const CLUBS = [
  { name: "Coding Club",       members: 450, category: "Technical" },
  { name: "Robotics Society",  members: 280, category: "Technical" },
  { name: "Music Band",        members: 120, category: "Cultural" },
  { name: "Drama Club",        members: 95,  category: "Cultural" },
  { name: "Photography Club",  members: 200, category: "Creative" },
  { name: "Entrepreneurship",  members: 350, category: "Professional" },
  { name: "NSS",               members: 500, category: "Social" },
  { name: "Sports Council",    members: 800, category: "Sports" },
];

const FACILITIES = [
  { icon: Dumbbell,  title: "Sports Complex",  desc: "Olympic-size pool, gym, courts for cricket, football, basketball, tennis.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617937/in1oni78hseqgtyq415z.jpg" },
  { icon: BookOpen,  title: "Central Library", desc: "1M+ books, 24/7 digital access, quiet study zones and collaboration spaces.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617955/xdvniutajfb3deoub9lm.jpg" },
  { icon: Utensils,  title: "Food Court",      desc: "8 cafeterias serving diverse cuisines. Special dietary options available.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774617955/xdvniutajfb3deoub9lm.jpg" },
  { icon: Music,     title: "Auditorium",      desc: "3000-seat auditorium for cultural events, conferences, and performances.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774618067/kpa1oubdmnctxxut0u0n.jpg" },
  { icon: Trophy,    title: "Innovation Hub",  desc: "Maker space, 3D printers, prototyping labs for student projects.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774618250/tj0eqfvff0m2teg3bskm.jpg" },
  { icon: Heart,     title: "Health Center",   desc: "24/7 medical facility with doctors, counselors, and emergency care.", img: "https://res.cloudinary.com/dblwlysku/image/upload/v1774618192/q9kd5kbfxfb2nwxddblw.jpg" },
];

type AnnualEvent = {
  name: string;
  type: string;
  date: string;
  desc: string;
  img: string;
  attendees: string;
  venue: string;
  highlights: string[];
  edition: string;
};

const ANNUAL_EVENTS: AnnualEvent[] = [
  {
    name: "Thorfinn Fest",
    type: "Cultural",
    date: "February",
    desc: "3-day cultural extravaganza with 10,000+ attendees.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    attendees: "10,000+",
    venue: "Open Amphitheatre & Campus Grounds",
    edition: "32nd Edition",
    highlights: [
      "Live performances by national recording artists",
      "Inter-college dance, drama and music competitions",
      "Art installations and photography exhibitions",
      "Street food festival with 40+ stalls",
      "Fashion show and stand-up comedy nights",
    ],
  },
  {
    name: "TechSummit",
    type: "Technical",
    date: "October",
    desc: "National-level hackathon and tech conference.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    attendees: "5,000+",
    venue: "Innovation Hub & Main Auditorium",
    edition: "14th Edition",
    highlights: [
      "48-hour hackathon with ₹5 Lakh prize pool",
      "Keynotes from Google, Microsoft and Sequoia leaders",
      "Workshops on AI, Web3 and Cloud Architecture",
      "Startup pitch competition with investor panel",
      "Paper presentations and project expo",
    ],
  },
  {
    name: "Sports Week",
    type: "Sports",
    date: "December",
    desc: "Inter-college sports tournament across 15 disciplines.",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    attendees: "8,000+",
    venue: "Sports Complex & Athletic Grounds",
    edition: "28th Edition",
    highlights: [
      "15 disciplines including cricket, football and athletics",
      "Teams from 60+ colleges across the country",
      "Opening ceremony with torch relay",
      "Prize distribution by national sports personalities",
      "Marathon open to all students and faculty",
    ],
  },
];

export default function CampusLifePage() {
  const [selectedEvent, setSelectedEvent] = useState<AnnualEvent | null>(null);
  return (
    <div className="bg-white pt-16">
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center">
          <source src="https://res.cloudinary.com/dblwlysku/video/upload/v1774612098/campus_life_b62plq.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Campus Life</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Campus Life
          </h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            200 acres of vibrant campus life — where excellence in learning meets holistic student living.
          </p>
        </div>
      </div>

      <div className="container-max py-16 space-y-16">

        {/* ── MAP SECTION ── */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <Radio className="w-5 h-5 text-[#1e3a8a]" />
            <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">Happening Now</h2>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest ml-1">Live</span>
          </div>
          <p className="text-slate-500 text-sm mb-5 max-w-2xl">
            Explore the campus map. Click any marker to see live events happening right now.
          </p>

          <CampusMapImage />

          {/* Live text feed */}
          <div className="mt-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Live Feed</p>
            <HappeningNow />
          </div>
        </section>

        {/* ── Facilities + Events + Sidebar ── */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">World-Class Facilities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {FACILITIES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="card overflow-hidden hover:shadow-md transition-shadow">
                      {f.img && (
                        <img src={f.img} alt={f.title} className="w-full h-36 object-cover" />
                      )}
                      <div className="p-8">
                        <div className="w-14 h-14 rounded bg-blue-50 flex items-center justify-center mb-6">
                          <Icon className="w-7 h-7 text-[#1e3a8a]" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-xl mb-3">{f.title}</h3>
                        <p className="text-base text-slate-600 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Annual Events</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {ANNUAL_EVENTS.map((event) => (
                  <button
                    key={event.name}
                    onClick={() => setSelectedEvent(event)}
                    className="group relative rounded-xl overflow-hidden h-64 text-left shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={event.img}
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                      <span className="self-start text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/15 backdrop-blur-sm text-white border border-white/20">
                        {event.type}
                      </span>
                      <div>
                        <p className="text-xs text-slate-300 font-medium mb-1">{event.date} &middot; {event.edition}</p>
                        <h3 className="text-xl font-bold text-white mb-1">{event.name}</h3>
                        <p className="text-sm text-slate-300 leading-snug line-clamp-2">{event.desc}</p>
                        <p className="mt-3 text-xs font-semibold text-white/70 group-hover:text-white transition-colors">View details &rarr;</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Clubs & Societies</h3>
                <p className="text-sm text-slate-500 mt-1">50+ active student groups</p>
              </div>
              <ul className="divide-y divide-slate-100">
                {CLUBS.map((club) => (
                  <li key={club.name} className="flex justify-between items-center p-6 hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{club.name}</h4>
                      <p className="text-sm font-medium text-slate-500">{club.members} Members</p>
                    </div>
                    <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded">
                      {club.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6 bg-slate-900 text-white">
              <h3 className="text-lg font-bold mb-3">Hostel Accommodation</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Experience a comfortable home away from home with our modern hostel facilities and top-tier security.
              </p>
              <Link href="/hostel" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-slate-300 transition-colors">
                Explore Hostels <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Annual event modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            >
              {/* Image hero */}
              <div className="relative h-52">
                <img
                  src={selectedEvent.img}
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/30 to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white/15 backdrop-blur-sm text-white border border-white/20">
                    {selectedEvent.type}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-white mt-2">{selectedEvent.name}</h2>
                  <p className="text-sm text-slate-300">{selectedEvent.edition}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Meta row */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />{selectedEvent.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />{selectedEvent.venue}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5 text-slate-400" />{selectedEvent.attendees} attendees
                  </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{selectedEvent.desc}</p>

                {/* Highlights */}
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Highlights</p>
                  <ul className="space-y-1.5">
                    {selectedEvent.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] flex-shrink-0 mt-1.5" />
                        {h}
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
