## Context

The app currently displays a flat list of city names and times in a minimal, utilitarian layout. All styling uses plain CSS with CSS custom properties for theming. The data model (`HappyHourCity`) contains only `zone`, `name`, and `time`. There are no external font or icon dependencies. The app is entirely client-side with no backend.

## Goals / Non-Goals

**Goals:**

- Make the UI feel warm, playful, and celebratory — matching the "happy hour" concept
- Enrich city cards with flag emojis and region labels for visual variety
- Add motion and animation to convey liveness
- Improve typography and color palette for polish
- Keep the app zero-backend, client-side only

**Non-Goals:**

- Interactive maps or geolocation features
- Backend services or API integrations
- Internationalization / multi-language support
- Accessibility audit (out of scope, but we won't regress)
- Mobile-native features (push notifications, etc.)

## Decisions

### 1. Static timezone-to-country lookup table (over npm package or API)

Create a hand-curated TypeScript `Record<string, string>` mapping ~400 IANA timezone IDs to ISO 3166-1 alpha-2 country codes. Derive flag emojis from country codes using the regional indicator symbol algorithm (`countryCode.split('').map(c => String.fromCodePoint(c.charCodeAt(0) - 65 + 0x1F1E6)).join('')`).

**Why over npm package:** No runtime dependency, no bundle bloat, fits the "no external deps" philosophy. The IANA timezone list changes very rarely.

**Why over deriving from zone name:** Zone names don't reliably map to countries (e.g., `America/New_York` is US, but you can't infer that).

### 2. Region derived from IANA zone first segment (over separate lookup)

Extract the continent/region from the first path segment of the IANA zone ID (`Europe/London` → `Europe`, `America/New_York` → `Americas`). Apply a small display-name map for readability: `America` → `Americas`, `Pacific` → `Pacific`, etc.

**Why:** Free data — no additional lookup needed. Accurate for display grouping purposes.

### 3. Google Font loaded via `<link>` tag (over npm font package)

Add a display font (e.g., Pacifico, Fredoka One, or Baloo 2) for the app title only. Load via a `<link>` tag in `index.html` with `display=swap` for performance. Body text stays `system-ui`.

**Why:** Minimal impact — one HTTP request for a single font weight. `display=swap` prevents render blocking. No build tooling changes needed.

### 4. CSS keyframe animations (over a JS animation library)

Use CSS `@keyframes` for card fade-in, stagger via `animation-delay` computed from card index (passed as a CSS custom property). Use CSS `transition` for hover effects.

**Why over Framer Motion / React Spring:** No dependency needed for these simple effects. CSS animations are GPU-accelerated and don't cause React re-renders. The animations are purely decorative.

**Stagger approach:** Pass `--i` (card index) as an inline style, then use `animation-delay: calc(var(--i) * 50ms)` in CSS. Cap delay at ~500ms so large lists don't take forever to appear.

### 5. Sun/moon SVG icons inline (over icon library)

Replace the "Dark Mode" / "Light Mode" text button with inline SVG sun and moon icons. Embed as React components — just two small SVGs, no icon library needed.

**Why:** Two icons don't justify adding react-icons or similar. Inline SVGs give full control over color via `currentColor`.

### 6. Warm gradient background with CSS (over static color)

Apply a subtle radial gradient on the body — warm amber/orange tones in light mode, deep blue/purple in dark mode. Keep it subtle enough not to clash with card backgrounds.

### 7. Data flow for enriched city model

```
Intl.supportedValuesOf('timeZone')
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│ Filter hour=17  │────▶│ Map to enriched  │
│                 │     │ HappyHourCity    │
└─────────────────┘     └──────────────────┘
                               │
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
               zone+name   flag+region  time
               (existing)  (new lookup) (existing)
```

The `getHappyHourCities()` function gains two new fields per city by looking up the zone in the static country map and deriving flag + region. The `HappyHourCity` interface adds `flag: string` and `region: string`.

## Risks / Trade-offs

- **[Incomplete country mapping]** → Some obscure IANA zones may not have a country mapping. Mitigation: default to empty flag and use the zone's first segment as the region. No broken UI — just missing flag.
- **[Font load latency]** → Google Font request adds a network dependency. Mitigation: `display=swap` ensures text renders immediately with fallback font, swapping when loaded. Title-only usage limits impact.
- **[Animation jank on low-end devices]** → Staggered animations with many cards. Mitigation: use `transform` and `opacity` only (composited properties), cap stagger delay, use `will-change: opacity, transform` sparingly.
- **[Flag emoji rendering variance]** → Flag emojis render differently across OS/browser. Mitigation: acceptable — flags are decorative, not functional. They render on all modern platforms.
