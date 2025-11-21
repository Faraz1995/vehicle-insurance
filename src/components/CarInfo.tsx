import React from 'react'
import type { CarInfo } from '../utils/types'
import { calculateInsuraceQuote, formatPrice, plateParser, toJalali } from '../utils'

type CarInfoCardProps = {
  item: CarInfo
  canDeleted?: boolean
  onDelete?: (plate: string) => void
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ item, canDeleted, onDelete }) => {
  const parsedPlate = plateParser(item.plate)
  const insuranceQuotePrice = calculateInsuraceQuote(item.make_date)

  const removeHandler = () => {
    onDelete?.(item.plate)
  }

  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-80  sm:min-w-lg'>
      {canDeleted && (
        <div
          className='w-full flex justify-end cursor-pointer px-2'
          onClick={removeHandler}
        >
          <span className='text-red-600'>X</span>
        </div>
      )}
      <div className='p-4 space-y-5 w-full'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-400 '>پلاک</span>
          <div dir='ltr' className='flex items-center gap-1'>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[0]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[1]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[2]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[3]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[4]}</span>
          </div>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400'>برند</span>
          <span className='font-medium'>{item.brand}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400'>مدل</span>
          <span className='font-medium'>{item.model}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400 '>تاریخ تولید</span>
          <span className=''>{toJalali(item.make_date)}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400 '>نام مالک</span>
          <span className='text-gray-800'>{item.owner.full_name}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400'>کد ملی</span>
          <span dir='ltr'>{item.owner.national_id}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400'> قیمت بیمه سالیانه</span>
          <div>
            <span dir='ltr'>{formatPrice(insuranceQuotePrice)}</span>
            <span>ریال</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarInfoCard
