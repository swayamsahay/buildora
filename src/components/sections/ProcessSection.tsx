"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Search, Map, Palette, Code, Sliders, Rocket } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Discover",
    description: "We dive deep into your business ecosystem to uncover the core challenges and opportunities.",
    icon: Search,
    color: "cyan",
    styles: {
        bg: "bg-cyan-500",
        border: "border-cyan-500",
        text: "text-cyan-600 dark:text-cyan-400",
        shadow: "shadow-cyan-500",
        from: "from-cyan-500",
        to: "to-cyan-500"
    }
  },
  {
    id: "02",
    title: "Strategy",
    description: "Building the roadmap. We define the technical architecture and design direction.",
    icon: Map,
    color: "violet",
    styles: {
        bg: "bg-violet-500",
        border: "border-violet-500",
        text: "text-violet-600 dark:text-violet-400",
        shadow: "shadow-violet-500",
        from: "from-violet-500",
        to: "to-violet-500"
    }
  },
  {
    id: "03",
    title: "Design",
    description: "Crafting the interface. Every pixel is placed with purpose and precision.",
    icon: Palette,
    color: "pink",
    styles: {
        bg: "bg-pink-500",
        border: "border-pink-500",
        text: "text-pink-600 dark:text-pink-400",
        shadow: "shadow-pink-500",
        from: "from-pink-500",
        to: "to-pink-500"
    }
  },
  {
    id: "04",
    title: "Build",
    description: "Engineering the solution. Clean, scalable code using modern frameworks.",
    icon: Code,
    color: "emerald",
    styles: {
        bg: "bg-emerald-500",
        border: "border-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
        shadow: "shadow-emerald-500",
        from: "from-emerald-500",
        to: "to-emerald-500"
    }
  },
  {
    id: "05",
    title: "Refine",
    description: "Polishing the experience. Rigorous testing and iteration for a flawless launch.",
    icon: Sliders,
    color: "amber",
    styles: {
        bg: "bg-amber-500",
        border: "border-amber-500",
        text: "text-amber-600 dark:text-amber-400",
        shadow: "shadow-amber-500",
        from: "from-amber-500",
        to: "to-amber-500"
    }
  },
  {
    id: "06",
    title: "Launch",
    description: "Deploying to the world. We ensure stability and provide ongoing support.",
    icon: Rocket,
    color: "blue",
    styles: {
        bg: "bg-blue-500",
        border: "border-blue-500",
        text: "text-blue-600 dark:text-blue-400",
        shadow: "shadow-blue-500",
        from: "from-blue-500",
        to: "to-blue-500"
    }
  }
];

const NeonCard = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className={`relative flex items-center ${isEven ? "justify-start md:justify-end" : "justify-start"} md:w-1/2 w-full mb-24 md:mb-48 transform-gpu`}
    >
      {/* Mobile Timeline Node (hidden on desktop) */}
      <div className="absolute left-[-29px] md:hidden w-14 h-14 rounded-full bg-background border-2 border-muted flex items-center justify-center z-10">
         <div className={`w-4 h-4 rounded-full ${step.styles.bg} shadow-[0_0_10px_var(--tw-shadow-color)] ${step.styles.shadow}`} />
      </div>

      <div className={`relative w-full md:w-[80%] p-1 rounded-3xl overflow-hidden group`}>
        {/* Animated Neon Border */}
        <motion.div 
            style={{ opacity: glowOpacity }}
            className={`absolute inset-0 bg-gradient-to-r ${step.styles.from} via-white ${step.styles.to} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`} 
        />
        
        <div className="relative bg-white dark:bg-black/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-[22px] p-8 md:p-10 overflow-hidden">
            {/* Inner Glow */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 ${step.styles.bg}/20 blur-[100px] rounded-full pointer-events-none`} />
            <div className={`absolute -bottom-20 -left-20 w-64 h-64 ${step.styles.bg}/10 blur-[100px] rounded-full pointer-events-none`} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <motion.div 
                        className={`p-4 rounded-2xl ${step.styles.bg}/10 border ${step.styles.border}/20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] ${step.styles.shadow}/30`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{ 
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: index * 0.2
                            }}
                        >
                            <step.icon className={`w-8 h-8 ${step.styles.text} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
                        </motion.div>
                    </motion.div>
                    <span className="text-5xl font-mono font-bold text-zinc-900/5 dark:text-white/5 tracking-tighter">
                        {step.id}
                    </span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-600 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all duration-300">
                    {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    {step.description}
                </p>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-background pt-32 pb-32 overflow-hidden">
      {/* Ambient Neon Background */}
      <div className="absolute inset-0">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full mix-blend-screen opacity-30 animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full mix-blend-screen opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            >
                ( The Process )
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight"
            >
                From chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">clarity.</span>
            </motion.h2>
        </div>

        <div ref={containerRef} className="relative flex flex-col md:items-center">
            {/* Central Timeline Line (Desktop) */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-white/5 transform md:-translate-x-1/2">
                <motion.div 
                    style={{ height }}
                    className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                />
            </div>

            {steps.map((step, index) => (
                <div key={step.id} className={`flex w-full ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} relative pl-12 md:pl-0`}>
                    
                    {/* Desktop Timeline Node */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-zinc-200 dark:border-white/20 z-20 items-center justify-center">
                        <motion.div 
                           initial={{ scale: 0 }}
                           whileInView={{ scale: 1 }}
                           transition={{ duration: 0.5, delay: 0.2 }}
                           className={`w-full h-full rounded-full ${step.styles.bg} shadow-[0_0_15px_var(--tw-shadow-color)] ${step.styles.shadow}`} 
                        />
                    </div>

                    <NeonCard step={step} index={index} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
