"use client";

import Link from "next/link";
import { ChevronRight, Shield, Wifi, Utensils, Dumbbell, BookOpen, Wind } from "lucide-react";

const HOSTELS = [
  { name: "Odin Block", type: "Boys", capacity: 800, rooms: "Single & Double", amenities: ["AC", "WiFi", "Gym", "Mess"], accent: "text-blue-700 bg-blue-50" },
  { name: "Freya Block", type: "Girls", capacity: 600, rooms: "Single & Double", amenities: ["AC", "WiFi", "Common Room", "Mess"], accent: "text-pink-700 bg-pink-50" },
  { name: "Loki Block", type: "Boys", capacity: 500, rooms: "Double & Triple", amenities: ["WiFi", "Mess", "Study Room"], accent: "text-violet-700 bg-violet-50" },
  { name: "Sif Block", type: "Girls", capacity: 400, rooms: "Single & Double", amenities: ["AC", "WiFi", "Mess", "Salon"], accent: "text-amber-700 bg-amber-50" },
];

const AMENITIES = [
  { icon: Wifi, title: "High-Speed WiFi", desc: "1 Gbps campus-wide internet, 24/7 connectivity." },
  { icon: Utensils, title: "Mess & Cafeteria", desc: "Nutritious meals, 4 times daily. Veg & non-veg options." },
  { icon: Shield, title: "24/7 Security", desc: "CCTV surveillance, biometric access, security personnel." },
  { icon: Dumbbell, title: "Fitness Center", desc: "Fully equipped gym, yoga room, indoor sports." },
  { icon: BookOpen, title: "Study Rooms", desc: "Quiet study zones with AC, available 24/7." },
  { icon: Wind, title: "Laundry Service", desc: "Automated laundry machines on every floor." },
];

const FEES = [
  { type: "Triple Sharing", fee: "₹60,000/year" },
  { type: "Double Sharing", fee: "₹80,000/year" },
  { type: "Single Room", fee: "₹1,20,000/year" },
];

export default function HostelPage() {
  return (
    <div className="bg-white pt-16">
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <video autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center">
          <source src="https://res.cloudinary.com/dblwlysku/video/upload/v1774612575/hostel_life_cvuu6j.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Hostel</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Hostel Life</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your home away from home — safe, comfortable, and vibrant.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Hostel Blocks */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Hostel Blocks</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {HOSTELS.map((hostel) => (
                  <div key={hostel.name} className="card p-8 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900 text-xl">{hostel.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded ${hostel.accent}`}>{hostel.type}</span>
                    </div>
                    <div className="space-y-2 text-sm border-t border-slate-100 pt-4 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Capacity</span>
                        <span className="font-semibold text-slate-800">{hostel.capacity} students</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Room Types</span>
                        <span className="font-semibold text-slate-800">{hostel.rooms}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hostel.amenities.map((a) => (
                        <span key={a} className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded">{a}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Facilities & Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {AMENITIES.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.title} className="card p-6 flex gap-4 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#1e3a8a]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{a.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Fee Structure</h3>
                <p className="text-sm text-slate-500 mt-1">Per academic year</p>
              </div>
              <div className="divide-y divide-slate-100">
                {FEES.map((f) => (
                  <div key={f.type} className="p-6 flex justify-between items-center">
                    <span className="font-medium text-slate-700">{f.type}</span>
                    <span className="font-bold text-[#10b981]">{f.fee}</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500">* Includes mess charges. AC rooms have additional charges.</p>
              </div>
            </div>

            <div className="card p-6 bg-[#1e3a8a] text-white">
              <h3 className="text-lg font-bold mb-3">Apply for Hostel</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Hostel allotment is done on a first-come, first-served basis after admission confirmation.
              </p>
              <Link href="/admissions" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors">
                Admissions →
              </Link>
            </div>

            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Quick Contact</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { label: "Hostel Office", value: "+91 80 2345 6795" },
                  { label: "Email", value: "hostel@thorfinn.edu" },
                  { label: "Hours", value: "9 AM – 6 PM" },
                ].map((item) => (
                  <div key={item.label} className="p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
