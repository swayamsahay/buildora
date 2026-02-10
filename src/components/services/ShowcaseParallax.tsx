"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  }
};

export function ShowcaseParallax() {
  return (
    <section className="relative py-32 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col gap-32">

        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={reveal}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Depth & Motion
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Minimal UI elevated with spatial rhythm and cinematic restraint.
          </p>
        </motion.div>

        {/* Item 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={reveal}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          {/* Visual */}
          <div className="relative w-full md:w-1/2 h-[420px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
            {/* Subtle depth overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/10 dark:via-white/5 dark:to-white/10" />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              Designed Dimension
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We create depth without distraction — motion that enhances clarity,
              not competes with content.
            </p>
          </div>
        </motion.div>

        {/* Item 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={reveal}
          className="flex flex-col md:flex-row-reverse items-center gap-16"
        >
          {/* Visual */}
          <div className="relative w-full md:w-1/2 h-[420px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-black/5 to-black/10 dark:via-white/5 dark:to-white/10" />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
              Fluid Layouts
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Layouts that breathe — responsive, intentional, and effortless
              across every device.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
