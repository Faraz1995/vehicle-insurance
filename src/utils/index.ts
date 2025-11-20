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
      // if (part !== '-') {
      result.push(part)
      // }
    }
  }

  return result
}
