"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth progress for the circle indicator
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Force scroll to top on refresh
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const toggleVisibility = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Progress Circle SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 100 100">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-white/5"
            />
            {/* Progress indicator */}
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
              style={{ pathLength: scrollProgress }}
            />
          </svg>

          {/* Arrows Container for Animation */}
          <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden h-6 w-6">
            {/* First Arrow (Initial) */}
            <motion.div
              variants={{
                hover: { y: -20, opacity: 0 },
                initial: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.div>

            {/* Second Arrow (On Hover) */}
            <motion.div
              variants={{
                hover: { y: 0, opacity: 1 },
                initial: { y: 20, opacity: 0 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
