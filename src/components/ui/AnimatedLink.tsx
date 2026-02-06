"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  variant?: "default" | "cta" | "ghost";
}

export function AnimatedLink({
  href,
  children,
  icon: Icon,
  className = "",
  variant = "default",
}: AnimatedLinkProps) {
  const baseStyles =
    "group inline-flex items-center gap-3 font-medium transition-colors";

  const variants = {
    default:
      "text-foreground hover:text-foreground/80",
    cta: "text-lg text-foreground hover:text-foreground/80",
    ghost: "text-muted-foreground hover:text-foreground",
  };

  return (
    <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <motion.span
        className="relative inline-block"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      {Icon && (
        <motion.span
          transition={{ duration: 0.2 }}
          className="inline-block"
          whileHover={{ x: 4, y: -4 }}
        >
          <Icon className="w-5 h-5" />
        </motion.span>
      )}
    </Link>
  );
}
