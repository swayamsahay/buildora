"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 20]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0B0B0C]"
    >
      {/* 
        Subtle Noise Overlay
        - OPTIMIZED: Reduced octaves to 1 for performance
        - Removed expensive mix-blend-mode, used simple opacity
      */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-[20] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 
        Gradient 1: Electric Cyan (Top Left)
        - Added transform-3d for GPU acceleration
      */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-3xl will-change-transform transform-gpu translate-z-0"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 255, 0.04) 0%, transparent 60%)",
          y: y1,
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 
        Gradient 2: Deep Indigo/Cyan (Center Right)
        - Anchors the composition
        - Moves opposite to scroll (parallax)
      */}
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-3xl will-change-transform transform-gpu"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%)",
          y: y2,
          rotate: rotate,
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* 
        Gradient 3: Ambient Bottom Glow
        - subtle fill for depth
      */}
      <motion.div
        className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full blur-3xl will-change-transform transform-gpu"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 60%)",
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Vignette to focus attention */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0C_90%)] z-[10]" />
    </div>
  );
}
