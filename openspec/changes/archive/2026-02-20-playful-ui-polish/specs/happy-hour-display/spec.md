## MODIFIED Requirements

### Requirement: Display cities in the 5 PM hour

The system SHALL display a list of cities where the current local time is between 17:00 and 17:59 inclusive. Cities SHALL be derived from the IANA timezone database using the browser's `Intl.supportedValuesOf('timeZone')` API. Each city entry SHALL show the city name, the current local time, the country flag emoji, and the region name.

#### Scenario: Cities in the 5 PM hour are displayed

- **GIVEN** the current UTC time results in one or more IANA timezones having a local hour of 17
- **WHEN** the page is loaded
- **THEN** all cities whose local hour is 17 SHALL be displayed in the list with their name, time, flag emoji, and region

#### Scenario: No cities in the 5 PM hour

- **GIVEN** no IANA timezone currently has a local hour of 17 (edge case — practically impossible)
- **WHEN** the page is loaded
- **THEN** the system SHALL display a playful empty state message

#### Scenario: City card shows flag and region

- **GIVEN** the timezone `Europe/London` is in the 5 PM hour
- **WHEN** the city card is rendered
- **THEN** the card SHALL display the Great Britain flag emoji, the city name "London", the time in `h:mm AM/PM` format, and the region "Europe"

#### Scenario: City with no flag mapping

- **GIVEN** a timezone not present in the country lookup table is in the 5 PM hour
- **WHEN** the city card is rendered
- **THEN** the card SHALL display no flag emoji, the city name, the time, and the region derived from the zone's first path segment
