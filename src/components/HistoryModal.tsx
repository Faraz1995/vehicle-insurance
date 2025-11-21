import { useState } from 'react'
import Modal from './Modal'
import { getDataFromLS } from '../utils'
import type { HistoryInfo } from '../utils/types'
import HistoryInfoCard from './HistoryInfo'

type Props = {
  closeModal: () => void
}

const HistoryModal = ({ closeModal }: Props) => {
  const [historyInfo, setHistoryInfo] = useState<HistoryInfo[]>(() =>
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
          <HistoryInfoCard key={item.plate} item={item} handleDelete={handleDelete} />
        ))}
      </div>
    </Modal>
  )
}

export default HistoryModal
