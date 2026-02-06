"use client";
import { motion } from "framer-motion";

export function ShowcaseApp() {
  return (
    <section className="py-32 bg-black text-white overflow-hidden">
       <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Mobile First</h2>
          <p className="text-white/60">Vertical Snap & Gestures</p>
       </div>
       <div className="flex justify-center gap-8 overflow-x-auto pb-8 snap-x px-6 no-scrollbar">
          {[1,2,3].map(i => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 overflow-hidden relative snap-center shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
               <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
               <div className="absolute top-1/2 left-0 right-0 text-center transform -translate-y-1/2">
                   <h3 className="text-2xl font-bold mb-2">Slide {i}</h3>
                   <p className="text-white/50 text-sm">Swipe interaction</p>
               </div>
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="w-12 h-12 bg-white rounded-full mb-4" />
                  <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-white/20 rounded" />
               </div>
            </motion.div>
          ))}
       </div>
    </section>
  );
}
