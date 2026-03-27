"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";

const EVENTS = [
  { date: new Date(2026, 0, 8),  title: "Infosys Placement Drive",       type: "Placement" },
  { date: new Date(2026, 0, 15), title: "TechSummit 2026",               type: "Technical" },
  { date: new Date(2026, 0, 20), title: "Admissions Open Day",           type: "Admissions" },
  { date: new Date(2026, 1, 5),  title: "Annual Sports Meet",            type: "Sports" },
  { date: new Date(2026, 1, 14), title: "Research Symposium",            type: "Research" },
  { date: new Date(2026, 2, 5),  title: "Mid-Semester Examinations",     type: "Academic" },
];

const TYPE_COLOR: Record<string, string> = {
  Placement:  "bg-green-500",
  Technical:  "bg-blue-500",
  Admissions: "bg-violet-500",
  Sports:     "bg-orange-500",
  Research:   "bg-teal-500",
  Academic:   "bg-red-500",
};

export function SmartCalendar() {
  const [current,  setCurrent]  = useState(new Date(2026, 0, 1));
  const [selected, setSelected] = useState<Date | null>(null);

  const days     = eachDayOfInterval({ start: startOfMonth(current), end: endOfMonth(current) });
  const startDay = startOfMonth(current).getDay();
  const dayEvents = (d: Date) => EVENTS.filter(e => isSameDay(e.date, d));
  const upcoming  = EVENTS.filter(e => e.date >= new Date()).slice(0, 6);

  return (
    <div className="grid lg:grid-cols-3 gap-6 max-w-4xl">
      {/* Calendar */}
      <div className="lg:col-span-2 card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 text-sm">{format(current, "MMMM yyyy")}</h2>
          <div className="flex gap-1">
            <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1))}
              className="p-1.5 rounded border border-slate-200 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
          {days.map(day => {
            const evs = dayEvents(day);
            const sel = selected && isSameDay(day, selected);
            return (
              <button key={day.toISOString()} onClick={() => setSelected(sel ? null : day)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded text-xs transition-colors ${
                  sel ? "bg-[#1e3a8a] text-white" :
                  isToday(day) ? "bg-blue-50 text-[#1e3a8a] font-bold" :
                  isSameMonth(day, current) ? "text-slate-700 hover:bg-slate-50" : "text-slate-300"
                }`}>
                {format(day, "d")}
                {evs.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {evs.slice(0, 2).map((e, i) => <div key={i} className={`w-1 h-1 rounded-full ${TYPE_COLOR[e.type]}`} />)}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-2">{format(selected, "MMMM d, yyyy")}</p>
            {dayEvents(selected).length > 0
              ? dayEvents(selected).map(e => (
                  <div key={e.title} className="flex items-center gap-2 py-1.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${TYPE_COLOR[e.type]}`} />
                    <span className="text-sm text-slate-700">{e.title}</span>
                    <span className="badge-gray ml-auto">{e.type}</span>
                  </div>
                ))
              : <p className="text-sm text-slate-500">No events on this date.</p>
            }
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Upcoming Events</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {upcoming.map(ev => (
            <div key={ev.title} className="px-4 py-3">
              <div className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${TYPE_COLOR[ev.type]}`} />
                <div>
                  <p className="text-xs font-medium text-slate-800">{ev.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{format(ev.date, "MMM d, yyyy")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-500 mb-2">Legend</p>
          <div className="space-y-1.5">
            {Object.entries(TYPE_COLOR).map(([t, c]) => (
              <div key={t} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${c}`} />
                <span className="text-xs text-slate-500">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
