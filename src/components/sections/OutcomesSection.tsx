"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useSpring, useMotionValue } from "framer-motion";
import { Zap, Layers, BarChart3, ArrowUpRight, Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    id: "01",
    title: "Clearer Products",
    description: "Simplified interfaces that communicate purpose and reduce friction. We remove the noise so users can focus on the signal.",
    metric: "40",
    suffix: "%",
    metricLabel: "Reduction in user churn",
    icon: Activity,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-400/10",
    border: "border-blue-200 dark:border-blue-400/20",
    image: "bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-600/20 dark:to-indigo-900/40",
    highlight: "text-blue-600 dark:text-blue-400"
  },
  {
    id: "02",
    title: "Faster Execution",
    description: "Well-defined systems that reduce rework and speed up development. We build the machine that builds the product.",
    metric: "2",
    suffix: "x",
    metricLabel: "Dev velocity increase",
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-400/10",
    border: "border-amber-200 dark:border-amber-400/20",
    image: "bg-gradient-to-br from-amber-100/50 to-orange-100/50 dark:from-amber-600/20 dark:to-orange-900/40",
    highlight: "text-amber-600 dark:text-amber-400"
  },
  {
    id: "03",
    title: "Scalable Foundations",
    description: "Architecture and design decisions built to grow with your business. No more tearing it down to start over in 6 months.",
    metric: "99.9",
    suffix: "%",
    metricLabel: "System reliability",
    icon: Layers,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-400/10",
    border: "border-emerald-200 dark:border-emerald-400/20",
    image: "bg-gradient-to-br from-emerald-100/50 to-teal-100/50 dark:from-emerald-600/20 dark:to-teal-900/40",
    highlight: "text-emerald-600 dark:text-emerald-400"
  }
];

function Counter({ value, suffix }: { value: string, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isFloat = value.includes(".");

  useEffect(() => {
    if (isInView) {
      motionValue.set(parseFloat(value));
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = isFloat ? latest.toFixed(1) + suffix : Math.round(latest) + suffix;
      }
    });
  }, [springValue, suffix, isFloat]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export default function OutcomesSection() {
  const [activeId, setActiveId] = useState<string>("01");

  const iconAnimations: Record<string, import("framer-motion").TargetAndTransition> = {
    "01": { 
      scale: [1, 1.2, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    "02": { 
      scale: [1, 1.1, 1],
      opacity: [1, 0.5, 1], // Replaced expensive filter: brightness with opacity
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }
    },
    "03": { 
      y: [0, -4, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative py-32 px-6 md:px-12 bg-background overflow-hidden min-h-[800px] flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto w-full h-full">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                (06) Outcomes
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white max-w-2xl"
            >
              Measured by <span className="text-zinc-400 dark:text-zinc-600">Impact.</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-sm text-zinc-500 font-mono uppercase tracking-wider"
          >
            <ArrowUpRight className="w-4 h-4" />
            Hover to expand
          </motion.div>
        </div>

        {/* Interactive Accordion Layout */}
        <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px]">
          {outcomes.map((item) => {
            const isActive = activeId === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform transform-gpu",
                  isActive ? "md:flex-[3] flex-[3]" : "md:flex-[1] flex-[1] bg-white border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900/20 dark:border-transparent dark:hover:bg-zinc-900/40"
                )}
              >
                {/* Background Image/Gradient */}
                <div className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  isActive ? "opacity-100" : "opacity-0"
                )}>
                    <div className={cn("absolute inset-0", item.image)} />
                    <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/20 backdrop-blur-[2px]" />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-8 md:p-10">
                  {/* Top Row: Icon & ID */}
                  <div className="flex justify-between items-start mb-auto">
                    <div className={cn(
                      "p-3 rounded-full border backdrop-blur-md transition-all duration-500",
                      isActive 
                        ? "bg-white border-zinc-200 text-zinc-900 shadow-sm dark:bg-white/10 dark:border-white/20 dark:text-white dark:shadow-none" 
                        : "bg-zinc-100 border-zinc-200 text-zinc-600 dark:bg-zinc-800/50 dark:border-zinc-700/50 dark:text-zinc-500"
                    )}>
                      <motion.div
                        animate={isActive ? iconAnimations[item.id as keyof typeof iconAnimations] : {}}
                        className="will-change-transform transform-gpu"
                      >
                        <item.icon className="w-6 h-6" />
                      </motion.div>
                    </div>
                    <span className={cn(
                      "text-sm font-mono transition-colors duration-500",
                      isActive ? "text-zinc-500 dark:text-white/60" : "text-zinc-400 dark:text-zinc-600"
                    )}>
                      {item.id}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      layout="position"
                      className={cn(
                        "font-medium tracking-tight transition-all duration-500 will-change-transform transform-gpu",
                        isActive ? "text-3xl md:text-5xl text-zinc-900 dark:text-white mb-2" : "text-xl text-zinc-500 dark:text-zinc-400 rotate-0 md:-rotate-90 md:origin-bottom-left md:translate-y-20 md:translate-x-4 md:whitespace-nowrap"
                      )}
                    >
                      {item.title}
                    </motion.h3>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="will-change-transform transform-gpu"
                        >
                          <p className="text-lg md:text-xl text-zinc-600 dark:text-white/80 max-w-md font-light leading-relaxed mb-8">
                            {item.description}
                          </p>
                          
                          {/* Metric Badge */}
                          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:shadow-none backdrop-blur-md">
                             <div className={cn("text-3xl md:text-4xl font-bold tracking-tighter", item.highlight)}>
                                <Counter value={item.metric} suffix={item.suffix} />
                             </div>
                             <div className="h-8 w-px bg-zinc-200 dark:bg-white/10" />
                             <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-white/50 max-w-[80px] leading-tight">
                                {item.metricLabel}
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
