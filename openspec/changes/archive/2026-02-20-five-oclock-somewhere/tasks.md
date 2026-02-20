## 1. Project Scaffolding

- [x] 1.1 Scaffold Vite project with `react-ts` template in the repo root
- [x] 1.2 Configure ESLint and Prettier with strict TypeScript rules
- [x] 1.3 Verify dev server starts and renders the default Vite page

## 2. Timezone Utilities

- [x] 2.1 Create a `getHappyHourCities` function that returns all IANA timezones where the local hour is 17, with display name and formatted time
- [x] 2.2 Create a `parseCityName` helper that extracts a display name from an IANA zone ID (last segment, underscores to spaces)
- [x] 2.3 Write unit tests for `parseCityName` (two-part, three-part, underscore cases)
- [x] 2.4 Write unit tests for `getHappyHourCities` (returns correct shape, times formatted as `h:mm AM/PM`)

## 3. Core UI — Happy Hour Display

- [x] 3.1 Create `CityCard` component that renders a city name and its local time
- [x] 3.2 Create `CityList` component that renders a list of `CityCard` entries
- [x] 3.3 Wire `App` to call `getHappyHourCities` on mount and pass results to `CityList`
- [x] 3.4 Add a 60-second `setInterval` in `App` to re-evaluate the city list

## 4. Search

- [x] 4.1 Create `SearchBar` component with a text input
- [x] 4.2 Wire search state in `App` to filter the city list by display name (case-insensitive, on each keystroke)

## 5. Theme Toggle

- [x] 5.1 Define light and dark CSS custom property palettes on `:root` and `[data-theme="dark"]`
- [x] 5.2 Create `ThemeToggle` component that flips `data-theme` on the `<html>` element
- [x] 5.3 Persist theme preference in `localStorage` and restore on page load

## 6. Layout and Styling

- [x] 6.1 Create `Header` component with the app title and `ThemeToggle`
- [x] 6.2 Compose the full layout in `App`: `Header`, `SearchBar`, `CityList`
- [x] 6.3 Style the page — clean, modern, playful (minimal CSS, no framework)

## 7. Testing

- [x] 7.1 Add Playwright e2e test: page loads and displays cities with times
- [x] 7.2 Add Playwright e2e test: search filters the city list
- [x] 7.3 Add Playwright e2e test: theme toggle switches themes and persists across reload
