## ADDED Requirements

### Requirement: Map IANA timezone to country code

The system SHALL maintain a static lookup table mapping IANA timezone identifiers to ISO 3166-1 alpha-2 country codes. When a timezone identifier is not found in the lookup table, the system SHALL return an empty string for the country code.

#### Scenario: Known timezone maps to country code

- **GIVEN** the timezone identifier `Europe/London`
- **WHEN** the country code is looked up
- **THEN** the result SHALL be `"GB"`

#### Scenario: Known timezone with shared zone maps to country code

- **GIVEN** the timezone identifier `America/New_York`
- **WHEN** the country code is looked up
- **THEN** the result SHALL be `"US"`

#### Scenario: Unknown timezone returns empty string

- **GIVEN** a timezone identifier not present in the lookup table
- **WHEN** the country code is looked up
- **THEN** the result SHALL be `""`

### Requirement: Derive flag emoji from country code

The system SHALL convert an ISO 3166-1 alpha-2 country code into its corresponding flag emoji using the regional indicator symbol algorithm. When the country code is an empty string, the system SHALL return an empty string.

#### Scenario: Valid country code produces flag emoji

- **GIVEN** the country code `"US"`
- **WHEN** the flag emoji is derived
- **THEN** the result SHALL be the United States flag emoji (U+1F1FA U+1F1F8)

#### Scenario: Empty country code produces empty string

- **GIVEN** an empty country code `""`
- **WHEN** the flag emoji is derived
- **THEN** the result SHALL be `""`

### Requirement: Derive region from IANA timezone

The system SHALL extract the first path segment of an IANA timezone identifier and map it to a human-readable region name. The mapping SHALL be: `America` → `Americas`, `US` → `Americas`, `Pacific` → `Pacific`, `Indian` → `Indian Ocean`, `Atlantic` → `Atlantic`, `Arctic` → `Arctic`, `Antarctica` → `Antarctica`. All other first segments (`Europe`, `Asia`, `Africa`, `Australia`) SHALL be used as-is.

#### Scenario: Americas region

- **GIVEN** the timezone identifier `America/Chicago`
- **WHEN** the region is derived
- **THEN** the result SHALL be `"Americas"`

#### Scenario: Direct region name

- **GIVEN** the timezone identifier `Europe/Paris`
- **WHEN** the region is derived
- **THEN** the result SHALL be `"Europe"`

#### Scenario: Australia region

- **GIVEN** the timezone identifier `Australia/Sydney`
- **WHEN** the region is derived
- **THEN** the result SHALL be `"Australia"`
