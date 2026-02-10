"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ================= TYPES ================= */

type Service = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  tags?: string[] | null;
  order_index?: number | null;
};

/* ================= NOISE ================= */

const NOISE_BG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/* ================= MAIN ================= */

export function ServicesSnapScroll() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const json = await res.json();

        // ✅ SAFE NORMALIZATION
        const list: Service[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.services)
          ? json.services
          : [];

        setServices(list);
      } catch (err) {
        console.error("Failed to load services", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  /* ---------- STATES ---------- */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-400">
        Loading services…
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-500">
        No services available
      </div>
    );
  }

  /* ---------- RENDER ---------- */

  return (
    <div className="relative w-full bg-black">
      {services.map((service, index) => (
        <ServiceCard key={service.id ?? index} service={service} index={index} />
      ))}
    </div>
  );
}

/* ================= CARD ================= */

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ✅ LIGHT MOTION (NO LAG)
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <section className="sticky top-0 h-screen w-full bg-black text-white flex items-center overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: `url(${NOISE_BG})` }}
      />

      {/* CONTENT */}
      <motion.div
        ref={ref}
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full"
      >
        {/* LEFT */}
        <div className="flex flex-col gap-8">
          <span className="text-6xl font-black text-white/10">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            {service.title}
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 max-w-lg">
            {service.description}
          </p>

          {Array.isArray(service.tags) && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <motion.div
          style={{ y }}
          className="relative h-[50vh] w-full max-w-md mx-auto"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5" />

          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-10"
              priority={index === 0}
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
