"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white pt-16">
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <img
          src="https://res.cloudinary.com/dblwlysku/image/upload/v1774612732/7b6fe143-ff66-4586-9345-64dbdf32d41e.png"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f172a]/75" />
        <div className="container-max py-20 lg:py-24 relative z-10 w-full">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Contact</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">Contact Us</h1>
          <p className="text-slate-300 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed">
            We're here to help. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 tracking-tight">Send a Message</h2>
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-colors text-sm"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  required
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm"
              >
                {sent ? "✓ Message Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Get in Touch</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { icon: MapPin, title: "Address", content: "42 University Avenue, Tech City, TC 560001, India" },
                  { icon: Phone, title: "Phone", content: "+91 80 2345 6789" },
                  { icon: Mail, title: "Email", content: "info@thorfinn.edu" },
                  { icon: Clock, title: "Office Hours", content: "Mon–Fri: 9 AM – 5 PM\nSat: 9 AM – 1 PM" },
                ].map(({ icon: Icon, title, content }) => (
                  <div key={title} className="p-5 flex gap-4">
                    <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1e3a8a]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
                      <p className="text-sm text-slate-700 whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Department Contacts</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { dept: "Admissions", email: "admissions@thorfinn.edu" },
                  { dept: "Placements", email: "placements@thorfinn.edu" },
                  { dept: "Research", email: "research@thorfinn.edu" },
                  { dept: "Hostel", email: "hostel@thorfinn.edu" },
                ].map((c) => (
                  <div key={c.dept} className="p-5 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{c.dept}</span>
                    <a href={`mailto:${c.email}`} className="text-sm font-medium text-[#1e3a8a] hover:underline">{c.email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
