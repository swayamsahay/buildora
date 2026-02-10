"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { useRef } from "react";

const teamImages = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='none'%3E%3Crect width='800' height='600' fill='%23e2e8f0'/%3E%3Cpath d='M400 300a100 100 0 1 0-100-100 100 100 0 0 0 100 100zm0 50c-66.7 0-200 33.3-200 100v50h400v-50c0-66.7-133.3-100-200-100z' fill='%23cbd5e1'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='none'%3E%3Crect width='800' height='600' fill='%23f1f5f9'/%3E%3Cpath d='M400 300a100 100 0 1 0-100-100 100 100 0 0 0 100 100zm0 50c-66.7 0-200 33.3-200 100v50h400v-50c0-66.7-133.3-100-200-100z' fill='%2394a3b8'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='none'%3E%3Crect width='800' height='600' fill='%23e2e8f0'/%3E%3Cpath d='M400 300a100 100 0 1 0-100-100 100 100 0 0 0 100 100zm0 50c-66.7 0-200 33.3-200 100v50h400v-50c0-66.7-133.3-100-200-100z' fill='%2364748b'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='none'%3E%3Crect width='800' height='600' fill='%23f8fafc'/%3E%3Cpath d='M400 300a100 100 0 1 0-100-100 100 100 0 0 0 100 100zm0 50c-66.7 0-200 33.3-200 100v50h400v-50c0-66.7-133.3-100-200-100z' fill='%23475569'/%3E%3C/svg%3E",
];

const testimonials = [
  {
    text: "Buildora transformed our vision into a digital masterpiece. Their attention to detail is unmatched.",
    author: "Sarah Jenkins",
    role: "CEO, TechFlow",
  },
  {
    text: "The team's ability to blend aesthetics with performance is simply incredible. Best agency we've worked with.",
    author: "Michael Chen",
    role: "Director of Product, Aether",
  },
  {
    text: "Professional, creative, and technically brilliant. They pushed our brand further than we imagined.",
    author: "Elena Rodriguez",
    role: "Founder, Luma",
  },
];

export default function AboutClient() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="pt-32 pb-0 bg-background relative overflow-hidden min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="px-6 md:px-12 mb-32">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 block flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Our Story
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-medium leading-[1.1] tracking-tight mb-12 text-foreground"
          >
            We build with <span className="text-blue-500">purpose</span>.<br />
            We design for <span className="text-purple-500">impact</span>.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
          >
            Founded in 2024, Buildora was born from a simple belief: the web should be beautiful, fast, and human. We are a collective of dreamers and doers, united by a passion for crafting digital experiences that leave a lasting impression.
          </motion.p>
        </div>
      </div>

      {/* Team Photos Section */}
      <div className="px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? 'md:mt-24' : ''}`}
            >
              <Image
                src={src}
                alt="Team working together"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i < 2}
                className="object-cover hover:scale-105 transition-transform duration-700 will-change-transform transform-gpu"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-32 bg-secondary/30 border-y border-border/50 relative overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Client Stories</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="relative w-full overflow-hidden mask-image-linear-gradient-to-r from-transparent via-black to-transparent">
            {/* Gradient Masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div 
              className="flex gap-8 w-max will-change-transform transform-gpu"
              animate={{ x: "-50%" }}
              transition={{ 
                duration: 60, 
                ease: "linear", 
                repeat: Infinity 
              }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                <motion.div
                  key={i}
                  className="w-[400px] flex-shrink-0 bg-background/50 border border-white/5 hover:border-blue-500/30 transition-colors group p-8 rounded-3xl"
                >
                  <Quote className="w-10 h-10 text-blue-500 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">&quot;{t.text}&quot;</p>
                  <div>
                    <div className="font-bold text-foreground">{t.author}</div>
                    <div className="text-sm text-blue-400">{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-40 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
          >
            Ready to make history?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Join us on our journey to redefine the digital landscape. Let&apos;s build something extraordinary together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-xl overflow-hidden"
            >
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Work with Us
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
