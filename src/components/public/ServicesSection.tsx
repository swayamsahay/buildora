"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Palette,
  Globe,
  Lightbulb,
  Rocket,
  Zap,
  Database,
  Handshake,
} from "lucide-react";
import { RevealContainer, RevealItem } from "@/components/ui/Reveal";

/* ----------------------------------------
   DATA & ASSETS
---------------------------------------- */
const services = [
  {
    id: "01",
    title: "Product Strategy & Consulting",
    description:
      "Defining the roadmap to success. Market analysis and product vision aligned with business goals.",
    color: "from-blue-500/20 to-indigo-500/20",
    icon: Lightbulb,
    tags: ["Roadmap", "Market Fit", "Growth"],
    image: "/images/product.svg",
  },
  {
    id: "02",
    title: "Website & Web App Development",
    description:
      "High-performance digital experiences built with modern technologies for speed and scale.",
    color: "from-purple-500/20 to-pink-500/20",
    icon: Globe,
    tags: ["React", "Next.js", "Full Stack"],
    image: "/images/website.svg",
  },
  {
    id: "03",
    title: "UI / UX Systems Design",
    description:
      "User-centric interfaces that delight and convert. Scalable design systems for consistency.",
    color: "from-orange-500/20 to-red-500/20",
    icon: Palette,
    tags: ["Figma", "Prototyping", "User Research"],
    image: "/images/UI  UX.svg",
  },
  {
    id: "04",
    title: "Startup MVP Engineering",
    description:
      "Rapid iteration for early-stage startups. Launch fast, validate hypotheses, and scale efficiently.",
    color: "from-green-500/20 to-emerald-500/20",
    icon: Rocket,
    tags: ["MVP", "Agile", "Speed to Market"],
    image: "/images/Startup.svg",
  },
  {
    id: "05",
    title: "Performance & Scaling Audits",
    description:
      "Optimizing for speed, reliability, and SEO. Identifying bottlenecks to improve user retention.",
    color: "from-yellow-500/20 to-amber-500/20",
    icon: Zap,
    tags: ["SEO", "Core Web Vitals", "Optimization"],
    image: "/images/Performance.svg",
  },
  {
    id: "06",
    title: "CMS & Content Architecture",
    description:
      "Structured content management for editorial teams. Flexible headless CMS solutions.",
    color: "from-teal-500/20 to-cyan-500/20",
    icon: Database,
    tags: ["Sanity", "Contentful", "Structure"],
    image: "/images/CMS.svg",
  },
  {
    id: "07",
    title: "Long-term Technical Partnership",
    description:
      "Ongoing support and evolution. Your dedicated technical team for the long haul.",
    color: "from-indigo-500/20 to-violet-500/20",
    icon: Handshake,
    tags: ["Maintenance", "Support", "Evolution"],
    image: "/images/longterm.svg",
  },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Supabase",
  "Figma",
  "Vercel",
  "PostgreSQL",
  "Node.js",
];

/* ----------------------------------------
   CONSTANTS
---------------------------------------- */
const NOISE_BG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

/* ----------------------------------------
   ANIMATION VARIANTS
---------------------------------------- */
const splitTextVariants = {
  initial: { y: 0 },
  hover: { y: "-100%" },
};

const duplicateTextVariants = {
  initial: { y: "100%" },
  hover: { y: 0 },
};

/* ----------------------------------------
   COMPONENT
---------------------------------------- */
export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="relative pt-32 pb-32 -mt-24 bg-background overflow-hidden">
      <RevealContainer className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <RevealItem>
              <span className="text-xs uppercase tracking-widest text-muted-foreground mb-12">
                (03) Services
              </span>
            </RevealItem>

            <div className="space-y-8">
              {services.map((service, index) => (
                <RevealItem key={service.id}>
                  <div
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4 mb-2">
                      <span
                        className={`font-mono text-sm transition-colors duration-300 ${
                          activeService === index
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {service.id}
                      </span>

                      <div className="relative overflow-hidden h-10 md:h-14">
                        <motion.h3
                          initial="initial"
                          animate={
                            activeService === index ? "hover" : "initial"
                          }
                          className="text-3xl md:text-5xl font-medium leading-tight"
                        >
                          <span className="block relative">
                            <motion.span
                              variants={splitTextVariants}
                              transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                              }}
                              className="block"
                            >
                              {service.title}
                            </motion.span>
                            <motion.span
                              variants={duplicateTextVariants}
                              transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                              }}
                              className="absolute inset-0 block text-muted-foreground/50"
                            >
                              {service.title}
                            </motion.span>
                          </span>
                        </motion.h3>
                      </div>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height:
                          activeService === index ? "auto" : 0,
                        opacity: activeService === index ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      {/* Mobile Image Preview */}
                      <div className="lg:hidden pl-10 mb-6 pr-4">
                        <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-lg backdrop-blur-md`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />
                          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${NOISE_BG}')` }} />
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <p className="text-lg text-muted-foreground pl-10 pb-4 max-w-md">
                        {service.description}
                      </p>
                      <div className="pl-10 flex gap-3 pb-4">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full border border-foreground/10 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <RevealItem className="hidden lg:block relative h-[600px]">
            <div className="sticky top-32 w-full h-full rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl shadow-2xl">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{
                    opacity: activeService === index ? 1 : 0,
                    scale: activeService === index ? 1 : 1.05,
                    zIndex: activeService === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 bg-gradient-to-br ${service.color}`}
                >
                  <div className="relative w-full h-full">
                    {/* Noise */}
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${NOISE_BG}')` }} />

                    {/* IMAGE */}
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={index === 0} // Only priority load the first one, others will load as they are in viewport
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealItem>
        </div>
      </RevealContainer>

      {/* MARQUEE */}
      <div className="mt-32 border-t border-foreground/10 pt-12 w-full">
        <div className="overflow-hidden flex mask-image-linear-gradient mb-8">
          <motion.div
            className="flex gap-16 whitespace-nowrap will-change-transform transform-gpu"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 60,
            }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-bold text-foreground/20 uppercase tracking-tighter"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="overflow-hidden flex mask-image-linear-gradient">
          <motion.div
            className="flex gap-16 whitespace-nowrap will-change-transform transform-gpu"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
