
import React from "react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
       {/* Deep Void Base */}
       <div className="absolute inset-0 bg-background transition-colors duration-500" />
       
       {/* Aurora Beams - Optimized */}
       <div className="absolute -top-[50%] -left-[20%] w-[140%] h-[140%] opacity-40 will-change-transform [backface-visibility:hidden] translate-z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#3b82f6_180deg,transparent_270deg)] blur-[80px]" />
           <div className="absolute top-1/2 left-1/2 w-full h-full bg-[conic-gradient(from_180deg,transparent_0deg,transparent_90deg,#8b5cf6_180deg,transparent_270deg)] blur-[80px] -translate-x-1/2 -translate-y-1/2" />
       </div>
       
       {/* Noise Overlay */}
       <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E')] opacity-[0.05] mix-blend-overlay" />
       
       {/* Grid Mesh */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
    </div>
  );
}
