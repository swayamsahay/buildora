"use client";

import { motion } from "framer-motion";

const cards = [
  { title: "Interface Design", desc: "Pixel perfection" },
  { title: "User Experience", desc: "Seamless journeys" },
  { title: "Motion", desc: "Fluid interactions" },
  { title: "Development", desc: "Robust engineering" },
];

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function ShowcaseGrid() {
  return (
    <section className="py-28 px-6 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 max-w-xl"
        >
          <h2 className="text-4xl font-bold mb-4">Modern UI</h2>
          <p className="text-white/60 text-lg">
            Glassmorphism & refined motion systems
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={cardReveal}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative h-64 p-8 rounded-3xl 
                         bg-white/[0.04] border border-white/[0.08]
                         backdrop-blur-md overflow-hidden
                         will-change-transform"
            >
              {/* Hover glow — GPU safe */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-end">
                <h3 className="text-2xl font-semibold mb-2">
                  {card.title}
                </h3>
                <p className="text-white/60">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
