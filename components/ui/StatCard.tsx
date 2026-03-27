"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
  delay?: number;
  className?: string;
}

export function StatCard({ value, label, icon, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn("glass rounded-2xl p-6 text-center card-hover", className)}
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </motion.div>
  );
}
