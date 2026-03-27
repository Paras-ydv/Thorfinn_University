import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Mail } from "lucide-react";
import { DeptVideo } from "@/components/ui/DeptVideo";

const DEPARTMENTS: Record<string, {
  name: string; short: string; hod: string; hodEmail: string; description: string;
  students: number; faculty: number;
  labs: string[]; courses: string[];
  facultyList: { name: string; specialization: string; designation: string }[];
  videoKey: string;
  heroImage?: string;
}> = {
  "computer-science": {
    name: "Computer Science & Engineering", short: "CSE",
    hod: "Dr. Rajesh Kumar", hodEmail: "hod.cse@thorfinn.edu",
    description: "The Department of Computer Science & Engineering offers rigorous programs in algorithms, systems, artificial intelligence, and software engineering. The department is home to four research labs and has produced over 145 publications in the last year.",
    students: 1200, faculty: 45,
    labs: ["Artificial Intelligence & ML Lab", "Cybersecurity Research Lab", "Human-Computer Interaction Lab", "Cloud & Distributed Systems Lab"],
    courses: ["B.Tech Computer Science & Engineering", "B.Tech CS & Business Systems", "M.Tech Artificial Intelligence & ML", "Ph.D Computer Science"],
    facultyList: [
      { name: "Dr. Arun Patel",   specialization: "Machine Learning",    designation: "Professor" },
      { name: "Dr. Sneha Iyer",   specialization: "Computer Vision",     designation: "Associate Professor" },
      { name: "Dr. Ravi Shankar", specialization: "Distributed Systems", designation: "Associate Professor" },
      { name: "Dr. Priya Menon",  specialization: "Cybersecurity",       designation: "Assistant Professor" },
    ],
    videoKey: "cse",
  },
  "electronics": {
    name: "Electronics & Communication Engineering", short: "ECE",
    hod: "Dr. Anil Verma", hodEmail: "hod.ece@thorfinn.edu",
    description: "The Department of Electronics & Communication Engineering focuses on VLSI design, signal processing, IoT, and embedded systems. It maintains strong industry partnerships with leading semiconductor companies.",
    students: 850, faculty: 35,
    labs: ["VLSI Design Lab", "IoT & Embedded Systems Lab", "Signal Processing Lab", "RF & Microwave Lab"],
    courses: ["B.Tech Electronics & Communication", "M.Tech VLSI Design", "Ph.D Electronics"],
    facultyList: [
      { name: "Dr. Anil Verma",   specialization: "VLSI Design",       designation: "Professor & HOD" },
      { name: "Dr. Kavya Reddy",  specialization: "Signal Processing", designation: "Associate Professor" },
      { name: "Dr. Suresh Babu",  specialization: "Embedded Systems",  designation: "Assistant Professor" },
      { name: "Dr. Nisha Thomas", specialization: "RF Engineering",    designation: "Assistant Professor" },
    ],
    videoKey: "ece",
  },
  "mechanical": {
    name: "Mechanical Engineering", short: "ME",
    hod: "Dr. Priya Sharma", hodEmail: "hod.me@thorfinn.edu",
    description: "The Department of Mechanical Engineering offers programs in design, manufacturing, thermal sciences, and robotics. The department operates a state-of-the-art workshop and CAD/CAM facility.",
    students: 900, faculty: 38,
    labs: ["CAD/CAM & Rapid Prototyping Lab", "Thermal & Fluid Sciences Lab", "Robotics & Automation Lab", "Materials Testing Lab"],
    courses: ["B.Tech Mechanical Engineering", "M.Tech Manufacturing Systems", "Ph.D Mechanical Engineering"],
    facultyList: [
      { name: "Dr. Priya Sharma",   specialization: "Manufacturing",       designation: "Professor & HOD" },
      { name: "Dr. Arjun Das",      specialization: "Thermal Engineering", designation: "Professor" },
      { name: "Dr. Leela Krishnan", specialization: "Robotics",            designation: "Associate Professor" },
      { name: "Dr. Mohan Rao",      specialization: "Materials Science",   designation: "Assistant Professor" },
    ],
    videoKey: "mech",
  },
  "civil": {
    name: "Civil Engineering", short: "CE",
    hod: "Dr. Sunita Patel", hodEmail: "hod.ce@thorfinn.edu",
    description: "The Department of Civil Engineering focuses on structural engineering, geotechnics, environmental engineering, and sustainable infrastructure development.",
    students: 700, faculty: 30,
    labs: ["Structural Engineering Lab", "Geotechnical Lab", "Environmental Engineering Lab", "Survey & GIS Lab"],
    courses: ["B.Tech Civil Engineering", "M.Tech Structural Engineering", "Ph.D Civil Engineering"],
    facultyList: [
      { name: "Dr. Sunita Patel", specialization: "Structural Engineering", designation: "Professor & HOD" },
      { name: "Dr. Ramesh Gupta", specialization: "Geotechnics",            designation: "Professor" },
      { name: "Dr. Anita Joshi",  specialization: "Environmental Engg.",    designation: "Associate Professor" },
      { name: "Dr. Kiran Mehta",  specialization: "Transportation",         designation: "Assistant Professor" },
    ],
    videoKey: "civil",
  },
  "mba": {
    name: "School of Business Administration", short: "MBA",
    hod: "Dr. Vikram Singh", hodEmail: "hod.mba@thorfinn.edu",
    description: "The School of Business Administration prepares future business leaders through rigorous case-based learning, industry immersion, and research in management, finance, and strategy.",
    students: 600, faculty: 28,
    labs: ["Business Analytics Lab", "Finance & Trading Lab", "Marketing Research Studio"],
    courses: ["MBA (Full-time)", "Executive MBA", "Ph.D Management"],
    facultyList: [
      { name: "Dr. Vikram Singh",  specialization: "Strategy",   designation: "Professor & HOD" },
      { name: "Dr. Pooja Kapoor",  specialization: "Finance",    designation: "Professor" },
      { name: "Dr. Sanjay Mishra", specialization: "Marketing",  designation: "Associate Professor" },
      { name: "Dr. Ritu Agarwal",  specialization: "Operations", designation: "Assistant Professor" },
    ],
    videoKey: "mba",
  },
  "csbs": {
    name: "CS & Business Systems", short: "CSBS",
    hod: "Dr. Meera Nair", hodEmail: "hod.csbs@thorfinn.edu",
    description: "The Department of CS & Business Systems bridges technology and business, offering programs in data science, enterprise systems, and digital transformation.",
    students: 500, faculty: 22,
    labs: ["Data Science & Analytics Lab", "ERP & Enterprise Systems Lab", "Digital Innovation Lab"],
    courses: ["B.Tech CS & Business Systems", "M.Tech Data Science"],
    facultyList: [
      { name: "Dr. Meera Nair",   specialization: "Data Science",          designation: "Professor & HOD" },
      { name: "Dr. Ajay Pillai",  specialization: "Business Intelligence", designation: "Associate Professor" },
      { name: "Dr. Swati Verma",  specialization: "ERP Systems",           designation: "Assistant Professor" },
      { name: "Dr. Nikhil Jain",  specialization: "Digital Marketing",     designation: "Assistant Professor" },
    ],
    videoKey: "csbs",
  },
  "ml": {
    name: "Artificial Intelligence & Machine Learning", short: "AI/ML",
    hod: "Dr. Arun Patel", hodEmail: "hod.ml@thorfinn.edu",
    description: "The Department of Artificial Intelligence & Machine Learning offers cutting-edge programs in deep learning, NLP, computer vision, and intelligent systems with active collaborations with global tech companies.",
    students: 600, faculty: 25,
    labs: ["Deep Learning Lab", "NLP & Conversational AI Lab", "Computer Vision Lab", "AI Ethics & Governance Lab"],
    courses: ["B.Tech Artificial Intelligence & Machine Learning", "M.Tech Artificial Intelligence & ML", "Ph.D Computer Science"],
    facultyList: [
      { name: "Dr. Arun Patel",   specialization: "Machine Learning", designation: "Professor & HOD" },
      { name: "Dr. Sneha Iyer",   specialization: "Computer Vision",  designation: "Associate Professor" },
      { name: "Dr. Ravi Shankar", specialization: "NLP",              designation: "Associate Professor" },
      { name: "Dr. Priya Menon",  specialization: "AI Ethics",        designation: "Assistant Professor" },
    ],
    videoKey: "ml",
  },
  "mtech-ai-ml": {
    name: "M.Tech Artificial Intelligence & ML", short: "M.Tech AI/ML",
    hod: "Dr. Arun Patel", hodEmail: "hod.ml@thorfinn.edu",
    description: "The M.Tech in Artificial Intelligence & Machine Learning is a research-intensive postgraduate program covering deep learning, NLP, computer vision, reinforcement learning, and large-scale AI systems.",
    students: 120, faculty: 20,
    labs: ["Deep Learning Lab", "NLP & Conversational AI Lab", "Computer Vision Lab", "Reinforcement Learning Lab"],
    courses: ["M.Tech Artificial Intelligence & ML", "Ph.D Computer Science"],
    facultyList: [
      { name: "Dr. Arun Patel",   specialization: "Machine Learning", designation: "Professor & HOD" },
      { name: "Dr. Sneha Iyer",   specialization: "Computer Vision",  designation: "Associate Professor" },
      { name: "Dr. Ravi Shankar", specialization: "NLP",              designation: "Associate Professor" },
      { name: "Dr. Priya Menon",  specialization: "AI Ethics",        designation: "Assistant Professor" },
    ],
    videoKey: "mtech_aiml",
  },
  "vlsi": {
    name: "M.Tech VLSI Design", short: "M.Tech VLSI",
    hod: "Dr. Anil Verma", hodEmail: "hod.vlsi@thorfinn.edu",
    description: "The M.Tech in VLSI Design is a specialized postgraduate program covering chip architecture, RTL design, physical design, verification methodologies, and semiconductor fabrication processes.",
    students: 60, faculty: 15,
    labs: ["VLSI Design Lab", "RTL & Verification Lab", "Physical Design Lab", "Semiconductor Devices Lab"],
    courses: ["M.Tech VLSI Design", "Ph.D Electronics"],
    facultyList: [
      { name: "Dr. Anil Verma",   specialization: "VLSI Design",    designation: "Professor & HOD" },
      { name: "Dr. Kavya Reddy",  specialization: "RTL Design",     designation: "Associate Professor" },
      { name: "Dr. Suresh Babu",  specialization: "Physical Design", designation: "Assistant Professor" },
      { name: "Dr. Nisha Thomas", specialization: "Verification",   designation: "Assistant Professor" },
    ],
    videoKey: "vlsi",
  },
  "manufacturing": {
    name: "M.Tech Manufacturing Systems", short: "M.Tech Mfg",
    hod: "Dr. Priya Sharma", hodEmail: "hod.manufacturing@thorfinn.edu",
    description: "The M.Tech in Manufacturing Systems covers advanced manufacturing processes, lean systems, automation, CNC technology, and industrial engineering with strong industry linkages.",
    students: 60, faculty: 14,
    labs: ["Advanced Manufacturing Lab", "CNC & Automation Lab", "Lean Systems Lab", "Industrial Engineering Lab"],
    courses: ["M.Tech Manufacturing Systems", "Ph.D Mechanical Engineering"],
    facultyList: [
      { name: "Dr. Priya Sharma",   specialization: "Manufacturing",  designation: "Professor & HOD" },
      { name: "Dr. Arjun Das",      specialization: "Automation",     designation: "Professor" },
      { name: "Dr. Leela Krishnan", specialization: "Lean Systems",   designation: "Associate Professor" },
      { name: "Dr. Mohan Rao",      specialization: "CNC Technology", designation: "Assistant Professor" },
    ],
    videoKey: "manufacturing",
  },
  "phd-cse": {
    name: "Ph.D Computer Science", short: "Ph.D CSE",
    hod: "Dr. Rajesh Kumar", hodEmail: "hod.cse@thorfinn.edu",
    description: "The Ph.D in Computer Science is a research-intensive doctoral program focused on original contributions in distributed systems, AI, cybersecurity, and human-computer interaction.",
    students: 80, faculty: 20,
    labs: ["AI Research Lab", "Cybersecurity Lab", "HCI Lab", "Distributed Systems Lab"],
    courses: ["Ph.D Computer Science"],
    facultyList: [
      { name: "Dr. Arun Patel",   specialization: "Machine Learning",    designation: "Professor" },
      { name: "Dr. Sneha Iyer",   specialization: "Computer Vision",     designation: "Associate Professor" },
      { name: "Dr. Ravi Shankar", specialization: "Distributed Systems", designation: "Associate Professor" },
      { name: "Dr. Priya Menon",  specialization: "Cybersecurity",       designation: "Assistant Professor" },
    ],
    videoKey: "phd_cse",
  },
  "phd-mech": {
    name: "Ph.D Mechanical Engineering", short: "Ph.D ME",
    hod: "Dr. Priya Sharma", hodEmail: "hod.me@thorfinn.edu",
    description: "The Ph.D in Mechanical Engineering is a research-intensive doctoral program focused on original contributions in thermal sciences, materials engineering, robotics, and next-generation manufacturing.",
    students: 60, faculty: 15,
    labs: ["Thermal Sciences Lab", "Materials Research Lab", "Robotics Lab", "Advanced Manufacturing Lab"],
    courses: ["Ph.D Mechanical Engineering"],
    facultyList: [
      { name: "Dr. Priya Sharma",   specialization: "Manufacturing",       designation: "Professor & HOD" },
      { name: "Dr. Arjun Das",      specialization: "Thermal Engineering", designation: "Professor" },
      { name: "Dr. Leela Krishnan", specialization: "Robotics",            designation: "Associate Professor" },
      { name: "Dr. Mohan Rao",      specialization: "Materials Science",   designation: "Assistant Professor" },
    ],
    videoKey: "phd_mech",
  },
};

