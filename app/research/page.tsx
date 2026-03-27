import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FlaskConical, Award, Globe, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Research & Innovation" };

const RESEARCH_AREAS = [
  { title: "Artificial Intelligence & ML", dept: "CSE", papers: 145, funding: "₹12 Cr" },
  { title: "VLSI & Embedded Systems", dept: "ECE", papers: 98, funding: "₹8 Cr" },
  { title: "Sustainable Manufacturing", dept: "ME", papers: 76, funding: "₹6 Cr" },
  { title: "Smart Infrastructure", dept: "CE", papers: 54, funding: "₹4 Cr" },
  { title: "Business Analytics", dept: "MBA", papers: 42, funding: "₹3 Cr" },
  { title: "Digital Transformation", dept: "CSBS", papers: 38, funding: "₹2.5 Cr" },
];

const RECENT_PAPERS = [
  { title: "Federated Learning for Privacy-Preserving Healthcare AI", authors: "Dr. Arun Patel, Dr. Sneha Iyer", journal: "IEEE Transactions on AI", year: 2024 },
  { title: "Low-Power VLSI Design for IoT Edge Computing", authors: "Dr. Anil Verma, Dr. Ravi Kumar", journal: "ACM Computing Surveys", year: 2024 },
  { title: "Carbon-Neutral Manufacturing Processes", authors: "Dr. Priya Sharma, Dr. Suresh Nair", journal: "Nature Sustainability", year: 2023 },
  { title: "Blockchain-Based Supply Chain Optimization", authors: "Dr. Meera Nair, Dr. Vikram Singh", journal: "Harvard Business Review", year: 2023 },
];

export default function ResearchPage() {
  return (
    <div className="bg-white pt-16">
      {/* Dark Hero like Academics */}
      <div className="bg-[#0f172a]">
        <div className="container-max py-20 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Research</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Research & Innovation</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            Pushing the boundaries of knowledge across disciplines through rigorous, high-impact research programs.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Focus Areas</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {RESEARCH_AREAS.map((area) => (
                  <div key={area.title} className="card p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded">{area.dept}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-xl mb-4 leading-tight">{area.title}</h3>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                       <div>
                         <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Papers</p>
                         <p className="text-slate-900 font-bold text-lg">{area.papers}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Funding</p>
                         <p className="text-[#10b981] font-bold text-lg">{area.funding}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Recent Publications</h2>
              <div className="card overflow-hidden">
                <div className="divide-y divide-slate-100">
                  {RECENT_PAPERS.map((paper, i) => (
                    <div key={i} className="p-6 hover:bg-slate-50 transition-colors">
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 leading-snug">{paper.title}</h3>
                      <p className="text-slate-600 text-base mb-3">{paper.authors}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#1e3a8a]">{paper.journal}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500 font-medium">{paper.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Key Statistics</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { icon: FlaskConical, value: "50+", label: "Research Labs" },
                  { icon: Award, value: "2,400+", label: "Publications" },
                  { icon: Globe, value: "₹45 Cr", label: "Research Funding" },
                  { icon: Users, value: "300+", label: "Research Scholars" },
                ].map((stat) => (
                   <div key={stat.label} className="p-6 flex items-center gap-5">
                     <div className="w-14 h-14 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                       <stat.icon className="w-6 h-6 text-[#1e3a8a]" />
                     </div>
                     <div>
                       <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                       <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
                     </div>
                   </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-[#1e3a8a] text-white">
              <h3 className="text-lg font-bold mb-3">Join Our Research</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                Discover unparalleled opportunities to work alongside world-renowned faculty on cutting-edge global innovation.
              </p>
              <Link href="/admissions" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors">
                Doctoral Admissions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
