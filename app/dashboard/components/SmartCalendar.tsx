"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";

const EVENTS = [
  { date: new Date(2024, 11, 15), title: "End Semester Exams Begin", type: "academic" },
  { date: new Date(2024, 11, 20), title: "Thorfinn Fest", type: "cultural" },
  { date: new Date(2024, 11, 25), title: "Christmas Break", type: "holiday" },
  { date: new Date(2025, 0, 6), title: "Semester II Begins", type: "academic" },
  { date: new Date(2025, 0, 15), title: "Hackathon 2025", type: "technical" },
  { date: new Date(2025, 1, 14), title: "Sports Week", type: "sports" },
];

const TYPE_COLORS: Record<string, string> = {
  academic: "bg-blue-500",
  cultural: "bg-pink-500",
  holiday: "bg-green-500",
  technical: "bg-violet-500",
  sports: "bg-orange-500",
};

export function SmartCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();

  const getEventsForDay = (day: Date) => EVENTS.filter((e) => isSameDay(e.date, day));

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const upcomingEvents = EVENTS.filter((e) => e.date >= new Date()).slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Smart Event Calendar</h2>
        <p className="text-sm text-gray-400 mt-1">University events, exams, and deadlines</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white text-lg">{format(currentDate, "MMMM yyyy")}</h3>
            <div className="flex gap-2">
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-xs text-gray-500 font-semibold py-2">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              const selected = selectedDate && isSameDay(day, selectedDate);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(selected ? null : day)}
                  className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all ${
                    selected ? "bg-blue-600 text-white" :
                    isToday(day) ? "bg-blue-500/20 text-blue-400 font-bold" :
                    isSameMonth(day, currentDate) ? "text-gray-300 hover:bg-white/10" : "text-gray-600"
                  }`}
                >
                  {format(day, "d")}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.slice(0, 3).map((e, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${TYPE_COLORS[e.type]}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected day events */}
          {selectedDate && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm font-semibold text-white mb-3">{format(selectedDate, "MMMM d, yyyy")}</p>
              {selectedEvents.length > 0 ? selectedEvents.map((e) => (
                <div key={e.title} className="flex items-center gap-3 py-2">
                  <div className={`w-2 h-2 rounded-full ${TYPE_COLORS[e.type]}`} />
                  <span className="text-sm text-gray-300">{e.title}</span>
                </div>
              )) : <p className="text-sm text-gray-500">No events on this day</p>}
            </motion.div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white text-sm">Upcoming Events</h3>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="glass rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${TYPE_COLORS[event.type]}`} />
                  <div>
                    <p className="text-xs font-medium text-white">{event.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{format(event.date, "MMM d, yyyy")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-gray-500 capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
