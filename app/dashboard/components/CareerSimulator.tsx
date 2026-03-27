"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, FlaskConical, GraduationCap, TrendingUp, Users } from "lucide-react";

const FLOW = [
  {
    id: "interest",
    label: "Your Interest",
    icon: GraduationCap,
    options: ["AI & Machine Learning", "Web Development", "Data Science", "Cybersecurity", "Product Management"],
  },
  {
    id: "dept",
    label: "Department",
    icon: FlaskConical,
    options: { "AI & Machine Learning": "CSE / CSBS", "Web Development": "CSE", "Data Science": "CSBS", "Cybersecurity": "CSE / ECE", "Product Management": "MBA / CSBS" },
  },
  {
    id: "labs",
    label: "Key Labs",
    icon: FlaskConical,
    options: { "AI & Machine Learning": ["AI Lab", "Data Science Lab", "HPC Lab"], "Web Development": ["Full Stack Lab", "Cloud Lab"], "Data Science": ["Analytics Lab", "AI Lab"], "Cybersecurity": ["Cyber Lab", "Network Lab"], "Product Management": ["Business Analytics Lab", "UX Lab"] },
  },
  {
    id: "internship",
    label: "Internship",
    icon: Briefcase,
    options: { "AI & Machine Learning": "Google, Microsoft, Amazon", "Web Development": "Flipkart, Swiggy, Startups", "Data Science": "Deloitte, McKinsey, Amazon", "Cybersecurity": "Cisco, IBM, DRDO", "Product Management": "Flipkart, Paytm, Startups" },
  },
  {
    id: "placement",
    label: "Placement",
    icon: TrendingUp,
    options: { "AI & Machine Learning": "₹18–45 LPA", "Web Development": "₹10–25 LPA", "Data Science": "₹15–35 LPA", "Cybersecurity": "₹12–30 LPA", "Product Management": "₹15–40 LPA" },
  },
  {
    id: "alumni",
    label: "Alumni Path",
    icon: Users,
    options: { "AI & Machine Learning": "ML Engineer → Research Scientist → AI Lead", "Web Development": "SDE → Senior SDE → Tech Lead", "Data Science": "Analyst → Data Scientist → Head of Analytics", "Cybersecurity": "Security Analyst → CISO", "Product Management": "APM → PM → CPO" },
  },
];

export function CareerSimulator() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const select = (value: string) => {
    const step = FLOW[currentStep];
    setSelections((prev) => ({ ...prev, [step.id]: value }));
    if (currentStep < FLOW.length - 1) setCurrentStep(currentStep + 1);
  };

  const getOptions = (step: typeof FLOW[0]): string[] => {
    if (Array.isArray(step.options)) return step.options;
    const interest = selections["interest"];
    if (!interest) return [];
    const val = (step.options as Record<string, string | string[]>)[interest];
    if (Array.isArray(val)) return val;
    return val ? [val] : [];
  };

  const reset = () => { setSelections({}); setCurrentStep(0); };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Career Path Simulator</h2>
        <p className="text-sm text-slate-600 mt-1">Simulate your journey from interest to placement</p>
      </div>

      {/* Progress Flow */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto no-scrollbar pb-2">
        {FLOW.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentStep || selections[step.id];
          const active = i === currentStep;
          return (
            <div key={step.id} className="flex items-center gap-1 flex-shrink-0">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${done ? "bg-green-500/20 text-green-400" : active ? "bg-blue-600 text-slate-900" : "glass text-slate-500"}`}>
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < FLOW.length - 1 && <ArrowRight className="w-3 h-3 text-gray-600 flex-shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        {currentStep < FLOW.length ? (
          <motion.div key={currentStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="glass rounded-3xl p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              {currentStep === 0 ? "What's your primary interest?" : `Select your ${FLOW[currentStep].label}`}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {getOptions(FLOW[currentStep]).map((opt) => (
                <button key={opt} onClick={() => select(opt)} className="glass rounded-xl p-4 text-left text-slate-700 hover:text-slate-900 hover:bg-slate-200 hover:border-blue-500/50 border border-transparent transition-all text-sm font-medium">
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass rounded-2xl p-6 text-center bg-gradient-to-br from-green-500/10 to-blue-500/10">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your Career Path 🎯</h3>
              <p className="text-slate-600 text-sm">Based on your interest in <span className="text-blue-400 font-semibold">{selections.interest}</span></p>
            </div>
            {FLOW.slice(1).map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{step.label}</p>
                    <p className="text-slate-900 font-medium text-sm">{selections[step.id]}</p>
                  </div>
                </motion.div>
              );
            })}
            <button onClick={reset} className="w-full btn-ghost text-sm py-3">Simulate Again</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
