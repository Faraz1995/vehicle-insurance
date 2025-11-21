import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const plateMaskHander = (raw: string) => {
  const mask = ['D', 'D', 'A', 'D', 'D', 'D', '-', 'D', 'D']
  let value = ''
  let i = 0

  for (const m of mask) {
    if (raw[i] === undefined) break
    const char = raw[i]

    if (m === 'D') {
      if (/[0-9]/.test(char)) value += char
      else break
    } else if (m === 'A') {
      if (/[\u0627-\u06CC]/.test(char)) value += char
      else break
    } else if (m === '-') {
      value += '-'
      i--
    }

    i++
  }

  return value
}

export const toJalali = (
  date: string | Date | number,
  format: 'text' | 'numeric' = 'text'
): string => {
  const options: Intl.DateTimeFormatOptions =
    format === 'text'
      ? { year: 'numeric', month: 'long' }
      : { year: 'numeric', month: '2-digit' }

  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', options).format(new Date(date))
}

export const plateParser = (input: string): (number | string)[] => {
  const result: (number | string)[] = []

  // Match sequences of digits or non-digits
  const parts = input.match(/\d+|[^\d]+/g)

  if (parts) {
    for (const part of parts) {
      result.push(part)
    }
  }

  return result
}

export const convertToEnglishNumber = (persian: string): string => {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g
  ] as const

  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g
  ] as const

  let result = persian

  for (let i = 0 as const; i < 10; i++) {
    const digit = String(i) // ensures type is string
    result = result.replace(persianNumbers[i], digit).replace(arabicNumbers[i], digit)
  }

  return result
}

export const getYearDifference = (input: string | Date): number => {
  const date = input instanceof Date ? input : new Date(input)

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input')
  }

  const now = new Date()

  let diff = now.getFullYear() - date.getFullYear()

  // Adjust if the month/day hasn’t happened yet this year
  const hasNotPassedYet =
    now.getMonth() < date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())

  if (hasNotPassedYet) {
    diff -= 1
  }

  return diff
}

export const calculateInsuraceQuote = (makeYear: string | Date) => {
  const basedPrice = 1000000
  const increasedRate = 0.12
  const yearDifference = getYearDifference(makeYear)
  let finalPrice = basedPrice
  for (let i = 0; i < yearDifference; i++) {
    finalPrice = finalPrice * (1 + increasedRate)
  }
  return Math.round(finalPrice / 1000) * 1000
}

export const formatPrice = (price: number | string) => {
  const numberPrice = Number(price)
  return numberPrice.toLocaleString()
}
