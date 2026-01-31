"use client";

import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/cms/getServices";
import Link from "next/link";

type Props = {
  services: ServiceItem[];
};

export default function ServicesClient({ services }: Props) {
  return (
    <div className="pb-24">
      {/* HERO */}
      <section className="pt-28 pb-20 text-center">
        <h1 className="text-5xl font-extrabold">Our Services</h1>
        <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
          Premium digital solutions crafted to help your business grow and scale.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="container mx-auto grid gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-slate-900/60"
          >
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-3 text-slate-600">
              {service.description}
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-block font-medium text-blue-600"
            >
              Discuss project →
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
