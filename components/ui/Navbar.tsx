"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/utils";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  //{ label: "Departments", href: "/departments" },
  { label: "Research", href: "/research" },
  { label: "Admissions", href: "/admissions" },
  { label: "Placements", href: "/placements" },
  { label: "Campus Life", href: "/campus-life" },
];

const MORE = [
  { label: "Alumni", href: "/alumni" },
  { label: "Hostel", href: "/hostel" },
  { label: "Contact", href: "/contact" },
];

// All searchable pages / sections
const ALL_PAGES = [
  // ── Home page sections ──────────────────────────────────────────────────
  { label: "Home", href: "/", description: "University home page", keywords: "welcome hero thorfinn" },
  { label: "Latest Updates", href: "/#latest-updates", description: "Latest news & announcements", keywords: "news latest updates announcements blog" },
  { label: "Upcoming Events", href: "/#upcoming-events", description: "Upcoming campus events", keywords: "events calendar schedule techsummit sports" },
  { label: "Schools & Departments", href: "/#departments", description: "All engineering & management departments", keywords: "departments schools cse ece mba csbs computer science electronics mechanical civil business administration" },
  { label: "Research Highlights", href: "/#research-highlights", description: "Key research areas & publications", keywords: "research highlights papers publications ai ml vlsi" },
  { label: "Alumni Network", href: "/#alumni-network", description: "Global alumni community stats", keywords: "alumni network community graduates" },
  { label: "Apply 2025", href: "/#apply", description: "Applications for 2025 are now open", keywords: "apply 2025 admissions deadline" },

  // ── About ──────────────────────────────────────────────────────────────
  { label: "About", href: "/about", description: "About Thorfinn University", keywords: "about history mission vision" },
  { label: "Who We Are", href: "/about#who-we-are", description: "University mission & overview", keywords: "who we are mission vision overview" },
  { label: "Milestones", href: "/about#milestones", description: "Historical milestones & achievements", keywords: "milestones history founded 1965" },
  { label: "University Leadership", href: "/about#leadership", description: "Vice-chancellor & leadership team", keywords: "leadership chancellor president dean faculty management" },

  // ── Academics ──────────────────────────────────────────────────────────
  { label: "Academics", href: "/academics", description: "Academic programs & courses", keywords: "academics programs btech mtech mba courses curriculum" },
  { label: "Departments", href: "/academics", description: "All academic departments", keywords: "departments cse ece mechanical civil mba csbs computer science electronics communication business administration engineering" },

  // ── Research ───────────────────────────────────────────────────────────
  { label: "Research", href: "/research", description: "Research initiatives & labs", keywords: "research innovation labs phd" },
  { label: "Research Focus Areas", href: "/research#focus-areas", description: "AI, VLSI, Sustainable Mfg, FinTech focus areas", keywords: "focus areas ai ml vlsi fintech sustainability" },
  { label: "Recent Publications", href: "/research#publications", description: "Latest research papers & journals", keywords: "publications papers journals articles" },

  // ── Admissions ─────────────────────────────────────────────────────────
  { label: "Admissions", href: "/admissions", description: "Apply, fees & eligibility", keywords: "admissions apply enrollment intake 2025" },
  { label: "Admission Process", href: "/admissions#process", description: "Step-by-step admission process", keywords: "admission process steps how to apply" },
  { label: "Fee Structure", href: "/admissions#fees", description: "Annual tuition & hostel fees", keywords: "fees fee structure tuition cost charges annual" },
  { label: "Eligibility Criteria", href: "/admissions#eligibility", description: "Academic & entrance eligibility", keywords: "eligibility criteria jee cutoff marks percentage" },

  // ── Placements ─────────────────────────────────────────────────────────
  { label: "Placements", href: "/placements", description: "Placement records & recruiters", keywords: "placements jobs package salary recruiters companies hiring" },

  // ── Campus Life ────────────────────────────────────────────────────────
  { label: "Campus Life", href: "/campus-life", description: "Events, clubs & campus map", keywords: "campus life student activities clubs sports" },
  { label: "Happening Now", href: "/campus-life#happening-now", description: "Live events happening on campus right now", keywords: "happening now live events today current real time feed" },
  { label: "World-Class Facilities", href: "/campus-life#facilities", description: "Labs, library, sports & campus facilities", keywords: "facilities labs library gym sports complex infrastructure" },
  { label: "Annual Events", href: "/campus-life#annual-events", description: "Techfest, cultural fest & annual campus events", keywords: "annual events techfest cultural fest fests celebrations" },

  // ── Alumni ─────────────────────────────────────────────────────────────
  { label: "Alumni", href: "/alumni", description: "Alumni network & stories", keywords: "alumni graduates community stories notable" },

  // ── Hostel ─────────────────────────────────────────────────────────────
  { label: "Hostel", href: "/hostel", description: "Hostel & accommodation info", keywords: "hostel accommodation dorm room boarding pg" },
  { label: "Hostel Fee Structure", href: "/hostel#fees", description: "Hostel room charges & fee breakdown", keywords: "hostel fees charges room rent accommodation cost" },

  // ── Dashboard ──────────────────────────────────────────────────────────
  { label: "Dashboard", href: "/dashboard", description: "Your personal student dashboard", keywords: "dashboard portal student panel" },
  { label: "Announcements", href: "/dashboard#announcements", description: "Official university announcements", keywords: "announcements notices circular updates official" },
  { label: "Happening Now (Dashboard)", href: "/dashboard#happening-now", description: "Live feed of campus events in dashboard", keywords: "happening now live feed dashboard campus real time" },
  { label: "Academic Resources", href: "/dashboard#resources", description: "Study material, timetable & academic links", keywords: "academic resources study timetable syllabus material" },
  { label: "Career Path Simulator", href: "/dashboard#career", description: "AI-powered career path simulator", keywords: "career simulator path ai guidance job" },
  { label: "Roommate Matchmaker", href: "/dashboard#roommate", description: "Find a hostel roommate", keywords: "roommate match hostel room partner" },

  // ── Contact ────────────────────────────────────────────────────────────
  { label: "Contact", href: "/contact", description: "Get in touch with us", keywords: "contact us email phone address enquiry query" },
  { label: "Send a Message", href: "/contact#message", description: "Contact form to send a message", keywords: "contact form send message query email" },

  // ── Auth ───────────────────────────────────────────────────────────────
  { label: "Login", href: "/login", description: "Student & faculty login", keywords: "login sign in student faculty portal" },
  { label: "Sign Up", href: "/signup", description: "Create a new account", keywords: "sign up register create account new user" },

  // ── Students ───────────────────────────────────────────────────────────
  { label: "Students", href: "/students", description: "Student resources & services", keywords: "students resources services portal" },
];


