"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const NAV = [
  { label: "About",       href: "/about" },
  { label: "Academics",   href: "/academics" },
  //{ label: "Departments", href: "/departments" },
  { label: "Research",    href: "/research" },
  { label: "Admissions",  href: "/admissions" },
  { label: "Placements",  href: "/placements" },
  { label: "Campus Life", href: "/campus-life" },
];

const MORE = [
  { label: "Alumni",  href: "/alumni" },
  { label: "Hostel",  href: "/hostel" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [moreOpen,    setMoreOpen]    = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMore  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMoreOpen(true); };
  const closeMore = () => { closeTimer.current = setTimeout(() => setMoreOpen(false), 250); };
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-200",
        scrolled ? "shadow-sm border-b border-slate-200" : "border-b border-transparent"
      )}
    >
      <div className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image src="/images/favicon.png" alt="Thorfinn University" width={32} height={32} className="rounded" />
          <span className="font-semibold text-slate-900 text-base hidden sm:block">
            Thorfinn University
          </span>
        </Link>

        {/* Desktop nav — center */}
        <nav className="hidden lg:flex items-center gap-0.5">
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
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Login
          </Link>
          <Link href="/admissions" className="btn-primary">
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
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
  );
}
