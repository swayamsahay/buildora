"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Scale, Zap, ShieldCheck, Component } from "lucide-react";
import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Clarity",
    subtitle: "Signal over noise.",
    description: "We strip away the non-essential. Every pixel must earn its place. If it doesn't solve a problem, it's decoration.",
    icon: Zap,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    title: "Utility",
    subtitle: "Form follows function.",
    description: "Beauty is a byproduct of purpose. We design for outcomes, creating tools that empower users to achieve more.",
    icon: Scale,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  },
  {
    title: "Longevity",
    subtitle: "Built to last.",
    description: "Trends fade. Systems endure. We build robust, scalable foundations that grow with your business, not against it.",
    icon: ShieldCheck,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  },
  {
    title: "Modularity",
    subtitle: "Atomic design.",
    description: "Composability is key. We create flexible component architectures that allow for rapid iteration and infinite scalability.",
    icon: Component,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
  }
];

function PrincipleCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group relative p-8 md:p-12 border-l border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/30 transition-colors duration-500"
    >
       {/* Hover Indicator */}
       <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-900 dark:bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
       
       <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Icon Column */}
          <div className="flex-shrink-0">
             <motion.div 
                className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border transition-transform duration-500 will-change-transform transform-gpu", item.color)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ 
                   y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                   default: { duration: 0.2 }
                }}
             >
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
             </motion.div>
          </div>

          {/* Content Column */}
          <div className="flex-grow">
             <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-3xl md:text-4xl font-medium text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-500 dark:group-hover:from-white dark:group-hover:to-zinc-500 transition-all duration-300">
                    {item.title}
                </h3>
                <span className="text-sm font-mono text-zinc-500 uppercase tracking-widest hidden md:block">0{index + 1}</span>
             </div>
             
             <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-4">{item.subtitle}</p>
             <p className="text-base text-zinc-600 dark:text-zinc-500 leading-relaxed max-w-xl group-hover:text-zinc-900 dark:group-hover:text-zinc-400 transition-colors duration-300">
                {item.description}
             </p>
          </div>
       </div>
    </motion.div>
  );
}

export default function PhilosophySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative pt-24 pb-32 md:pt-32 md:pb-48 bg-gradient-to-b from-slate-50 to-zinc-50 dark:from-slate-950 dark:to-zinc-950 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]" />
         <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-zinc-50 dark:from-slate-950 dark:via-transparent dark:to-zinc-950" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sticky Header */}
          <div className="lg:col-span-4 relative">
             <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8 inline-flex items-center gap-2"
                >
                   <div className="w-8 h-[1px] bg-blue-500" />
                   <span className="text-xs uppercase tracking-[0.2em] text-blue-500 font-medium">Philosophy</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.9] mb-12"
                >
                  Design that <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    respects
                  </span> <br />
                  intelligence.
                </motion.h2>

                <motion.p 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                   className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm border-l-2 border-zinc-200 dark:border-zinc-800 pl-6"
                >
                   In a world of noise, we choose clarity. We believe that digital products should be quiet, intuitive, and ruthlessly effective.
                </motion.p>
             </div>
          </div>

          {/* Scrolling List */}
          <div className="lg:col-span-8">
             <div className="flex flex-col border-t border-b border-zinc-200 dark:border-zinc-800">
                {principles.map((item, index) => (
                   <PrincipleCard key={index} item={item} index={index} />
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
