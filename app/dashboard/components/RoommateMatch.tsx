"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronRight, Heart, Coffee, Moon, Music, BookOpen, Dumbbell } from "lucide-react";

const QUESTIONS = [
  { id: "sleep", question: "Sleep schedule?", options: ["Early bird (before 11pm)", "Night owl (after 1am)", "Flexible"] },
  { id: "study", question: "Study style?", options: ["Silent room only", "Background music OK", "Study groups"] },
  { id: "social", question: "Social preference?", options: ["Introvert — quiet room", "Extrovert — social space", "Balanced"] },
  { id: "cleanliness", question: "Cleanliness level?", options: ["Very tidy", "Moderately clean", "Relaxed"] },
  { id: "interests", question: "Main interest?", options: ["Tech & Coding", "Sports & Fitness", "Arts & Music", "Business"] },
];

const MOCK_MATCHES = [
  { name: "Arjun K.", dept: "CSE", score: 92, traits: ["Night owl", "Silent study", "Tech"], avatar: "AK" },
  { name: "Rahul M.", dept: "ECE", score: 85, traits: ["Flexible", "Music OK", "Sports"], avatar: "RM" },
  { name: "Vikram S.", dept: "CSBS", score: 78, traits: ["Early bird", "Study groups", "Business"], avatar: "VS" },
];

export function RoommateMatch() {
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);

  const answer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: value };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep("results");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Roommate Matchmaker</h2>
        <p className="text-sm text-gray-400 mt-1">Find your perfect roommate based on lifestyle compatibility</p>
      </div>

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass rounded-3xl p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Find Your Match</h3>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">Answer 5 quick questions about your lifestyle and we'll find compatible roommates.</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[{ icon: Coffee, label: "Sleep habits" }, { icon: BookOpen, label: "Study style" }, { icon: Music, label: "Interests" }].map(({ icon: Icon, label }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <Icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setStep("quiz")} className="btn-primary flex items-center gap-2 mx-auto">
              Start Matching <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass rounded-3xl p-8">
            {/* Progress */}
            <div className="flex gap-1.5 mb-8">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentQ ? "bg-blue-500" : "bg-white/10"}`} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-2">Question {currentQ + 1} of {QUESTIONS.length}</p>
            <h3 className="text-2xl font-bold text-white mb-8">{QUESTIONS[currentQ].question}</h3>
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((opt) => (
                <button key={opt} onClick={() => answer(opt)} className="w-full glass rounded-xl p-4 text-left text-gray-300 hover:text-white hover:bg-white/10 hover:border-blue-500/50 border border-transparent transition-all text-sm font-medium">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass rounded-2xl p-6 text-center mb-6">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white">Your Top Matches!</h3>
              <p className="text-sm text-gray-400 mt-1">Based on your lifestyle preferences</p>
            </div>
            {MOCK_MATCHES.map((match, i) => (
              <motion.div key={match.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-white flex-shrink-0">
                  {match.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white">{match.name}</h4>
                    <span className="text-green-400 font-bold text-sm">{match.score}% match</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{match.dept}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {match.traits.map((t) => <span key={t} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                  {/* Compatibility bar */}
                  <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${match.score}%` }} transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }} className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                  </div>
                </div>
              </motion.div>
            ))}
            <button onClick={() => { setStep("intro"); setCurrentQ(0); setAnswers({}); }} className="w-full btn-ghost text-sm py-3">
              Retake Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
