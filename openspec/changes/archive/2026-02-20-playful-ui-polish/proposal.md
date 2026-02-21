## Why

The app is functional but visually utilitarian — it looks like a timezone utility rather than a celebration of happy hour. The UI lacks personality, warmth, and delight. Adding playful polish will make the app memorable and fun to use, matching the lighthearted spirit of the concept.

## What Changes

- Add a display font (Google Font) for the title to give it character
- Add a dynamic subtitle showing the live count of cities currently at happy hour
- Replace the text-based theme toggle with sun/moon icon toggle
- Enrich city cards with country flag emojis and region labels
- Add a static timezone-to-country lookup table to support flag/region data
- Add staggered fade-in animations for city cards on load and refresh
- Add warm gradient hover effects on cards
- Add a subtle background gradient for visual depth
- Refine spacing, typography sizing, and color palette for warmth
- Add a gentle pulse/shimmer to indicate live data
- Replace bland empty/no-results text with playful copy
- Add card entrance/exit animations when the city list changes on refresh

## Capabilities

### New Capabilities

- `city-metadata`: Static lookup mapping IANA timezone identifiers to ISO country codes and region names, with flag emoji derivation
- `card-animations`: Staggered fade-in animations for city cards on load and refresh, plus smooth transitions when the city list changes
- `playful-chrome`: Display font for title, dynamic city count subtitle, sun/moon icon theme toggle, warm gradient background, refined color palette, and playful empty-state copy

### Modified Capabilities

- `happy-hour-display`: City data model expands to include country flag emoji and region name; cards display flag and region alongside city name and time
- `theme-toggle`: Text button replaced with sun/moon icon toggle; visual style changes but persistence behavior unchanged

## Impact

- **Code**: `timezone.ts` data model gains `flag` and `region` fields; new static lookup module; all UI components updated for visual refresh
- **Dependencies**: Google Font loaded via `<link>` in `index.html` (no npm dependency)
- **Tests**: Unit tests updated for new data shape; E2E tests updated for new UI elements (icon toggle, flag/region display)
- **Rollback**: Revert the commit(s) — purely presentational changes with no backend, API, or data persistence impact
- **Teams**: None — solo project, no downstream consumers
