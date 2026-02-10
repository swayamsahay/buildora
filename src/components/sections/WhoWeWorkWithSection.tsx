"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Rocket, Building2, Triangle, Circle, Square, Hexagon, Octagon, Diamond, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const clients = [
  {
    id: "01",
    label: "Founders",
    title: "Visionary Founders",
    subtitle: "From Zero to One",
    description: "Defining the first product with clarity and purpose. We help turn chaos into a structured, launch-ready MVP that investors love.",
    icon: Users,
    features: ["MVP Definition", "Pitch Deck Design", "Rapid Prototyping"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "02",
    label: "Startups",
    title: "Scaling Startups",
    subtitle: "Growth & Optimization",
    description: "Redesigning for scale without losing your soul. We optimize workflows, elevate the visual language, and reduce technical debt.",
    icon: Rocket,
    features: ["Design Systems", "Conversion Optimization", "Brand Evolution"],
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    id: "03",
    label: "Enterprise",
    title: "Enterprise Teams",
    subtitle: "Modernization & Innovation",
    description: "Breaking free from legacy bloat. We inject startup velocity into established organizations and modernize complex systems.",
    icon: Building2,
    features: ["Legacy Modernization", "Internal Tools", "Accessibility Audits"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  }
];

const logos = [
  { name: "Vertex", icon: Triangle },
  { name: "Orbit", icon: Circle },
  { name: "Block", icon: Square },
  { name: "Hexa", icon: Hexagon },
  { name: "Octa", icon: Octagon },
  { name: "Gem", icon: Diamond },
  { name: "Spark", icon: Star },
  { name: "Prism", icon: Triangle },
  { name: "Sphere", icon: Circle },
  { name: "Cube", icon: Square },
  { name: "Hive", icon: Hexagon },
  { name: "Pulse", icon: Octagon },
];

export default function WhoWeWorkWithSection() {
  const [activeId, setActiveId] = useState("01");

  const activeClient = clients.find(c => c.id === activeId) || clients[0];

  return (
    <section className="pt-32 pb-0 md:pt-48 md:pb-0 px-6 md:px-12 relative overflow-hidden bg-background">
      
      {/* Modern Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-background" />
          
          {/* Moving Gradient Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3], 
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" 
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-24">
           <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 block mb-6"
           >
              (02) The Ecosystem
           </motion.span>
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
           >
              Built for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-600">
                 boldest minds.
              </span>
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: 3D Perspective Menu */}
          <div className="lg:col-span-5 flex flex-col gap-4 perspective-[1000px]">
             {clients.map((client) => (
                <motion.button
                   key={client.id}
                   onClick={() => setActiveId(client.id)}
                   onMouseEnter={() => setActiveId(client.id)}
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: Number(client.id) * 0.1 }}
                   className={cn(
                      "group relative text-left p-6 md:p-8 rounded-xl border transition-all duration-500 ease-out",
                      activeId === client.id 
                        ? "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 shadow-2xl translate-x-4 scale-105" 
                        : "bg-transparent border-transparent hover:bg-zinc-100/50 hover:border-zinc-300 dark:hover:bg-zinc-900/50 dark:hover:border-zinc-800 opacity-60 hover:opacity-100"
                   )}
                >
                   <div className="flex items-center justify-between">
                      <div>
                         <span className={cn(
                            "text-xs font-mono mb-2 block transition-colors duration-300",
                            activeId === client.id ? client.color : "text-zinc-600 dark:text-zinc-500"
                         )}>
                            {client.id}
                         </span>
                         <h3 className={cn(
                            "text-3xl font-medium transition-colors duration-300",
                            activeId === client.id ? "text-foreground" : "text-zinc-600 dark:text-zinc-400"
                         )}>
                            {client.label}
                         </h3>
                      </div>
                      
                      <motion.div 
                        animate={{ 
                           x: activeId === client.id ? 0 : -10,
                           opacity: activeId === client.id ? 1 : 0
                        }}
                        className={cn("hidden md:block", client.color)}
                      >
                         <ArrowRight className="w-6 h-6" />
                      </motion.div>
                   </div>
                   
                   {/* Active Indicator Line */}
                   <motion.div 
                      layoutId="activeLine"
                      className={cn(
                         "absolute left-0 top-6 bottom-6 w-1 rounded-r-full transition-colors duration-300",
                         activeId === client.id ? client.color.replace('text-', 'bg-') : "bg-transparent"
                      )}
                   />
                </motion.button>
             ))}
          </div>

          {/* Right Column: Holographic Preview Card */}
          <div className="lg:col-span-7 sticky top-32">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeId}
                   initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                   transition={{ duration: 0.4, ease: "circOut" }}
                   style={{ willChange: "transform, opacity, filter" }}
                   className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl shadow-2xl"
                >
                   {/* Decorative Gradients */}
                   <div className={cn("absolute top-0 right-0 w-96 h-96 opacity-20 blur-[80px] rounded-full pointer-events-none transition-colors duration-500", activeClient.bg.replace('/10', ''))} />
                   
                   <div className="p-8 md:p-12 relative z-10">
                      <div className="flex items-start justify-between mb-8">
                         <motion.div 
                            className={cn("p-4 rounded-2xl border transition-colors duration-500", activeClient.bg, activeClient.border)}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         >
                            <activeClient.icon className={cn("w-8 h-8", activeClient.color)} strokeWidth={1.5} />
                         </motion.div>
                         <div className="px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
                            {activeClient.subtitle}
                         </div>
                      </div>

                      <h3 className="text-4xl font-medium text-foreground mb-6">
                         {activeClient.title}
                      </h3>
                      
                      <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-lg">
                         {activeClient.description}
                      </p>

                      <div className="space-y-4">
                         {activeClient.features.map((feature, i) => (
                            <motion.div 
                               key={feature}
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               whileHover={{ 
                                  x: 5, 
                                  scale: 1.02,
                                  transition: { duration: 0.2, delay: 0 }
                               }}
                               transition={{ 
                                  delay: 0.2 + (i * 0.1) 
                               }}
                               className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 cursor-default"
                            >
                               <CheckCircle2 className={cn("w-5 h-5", activeClient.color)} />
                               <span className="text-base font-medium">{feature}</span>
                            </motion.div>
                         ))}
                      </div>
                   </div>

                   {/* Card Footer Texture */}
                   <div className="h-2 w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_32px] pointer-events-none" />
                </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Marquee Footer */}
        <div className="mt-32 pt-12 border-t border-zinc-200/50 dark:border-zinc-800/50">
           <p className="text-center text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-12 uppercase tracking-widest">
              Trusted by forward-thinking teams
           </p>
           
           <div 
             className="relative flex overflow-hidden mask-linear-fade"
             style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
           >
             <motion.div 
               animate={{ x: "-50%" }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="flex gap-16 md:gap-24 whitespace-nowrap pr-16 md:pr-24 will-change-transform transform-gpu"
             >
               {[...logos, ...logos].map((logo, i) => (
                <motion.div 
                   key={i} 
                   className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group"
                   whileHover={{ scale: 1.1, y: -5 }}
                >
                  <logo.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{logo.name}</span>
                </motion.div>
              ))}
             </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
}

