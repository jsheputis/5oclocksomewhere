import { CityCard } from './CityCard'
import type { HappyHourCity } from '../utils/timezone'

interface CityListProps {
  cities: HappyHourCity[]
  hasSearch: boolean
}

export function CityList({ cities, hasSearch }: CityListProps) {
  if (cities.length === 0) {
    return (
      <p className="empty-message">
        {hasSearch
          ? 'No matches — but happy hour is always happening somewhere!'
          : 'Hang tight — the next happy hour is just around the corner!'}
      </p>
    )
  }

  return (
    <div className="city-list">
      {cities.map((city, i) => (
        <CityCard
          key={city.zone}
          name={city.name}
          time={city.time}
          flag={city.flag}
          region={city.region}
          index={i}
        />
      ))}
    </div>
  )
}
