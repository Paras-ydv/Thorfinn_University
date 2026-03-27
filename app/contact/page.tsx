"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

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
    <div className="bg-dark-900 pt-16">
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20" />
        <div className="container-max relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              <span className="gradient-text">Contact</span> Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're here to help. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding container-max">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <SectionHeader badge="Get in Touch" title="We'd Love to Hear From You" align="left" />
            {[
              { icon: MapPin, title: "Address", content: "42 University Avenue, Tech City, TC 560001, India" },
              { icon: Phone, title: "Phone", content: "+91 80 2345 6789 | +91 80 2345 6790" },
              { icon: Mail, title: "Email", content: "info@thorfinn.edu | admissions@thorfinn.edu" },
              { icon: Clock, title: "Office Hours", content: "Mon–Fri: 9:00 AM – 5:00 PM | Sat: 9:00 AM – 1:00 PM" },
            ].map(({ icon: Icon, title, content }) => (
              <div key={title} className="flex gap-4 glass rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{content}</p>
                </div>
              </div>
            ))}

            {/* Department Contacts */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Department Contacts</h3>
              <div className="space-y-3">
                {[
                  { dept: "Admissions", email: "admissions@thorfinn.edu" },
                  { dept: "Placements", email: "placements@thorfinn.edu" },
                  { dept: "Research", email: "research@thorfinn.edu" },
                  { dept: "Hostel", email: "hostel@thorfinn.edu" },
                ].map((c) => (
                  <div key={c.dept} className="flex justify-between text-sm">
                    <span className="text-gray-400">{c.dept}</span>
                    <a href={`mailto:${c.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">{c.email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-5">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { key: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message..."
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                {sent ? "✓ Message Sent!" : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
