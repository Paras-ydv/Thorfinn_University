import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Academics: [
    { label: "Departments", href: "/departments" },
    { label: "Courses", href: "/academics" },
    { label: "Research", href: "/research" },
    { label: "Faculty", href: "/departments" },
  ],
  Admissions: [
    { label: "Apply Now", href: "/admissions" },
    { label: "Requirements", href: "/admissions" },
    { label: "Scholarships", href: "/admissions" },
    { label: "Hostel", href: "/hostel" },
  ],
  Campus: [
    { label: "Campus Life", href: "/campus-life" },
    { label: "Students", href: "/students" },
    { label: "Alumni", href: "/alumni" },
    { label: "Placements", href: "/placements" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-slate-900" />
              </div>
              <span className="gradient-text">Thorfinn University</span>
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-xs">
              Shaping tomorrow's leaders through excellence in education, research, and innovation since 1965.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> 42 University Ave, Tech City, TC 560001</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-400" /> +91 80 2345 6789</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" /> info@thorfinn.edu</div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-slate-900 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-blue-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2024 Thorfinn University. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-blue-500/20 transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
