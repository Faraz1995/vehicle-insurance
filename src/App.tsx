import { useState } from 'react'
import Button from './components/Button'
import { PlateInputs } from './components/PlateInput'
import axiosInstance from './utils/axios'
import type { CarInfo } from './utils/types'
import CarInfoCard from './components/CarInfo'
import { convertToEnglishNumber, getDataFromLS } from './utils'
import CarInfoCardSkeleton from './components/CardInfoSkeleton'
import toast from 'react-hot-toast'
import HistoryModal from './components/HistoryModal'

const pattern = /^\d{2}[\u0600-\u06FF]\d{3}-\d{2}$/

function App() {
  const [plate, setPlate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [res, setRes] = useState<CarInfo | null>(null)

  const [showHistoryModal, setShowHistoryModal] = useState(false)

  const isValid = pattern.test(plate)

  const searchHandler = async () => {
    setIsLoading(true)
    setRes(null)
    try {
      const formattedNumPlate = convertToEnglishNumber(plate)
      const res = await axiosInstance.get(`/api/inquiry/plate/${formattedNumPlate}`)
      setRes(res.data)
      setIsLoading(false)
      setPlate('')
      if (Object.keys(res.data).length > 0) {
        const prevSearched = localStorage.getItem('oldPlateSearched')
        if (prevSearched) {
          const prevSearchedData: CarInfo[] = JSON.parse(prevSearched)
          const exists = prevSearchedData.some((item) => item.plate === plate)
          console.log('existsss', exists)
          if (!exists) {
            localStorage.setItem(
              'oldPlateSearched',
              JSON.stringify([...JSON.parse(prevSearched), res.data])
            )
          }
        } else {
          localStorage.setItem('oldPlateSearched', JSON.stringify([res.data]))
        }
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      toast.error('خطا در استعلام پلاک')
    }
  }

  const historyData: CarInfo[] = getDataFromLS('oldPlateSearched')

  return (
    <div className='flex flex-col p-4 gap-4 w-full h-full items-center justify-center border border-amber-500'>
      {historyData.length > 0 && (
        <div
          className='w-full flex justify-end cursor-pointer'
          onClick={() => setShowHistoryModal(true)}
        >
          <p className='text-sm font-bold text-blue-400'>مشاهده تاریخچه جستجو</p>
        </div>
      )}
      <div className='flex flex-col sm:flex-row items-center gap-2'>
        <div className='max-w-md'>
          <PlateInputs
            value={plate}
            onChange={(combined) => {
              setPlate(combined)
            }}
          />
        </div>
        <Button
          loading={isLoading}
          disabled={!isValid}
          onClick={searchHandler}
          extraClassnames='w-full sm:w-auto'
        >
          <p>جستجو</p>
        </Button>
      </div>
      {res && (
        <div>
          {Object.keys(res).length > 0 ? (
            <CarInfoCard item={res} />
          ) : (
            <p className='text-center text-lg text-gray-500 italic'>
              خودرویی با این پلاک یافت نشد
            </p>
          )}
        </div>
      )}
      {isLoading && <CarInfoCardSkeleton />}
      {showHistoryModal && <HistoryModal closeModal={() => setShowHistoryModal(false)} />}
    </div>
  )
}

export default App
