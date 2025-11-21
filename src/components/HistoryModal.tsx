import { useState } from 'react'
import Modal from './Modal'
import { getDataFromLS } from '../utils'
import type { CarInfo } from '../utils/types'
import CarInfoCard from './CarInfo'

type Props = {
  closeModal: () => void
}

const HistoryModal = ({ closeModal }: Props) => {
  const [historyInfo, setHistoryInfo] = useState<CarInfo[]>(() =>
    getDataFromLS('oldPlateSearched')
  )

  const handleDelete = (plate: string) => {
    const newHistory = historyInfo.filter((h) => h.plate !== plate)
    localStorage.setItem('oldPlateSearched', JSON.stringify(newHistory))
    setHistoryInfo(newHistory)

    if (newHistory.length === 0) {
      closeModal()
    }
  }

  return (
    <Modal title='مشاهده تاریخچه جستجو' closeModal={closeModal}>
      <div className='flex flex-col gap-4'>
        {historyInfo.map((item) => (
          <CarInfoCard
            key={item.plate}
            item={item}
            canDeleted={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </Modal>
  )
}

export default HistoryModal
