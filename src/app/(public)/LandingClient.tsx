"use client";


import ServicesSection from "@/components/public/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import BoundariesSection from "@/components/sections/BoundariesSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import WhoWeWorkWithSection from "@/components/sections/WhoWeWorkWithSection";
import OutcomesSection from "@/components/sections/OutcomesSection";

export default function LandingClient() {
  return (
    <main className="relative overflow-hidden w-full">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= PHILOSOPHY ================= */}
      <PhilosophySection />

      {/* ================= WHO WE WORK WITH ================= */}
      <WhoWeWorkWithSection />
      
      {/* ================= SERVICES ================= */}
      <ServicesSection />
      
      {/* ================= ENGAGEMENT MODEL ================= */}
      <ProcessSection />

      {/* ================= WHY WE SAY NO ================= */}
      <BoundariesSection />

{/* ================= OUTCOMES ================= */}
      <OutcomesSection />

      {/* ================= FINAL CTA ================= */}
      <FinalCTA />
    </main>
  );
}
