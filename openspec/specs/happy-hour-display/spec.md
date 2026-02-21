## ADDED Requirements

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

### Requirement: Parse IANA zone identifiers into display names

The system SHALL transform IANA timezone identifiers into human-readable city names by extracting the segment after the last `/` and replacing underscores with spaces (e.g., `America/New_York` → "New York", `Asia/Ho_Chi_Minh` → "Ho Chi Minh").

#### Scenario: Standard two-part zone identifier

- **GIVEN** a timezone identifier `Europe/London`
- **WHEN** the city name is derived
- **THEN** the display name SHALL be "London"

#### Scenario: Three-part zone identifier

- **GIVEN** a timezone identifier `America/Indiana/Knox`
- **WHEN** the city name is derived
- **THEN** the display name SHALL be "Knox"

#### Scenario: Underscore in city name

- **GIVEN** a timezone identifier `America/New_York`
- **WHEN** the city name is derived
- **THEN** the display name SHALL be "New York"

### Requirement: Show current local time for each city

Each city entry SHALL display the current local time formatted as `h:mm AM/PM` (e.g., "5:23 PM").

#### Scenario: Time display format

- **GIVEN** a city whose local time is 17:07
- **WHEN** the city is rendered
- **THEN** the displayed time SHALL be "5:07 PM"

### Requirement: Live update the city list

The system SHALL re-evaluate which cities are in the 5 PM hour at least once per minute. The displayed list SHALL update without requiring a page refresh.

#### Scenario: City list updates as time progresses

- **GIVEN** the page is open and a new timezone enters the 5 PM hour
- **WHEN** the next update interval fires (within 60 seconds)
- **THEN** the newly matching city SHALL appear in the list and cities no longer in the 5 PM hour SHALL be removed
