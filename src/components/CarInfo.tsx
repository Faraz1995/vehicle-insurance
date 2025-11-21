import React from 'react'
import type { CarInfo } from '../utils/types'
import { calculateInsuraceQuote, formatPrice, plateParser, toJalali } from '../utils'

type CarInfoCardProps = {
  item: CarInfo
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ item }) => {
  const parsedPlate = plateParser(item.plate)
  const insuranceQuotePrice = calculateInsuraceQuote(item.make_date)
  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-80  sm:min-w-lg'>
      <div className='p-6 space-y-5 w-full'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-400 font-medium'>پلاک</span>
          <div dir='ltr' className='flex items-center gap-1'>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[0]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[1]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[2]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[3]}</span>
            <span className='font-bold text-lg text-blue-600'>{parsedPlate[4]}</span>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-400 font-medium'>برند</span>
          <span className='font-medium'>{item.brand}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-400 font-medium'>مدل</span>
          <span className='font-medium'>{item.model}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-400 font-medium'>تاریخ تولید</span>
          <span className='font-medium'>{toJalali(item.make_date)}</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-400 font-medium'>نام مالک</span>
          <span className='font-semibold text-gray-800'>{item.owner.full_name}</span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400 font-medium'>کد ملی</span>
          <span className='font-mono text-lg' dir='ltr'>
            {item.owner.national_id}
          </span>
        </div>

        <div className='flex items-center justify-between pt-4'>
          <span className='text-gray-400 font-medium'> قیمت بیمه سالیانه</span>
          <div>
            <span className='font-mono text-lg' dir='ltr'>
              {formatPrice(insuranceQuotePrice)}
            </span>
            <span>ریال</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarInfoCard
