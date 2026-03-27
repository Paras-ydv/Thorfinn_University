"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, ThumbsUp, MapPin, Clock, X, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Event {
  id: string; title: string; location: string; tag: string;
  votes: number; created_at: string; expires_at: string; user_id: string;
}

const TAGS = ["Academic", "Social", "Sports", "Food", "General"];

const DEMO: Event[] = [
  { id: "1", title: "Study group forming for Data Structures exam", location: "Library, Room 3", tag: "Academic", votes: 12, created_at: new Date(Date.now() - 600000).toISOString(), expires_at: new Date(Date.now() + 3600000).toISOString(), user_id: "demo" },
  { id: "2", title: "Badminton court available — anyone interested?", location: "Sports Complex", tag: "Sports",   votes: 8,  created_at: new Date(Date.now() - 1200000).toISOString(), expires_at: new Date(Date.now() + 7200000).toISOString(), user_id: "demo" },
  { id: "3", title: "Placement prep session by seniors at 6 PM",     location: "CS Seminar Hall", tag: "Academic", votes: 24, created_at: new Date(Date.now() - 300000).toISOString(), expires_at: new Date(Date.now() + 5400000).toISOString(), user_id: "demo" },
];

export function HappeningNow() {
  const [events,      setEvents]      = useState<Event[]>(DEMO);
  const [showForm,    setShowForm]    = useState(false);
  const [form,        setForm]        = useState({ title: "", location: "", tag: "General" });
  const [loading,     setLoading]     = useState(false);
  const [dbAvailable, setDbAvailable] = useState(false);
  const [votedIds,    setVotedIds]    = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents();
    const ch = supabase.channel("events-rt")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, fetchEvents)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*")
      .gt("expires_at", new Date().toISOString()).order("votes", { ascending: false });
    if (error || !data) return;
    setDbAvailable(true);
    if (data.length > 0) setEvents(data);
  };

  const post = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    const expires_at = new Date(Date.now() + 4 * 3600000).toISOString();
    if (dbAvailable) {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase.from("events").insert([{ ...form, votes: 0, user_id: user?.id, expires_at }]).select();
      if (data?.[0]) { setEvents(p => [data[0], ...p]); setForm({ title: "", location: "", tag: "General" }); setShowForm(false); setLoading(false); return; }
    }
    setEvents(p => [{ id: Date.now().toString(), ...form, votes: 0, created_at: new Date().toISOString(), expires_at, user_id: "demo" }, ...p]);
    setForm({ title: "", location: "", tag: "General" }); setShowForm(false); setLoading(false);
  };

  const upvote = async (id: string) => {
    if (votedIds.has(id)) return;
    const next = new Set(votedIds); next.add(id); setVotedIds(next);
    setEvents(p => p.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e));
    if (dbAvailable) {
      const cur = events.find(e => e.id === id);
      if (cur) await supabase.from("events").update({ votes: cur.votes + 1 }).eq("id", id);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-slate-900">Happening Now</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live campus activity feed{!dbAvailable && " (demo)"}
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-xs py-2 px-3">
          <Plus className="w-3.5 h-3.5" /> Post
        </button>
      </div>

      {showForm && (
        <div className="card p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Post an update</p>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What's happening?" className="input text-sm" />
          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location (optional)" className="input text-sm" />
          <div className="flex gap-2 flex-wrap">
            {TAGS.map(t => (
              <button key={t} onClick={() => setForm({ ...form, tag: t })}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${form.tag === t ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={post} disabled={loading || !form.title.trim()} className="btn-primary text-xs py-2 w-full justify-center disabled:opacity-50">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Post Update"}
          </button>
        </div>
      )}

      <div className="card overflow-hidden divide-y divide-slate-100">
        {events.map(ev => (
          <div key={ev.id} className="flex items-start gap-4 px-4 py-4 hover:bg-slate-50 transition-colors">
            <button onClick={() => upvote(ev.id)}
              className={`flex flex-col items-center gap-0.5 min-w-[40px] py-1.5 px-2 rounded border transition-colors ${votedIds.has(ev.id) ? "bg-[#1e3a8a] border-[#1e3a8a] text-white" : "border-slate-200 text-slate-500 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"}`}>
              <ThumbsUp className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{ev.votes}</span>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{ev.title}</p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                {ev.location && <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin className="w-3 h-3" />{ev.location}</span>}
                <span className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3" />{formatDistanceToNow(new Date(ev.created_at), { addSuffix: true })}</span>
                <span className="badge-gray">{ev.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
