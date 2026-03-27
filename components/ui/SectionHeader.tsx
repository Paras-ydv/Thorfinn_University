"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ badge, title, subtitle, className, align = "center" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      {badge && (
        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
