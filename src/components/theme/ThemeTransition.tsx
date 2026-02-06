"use client";

interface ThemeTransitionProps {
  active: boolean;
  targetTheme: string;
  triggerRect: DOMRect | null;
}

export function ThemeTransition({ active, targetTheme, triggerRect }: ThemeTransitionProps) {
  // Disabled
  return null;
}
