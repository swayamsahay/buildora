"use client";

import { ServicesSnapScroll } from "@/components/services/ServicesSnapScroll";
import { ServicesFooter } from "@/components/services/ServicesFooter";

export default function ServicesClient() {
  return (
    <main className="w-full bg-black min-h-screen">
      <div className="w-full h-[40vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">Our Services</h1>
      </div>
      <ServicesSnapScroll />
      <ServicesFooter />
    </main>
  );
}
