"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shield, Wifi, Utensils, Dumbbell, BookOpen, Wind } from "lucide-react";

const HOSTELS = [
  { name: "Odin Block", type: "Boys", capacity: 800, rooms: "Single & Double", amenities: ["AC", "WiFi", "Gym", "Mess"], color: "from-blue-500 to-cyan-500" },
  { name: "Freya Block", type: "Girls", capacity: 600, rooms: "Single & Double", amenities: ["AC", "WiFi", "Common Room", "Mess"], color: "from-pink-500 to-rose-500" },
  { name: "Loki Block", type: "Boys", capacity: 500, rooms: "Double & Triple", amenities: ["WiFi", "Mess", "Study Room"], color: "from-violet-500 to-purple-500" },
  { name: "Sif Block", type: "Girls", capacity: 400, rooms: "Single & Double", amenities: ["AC", "WiFi", "Mess", "Salon"], color: "from-amber-500 to-orange-500" },
];

const AMENITIES = [
  { icon: Wifi, title: "High-Speed WiFi", desc: "1 Gbps campus-wide internet, 24/7 connectivity." },
  { icon: Utensils, title: "Mess & Cafeteria", desc: "Nutritious meals, 4 times daily. Veg & non-veg options." },
  { icon: Shield, title: "24/7 Security", desc: "CCTV surveillance, biometric access, security personnel." },
  { icon: Dumbbell, title: "Fitness Center", desc: "Fully equipped gym, yoga room, indoor sports." },
  { icon: BookOpen, title: "Study Rooms", desc: "Quiet study zones with AC, available 24/7." },
  { icon: Wind, title: "Laundry Service", desc: "Automated laundry machines on every floor." },
];

export default function HostelPage() {
  return (
    <div className="bg-slate-50 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              <span className="gradient-text">Hostel</span> Life
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Your home away from home — safe, comfortable, and vibrant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hostel Blocks */}
      <section className="section-padding container-max">
        <SectionHeader badge="Accommodation" title="Hostel Blocks" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {HOSTELS.map((hostel, i) => (
            <motion.div key={hostel.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 card-hover">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${hostel.color} flex items-center justify-center text-2xl mb-4`}>
                🏠
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{hostel.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${hostel.type === "Girls" ? "bg-pink-500/20 text-pink-400" : "bg-blue-500/20 text-blue-400"}`}>
                {hostel.type}
              </span>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Capacity</span><span className="text-slate-900">{hostel.capacity}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Rooms</span><span className="text-slate-900">{hostel.rooms}</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1">
                {hostel.amenities.map((a) => (
                  <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        <SectionHeader badge="Facilities" title="Hostel Amenities" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {AMENITIES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{a.title}</h3>
                  <p className="text-sm text-slate-600">{a.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fee */}
        <div className="glass rounded-3xl p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Hostel Fee Structure</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { type: "Triple Sharing", fee: "₹60,000/year" },
              { type: "Double Sharing", fee: "₹80,000/year" },
              { type: "Single Room", fee: "₹1,20,000/year" },
            ].map((f) => (
              <div key={f.type} className="glass rounded-xl p-4">
                <p className="text-sm text-slate-600 mb-2">{f.type}</p>
                <p className="text-green-400 font-bold">{f.fee}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">* Includes mess charges. AC rooms have additional charges.</p>
        </div>
      </section>
    </div>
  );
}