function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-blue-100 text-blue-800 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const openMore = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMoreOpen(true); };
  const closeMore = () => { closeTimer.current = setTimeout(() => setMoreOpen(false), 250); };
  const pathname = usePathname();
  const router = useRouter();

  const results = query.trim()
    ? ALL_PAGES.filter(
      (p) => {
        const q = query.toLowerCase();
        return (
          p.label.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.href.toLowerCase().includes(q) ||
          (p.keywords ?? "").toLowerCase().includes(q)
        );
      }
    )
    : ALL_PAGES;

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setQuery("");
    setActiveIdx(0);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      closeSearch();
      router.push(href);
    },
    [closeSearch, router]
  );

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchOpen ? closeSearch() : openSearch();
      }
      if (e.key === "Escape" && searchOpen) closeSearch();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [searchOpen, openSearch, closeSearch]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[activeIdx]) navigate(results[activeIdx].href);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-200",
          scrolled ? "shadow-sm border-b border-slate-200" : "border-b border-transparent"
        )}
      >
        <div className="container-max flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image src="/images/favicon.png" alt="Thorfinn University" width={40} height={40} className="rounded-md" />
            <span className="font-bold text-slate-900 text-xl hidden sm:block tracking-tight pr-4">
              Thorfinn University
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-5">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded transition-colors",
                  isActive(link.href)
                    ? "text-[#1e3a8a] bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* More */}
            <div className="relative">
              <button
                onMouseEnter={openMore}
                onMouseLeave={closeMore}
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
              >
                More <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", moreOpen && "rotate-180")} />
              </button>
              <div
                onMouseEnter={openMore}
                onMouseLeave={closeMore}
                className={cn(
                  "absolute top-full right-0 mt-0.5 w-44 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden transition-all duration-200",
                  moreOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                )}
              >
                {MORE.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    onClick={() => setMoreOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-5 py-2 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Search</span>
              <kbd className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 font-mono">⌘K</kbd>
            </button>
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </Link>
            <Link href="/admissions" className="px-4 py-1 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-blue-800 rounded transition-colors">
              Apply Now
            </Link>
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={openSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200">
            <div className="container-max py-3 space-y-0.5">
              {[...NAV, ...MORE].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2.5 text-sm rounded transition-colors",
                    isActive(link.href)
                      ? "text-[#1e3a8a] bg-blue-50 font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2 border-t border-slate-200 mt-2">
                <Link href="/login" className="flex-1 text-center btn-ghost text-sm" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/admissions" className="flex-1 text-center btn-primary text-sm" onClick={() => setMobileOpen(false)}>
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal / Command Palette */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          onClick={closeSearch}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                onKeyDown={handleSearchKey}
                placeholder="Search any page…"
                className="flex-1 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="text-xs bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 font-mono ml-1">Esc</kbd>
            </div>

            {/* Results */}
            <ul className="max-h-72 overflow-y-auto py-2">
              {results.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-slate-400">No pages found for &ldquo;{query}&rdquo;</li>
              ) : (
                results.map((page, i) => (
                  <li key={page.href}>
                    <button
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => navigate(page.href)}
                      className={cn(
                        "w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors",
                        activeIdx === i ? "bg-blue-50" : "hover:bg-slate-50"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", activeIdx === i ? "text-[#1e3a8a]" : "text-slate-800")}>
                          {highlight(page.label, query)}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{highlight(page.description, query)}</p>
                      </div>
                      <span className="text-xs text-slate-300 font-mono flex-shrink-0">{page.href}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            {/* Footer hint */}
            <div className="border-t border-slate-100 px-4 py-2 flex items-center gap-4 text-xs text-slate-400">
              <span><kbd className="font-mono bg-slate-100 px-1 rounded">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono bg-slate-100 px-1 rounded">↵</kbd> open</span>
              <span><kbd className="font-mono bg-slate-100 px-1 rounded">Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
