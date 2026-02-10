"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

function MagneticButton({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
    return (
        <div>
            <Link 
                href={href}
                className={className}
            >
                {children}
            </Link>
        </div>
    )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
        ref={containerRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
       <AnimatedBackground />

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Typography */}
            <div 
              className="flex flex-col items-start text-left"
            >
                <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 tracking-wide uppercase">System v2.0 Live</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.9]">
                    <span 
                        className="block text-slate-700 dark:text-slate-100"
                    >
                        Crafting
                    </span>
                    <span 
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-sky-600 dark:from-blue-400 dark:via-purple-400 dark:to-sky-400"
                    >
                        Digital Reality.
                    </span>
                </h1>

                <p 
                    className="max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 font-light"
                >
                    We architect high-performance digital ecosystems for ambitious brands. 
                    Where precision engineering meets world-class aesthetics.
                </p>

                <div 
                    className="flex flex-wrap items-center gap-6"
                >
                    <MagneticButton 
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-950 rounded-full font-bold text-base transition-all hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                    >
                        Start Project
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </MagneticButton>
                    
                    <Link href="/services" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                        Explore Services
                        <div className="w-8 h-[1px] bg-slate-300 group-hover:bg-slate-900 dark:bg-slate-700 dark:group-hover:bg-white transition-colors" />
                    </Link>
                </div>
            </div>

            {/* Right Column: 3D Visual */}
            <div className="relative hidden lg:block perspective-[1000px] h-[600px] w-full flex items-center justify-center">
                <div 
                    className="relative w-full max-w-md aspect-square will-change-transform transform-gpu"
                >
                    {/* Back Card (Glow) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-[60px] opacity-40" />
                    
                    {/* Main Card (Glass) */}
                    <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
                        {/* Internal Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        
                        {/* Header UI */}
                        <div className="relative z-10 flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-6">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">buildora.config.ts</div>
                        </div>

                        {/* Content UI */}
                        <div className="relative z-10 flex-1 py-8 font-mono text-sm space-y-4">
                            <div className="flex gap-4 text-slate-500">
                                <span>01</span>
                                <span className="text-purple-600 dark:text-purple-400">import</span>
                                <span className="text-slate-700 dark:text-slate-300">{`{ Future }`}</span>
                                <span className="text-purple-600 dark:text-purple-400">from</span>
                                <span className="text-green-600 dark:text-green-400">&apos;@buildora/core&apos;</span>
                            </div>
                            <div className="flex gap-4 text-slate-500">
                                <span>02</span>
                                <span className="text-purple-400">const</span>
                                <span className="text-blue-400">vision</span>
                                <span className="text-slate-300">=</span>
                                <span className="text-yellow-400">new</span>
                                <span className="text-yellow-300">Reality()</span>
                            </div>
                            <div className="flex gap-4 text-slate-500">
                                <span>03</span>
                                <span className="text-slate-300">vision.</span>
                                <span className="text-blue-300">optimize</span>
                                <span className="text-slate-300">({`{`}</span>
                            </div>
                            <div className="flex gap-4 text-slate-500 pl-8">
                                <span>04</span>
                                <span className="text-slate-400">performance:</span>
                                <span className="text-orange-400">&apos;max&apos;</span>
                                <span className="text-slate-300">,</span>
                            </div>
                            <div className="flex gap-4 text-slate-500 pl-8">
                                <span>05</span>
                                <span className="text-slate-400">aesthetics:</span>
                                <span className="text-orange-400">&apos;premium&apos;</span>
                            </div>
                            <div className="flex gap-4 text-slate-500">
                                <span>06</span>
                                <span className="text-slate-300">{`})`}</span>
                            </div>
                        </div>

                        {/* Footer UI */}
                        <div className="relative z-10 pt-6 border-t border-white/5 flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 w-full"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500">Compiling...</span>
                             </div>
                             <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] border border-green-500/20">
                                No Errors
                             </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div 
                        className="absolute -right-8 -top-8 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-md z-20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <div className="w-5 h-5 bg-blue-500 rounded-full" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Traffic</div>
                                <div className="text-lg font-bold text-white">+142%</div>
                            </div>
                        </div>
                    </div>

                    <div 
                        className="absolute -left-8 -bottom-8 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-xl backdrop-blur-md z-20"
                    >
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <div className="w-5 h-5 bg-purple-500 rounded-md rotate-45" />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400">Conversion</div>
                                <div className="text-lg font-bold text-white">8.4%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
       </div>
       
       {/* Scroll Indicator */}
       <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
       >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
       </div>
    </section>
  );
}

