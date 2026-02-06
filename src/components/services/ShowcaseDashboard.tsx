"use client";
import { motion } from "framer-motion";

export function ShowcaseDashboard() {
  return (
    <section className="py-32 bg-background flex flex-col items-center overflow-hidden">
      <div className="container px-6 mb-12 text-center">
         <h2 className="text-3xl font-bold text-foreground mb-4">Complex Interfaces</h2>
         <p className="text-muted-foreground">Dashboard & Data Visualization</p>
      </div>

      <div className="container px-6">
        <motion.div 
          initial={{ opacity: 0, rotateX: 10, y: 50 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto aspect-video bg-zinc-950 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex"
        >
          {/* Sidebar */}
          <div className="w-64 border-r border-zinc-800 p-6 hidden md:block bg-zinc-900/50">
            <div className="w-8 h-8 bg-blue-500 rounded-full mb-8" />
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-4 w-full bg-zinc-800 rounded animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />
              ))}
            </div>
          </div>
          {/* Main */}
          <div className="flex-1 p-8 bg-zinc-950">
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-32 bg-zinc-800 rounded" />
                <div className="h-8 w-8 bg-zinc-800 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[1,2,3].map(i => (
                 <motion.div 
                   key={i}
                   initial={{ scale: 0.9, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                   className="h-32 bg-zinc-900 rounded-lg border border-zinc-800 p-4 hover:border-zinc-700 transition-colors"
                 >
                   <div className="w-8 h-8 bg-zinc-800 rounded-full mb-4" />
                   <div className="w-1/2 h-4 bg-zinc-800 rounded" />
                 </motion.div>
              ))}
            </div>
            <div className="h-48 bg-zinc-900 rounded-lg border border-zinc-800" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
