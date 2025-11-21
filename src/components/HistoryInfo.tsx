import { calculateInsuraceQuote, formatPrice, plateParser } from '../utils'
import type { HistoryInfo } from '../utils/types'

type HistoryInfoCardProps = {
  item: HistoryInfo
  handleDelete: (plate: string) => void
}

const HistoryInfoCard = ({ item, handleDelete }: HistoryInfoCardProps) => {
  const parsedPlate = plateParser(item.plate)
  const insuranceQuotePrice = calculateInsuraceQuote(item.make_date)

  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-80  sm:min-w-lg'>
      <div
        className='w-full flex justify-end cursor-pointer px-2'
        onClick={() => handleDelete(item.plate)}
      >
        <span className='text-red-600'>X</span>
      </div>

      <div className='p-2 px-4 space-y-5 w-full'>
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

        <div className='flex items-center justify-between pt-1'>
          <span className='text-gray-400 '>نام مالک</span>
          <span className='text-gray-800'>{item.owner_full_name}</span>
        </div>

        <div className='flex items-center justify-between pt-1'>
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

export default HistoryInfoCard
