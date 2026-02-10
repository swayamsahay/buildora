"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#3b82f615,transparent)]" />
    </div>
  );
}

function SpotlightButton({ children, href }: { children: React.ReactNode; href: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden transition-colors hover:border-zinc-600"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.4),
              transparent 80%
            )
          `,
        }}
      />
      <span className="relative z-10 font-medium text-white flex items-center gap-2">
        {children}
      </span>
    </Link>
  );
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-24">
      <GridBackground />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left Column: Typography */}
        <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.9] mb-8">
                  BUILD<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                    THE FUTURE
                  </span>
                </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed mb-12"
            >
              We craft digital experiences that define industries. 
              Don&apos;t just compete. Dominate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <SpotlightButton href="/contact">
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </SpotlightButton>
              <Link 
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Explore Services
              </Link>
            </motion.div>
        </div>

        {/* Right Column: Interactive Card Stack / Visual */}
        <motion.div 
            style={{ y }}
            className="relative hidden lg:block h-[600px] w-full"
        >
            {/* Abstract Floating Cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px]">
                {/* Card 3 (Back) */}
                <motion.div 
                    animate={{ rotate: -6, y: -20 }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute inset-0 bg-white border-zinc-200 dark:bg-zinc-900 rounded-3xl dark:border-zinc-800 shadow-2xl opacity-60 scale-90 will-change-transform transform-gpu"
                />
                {/* Card 2 (Middle) */}
                <motion.div 
                    animate={{ rotate: 3, y: -10 }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-0 bg-zinc-50 border-zinc-200 dark:bg-zinc-800 rounded-3xl dark:border-zinc-700 shadow-2xl opacity-80 scale-95 will-change-transform transform-gpu"
                />
                {/* Card 1 (Front) */}
                <div className="absolute inset-0 bg-white border-zinc-200 dark:bg-zinc-950 rounded-3xl dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-2/3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 relative">
                        <div 
                          className="absolute inset-0 opacity-20" 
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                        />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-md border border-blue-500/30">
                                <CheckCircle2 className="text-blue-500 dark:text-blue-400 w-6 h-6" />
                            </div>
                            <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-2" />
                            <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                        </div>
                    </div>
                    <div className="h-1/3 p-6 flex flex-col justify-center bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-mono text-zinc-500">PROJECT_ID_09</span>
                            <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20">Active</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: "75%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-blue-500" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </motion.div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
