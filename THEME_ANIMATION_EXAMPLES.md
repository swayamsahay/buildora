# Code Examples & Integration Patterns

## Using the Theme Hook

### Basic Usage
```tsx
import { useTheme } from "@/components/ThemeProvider";

export function ModeIndicator() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current mode: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Conditional Rendering
```tsx
import { useTheme } from "@/components/ThemeProvider";

export function DarkModeFeature() {
  const { theme } = useTheme();
  
  return (
    <>
      {theme === "dark" && (
        <p>You're in dark mode! This is premium night mode.</p>
      )}
      {theme === "light" && (
        <p>You're in light mode! Bright and clear.</p>
      )}
    </>
  );
}
```

## Theme-Aware Styling

### Using CSS Variables
```css
/* globals.css already defines these */
:root {
  --background: #EAEAE6;
  --foreground: #1A1A1A;
}

.dark {
  --background: #050505;
  --foreground: #EDEDED;
}

/* Use in components */
.card {
  background: var(--background);
  color: var(--foreground);
  /* Colors auto-update on theme switch! */
}
```

### Dynamic Styles in Components
```tsx
export function ThemeAwareCard() {
  const { theme } = useTheme();
  
  return (
    <div
      style={{
        background: theme === "dark" ? "#050505" : "#EAEAE6",
        color: theme === "dark" ? "#EDEDED" : "#1A1A1A",
      }}
    >
      Content
    </div>
  );
}
```

## Button Placement Examples

### In Header
```tsx
// components/layout/Navbar.tsx
import ThemeToggle from "@/components/ThemeToggle";

export function Navbar() {
  return (
    <nav>
      <h1>MyApp</h1>
      <ThemeToggle />  {/* Animation triggers from button position */}
    </nav>
  );
}
```

### In Footer
```tsx
// components/layout/Footer.tsx
import ThemeToggle from "@/components/ThemeToggle";

export function Footer() {
  return (
    <footer>
      <p>© 2026 MyApp</p>
      <ThemeToggle />
    </footer>
  );
}
```

### Multiple Locations
```tsx
// Button can appear in multiple places
// Animation will always emanate from clicked button
// (each button calculates its own position)

export function App() {
  return (
    <>
      <Navbar>
        <ThemeToggle />  {/* Animation from top-right */}
      </Navbar>
      
      <Content />
      
      <Footer>
        <ThemeToggle />  {/* Animation from bottom */}
      </Footer>
    </>
  );
}
```

## Advanced Customization

### Custom Animation Timing
```tsx
// In ThemeTransition.tsx, modify constants:

// Make animation faster (200ms total)
const THREAD_DURATION = 0.2;           // was 0.4
const BULB_WARMUP_DURATION = 0.1;      // was 0.25
const LIGHT_SPREAD_DURATION = 0.25;    // was 0.55
const TOTAL_ANIMATION = 0.5;           // was 0.75

// Theme switch timing must stay at ~45% of thread duration
// Edit in ThemeProvider.tsx:
// setTimeout(() => { setTheme(...) }, 170);  // was 340
```

### Custom Color Scheme
```css
/* In globals.css, create new theme */
:root {
  /* Purple neon theme for light mode */
  --neon-thread: rgba(186, 85, 211, 0.95);
  --neon-glow: rgba(200, 127, 214, 0.85);
  --neon-spread: rgba(200, 127, 214, 0.08);
}

.dark {
  /* Golden neon theme for dark mode */
  --neon-thread: rgba(255, 215, 0, 0.95);
  --neon-glow: rgba(255, 223, 86, 0.85);
  --neon-spread: rgba(255, 223, 86, 0.12);
}
```

### Custom Easing Curve
```tsx
// In ThemeTransition.tsx, line with NEON THREAD animation:

<motion.div
  transition={{
    duration: THREAD_DURATION,
    ease: [0.25, 0.1, 0.25, 1.0],  // Custom cubic-bezier
    // ease: "easeInOut",            // Or use preset
    // ease: [0.17, 0.67, 0.83, 0.67], // Smooth without overshoot
  }}
>
```

## Testing Patterns

### Unit Test Example (with Vitest)
```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

