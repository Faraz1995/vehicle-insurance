import React from 'react'
import Modal from './Modal'
import { getDataFromLS } from '../utils'
import type { CarInfo } from '../utils/types'
import CarInfoCard from './CarInfo'

type Props = {
  closeModal: () => void
}

const HistoryModal = ({ closeModal }: Props) => {
  const historyData: CarInfo[] = getDataFromLS('oldPlateSearched')
  return (
    <Modal title='مشاهده تاریخچه جستجو' closeModal={closeModal}>
      <div className='flex flex-col gap-4'>
        {historyData.map((item) => (
          <CarInfoCard key={item.plate} item={item} />
        ))}
      </div>
    </Modal>
  )
}

export default HistoryModal
