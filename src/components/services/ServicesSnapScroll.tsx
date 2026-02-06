"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Palette, 
  Globe, 
  Lightbulb, 
  Rocket, 
  Zap, 
  Database, 
  Handshake,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Data from ServicesSection.tsx
const NOISE_BG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

const services = [
  {
    id: "01",
    title: "Product Strategy & Consulting",
    description: "Defining the roadmap to success. Market analysis and product vision aligned with business goals.",
    color: "from-blue-500 to-indigo-500",
    bg: "bg-blue-950",
    icon: Lightbulb,
    tags: ["Roadmap", "Market Fit", "Growth"],
    image: "/images/product.svg",
  },
  {
    id: "02",
    title: "Website & Web App Development",
    description: "High-performance digital experiences built with modern technologies for speed and scale.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-950",
    icon: Globe,
    tags: ["React", "Next.js", "Full Stack"],
    image: "/images/website.svg",
  },
  {
    id: "03",
    title: "UI / UX Systems Design",
    description: "User-centric interfaces that delight and convert. Scalable design systems for consistency.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-950",
    icon: Palette,
    tags: ["Figma", "Prototyping", "User Research"],
    image: "/images/UI  UX.svg",
  },
  {
    id: "04",
    title: "Startup MVP Engineering",
    description: "Rapid iteration for early-stage startups. Launch fast, validate hypotheses, and scale efficiently.",
    color: "from-green-500 to-emerald-500",
    bg: "bg-emerald-950",
    icon: Rocket,
    tags: ["MVP", "Agile", "Speed to Market"],
    image: "/images/Startup.svg",
  },
  {
    id: "05",
    title: "Performance & Scaling Audits",
    description: "Optimizing for speed, reliability, and SEO. Identifying bottlenecks to improve user retention.",
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-950",
    icon: Zap,
    tags: ["SEO", "Core Web Vitals", "Optimization"],
    image: "/images/Performance.svg",
  },
  {
    id: "06",
    title: "CMS & Content Architecture",
    description: "Structured content management for editorial teams. Flexible headless CMS solutions.",
    color: "from-teal-500 to-cyan-500",
    bg: "bg-cyan-950",
    icon: Database,
    tags: ["Sanity", "Contentful", "Structure"],
    image: "/images/CMS.svg",
  },
  {
    id: "07",
    title: "Long-term Technical Partnership",
    description: "Ongoing support and evolution. Your dedicated technical team for the long haul.",
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-950",
    icon: Handshake,
    tags: ["Maintenance", "Support", "Evolution"],
    image: "/images/longterm.svg",
  },
];

export function ServicesSnapScroll() {
  return (
    <div className="relative w-full bg-black">
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black text-white">
      {/* Background with Blur */}
      <div className={cn("absolute inset-0 opacity-20", service.bg)} />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('${NOISE_BG}')` }} />
      
      {/* Main Content Container */}
      <motion.div 
        ref={ref}
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full will-change-transform"
      >
        {/* Left: Typography */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
           <div className="flex items-center gap-4">
              <span className="text-6xl font-black text-white/10">{service.id}</span>
              <div className={cn("h-px flex-1 bg-gradient-to-r", service.color, "opacity-50")} />
           </div>
           
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
             {service.title}
           </h2>
           
           <p className="text-xl md:text-2xl text-zinc-400 max-w-lg leading-relaxed">
             {service.description}
           </p>

           <div className="flex flex-wrap gap-3">
             {service.tags.map(tag => (
               <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-zinc-300">
                 {tag}
               </span>
             ))}
           </div>
        </div>

        {/* Right: Visual / Image */}
        <div className="relative order-1 lg:order-2 h-[40vh] lg:h-[60vh] w-full flex items-center justify-center">
           <motion.div 
             style={{ y }}
             className="relative w-full h-full max-w-md lg:max-w-full aspect-square lg:aspect-auto bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10 overflow-hidden p-6 group transform-gpu"
           >
              {/* Glow Effect */}
              <div className={cn("absolute inset-0 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40 will-change-[opacity]", service.bg)} />
              
              <div className="relative w-full h-full flex items-center justify-center">
                 <Image
                   src={service.image}
                   alt={service.title}
                   fill
                   priority={index === 0}
                   sizes="(max-width: 768px) 100vw, 50vw"
                   className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                 />
              </div>
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
