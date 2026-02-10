"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
