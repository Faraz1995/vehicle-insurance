import React, { forwardRef, useState } from 'react'
import { cn } from '../utils'

type FloatingInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  label?: string
  placeholder?: string
  extraClassnames?: string
  maxLength?: number
  mask?: string
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      disabled = false,
      inputMode = 'text',
      label,
      placeholder = '',
      extraClassnames = '',
      maxLength
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const shouldFloat = isFocused || value.length > 0

    return (
      <div className='relative w-full'>
        {/* Label */}
        <label
          className={cn(
            'absolute transition-all duration-200 pointer-events-none',
            shouldFloat
              ? 'text-xs -top-2 right-2 bg-white px-1 text-gray-500'
              : 'top-1/2 right-3 -translate-y-1/2 text-gray-400'
          )}
        >
          {label}
        </label>

        {/* Input */}
        <input
          ref={ref}
          type='text'
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          inputMode={inputMode}
          maxLength={maxLength}
          placeholder={shouldFloat ? placeholder : ''}
          className={cn(
            'w-full border rounded-md px-3 pt-3 pb-1 outline-none transition focus:border-base-primary focus:ring-2 focus:ring-base-primary',
            extraClassnames,
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
          )}
        />
      </div>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'
