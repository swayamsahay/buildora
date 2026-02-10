"use client";

import { motion } from "framer-motion";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Blue orb */}
      <motion.div
        className="absolute -top-[25%] -left-[15%] w-[80vw] h-[80vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)",
        }}
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple orb */}
      <motion.div
        className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 65%)",
        }}
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 70, -40, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