export async function generateStaticParams() {
  return Object.keys(DEPARTMENTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = DEPARTMENTS[params.slug];
  return { title: d?.name ?? "Department" };
}

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const dept = DEPARTMENTS[params.slug];
  if (!dept) notFound();

  return (
    <div className="bg-white pt-16">

      {/* ── Hero ── */}
      <div className="relative min-h-[52vh] flex items-end overflow-hidden">
        <DeptVideo dept={dept.videoKey} className="absolute inset-0" />
        <div className="absolute inset-0 bg-[#0f172a]/70" />
        <div className="relative z-10 container-max py-14 w-full">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/departments" className="hover:text-white transition-colors">Departments</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300">{dept.short}</span>
          </nav>
          <p className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-2">{dept.short}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">{dept.name}</h1>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-max py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* ── Left ── */}
          <div className="lg:col-span-2">
            <div className="space-y-10">

              <section>
                <p className="section-label">Overview</p>
                <p className="text-sm text-slate-600 leading-relaxed">{dept.description}</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { v: dept.students,    l: "Students" },
                    { v: dept.faculty,     l: "Faculty" },
                    { v: dept.labs.length, l: "Research Labs" },
                  ].map(s => (
                    <div key={s.l} className="card p-4 text-center">
                      <p className="text-2xl font-bold text-[#1e3a8a] font-serif">{s.v}</p>
                      <p className="text-xs text-slate-500 mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="section-label">Programs</p>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Programs Offered</h2>
                <div className="card overflow-hidden">
                  <ul className="divide-y divide-slate-100">
                    {dept.courses.map(c => (
                      <li key={c} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-700">{c}</span>
                        <Link href="/admissions" className="text-xs text-[#1e3a8a] hover:underline">Apply</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <p className="section-label">Infrastructure</p>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Research Laboratories</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {dept.labs.map(lab => (
                    <div key={lab} className="card p-4 flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-slate-700">{lab}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="section-label">People</p>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Faculty</h2>
                <div className="card overflow-hidden">
                  <table className="data-table">
                    <thead>
                      <tr><th>Name</th><th>Designation</th><th>Specialization</th></tr>
                    </thead>
                    <tbody>
                      {dept.facultyList.map(f => (
                        <tr key={f.name}>
                          <td className="font-medium text-slate-900">{f.name}</td>
                          <td className="text-slate-600">{f.designation}</td>
                          <td><span className="badge-gray">{f.specialization}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">
            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Head of Department</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {dept.hod.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{dept.hod}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Head of Department</p>
                  <a href={`mailto:${dept.hodEmail}`} className="flex items-center gap-1 text-xs text-[#1e3a8a] hover:underline mt-2">
                    <Mail className="w-3 h-3" /> {dept.hodEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { l: "Apply to this Department", href: "/admissions" },
                  { l: "View All Departments",     href: "/departments" },
                  { l: "Research Publications",    href: "/research" },
                  { l: "Placement Statistics",     href: "/placements" },
                ].map(link => (
                  <li key={link.l}>
                    <Link href={link.href} className="text-sm text-[#1e3a8a] hover:underline flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
