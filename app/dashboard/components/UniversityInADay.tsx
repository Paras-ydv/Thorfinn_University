"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";

const PATHS = {
  cs: {
    label: "CS Student",
    color: "from-blue-500 to-cyan-500",
    emoji: "💻",
    timeline: [
      { time: "7:00 AM", activity: "Wake up, check GitHub notifications", location: "Hostel" },
      { time: "8:30 AM", activity: "Data Structures lecture", location: "CS Block 101" },
      { time: "10:00 AM", activity: "AI Lab — working on ML project", location: "AI Lab" },
      { time: "12:30 PM", activity: "Lunch + Coding Club meeting", location: "Food Court" },
      { time: "2:00 PM", activity: "Algorithms tutorial", location: "CS Block 203" },
      { time: "4:00 PM", activity: "Hackathon prep with team", location: "Innovation Hub" },
      { time: "7:00 PM", activity: "Dinner + Netflix", location: "Hostel" },
      { time: "9:00 PM", activity: "LeetCode practice", location: "Room" },
    ],
  },
  mech: {
    label: "Mechanical Student",
    color: "from-orange-500 to-red-500",
    emoji: "⚙️",
    timeline: [
      { time: "7:30 AM", activity: "Morning workout at gym", location: "Sports Complex" },
      { time: "9:00 AM", activity: "Thermodynamics lecture", location: "ME Block 102" },
      { time: "11:00 AM", activity: "CAD/CAM Lab — 3D modeling", location: "CAD Lab" },
      { time: "1:00 PM", activity: "Lunch break", location: "Cafeteria 3" },
      { time: "2:30 PM", activity: "Manufacturing processes lab", location: "Workshop" },
      { time: "5:00 PM", activity: "Cricket practice", location: "Sports Ground" },
      { time: "7:30 PM", activity: "Dinner + study group", location: "Library" },
      { time: "10:00 PM", activity: "Assignment submission", location: "Room" },
    ],
  },
  mba: {
    label: "MBA Student",
    color: "from-purple-500 to-pink-500",
    emoji: "📊",
    timeline: [
      { time: "6:30 AM", activity: "Morning jog + news reading", location: "Campus" },
      { time: "8:00 AM", activity: "Business Strategy lecture", location: "MBA Block" },
      { time: "10:30 AM", activity: "Case study group discussion", location: "Seminar Room" },
      { time: "12:00 PM", activity: "Networking lunch with seniors", location: "Faculty Club" },
      { time: "2:00 PM", activity: "Finance & Analytics workshop", location: "Finance Lab" },
      { time: "4:30 PM", activity: "E-Cell startup pitch practice", location: "Innovation Hub" },
      { time: "7:00 PM", activity: "Industry webinar", location: "Auditorium" },
      { time: "9:30 PM", activity: "Case prep for tomorrow", location: "Library" },
    ],
  },
};

type PathKey = keyof typeof PATHS;

export function UniversityInADay() {
  const [selectedPath, setSelectedPath] = useState<PathKey | null>(null);
  const [visibleItems, setVisibleItems] = useState(3);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">University in a Day</h2>
        <p className="text-sm text-slate-600 mt-1">Experience a day in the life of different students</p>
      </div>

      {/* Path Selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(Object.entries(PATHS) as [PathKey, typeof PATHS[PathKey]][]).map(([key, path]) => (
          <button
            key={key}
            onClick={() => { setSelectedPath(key); setVisibleItems(3); }}
            className={`glass rounded-2xl p-4 text-center transition-all ${selectedPath === key ? "border border-blue-500/50 bg-blue-500/10" : "hover:bg-slate-100"}`}
          >
            <div className="text-2xl mb-2">{path.emoji}</div>
            <p className="text-xs font-medium text-slate-900">{path.label}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPath && (
          <motion.div key={selectedPath} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className={`h-1 rounded-full bg-gradient-to-r ${PATHS[selectedPath].color} mb-8`} />
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
              <div className="space-y-4">
                {PATHS[selectedPath].timeline.slice(0, visibleItems).map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-4 relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${PATHS[selectedPath].color} flex items-center justify-center flex-shrink-0 z-10 shadow-lg`}>
                      <Clock className="w-4 h-4 text-slate-900" />
                    </div>
                    <div className="glass rounded-2xl p-4 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-slate-900 text-sm">{item.activity}</p>
                        <span className="text-xs text-blue-400 font-bold whitespace-nowrap">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">📍 {item.location}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {visibleItems < PATHS[selectedPath].timeline.length && (
              <button onClick={() => setVisibleItems(PATHS[selectedPath].timeline.length)} className="w-full mt-4 btn-ghost text-sm py-3 flex items-center justify-center gap-2">
                Show Full Day <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedPath && (
        <div className="text-center py-12 text-slate-500">
          <p>Select a student path above to explore their day</p>
        </div>
      )}
    </div>
  );
}