describe("ThemeProvider", () => {
  function TestComponent() {
    const { theme, toggleTheme } = useTheme();
    return (
      <div>
        <span>{theme}</span>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    );
  }

  it("toggles theme on button click", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText("Toggle"));
    
    await waitFor(() => {
      expect(screen.getByText("light")).toBeInTheDocument();
    }, { timeout: 800 });  // Animation duration
  });

  it("persists theme in localStorage", () => {
    const { rerender } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Toggle"));
    
    // Check localStorage
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
```

### Animation Performance Test
```tsx
// Verify 60fps during animation
it("maintains 60fps during animation", async () => {
  const framesSeen = [];
  let lastTime = performance.now();

  function recordFrame() {
    const now = performance.now();
    const delta = now - lastTime;
    framesSeen.push(delta);
    lastTime = now;
    
    if (now < lastTime + 750) {  // Animation duration
      requestAnimationFrame(recordFrame);
    }
  }

  render(<ThemeProvider><TestComponent /></ThemeProvider>);
  
  recordFrame();
  fireEvent.click(screen.getByText("Toggle"));
  
  await waitFor(() => {
    const avgDelta = framesSeen.reduce((a, b) => a + b) / framesSeen.length;
    expect(avgDelta).toBeLessThan(16.67);  // 60fps = 16.67ms per frame
  });
});
```

### Accessibility Test
```tsx
it("respects prefers-reduced-motion", () => {
  // Mock prefers-reduced-motion
  const mockMedia = jest.fn(() => ({
    matches: true,  // Reduced motion enabled
    media: "(prefers-reduced-motion: reduce)",
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
  window.matchMedia = mockMedia;

  render(<ThemeProvider><TestComponent /></ThemeProvider>);
  
  fireEvent.click(screen.getByText("Toggle"));
  
  // Animation should skip complex sequences
  // Just use fade (0.2s instead of 0.75s)
});
```

## Framer Motion Customization

### Understanding Variants
```tsx
// Advanced: Create reusable animation variants
const threadVariants = {
  initial: { scaleY: 0, opacity: 0 },
  animate: { scaleY: 1, opacity: 1 },
  exit: { scaleY: 0, opacity: 0 },
};

const bulbVariants = {
  initial: { scaleX: 0, scaleY: 0, opacity: 0 },
  animate: { scaleX: 1, scaleY: 1, opacity: 1 },
  exit: { scaleX: 0, scaleY: 0, opacity: 0 },
};

// Usage in component
<motion.div
  variants={threadVariants}
  initial="initial"
  animate={active ? "animate" : "initial"}
  exit="exit"
/>
```

### Custom Transition Timing
```tsx
// Create preset transitions for reuse
const threadTransition = {
  duration: THREAD_DURATION,
  ease: [0.34, 1.56, 0.64, 1],
};

const bulbTransition = {
  delay: THREAD_DURATION - 0.05,
  duration: BULB_WARMUP_DURATION,
  ease: "easeOut",
};

const lightTransition = {
  delay: THREAD_DURATION + BULB_WARMUP_DURATION * 0.3,
  duration: LIGHT_SPREAD_DURATION,
  ease: [0.22, 1, 0.36, 1],
};

// Apply to elements
<motion.div transition={threadTransition} />
<motion.div transition={bulbTransition} />
<motion.div transition={lightTransition} />
```

## Production Deployment Checklist

### Before Going Live
```tsx
// 1. Verify all animations work
- [ ] Light theme toggle tested
- [ ] Dark theme toggle tested
- [ ] Reverse animation tested
- [ ] Mobile devices tested (60hz)
- [ ] Tablet devices tested (120hz)

// 2. Performance check
- [ ] DevTools Performance tab shows 60fps
- [ ] No long tasks (>50ms JavaScript)
- [ ] No layout shifts (CLS = 0)
- [ ] Memory stable after multiple toggles

// 3. Accessibility check
- [ ] prefers-reduced-motion works
- [ ] Keyboard navigation works
- [ ] Screen reader announces toggle
- [ ] Color contrast is WCAG AA

// 4. Browser compatibility
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Mobile Safari (iOS 14+)
- [ ] Mobile Chrome (Android 9+)

// 5. Code review
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No unused variables
- [ ] Comments updated
- [ ] Documentation complete
```

## Monitoring & Debugging

### Check If Animation is Running
```tsx
// In browser console
const animation = document.querySelector("[data-theme-toggle-button]");
console.log("Button found:", animation);

// Check if animation container exists
const container = document.querySelector(".fixed.top-0.z-\\[9999\\]");
console.log("Animation container:", container);

// Verify button position
const rect = animation.getBoundingClientRect();
console.log("Button position:", { x: rect.left, y: rect.top });
```

### Performance Profiling
```tsx
// In DevTools:
// 1. Open Performance tab
// 2. Click Record
// 3. Click theme toggle
// 4. Click Stop
// 5. Check metrics:

// Expected values:
- FCP (First Contentful Paint): <100ms
- LCP (Largest Contentful Paint): <250ms
- CLS (Cumulative Layout Shift): 0
- FID (First Input Delay): <100ms
```

### Debug Prefers Reduced Motion
```tsx
// Test reduced motion fallback
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

console.log("Prefers reduced motion:", prefersReducedMotion.matches);

// Override for testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: query.includes("reduce-motion") ? true : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

---

**Happy animating! 🎨✨**
