"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatCard } from "@/components/ui/StatCard";
import { PLACEMENT_COMPANIES } from "@/lib/data";
import { Search, TrendingUp, Filter, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SECTORS = ["All", "Tech", "Finance", "Consulting", "IT Services", "E-Commerce"];
const SORT_OPTIONS = [
  { label: "Highest Package", value: "package-desc" },
  { label: "Lowest Package", value: "package-asc" },
  { label: "Most Hired", value: "hired-desc" },
  { label: "Company Name", value: "name-asc" },
];

const PIE_COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#06b6d4"];

export default function PlacementsPage() {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [sort, setSort] = useState("package-desc");
  const [minPackage, setMinPackage] = useState(0);

  const filtered = useMemo(() => {
    let data = [...PLACEMENT_COMPANIES];
    if (search) data = data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    if (sector !== "All") data = data.filter((c) => c.sector === sector);
    if (minPackage > 0) data = data.filter((c) => c.package >= minPackage);
    const [field, dir] = sort.split("-");
    data.sort((a, b) => {
      const av = field === "name" ? a.name : (a as Record<string, number | string>)[field] as number;
      const bv = field === "name" ? b.name : (b as Record<string, number | string>)[field] as number;
      if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return dir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return data;
  }, [search, sector, sort, minPackage]);

  const sectorData = useMemo(() => {
    const map: Record<string, number> = {};
    PLACEMENT_COMPANIES.forEach((c) => { map[c.sector] = (map[c.sector] || 0) + c.hired; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  const topCompanies = [...PLACEMENT_COMPANIES].sort((a, b) => b.package - a.package).slice(0, 6);

  return (
    <div className="bg-slate-50 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              <span className="gradient-text">Placements</span> 2024
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto">
              94% placement rate. 500+ companies. ₹45 LPA highest package.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { value: "94%", label: "Placement Rate", icon: "🎯" },
            { value: "₹45 LPA", label: "Highest Package", icon: "💰" },
            { value: "₹12 LPA", label: "Average Package", icon: "📊" },
            { value: "500+", label: "Hiring Companies", icon: "🏢" },
          ].map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Top Packages (LPA)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topCompanies}>
                <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="package" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Placements by Sector</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {sectorData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${sector === s ? "bg-blue-600 text-slate-900" : "glass text-slate-600 hover:text-slate-900"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-white">{o.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={minPackage}
                onChange={(e) => setMinPackage(Number(e.target.value))}
                className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option value={0} className="bg-white">Min Package: Any</option>
                <option value={10} className="bg-white">10+ LPA</option>
                <option value={20} className="bg-white">20+ LPA</option>
                <option value={30} className="bg-white">30+ LPA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-slate-200 flex items-center justify-center font-bold text-slate-900 text-sm">
                  {company.logo}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{company.name}</h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{company.sector}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-slate-500 text-xs">Package</p>
                  <p className="text-green-400 font-bold">₹{company.package} LPA</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-xs">Hired</p>
                  <p className="text-blue-400 font-bold">{company.hired}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No companies match your filters.</div>
        )}
      </section>
    </div>
  );
}
