"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import type { FacultyMember, LeadershipMember } from "@/lib/facultyData";

/* ── shared modal ── */
type ModalProps = {
  name: string;
  designation: string;
  specialization?: string;
  email: string;
  img: string;
  bio: string;
  publications?: number;
  experience?: string;
  education?: string;
  onClose: () => void;
};

function Modal({ name, designation, specialization, email, img, bio, publications, experience, education, onClose }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl"
      >
        {/* Top banner */}
        <div className="relative h-28 bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <Image src={img} alt={name} fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 px-6 pb-6">
          <h2 className="font-serif text-xl font-bold text-slate-900 leading-tight">{name}</h2>
          <p className="text-sm font-semibold text-[#1e3a8a] mt-0.5">{designation}</p>
          {specialization && (
            <p className="text-xs text-slate-500 mt-0.5">{specialization}</p>
          )}

          {/* Meta pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {experience && (
              <span className="flex items-center gap-1.5 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                <Briefcase className="w-3 h-3" />{experience} experience
              </span>
            )}
            {publications !== undefined && (
              <span className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                <BookOpen className="w-3 h-3" />{publications} publications
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-4 border-t border-slate-100 pt-4">{bio}</p>

          {education && (
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Education</p>
              <p className="flex items-start gap-2 text-sm text-slate-700">
                <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                {education}
              </p>
            </div>
          )}

          <a
            href={`mailto:${email}`}
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#1e3a8a] hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />{email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Faculty table row (used in dept pages) ── */
export function FacultyRow({ member }: { member: FacultyMember }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => setOpen(true)}
        className="cursor-pointer hover:bg-blue-50 transition-colors"
      >
        <td>
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-200">
              <Image src={member.img} alt={member.name} fill className="object-cover" />
            </div>
            <span className="font-medium text-slate-900">{member.name}</span>
          </div>
        </td>
        <td className="text-slate-600">{member.designation}</td>
        <td><span className="badge-gray">{member.specialization}</span></td>
      </tr>
      <AnimatePresence>
        {open && <Modal {...member} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ── HoD sidebar card (used in dept pages) ── */
export function HoDCard({ member, email }: { member: FacultyMember; email: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left flex items-start gap-3 group"
      >
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-200 group-hover:ring-[#1e3a8a] transition-all">
          <Image src={member.img} alt={member.name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm group-hover:text-[#1e3a8a] transition-colors">{member.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">Head of Department</p>
          <p className="flex items-center gap-1 text-xs text-[#1e3a8a] mt-1.5">
            <Mail className="w-3 h-3" />{email}
          </p>
        </div>
      </button>
      <AnimatePresence>
        {open && <Modal {...member} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

/* ── Leadership card (used in about page) ── */
export function LeadershipCard({ member }: { member: LeadershipMember }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="card p-5 flex items-start gap-4 w-full text-left group hover:shadow-md transition-shadow"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-slate-200 group-hover:ring-[#1e3a8a] transition-all">
          <Image src={member.img} alt={member.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 group-hover:text-[#1e3a8a] transition-colors">{member.name}</p>
          <p className="text-xs text-[#1e3a8a] font-medium mt-0.5">{member.role}</p>
          <p className="text-xs text-slate-500 mt-0.5">{member.dept}</p>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <Modal
            {...member}
            designation={member.role}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
