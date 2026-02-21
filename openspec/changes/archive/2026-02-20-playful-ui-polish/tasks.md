## 1. City Metadata — Data Model

- [x] 1.1 Create `src/utils/countryMap.ts` with a static `Record<string, string>` mapping IANA timezone IDs to ISO 3166-1 alpha-2 country codes
- [x] 1.2 Add `getCountryCode(zone: string): string` function that looks up the map and returns empty string for unknown zones
- [x] 1.3 Add `getFlagEmoji(countryCode: string): string` function using the regional indicator symbol algorithm
- [x] 1.4 Add `getRegion(zone: string): string` function that extracts the first path segment and maps to display name (America → Americas, etc.)
- [x] 1.5 Write unit tests for `getCountryCode`, `getFlagEmoji`, and `getRegion`

## 2. Enriched City Data

- [x] 2.1 Extend `HappyHourCity` interface to add `flag: string` and `region: string` fields
- [x] 2.2 Update `getHappyHourCities()` to populate `flag` and `region` using the new lookup functions
- [x] 2.3 Update existing unit tests for the new data shape (verify `flag` and `region` are present)

## 3. Typography & Fonts

- [x] 3.1 Add Google Font `<link>` tag to `index.html` with `display=swap` (choose Pacifico, Fredoka One, or Baloo 2)
- [x] 3.2 Apply the display font to `.header-title` in CSS

## 4. Header Redesign

- [x] 4.1 Update `Header.tsx` to accept a `cityCount` prop and render a dynamic subtitle ("Right now, N cities are at happy hour")
- [x] 4.2 Pass the city count from `App.tsx` to `Header`
- [x] 4.3 Style the subtitle (smaller, muted text, below the title)

## 5. Theme Toggle — Icon Swap

- [x] 5.1 Create inline SVG sun and moon icon components (or embed directly in `ThemeToggle.tsx`)
- [x] 5.2 Replace text labels ("Dark Mode" / "Light Mode") with the corresponding SVG icon
- [x] 5.3 Style the icon toggle button (circular, consistent sizing, hover effect)

## 6. City Card Redesign

- [x] 6.1 Update `CityCard.tsx` to accept and display `flag` and `region` props
- [x] 6.2 Update `CityList.tsx` to pass `flag` and `region` to `CityCard`
- [x] 6.3 Style the enriched card layout — flag prominent, region as subtle secondary text

## 7. Animations

- [x] 7.1 Add CSS `@keyframes` for card fade-in (opacity 0→1, translateY 12px→0)
- [x] 7.2 Apply staggered `animation-delay` via `--i` CSS custom property passed from card index, capped at 10
- [x] 7.3 Add enhanced hover effect — warm box-shadow glow and slight upward translation
- [x] 7.4 Ensure cards re-entering on refresh fade in but existing cards do not re-animate (use React `key` on `city.zone`)

## 8. Background & Color Palette

- [x] 8.1 Update `:root` and `[data-theme='dark']` CSS custom properties for a warmer, richer palette
- [x] 8.2 Add subtle radial gradient to `body` background — warm amber for light mode, deep blue/indigo for dark mode
- [x] 8.3 Ensure card backgrounds, input fields, and buttons maintain good contrast against the gradient

## 9. Playful Copy

- [x] 9.1 Update `CityList.tsx` empty state to show playful messages — differentiate between "no search results" and "no cities at happy hour"
- [x] 9.2 Pass a `hasSearch` or `search` prop to `CityList` (or use separate messages in `App.tsx`) to distinguish the two empty states

## 10. Tests

- [x] 10.1 Update E2E tests for new UI elements: icon toggle (no more "Dark Mode" text), flag and region display on cards, subtitle text
- [x] 10.2 Run full test suite (`npm run test && npm run test:e2e`) and fix any failures
- [x] 10.3 Run `npm run lint && npm run format` and fix any issues
