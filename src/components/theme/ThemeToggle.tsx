"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const handleClick = () => {
    toggleTheme();
  };

  // Prevent hydration mismatch by defaulting to dark (server default) until mounted
  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors",
        className
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            isDark ? "translate-y-full rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
          }`}
        >
          <Sun className="w-5 h-5" />
        </div>
        
        {/* Moon Icon */}
        <div 
          className={`absolute inset-0 transition-transform duration-500 ${
            isDark ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-full -rotate-90 opacity-0"
          }`}
        >
          <Moon className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
}
