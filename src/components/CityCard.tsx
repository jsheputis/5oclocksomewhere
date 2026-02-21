interface CityCardProps {
  name: string
  time: string
  flag: string
  region: string
  index: number
}

export function CityCard({ name, time, flag, region, index }: CityCardProps) {
  return (
    <div
      className="city-card"
      style={{ '--i': Math.min(index, 10) } as React.CSSProperties}
    >
      {flag && <span className="city-flag">{flag}</span>}
      <span className="city-name">{name}</span>
      <span className="city-time">{time}</span>
      <span className="city-region">{region}</span>
    </div>
  )
}
