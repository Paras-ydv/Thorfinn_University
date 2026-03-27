"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FlaskConical, Award, Globe, Users } from "lucide-react";

const RESEARCH_AREAS = [
  { title: "Artificial Intelligence & ML", dept: "CSE", papers: 145, funding: "₹12 Cr", icon: "🤖" },
  { title: "VLSI & Embedded Systems", dept: "ECE", papers: 98, funding: "₹8 Cr", icon: "🔬" },
  { title: "Sustainable Manufacturing", dept: "ME", papers: 76, funding: "₹6 Cr", icon: "⚙️" },
  { title: "Smart Infrastructure", dept: "CE", papers: 54, funding: "₹4 Cr", icon: "🏗️" },
  { title: "Business Analytics", dept: "MBA", papers: 42, funding: "₹3 Cr", icon: "📊" },
  { title: "Digital Transformation", dept: "CSBS", papers: 38, funding: "₹2.5 Cr", icon: "🔗" },
];

const RECENT_PAPERS = [
  { title: "Federated Learning for Privacy-Preserving Healthcare AI", authors: "Dr. Arun Patel, Dr. Sneha Iyer", journal: "IEEE Transactions on AI", year: 2024 },
  { title: "Low-Power VLSI Design for IoT Edge Computing", authors: "Dr. Anil Verma, Dr. Ravi Kumar", journal: "ACM Computing Surveys", year: 2024 },
  { title: "Carbon-Neutral Manufacturing Processes", authors: "Dr. Priya Sharma, Dr. Suresh Nair", journal: "Nature Sustainability", year: 2023 },
  { title: "Blockchain-Based Supply Chain Optimization", authors: "Dr. Meera Nair, Dr. Vikram Singh", journal: "Harvard Business Review", year: 2023 },
];

export default function ResearchPage() {
  return (
    <div className="bg-slate-50 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-blue-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              <span className="gradient-text">Research</span> & Innovation
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              Pushing the boundaries of knowledge across disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: FlaskConical, value: "50+", label: "Research Labs" },
            { icon: Award, value: "2,400+", label: "Publications" },
            { icon: Globe, value: "₹45 Cr", label: "Research Funding" },
            { icon: Users, value: "300+", label: "Research Scholars" },
          ].map(({ icon: Icon, value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center">
              <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-2xl font-bold gradient-text">{value}</p>
              <p className="text-sm text-slate-600 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Research Areas */}
        <SectionHeader badge="Focus Areas" title="Research Areas" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {RESEARCH_AREAS.map((area, i) => (
            <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 card-hover">
              <div className="text-3xl mb-4">{area.icon}</div>
              <h3 className="font-bold text-slate-900 mb-1">{area.title}</h3>
              <p className="text-xs text-blue-400 mb-4">{area.dept} Department</p>
              <div className="flex justify-between text-sm">
                <div><p className="text-slate-500 text-xs">Papers</p><p className="text-slate-900 font-semibold">{area.papers}</p></div>
                <div className="text-right"><p className="text-slate-500 text-xs">Funding</p><p className="text-green-400 font-semibold">{area.funding}</p></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Publications */}
        <SectionHeader badge="Publications" title="Recent Research Papers" />
        <div className="space-y-4 max-w-4xl mx-auto">
          {RECENT_PAPERS.map((paper, i) => (
            <motion.div key={paper.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 hover:bg-slate-100 transition-colors cursor-pointer">
              <h3 className="font-bold text-slate-900 mb-2">{paper.title}</h3>
              <p className="text-sm text-slate-600 mb-2">{paper.authors}</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-blue-400 font-medium">{paper.journal}</span>
                <span className="text-gray-600">{paper.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
