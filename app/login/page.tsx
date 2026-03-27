"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const TEST_ACCOUNTS = [
  { label: "Admin — Arjun Mehta",        email: "admin.thorfinn@gmail.com",   password: "Admin@2026",   role: "Admin" },
  { label: "Faculty — Dr. Priya Sharma", email: "faculty.thorfinn@gmail.com", password: "Faculty@2026", role: "Faculty" },
  { label: "Student — Rahul Verma",      email: "student.thorfinn@gmail.com", password: "Student@2026", role: "Student" },
];

const ROLE_COLORS: Record<string, string> = {
  Admin:   "bg-red-500/20 text-red-400",
  Faculty: "bg-violet-500/20 text-violet-400",
  Student: "bg-blue-500/20 text-blue-400",
};

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else router.push("/dashboard");
  };

  const fillDemo = (acc: typeof TEST_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setShowDemo(false);
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (hidden on mobile) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-[60%] relative flex-col justify-end p-16 overflow-hidden"
      >
        {/* Background video / image */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/Quick_cuts_of_campus_life—stud.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1e293b]/75" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <Image src="/images/favicon.png" alt="Thorfinn University" width={36} height={36} className="rounded-lg" />
            <span className="text-white font-bold text-lg tracking-tight">Thorfinn University</span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Welcome to<br />Thorfinn University
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            Access your academic dashboard, courses, and campus updates — all in one place.
          </p>

          <div className="mt-10 flex gap-8">
            {[["12,000+", "Students"], ["200+", "Faculty"], ["95%", "Placement Rate"]].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-slate-400 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/images/favicon.png" alt="Thorfinn University" width={36} height={36} className="rounded-lg" />
              <span className="font-bold text-lg text-[#1e293b]">Thorfinn University</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-[#1e293b]">Welcome back</h2>
              <p className="text-slate-500 text-sm mt-1">Sign in to your university account</p>
            </div>

            {/* Demo accounts */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowDemo(!showDemo)}
                className="w-full flex items-center justify-between px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-colors bg-slate-50"
              >
                <span>🧪 Use a test account</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDemo ? "rotate-180" : ""}`} />
              </button>

              {showDemo && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100"
                >
                  {TEST_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      onClick={() => fillDemo(acc)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="text-slate-800 font-medium">{acc.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${ROLE_COLORS[acc.role]}`}>{acc.role}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input pr-11 focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary justify-center py-3 rounded-lg disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#1e3a8a] hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
