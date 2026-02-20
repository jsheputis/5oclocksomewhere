## Why

It's always 5 o'clock somewhere — but where? This is a playful proof-of-concept SPA that answers that question in real time. Pure fun, zero backend, a chance to ship something modern and simple with the core stack.

## What Changes

- New static SPA built with Vite + React + TypeScript
- Displays all cities (derived from IANA timezone database) where the local hour is currently 17:00–17:59
- City list updates live (re-evaluated every minute) with no page refresh
- Search bar filters the displayed cities by name
- Light/dark mode toggle
- Entirely client-side — uses the browser `Intl` API for timezone resolution, no external API calls

## Capabilities

### New Capabilities
- `happy-hour-display`: Core feature — resolve all IANA timezones, determine which are in the 5 PM hour, and render them as a live-updating city list with display-friendly names
- `city-search`: Text filter that narrows the visible city list by name as the user types
- `theme-toggle`: Light/dark mode switch with CSS-level theming

### Modified Capabilities
_(none — greenfield project)_

## Impact

- **Code**: Entirely new — no existing code affected
- **Dependencies**: Vite, React, TypeScript, ESLint, Prettier, Vitest, Playwright (standard stack per project config)
- **APIs / external services**: None. All timezone data comes from the browser's built-in `Intl.DateTimeFormat` and `Intl.supportedValuesOf('timeZone')`
- **Rollback plan**: Greenfield PoC with no users or dependents — rollback is delete the repo contents
- **Affected teams**: Solo proof-of-concept, no downstream consumers
