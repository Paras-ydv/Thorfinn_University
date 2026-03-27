"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const TEST_ACCOUNTS = [
  { label: "Admin — Arjun Mehta", email: "admin@thorfinn.test", password: "Thorfinn@Admin2025", role: "Admin" },
  { label: "Faculty — Dr. Priya Sharma", email: "faculty@thorfinn.test", password: "Thorfinn@Faculty2025", role: "Faculty" },
  { label: "Student — Rahul Verma", email: "student@thorfinn.test", password: "Thorfinn@Student2025", role: "Student" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const fillDemo = (acc: typeof TEST_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setShowDemo(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-dark rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-slate-900" />
              </div>
              <span className="gradient-text">Thorfinn</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 mt-4">Welcome Back</h1>
            <p className="text-slate-600 text-sm mt-1">Sign in to your university account</p>
          </div>

          {/* Demo accounts quick-fill */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center justify-between px-4 py-3 glass rounded-xl text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <span>🧪 Use a test account</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDemo ? "rotate-180" : ""}`} />
            </button>
            {showDemo && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 space-y-1"
              >
                {TEST_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className="w-full flex items-center justify-between px-4 py-3 glass rounded-xl text-sm hover:bg-slate-200 transition-colors text-left"
                  >
                    <span className="text-slate-900 font-medium">{acc.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      acc.role === "Admin" ? "bg-red-500/20 text-red-400" :
                      acc.role === "Faculty" ? "bg-violet-500/20 text-violet-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>{acc.role}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-slate-900 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
