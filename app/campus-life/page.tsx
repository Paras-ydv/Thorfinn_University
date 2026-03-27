import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Music, Trophy, Utensils, Dumbbell, BookOpen, Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Campus Life" };

const CLUBS = [
  { name: "Coding Club", members: 450, category: "Technical" },
  { name: "Robotics Society", members: 280, category: "Technical" },
  { name: "Music Band", members: 120, category: "Cultural" },
  { name: "Drama Club", members: 95, category: "Cultural" },
  { name: "Photography Club", members: 200, category: "Creative" },
  { name: "Entrepreneurship", members: 350, category: "Professional" },
  { name: "NSS", members: 500, category: "Social" },
  { name: "Sports Council", members: 800, category: "Sports" },
];

const FACILITIES = [
  { icon: Dumbbell, title: "Sports Complex", desc: "Olympic-size pool, gym, courts for cricket, football, basketball, tennis." },
  { icon: BookOpen, title: "Central Library", desc: "1M+ books, 24/7 digital access, quiet study zones and collaboration spaces." },
  { icon: Utensils, title: "Food Court", desc: "8 cafeterias serving diverse cuisines. Special dietary options available." },
  { icon: Music, title: "Auditorium", desc: "3000-seat auditorium for cultural events, conferences, and performances." },
  { icon: Trophy, title: "Innovation Hub", desc: "Maker space, 3D printers, prototyping labs for student projects." },
  { icon: Heart, title: "Health Center", desc: "24/7 medical facility with doctors, counselors, and emergency care." },
];

const EVENTS = [
  { name: "Thorfinn Fest", type: "Cultural", date: "February", desc: "3-day cultural extravaganza with 10,000+ attendees." },
  { name: "TechSummit", type: "Technical", date: "October", desc: "National-level hackathon and tech conference." },
  { name: "Sports Week", type: "Sports", date: "December", desc: "Inter-college sports tournament across 15 disciplines." },
];

export default function CampusLifePage() {
  return (
    <div className="bg-white pt-16">
      <div className="bg-[#0f172a]">
        <div className="container-max py-20 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Campus Life</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Campus Life</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            200 acres of vibrant campus life — where excellence in learning meets holistic student living.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">World-Class Facilities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {FACILITIES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.title} className="card p-8 hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 rounded bg-blue-50 flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-[#1e3a8a]" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-xl mb-3">{f.title}</h3>
                      <p className="text-base text-slate-600 leading-relaxed">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Annual Events</h2>
              <div className="card overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {EVENTS.map((event) => (
                    <div key={event.name} className="p-6 sm:p-8 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                      <div className="max-w-md">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded mb-3">
                          {event.type}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.name}</h3>
                        <p className="text-base text-slate-600">{event.desc}</p>
                      </div>
                      <div className="flex-shrink-0 text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Month</p>
                         <p className="text-xl font-bold text-[#1e3a8a]">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
          </div>

          {/* Right Sidebar */}
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
    </div>
  );
}
