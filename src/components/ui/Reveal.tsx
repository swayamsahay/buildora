"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * REVEAL CONTAINER
 * Wraps a section or group of elements. Handles the viewport trigger and orchestration.
 * -----------------------------------------------------------------------------------------------*/

interface RevealContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  stagger?: number; // Delay between children animations
  delay?: number; // Initial delay before starting
  threshold?: number; // 0-1, how much of the element must be visible
  once?: boolean; // Only animate once
}

export function RevealContainer({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  threshold = 0.2,
  once = true,
  ...props
}: RevealContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: "-100px" }}
      variants={containerVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * REVEAL ITEM
 * The actual element that animates (fades up). Must be a descendant of RevealContainer.
 * -----------------------------------------------------------------------------------------------*/

interface RevealItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  yOffset?: number; // How far it moves up
  duration?: number;
}

export function RevealItem({
  children,
  className,
  yOffset = 40,
  duration = 0.8,
  ...props
}: RevealItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98], // "Premium" easeOut
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
