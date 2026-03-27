import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const COLS = {
  Academics: [
    { label: "Programs",     href: "/academics" },
    { label: "Research",     href: "/research" },
    { label: "Placements",   href: "/placements" },
  ],
  Admissions: [
    { label: "Apply Now",    href: "/admissions" },
    { label: "Eligibility",  href: "/admissions" },
    { label: "Scholarships", href: "/admissions" },
    { label: "Hostel",       href: "/hostel" },
  ],
  Campus: [
    { label: "Campus Life",  href: "/campus-life" },
    { label: "Alumni",       href: "/alumni" },
    { label: "Contact",      href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="container-max py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-[#1e3a8a] font-bold text-sm font-serif">TU</span>
              </div>
              <span className="font-semibold text-white text-base">Thorfinn University</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Advancing knowledge and fostering excellence in education, research, and public service since 1965.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-500" />
                <span>42 University Avenue, Tech City, TC 560001, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-slate-500" />
                <span>+91 80 2345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-slate-500" />
                <span>info@thorfinn.edu</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Thorfinn University. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
