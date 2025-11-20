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
