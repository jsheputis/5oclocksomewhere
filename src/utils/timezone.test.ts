import { describe, it, expect } from 'vitest'
import { parseCityName, getHappyHourCities } from './timezone'

describe('parseCityName', () => {
  it('extracts city from a two-part zone ID', () => {
    expect(parseCityName('Europe/London')).toBe('London')
  })

  it('extracts city from a three-part zone ID', () => {
    expect(parseCityName('America/Indiana/Knox')).toBe('Knox')
  })

  it('replaces underscores with spaces', () => {
    expect(parseCityName('America/New_York')).toBe('New York')
  })

  it('handles underscores in three-part zone IDs', () => {
    expect(parseCityName('Asia/Ho_Chi_Minh')).toBe('Ho Chi Minh')
  })
})

describe('getHappyHourCities', () => {
  it('returns an array of city objects with correct shape', () => {
    const cities = getHappyHourCities()
    for (const city of cities) {
      expect(city).toHaveProperty('zone')
      expect(city).toHaveProperty('name')
      expect(city).toHaveProperty('time')
      expect(typeof city.zone).toBe('string')
      expect(typeof city.name).toBe('string')
      expect(typeof city.time).toBe('string')
    }
  })

  it('formats times as h:mm AM/PM', () => {
    const cities = getHappyHourCities()
    for (const city of cities) {
      expect(city.time).toMatch(/^\d{1,2}:\d{2}\s[AP]M$/)
    }
  })

  it('only returns cities where the local hour is 5 PM', () => {
    const cities = getHappyHourCities()
    for (const city of cities) {
      expect(city.time).toMatch(/^5:\d{2}\sPM$/)
    }
  })
})
