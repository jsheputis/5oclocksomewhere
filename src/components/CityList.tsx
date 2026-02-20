import { CityCard } from './CityCard'
import type { HappyHourCity } from '../utils/timezone'

interface CityListProps {
  cities: HappyHourCity[]
}

export function CityList({ cities }: CityListProps) {
  if (cities.length === 0) {
    return <p className="empty-message">No cities found.</p>
  }

  return (
    <div className="city-list">
      {cities.map((city) => (
        <CityCard key={city.zone} name={city.name} time={city.time} />
      ))}
    </div>
  )
}
