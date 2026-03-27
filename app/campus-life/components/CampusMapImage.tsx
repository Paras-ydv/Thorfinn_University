"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, MapPin, Users, Zap, Plus, Minus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export interface MapMarker {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  date: string;
  tag: string;
  type: "live" | "upcoming" | "recurring";
  attendees?: number;
  x_pct: number;
  y_pct: number;
  color: string;
}

const FALLBACK: MapMarker[] = [
  { id: "f1", title: "Hackathon Finals",      description: "48-hour national-level hackathon grand finale.",     location: "Engineering Block", time: "3:00 PM",  date: "Today",    type: "live",      tag: "Competition", attendees: 240,  x_pct: 28, y_pct: 38, color: "#ef4444" },
  { id: "f2", title: "Street Food Festival",  description: "20+ food stalls from across India. Live music.",     location: "Food Court Plaza",  time: "12:00 PM", date: "Saturday", type: "upcoming",  tag: "Festival",    attendees: 800,  x_pct: 62, y_pct: 55, color: "#f59e0b" },
  { id: "f3", title: "Inter-College Cricket", description: "Zonal cricket tournament semi-finals. Entry free.",  location: "Sports Complex",    time: "9:00 AM",  date: "Sunday",   type: "upcoming",  tag: "Tournament",  attendees: 1200, x_pct: 75, y_pct: 70, color: "#22c55e" },
  { id: "f4", title: "Cultural Night",        description: "Annual hostel cultural night with dance and music.", location: "Hostel Rooftop",    time: "7:00 PM",  date: "Friday",   type: "upcoming",  tag: "Cultural",    attendees: 180,  x_pct: 50, y_pct: 78, color: "#a855f7" },
  { id: "f5", title: "AI & ML Workshop",      description: "Hands-on session on building neural networks.",     location: "Seminar Hall A",    time: "10:00 AM", date: "Tomorrow", type: "upcoming",  tag: "Workshop",    attendees: 80,   x_pct: 38, y_pct: 25, color: "#3b82f6" },
];

