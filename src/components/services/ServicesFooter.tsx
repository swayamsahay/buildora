"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesFooter() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="relative py-32 px-6 flex items-center justify-center bg-black overflow-hidden border-t border-white/10">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
         <div 
           className="absolute inset-0 opacity-10 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
         />
         
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none">
           <motion.div 
             className="whitespace-nowrap text-[16vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-400 opacity-[0.08] drop-shadow-[0_0_8px_rgba(255,255,255,0.06)] transform-gpu"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             style={{ willChange: "transform" }}
           >
             LET&apos;S BUILD • INNOVATE • SCALE • LET&apos;S BUILD • INNOVATE • SCALE •
           </motion.div>
         </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
        >
          Ready to start?
        </motion.h2>
        
        <div 
          onMouseMove={handleMouseMove}
          className="group relative inline-flex flex-col items-center gap-6 p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
        >
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.1),
                  transparent 40%
                )
              `,
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap font-black text-[12vw] text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-orange-400 opacity-[0.06] transform-gpu"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform", maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
            >
              BUILDORA • BUILDORA • BUILDORA •
            </motion.div>
          </motion.div>
          
          <p className="text-xl text-zinc-400 max-w-lg">
            Let&apos;s build something extraordinary together.
          </p>
          
          <Link 
            href="/contact" 
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-zinc-300 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
