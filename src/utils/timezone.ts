import { getCountryCode, getFlagEmoji, getRegion } from './countryMap'

export interface HappyHourCity {
  zone: string
  name: string
  time: string
  flag: string
  region: string
}

export function parseCityName(zone: string): string {
  const lastSegment = zone.split('/').pop() ?? zone
  return lastSegment.replace(/_/g, ' ')
}

export function getHappyHourCities(): HappyHourCity[] {
  const zones = Intl.supportedValuesOf('timeZone')
  const now = new Date()

  return zones
    .filter((zone) => {
      const hour = Number(
        new Intl.DateTimeFormat('en-US', {
          timeZone: zone,
          hour: 'numeric',
          hour12: false,
        })
          .formatToParts(now)
          .find((p) => p.type === 'hour')?.value,
      )
      return hour === 17
    })
    .map((zone) => ({
      zone,
      name: parseCityName(zone),
      time: new Intl.DateTimeFormat('en-US', {
        timeZone: zone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now),
      flag: getFlagEmoji(getCountryCode(zone)),
      region: getRegion(zone),
    }))
}
