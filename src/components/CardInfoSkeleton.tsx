import React from 'react'

const CarInfoCardSkeleton: React.FC = () => {
  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-80  sm:min-w-lg animate-pulse'>
      <div className='p-6 space-y-5 w-full'>
        {/* Plate */}
        <div className='flex items-center justify-between'>
          <span className='bg-gray-200 rounded w-16 h-4'></span>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
              <span key={i} className='bg-gray-200 rounded w-6 h-6'></span>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-16 h-4'></span>
          <span className='bg-gray-200 rounded w-24 h-4'></span>
        </div>

        {/* Model */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-16 h-4'></span>
          <span className='bg-gray-200 rounded w-24 h-4'></span>
        </div>

        {/* Make Date */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-20 h-4'></span>
          <span className='bg-gray-200 rounded w-24 h-4'></span>
        </div>

        {/* Owner Name */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-20 h-4'></span>
          <span className='bg-gray-200 rounded w-32 h-4'></span>
        </div>

        {/* National ID */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-20 h-4'></span>
          <span className='bg-gray-200 rounded w-32 h-4'></span>
        </div>

        {/* Insurance Quote */}
        <div className='flex items-center justify-between pt-4'>
          <span className='bg-gray-200 rounded w-28 h-4'></span>
          <span className='bg-gray-200 rounded w-24 h-4'></span>
        </div>
      </div>
    </div>
  )
}

export default CarInfoCardSkeleton
