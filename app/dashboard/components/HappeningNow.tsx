"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Plus, ThumbsUp, MapPin, Clock, X, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Event {
  id: string;
  title: string;
  location: string;
  tag: string;
  votes: number;
  created_at: string;
  expires_at: string;
  user_id: string;
}

const TAGS = ["Academic", "Social", "Sports", "Food", "Emergency", "Fun"];
const TAG_COLORS: Record<string, string> = {
  Academic: "bg-blue-500/20 text-blue-400",
  Social: "bg-violet-500/20 text-violet-400",
  Sports: "bg-green-500/20 text-green-400",
  Food: "bg-orange-500/20 text-orange-400",
  Emergency: "bg-red-500/20 text-red-400",
  Fun: "bg-pink-500/20 text-pink-400",
};

// Demo events for when Supabase isn't configured
const DEMO_EVENTS: Event[] = [
  { id: "1", title: "Free Pizza at CS Lab!", location: "CS Lab 204", tag: "Food", votes: 42, created_at: new Date(Date.now() - 600000).toISOString(), expires_at: new Date(Date.now() + 3600000).toISOString(), user_id: "demo" },
  { id: "2", title: "Hackathon Kickoff Meeting", location: "Auditorium A", tag: "Academic", votes: 28, created_at: new Date(Date.now() - 1200000).toISOString(), expires_at: new Date(Date.now() + 7200000).toISOString(), user_id: "demo" },
  { id: "3", title: "Cricket Match — CSE vs ECE", location: "Sports Ground", tag: "Sports", votes: 35, created_at: new Date(Date.now() - 300000).toISOString(), expires_at: new Date(Date.now() + 5400000).toISOString(), user_id: "demo" },
];

export function HappeningNow() {
  const [events, setEvents] = useState<Event[]>(DEMO_EVENTS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", location: "", tag: "Social" });
  const [loading, setLoading] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents();
    // Realtime subscription
    const channel = supabase
      .channel("events")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, fetchEvents)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from("events")
      .select("*")
      .gt("expires_at", new Date().toISOString())
      .order("votes", { ascending: false });
    if (data && data.length > 0) setEvents(data);
  };

  const postEvent = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const expires_at = new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase.from("events").insert([{ ...form, votes: 0, user_id: user?.id, expires_at }]).select();
    if (data) {
      setEvents((prev) => [data[0], ...prev]);
    } else {
      // Demo mode
      const newEvent: Event = { id: Date.now().toString(), ...form, votes: 0, created_at: new Date().toISOString(), expires_at, user_id: "demo" };
      setEvents((prev) => [newEvent, ...prev]);
    }
    setForm({ title: "", location: "", tag: "Social" });
    setShowForm(false);
    setLoading(false);
  };

  const upvote = async (id: string) => {
    if (votedIds.has(id)) return;
    setVotedIds((prev) => { const next = new Set(prev); next.add(id); return next; });
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, votes: e.votes + 1 } : e));
    await supabase.from("events").update({ votes: events.find((e) => e.id === id)!.votes + 1 }).eq("id", id);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Happening Now</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time campus events feed</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Post Event
        </button>
      </div>

      {/* Post Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Post an Event</h3>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="What's happening?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm" />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location (optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm" />
            <div className="flex gap-2 flex-wrap">
              {TAGS.map((tag) => (
                <button key={tag} onClick={() => setForm({ ...form, tag })} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${form.tag === tag ? "bg-blue-600 text-white" : "glass text-gray-400 hover:text-white"}`}>{tag}</button>
              ))}
            </div>
            <button onClick={postEvent} disabled={loading || !form.title.trim()} className="w-full btn-primary flex items-center justify-center gap-2 text-sm py-2.5">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Event"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events */}
      <div className="space-y-3">
        {events.map((event, i) => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5 flex items-start gap-4">
            <button
              onClick={() => upvote(event.id)}
              className={`flex flex-col items-center gap-1 min-w-[48px] py-2 px-3 rounded-xl transition-all ${votedIds.has(event.id) ? "bg-blue-600 text-white" : "glass text-gray-400 hover:text-blue-400"}`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-bold">{event.votes}</span>
            </button>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm">{event.title}</h3>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {event.location && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" /> {event.location}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${TAG_COLORS[event.tag] || "bg-gray-500/20 text-gray-400"}`}>{event.tag}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
