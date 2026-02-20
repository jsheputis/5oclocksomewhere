interface CityCardProps {
  name: string
  time: string
}

export function CityCard({ name, time }: CityCardProps) {
  return (
    <div className="city-card">
      <span className="city-name">{name}</span>
      <span className="city-time">{time}</span>
    </div>
  )
}
