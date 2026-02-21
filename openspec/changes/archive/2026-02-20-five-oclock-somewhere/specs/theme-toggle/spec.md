## ADDED Requirements

### Requirement: Toggle between light and dark themes

The system SHALL provide a toggle control that switches the entire page between a light theme and a dark theme.

#### Scenario: Switch from light to dark

- **GIVEN** the page is displayed in light theme
- **WHEN** the user activates the theme toggle
- **THEN** the page SHALL switch to dark theme

#### Scenario: Switch from dark to light

- **GIVEN** the page is displayed in dark theme
- **WHEN** the user activates the theme toggle
- **THEN** the page SHALL switch to light theme

### Requirement: Persist theme preference

The system SHALL persist the user's theme selection in `localStorage` so it survives page reloads.

#### Scenario: Theme persists across reloads

- **GIVEN** the user has selected dark theme
- **WHEN** the user reloads the page
- **THEN** the page SHALL load in dark theme

#### Scenario: No stored preference defaults to light

- **GIVEN** no theme preference exists in `localStorage`
- **WHEN** the page is loaded
- **THEN** the page SHALL display in light theme
