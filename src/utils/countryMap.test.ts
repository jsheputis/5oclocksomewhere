import { describe, it, expect } from 'vitest'
import { getCountryCode, getFlagEmoji, getRegion } from './countryMap'

describe('getCountryCode', () => {
  it('returns country code for known timezone', () => {
    expect(getCountryCode('Europe/London')).toBe('GB')
    expect(getCountryCode('America/New_York')).toBe('US')
    expect(getCountryCode('Asia/Tokyo')).toBe('JP')
  })

  it('returns empty string for unknown timezone', () => {
    expect(getCountryCode('Fake/Nowhere')).toBe('')
  })
})

describe('getFlagEmoji', () => {
  it('converts country code to flag emoji', () => {
    const usFlag = getFlagEmoji('US')
    expect(usFlag).toBe('\u{1F1FA}\u{1F1F8}')
  })

  it('returns empty string for empty country code', () => {
    expect(getFlagEmoji('')).toBe('')
  })
})

describe('getRegion', () => {
  it('maps America to Americas', () => {
    expect(getRegion('America/Chicago')).toBe('Americas')
  })

  it('passes through direct region names', () => {
    expect(getRegion('Europe/Paris')).toBe('Europe')
    expect(getRegion('Asia/Tokyo')).toBe('Asia')
    expect(getRegion('Africa/Lagos')).toBe('Africa')
  })

  it('maps Australia directly', () => {
    expect(getRegion('Australia/Sydney')).toBe('Australia')
  })

  it('maps Pacific correctly', () => {
    expect(getRegion('Pacific/Auckland')).toBe('Pacific')
  })

  it('maps Indian to Indian Ocean', () => {
    expect(getRegion('Indian/Maldives')).toBe('Indian Ocean')
  })
})
