"use client";

import { deptVideos } from "@/lib/deptVideos";

interface DeptVideoProps {
  dept: string;
  className?: string;
}

export function DeptVideo({ dept, className = "" }: DeptVideoProps) {
  const src = deptVideos[dept];

  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 text-slate-400 text-sm ${className}`}>
        Video not available
      </div>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={`w-full h-full object-cover object-center ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
