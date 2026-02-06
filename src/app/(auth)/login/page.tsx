"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Mail, ScanFace } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useRef } from "react";
import { Magnetic, TextShift } from "@/components/ui/Interactions";

function GlowingInput({ id, type, label, icon: Icon, placeholder }: { id: string, type: string, label: string, icon: any, placeholder: string }) {
  return (
    <div className="group relative space-y-2">
      <label htmlFor={id} className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 ml-1 group-focus-within:text-blue-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-neutral-700 focus:outline-none focus:bg-white/10 transition-all duration-300"
          required
        />
        {/* Animated Bottom Border */}
        <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-blue-500 -translate-x-full group-focus-within:translate-x-0 transition-transform duration-500 ease-out" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  return (
    <div className="w-full perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <TextShift text="Back to Base" />
        </Link>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          filter: useMotionTemplate`brightness(${brightness})`,
          transformStyle: "preserve-3d",
        }}
        className="relative p-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 shadow-2xl backdrop-blur-xl border border-white/10 overflow-hidden group/card"
      >
        {/* Dynamic Highlight Gradient */}
        <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ transform: "translateZ(-1px)" }} 
        />
        
        <div className="relative bg-black/40 rounded-[1.8rem] p-8 md:p-12 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
            {/* Header */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <ScanFace className="w-6 h-6 text-white/80" />
                </div>
                <h1 className="text-3xl font-medium tracking-tight text-white mb-2">
                    <TextShift text="Identity Verified" />
                </h1>
                <p className="text-neutral-400 text-sm max-w-[250px] mx-auto">
                    Secure access terminal. Please authenticate.
                </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <GlowingInput 
                    id="email" 
                    type="email" 
                    label="User Identity" 
                    icon={Mail} 
                    placeholder="agent@buildora.com" 
                />
                
                <div className="space-y-2">
                    <GlowingInput 
                        id="password" 
                        type="password" 
                        label="Access Key" 
                        icon={Lock} 
                        placeholder="••••••••" 
                    />
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-[10px] text-neutral-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-mono"
                        >
                            Lost Key?
                        </Link>
                    </div>
                </div>

                <div className="pt-6">
                    <Magnetic strength={0.2}>
                        <button 
                            type="submit" 
                            className="group relative w-full flex items-center justify-center gap-2 bg-white text-black h-14 rounded-xl font-bold text-sm overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                Authenticate
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </button>
                    </Magnetic>
                </div>
            </form>

            <div className="mt-10 text-center">
                <p className="text-neutral-500 text-xs">
                    No clearance?{" "}
                    <Link href="/signup" className="text-white hover:text-blue-400 transition-colors font-bold ml-1 border-b border-transparent hover:border-blue-400 pb-0.5">
                        Request Access
                    </Link>
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
