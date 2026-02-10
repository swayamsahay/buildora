"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

// --- Magnetic Effect ---
// Updated to support custom strength prop
export function Magnetic({ children, className, strength: _strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  // Suppress unused var warning
  void _strength;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}

// --- Text Shift Effect ---
export function TextShift({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden inline-block", className)}>
      <div>
        <span className="block">{text}</span>
      </div>
    </div>
  );
}

// --- Arrow/Icon Motion ---
export function IconMotion({ 
  children, 
  className,
  direction = "right" 
}: { 
  children: React.ReactNode; 
  className?: string;
  direction?: "right" | "up-right" | "up";
}) {
  // Suppress unused var warning
  void direction;
  return (
    <div
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  );
}
