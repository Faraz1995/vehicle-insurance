import React, { type MouseEvent } from 'react'
import { cn } from '../utils'

interface ButtonProps {
  children: React.ReactNode
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  loading?: boolean
  extraClassnames?: string
}

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  extraClassnames = ''
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer',
        disabled || loading
          ? 'opacity-50 cursor-not-allowed bg-slate-400 hover:bg-slate-400'
          : '',
        extraClassnames
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className='flex items-center justify-center'>
          <svg
            className='animate-spin h-5 w-5 mr-2 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v8z'
            ></path>
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
