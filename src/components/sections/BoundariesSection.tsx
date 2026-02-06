"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Bandage, AlertCircle, ArrowRight } from "lucide-react";

const signals = [
  {
    id: "01",
    icon: Clock,
    title: "Rushed Timelines",
    description: "Where clarity is sacrificed for speed. We believe great work takes time to incubate and mature. Rushing leads to technical debt and poor user experiences."
  },
  {
    id: "02",
    icon: TrendingUp,
    title: "Trend-Driven Design",
    description: "Chasing the latest fad instead of solving the core user problem. We design for longevity, not likes. Trends fade; utility and clarity remain."
  },
  {
    id: "03",
    icon: Users,
    title: "Unclear Ownership",
    description: "Projects without decisive leadership or unified vision. We need a partner who can say 'yes' or 'no' with confidence to keep momentum moving forward."
  },
  {
    id: "04",
    icon: Bandage,
    title: "Surface-Level Fixes",
    description: "Band-aids intended to mask deeper structural or product issues. We solve root causes, not symptoms. We build for the foundation, not the facade."
  }
];

export default function BoundariesSection() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative pt-32 pb-32 -mt-32 px-6 md:px-12 bg-background text-zinc-900 dark:text-zinc-50 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.03),transparent_70%)]"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-5 sticky top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex items-center justify-center w-10 h-10">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                    <AlertCircle className="relative w-5 h-5 text-red-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Boundaries
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8">
                We decline <br />
                <span className="text-zinc-400 dark:text-zinc-600">to protect quality.</span>
              </h2>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                Great outcomes require shared values. We politely walk away from projects that show these warning signals to ensure our team focuses on work that matters.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive List */}
          <div ref={containerRef} className="lg:col-span-7 flex flex-col">
            {signals.map((signal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative border-b border-zinc-200 dark:border-zinc-800/50 group cursor-default"
                layout
              >
                <motion.div layout className="py-10 transition-all duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                            <span className={`text-sm font-mono transition-colors duration-300 ${hoveredIndex === index ? "text-red-500" : "text-zinc-400 dark:text-zinc-700"}`}>
                                {signal.id}
                            </span>
                            <h3 className={`text-3xl md:text-4xl font-medium transition-colors duration-300 ${hoveredIndex === index ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-600"}`}>
                                {signal.title}
                            </h3>
                        </div>
                        <motion.div
                            animate={{ 
                                rotate: hoveredIndex === index ? -45 : 0,
                                opacity: hoveredIndex === index ? 1 : 0.2,
                                scale: hoveredIndex === index ? 1.1 : 0.8,
                                x: hoveredIndex === index ? 5 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="text-red-500 will-change-transform transform-gpu"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={false}
                        animate={{
                            height: hoveredIndex === index ? "auto" : 0,
                            opacity: hoveredIndex === index ? 1 : 0,
                            marginBottom: hoveredIndex === index ? 16 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pl-[3.25rem] md:pl-[3.5rem] flex items-start gap-6">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: hoveredIndex === index ? 48 : 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="w-px bg-gradient-to-b from-red-500/50 to-transparent hidden md:block"
                            />
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                                {signal.description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
                
                {/* Hover Progress Line */}
                <motion.div 
                    className="absolute bottom-0 left-0 h-[1px] bg-red-500"
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
