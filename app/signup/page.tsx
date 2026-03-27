"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const ROLES = ["Student", "Faculty", "Admin"];

export default function SignupPage() {
  const [form,     setForm]     = useState({ name: "", email: "", password: "", role: "Student" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signupError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, role: form.role } },
    });

    if (signupError) { setError(signupError.message); setLoading(false); return; }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id, name: form.name, email: form.email, role: form.role,
      });

      if (!data.session) {
        setError("Check your email to confirm your account, then sign in.");
        setLoading(false);
        return;
      }
      if (form.role === "Admin") router.push("/dashboard/admin");
      else if (form.role === "Faculty") router.push("/dashboard/faculty");
      else router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-[60%] relative flex-col justify-end p-16 overflow-hidden"
      >
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/s_Aerial_drone_shot_sweepi.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#1e293b]/75" />

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
            Begin Your<br />Academic Journey
          </h1>
          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            Join thousands of students, faculty, and alumni shaping the future at Thorfinn University.
          </p>

          <div className="mt-10 flex gap-8">
            {[["50+", "Programs"], ["1965", "Established"], ["100+", "Countries"]].map(([val, label]) => (
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
              <h2 className="text-2xl font-bold text-[#1e293b]">Create account</h2>
              <p className="text-slate-500 text-sm mt-1">Join the Thorfinn community</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="input focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="input focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm({ ...form, role })}
                      className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        form.role === role
                          ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                          : "bg-white text-slate-600 border-slate-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1e3a8a] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
