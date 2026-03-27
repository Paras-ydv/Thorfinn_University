"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COMPANIES = [
  { name: "Google",        sector: "Technology",    package: 45,  hired: 12, year: 2024 },
  { name: "Microsoft",     sector: "Technology",    package: 42,  hired: 18, year: 2024 },
  { name: "Amazon",        sector: "Technology",    package: 38,  hired: 25, year: 2024 },
  { name: "Goldman Sachs", sector: "Finance",       package: 35,  hired: 8,  year: 2024 },
  { name: "McKinsey",      sector: "Consulting",    package: 32,  hired: 5,  year: 2024 },
  { name: "Adobe",         sector: "Technology",    package: 30,  hired: 8,  year: 2024 },
  { name: "JP Morgan",     sector: "Finance",       package: 28,  hired: 10, year: 2024 },
  { name: "Flipkart",      sector: "E-Commerce",    package: 22,  hired: 15, year: 2024 },
  { name: "Deloitte",      sector: "Consulting",    package: 12,  hired: 35, year: 2024 },
  { name: "Wipro",         sector: "IT Services",   package: 7.5, hired: 90, year: 2024 },
  { name: "Infosys",       sector: "IT Services",   package: 8,   hired: 120,year: 2024 },
  { name: "TCS",           sector: "IT Services",   package: 7,   hired: 150,year: 2024 },
];

const SECTORS = ["All", "Technology", "Finance", "Consulting", "IT Services", "E-Commerce"];

const YEAR_DATA = [
  { year: "2020", avg: 8.2,  highest: 28, placed: 88 },
  { year: "2021", avg: 9.1,  highest: 32, placed: 89 },
  { year: "2022", avg: 10.4, highest: 36, placed: 91 },
  { year: "2023", avg: 11.8, highest: 40, placed: 93 },
  { year: "2024", avg: 12.4, highest: 45, placed: 94 },
];

const PIE_COLORS = ["#1e3a8a", "#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

type SortKey = "name" | "package" | "hired";

export default function PlacementsPage() {
  const [search,     setSearch]     = useState("");
  const [sector,     setSector]     = useState("All");
  const [sortKey,    setSortKey]    = useState<SortKey>("package");
  const [sortDir,    setSortDir]    = useState<"asc" | "desc">("desc");
  const [minPkg,     setMinPkg]     = useState(0);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = useMemo(() => {
    let d = [...COMPANIES];
    if (search)    d = d.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (sector !== "All") d = d.filter(c => c.sector === sector);
    if (minPkg > 0) d = d.filter(c => c.package >= minPkg);
    d.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "string") return sortDir === "asc" ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return d;
  }, [search, sector, sortKey, sortDir, minPkg]);

  const sectorData = useMemo(() => {
    const m: Record<string, number> = {};
    COMPANIES.forEach(c => { m[c.sector] = (m[c.sector] || 0) + c.hired; });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }, []);

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp   className={`w-3 h-3 -mb-1 ${sortKey === k && sortDir === "asc"  ? "text-[#1e3a8a]" : "text-slate-300"}`} />
      <ChevronDown className={`w-3 h-3       ${sortKey === k && sortDir === "desc" ? "text-[#1e3a8a]" : "text-slate-300"}`} />
    </span>
  );

  return (
    <div className="bg-white pt-16">
      {/* Page header */}
      <div className="bg-[#0f172a] border-b border-slate-800">
        <div className="container-max py-12">
          <p className="section-label text-blue-400">Career Development</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">Placements 2024</h1>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Placement statistics for the graduating batch of 2024. Data verified by the Training & Placement Cell.
          </p>
        </div>
      </div>

      <div className="container-max py-10">
        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden mb-10">
          {[
            { v: "94%",      l: "Placement Rate" },
            { v: "45 LPA",   l: "Highest Package" },
            { v: "12.4 LPA", l: "Average Package" },
            { v: "500+",     l: "Recruiting Companies" },
          ].map(s => (
            <div key={s.l} className="bg-white px-6 py-5">
              <p className="text-2xl font-bold text-[#1e3a8a] font-serif">{s.v}</p>
              <p className="text-xs text-slate-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Year-wise Average Package (LPA)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={YEAR_DATA} barSize={32}>
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12 }}
                  formatter={(v) => [`${v} LPA`, "Avg Package"]}
                />
                <Bar dataKey="avg" fill="#1e3a8a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Placements by Sector (2024)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sectorData} cx="40%" cy="50%" outerRadius={80} dataKey="value" labelLine={false}>
                  {sectorData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year-wise table */}
        <div className="card mb-10 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700">Year-wise Placement Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Avg Package (LPA)</th>
                  <th>Highest Package (LPA)</th>
                  <th>Placement Rate</th>
                </tr>
              </thead>
              <tbody>
                {YEAR_DATA.map(r => (
                  <tr key={r.year}>
                    <td className="font-medium text-slate-900">{r.year}</td>
                    <td>{r.avg}</td>
                    <td>{r.highest}</td>
                    <td>
                      <span className="badge-green">{r.placed}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search company..."
              className="input pl-9"
            />
          </div>
          <select
            value={sector}
            onChange={e => setSector(e.target.value)}
            className="input w-auto"
          >
            {SECTORS.map(s => <option key={s}>{s}</option>)}
          </select>
          <select
            value={minPkg}
            onChange={e => setMinPkg(Number(e.target.value))}
            className="input w-auto"
          >
            <option value={0}>Min Package: Any</option>
            <option value={10}>10+ LPA</option>
            <option value={20}>20+ LPA</option>
            <option value={30}>30+ LPA</option>
          </select>
        </div>

        {/* Company table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <button onClick={() => handleSort("name")} className="flex items-center hover:text-slate-700">
                      Company <SortIcon k="name" />
                    </button>
                  </th>
                  <th>Sector</th>
                  <th>
                    <button onClick={() => handleSort("package")} className="flex items-center hover:text-slate-700">
                      Package (LPA) <SortIcon k="package" />
                    </button>
                  </th>
                  <th>
                    <button onClick={() => handleSort("hired")} className="flex items-center hover:text-slate-700">
                      Students Hired <SortIcon k="hired" />
                    </button>
                  </th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.name}>
                    <td className="font-medium text-slate-900">{c.name}</td>
                    <td><span className="badge-gray">{c.sector}</span></td>
                    <td className="font-semibold text-[#1e3a8a]">{c.package}</td>
                    <td>{c.hired}</td>
                    <td className="text-slate-500">{c.year}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-400">No results found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
