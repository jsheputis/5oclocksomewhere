## ADDED Requirements

### Requirement: Filter cities by search text

The system SHALL provide a text input that filters the displayed city list. Only cities whose display name contains the search text (case-insensitive) SHALL be shown.

#### Scenario: Search matches partial city name

- **GIVEN** the cities "Tokyo", "Toronto", and "London" are in the 5 PM hour
- **WHEN** the user types "to" in the search bar
- **THEN** "Tokyo" and "Toronto" SHALL be displayed and "London" SHALL be hidden

#### Scenario: Search with no matches

- **GIVEN** cities are displayed in the list
- **WHEN** the user types a search term that matches no city names
- **THEN** no cities SHALL be displayed

#### Scenario: Empty search shows all cities

- **GIVEN** the search bar contains text and the user clears it
- **WHEN** the search bar is empty
- **THEN** all cities in the 5 PM hour SHALL be displayed

### Requirement: Search is immediate

The system SHALL filter the city list as the user types, without requiring a submit action or button press.

#### Scenario: Real-time filtering

- **GIVEN** cities are displayed in the list
- **WHEN** the user types each character in the search bar
- **THEN** the city list SHALL update after each keystroke
