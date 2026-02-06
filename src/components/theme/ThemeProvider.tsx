"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeTransition } from "./ThemeTransition";
import { MotionConfig } from "framer-motion";

interface ThemeContextType {
  toggleTheme: (rect?: DOMRect) => void;
  isTransitioning: boolean;
}

const ThemeContext = React.createContext<ThemeContextType>({
  toggleTheme: () => {},
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="always">
        <ThemeController>{children}</ThemeController>
      </MotionConfig>
    </NextThemesProvider>
  );
}

function ThemeController({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme();
  // const [isTransitioning, setIsTransitioning] = React.useState(false);
  const isTransitioning = false;
  const [targetTheme, setTargetTheme] = React.useState<string | undefined>(undefined);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);

  const toggleTheme = (rect?: DOMRect) => {
    // Instant switch
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isTransitioning }}>
      {/* 
      <ThemeTransition 
        active={isTransitioning} 
        targetTheme={targetTheme || (theme === "dark" ? "light" : "dark")}
        triggerRect={triggerRect}
      />
      */}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const nextThemeContext = useNextTheme();
  const customContext = React.useContext(ThemeContext);
  
  return {
    ...nextThemeContext,
    toggleTheme: customContext.toggleTheme,
    isTransitioning: customContext.isTransitioning,
  };
}
