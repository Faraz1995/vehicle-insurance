import { describe, expect, it, vi } from 'vitest'
import { calculateInsuraceQuote } from '..'

// Freeze system time for stable tests
const fixedNow = new Date('2025-11-21T00:00:00Z')

vi.setSystemTime(fixedNow)

describe('calculateInsuraceQuote', () => {
  it('calculates correct quote for 2020-07-28', () => {
    const result = calculateInsuraceQuote('Tue Jul 28 2020 02:03:22 GMT+0430')
    expect(result).toBe(1762000) // expected compound result
  })

  it('returns base price for current year', () => {
    const result = calculateInsuraceQuote('2025-01-01')
    expect(result).toBe(1000000) // 0 years difference
  })

  it('calculates correctly for 1-year difference', () => {
    const result = calculateInsuraceQuote('2024-11-20')
    expect(result).toBe(1120000) // 1,000,000 * 1.12
  })

  it('throws for invalid date input', () => {
    expect(() => calculateInsuraceQuote('invalid-date')).toThrow(/Invalid date/)
  })
})
