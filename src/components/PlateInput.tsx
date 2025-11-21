import { useRef } from 'react'
import { FloatingInput } from './FloatingInput'

type PlateInputsProps = {
  value?: string
  onChange: (combined: string) => void
  extraClassnames?: string
}

export const PlateInputs = ({
  value = '',
  onChange,
  extraClassnames
}: PlateInputsProps) => {
  // Remove dash and derive parts directly from prop
  const cleanValue = value.replace('-', '')
  
  const parts = {
    part1: cleanValue.slice(0, 2),
    part2: cleanValue.slice(2, 3),
    part3: cleanValue.slice(3, 6),
    part4: cleanValue.slice(6, 8)
  }

  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)
  const ref4 = useRef<HTMLInputElement>(null)

  const updateCombined = (p1: string, p2: string, p3: string, p4: string) => {
    const combined = `${p1}${p2}${p3}-${p4}`
    onChange(combined)
  }

  const partConfig = {
  part1: { maxLength: 2, regex: /[^0-9]/g, nextRef: ref2 },
  part2: { maxLength: 1, regex: /[^\u0627-\u06CC]/g, nextRef: ref3 },
  part3: { maxLength: 3, regex: /[^0-9]/g, nextRef: ref4 },
  part4: { maxLength: 2, regex: /[^0-9]/g, nextRef: null }
}

const handlePartChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  partKey: keyof typeof parts
) => {
  const config = partConfig[partKey]
  const val = e.target.value
    .replace(config.regex, '')
    .slice(0, config.maxLength)

  const newParts = { ...parts, [partKey]: val }
  updateCombined(newParts.part1, newParts.part2, newParts.part3, newParts.part4)

  if (val.length === config.maxLength && config.nextRef?.current) {
    config.nextRef.current.focus()
  }
}

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    partKey: keyof typeof parts,
    prevRef?: React.RefObject<HTMLInputElement | null> | null
  ) => {
    // Backspace to previous input when current input is empty
    if (e.key === 'Backspace' && parts[partKey].length === 0 && prevRef?.current) {
      prevRef.current.focus()
    }
  }

  return (
    <div dir='ltr' className={`flex gap-2 ${extraClassnames}`}>
      {/* 1st input: two digits */}
      <FloatingInput
        ref={ref1}
        value={parts.part1}
        onChange={(e) => handlePartChange(e, 'part1')}
        onKeyDown={(e) => handleKeyDown(e, 'part1', undefined)}
        placeholder='00'
        maxLength={2}
      />

      {/* 2nd input: Persian letter */}
      <FloatingInput
        ref={ref2}
        value={parts.part2}
        onChange={(e) => handlePartChange(e, 'part2')}
        onKeyDown={(e) => handleKeyDown(e, 'part2', ref1)}
        placeholder='الف'
        maxLength={1}
      />

      {/* 3rd input: three digits */}
      <FloatingInput
        ref={ref3}
        value={parts.part3}
        onChange={(e) => handlePartChange(e, 'part3')}
        onKeyDown={(e) => handleKeyDown(e, 'part3', ref2)}
        placeholder='000'
        maxLength={3}
      />

      {/* 4th input: two digits */}
      <FloatingInput
        ref={ref4}
        value={parts.part4}
        onChange={(e) => handlePartChange(e, 'part4')}
        onKeyDown={(e) => handleKeyDown(e, 'part4', ref3)}
        placeholder='00'
        maxLength={2}
      />
    </div>
  )
}