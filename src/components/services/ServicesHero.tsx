"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesHero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black/80 z-10" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0 opacity-40 will-change-transform transform-gpu"
        >
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 text-sm font-mono tracking-[0.2em] text-blue-400 uppercase"
        >
          Our Expertise
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Building the<br />Impossible.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          We merge strategic insight with world-class engineering to deliver digital products that scale.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
