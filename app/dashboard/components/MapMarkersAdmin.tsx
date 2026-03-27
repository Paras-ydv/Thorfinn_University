"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Trash2, Loader2, MapPin } from "lucide-react";
import type { MapMarker } from "@/app/campus-life/components/CampusMapImage";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#06b6d4"];
const TYPES  = ["live", "upcoming", "recurring"] as const;
const TAGS   = ["Competition", "Workshop", "Festival", "Tournament", "Cultural", "Lecture", "Sports", "Health", "General"];

const EMPTY: { title: string; description: string; location: string; time: string; date: string; tag: string; type: "live" | "upcoming" | "recurring"; attendees: string; x_pct: number; y_pct: number; color: string } = { title: "", description: "", location: "", time: "", date: "", tag: "General", type: "upcoming", attendees: "", x_pct: 50, y_pct: 50, color: "#3b82f6" };

export function MapMarkersAdmin() {
  const [markers,  setMarkers]  = useState<MapMarker[]>([]);
  const [form,     setForm]     = useState(EMPTY);
  const [loading,  setLoading]  = useState(false);
  const [placing,  setPlacing]  = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchMarkers(); }, []);

  const fetchMarkers = async () => {
    const { data } = await supabase.from("map_markers").select("*");
    if (data) setMarkers(data as MapMarker[]);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!placing || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x_pct = Math.round(((e.clientX - rect.left) / rect.width)  * 100);
    const y_pct = Math.round(((e.clientY - rect.top)  / rect.height) * 100);
    setForm(f => ({ ...f, x_pct, y_pct }));
    setPlacing(false);
  };

  const add = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    const payload = { ...form, attendees: form.attendees ? Number(form.attendees) : null };
    const { data } = await supabase.from("map_markers").insert([payload]).select();
    if (data?.[0]) setMarkers(p => [...p, data[0] as MapMarker]);
    setForm(EMPTY);
    setLoading(false);
  };

  const remove = async (id: string) => {
    await supabase.from("map_markers").delete().eq("id", id);
    setMarkers(p => p.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-slate-900 mb-1">Campus Map Markers</h2>
        <p className="text-xs text-slate-500">Add or remove event markers shown on the campus map in Campus Life.</p>
      </div>

      {/* Map picker */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Map Preview</p>
          <button
            onClick={() => setPlacing(v => !v)}
            className={`text-xs px-3 py-1.5 rounded border font-medium transition-colors flex items-center gap-1.5 ${placing ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {placing ? "Click map to place…" : "Pick position on map"}
          </button>
        </div>
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className={`relative w-full h-64 bg-slate-100 ${placing ? "cursor-crosshair" : "cursor-default"}`}
        >
          <Image src="/images/map.png" alt="Campus Map" fill className="object-cover" />
          {/* Existing markers */}
          {markers.map(m => (
            <span key={m.id} style={{ left: `${m.x_pct}%`, top: `${m.y_pct}%`, backgroundColor: m.color }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow"
            />
          ))}
          {/* New marker preview */}
          <span
            style={{ left: `${form.x_pct}%`, top: `${form.y_pct}%`, backgroundColor: form.color }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg ring-2 ring-offset-1 ring-slate-400"
          />
        </div>
        <p className="text-xs text-slate-400 px-4 py-2">
          New marker position: {form.x_pct}% left, {form.y_pct}% top
        </p>
      </div>

      {/* Add form */}
      <div className="card p-5 space-y-3">
        <p className="text-sm font-semibold text-slate-800">Add New Marker</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Event title *" className="input text-sm" />
          <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Location" className="input text-sm" />
          <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="Time (e.g. 3:00 PM)" className="input text-sm" />
          <input value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} placeholder="Date (e.g. Today)" className="input text-sm" />
          <input value={form.attendees} onChange={e => setForm(f => ({ ...f, attendees: e.target.value }))} placeholder="Expected attendees" type="number" className="input text-sm" />
          <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} className="input text-sm">
            {TAGS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" rows={2} className="input text-sm w-full resize-none" />

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-500 font-medium">Type:</span>
            {TYPES.map(t => (
              <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${form.type === t ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-slate-300 text-slate-600"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-500 font-medium">Color:</span>
            {COLORS.map(c => (
              <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                style={{ backgroundColor: c }}
                className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${form.color === c ? "border-slate-900 scale-110" : "border-white shadow"}`}
              />
            ))}
          </div>
        </div>

        <button onClick={add} disabled={loading || !form.title.trim()}
          className="btn-primary text-xs py-2 px-4 disabled:opacity-50 flex items-center gap-1.5">
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          Add Marker
        </button>
      </div>

      {/* Existing markers list */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <p className="text-sm font-semibold text-slate-800">Active Markers ({markers.length})</p>
        </div>
        {markers.length === 0 ? (
          <p className="text-sm text-slate-400 p-5 text-center">No markers yet. Add one above.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {markers.map(m => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{m.title}</p>
                  <p className="text-xs text-slate-400">{m.location} · {m.time} · {m.date}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${m.type === "live" ? "bg-red-50 text-red-700" : m.type === "recurring" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                  {m.type}
                </span>
                <button onClick={() => remove(m.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
