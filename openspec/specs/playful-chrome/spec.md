## ADDED Requirements

### Requirement: Display font for title

The application title SHALL be rendered in a playful display font loaded from Google Fonts. The font SHALL load with `display=swap` to prevent render blocking. Body text SHALL remain in the system font stack.

#### Scenario: Title renders in display font

- **GIVEN** the Google Font has loaded
- **WHEN** the page is displayed
- **THEN** the title "It's 5 O'Clock Somewhere" SHALL render in the display font

#### Scenario: Title renders before font loads

- **GIVEN** the Google Font has not yet loaded
- **WHEN** the page is displayed
- **THEN** the title SHALL render in the system fallback font and swap to the display font when it loads

### Requirement: Dynamic city count subtitle

The header SHALL display a dynamic subtitle showing the current count of cities at happy hour. The subtitle text SHALL read "Right now, N cities are at happy hour" where N is the current count.

#### Scenario: Subtitle shows city count

- **GIVEN** 14 cities are currently in the 5 PM hour
- **WHEN** the page is displayed
- **THEN** the subtitle SHALL read "Right now, 14 cities are at happy hour"

#### Scenario: Subtitle updates on refresh

- **GIVEN** the city list refreshes and the count changes from 14 to 12
- **WHEN** the refresh completes
- **THEN** the subtitle SHALL update to "Right now, 12 cities are at happy hour"

### Requirement: Warm gradient background

The page background SHALL display a subtle gradient that adds visual warmth. The gradient SHALL adapt to the current theme — warm amber tones for light mode, deep blue/indigo tones for dark mode.

#### Scenario: Light mode gradient

- **GIVEN** the page is in light theme
- **WHEN** the page is displayed
- **THEN** the background SHALL show a subtle warm gradient

#### Scenario: Dark mode gradient

- **GIVEN** the page is in dark theme
- **WHEN** the page is displayed
- **THEN** the background SHALL show a subtle cool/deep gradient

### Requirement: Playful empty state messages

When no cities match the current state, the system SHALL display playful, on-brand copy instead of generic messages.

#### Scenario: No search results

- **GIVEN** the user has typed a search term that matches no cities
- **WHEN** the filtered list is empty
- **THEN** the system SHALL display a playful message such as "No matches — but happy hour is always happening somewhere!"

#### Scenario: No cities at happy hour

- **GIVEN** no IANA timezone currently has a local hour of 17
- **WHEN** the page is loaded
- **THEN** the system SHALL display a playful message rather than a bare "No cities found" message

### Requirement: Refined color palette

The accent color palette SHALL use warm amber/gold tones. The theme's CSS custom properties SHALL be updated to provide richer contrast and warmth while maintaining readability.

#### Scenario: Accent color consistency

- **GIVEN** the page is rendered in either theme
- **WHEN** interactive elements (search focus, card hover, toggle) are displayed
- **THEN** the accent color SHALL be a warm amber/gold tone consistent across all elements
