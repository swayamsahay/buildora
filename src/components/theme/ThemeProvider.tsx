"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { MotionConfig } from "framer-motion";

interface ThemeContextType {
  toggleTheme: () => void;
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

  const toggleTheme = () => {
    // Instant switch
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isTransitioning }}>
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