const TYPE_CFG = {
  live:      { label: "Live Now",  bg: "bg-red-50",   text: "text-red-700"   },
  upcoming:  { label: "Upcoming",  bg: "bg-blue-50",  text: "text-blue-700"  },
  recurring: { label: "Recurring", bg: "bg-green-50", text: "text-green-700" },
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function CampusMapImage() {
  const [markers,  setMarkers]  = useState<MapMarker[]>(FALLBACK);
  const [selected, setSelected] = useState<MapMarker | null>(null);
  const [zoom,     setZoom]     = useState(1);
  const [pan,      setPan]      = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.from("map_markers").select("*").then(({ data }) => {
      if (data && data.length > 0) setMarkers(data as MapMarker[]);
    });
  }, []);

  const clampPan = (x: number, y: number, z: number) => {
    const maxX = ((z - 1) / 2) * 100;
    const maxY = ((z - 1) / 2) * 100;
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };

  const zoomIn  = () => setZoom(z => { const nz = Math.min(z + ZOOM_STEP, MAX_ZOOM); setPan(p => clampPan(p.x, p.y, nz)); return nz; });
  const zoomOut = () => setZoom(z => { const nz = Math.max(z - ZOOM_STEP, MIN_ZOOM); setPan(p => clampPan(p.x, p.y, nz)); return nz; });

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    const dx = ((e.clientX - dragStart.current.mx) / (containerRef.current?.offsetWidth  || 1)) * 100;
    const dy = ((e.clientY - dragStart.current.my) / (containerRef.current?.offsetHeight || 1)) * 100;
    setPan(clampPan(dragStart.current.px + dx, dragStart.current.py + dy, zoom));
  };
  const onMouseUp = () => setDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn(); else zoomOut();
  };

  return (
    <div className="flex rounded-xl overflow-hidden border border-slate-200 shadow-lg h-[520px]">
      {/* Map */}
      <div
        ref={containerRef}
        className={`relative flex-1 min-w-0 bg-slate-100 overflow-hidden select-none ${zoom > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        {/* Zoomable layer */}
        <div
          className="absolute inset-0 transition-transform duration-150 ease-out"
          style={{ transform: `scale(${zoom}) translate(${pan.x / zoom}%, ${pan.y / zoom}%)`, transformOrigin: "center center" }}
        >
          <Image src="/images/map.png" alt="Campus Map" fill className="object-cover" priority />

          {/* Markers */}
          {markers.map((m) => (
            <button
              key={m.id}
              onClick={(e) => { e.stopPropagation(); if (!dragging) setSelected(s => s?.id === m.id ? null : m); }}
              style={{ left: `${m.x_pct}%`, top: `${m.y_pct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
              title={m.title}
            >
              {/* Outer ring */}
              <span
                className="absolute inset-0 rounded-full opacity-40"
                style={{ backgroundColor: m.color, transform: "scale(1.8)", filter: "blur(2px)" }}
              />
              {/* Dot */}
              <span
                className={`relative flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-125 ${m.type === "live" ? "animate-pulse" : ""}`}
                style={{ backgroundColor: m.color }}
              >
                <span className="w-2 h-2 rounded-full bg-white/80" />
              </span>
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
          <button onClick={zoomIn}  disabled={zoom >= MAX_ZOOM} className="w-8 h-8 bg-white/95 hover:bg-white border border-slate-200 rounded-lg shadow flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={zoomOut} disabled={zoom <= MIN_ZOOM} className="w-8 h-8 bg-white/95 hover:bg-white border border-slate-200 rounded-lg shadow flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-8 h-6 bg-white/90 border border-slate-200 rounded-lg shadow flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500">{zoom}×</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-[#0f172a]/75 backdrop-blur-sm text-white/80 text-xs px-4 py-1.5 rounded-full whitespace-nowrap">
            📍 Click a marker · scroll or use +/− to zoom
          </div>
        </div>
      </div>

      {/* Side panel */}
      <div className="flex-shrink-0 w-72 bg-white border-l border-slate-200 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key={selected.id} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col h-full">
              <div className="h-1 flex-shrink-0" style={{ backgroundColor: selected.color }} />
              <div className="flex-shrink-0 p-5 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_CFG[selected.type].bg} ${TYPE_CFG[selected.type].text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${selected.type === "live" ? "animate-pulse" : ""}`} style={{ backgroundColor: selected.color }} />
                        {TYPE_CFG[selected.type].label}
                      </span>
                      <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">{selected.tag}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100">
                {[
                  { icon: Clock,  label: "Time",     value: selected.time },
                  { icon: Clock,  label: "Date",     value: selected.date },
                  { icon: MapPin, label: "Venue",    value: selected.location },
                  { icon: Users,  label: "Expected", value: selected.attendees ? `${selected.attendees.toLocaleString()} people` : "Open" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400 font-medium">{label}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <p className="text-sm text-slate-600 leading-relaxed">{selected.description}</p>
                {selected.type === "live" && (
                  <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs font-semibold text-red-700">This event is happening right now</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
              <div className="flex-shrink-0 p-5 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">Campus Events</h3>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Live</span>
                </div>
                <p className="text-xs text-slate-500">Click a marker on the map to view event details</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {markers.map((m) => (
                  <button key={m.id} onClick={() => setSelected(m)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-sm transition-all text-left">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.type === "live" ? "animate-pulse" : ""}`} style={{ backgroundColor: m.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{m.title}</p>
                      <p className="text-xs text-slate-400 truncate">{m.time} · {m.location}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex-shrink-0 border-t border-slate-100 p-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { val: markers.filter(m => m.type === "live").length,     label: "Live Now" },
                  { val: markers.filter(m => m.type === "upcoming").length,  label: "Upcoming" },
                  { val: markers.reduce((s, m) => s + (m.attendees || 0), 0).toLocaleString(), label: "Expected" },
                ].map(({ val, label }) => (
                  <div key={label} className="bg-slate-50 rounded-lg py-2">
                    <p className="text-sm font-bold text-slate-900">{val}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
