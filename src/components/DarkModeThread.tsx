"use client";

import { motion } from "framer-motion";

type Props = {
  active: boolean;
};

export default function DarkModeThread({ active }: Props) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "top" }}
      className="fixed left-1/2 top-0 z-[9999] h-screen w-[2px] bg-foreground"
    />
  );
}
