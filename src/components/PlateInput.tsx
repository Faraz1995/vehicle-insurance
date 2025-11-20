import { useState, useRef } from 'react'
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
  const [part1, setPart1] = useState(value.slice(0, 2))
  const [part2, setPart2] = useState(value.slice(2, 3))
  const [part3, setPart3] = useState(value.slice(3, 6))
  const [part4, setPart4] = useState(value.slice(6, 8))

  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)
  const ref4 = useRef<HTMLInputElement>(null)

  // helper to update combined value
  const updateCombined = (p1: string, p2: string, p3: string, p4: string) => {
    const combined = `${p1}${p2}${p3}-${p4}`
    onChange(combined)
  }

  const handlePartChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    partSetter: (val: string) => void,
    maxLength: number,
    nextRef?: React.RefObject<HTMLInputElement | null> | null,
    prevRef?: React.RefObject<HTMLInputElement | null> | null,
    filterRegex?: RegExp,
    currentPart?: number
  ) => {
    let val = e.target.value
    if (filterRegex) val = val.replace(filterRegex, '')
    val = val.slice(0, maxLength)
    partSetter(val)

    // auto-focus next input
    if (val.length === maxLength && nextRef?.current) {
      nextRef.current.focus()
    }

    // backspace to previous input
    if (
      e.nativeEvent instanceof KeyboardEvent &&
      e.nativeEvent.key === 'Backspace' &&
      val.length === 0
    ) {
      prevRef?.current?.focus()
    }

    // update combined plate
    updateCombined(
      currentPart === 1 ? val : part1,
      currentPart === 2 ? val : part2,
      currentPart === 3 ? val : part3,
      currentPart === 4 ? val : part4
    )
  }

  return (
    <div dir='ltr' className={`flex gap-2 ${extraClassnames}`}>
      {/* 1st input: two digits */}
      <FloatingInput
        ref={ref1}
        value={part1}
        onChange={(e) => handlePartChange(e, setPart1, 2, ref2, undefined, /[^0-9]/g, 1)}
        placeholder='00'
        maxLength={2}
      />

      {/* 2nd input: Persian letter */}
      <FloatingInput
        ref={ref2}
        value={part2}
        onChange={(e) =>
          handlePartChange(e, setPart2, 1, ref3, ref1, /[^\u0627-\u06CC]/g, 2)
        }
        placeholder='الف'
        maxLength={1}
      />

      {/* 3rd input: three digits */}
      <FloatingInput
        ref={ref3}
        value={part3}
        onChange={(e) => handlePartChange(e, setPart3, 3, ref4, ref2, /[^0-9]/g, 3)}
        placeholder='000'
        maxLength={3}
      />

      {/* 4th input: two digits */}
      <FloatingInput
        ref={ref4}
        value={part4}
        onChange={(e) => handlePartChange(e, setPart4, 2, undefined, ref3, /[^0-9]/g, 4)}
        placeholder='00'
        maxLength={2}
      />
    </div>
  )
}
