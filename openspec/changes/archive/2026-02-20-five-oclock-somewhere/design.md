## Context

Greenfield SPA — no existing code, no legacy constraints. The entire app runs client-side in the browser. The browser's `Intl` API provides both the list of IANA timezones (`Intl.supportedValuesOf('timeZone')`) and the ability to resolve the current time in each zone (`Intl.DateTimeFormat`). No server, no API, no database.

## Goals / Non-Goals

**Goals:**

- Ship a working, playful SPA that shows where it's 5 PM right now
- Keep the codebase minimal — easy to read, easy to modify
- Modern tooling with standard conventions (Vite, React, TypeScript, ESLint/Prettier)

**Non-Goals:**

- Production deployment, CI/CD, hosting
- Enriched city mappings beyond IANA zone names
- Animations, illustrations, or elaborate visual design
- Server-side rendering or API layer
- Internationalization

## Decisions

### 1. Timezone data source: browser `Intl` API

**Choice**: Use `Intl.supportedValuesOf('timeZone')` for the zone list and `Intl.DateTimeFormat` to resolve the current hour in each zone.

**Alternatives considered**:

- **Bundled timezone library** (e.g., `date-fns-tz`, `luxon`): Adds a dependency for something the browser already does natively. Unnecessary for a PoC.
- **External API** (e.g., WorldTimeAPI): Adds network dependency, latency, and rate limits. Overkill.

**Rationale**: Zero dependencies, works offline, accurate, and the `Intl` API is well-supported in all modern browsers.

### 2. City name derivation: parse IANA identifiers

**Choice**: Transform IANA zone IDs like `America/New_York` → "New York" by taking the city segment after the last `/` and replacing underscores with spaces.

**Alternatives considered**:

- **Curated city-to-timezone mapping**: Richer results but requires manual maintenance and is scope creep for a PoC.

**Rationale**: Simple string parsing, no maintenance, covers ~400 zones. Some names will be obscure (`America/Indiana/Knox`) but that's part of the charm for a playful PoC.

### 3. App structure: single-page, flat component hierarchy

**Choice**: Minimal component tree:

```
App
├── Header (title + ThemeToggle)
├── SearchBar
└── CityList
    └── CityCard (repeated)
```

**Rationale**: Three capabilities, roughly one component each, plus a thin layout shell. No routing, no state management library — React's `useState` and `useEffect` are sufficient.

### 4. Live updates: `setInterval` on a 60-second tick

**Choice**: A `useEffect` in `App` sets an interval that re-evaluates the timezone list every 60 seconds, updating state to reflect which cities are currently in the 5 PM hour.

**Alternatives considered**:

- **Recalculate on every render**: Wasteful — timezone data doesn't change sub-minute.
- **Web Workers**: Overengineered for ~400 timezone checks.

**Rationale**: 60-second interval matches the granularity of "the 5 o'clock hour" and is trivially cheap.

### 5. Theming: CSS custom properties with a `data-theme` attribute

**Choice**: Define light and dark color palettes as CSS custom properties on `:root`. Toggle by setting `data-theme="dark"` on the `<html>` element. Store preference in `localStorage`.

**Alternatives considered**:

- **CSS-in-JS / styled-components**: Adds a dependency for two color schemes.
- **Tailwind dark mode**: Adds Tailwind as a dependency for minimal gain.

**Rationale**: Native CSS, zero dependencies, clean separation of concerns.

### 6. Project scaffolding: Vite with React-TS template

**Choice**: `npm create vite@latest` with the `react-ts` template. Add ESLint + Prettier config.

**Rationale**: Standard, fast, matches the declared stack.

## Risks / Trade-offs

- **`Intl.supportedValuesOf` browser support** → Supported in all modern browsers (Chrome 93+, Firefox 93+, Safari 15.4+). Not a concern for a PoC. If needed, a static fallback list could be added.
- **Obscure IANA city names** → Some zones have unfamiliar names (e.g., `Pacific/Pohnpei`). Acceptable for a playful PoC — the obscurity is part of the fun.
- **Half-hour / 45-min offset zones** → Zones like `Asia/Kolkata` (UTC+5:30) enter the 5 PM hour at :30 past the UTC hour. No special handling needed — checking the local hour via `Intl.DateTimeFormat` handles this correctly.
- **No tests initially blocking ship** → PoC can ship without full test coverage. Tests should be added but shouldn't block the first working version.
