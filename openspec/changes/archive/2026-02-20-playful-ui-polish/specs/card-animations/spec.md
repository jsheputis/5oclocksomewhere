## ADDED Requirements

### Requirement: Staggered fade-in on initial load

When city cards are first rendered, each card SHALL animate in with a fade and upward slide. The animation SHALL be staggered so that each successive card begins its animation slightly after the previous one (approximately 50ms per card). The stagger delay SHALL be capped so that cards beyond the 10th position do not wait longer than 500ms.

#### Scenario: Cards fade in on page load

- **GIVEN** the page loads with 5 cities at happy hour
- **WHEN** the city list is rendered
- **THEN** each card SHALL animate from opacity 0 to 1 with a slight upward translation, staggered by index

#### Scenario: Stagger delay is capped

- **GIVEN** the page loads with 20 cities at happy hour
- **WHEN** the city list is rendered
- **THEN** cards beyond index 10 SHALL all begin their animation at the 500ms mark (no further staggering)

### Requirement: Smooth transitions on list refresh

When the city list refreshes (every 60 seconds), cards that are newly added SHALL fade in and cards that remain SHALL not re-animate. The transition SHALL feel smooth rather than abrupt.

#### Scenario: New city appears on refresh

- **GIVEN** the city list refreshes and a new timezone enters the 5 PM hour
- **WHEN** the new city card is added to the list
- **THEN** the new card SHALL fade in smoothly

#### Scenario: Existing cities do not re-animate

- **GIVEN** the city list refreshes and some cities remain from the previous render
- **WHEN** the list is updated
- **THEN** existing city cards SHALL remain in place without replaying their entrance animation

### Requirement: Hover interaction effect

City cards SHALL have an enhanced hover effect that provides visual feedback beyond the existing border highlight.

#### Scenario: Card hover effect

- **GIVEN** a city card is displayed
- **WHEN** the user hovers over the card
- **THEN** the card SHALL display a warm glow or shadow effect and a slight upward translation
