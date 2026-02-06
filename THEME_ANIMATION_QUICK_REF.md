# Theme Toggle Animation - Developer Quick Reference

## Quick Start

The luxury neon lamp theme toggle is fully integrated. No additional setup required—just use the app!

```tsx
// In any component:
import { useTheme } from "@/components/ThemeProvider";

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## File Locations

| File | Purpose |
|------|---------|
| `src/components/ThemeProvider.tsx` | Context provider, animation state, timing |
| `src/components/transition/ThemeTransition.tsx` | Neon animation logic, color system |
| `src/components/ThemeToggle.tsx` | Toggle button UI component |
| `src/app/globals.css` | CSS variables, theme tokens, GPU hints |
| `THEME_ANIMATION_SPEC.md` | Complete technical specification |

## Key Timing Constants

```tsx
// In ThemeTransition.tsx
const THREAD_DURATION = 0.4;           // 400ms - thread descent
const BULB_WARMUP_DURATION = 0.25;     // 250ms - bulb glow
const LIGHT_SPREAD_DURATION = 0.55;    // 550ms - light expansion
const TOTAL_ANIMATION = 0.75;          // 750ms - total duration
```

## Color Customization

Edit CSS variables in `globals.css`:

```css
:root {
  --neon-thread: rgba(255, 188, 66, 0.95);
  --neon-glow: rgba(255, 200, 87, 0.85);
  --neon-spread: rgba(255, 200, 87, 0.08);
}

.dark {
  --neon-thread: rgba(0, 255, 255, 0.95);
  --neon-glow: rgba(0, 255, 255, 0.8);
  --neon-spread: rgba(0, 255, 255, 0.12);
}
```

## Common Tasks

### Adjust Animation Speed

In `ThemeTransition.tsx`:
```tsx
// Make thread fall slower
const THREAD_DURATION = 0.6;  // was 0.4

// Adjust total duration
const TOTAL_ANIMATION = 1.0;  // was 0.75
```

### Change Neon Colors

In `globals.css`, replace RGBA values:
```css
/* Purple neon instead of cyan */
.dark {
  --neon-thread: rgba(138, 43, 226, 0.95);
  --neon-glow: rgba(186, 85, 211, 0.85);
  --neon-spread: rgba(186, 85, 211, 0.12);
}
```

### Disable Animation (for Testing)

In `ThemeTransition.tsx`, add early return:
```tsx
// Temporary: disable animation
if (true) {
  return <ThemeContext.Provider>{children}</ThemeContext.Provider>;
}
```

### Verify 60fps Performance

Open Chrome DevTools:
1. Performance tab → Record
2. Click theme toggle
3. Stop recording
4. Check FPS graph (should be smooth green line)
5. Look for "Rendering" drops in flame chart

### Test prefers-reduced-motion

In Chrome DevTools:
1. Rendering tab → Emulate CSS media feature prefers-reduced-motion
2. Select "reduce"
3. Click toggle (should fade, no animation)

## Troubleshooting

### Animation feels jittery
- Check browser GPU acceleration is enabled
- Ensure no heavy JavaScript during animation
- Profile with DevTools Performance tab

### Colors look wrong
- Verify CSS variables are loaded (Inspect → CSS Variables)
- Check if browser dark mode preference matches
- Clear browser cache (Shift+Refresh)

### Thread not starting at button
- Ensure `data-theme-toggle-button` attribute is on button element
- Check button's `getBoundingClientRect()` returns expected values
- Verify `window.scrollX` is calculated correctly on scroll

### Animation feels slow on mobile
- Reduce animation durations by 20-30%
- Check if device has `prefers-reduced-motion` enabled
- Profile on actual device, not just Chrome Mobile Emulation

## Performance Considerations

✅ **What We Do Well**
- GPU accelerated transforms only
- No layout thrashing
- CSS variable interpolation (no JS style rewriting)
- Pointer events disabled during animation
- Automatic reduced-motion fallback

⚠️ **What to Avoid**
- Don't animate `width`, `height`, `top`, `left` (causes repaints)
- Don't add complex filters during animation (expensive)
- Don't trigger DOM queries in animation loop
- Don't use `setTimeout` for frame-based animation (use `requestAnimationFrame`)

## Accessibility Checklist

- ✅ Supports `prefers-reduced-motion`
- ✅ Button has proper `aria-label`
- ✅ Keyboard navigable (button is standard HTML element)
- ✅ No flashing content (gradual transitions)
- ✅ Theme contrast meets WCAG AA standards
- ✅ localStorage persistence for user preference

## Testing Scenarios

### Test on Different Devices
```bash
# Chrome DevTools Device Emulation
- iPhone 12 Pro (60hz)
- Pixel 4 (60hz)
- iPad Pro (120hz)
- Desktop (60/144hz)
```

### Test in Different Browsers
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS + iOS)
- Mobile Safari

### Test Accessibility
- [ ] Test with keyboard only (Tab to button, Enter to toggle)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Enable prefers-reduced-motion
- [ ] Check color contrast ratio (Lighthouse audit)

## Integration with Existing UI

The animation handles theme switching automatically. No component modifications needed.

```tsx
// This just works! Theme updates are instant
<body className={theme === "dark" ? "dark" : ""}>
  {children}
</body>
```

CSS variables smoothly transition:
```css
/* Colors auto-update via CSS variables */
background: var(--background);
color: var(--foreground);
```

## Future Enhancements

Potential improvements (non-blocking):
- [ ] Haptic feedback pulse (2px glow vibration)
- [ ] Sound effect on bulb ignition
- [ ] Particle trail down thread
- [ ] Distance-based glow falloff
- [ ] Ambient lighting effect on adjacent UI

## Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Web Vitals:** https://web.dev/vitals/
- **CSS Performance:** https://developer.mozilla.org/en-US/docs/Learn/CSS/Performance
- **Accessibility:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Last Updated:** February 2, 2026
**Status:** Production Ready ✅
