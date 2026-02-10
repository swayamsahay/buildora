"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Crafting intuitive digital experiences.",
    image: "/images/UI  UX.svg",
  },
  {
    id: "02",
    title: "Web Development",
    description: "Robust, scalable, and performant websites.",
    image: "/images/website.svg",
  },
  {
    id: "03",
    title: "Mobile Apps",
    description: "Native and cross-platform mobile solutions.",
    image: "/images/Startup.svg",
  },
  {
    id: "04",
    title: "Brand Strategy",
    description: "Defining your voice in the market.",
    image: "/images/product.svg",
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [displayedImage, setDisplayedImage] = useState<string>("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 px-6 md:px-12 overflow-hidden bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-wider mb-12 opacity-60">
          Our Services
        </h2>

        <div className="flex flex-col">
          {services.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => {
                setActiveService(service.id);
                setDisplayedImage(service.image);
              }}
              onMouseLeave={() => setActiveService(null)}
              className="group relative border-t border-foreground/10 py-12 cursor-pointer flex items-center justify-between z-10"
            >
              <div className="flex items-baseline gap-8">
                <span className="font-mono text-sm opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  {service.id}
                </span>
                <h3 className="text-4xl md:text-6xl font-medium tracking-tight overflow-hidden">
                  {/* Split Text Animation */}
                  <div className="relative flex flex-col h-[1.1em] overflow-hidden">
                    <span className="group-hover:-translate-y-full transition-transform duration-500 ease-in-out block">
                      {service.title}
                    </span>
                    <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 ease-in-out block text-primary">
                      {service.title}
                    </span>
                  </div>
                </h3>
              </div>
              <p className="hidden md:block text-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                {service.description}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-foreground/10" />
        </div>
      </div>

      {/* Floating Reveal Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: activeService ? 1 : 0,
          scale: activeService ? 1 : 0.8,
          x: cursorPos.x - 200, // Center the image on cursor (width/2)
          y: cursorPos.y - 150, // Center the image on cursor (height/2)
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="pointer-events-none absolute top-0 left-0 z-0 w-[400px] h-[300px] rounded-lg overflow-hidden shadow-2xl hidden md:block will-change-transform transform-gpu"
      >
        {displayedImage && (
          <Image
            src={displayedImage}
            alt="Service preview"
            fill
            sizes="400px"
            className="object-cover"
            priority
          />
        )}
      </motion.div>
    </section>
  );
}