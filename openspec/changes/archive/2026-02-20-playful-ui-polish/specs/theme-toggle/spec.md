## MODIFIED Requirements

### Requirement: Toggle between light and dark themes

The system SHALL provide an icon-based toggle control that switches the entire page between a light theme and a dark theme. The toggle SHALL display a moon icon when in light mode (indicating "switch to dark") and a sun icon when in dark mode (indicating "switch to light"). The icons SHALL be inline SVGs.

#### Scenario: Switch from light to dark

- **GIVEN** the page is displayed in light theme
- **WHEN** the user activates the theme toggle
- **THEN** the page SHALL switch to dark theme and the toggle icon SHALL change from a moon to a sun

#### Scenario: Switch from dark to light

- **GIVEN** the page is displayed in dark theme
- **WHEN** the user activates the theme toggle
- **THEN** the page SHALL switch to light theme and the toggle icon SHALL change from a sun to a moon
